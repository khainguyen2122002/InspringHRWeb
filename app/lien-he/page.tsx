'use client'

import { useState } from 'react'
import { 
  Mail, Phone, MapPin, Clock, Facebook, 
  MessageCircle, Send, ArrowRight, PartyPopper 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
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
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Header - Sạch sẽ */}
      <section className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center max-w-2xl animate-in fade-in slide-in-from-bottom duration-700">
          <Badge className="bg-primary/5 text-primary border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            Liên hệ
          </Badge>
          <h1 className="text-2xl md:text-4xl font-black text-primary leading-tight tracking-tight mb-6">
            Kết Nối Cùng <span className="text-secondary italic">Inspiring HR</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
            Dù bạn là cá nhân muốn nâng tầm sự nghiệp hay doanh nghiệp cần giải pháp quản trị, chúng tôi luôn sẵn sàng lắng nghe và đồng hành.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((item, i) => (
              <Card key={i} className="p-6 border border-slate-100 shadow-sm rounded-2xl bg-white group hover:shadow-md transition-all">
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{item.title}</h3>
                    <p className="text-base font-bold text-primary leading-snug">{item.content}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 border-none shadow-sm rounded-2xl bg-[#0E3B0F] text-white">
               <h3 className="text-white/60 font-bold uppercase text-[9px] tracking-widest mb-4">Kết nối mạng xã hội</h3>
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
            <Card className="p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100/50 rounded-2xl bg-white h-full transition-all duration-500">
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Họ và tên *</label>
                      <Input placeholder="Nguyễn Văn A" required className="h-12 rounded-xl bg-slate-50 border-none font-medium px-5 text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Số điện thoại *</label>
                      <Input type="tel" placeholder="0901 xxx xxx" required className="h-12 rounded-xl bg-slate-50 border-none font-medium px-5 text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email *</label>
                      <Input type="email" placeholder="email@vi-du.com" required className="h-12 rounded-xl bg-slate-50 border-none font-medium px-5 text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Vấn đề quan tâm</label>
                      <select className="w-full h-12 rounded-xl bg-slate-50 border-none font-medium px-5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 appearance-none text-slate-700">
                        <option>Đào tạo nhân sự</option>
                        <option>Tư vấn doanh nghiệp</option>
                        <option>Hợp tác đào tạo</option>
                        <option>Khác...</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nội dung tư vấn *</label>
                    <Textarea placeholder="Vui lòng để lại lời nhắn..." required className="min-h-[120px] rounded-xl bg-slate-50 border-none font-medium p-5 text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto h-14 px-10 bg-secondary hover:bg-primary hover:text-white text-primary font-black text-sm uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center gap-2 group"
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi Yêu Cầu'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
