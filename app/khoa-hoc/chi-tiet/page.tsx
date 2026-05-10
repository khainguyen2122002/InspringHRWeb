'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, Clock, Layers, CheckCircle2, ChevronDown, 
  ArrowRight, PhoneCall, Award, BookOpen, 
  Target, GraduationCap, Sparkles, PartyPopper 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Static data for the course
const courseData = {
  id: 'nghe-nhan-su-chuyen-nghiep',
  title: 'Nghề Nhân sự Chuyên nghiệp (Professional HR)',
  subtitle: 'Lộ trình thực chiến từ A-Z dành cho người mới và chuyên viên HR',
  category: 'Chuyên Sâu',
  sessions: '24 Buổi',
  commencement: 'Tháng 08/2026',
  price: 3500000,
  original_price: 3600000,
  instructor_name: 'Ms. Trần Thị Hồng Nhung',
  instructor_role: 'Founder & CEO Inspiring HR',
  platform: 'Online qua Microsoft Teams',
  benefits: [
    'Nắm vững kiến thức 6 mảng nhân sự cốt lõi.',
    'Sở hữu bộ tài liệu, biểu mẫu thực chiến 15 năm kinh nghiệm.',
    'Thực hành lập thang bảng lương, chính sách đãi ngộ chuyên nghiệp.',
    'Kỹ năng xử lý tranh chấp lao động và quan hệ nhân sự khéo léo.',
    'Nhận chứng chỉ hoàn thành khóa học từ Inspiring HR.',
    'Hỗ trợ tư vấn chuyên môn trọn đời sau khóa học.'
  ],
  curriculum: [
    { title: 'Phần 1: Tổng quan Quản trị Nhân sự Hiện đại', lessons: ['Vai trò HR trong doanh nghiệp', 'Cấu trúc bộ máy HR chuyên nghiệp', 'Quy trình vận hành nhân sự chuẩn'] },
    { title: 'Phần 2: Tuyển dụng & Thu hút Nhân tài', lessons: ['Thiết kế JD và thương hiệu tuyển dụng', 'Kỹ năng phỏng vấn hành vi BEI', 'Quy trình Onboarding hiệu quả'] },
    { title: 'Phần 3: Đào tạo & Phát triển', lessons: ['Phân tích nhu cầu đào tạo (TNA)', 'Thiết kế chương trình đào tạo nội bộ', 'Đo lường hiệu quả đào tạo (ROI)'] },
    { title: 'Phần 4: Quản trị Hiệu suất (Performance)', lessons: ['Xây dựng hệ thống KPI/OKR', 'Quy trình đánh giá nhân sự công bằng', 'Kế hoạch cải thiện hiệu suất (PIP)'] },
    { title: 'Phần 5: Lương & Phúc lợi (C&B)', lessons: ['Xây dựng thang bảng lương 3P', 'Bảo hiểm xã hội & Thuế TNCN', 'Chính sách đãi ngộ & Phúc lợi sáng tạo'] },
    { title: 'Phần 6: Pháp luật Lao động & Quan hệ nhân sự', lessons: ['Soạn thảo hợp đồng & Nội quy', 'Kỹ năng xử lý kỷ luật lao động', 'Xây dựng văn hóa doanh nghiệp gắn kết'] }
  ]
}

