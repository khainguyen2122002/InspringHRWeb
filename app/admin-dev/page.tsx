'use client'

import { useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { Loader2, Key } from 'lucide-react'

export default function AdminDevPage() {
  const { bypassAdminLogin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    bypassAdminLogin()
    const timer = setTimeout(() => {
      router.replace('/admin/registrations')
    }, 800)
    return () => clearTimeout(timer)
  }, [bypassAdminLogin, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white space-y-6 px-4 text-center">
      <div className="w-20 h-20 bg-amber-500/10 rounded-full border border-amber-500/20 flex items-center justify-center animate-pulse">
        <Key className="w-10 h-10 text-amber-500" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl md:text-3xl font-black text-amber-400">Backdoor Kích Hoạt</h1>
        <p className="text-slate-400 text-sm md:text-base">Đang tự động cấp quyền Quản trị viên (Admin) và chuyển hướng vào trang quản lý đăng ký...</p>
      </div>
      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
    </div>
  )
}
