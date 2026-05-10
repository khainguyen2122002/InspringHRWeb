'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Sparkles, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/auth-context'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useAuth()
  const isAdmin = user?.role === 'admin'
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-transparent py-5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="w-32 h-6 bg-slate-200 rounded-md animate-pulse" />
          </div>
        </div>
      </nav>
    )
  }

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/gioi-thieu', label: 'Giới thiệu' },
    { href: '/khoa-hoc', label: 'Khóa học' },
    { href: '/tu-van-doanh-nghiep', label: 'Tư vấn' },
    { href: '/tin-tuc', label: 'Tin tức' },
    { href: '/faq', label: 'Hỏi đáp' },
    { href: '/lien-he', label: 'Liên hệ' },
  ]

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.05)]'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-black text-2xl group-hover:shadow-[0_0_20px_rgba(242,169,0,0.4)] transition-all duration-300">
            IH
          </div>
          <span className={cn(
            "font-black text-2xl tracking-tighter transition-colors",
            isScrolled ? "text-primary" : "text-primary"
          )}>
            INSPIRING HR
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[15px] font-bold text-slate-700 hover:text-primary transition-colors group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
          
          {isAdmin && (
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-2 text-primary font-black text-[15px] hover:text-secondary transition-all bg-secondary/10 px-4 py-2 rounded-xl group"
            >
              <LayoutDashboard className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
              Admin
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10">
                <UserIcon className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary text-sm">{user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout}
                className="rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/dang-nhap"
                className="text-primary font-bold text-sm px-4 hover:text-secondary transition-colors"
              >
                Đăng nhập
              </Link>
              <Link 
                href="/dang-nhap" 
                className={cn(buttonVariants({ }), "bg-gradient-to-r from-primary to-[#1A5F1F] hover:shadow-lg hover:-translate-y-0.5 text-white rounded-full px-8 font-bold transition-all duration-300")}
              >
                Vào học
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden p-2 rounded-md",
            isScrolled ? "text-primary" : "text-primary"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "lg:hidden fixed inset-x-0 top-[73px] bg-white/95 backdrop-blur-xl border-b shadow-2xl transition-all duration-500 origin-top overflow-hidden",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-bold p-2 hover:bg-slate-50 rounded-md text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t">
            {isAdmin ? (
              <Link 
                href="/admin/dashboard" 
                className={cn(buttonVariants({ }), "w-full rounded-xl bg-primary text-white")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            ) : !user ? (
              <Link 
                href="/dang-nhap" 
                className={cn(buttonVariants({ variant: "outline" }), "w-full rounded-xl border-primary text-primary")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Đăng nhập
              </Link>
            ) : (
               <Link 
                href="/khoa-hoc" 
                className={cn(buttonVariants({ }), "w-full rounded-xl bg-[#F2A900] text-primary font-black")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vào học
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
