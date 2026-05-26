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
import { Mail, Lock, Loader2, Sparkles, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<'login' | 'secondary'>('login')
  const [secondaryPassword, setSecondaryPassword] = useState('')
  const [showSecondaryPassword, setShowSecondaryPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { login, verifyAdminSecondaryPassword, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const isExpired = searchParams.get('expired') === 'true'

  useEffect(() => {
    setMounted(true)
    if (isExpired) {
      toast.error('Phiên đăng nhập Admin đã hết hạn sau 1 giờ. Vui lòng đăng nhập lại.', { duration: 10000 })
    }
    if (user && !isExpired) {
      window.location.href = redirect
    }
  }, [user, redirect, isExpired])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    if (!email || !password) {
      toast.error('Vui lòng nhập đầy đủ email và mật khẩu')
      return
    }

    setIsLoading(true)
    try {
      console.log('Attempting login level 1...')
      const result = await login(email, password)
      if (result.success) {
        if (result.requireSecondaryPassword) {
          setStep('secondary')
          toast.success('Mật khẩu cấp 1 chính xác! Vui lòng nhập mật khẩu cấp 2 để xác thực quyền quản trị.', { duration: 10000 })
        } else {
          toast.success('Đăng nhập thành công! Đang chuyển hướng...')
          window.location.href = redirect
        }
      } else {
        toast.error(result.error || 'Email hoặc mật khẩu không chính xác.')
      }
    } catch (error: any) {
      console.error('Login level 1 error:', error)
      toast.error('Lỗi hệ thống: ' + (error.message || 'Không rõ nguyên nhân'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSecondarySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    if (!secondaryPassword) {
      toast.error('Vui lòng nhập mật khẩu cấp 2')
      return
    }

    setIsLoading(true)
    try {
      const verified = await verifyAdminSecondaryPassword(email, secondaryPassword)
      if (verified) {
        toast.success('Xác thực mật khẩu cấp 2 thành công! Phiên đăng nhập Admin 1 giờ đã bắt đầu.', { duration: 8000 })
        window.location.href = redirect === '/' ? '/admin/registrations' : redirect
      } else {
        toast.error('Mật khẩu cấp 2 không chính xác. Vui lòng kiểm tra lại.')
      }
    } catch (error: any) {
      toast.error('Lỗi hệ thống khi xác thực: ' + (error.message || 'Không rõ'))
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-4 py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md p-8 md:p-12 border-none shadow-[0_40px_100px_rgba(0,0,0,0.08)] rounded-[3rem] bg-white relative z-10 backdrop-blur-sm border border-white/50">
        {step === 'login' ? (
          <>
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
                    className="pl-14 h-16 rounded-2xl border-slate-100 bg-primary/5 focus:bg-white focus:ring-primary focus:border-primary transition-all text-lg font-medium"
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
                    className="pl-14 h-16 rounded-2xl border-slate-100 bg-primary/5 focus:bg-white focus:ring-primary focus:border-primary transition-all text-lg font-medium"
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
            </div>
          </>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-primary tracking-tight">Xác Thực Cấp 2</h2>
              <p className="text-slate-500 text-sm px-4 leading-relaxed font-medium">
                Vui lòng nhập <span className="text-primary font-bold">Mật khẩu cấp 2</span> đã được thiết lập cho tài khoản quản trị <span className="text-primary font-semibold">{email}</span>.
              </p>
            </div>

            <form onSubmit={handleSecondarySubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">Mật khẩu cấp 2</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type={showSecondaryPassword ? "text" : "password"}
                    placeholder="Mật khẩu cấp 2"
                    value={secondaryPassword}
                    onChange={(e) => setSecondaryPassword(e.target.value)}
                    required
                    className="pl-14 pr-12 h-16 rounded-2xl border-slate-100 bg-primary/5 focus:bg-white focus:ring-primary focus:border-primary transition-all text-lg font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecondaryPassword(!showSecondaryPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {showSecondaryPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 rounded-2xl bg-secondary hover:bg-[#FFCE54] text-primary font-black text-lg shadow-xl shadow-secondary/20 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Xác Nhận & Truy Cập <ArrowRight className="w-5 h-5" /></>}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setStep('login')}
                  className="w-full h-12 rounded-xl text-slate-400 font-bold hover:text-primary transition-colors"
                >
                  Quay lại đăng nhập
                </Button>
              </div>
            </form>
          </div>
        )}
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
