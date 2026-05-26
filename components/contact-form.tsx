'use client'

import { useState } from 'react'
import { Send, Loader2, MessageSquare, User, AtSign, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { submitContact } from '@/app/actions'

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyFj52ZzU5vkE_4sQUXElI1l6xzExoqZqUd3L69XtC3MMXY_rH2QLmIFqAbSQU_GNL_/exec'

interface ContactFormProps {
  courseId?: string
  courseTitle?: string
}

export function ContactForm({ courseId, courseTitle }: ContactFormProps) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)
    
    try {
      const formData = new FormData(form)
      const name = formData.get('name') as string
      const phone = formData.get('phone') as string
      
      if (phone.length < 10) {
        toast.error("Số điện thoại không hợp lệ")
        setLoading(false)
        return
      }

      if (courseId) formData.append('courseId', courseId)
      if (courseTitle) formData.append('courseTitle', courseTitle)
      formData.append('type', courseTitle ? 'registration' : 'contact')

      const data = {
        name,
        email: formData.get('email') as string,
        phone,
        message: formData.get('message') as string,
        courseTitle: courseTitle || null,
        type: courseTitle ? 'registration' : 'contact'
      }
      
      const res = await submitContact(formData)
      if (res && 'error' in res && res.error) {
        throw new Error(res.error)
      }

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      toast.success("Cảm ơn bạn, chúng tôi sẽ liên hệ sớm!", {
        description: "Yêu cầu của bạn đã được chuyển đến bộ phận tư vấn.",
      })
      form.reset()
    } catch (error: any) {
      toast.error("Lỗi: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CardContent className="p-0 space-y-8">
      <div className="space-y-2">
        <h3 className="text-3xl font-black text-primary">
          {courseTitle ? `Đăng ký học` : 'Gửi tin nhắn'}
        </h3>
        <p className="text-slate-500 font-bold italic">{courseTitle ? courseTitle : 'Tư vấn chuyên sâu 24/7'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
            <Input 
              name="name"
              placeholder="Họ và tên của bạn" 
              required
              className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary text-md"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
              <Input 
                name="email"
                type="email"
                placeholder="Địa chỉ Email" 
                required
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary text-md"
              />
            </div>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
              <Input 
                name="phone"
                placeholder="Số điện thoại" 
                required
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary text-md"
              />
            </div>
          </div>

          <div className="relative group">
            <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
            <Textarea 
              name="message"
              placeholder={courseTitle ? "Ghi chú thêm (thời gian học, yêu cầu riêng...)" : "Nội dung cần tư vấn..."}
              className="pl-12 pt-5 min-h-[160px] bg-slate-50 border-none rounded-3xl focus-visible:ring-primary text-md"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-16 bg-[#FFB606] hover:bg-[#D99600] text-[#0E3B0F] font-black text-xl rounded-2xl shadow-2xl shadow-yellow-500/10 transition-all active:scale-95"
        >
          {loading ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            <>Gửi yêu cầu ngay <Send className="ml-2 w-5 h-5" /></>
          )}
        </Button>
      </form>
    </CardContent>
  )
}
