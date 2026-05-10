'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Target, BookOpen, Clock, Layers, PhoneCall, CheckCircle2, Award, Building2, Sparkles, CalendarDays } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockDb } from '@/lib/mock-db'
import { Course } from '@/types'

export default function HomeContent() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [latestNews, setLatestNews] = useState<any[]>([])

  useEffect(() => {
    // Lấy khóa học nổi bật từ mockDb
    const courses = mockDb.getCourses().filter((c: any) => c.is_featured).slice(0, 3)
    if (courses.length === 0) {
      setFeaturedCourses(mockDb.getCourses().slice(0, 3)) // Fallback nếu không có khóa nào đánh dấu nổi bật
    } else {
      setFeaturedCourses(courses)
    }

    // Lấy tin tức mới nhất từ mockDb
    setLatestNews(mockDb.getNews().slice(0, 3))
  }, [])

  const reasons = [
    { title: 'Giảng viên Thực chiến', desc: 'Đội ngũ chuyên gia từ các Tập đoàn lớn với hơn 15 năm kinh nghiệm.', icon: Users },
    { title: 'Tính Ứng dụng Cao', desc: 'Chương trình được thiết kế bám sát bài toán thực tế của doanh nghiệp.', icon: Target },
    { title: 'Mạng lưới Kết nối', desc: 'Gia nhập cộng đồng học viên và chuyên gia nhân sự chuyên nghiệp.', icon: Building2 },
    { title: 'Cam kết Đồng hành', desc: 'Hỗ trợ giải đáp thắc mắc và tư vấn chuyên môn sau khóa học.', icon: Award }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION - CỰC ẤN TƯỢNG */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A2A0B]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            alt="HR Training Hero"
            fill
            className="object-cover opacity-40 mix-blend-overlay scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B0F] via-[#0E3B0F]/80 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="space-y-4">
               {/* Sửa Typography: Giảm size chữ, thay leading-none thành leading-[1.15] (leading-tight) để không bị dính chữ */}
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-2xl">
                 Truyền Cảm Hứng <br />
                 <span className="text-secondary">Nâng Tầm</span> Nghề Nhân Sự
               </h1>
               <p className="text-sm md:text-lg lg:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                 Hệ sinh thái đào tạo và tư vấn nhân sự toàn diện nhất cho doanh nghiệp Việt.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
              <Link 
                href="/khoa-hoc" 
                className={cn(buttonVariants({ size: "lg" }), "bg-secondary hover:bg-[#E09D00] text-primary font-black h-16 px-12 rounded-xl shadow-[0_15px_35px_rgba(242,169,0,0.3)] transition-all text-sm uppercase tracking-widest group")}
              >
                ĐĂNG KÝ NGAY <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                 href="/lien-he"
                 className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-white/10 hover:bg-white/20 text-white border-white/20 font-black h-16 px-12 rounded-xl transition-all text-sm uppercase tracking-widest backdrop-blur-md")}
              >
                NHẬN TƯ VẤN
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40">
           <p className="text-[9px] font-black uppercase tracking-[0.6em]">Khám phá thêm</p>
           <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
        </div>
      </section>

      {/* 2. CHƯƠNG TRÌNH TIÊU BIỂU */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div className="space-y-3">
                <p className="text-secondary font-bold uppercase tracking-widest text-[10px]">Chương trình đào tạo</p>
                <h2 className="text-2xl md:text-4xl font-black text-primary tracking-tight leading-snug">Khóa Học Nổi Bật</h2>
                <div className="w-16 h-1 bg-secondary rounded-full" />
             </div>
             <Link href="/khoa-hoc" className="text-primary font-bold text-sm hover:text-secondary transition-colors flex items-center gap-2 group">
                Tất cả khóa học <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image src={course.image_url || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/95 backdrop-blur-sm text-primary border-none font-bold px-3 py-1 rounded-lg text-[9px] uppercase tracking-widest shadow-md">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 flex-grow flex flex-col space-y-5">
                  <h3 className="text-lg font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-2 min-h-[3rem]">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-secondary" /> {course.sessions}</div>
                    <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-secondary" /> {course.level}</div>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <div className="space-y-0.5">
                       <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Học phí</p>
                       <span className="text-xl font-black text-primary">{new Intl.NumberFormat('vi-VN').format(Number(course.price))}đ</span>
                    </div>
                    <Link href={`/khoa-hoc/chi-tiet?id=${course.id}#register`} className="bg-secondary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-md">
                       Đăng ký
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TIN TỨC & HỘI THẢO */}
      <section className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="space-y-3">
                  <p className="text-secondary font-bold uppercase tracking-widest text-[10px]">Kiến thức & Sự kiện</p>
                  <h2 className="text-2xl md:text-4xl font-black text-primary tracking-tight leading-snug">Tin Tức & Hội Thảo</h2>
                  <div className="w-16 h-1 bg-secondary rounded-full" />
               </div>
               <Link href="/tin-tuc" className="text-primary font-bold text-sm hover:text-secondary transition-colors flex items-center gap-2 group">
                  Xem tất cả tin tức <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {latestNews.map((news, i) => (
                 <Card key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border-none flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                       <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                          <p className="text-[9px] font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
                             <CalendarDays className="w-3.5 h-3.5 text-secondary" /> {news.date}
                          </p>
                       </div>
                    </div>
                    <div className="p-8 space-y-4 flex-grow flex flex-col">
                       <h3 className="text-base md:text-lg font-bold text-primary leading-tight line-clamp-2 group-hover:text-secondary transition-colors flex-grow">
                          {news.title}
                       </h3>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                         {news.desc}
                       </p>
                       <Link href={`/tin-tuc/chi-tiet?id=${news.id}`} className="inline-flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:text-secondary transition-colors pt-4 border-t border-slate-50">
                          Đọc thêm <ArrowRight className="w-3.5 h-3.5" />
                       </Link>
                    </div>
                 </Card>
               ))}
            </div>
         </div>
      </section>

      {/* 4. VỀ CHÚNG TÔI */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] translate-x-4 translate-y-4" />
               <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                    alt="Team Inspiring HR" 
                    fill 
                    className="object-cover"
                  />
               </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                 <p className="text-secondary font-bold uppercase tracking-widest text-[11px]">Hành trình & Sứ mệnh</p>
                 <h2 className="text-3xl md:text-4xl font-black text-primary leading-tight tracking-tight">
                    Về Inspiring HR
                 </h2>
                 <div className="w-16 h-1 bg-secondary rounded-full" />
              </div>
              <div className="space-y-6 text-slate-600 text-sm leading-relaxed font-medium">
                <p>
                  Chúng tôi là đơn vị đào tạo và tư vấn nhân sự thực chiến, được sáng lập từ tâm huyết muốn nâng tầm năng lực cho đội ngũ HR Việt Nam. Tại Inspiring HR, chúng tôi không chỉ dạy lý thuyết, chúng tôi chuyển giao kinh nghiệm "xương máu" từ những chuyên gia hàng đầu.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                   <div className="space-y-1">
                      <p className="text-4xl font-black text-primary">15+</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Năm thực chiến</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-4xl font-black text-secondary">2000+</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Học viên tin dùng</p>
                   </div>
                </div>
              </div>
              <div className="pt-6">
                 <Link href="/gioi-thieu" className="bg-primary/5 text-primary font-black px-10 py-4 rounded-xl hover:bg-primary hover:text-white transition-all inline-flex items-center gap-3 text-sm uppercase tracking-widest">
                    Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LÝ DO CHỌN CHÚNG TÔI */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
           <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight leading-snug">Tại Sao Chọn Inspiring HR?</h2>
              <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {reasons.map((val, i) => (
                <Card key={i} className="p-8 rounded-[2rem] shadow-sm border border-slate-100 bg-white group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-8">
                    <val.icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-black text-primary mb-4 text-base leading-tight">{val.title}</h4>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{val.desc}</p>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* 6. CTA CUỐI TRANG / LIÊN HỆ NHANH */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-primary rounded-[3.5rem] p-12 md:p-24 text-center space-y-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10 space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  Sẵn Sàng Nâng Tầm Sự Nghiệp <br /> <span className="text-secondary italic">Cùng Chuyên Gia?</span>
                </h2>
                <p className="text-white/70 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                  Hãy để Inspiring HR đồng hành cùng bạn xây dựng lộ trình phát triển năng lực chuyên môn và thăng tiến nghề nghiệp bền vững.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                  <Link 
                    href="/lien-he" 
                    className="bg-secondary text-primary hover:bg-[#E09D00] font-black h-16 px-12 rounded-xl shadow-xl transition-all text-sm flex items-center justify-center gap-3 uppercase tracking-widest"
                  >
                    Đăng Ký Tư Vấn Ngay
                  </Link>
                  <Link 
                    href="tel:0915099642" 
                    className="bg-white/10 text-white border-2 border-white/20 hover:bg-white hover:text-primary font-black h-16 px-12 rounded-xl transition-all text-sm flex items-center justify-center gap-3 uppercase tracking-widest"
                  >
                    <PhoneCall className="w-5 h-5" /> 0915 099 642
                  </Link>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
