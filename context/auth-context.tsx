'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Only access localStorage on client side after mount
    const saved = localStorage.getItem('ih_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
        console.log('AuthContext: User restored from storage')
      } catch (e) {
        console.error('AuthContext: Error parsing user data')
        localStorage.removeItem('ih_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()
    
    // Mock login logic
    const users = JSON.parse(localStorage.getItem('ih_users') || '[]')
    
    // Check if it's the default admin
    if (cleanEmail === 'khainguyen2122002@gmail.com' && cleanPassword === 'admin123') {
      const adminUser: User = { id: 'admin', email: cleanEmail, name: 'Quản trị viên', role: 'admin' }
      localStorage.setItem('ih_user', JSON.stringify(adminUser))
      setUser(adminUser)
      console.log('Admin logged in successfully')
      return true
    }

    const foundUser = users.find((u: any) => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword)
    if (foundUser) {
      const loggedUser: User = { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role }
      setUser(loggedUser)
      localStorage.setItem('ih_user', JSON.stringify(loggedUser))
      return true
    }
    return false
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
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
