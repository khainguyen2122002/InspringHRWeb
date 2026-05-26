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
          <div className={cn(
            "relative h-12 w-12 md:h-14 md:w-14 flex items-center justify-center transition-all duration-300",
            (isHomePage && !isScrolled)
              ? "bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-white/20"
              : ""
          )}>
            <Image 
              src="/logo.png" 
              alt="Inspiring HR Logo" 
              fill
              priority
              sizes="(max-width: 768px) 48px, 56px"
              className="object-contain transition-opacity duration-300 group-hover:opacity-95"
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
                    ? (isActive ? "text-[#FFB606]" : "text-white/90 hover:text-[#FFB606]")
                    : (isActive ? "text-[#0E3B0F]" : "text-slate-700 hover:text-[#0E3B0F]")
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-[#FFB606] transition-all duration-300 rounded-full",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </Link>
            )
          })}
          
          <div className="ml-4 flex items-center gap-2.5 md:gap-3">
            <Link 
              href="/khoa-hoc" 
              className="flex items-center gap-1.5 font-bold text-xs md:text-sm bg-gradient-to-r from-[#FFB606] to-[#FFB606] hover:from-[#FFCE54] hover:to-[#FFB606] text-[#0E3B0F] px-4 py-2 md:py-2.5 rounded-xl shadow-md shadow-[#FFB606]/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-[#0E3B0F] animate-spin" />
              Đăng ký ngay
            </Link>

            <Link 
              href="/lien-he" 
              className={cn(
                "flex items-center gap-1.5 font-bold text-xs md:text-sm px-4 py-2 md:py-2.5 rounded-xl transition-all border",
                (isScrolled || !isHomePage) 
                  ? "border-[#0E3B0F] text-[#0E3B0F] hover:bg-[#0E3B0F]/5" 
                  : "border-white/30 text-white hover:bg-white/10"
              )}
            >
              Liên hệ
            </Link>

            {isAdmin && (
              <Link 
                href="/admin/registrations" 
                className={cn(
                  "flex items-center gap-1.5 font-black text-xs md:text-sm px-3.5 py-2 md:py-2.5 rounded-xl transition-all group border",
                  (isScrolled || !isHomePage) 
                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" 
                    : "bg-[#FFB606]/20 border-[#FFB606]/30 text-amber-300 hover:bg-[#FFB606]/30"
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
                  (isScrolled || !isHomePage) ? "bg-[#0E3B0F]/5 border-[#0E3B0F]/10 text-[#0E3B0F]" : "bg-white/10 border-white/10 text-white"
                )}>
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => logout()}
                  className={cn(
                    "rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors",
                    (isScrolled || !isHomePage) ? "text-slate-400" : "text-white/80 hover:text-white"
                  )}
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {isAdmin && (
            <Link 
              href="/admin/registrations" 
              className={cn(
                "flex items-center gap-1 font-black text-xs px-3 py-2 rounded-xl border",
                (isScrolled || !isHomePage) ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-[#FFB606]/20 border-[#FFB606]/30 text-amber-300"
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Admin
            </Link>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "rounded-xl h-10 w-10",
              (isScrolled || !isHomePage) ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            )}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-x-0 top-[64px] md:top-[80px] bg-white border-b border-slate-200/80 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-40 lg:hidden",
        isMobileMenuOpen ? "max-h-[85vh] py-6 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"
      )}>
        <div className="container mx-auto px-6 flex flex-col space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-bold p-3.5 rounded-xl transition-all flex items-center justify-between group",
                  isActive ? "bg-[#0E3B0F]/5 text-[#0E3B0F]" : "text-slate-600 hover:bg-slate-50 hover:text-[#0E3B0F]"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
                <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", isActive ? "opacity-100" : "opacity-0")} />
              </Link>
            )
          })}
          <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <Link 
              href="/khoa-hoc" 
              className="flex items-center justify-center gap-2 font-black text-sm bg-gradient-to-r from-[#FFB606] to-[#FFB606] text-[#0E3B0F] px-4 py-3.5 rounded-xl shadow-lg shadow-[#FFB606]/20 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Sparkles className="w-4 h-4" /> Đăng ký khóa học ngay
            </Link>

            <Link 
              href="/lien-he" 
              className="flex items-center justify-center gap-2 font-bold text-sm bg-[#0E3B0F]/5 border border-[#0E3B0F]/20 text-[#0E3B0F] px-4 py-3.5 rounded-xl hover:bg-primary/10 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Liên hệ & Nhận tư vấn
            </Link>

            {isAdmin && (
              <Link 
                href="/admin/registrations" 
                className="flex items-center justify-center gap-2 font-black text-sm bg-[#FFB606] text-[#103C11] px-4 py-3.5 rounded-xl shadow-lg shadow-[#FFB606]/20 transition-all mt-2"
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
