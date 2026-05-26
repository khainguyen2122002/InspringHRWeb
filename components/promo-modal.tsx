'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { X, Send, Loader2, User, Phone, AtSign, CheckSquare, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { submitContact } from '@/app/actions'

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyFj52ZzU5vkE_4sQUXElI1l6xzExoqZqUd3L69XtC3MMXY_rH2QLmIFqAbSQU_GNL_/exec'

// Biến lưu trữ trạng thái toàn cục trong phiên chạy hiện tại (reset khi F5/reload trang)
let hasInteractedGlobal = false

function PromoModalContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  
  const searchParams = useSearchParams()
  const isTestMode = searchParams.get('test-modal') === 'true'
  
  const interestOptions = [
    'Đào tạo nghề Nhân sự (C&B, Tuyển dụng...)',
    'Tư vấn xây dựng hệ thống nhân sự doanh nghiệp',
    'Thiết kế chính sách lương thưởng phúc lợi',
    'Kết nối tuyển dụng & Coaching định hướng',
    'Yêu cầu hỗ trợ khác'
  ]

  useEffect(() => {
    // Nếu trong phiên này đã tương tác (gửi hoặc đóng), không tự động hiện nữa
    if (hasInteractedGlobal) return

    // Thời gian chờ: 3 giây nếu là chế độ test (?test-modal=true), 5 phút (300,000ms) nếu chạy thực tế
    const delay = isTestMode ? 3000 : 300000 

    const timer = setTimeout(() => {
      setIsOpen(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [isTestMode])

  const toggleInterest = (option: string) => {
    if (selectedInterests.includes(option)) {
      setSelectedInterests(selectedInterests.filter(i => i !== option))
    } else {
      setSelectedInterests([...selectedInterests, option])
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    hasInteractedGlobal = true // Đánh dấu đã đóng, F5 mới hiện lại
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string

    if (phone.length < 10) {
      toast.error("Số điện thoại không hợp lệ")
      return
    }

    if (selectedInterests.length === 0) {
      toast.error("Vui lòng chọn ít nhất một vấn đề quan tâm")
      return
    }

    setLoading(true)

    try {
      const interestsText = selectedInterests.join(', ')
      const messageContent = `[Đăng ký từ Popup] Các vấn đề quan tâm: ${interestsText}`
      
      // Tạo FormData mới để gửi qua action
      const submitData = new FormData()
      submitData.append('name', name)
      submitData.append('phone', phone)
      submitData.append('email', email)
      submitData.append('message', messageContent)
      submitData.append('type', 'popup_consultation')

      const res = await submitContact(submitData)
      if (res && 'error' in res && res.error) {
        throw new Error(res.error)
      }

      // Gửi sang Google Sheets Webhook
      const webhookData = {
        name,
        email,
        phone,
        message: messageContent,
        courseTitle: 'Đăng ký nhận tư vấn từ Popup',
        type: 'contact'
      }

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      })

      toast.success("Đăng ký tư vấn thành công!", {
        description: "Inspiring HR sẽ liên hệ với bạn trong thời gian sớm nhất.",
      })
      
      setIsOpen(false)
      hasInteractedGlobal = true // Đánh dấu đã gửi thành công, F5 mới hiện lại
    } catch (err: any) {
      toast.error("Đã xảy ra lỗi: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button 
          onClick={handleClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-all z-10"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Nền Mesh Gradient ở đầu Modal */}
        <div className="bg-mesh-green p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Tư Vấn Lộ Trình & Nhận Tài Liệu HR
            </h3>
            <p className="text-white/80 text-xs md:text-sm font-medium">
              Đồng hành cùng Chuyên gia có hơn 15 năm kinh nghiệm thực chiến.
            </p>
          </div>
        </div>

        {/* Form điền thông tin */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 bg-white">
          <div className="space-y-4">
            {/* Họ và tên */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input 
                name="name"
                placeholder="Họ và tên của bạn" 
                required
                className="pl-11 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-primary text-sm font-medium"
              />
            </div>

            {/* Số điện thoại & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  name="phone"
                  placeholder="Số điện thoại" 
                  required
                  className="pl-11 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-primary text-sm font-medium"
                />
              </div>
              <div className="relative group">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  name="email"
                  type="email"
                  placeholder="Địa chỉ Email" 
                  required
                  className="pl-11 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-primary text-sm font-medium"
                />
              </div>
            </div>

            {/* Vấn đề quan tâm (Checkbox) */}
            <div className="space-y-2.5 pt-2">
              <label className="text-xs font-black text-primary uppercase tracking-wider block">
                Nội dung bạn đang quan tâm:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {interestOptions.map((option, idx) => {
                  const isChecked = selectedInterests.includes(option)
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleInterest(option)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        isChecked 
                          ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm' 
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 text-slate-600 font-medium'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                      <span className="text-[13px] leading-snug">{option}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Nút gửi */}
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-secondary hover:bg-[#FFCE54] text-primary font-black text-base rounded-xl shadow-lg shadow-[#FFB606]/10 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Nhận tư vấn miễn phí <Send className="w-4 h-4" /></>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export function PromoModal() {
  return (
    <Suspense fallback={null}>
      <PromoModalContent />
    </Suspense>
  )
}
