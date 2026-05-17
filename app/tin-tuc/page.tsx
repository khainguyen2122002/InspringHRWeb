'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ArrowRight, Clock, User, LayoutGrid, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

import { useState, useEffect } from 'react'
import { mockDb } from '@/lib/mock-db'
import { getGoogleSheetNews } from '@/app/actions'

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await getGoogleSheetNews()
        if (res && res.success && res.data && res.data.length > 0) {
          setNews(res.data)
        } else {
          setNews(mockDb.getNews())
        }
      } catch (err) {
        setNews(mockDb.getNews())
      } finally {
        setIsLoading(false)
      }
    }
    loadNews()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 pt-32 pb-20 items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-sm font-bold text-slate-400">Đang tải tin tức từ trang tính Google Sheets...</p>
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-20 items-center justify-center">
         <p className="text-slate-500 font-medium">Chưa có bài viết nào.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-20 md:pt-24 pb-16 md:pb-20">
      {/* Header section - Tinh gọn */}
      <section className="bg-white py-10 md:py-16 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
            <Badge className="bg-primary/5 text-primary border-none px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-2 md:mb-4">
              Tin tức & Sự kiện
            </Badge>
            <h1 className="text-2xl md:text-5xl font-black text-primary leading-tight tracking-tight">
              Tạp Chí <br className="hidden sm:block" />
              <span className="text-secondary italic">Tri Thức Nhân Sự</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-xl border-l-4 border-secondary/50 pl-4 md:pl-5">
              Nơi hội tụ những góc nhìn chuyên sâu, xu hướng quản trị hiện đại và các sự kiện đào tạo thực chiến từ Inspiring HR.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8 md:mt-12">
         {/* Featured Post - Sạch sẽ hơn */}
         <div className="relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 mb-8 md:mb-12">
            <Link href={`/tin-tuc/chi-tiet?id=${news[0].id}`} className="absolute inset-0 z-30" />
            <div className="grid lg:grid-cols-2 bg-white">
               <div className="relative h-60 md:h-72 lg:h-[450px] overflow-hidden">
                  <Image 
                    src={news[0].image} 
                    alt={news[0].title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
               </div>
               <div className="p-6 md:p-12 flex flex-col justify-center space-y-4 md:space-y-6">
                  <Badge className="w-fit bg-secondary text-primary px-2.5 py-1 rounded-lg text-[8px] md:text-[9px] font-bold uppercase tracking-widest border-none">
                     {news[0].type}
                  </Badge>
                  <h2 className="text-xl md:text-3xl font-black text-primary leading-tight group-hover:text-secondary transition-colors duration-300">
                     {news[0].title}
                  </h2>
                  <p className="text-[13px] md:text-base text-slate-500 font-medium leading-relaxed line-clamp-3">
                     {news[0].desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-5 md:pt-6 border-t border-slate-50 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <div className="flex items-center gap-1.5 md:gap-2">
                        <CalendarDays className="w-3.5 md:w-4 h-3.5 md:h-4 text-secondary" /> {news[0].date}
                     </div>
                     <div className="flex items-center gap-1.5 md:gap-2">
                        <User className="w-3.5 md:w-4 h-3.5 md:h-4 text-secondary" /> {news[0].author}
                     </div>
                     <span className="text-primary ml-auto flex items-center gap-2 group-hover:translate-x-1 transition-transform">Đọc tiếp <ArrowRight className="w-4 h-4" /></span>
                  </div>
               </div>
            </div>
         </div>

         {/* Grid - Card HRC Style */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {news.slice(1).map((item, i) => (
              <Card key={i} className="bg-white rounded-2xl md:rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-500 group flex flex-col">
                 <div className="relative h-48 md:h-52 overflow-hidden">
                    <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute top-3 md:top-4 left-3 md:left-4">
                      <Badge className="bg-white/90 backdrop-blur-sm text-primary font-bold px-2.5 py-1 rounded-lg text-[8px] md:text-[9px] uppercase tracking-widest border-none">
                         {item.type}
                      </Badge>
                   </div>
                 </div>
                 <div className="p-5 md:p-7 space-y-3 md:space-y-5 flex-grow flex flex-col">
                    <div className="flex items-center justify-between text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                       <div className="flex items-center gap-1.5"><CalendarDays className="w-3 md:w-3.5 h-3 md:h-3.5 text-secondary" /> {item.date}</div>
                       <div className="flex items-center gap-1.5"><Clock className="w-3 md:w-3.5 h-3 md:h-3.5 text-secondary" /> 5 phút đọc</div>
                    </div>
                    <h3 className="text-[15px] md:text-lg font-bold text-primary line-clamp-2 leading-tight group-hover:text-secondary transition-colors flex-grow min-h-[2rem] md:min-h-[3rem]">
                       {item.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                       {item.desc}
                    </p>
                    <div className="pt-3 md:pt-4 flex items-center justify-between border-t border-slate-50">
                       <span className="text-[8px] md:text-[9px] font-bold text-slate-300 uppercase tracking-widest">By {item.author}</span>
                       <Link href={`/tin-tuc/chi-tiet?id=${item.id}`} className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                          <ArrowRight className="w-3.5 h-3.5 md:w-4 h-4" />
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
