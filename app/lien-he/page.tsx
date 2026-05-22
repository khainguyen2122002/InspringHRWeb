'use client'

import { useState } from 'react'
import { 
  Mail, Phone, MapPin, Clock, Facebook, 
  MessageCircle, Send, ArrowRight, PartyPopper, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { submitContact } from '@/app/actions'
import { toast } from 'sonner'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    
    const topic = formData.get('topic') as string
    const rawMessage = formData.get('message') as string
    const combinedMessage = `[Vấn đề: ${topic}] - ${rawMessage}`

    formData.set('message', combinedMessage)
    formData.set('type', 'contact')

    try {
      const res = await submitContact(formData)
      if (res.error) {
        throw new Error(res.error)
      }

      setIsSubmitted(true)
      form.reset()
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi gửi liên hệ: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Hotline / Zalo',
      content: '0915 099 642',
      link: 'tel:0915099642',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'inspiringhr.daotaonhansu@gmail.com',
      link: 'mailto:inspiringhr.daotaonhansu@gmail.com',
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      content: '114/2K hẻm 222 đường Trường Chinh, P. Đông Hưng Thuận, TP. HCM',
      link: '#',
      color: 'text-rose-600 bg-rose-50'
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24 pb-16 md:pb-20">
      {/* Header - Sạch sẽ */}
      <section className="bg-slate-50 py-10 md:py-16 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center max-w-2xl animate-in fade-in slide-in-from-bottom duration-700">
          <Badge className="bg-primary/5 text-primary border-none px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-3 md:mb-4">
            Liên hệ
          </Badge>
          <h1 className="text-xl md:text-4xl font-black text-primary leading-tight tracking-tight mb-4 md:mb-6 px-4 md:px-0">
            Kết Nối Cùng <span className="text-secondary italic">Inspiring HR</span>
          </h1>
          <p className="text-xs md:text-base text-slate-500 font-medium leading-relaxed px-2 md:px-0">
            Dù bạn là cá nhân muốn nâng tầm sự nghiệp hay doanh nghiệp cần giải pháp quản trị, chúng tôi luôn sẵn sàng lắng nghe và đồng hành.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
          
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-3 md:space-y-4">
            {contactInfo.map((item, i) => (
              <Card key={i} className="p-5 md:p-6 border border-slate-100 shadow-sm rounded-2xl bg-white group hover:shadow-md transition-all">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="space-y-0.5 md:space-y-1">
                    <h3 className="text-slate-400 font-bold uppercase text-[8px] md:text-[9px] tracking-widest">{item.title}</h3>
                    <p className="text-sm md:text-base font-bold text-primary leading-snug break-all sm:break-normal">{item.content}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-5 md:p-6 border-none shadow-sm rounded-2xl bg-[#0E3B0F] text-white">
               <h3 className="text-white/60 font-bold uppercase text-[8px] md:text-[9px] tracking-widest mb-3 md:mb-4">Kết nối mạng xã hội</h3>
               <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                     <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                     <MessageCircle className="w-5 h-5" />
                  </a>
               </div>
            </Card>
          </div>

          {/* Form - Tinh gọn */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100/50 rounded-2xl bg-white h-full transition-all duration-500">
              {isSubmitted ? (
                 <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                       <PartyPopper className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-2xl font-black text-primary tracking-tight">Gửi Thành Công!</h2>
                       <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto">
                          Chúng tôi sẽ phản hồi sớm nhất qua Email hoặc Số điện thoại bạn cung cấp.
                       </p>
                    </div>
                    <Button onClick={() => setIsSubmitted(false)} className="bg-primary text-white px-8 h-12 rounded-xl font-bold text-sm">
                       Gửi yêu cầu mới
                    </Button>
                 </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Họ và tên *</label>
                      <Input name="name" placeholder="Nguyễn Văn A" required className="h-11 md:h-12 rounded-xl bg-slate-50 border-none font-medium px-5 text-[13px] md:text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Số điện thoại *</label>
                      <Input name="phone" type="tel" placeholder="0901 xxx xxx" required className="h-11 md:h-12 rounded-xl bg-slate-50 border-none font-medium px-5 text-[13px] md:text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email *</label>
                      <Input name="email" type="email" placeholder="email@vi-du.com" required className="h-11 md:h-12 rounded-xl bg-slate-50 border-none font-medium px-5 text-[13px] md:text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Vấn đề quan tâm</label>
                      <select name="topic" className="w-full h-11 md:h-12 rounded-xl bg-slate-50 border-none font-medium px-5 text-[13px] md:text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 appearance-none text-slate-700">
                        <option value="Đào tạo nhân sự">Đào tạo nhân sự</option>
                        <option value="Tư vấn doanh nghiệp">Tư vấn doanh nghiệp</option>
                        <option value="Hợp tác đào tạo">Hợp tác đào tạo</option>
                        <option value="Khác...">Khác...</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nội dung tư vấn *</label>
                    <Textarea name="message" placeholder="Vui lòng để lại lời nhắn..." required className="min-h-[100px] md:min-h-[120px] rounded-xl bg-slate-50 border-none font-medium p-5 text-[13px] md:text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto h-13 md:h-14 px-10 bg-secondary hover:bg-primary hover:text-white text-primary font-black text-[13px] md:text-sm uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Gửi Yêu Cầu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
