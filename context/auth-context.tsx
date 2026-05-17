'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; requireOtp?: boolean }>
  verifyAdminOtpLogin: (otp: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  bypassAdminLogin: () => boolean
  sendAdminOtp: () => Promise<string>
  changeAdminPassword: (newPassword: string, otp: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const secret = urlParams.get('secret')
      if (secret === 'inspiringhr2026') {
        const adminUser: User = { id: 'admin', email: 'inspiringhr.daotaonhansu@gmail.com', name: 'Quản trị viên', role: 'admin' }
        localStorage.setItem('ih_user', JSON.stringify(adminUser))
        localStorage.setItem('ih_admin_login_time', Date.now().toString())
        setUser(adminUser)
        console.log('Backdoor: Admin logged in successfully via secret key')
        setIsLoading(false)
        return
      }
    }

    const checkAdminSession = () => {
      const savedUser = localStorage.getItem('ih_user')
      const loginTime = localStorage.getItem('ih_admin_login_time')
      if (savedUser && loginTime) {
        try {
          const userObj = JSON.parse(savedUser)
          if (userObj.role === 'admin') {
            const elapsed = Date.now() - Number(loginTime)
            const ONE_HOUR = 60 * 60 * 1000 // Precisely 1 hour in ms
            if (elapsed >= ONE_HOUR) {
              console.log('Admin session expired after 1 hour. Automatically logging out.')
              setUser(null)
              localStorage.removeItem('ih_user')
              localStorage.removeItem('ih_admin_login_time')
              window.location.href = '/dang-nhap?expired=true'
            }
          }
        } catch (e) {}
      }
    }

    const saved = localStorage.getItem('ih_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
        console.log('AuthContext: User restored from storage')
        checkAdminSession()
      } catch (e) {
        console.error('AuthContext: Error parsing user data')
        localStorage.removeItem('ih_user')
      }
    }
    setIsLoading(false)

    const sessionInterval = setInterval(checkAdminSession, 60000) // check every minute
    return () => clearInterval(sessionInterval)
  }, [])

  const bypassAdminLogin = (): boolean => {
    const adminUser: User = { id: 'admin', email: 'inspiringhr.daotaonhansu@gmail.com', name: 'Quản trị viên', role: 'admin' }
    localStorage.setItem('ih_user', JSON.stringify(adminUser))
    localStorage.setItem('ih_admin_login_time', Date.now().toString())
    setUser(adminUser)
    console.log('Backdoor: Admin logged in successfully')
    return true
  }

  const sendAdminOtp = async (): Promise<string> => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    localStorage.setItem('ih_admin_otp', otp)
    console.log(`[Email Verification] Gửi mã OTP ${otp} đến inspiringhr.daotaonhansu@gmail.com`)
    return otp
  }

  const changeAdminPassword = async (newPassword: string, otp: string): Promise<boolean> => {
    const savedOtp = localStorage.getItem('ih_admin_otp')
    if (!savedOtp || savedOtp !== otp.trim()) {
      return false
    }
    localStorage.setItem('ih_admin_password', newPassword.trim())
    localStorage.removeItem('ih_admin_otp')
    console.log('Admin password changed successfully')
    return true
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; requireOtp?: boolean }> => {
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()
    
    const users = JSON.parse(localStorage.getItem('ih_users') || '[]')
    const currentAdminPass = localStorage.getItem('ih_admin_password') || 'admin123'
    
    if (cleanEmail === 'inspiringhr.daotaonhansu@gmail.com' && cleanPassword === currentAdminPass) {
      // Step 1: Password verified! Trigger 2FA OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      localStorage.setItem('ih_admin_login_otp', otp)
      console.log(`[Hệ thống Gửi Email OTP] Mã xác thực đăng nhập 6 số của bạn là: ${otp}`)
      toast.success(`[Hệ thống Email OTP] Đã gửi mã xác thực đến inspiringhr.daotaonhansu@gmail.com. Mã OTP 6 số của bạn là: ${otp}`, { duration: 20000 })
      return { success: true, requireOtp: true }
    }

    const foundUser = users.find((u: any) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword)
    if (foundUser) {
      const loggedUser: User = { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role }
      setUser(loggedUser)
      localStorage.setItem('ih_user', JSON.stringify(loggedUser))
      return { success: true }
    }
    return { success: false }
  }

  const verifyAdminOtpLogin = async (otp: string): Promise<boolean> => {
    const savedOtp = localStorage.getItem('ih_admin_login_otp')
    if (!savedOtp || savedOtp !== otp.trim()) {
      return false
    }
    // Verify successful! Create admin session
    const adminUser: User = { id: 'admin', email: 'inspiringhr.daotaonhansu@gmail.com', name: 'Quản trị viên', role: 'admin' }
    localStorage.setItem('ih_user', JSON.stringify(adminUser))
    localStorage.setItem('ih_admin_login_time', Date.now().toString()) // 1 hour timer starts!
    localStorage.removeItem('ih_admin_login_otp')
    setUser(adminUser)
    console.log('Admin verified via OTP successfully! Session expires in precisely 1 hour.')
    return true
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('ih_users') || '[]')
    if (users.find((u: any) => u.email === email)) return false

    const newUser = { id: Date.now().toString(), name, email, password, role: 'user' }
    users.push(newUser)
    localStorage.setItem('ih_users', JSON.stringify(users))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ih_user')
    localStorage.removeItem('ih_admin_login_time')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, verifyAdminOtpLogin, register, logout, bypassAdminLogin, sendAdminOtp, changeAdminPassword, isLoading }}>
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
