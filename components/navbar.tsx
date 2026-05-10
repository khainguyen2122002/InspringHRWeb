'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Sparkles, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
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
  const pathname = usePathname()

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
      <nav className="fixed top-0 w-full z-[9999] bg-transparent py-6">
        <div className="container mx-auto px-4 flex items-center justify-between h-20 md:h-24">
          <div className="w-48 h-12 bg-slate-100/50 rounded-2xl animate-pulse" />
          <div className="hidden lg:flex gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-20 h-10 bg-slate-100/50 rounded-2xl animate-pulse" />
            ))}
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

  // Kiểm tra xem có đang ở Trang chủ hay không
  const isHomePage = pathname === '/'

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-[9999] transition-all duration-500',
        (isScrolled || !isHomePage)
          ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-100 py-2 shadow-[0_10px_50px_rgba(0,0,0,0.08)]'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20 transition-all duration-500">
        <Link href="/" className="flex items-center h-full group">
          <div className="relative w-[180px] h-[55px] rounded-lg overflow-hidden flex items-center">
            <Image 
              src="/logo.png" 
              alt="Inspiring HR Logo" 
              fill 
              className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const isWhiteText = isHomePage && !isScrolled
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[15px] font-bold transition-all duration-300 group py-2",
                  isWhiteText
                    ? (isActive ? "text-secondary" : "text-white/90 hover:text-secondary")
                    : (isActive ? "text-primary" : "text-slate-700 hover:text-primary")
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 rounded-full",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </Link>
            )
          })}
          
          <div className="ml-4 flex items-center gap-4">
            {isAdmin && (
              <Link 
                href="/admin/dashboard" 
                className={cn(
                  "flex items-center gap-2 font-black text-[14px] transition-all px-4 py-2 rounded-xl group",
                  (isScrolled || !isHomePage) ? "text-primary bg-secondary/10 hover:text-secondary" : "text-secondary bg-white/10 hover:bg-white/20"
                )}
              >
                <LayoutDashboard className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
                Admin
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl border",
                  (isScrolled || !isHomePage) ? "bg-primary/5 border-primary/10 text-primary" : "bg-white/10 border-white/10 text-white"
                )}>
                  <UserIcon className="w-4 h-4" />
                  <span className="font-bold text-sm">{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  className={cn(
                    "w-10 h-10 rounded-xl transition-colors",
                    (isScrolled || !isHomePage) ? "hover:bg-red-50 hover:text-red-500" : "text-white hover:bg-white/10 hover:text-red-400"
                  )}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/dang-nhap"
                  className={cn(
                    "font-bold text-[14px] px-2 transition-colors",
                    (isScrolled || !isHomePage) ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"
                  )}
                >
                  Đăng nhập
                </Link>
                <Link 
                  href="/dang-nhap" 
                  className={cn(
                    buttonVariants({ size: "sm" }), 
                    "bg-gradient-to-r from-primary to-[#1A5F1F] hover:shadow-lg hover:-translate-y-0.5 text-white rounded-full px-8 h-10 flex items-center font-bold transition-all duration-300"
                  )}
                >
                  Vào học
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden p-3 rounded-2xl bg-primary/5 text-primary transition-all active:scale-95",
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