export default function CourseDetailPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
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

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* 1. Course Hero Section - Sạch sẽ, chữ nhỏ lại */}
      <section className="bg-primary py-16 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-5 animate-in fade-in slide-in-from-bottom duration-700">
            <Badge className="bg-secondary text-primary font-bold px-3 py-1 rounded-lg text-[10px] border-none uppercase tracking-widest">
              Khóa học {courseData.category}
            </Badge>
            <h1 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">
              {courseData.title}
            </h1>
            <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed max-w-2xl">
              {courseData.subtitle}
            </p>
            <div className="flex flex-wrap gap-5 pt-2 text-xs font-bold uppercase tracking-widest text-white/70">
               <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-secondary" /> {courseData.sessions}</div>
               <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-secondary" /> {courseData.platform}</div>
               <div className="flex items-center gap-2"><Users className="w-4 h-4 text-secondary" /> Khai giảng {courseData.commencement}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 skew-x-12 translate-x-1/2" />
      </section>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Target & Benefits */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm">
                  <Target className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-primary">Lợi ích khóa học</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {courseData.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-slate-700 text-sm font-semibold leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center shadow-sm">
                    <BookOpen className="w-5 h-5" />
                 </div>
                 <h2 className="text-xl md:text-2xl font-black text-primary">Nội dung chương trình</h2>
              </div>
              <div className="space-y-3">
                {courseData.curriculum.map((item, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-secondary w-5">0{i + 1}</span>
                        <span className="text-base font-bold text-slate-800">{item.title}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === i && (
                      <div className="pb-5 pl-16 pr-6">
                        <ul className="space-y-2.5">
                          {item.lessons.map((lesson, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-3 text-slate-600 text-sm font-medium leading-relaxed">
                              <div className="w-1 h-1 bg-slate-300 rounded-full shrink-0 mt-2" /> {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
                
                {/* Instructor */}
                <Card className="p-6 border border-slate-100 shadow-sm rounded-2xl bg-white space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-full overflow-hidden shrink-0 border border-slate-200">
                         <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt={courseData.instructor_name} width={64} height={64} className="object-cover w-full h-full" />
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-base font-black text-primary">{courseData.instructor_name}</h4>
                         <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{courseData.instructor_role}</p>
                      </div>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl">
                     <p className="text-slate-600 text-[13px] font-medium leading-relaxed italic">
                        "Kiến thức thực tiễn - Kỹ năng thực chiến. Chúng tôi giúp bạn rút ngắn thời gian để trở thành chuyên gia thực thụ."
                     </p>
                   </div>
                </Card>

                {/* Form */}
                <Card id="register" className="p-8 border-none shadow-xl shadow-slate-200/50 rounded-2xl bg-white scroll-mt-32">
                  {isSubmitted ? (
                    <div className="text-center py-10 space-y-5 animate-in zoom-in duration-500">
                       <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                          <PartyPopper className="w-8 h-8" />
                       </div>
                       <div className="space-y-2">
                          <h3 className="text-xl font-black text-primary">Đăng Ký Thành Công!</h3>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">Chúng tôi sẽ liên hệ với bạn trong vòng 24h tới.</p>
                       </div>
                       <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-xl border-slate-200 text-slate-500 font-bold text-xs h-10 px-6">Quay lại</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="text-center pb-5 border-b border-slate-50">
                        <h3 className="text-xl font-black text-primary mb-1">Đăng Ký Ngay</h3>
                        <p className="text-slate-400 font-medium text-[11px] uppercase tracking-widest">Điền thông tin để được tư vấn</p>
                      </div>
                      
                      <div className="flex flex-col gap-1.5 bg-slate-50 p-4 rounded-xl">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
                          <span>Học phí gốc</span>
                          <span className="line-through">{new Intl.NumberFormat('vi-VN').format(courseData.original_price)}đ</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-primary">Ưu đãi còn</span>
                          <span className="text-2xl font-black text-secondary">{new Intl.NumberFormat('vi-VN').format(courseData.price)}đ</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Input placeholder="Họ và tên *" required className="h-12 rounded-xl bg-slate-50 border-none font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                        <Input type="tel" placeholder="Số điện thoại *" required className="h-12 rounded-xl bg-slate-50 border-none font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                        <Input type="email" placeholder="Email liên hệ *" required className="h-12 rounded-xl bg-slate-50 border-none font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                        <Textarea placeholder="Ghi chú thêm..." className="min-h-[80px] rounded-xl bg-slate-50 border-none font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-14 bg-secondary hover:bg-primary hover:text-white text-primary font-black text-sm uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? 'Đang gửi...' : 'Xác Nhận Đăng Ký'}
                      </Button>
                      
                      <p className="text-[9px] text-center text-slate-300 font-bold uppercase tracking-widest">Bảo mật thông tin 100%</p>
                    </form>
                  )}
                </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
