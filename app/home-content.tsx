'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Target, BookOpen, Clock, Layers, PhoneCall, CheckCircle2, Award, Building2, Sparkles, CalendarDays, Eye, Compass, Briefcase } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getGoogleSheetNews, getCourses } from '@/app/actions'
import { mockDb } from '@/lib/mock-db'
import { Course } from '@/types'
import { GalleryCarousel } from '@/components/gallery-carousel'
import { SectionDivider } from '@/components/section-divider'

export default function HomeContent() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [latestNews, setLatestNews] = useState<any[]>([])

  useEffect(() => {
    // Lấy danh sách khóa học từ Supabase
    async function loadCourses() {
      try {
        const res = await getCourses()
        if (res && res.success && res.data && res.data.length > 0) {
          // Lấy 4 khóa học, ưu tiên các khóa học nổi bật (is_featured)
          const featured = res.data.filter((c: Course) => c.is_featured)
          const nonFeatured = res.data.filter((c: Course) => !c.is_featured)
          setFeaturedCourses([...featured, ...nonFeatured].slice(0, 4))
        } else {
          setFeaturedCourses(mockDb.getCourses().slice(0, 4))
        }
      } catch (e) {
        console.error('Lỗi lấy khóa học:', e)
        setFeaturedCourses(mockDb.getCourses().slice(0, 4))
      }
    }

    // Lấy tin tức mới nhất từ Google Sheets (Supabase)
    async function loadLatestNews() {
      try {
        const res = await getGoogleSheetNews()
        if (res && res.success && res.data && res.data.length > 0) {
          setLatestNews(res.data.slice(0, 5))
        } else {
          setLatestNews(mockDb.getNews().slice(0, 5))
        }
      } catch (e) {
        console.error('Lỗi lấy tin tức:', e)
        setLatestNews(mockDb.getNews().slice(0, 5))
      }
    }

    loadCourses()
    loadLatestNews()
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-mesh-green z-0">
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
          <div className="max-w-4xl mx-auto space-y-5 md:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="space-y-3 md:space-y-4">
               <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.2] md:leading-tight tracking-tight text-white drop-shadow-2xl px-2 sm:px-0">
                 Truyền Cảm Hứng & <br className="hidden sm:block" />
                 <span className="text-secondary">Nâng Tầm Năng Lực</span> <br className="hidden sm:block" />
                 Người Làm Nghề Nhân Sự
               </h1>
               <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/90 font-bold max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-6 sm:px-0 uppercase tracking-wider">
                 Truyền cảm hứng và nâng tầm năng lực cho người làm nghề Nhân sự
               </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5 pt-2 md:pt-6 px-8 sm:px-0">
              <Link 
                href="/khoa-hoc" 
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto bg-secondary hover:bg-[#FFCE54] text-primary font-black h-12 md:h-16 px-10 md:px-12 rounded-xl shadow-xl transition-all text-[12px] md:text-sm uppercase tracking-widest group")}
              >
                ĐĂNG KÝ NGAY <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                 href="/lien-he"
                 className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 font-black h-12 md:h-16 px-10 md:px-12 rounded-xl transition-all text-[12px] md:text-sm uppercase tracking-widest backdrop-blur-md")}
              >
                NHẬN TƯ VẤN
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 text-white/40">
           <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.6em]">Khám phá thêm</p>
           <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-secondary to-transparent" />
        </div>
      </section>

      {/* 2. TIN TỨC & SỰ KIỆN */}
      <section className="py-12 md:py-20 bg-primary/5">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center mb-10 md:mb-16 gap-4">
               <SectionDivider 
                 title="Tin Tức & Sự Kiện Mới Nhất" 
                 subtitle="Kiến thức & Sự kiện" 
                 align="center"
               />
               <Link href="/tin-tuc" className="text-primary font-bold text-[13px] md:text-sm hover:text-secondary transition-colors flex items-center gap-2 group mt-2">
                  Xem tất cả tin tức <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
               <div className="lg:col-span-3">
                 {latestNews[0] && (
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100 flex flex-col h-full">
                       <Link href={`/tin-tuc/chi-tiet?id=${latestNews[0].id}`} className="relative aspect-[16/10] w-full overflow-hidden block">
                          <Image 
                            src={latestNews[0].image} 
                            alt={latestNews[0].title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                          />
                          <div className="absolute top-4 left-4">
                             <Badge className="bg-primary text-white font-bold px-3 py-1.5 rounded-lg border-none uppercase text-[9px] tracking-widest">
                               {latestNews[0].type}
                             </Badge>
                          </div>
                       </Link>
                       <div className="p-6 md:p-8 flex flex-col flex-grow justify-between space-y-4">
                          <div className="space-y-3">
                             <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-secondary" /> {latestNews[0].date}</span>
                                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-secondary" /> {latestNews[0].views} lượt xem</span>
                             </div>
                             <Link href={`/tin-tuc/chi-tiet?id=${latestNews[0].id}`} className="block">
                                <h3 className="text-xl md:text-2xl font-black text-primary leading-tight hover:text-secondary transition-colors line-clamp-2">
                                   {latestNews[0].title}
                                </h3>
                             </Link>
                             <p className="text-[13px] md:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                                {latestNews[0].desc}
                             </p>
                          </div>
                          <div className="pt-2">
                             <Link href={`/tin-tuc/chi-tiet?id=${latestNews[0].id}`} className="inline-flex items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-white font-black px-6 py-3 rounded-xl transition-all text-xs uppercase tracking-widest gap-2">
                                Xem chi tiết <ArrowRight className="w-4 h-4" />
                             </Link>
                          </div>
                       </div>
                    </div>
                 )}
               </div>
 
               <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                  {latestNews.slice(1, 5).map((news, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                       <Link href={`/tin-tuc/chi-tiet?id=${news.id}`} className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-100 block">
                          <Image 
                            src={news.image} 
                            alt={news.title} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                       </Link>
                       <div className="space-y-2 py-1 flex-grow">
                          <div className="flex items-center gap-3 text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                             <span className="text-secondary">{news.type}</span>
                             <span>{news.date}</span>
                          </div>
                          <Link href={`/tin-tuc/chi-tiet?id=${news.id}`} className="block">
                             <h4 className="text-sm md:text-[15px] font-bold text-primary leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                                {news.title}
                             </h4>
                          </Link>
                          <div className="w-0 group-hover:w-12 h-0.5 bg-secondary transition-all duration-300 rounded-full" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 3. KHÓA HỌC NỔI BẬT */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center mb-10 md:mb-16 gap-4">
             <SectionDivider 
               title="Khóa Học Nổi Bật" 
               subtitle="Chương trình đào tạo" 
               align="center"
             />
             <Link href="/khoa-hoc" className="text-primary font-bold text-[13px] md:text-sm hover:text-secondary transition-colors flex items-center gap-2 group mt-2">
                Tất cả khóa học <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              {featuredCourses[0] && (
                <div className="group cursor-pointer">
                  <Link href={`/khoa-hoc/chi-tiet?id=${featuredCourses[0].id}`}>
                    <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-6 md:mb-8">
                      <Image 
                        src={featuredCourses[0].image_url} 
                        alt={featuredCourses[0].title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 md:top-6 left-4 md:left-6">
                        <Badge className="bg-secondary text-primary font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[9px] md:text-[10px] uppercase tracking-widest shadow-lg border-none">
                          Nổi bật nhất
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 text-white">
                        <div className="flex items-center gap-4 text-[10px] md:text-[11px] font-bold text-white/80 uppercase tracking-widest mb-2 md:mb-4">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-secondary" /> {featuredCourses[0].sessions}</span>
                          <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-secondary" /> {featuredCourses[0].views} lượt xem</span>
                        </div>
                        <h3 className="text-xl md:text-4xl font-black mb-3 md:mb-5 leading-tight group-hover:text-secondary transition-colors">
                          {featuredCourses[0].title}
                        </h3>
                        <p className="text-white/70 text-xs md:text-base font-medium line-clamp-2 max-w-3xl mb-4 md:mb-6 leading-relaxed">
                          {featuredCourses[0].description}
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white text-primary px-5 md:px-8 py-2.5 md:py-4 rounded-xl font-black text-[10px] md:text-[12px] uppercase tracking-widest hover:bg-secondary transition-all">
                          Xem chi tiết <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 md:gap-8">
              {featuredCourses.slice(1, 4).map((course) => (
                <Link key={course.id} href={`/khoa-hoc/chi-tiet?id=${course.id}`} className="group block">
                  <div className="flex gap-4 md:gap-6 items-start">
                    <div className="relative w-28 md:w-36 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-md">
                      <Image 
                        src={course.image_url} 
                        alt={course.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3 py-1">
                      <div className="flex items-center gap-3 text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                        <span className="text-secondary">{course.category}</span>
                        <span className="flex items-center gap-1"><Eye className="w-2.5 h-2.5" /> {course.views}</span>
                      </div>
                      <h4 className="text-sm md:text-[15px] font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                        {course.title}
                      </h4>
                      <p className="text-[10px] md:text-[11px] font-bold text-primary/80">
                         {new Intl.NumberFormat('vi-VN').format(Number(course.price))}đ
                      </p>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CÁC DỊCH VỤ CỦA INSPIRING HR */}
      <section className="py-12 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center mb-12 md:mb-16">
              <SectionDivider 
                title="Các dịch vụ của Inspiring HR" 
                subtitle="Đồng hành cùng bạn từ đào tạo, coaching đến tư vấn hệ thống nhân sự chuyên sâu" 
                align="center"
              />
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 */}
              <Link href="/khoa-hoc" className="group block">
                <Card className="h-full border-none shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-[#0E3B0F] text-white rounded-2xl">
                  <CardContent className="p-8 flex flex-col h-full relative z-10">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-4 leading-tight group-hover:text-secondary transition-colors">Đào tạo Nhà Quản Lý & Người Làm Nhân Sự</h3>
                    <p className="text-white/80 text-sm mb-8 flex-grow leading-relaxed">Từ cơ bản đến chuyên sâu với 100% nội dung thực tiễn, case study thực tế từ doanh nghiệp.</p>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/90 bg-white/10 py-2 px-4 rounded-xl inline-block mt-auto w-fit">
                      24 buổi • Online/Offline • Có chứng nhận
                    </div>
                  </CardContent>
                </Card>
              </Link>
 
              {/* Card 2 */}
              <Link href="https://zalo.me/0915099642" target="_blank" className="group block">
                <Card className="h-full border-none shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-[#1E5F23] text-white rounded-2xl">
                  <CardContent className="p-8 flex flex-col h-full relative z-10">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                      <Compass className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-black mb-4 leading-tight group-hover:text-secondary transition-colors">Coaching Sự Nghiệp Cá Nhân</h3>
                    <p className="text-white/80 text-sm mb-8 flex-grow leading-relaxed">Hỗ trợ 1-1 định hướng nghề nghiệp, xây dựng lộ trình phát triển và kỹ năng phỏng vấn cho HR.</p>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/90 bg-white/10 py-2 px-4 rounded-xl inline-block mt-auto w-fit">
                      Coaching trực tiếp với chuyên gia {'>'}15 năm kinh nghiệm
                    </div>
                  </CardContent>
                </Card>
              </Link>
 
              {/* Card 3 */}
              <Link href="/tu-van-doanh-nghiep" className="group block">
                <Card className="h-full border border-amber-100/10 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-[#FFF9E6] text-[#0E3B0F] rounded-2xl">
                  <CardContent className="p-8 flex flex-col h-full relative z-10">
                    <div className="w-14 h-14 bg-[#0E3B0F]/5 rounded-2xl flex items-center justify-center mb-6">
                      <Briefcase className="w-7 h-7 text-[#0E3B0F]" />
                    </div>
                    <h3 className="text-xl font-black mb-4 leading-tight group-hover:text-amber-600 transition-colors">Tư Vấn Doanh Nghiệp</h3>
                    <p className="text-[#0E3B0F]/80 text-sm mb-8 flex-grow leading-relaxed">Xây dựng hệ thống quản trị nhân sự, chính sách, quy trình, KPI, lương thưởng và tư vấn pháp lý lao động.</p>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[#0E3B0F]/90 bg-[#0E3B0F]/5 py-2 px-4 rounded-xl inline-block mt-auto w-fit">
                      Đồng hành cùng doanh nghiệp phát triển bền vững
                    </div>
                  </CardContent>
                </Card>
              </Link>
           </div>
        </div>
      </section>

      {/* 5. LÝ DO CHỌN CHÚNG TÔI */}
      <section className="py-12 md:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
           <div className="text-center mb-12 md:mb-16">
              <SectionDivider 
                title="Tại Sao Chọn Inspiring HR?" 
                subtitle="Đồng hành bứt phá" 
                align="center"
              />
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {reasons.map((val, i) => (
                <Card key={i} className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 bg-white group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/5 rounded-xl md:rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-6 md:mb-8">
                    <val.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h4 className="font-black text-primary mb-3 md:mb-4 text-[15px] md:text-base leading-tight">{val.title}</h4>
                  <p className="text-[12px] md:text-[13px] text-slate-500 font-medium leading-relaxed">{val.desc}</p>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* 6. KHOẢNH KHẮC THỰC TẾ (GALLERY CAROUSEL) */}
      <GalleryCarousel />

      {/* 7. CTA CUỐI TRANG / LIÊN HỆ NHANH */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-mesh-green rounded-[2rem] md:rounded-[3.5rem] p-8 sm:p-12 md:p-24 text-center space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10 space-y-6 md:space-y-8">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  Sẵn Sàng Nâng Tầm Sự Nghiệp <br className="hidden md:block" /> <span className="text-secondary italic">Cùng Chuyên Gia?</span>
                </h2>
                <p className="text-white/70 text-xs md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                  Hãy để Inspiring HR đồng hành cùng bạn xây dựng lộ trình phát triển năng lực chuyên môn và thăng tiến nghề nghiệp bền vững.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 md:pt-6">
                  <Link 
                    href="/lien-he" 
                    className="bg-secondary text-primary hover:bg-[#FFCE54] font-black h-14 md:h-16 px-10 md:px-12 rounded-xl shadow-xl transition-all text-[13px] md:text-sm flex items-center justify-center gap-3 uppercase tracking-widest w-full sm:w-auto"
                  >
                    Đăng Ký Tư Vấn Ngay
                  </Link>
                  <Link 
                    href="tel:0915099642" 
                    className="bg-white/10 text-white border-2 border-white/20 hover:bg-white hover:text-primary font-black h-14 md:h-16 px-10 md:px-12 rounded-xl transition-all text-[13px] md:text-sm flex items-center justify-center gap-3 uppercase tracking-widest w-full sm:w-auto"
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
