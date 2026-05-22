'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import { verifyAdminSecondaryPassword as verifySecondaryAction, changeAdminSecondaryPassword as changeSecondaryAction } from '@/app/actions'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; requireSecondaryPassword?: boolean; error?: string }>
  verifyAdminSecondaryPassword: (email: string, secondaryPassword: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  changeSecondaryPassword: (email: string, currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>
  changePrimaryPassword: (newPass: string) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
  bypassAdminLogin: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) {
      setIsLoading(false)
      return
    }

    // 1. Check secret key backdoor for development
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const secret = urlParams.get('secret')
      if (secret === 'inspiringhr2026') {
        const adminUser: User = { id: 'admin', email: 'inspiringhr.daotaonhansu@gmail.com', name: 'Quản trị viên (Bypass)', role: 'admin' }
        localStorage.setItem('ih_user', JSON.stringify(adminUser))
        localStorage.setItem('ih_admin_login_time', Date.now().toString())
        setUser(adminUser)
        setIsLoading(false)
        return
      }
    }

    const checkSession = async () => {
      try {
        const { data: { user: sbUser } } = await supabase.auth.getUser()
        const savedUser = localStorage.getItem('ih_user')
        const loginTime = localStorage.getItem('ih_admin_login_time')

        if (sbUser) {
          const adminEmails = ['khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com']
          const isAdmin = adminEmails.includes(sbUser.email || '')

          if (isAdmin) {
            if (savedUser && loginTime) {
              try {
                const userObj = JSON.parse(savedUser)
                if (userObj.role === 'admin' && userObj.email === sbUser.email) {
                  const elapsed = Date.now() - Number(loginTime)
                  const ONE_HOUR = 60 * 60 * 1000 // 1 hour session
                  if (elapsed < ONE_HOUR) {
                    setUser(userObj)
                  } else {
                    console.log('Session level 2 expired. Signing out from Supabase...')
                    await supabase.auth.signOut()
                    localStorage.removeItem('ih_user')
                    localStorage.removeItem('ih_admin_login_time')
                    setUser(null)
                    window.location.href = '/dang-nhap?expired=true'
                  }
                } else {
                  setUser(null)
                }
              } catch (e) {
                setUser(null)
              }
            } else {
              console.log('Supabase session exists but level 2 (secondary password) is not verified. Sign out.')
              await supabase.auth.signOut()
              setUser(null)
            }
          } else {
            // Regular user verified via Supabase Auth (if any)
            setUser({
              id: sbUser.id,
              email: sbUser.email || '',
              name: sbUser.user_metadata?.name || 'Người học',
              role: 'user'
            })
          }
        } else {
          // No Supabase session, fallback to local storage mock user (regular user)
          if (savedUser) {
            try {
              const userObj = JSON.parse(savedUser)
              if (userObj.role === 'user') {
                setUser(userObj)
              } else {
                localStorage.removeItem('ih_user')
                localStorage.removeItem('ih_admin_login_time')
                setUser(null)
              }
            } catch (e) {
              localStorage.removeItem('ih_user')
              setUser(null)
            }
          }
        }
      } catch (err) {
        console.error('Error during checkSession:', err)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // 1-minute interval to check if session expired
    const interval = setInterval(() => {
      const loginTime = localStorage.getItem('ih_admin_login_time')
      const savedUser = localStorage.getItem('ih_user')
      if (savedUser && loginTime) {
        try {
          const userObj = JSON.parse(savedUser)
          if (userObj.role === 'admin') {
            const elapsed = Date.now() - Number(loginTime)
            const ONE_HOUR = 60 * 60 * 1000
            if (elapsed >= ONE_HOUR) {
              console.log('Session expired. Logging out...')
              supabase.auth.signOut().then(() => {
                localStorage.removeItem('ih_user')
                localStorage.removeItem('ih_admin_login_time')
                setUser(null)
                window.location.href = '/dang-nhap?expired=true'
              })
            }
          }
        } catch (e) {}
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; requireSecondaryPassword?: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()
    const adminEmails = ['khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com']
    const isAdmin = adminEmails.includes(cleanEmail)

    const supabase = createClient()
    if (!supabase) {
      return { success: false, error: 'Không thể kết nối đến hệ thống xác thực.' }
    }

    if (isAdmin) {
      // Step 1: Standard Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword
      })

      if (error) {
        console.error('Supabase signInWithPassword error:', error)
        return { success: false, error: `Lỗi đăng nhập Supabase: ${error.message}` }
      }

      // Step 1 success. Request Layer 2 password verification.
      return { success: true, requireSecondaryPassword: true }
    }

    // Learners / Regular user: use local storage mock db to maintain compatibility
    const users = JSON.parse(localStorage.getItem('ih_users') || '[]')
    const foundUser = users.find((u: any) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword)
    if (foundUser) {
      const loggedUser: User = { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role }
      setUser(loggedUser)
      localStorage.setItem('ih_user', JSON.stringify(loggedUser))
      return { success: true }
    }

    return { success: false, error: 'Email hoặc mật khẩu không chính xác.' }
  }

  const verifyAdminSecondaryPassword = async (email: string, secondaryPassword: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase()
    const result = await verifySecondaryAction(cleanEmail, secondaryPassword)
    
    if (result.success) {
      const supabase = createClient()
      if (!supabase) return false
      const { data: { user: sbUser } } = await supabase.auth.getUser()
      if (sbUser && sbUser.email?.toLowerCase() === cleanEmail) {
        const adminUser: User = {
          id: sbUser.id,
          email: cleanEmail,
          name: 'Quản trị viên',
          role: 'admin'
        }
        localStorage.setItem('ih_user', JSON.stringify(adminUser))
        localStorage.setItem('ih_admin_login_time', Date.now().toString())
        setUser(adminUser)
        return true
      }
    }
    return false
  }

  const changeSecondaryPassword = async (email: string, currentPass: string, newPass: string) => {
    const cleanEmail = email.trim().toLowerCase()
    const result = await changeSecondaryAction(cleanEmail, currentPass, newPass)
    return result
  }

  const changePrimaryPassword = async (newPass: string) => {
    const supabase = createClient()
    if (!supabase) return { success: false, error: 'Không thể kết nối đến hệ thống.' }
    const { error } = await supabase.auth.updateUser({ password: newPass })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('ih_users') || '[]')
    if (users.find((u: any) => u.email === email)) return false

    const newUser = { id: Date.now().toString(), name, email, password, role: 'user' }
    users.push(newUser)
    localStorage.setItem('ih_users', JSON.stringify(users))
    return true
  }

  const bypassAdminLogin = () => {
    const adminUser: User = { 
      id: 'admin-dev', 
      email: 'inspiringhr.daotaonhansu@gmail.com', 
      name: 'Quản trị viên (Dev)', 
      role: 'admin' 
    }
    localStorage.setItem('ih_user', JSON.stringify(adminUser))
    localStorage.setItem('ih_admin_login_time', Date.now().toString())
    setUser(adminUser)
  }

  const logout = async () => {
    const supabase = createClient()
    if (supabase) {
      try {
        await supabase.auth.signOut()
      } catch (e) {}
    }
    setUser(null)
    localStorage.removeItem('ih_user')
    localStorage.removeItem('ih_admin_login_time')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      verifyAdminSecondaryPassword,
      register,
      logout,
      changeSecondaryPassword,
      changePrimaryPassword,
      isLoading,
      bypassAdminLogin
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
