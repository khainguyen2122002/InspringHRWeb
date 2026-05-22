'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  Users, Clock, Layers, CheckCircle2, ChevronDown, 
  ArrowRight, PhoneCall, Award, BookOpen, 
  Target, GraduationCap, Sparkles, PartyPopper, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockDb } from '@/lib/mock-db'
import { toast } from 'sonner'
import { Course } from '@/types'
import { getCourses, submitContact } from '@/app/actions'

function CourseDetailContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  
  const [courseData, setCourseData] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [level, setLevel] = useState('')

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await getCourses()
        const courses = res.success && res.data && res.data.length > 0 ? res.data : mockDb.getCourses()
        if (id) {
          const found = courses.find((c: any) => c.id === id)
          if (found) {
            setCourseData(found)
            return
          }
        }
        if (courses.length > 0) {
          setCourseData(courses[0])
        }
      } catch (err) {
        console.error('Error loading course details:', err)
        const courses = mockDb.getCourses()
        if (id) {
          const found = courses.find((c: any) => c.id === id)
          if (found) {
            setCourseData(found)
            return
          }
        }
        if (courses.length > 0) {
          setCourseData(courses[0])
        }
      } finally {
        setLoading(false)
      }
    }
    loadCourse()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set('courseTitle', courseData?.title || '')
    formData.set('courseId', courseData?.id || '')
    formData.set('type', 'registration')
    formData.set('level', level)

    try {
      const res = await submitContact(formData)
      if (res.error) {
        throw new Error(res.error)
      }

      setIsSubmitted(true)
      form.reset()
      setLevel('')
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi gửi đăng ký: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <BookOpen className="w-16 h-16 text-slate-200 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy khóa học</h2>
          <Link href="/khoa-hoc">
            <Button variant="outline">Quay lại danh sách</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* 1. Course Hero Section */}
      <section className="bg-primary py-8 md:py-12 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="lg:col-span-8 space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
              <Badge className="bg-secondary text-primary font-bold px-3 py-1 rounded-lg text-[10px] border-none uppercase tracking-widest">
                Khóa học {courseData.category}
              </Badge>
              <h1 className="text-xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                {courseData.title}
              </h1>
              <p className="text-xs md:text-sm text-white/75 font-medium leading-relaxed max-w-2xl">
                {courseData.description}
              </p>
              <div className="flex flex-wrap gap-3 md:gap-5 pt-1 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/70">
                 <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-secondary" /> {courseData.sessions?.includes('buổi') ? courseData.sessions : `${courseData.sessions} buổi`}</div>
                 <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-secondary" /> {courseData.level}</div>
                 <div className="flex items-center gap-2"><Users className="w-4 h-4 text-secondary" /> Khai giảng {courseData.commencement}</div>
              </div>
            </div>
            <div className="lg:col-span-4 w-full animate-in fade-in slide-in-from-bottom duration-700">
              {courseData.image_url ? (
                <div className="relative aspect-[16/10] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-2 border-white/10">
                  <Image 
                    src={courseData.image_url} 
                    alt={courseData.title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              ) : (
                <div className="relative aspect-[16/10] w-full rounded-xl md:rounded-2xl overflow-hidden bg-slate-800 border-2 border-white/10 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/20" />
                </div>
              )}
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
            {(courseData.benefits && courseData.benefits.length > 0) && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-primary">Lợi ích khóa học</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {courseData.benefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 md:p-3.5 bg-slate-50 rounded-xl border border-slate-100 group hover:border-primary/20 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <p className="text-slate-700 text-xs md:text-sm font-semibold leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Content Details */}
            {courseData.content && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center shadow-sm">
                      <Layers className="w-5 h-5" />
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-primary">Giới thiệu chi tiết</h2>
                </div>
                <div className="prose max-w-none text-slate-600">
                  {courseData.content.split('\n').map((para: string, idx: number) => (
                    <p key={idx} className="mb-4">{para}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Curriculum */}
            {(courseData.curriculum && courseData.curriculum.length > 0) && (
              <section id="curriculum" className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center shadow-sm">
                      <BookOpen className="w-5 h-5" />
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-primary">Nội dung chương trình</h2>
                </div>
                <div className="space-y-3">
                  {courseData.curriculum.map((item: any, i: number) => (
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
                            {item.lessons.map((lesson: string, lIdx: number) => (
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
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
                
                {/* Instructor */}
                <Card className="p-6 border border-slate-100 shadow-sm rounded-2xl bg-white space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-full overflow-hidden shrink-0 border border-slate-200">
                         <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt={courseData.instructor_name || 'Giảng viên'} width={64} height={64} className="object-cover w-full h-full" />
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-base font-black text-primary">{courseData.instructor_name || 'Đội ngũ chuyên gia'}</h4>
                         <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{courseData.instructor_role || 'Chuyên gia Inspiring HR'}</p>
                      </div>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl">
                     <p className="text-slate-600 text-[13px] font-medium leading-relaxed italic">
                        "Kiến thức thực tiễn - Kỹ năng thực chiến. Chúng tôi giúp bạn rút ngắn thời gian để trở thành chuyên gia thực thụ."
                     </p>
                   </div>
                </Card>

                {/* Form */}
                {courseData.external_form_url && courseData.external_form_url.trim() !== "" ? (
                  <Card id="register" className="p-6 border border-secondary/20 shadow-xl shadow-slate-200/50 rounded-2xl bg-white scroll-mt-32 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                    
                    <div className="space-y-5 relative z-10">
                      {/* Header */}
                      <div className="pb-4 border-b border-slate-50">
                        <h3 className="text-xl font-black text-primary mb-1 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-secondary" /> Đăng Ký Tham Gia
                        </h3>
                        <p className="text-slate-400 font-medium text-[11px]">Giữ chỗ và nhận tư vấn ngay hôm nay</p>
                      </div>
                      
                      {/* Price block */}
                      <div className="flex flex-col gap-1.5 bg-slate-50 p-4 rounded-xl">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
                          <span>Học phí gốc</span>
                          <span className="line-through">{new Intl.NumberFormat('vi-VN').format(Number(courseData.original_price || 0))}đ</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-primary">Ưu đãi còn</span>
                          <span className="text-2xl font-black text-secondary">{new Intl.NumberFormat('vi-VN').format(Number(courseData.price || 0))}đ</span>
                        </div>
                      </div>

                      {/* Benefits list */}
                      <ul className="space-y-2.5">
                        {[
                          'Giữ chỗ & nhận ưu đãi học phí',
                          'Tư vấn lộ trình 1:1 miễn phí',
                          'Tặng bộ tài liệu chuyên sâu từ giảng viên',
                          'Cấp chứng nhận sau khi hoàn thành',
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-slate-700 text-[12px] font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <a 
                        href={courseData.external_form_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button 
                          type="button" 
                          className="w-full h-12 bg-secondary hover:bg-primary hover:text-white text-primary font-black text-sm uppercase tracking-widest rounded-xl shadow-md shadow-secondary/20 hover:shadow-none transition-all flex items-center justify-center gap-2 group"
                        >
                          Đăng Ký Học Ngay
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                      
                      <p className="text-[9px] text-center text-slate-300 font-bold uppercase tracking-widest">Bảo mật thông tin 100%</p>
                    </div>
                  </Card>
                ) : (
                  <Card id="register" className="p-8 border-none shadow-xl shadow-slate-200/50 rounded-2xl bg-white scroll-mt-32">
                    {isSubmitted ? (
                      <div className="text-center py-10 space-y-5 animate-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                            <PartyPopper className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-primary">Đăng Ký Thành Công!</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">Chúng tôi đã ghi nhận thông tin. Vui lòng kiểm tra điện thoại trong 24h tới.</p>
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
                            <span className="line-through">{new Intl.NumberFormat('vi-VN').format(Number(courseData.original_price || 0))}đ</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-primary">Ưu đãi còn</span>
                            <span className="text-2xl font-black text-secondary">{new Intl.NumberFormat('vi-VN').format(Number(courseData.price || 0))}đ</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Input name="name" placeholder="Họ và tên *" required className="h-12 rounded-xl bg-slate-50 border-none font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                          <Input name="phone" type="tel" placeholder="Số điện thoại *" required className="h-12 rounded-xl bg-slate-50 border-none font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                          <Input name="email" type="email" placeholder="Email liên hệ *" required className="h-12 rounded-xl bg-slate-50 border-none font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                          
                          <Select value={level} onValueChange={(val) => setLevel(val || '')} required>
                            <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-medium text-sm focus:ring-1 focus:ring-primary/20">
                              <SelectValue placeholder="Hình thức học *" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-none shadow-xl">
                              <SelectItem value="Online">Học Online</SelectItem>
                              <SelectItem value="Offline">Học Offline (Tại trung tâm)</SelectItem>
                            </SelectContent>
                          </Select>

                          <Textarea name="message" placeholder="Ghi chú thêm..." className="min-h-[80px] rounded-xl bg-slate-50 border-none font-medium text-sm focus-visible:ring-1 focus-visible:ring-primary/20" />
                        </div>

                        <Button 
                          type="submit" 
                          disabled={isSubmitting || !level}
                          className="w-full h-14 bg-secondary hover:bg-primary hover:text-white text-primary font-black text-sm uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Xác Nhận Đăng Ký'}
                        </Button>
                        
                        <p className="text-[9px] text-center text-slate-300 font-bold uppercase tracking-widest">Bảo mật thông tin 100%</p>
                      </form>
                    )}
                  </Card>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CourseDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>}>
      <CourseDetailContent />
    </Suspense>
  )
}
