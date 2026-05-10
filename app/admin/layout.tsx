'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LayoutDashboard, BookOpen, Newspaper, Users, LogOut, Home, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && (!user || user.role !== 'admin')) {
      router.replace('/dang-nhap?redirect=/admin/dashboard')
    }
  }, [user, isLoading, router, mounted])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-primary animate-pulse">Đang tải hệ thống bảo mật...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-10">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center space-y-6">
          <h1 className="text-4xl font-black text-red-600 tracking-tighter">TRUY CẬP BỊ CHẶN</h1>
          <p className="text-slate-500 font-medium">Bạn không có quyền quản trị.</p>
          <Link href="/dang-nhap" className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-bold">Đăng nhập Admin</Link>
          <div className="pt-4 border-t border-slate-100">
             <Link href="/" className="text-slate-400 font-bold hover:text-primary transition-colors italic">Quay lại Trang Chủ</Link>
          </div>
        </div>
      </div>
    )
  }

  const sidebarLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/courses', label: 'Khóa học', icon: BookOpen },
    { href: '/admin/news', label: 'Tin tức', icon: Newspaper },
    { href: '/admin/gallery', label: 'Khoảnh khắc', icon: ImageIcon },
    { href: '/admin/registrations', label: 'Đăng ký', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="relative w-[140px] h-[48px] bg-white rounded-xl p-1 shadow-sm border border-slate-100 group-hover:shadow-md transition-all duration-300">
              <Image 
                src="/logo.png" 
                alt="Inspiring HR Logo" 
                fill 
                className="object-contain p-1"
              />
            </div>
          </Link>

          <nav className="space-y-1.5">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                  )}
                >
                  <link.icon className={cn("w-5 h-5", isActive ? "text-secondary" : "text-slate-400")} />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-3">
           <Link href="/" className="flex items-center gap-4 px-5 py-3 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-primary transition-all font-bold text-sm">
             <Home className="w-5 h-5" />
             Về Trang Chủ
           </Link>
           <button 
             onClick={logout}
             className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
           >
             <LogOut className="w-5 h-5" />
             Đăng xuất
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-72">
        <header className="h-20 border-b border-slate-200 bg-white/50 backdrop-blur-md sticky top-0 z-40 px-10 flex items-center justify-between">
           <div className="text-sm font-bold text-slate-400">
             Xin chào, <span className="text-primary font-black">{user?.name}</span>
           </div>
           <Badge className="bg-secondary/10 text-primary border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
             Quản trị viên
           </Badge>
        </header>
        <main className="p-10 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
