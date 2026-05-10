'use client'

import { useState, Suspense, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { toast } from 'sonner'
import { Mail, Lock, Loader2, Sparkles, ArrowRight } from 'lucide-react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { login, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  // Ensure client-side rendering for auth interactions
  useEffect(() => {
    setMounted(true)
    if (user) {
      router.push(redirect)
    }
  }, [user, router, redirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    if (!email || !password) {
      toast.error('Vui lòng nhập đầy đủ email và mật khẩu')
      return
    }

    setIsLoading(true)
    try {
      console.log('Attempting login...')
      const success = await login(email, password)
      if (success) {
        toast.success('Đăng nhập thành công! Đang chuyển hướng...')
        router.push(redirect)
        router.refresh()
      } else {
        toast.error('Email hoặc mật khẩu không chính xác.')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error('Lỗi hệ thống: ' + (error.message || 'Không rõ nguyên nhân'))
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md p-8 md:p-12 border-none shadow-[0_40px_100px_rgba(0,0,0,0.08)] rounded-[3rem] bg-white relative z-10 backdrop-blur-sm border border-white/50">
        <div className="text-center space-y-4 mb-10">
          <Badge className="bg-primary/5 text-primary border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto w-fit">
            <Sparkles className="w-3.5 h-3.5 text-secondary" /> Chào mừng trở lại
          </Badge>
          <h1 className="text-4xl font-black text-primary tracking-tight">Đăng Nhập</h1>
          <p className="text-slate-400 font-medium text-sm px-6">Truy cập vào hệ thống đào tạo chuyên nghiệp của Inspiring HR</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-14 h-16 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all text-lg font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
              <Input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-14 h-16 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-primary focus:border-primary transition-all text-lg font-medium"
              />
            </div>
          </div>

          <Button 
            type="submit"
            disabled={isLoading} 
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-primary to-[#1A5F1F] hover:shadow-2xl hover:shadow-primary/30 text-white font-black text-lg transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>Đăng Nhập Ngay <ArrowRight className="w-5 h-5" /></>
            )}
          </Button>
        </form>

        <div className="mt-10 text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300 bg-white px-4 tracking-widest">Hoặc</div>
          </div>
          
          <p className="text-slate-500 font-medium">
            Chưa có tài khoản?{' '}
            <Link href="/dang-ky" className="text-primary font-black hover:text-secondary transition-colors underline underline-offset-4">Đăng ký ngay</Link>
          </p>
          
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Admin Account</p>
            <p className="text-sm font-black text-primary">admin@inspiringhr.vn / admin123</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
