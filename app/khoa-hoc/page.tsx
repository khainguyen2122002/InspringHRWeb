'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Clock, Users, ArrowRight, Layers, Star, CheckCircle2, Sparkles, LayoutGrid, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockDb } from '@/lib/mock-db'
import { Course } from '@/types'

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = () => {
      const data = mockDb.getCourses()
      setCourses(data)
      setLoading(false)
    }
    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                          course.description.toLowerCase().includes(search.toLowerCase())
    const matchesLevel = levelFilter === 'all' || (course.level && course.level.includes(levelFilter))
    return matchesSearch && matchesLevel
  })

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="max-w-4xl mb-12 space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
          <Badge className="bg-primary/5 text-primary border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 w-fit">
            <LayoutGrid className="w-3.5 h-3.5" /> Danh mục đào tạo
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary tracking-tight leading-tight">
            Nâng Tầm Năng Lực <br />
            <span className="text-secondary italic">Nghề Nhân Sự Chuyên Nghiệp</span>
          </h1>
          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-xl">
            Khám phá các lộ trình đào tạo thực chiến được thiết kế bởi những chuyên gia hàng đầu, giúp bạn làm chủ mọi khía cạnh trong Quản trị nhân sự.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Tìm kiếm khóa học..." 
              className="pl-12 h-14 bg-slate-50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20 text-base font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={levelFilter} onValueChange={(val) => setLevelFilter(val || 'all')}>
              <SelectTrigger className="h-14 bg-slate-50 border-none rounded-xl px-6 font-bold text-primary text-sm">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-secondary" />
                  <SelectValue placeholder="Tất cả hình thức" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none shadow-xl">
                <SelectItem value="all" className="font-bold py-2">Tất cả hình thức</SelectItem>
                <SelectItem value="Online" className="font-bold py-2">Học Online</SelectItem>
                <SelectItem value="Offline" className="font-bold py-2">Học Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        )}

        {/* Courses Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-500 flex flex-col relative">
                {course.is_featured && (
                  <div className="absolute top-4 left-4 z-10">
                     <Badge className="bg-secondary text-primary font-bold px-3 py-1 rounded-lg text-[9px] uppercase tracking-widest shadow-md border-none">
                        Nổi bật
                     </Badge>
                  </div>
                )}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  {course.image_url && (
                    <Image 
                      src={course.image_url} 
                      alt={course.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-bold text-[9px] uppercase tracking-widest">
                     <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10"><Clock className="w-3.5 h-3.5 text-secondary" /> {course.sessions}</div>
                     <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10"><CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> {course.status}</div>
                  </div>
                </div>

                <CardContent className="p-8 flex-grow flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-secondary border-secondary font-bold px-2 py-0.5 text-[9px] uppercase tracking-widest">
                      {course.category}
                    </Badge>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{course.commencement}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-primary line-clamp-2 leading-tight group-hover:text-secondary transition-colors min-h-[2.5rem]">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs font-medium line-clamp-3 leading-relaxed flex-grow">
                    {course.description}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-300 line-through tracking-widest uppercase mb-0.5">
                          {new Intl.NumberFormat('vi-VN').format(Number(course.original_price || 0))}đ
                        </span>
                        <span className="text-2xl font-black text-primary">
                          {new Intl.NumberFormat('vi-VN').format(Number(course.price || 0))}đ
                        </span>
                      </div>
                      {course.level && (
                        <div className="text-right">
                          <span className="block text-[9px] uppercase text-slate-400 font-bold tracking-widest mb-0.5">Hình thức</span>
                          <span className="text-xs font-bold text-slate-700">{course.level}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link href={`/khoa-hoc/chi-tiet?id=${course.id}`} className="w-full">
                        <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 font-bold text-slate-500 hover:bg-slate-50 hover:text-primary transition-all text-xs uppercase tracking-widest">
                          Chi tiết
                        </Button>
                      </Link>
                      <Link href={`/khoa-hoc/chi-tiet?id=${course.id}#register`} className="w-full">
                        <Button className="w-full h-11 rounded-xl bg-secondary hover:bg-primary hover:text-white text-primary font-bold shadow-md transition-all text-xs uppercase tracking-widest">
                          Đăng ký
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-20 space-y-4">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Search className="w-8 h-8" />
             </div>
             <p className="text-slate-500 font-bold">Không tìm thấy khóa học phù hợp.</p>
             <Button variant="link" onClick={() => {setSearch(''); setLevelFilter('all')}} className="text-primary font-bold text-sm">Xem tất cả</Button>
          </div>
        )}
      </div>
    </div>
  )
}
