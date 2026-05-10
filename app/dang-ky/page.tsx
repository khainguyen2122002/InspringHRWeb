'use client'

import { useState, Suspense, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { toast } from 'sonner'
import { Mail, Lock, User as UserIcon, Loader2, Sparkles, ArrowRight } from 'lucide-react'

function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { register, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    if (!name || !email || !password) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    setIsLoading(true)
    try {
      const success = await register(name, email, password)
      if (success) {
        toast.success('Đăng ký thành công! Hãy đăng nhập để bắt đầu.')
        router.push('/dang-nhap')
      } else {
        toast.error('Email này đã được sử dụng. Vui lòng chọn email khác.')
      }
    } catch (error: any) {
      toast.error('Lỗi hệ thống: ' + (error.message || 'Không rõ nguyên nhân'))
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-32 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md p-8 md:p-12 border-none shadow-[0_40px_100px_rgba(0,0,0,0.08)] rounded-[3rem] bg-white relative z-10 backdrop-blur-sm border border-white/50">
        <div className="text-center space-y-4 mb-10">
          <Badge className="bg-secondary/5 text-secondary border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto w-fit">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Bắt đầu ngay
          </Badge>
          <h1 className="text-4xl font-black text-primary tracking-tight">Đăng Ký</h1>
          <p className="text-slate-400 font-medium text-sm px-6">Trở thành thành viên của cộng đồng Inspiring HR</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative group">
              <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-14 h-16 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all text-lg font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                placeholder="Email cá nhân"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-14 h-16 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all text-lg font-medium"
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
                className="pl-14 h-16 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-primary transition-all text-lg font-medium"
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
              <>Tạo Tài Khoản <ArrowRight className="w-5 h-5" /></>
            )}
          </Button>
        </form>

        <div className="mt-10 text-center space-y-6">
          <p className="text-slate-500 font-medium">
            Đã có tài khoản?{' '}
            <Link href="/dang-nhap" className="text-primary font-black hover:text-secondary transition-colors underline underline-offset-4">Đăng nhập</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
