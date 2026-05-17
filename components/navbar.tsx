'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Sparkles, User as UserIcon, LogOut, LayoutDashboard, Phone, MessageSquare } from 'lucide-react'
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
        <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
          <div className="relative h-11 md:h-14 w-44 md:w-56 bg-white px-3.5 py-1.5 rounded-2xl shadow-sm border border-slate-100/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-md">
            <Image 
              src="/logo.png" 
              alt="Inspiring HR Logo" 
              fill
              priority
              sizes="(max-width: 768px) 176px, 224px"
              className="object-contain p-1.5 transition-opacity duration-300 group-hover:opacity-95"
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
          
          <div className="ml-4 flex items-center gap-2.5 md:gap-3">
            <a 
              href="tel:0915099642" 
              className={cn(
                "hidden xl:flex items-center gap-2 font-bold text-xs md:text-sm px-3.5 py-2 rounded-xl transition-all border",
                (isScrolled || !isHomePage) ? "bg-emerald-50/80 border-emerald-200 text-emerald-700 hover:bg-emerald-100" : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              )}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> 0915 099 642
            </a>

            <a 
              href="https://zalo.me/0915099642" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-bold text-xs md:text-sm bg-[#0068ff] hover:bg-[#0055d4] text-white px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Zalo
            </a>

            <Link 
              href="/lien-he" 
              className="hidden sm:flex items-center gap-1.5 font-bold text-xs md:text-sm bg-gradient-to-r from-primary to-[#1A5F1F] hover:from-[#114616] hover:to-[#124216] text-white px-4 py-2 rounded-xl shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              Nhận tư vấn
            </Link>

            {isAdmin && (
              <Link 
                href="/admin/registrations" 
                className={cn(
                  "flex items-center gap-1.5 font-black text-xs md:text-sm px-3.5 py-2 rounded-xl transition-all group border",
                  (isScrolled || !isHomePage) ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" : "bg-amber-500/20 border-amber-500/30 text-amber-300 hover:bg-amber-500/30"
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" /> 
                Admin
              </Link>
            )}

            {user && !isAdmin && (
              <div className="flex items-center gap-2">
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl border text-xs md:text-sm font-bold",
                  (isScrolled || !isHomePage) ? "bg-primary/5 border-primary/10 text-primary" : "bg-white/10 border-white/10 text-white"
                )}>
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  className={cn(
                    "w-9 h-9 rounded-xl transition-colors",
                    (isScrolled || !isHomePage) ? "hover:bg-red-50 hover:text-red-500" : "text-white hover:bg-white/10 hover:text-red-400"
                  )}
                  title="Đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden p-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center",
            (isScrolled || !isHomePage) 
              ? "bg-primary/5 text-primary hover:bg-primary/10" 
              : "bg-white/10 text-white hover:bg-white/20"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "lg:hidden fixed inset-x-0 top-full bg-white shadow-2xl transition-all duration-500 origin-top overflow-hidden border-t border-slate-100",
          isMobileMenuOpen ? "max-h-[90vh] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        )}
      >
        <div className="p-6 flex flex-col gap-1 overflow-y-auto max-h-[calc(90vh-20px)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-bold p-3.5 rounded-xl transition-all flex items-center justify-between group",
                  isActive ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
                <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", isActive ? "opacity-100" : "opacity-0")} />
              </Link>
            )
          })}
          <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <a 
              href="tel:0915099642" 
              className="flex items-center justify-center gap-2 font-bold text-sm bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3.5 rounded-xl hover:bg-emerald-100 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-500 animate-pulse" /> Hotline: 0915 099 642
            </a>

            <a 
              href="https://zalo.me/0915099642" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-bold text-sm bg-[#0068ff] text-white px-4 py-3.5 rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" /> Chat Zalo OA
            </a>

            <Link 
              href="/lien-he" 
              className="flex items-center justify-center gap-2 font-bold text-sm bg-gradient-to-r from-primary to-[#1A5F1F] text-white px-4 py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nhận tư vấn ngay
            </Link>

            {isAdmin && (
              <Link 
                href="/admin/registrations" 
                className="flex items-center justify-center gap-2 font-black text-sm bg-amber-500 text-white px-4 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" /> Trang Quản Trị (Admin)
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
