'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, Clock, Users, ArrowRight, Layers, Star, CheckCircle2, Sparkles, LayoutGrid } from 'lucide-react'
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

const coursesData = [
  {
    id: 'nghe-nhan-su-chuyen-nghiep',
    slug: 'nghe-nhan-su-chuyen-nghiep',
    title: 'Nghề Nhân sự Chuyên nghiệp (Professional HR)',
    category: 'Chuyên Sâu',
    level: 'Online',
    status: 'Sắp khai giảng',
    sessions: '24 buổi',
    commencement: 'Tháng 08/2026',
    price: 3500000,
    original_price: 3600000,
    description: 'Lộ trình bài bản từ A-Z dành cho người mới hoặc chuyên viên muốn hệ thống lại kiến thức quản trị nhân sự thực chiến.',
    image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    platform: 'Microsoft Teams',
    featured: true
  },
  {
    id: 'nghiep-vu-luong-phuc-loi-cb',
    slug: 'nghiep-vu-luong-phuc-loi-cb',
    title: 'Nghiệp vụ Lương & Phúc lợi (C&B Master)',
    category: 'Kỹ Năng',
    level: 'Online/Offline',
    status: 'Đang tuyển sinh',
    sessions: '16 buổi',
    commencement: 'Tháng 09/2026',
    price: 4500000,
    original_price: 4800000,
    description: 'Làm chủ bảng lương, bảo hiểm xã hội, thuế TNCN và các chính sách đãi ngộ chuyên sâu dành cho doanh nghiệp.',
    image_url: 'https://images.unsplash.com/photo-1454165833767-131ef24896b3?q=80&w=2070&auto=format&fit=crop',
    platform: 'Linh hoạt'
  },
  {
    id: 'phap-ly-lao-dong',
    slug: 'phap-ly-lao-dong',
    title: 'Pháp lý Lao động & Xử lý Kỷ luật (HR Legal)',
    category: 'Kỹ Năng',
    level: 'Online/Offline',
    status: 'Đang tuyển sinh',
    sessions: '8 buổi',
    commencement: 'Tháng 10/2026',
    price: 2500000,
    original_price: 3000000,
    description: 'Nắm vững luật lao động hiện hành, cách soạn thảo hợp đồng, nội quy và xử lý khôn khéo các tranh chấp lao động.',
    image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop',
    platform: 'Linh hoạt'
  },
  {
    id: 'xay-dung-thang-bang-luong',
    slug: 'xay-dung-thang-bang-luong',
    title: 'Xây dựng Thang bảng lương chuẩn mực',
    category: 'Chuyên Sâu',
    level: 'Offline',
    status: 'Sắp khai giảng',
    sessions: '12 buổi',
    commencement: 'Tháng 11/2026',
    price: 5500000,
    original_price: 6000000,
    description: 'Trang bị kỹ năng thiết lập cấu trúc lương, thưởng theo phương pháp hiện đại, giúp doanh nghiệp tối ưu chi phí và giữ chân nhân tài.',
    image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2071&auto=format&fit=crop',
    platform: 'Trung tâm'
  },
  {
    id: 'quan-tri-hieu-suat-kpi-okr',
    slug: 'quan-tri-hieu-suat-kpi-okr',
    title: 'Quản trị Hiệu suất (KPI/OKR Master)',
    category: 'Chuyên Sâu',
    level: 'Online',
    status: 'Đang tuyển sinh',
    sessions: '10 buổi',
    commencement: 'Tháng 08/2026',
    price: 3800000,
    original_price: 4500000,
    description: 'Thấu hiểu cách thiết lập mục tiêu, xây dựng hệ thống đánh giá năng lực và gắn kết hiệu suất cá nhân với mục tiêu doanh nghiệp.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    platform: 'Microsoft Teams'
  }
]

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                          course.description.toLowerCase().includes(search.toLowerCase())
    const matchesLevel = levelFilter === 'all' || course.level.includes(levelFilter)
    return matchesSearch && matchesLevel
  })

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Page Header - Tinh gọn */}
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-500 flex flex-col relative">
              {course.featured && (
                <div className="absolute top-4 left-4 z-10">
                   <Badge className="bg-secondary text-primary font-bold px-3 py-1 rounded-lg text-[9px] uppercase tracking-widest shadow-md border-none">
                      Nổi bật
                   </Badge>
                </div>
              )}
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={course.image_url} 
                  alt={course.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
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
                        {new Intl.NumberFormat('vi-VN').format(course.original_price)}đ
                      </span>
                      <span className="text-2xl font-black text-primary">
                        {new Intl.NumberFormat('vi-VN').format(course.price)}đ
                      </span>
                    </div>
                    {course.platform && (
                      <div className="text-right">
                        <span className="block text-[9px] uppercase text-slate-400 font-bold tracking-widest mb-0.5">Hình thức</span>
                        <span className="text-xs font-bold text-slate-700">{course.platform}</span>
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

        {/* Empty State */}
        {filteredCourses.length === 0 && (
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
