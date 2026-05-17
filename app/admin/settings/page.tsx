'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { KeyRound, Mail, ShieldCheck, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const { sendAdminOtp, changeAdminPassword, user } = useAuth()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error('Mật khẩu mới phải dài tối thiểu 6 ký tự')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu nhập lại không khớp')
      return
    }

    setLoading(true)
    try {
      const code = await sendAdminOtp()
      setIsOtpSent(true)
      toast.success('Đã gửi mã xác nhận OTP đến email!', {
        description: `(Chế độ thử nghiệm) Mã OTP của bạn là: ${code}`,
        duration: 10000,
      })
    } catch (err: any) {
      toast.error('Lỗi khi gửi OTP: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpCode) {
      toast.error('Vui lòng nhập mã xác nhận OTP')
      return
    }

    setLoading(true)
    try {
      const success = await changeAdminPassword(newPassword, otpCode)
      if (success) {
        toast.success('Đổi mật khẩu thành công!', {
          description: 'Mật khẩu mới đã được cập nhật vào hệ thống bảo mật.',
        })
        setNewPassword('')
        setConfirmPassword('')
        setOtpCode('')
        setIsOtpSent(false)
      } else {
        toast.error('Mã OTP không chính xác hoặc đã hết hạn!')
      }
    } catch (err: any) {
      toast.error('Lỗi: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-black text-primary tracking-tight mb-2">Cài Đặt & Bảo Mật</h1>
        <p className="text-slate-500 font-medium">Quản lý tài khoản quản trị và thiết lập mật khẩu truy cập hệ thống Inspiring HR</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Account Info Card */}
        <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-gradient-to-r from-primary to-[#1A5F1F] text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="space-y-2">
              <Badge className="bg-white/20 text-white border-none px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-2">
                Tài Khoản Quản Trị Hệ Thống
              </Badge>
              <h2 className="text-2xl md:text-3xl font-black">{user?.name || 'Quản trị viên'}</h2>
              <div className="flex items-center gap-2 text-white/80 font-medium text-sm">
                <Mail className="w-4 h-4 text-secondary" />
                <span>inspiringhr.daotaonhansu@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-white/60">Trạng thái bảo mật</p>
                <p className="font-black text-sm text-secondary">Đã kích hoạt 2FA (Email OTP)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Change Password Card */}
        <Card className="p-8 md:p-12 border-none shadow-2xl rounded-[3rem] bg-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 font-bold border border-amber-100">
              <KeyRound className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-primary">Đổi Mật Khẩu Quản Trị</h2>
              <p className="text-slate-400 font-medium text-sm">Hệ thống sẽ gửi một mã xác minh OTP về email quản trị để xác nhận thay đổi.</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">Mật khẩu mới</label>
                <Input 
                  type="password"
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isOtpSent}
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-lg font-medium pl-5"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">Nhập lại mật khẩu mới</label>
                <Input 
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isOtpSent}
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-lg font-medium pl-5"
                />
              </div>

              {!isOtpSent ? (
                <Button 
                  type="button" 
                  onClick={handleSendOtp} 
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-primary to-[#1A5F1F] text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl transition-all mt-4"
                >
                  <Mail className="w-5 h-5 mr-2" /> Nhận Mã Xác Nhận OTP
                </Button>
              ) : (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in duration-500">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-800 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <p className="font-bold">Mã xác nhận OTP đã được gửi!</p>
                      <p className="text-amber-700">Vui lòng kiểm tra hộp thư email <strong className="underline">inspiringhr.daotaonhansu@gmail.com</strong> (hoặc thông báo Toast) để lấy mã gồm 6 chữ số.</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">Mã xác minh OTP (6 số)</label>
                    <Input 
                      type="text"
                      placeholder="••••••"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="h-16 rounded-2xl bg-slate-50 border-slate-200 text-2xl font-black text-center tracking-[0.5em]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-600/20 transition-all"
                    >
                      <CheckCircle2 className="w-6 h-6 mr-2" /> Xác Nhận Đổi Mật Khẩu
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsOtpSent(false)}
                      className="h-16 px-8 rounded-2xl font-bold border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" /> Nhập lại
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
