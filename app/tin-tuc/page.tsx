'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ArrowRight, Clock, User, LayoutGrid } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export default function NewsPage() {
  const news = [
    { 
      title: 'Xu hướng Quản trị Nhân sự 2026: Kỷ nguyên của AI và Trải nghiệm nhân viên', 
      date: '10/05/2026', 
      type: 'Xu Hướng', 
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop', 
      desc: 'Cùng chuyên gia phân tích những biến động mạnh mẽ của thị trường lao động và cách các bộ phận HR chuẩn bị cho tương lai kỹ thuật số.',
      author: 'Ms. Hồng Nhung'
    },
    { 
      title: 'Workshop: Tối ưu hóa chi phí nhân sự & Xây dựng hệ thống C&B bền vững', 
      date: '25/05/2026', 
      type: 'Hội Thảo', 
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop', 
      desc: 'Sự kiện chuyên sâu dành riêng cho các Quản lý và Giám đốc Nhân sự (CHRO) tại TP.HCM nhằm giải quyết bài toán tối ưu nguồn lực.',
      author: 'Inspiring HR'
    },
    { 
      title: 'Làm thế nào để xây dựng Văn hóa Doanh nghiệp thực chiến?', 
      date: '05/06/2026', 
      type: 'Góc Nhìn', 
      image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=2070&auto=format&fit=crop', 
      desc: 'Văn hóa doanh nghiệp không chỉ là những khẩu hiệu. Đó là cách đội ngũ hành động và gắn kết ngay cả khi không có sự giám sát.',
      author: 'Ms. Hồng Nhung'
    },
    { 
      title: 'Ứng dụng AI trong quy trình Tuyển dụng & Đào tạo nhân sự', 
      date: '15/06/2026', 
      type: 'Công Nghệ', 
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop', 
      desc: 'Trí tuệ nhân tạo đang tái định nghĩa cách các doanh nghiệp sàng lọc ứng viên và thiết kế lộ trình phát triển năng lực nội bộ.',
      author: 'Inspiring HR Team'
    },
    { 
      title: 'Khai giảng Khóa học: Nghề Nhân sự Chuyên nghiệp - Khóa K28', 
      date: '01/08/2026', 
      type: 'Thông Báo', 
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop', 
      desc: 'Cơ hội cuối cùng để đăng ký khóa học HR thực chiến toàn diện nhất trong năm với ưu đãi học phí lên đến 1.000.000đ.',
      author: 'Phòng Đào Tạo'
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Header section - Tinh gọn */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
            <Badge className="bg-primary/5 text-primary border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              Tin tức & Sự kiện
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary leading-tight tracking-tight">
              Tạp Chí <br />
              <span className="text-secondary italic">Tri Thức Nhân Sự</span>
            </h1>
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-xl border-l-4 border-secondary/50 pl-5">
              Nơi hội tụ những góc nhìn chuyên sâu, xu hướng quản trị hiện đại và các sự kiện đào tạo thực chiến từ Inspiring HR.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
         {/* Featured Post - Sạch sẽ hơn */}
         <div className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 mb-12">
            <Link href="/tin-tuc/chi-tiet" className="absolute inset-0 z-30" />
            <div className="grid lg:grid-cols-2 bg-white">
               <div className="relative h-72 lg:h-[450px] overflow-hidden">
                  <Image 
                    src={news[0].image} 
                    alt={news[0].title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
               </div>
               <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                  <Badge className="w-fit bg-secondary text-primary px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border-none">
                     {news[0].type}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight group-hover:text-secondary transition-colors duration-300">
                     {news[0].title}
                  </h2>
                  <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed line-clamp-3">
                     {news[0].desc}
                  </p>
                  <div className="flex items-center gap-6 pt-6 border-t border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-secondary" /> {news[0].date}
                     </div>
                     <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-secondary" /> {news[0].author}
                     </div>
                     <span className="text-primary ml-auto flex items-center gap-2 group-hover:translate-x-1 transition-transform">Đọc tiếp <ArrowRight className="w-4 h-4" /></span>
                  </div>
               </div>
            </div>
         </div>

         {/* Grid - Card HRC Style */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(1).map((item, i) => (
              <Card key={i} className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-500 group flex flex-col">
                 <div className="relative h-52 overflow-hidden">
                    <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-primary font-bold px-3 py-1 rounded-lg text-[9px] uppercase tracking-widest border-none">
                         {item.type}
                      </Badge>
                   </div>
                 </div>
                 <div className="p-7 space-y-5 flex-grow flex flex-col">
                    <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                       <div className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-secondary" /> {item.date}</div>
                       <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-secondary" /> 5 phút đọc</div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-primary line-clamp-2 leading-tight group-hover:text-secondary transition-colors flex-grow min-h-[3rem]">
                       {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">
                       {item.desc}
                    </p>
                    <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                       <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">By {item.author}</span>
                       <Link href="/tin-tuc/chi-tiet" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                       </Link>
                    </div>
                 </div>
              </Card>
            ))}
         </div>
      </div>
    </div>
  )
}
