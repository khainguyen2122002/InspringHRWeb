'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { KeyRound, Mail, ShieldCheck, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const { changePrimaryPassword, changeSecondaryPassword, user } = useAuth()
  
  // Layer 1 state
  const [newPrimaryPass, setNewPrimaryPass] = useState('')
  const [confirmPrimaryPass, setConfirmPrimaryPass] = useState('')
  const [showPrimary, setShowPrimary] = useState(false)
  const [loadingPrimary, setLoadingPrimary] = useState(false)

  // Layer 2 state
  const [currentSecondaryPass, setCurrentSecondaryPass] = useState('')
  const [newSecondaryPass, setNewSecondaryPass] = useState('')
  const [confirmSecondaryPass, setConfirmSecondaryPass] = useState('')
  const [showSecondary, setShowSecondary] = useState(false)
  const [loadingSecondary, setLoadingSecondary] = useState(false)

  const handleChangePrimary = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPrimaryPass || newPrimaryPass.length < 6) {
      toast.error('Mật khẩu mới phải dài tối thiểu 6 ký tự')
      return
    }
    if (newPrimaryPass !== confirmPrimaryPass) {
      toast.error('Mật khẩu xác nhận không khớp')
      return
    }

    setLoadingPrimary(true)
    try {
      const result = await changePrimaryPassword(newPrimaryPass)
      if (result.success) {
        toast.success('Đổi mật khẩu cấp 1 thành công!', {
          description: 'Mật khẩu đăng nhập Supabase của tài khoản admin đã được cập nhật.',
        })
        setNewPrimaryPass('')
        setConfirmPrimaryPass('')
      } else {
        toast.error(result.error || 'Có lỗi xảy ra khi đổi mật khẩu cấp 1.')
      }
    } catch (err: any) {
      toast.error('Lỗi: ' + err.message)
    } finally {
      setLoadingPrimary(false)
    }
  }

  const handleChangeSecondary = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentSecondaryPass) {
      toast.error('Vui lòng nhập mật khẩu cấp 2 hiện tại')
      return
    }
    if (!newSecondaryPass || newSecondaryPass.length < 6) {
      toast.error('Mật khẩu cấp 2 mới phải dài tối thiểu 6 ký tự')
      return
    }
    if (newSecondaryPass !== confirmSecondaryPass) {
      toast.error('Mật khẩu xác nhận cấp 2 không khớp')
      return
    }
    if (!user?.email) {
      toast.error('Không tìm thấy thông tin email admin đăng nhập.')
      return
    }

    setLoadingSecondary(true)
    try {
      const result = await changeSecondaryPassword(user.email, currentSecondaryPass, newSecondaryPass)
      if (result.success) {
        toast.success('Đổi mật khẩu cấp 2 thành công!', {
          description: 'Mật khẩu bảo mật cấp 2 đã được cập nhật vào bảng CSDL an toàn.',
        })
        setCurrentSecondaryPass('')
        setNewSecondaryPass('')
        setConfirmSecondaryPass('')
      } else {
        toast.error(result.error || 'Đổi mật khẩu cấp 2 thất bại. Hãy kiểm tra mật khẩu hiện tại.')
      }
    } catch (err: any) {
      toast.error('Lỗi: ' + err.message)
    } finally {
      setLoadingSecondary(false)
    }
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-black text-primary tracking-tight mb-2">Cài Đặt & Bảo Mật</h1>
        <p className="text-slate-500 font-medium">Quản lý tài khoản quản trị và thiết lập các lớp mật khẩu truy cập hệ thống Inspiring HR</p>
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
                <span>{user?.email || 'inspiringhr.daotaonhansu@gmail.com'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-white/60">Trạng thái bảo mật</p>
                <p className="font-black text-sm text-secondary">Đã kích hoạt 2 lớp mật khẩu thực tế</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Change Primary Password Card */}
        <Card className="p-8 md:p-12 border-none shadow-2xl rounded-[3rem] bg-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 font-bold border border-emerald-100">
              <KeyRound className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-primary">Đổi Mật Khẩu Cấp 1 (Đăng nhập)</h2>
              <p className="text-slate-400 font-medium text-sm">Mật khẩu chính dùng để đăng nhập tài khoản admin qua Supabase Auth.</p>
            </div>
          </div>

          <form onSubmit={handleChangePrimary} className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">Mật khẩu cấp 1 mới</label>
                <div className="relative group">
                  <Input 
                    type={showPrimary ? "text" : "password"}
                    placeholder="Nhập mật khẩu cấp 1 mới (tối thiểu 6 ký tự)"
                    value={newPrimaryPass}
                    onChange={(e) => setNewPrimaryPass(e.target.value)}
                    className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-lg font-medium pl-5 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPrimary(!showPrimary)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {showPrimary ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">Xác nhận mật khẩu cấp 1</label>
                <Input 
                  type={showPrimary ? "text" : "password"}
                  placeholder="Xác nhận lại mật khẩu mới"
                  value={confirmPrimaryPass}
                  onChange={(e) => setConfirmPrimaryPass(e.target.value)}
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-lg font-medium pl-5"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loadingPrimary}
                className="w-full h-14 bg-gradient-to-r from-primary to-[#1A5F1F] text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl transition-all mt-4"
              >
                {loadingPrimary ? 'Đang cập nhật...' : 'Cập Nhật Mật Khẩu Cấp 1'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Change Secondary Password Card */}
        <Card className="p-8 md:p-12 border-none shadow-2xl rounded-[3rem] bg-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 font-bold border border-amber-100">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-primary">Đổi Mật Khẩu Cấp 2 (Bảo mật nâng cao)</h2>
              <p className="text-slate-400 font-medium text-sm">Mật khẩu phụ lưu trong CSDL dùng để xác thực bước 2 cho tài khoản admin.</p>
            </div>
          </div>

          <form onSubmit={handleChangeSecondary} className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">Mật khẩu cấp 2 hiện tại</label>
                <div className="relative group">
                  <Input 
                    type={showSecondary ? "text" : "password"}
                    placeholder="Nhập mật khẩu cấp 2 hiện tại"
                    value={currentSecondaryPass}
                    onChange={(e) => setCurrentSecondaryPass(e.target.value)}
                    className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-lg font-medium pl-5 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecondary(!showSecondary)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    {showSecondary ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">Mật khẩu cấp 2 mới</label>
                <Input 
                  type={showSecondary ? "text" : "password"}
                  placeholder="Nhập mật khẩu cấp 2 mới (tối thiểu 6 ký tự)"
                  value={newSecondaryPass}
                  onChange={(e) => setNewSecondaryPass(e.target.value)}
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-lg font-medium pl-5"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">Xác nhận mật khẩu cấp 2 mới</label>
                <Input 
                  type={showSecondary ? "text" : "password"}
                  placeholder="Xác nhận lại mật khẩu mới"
                  value={confirmSecondaryPass}
                  onChange={(e) => setConfirmSecondaryPass(e.target.value)}
                  className="h-14 rounded-2xl bg-slate-50 border-slate-200 text-lg font-medium pl-5"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loadingSecondary}
                className="w-full h-14 bg-gradient-to-r from-secondary to-[#E09D00] text-primary font-black text-lg rounded-2xl shadow-xl shadow-secondary/20 hover:shadow-2xl transition-all mt-4"
              >
                {loadingSecondary ? 'Đang cập nhật...' : 'Cập Nhật Mật Khẩu Cấp 2'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
