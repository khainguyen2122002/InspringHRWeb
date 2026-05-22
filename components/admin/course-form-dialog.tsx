'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Save, Loader2, Plus, Image as ImageIcon, Calendar, Layers, Hash, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { toast } from "sonner"
import { Course } from "@/types"
import { upsertCourse } from "@/app/actions"
import Image from "next/image"

const formSchema = z.object({
  title: z.string().min(2, "Tên khóa học quá ngắn"),
  slug: z.string().min(2, "Slug không hợp lệ"),
  description: z.string().min(10, "Mô tả card cần chi tiết hơn"),
  category: z.string().min(2, "Nhập danh mục khóa học"),
  level: z.string().min(1, "Vui lòng chọn hình thức học"),
  sessions: z.string().min(1, "Vui lòng nhập số buổi học"),
  schedule: z.string().min(2, "Vui lòng nhập lịch học"),
  commencement: z.string().min(2, "Vui lòng nhập thời gian khai giảng"),
  price: z.coerce.number().min(0, "Học phí ưu đãi không được âm"),
  original_price: z.coerce.number().min(0, "Học phí gốc không được âm"),
  instructor_name: z.string().min(2, "Vui lòng nhập tên giảng viên"),
  instructor_role: z.string().min(2, "Vui lòng nhập chức vụ giảng viên"),
  target_audience: z.string().min(10, "Vui lòng nhập đối tượng phù hợp"),
  benefits: z.string().min(10, "Vui lòng nhập lợi ích (mỗi dòng 1 lợi ích)"),
  special_benefits: z.string().min(5, "Vui lòng nhập quyền lợi đặc biệt"),
  content: z.string().min(20, "Vui lòng nhập nội dung chi tiết"),
  external_form_url: z.string().optional().nullable(),
  status: z.enum(['Sắp khai giảng', 'Đang diễn ra', 'Đã kết thúc']),
  is_featured: z.boolean().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function CourseFormDialog({ 
  course, 
  trigger,
  open: externalOpen,
  onOpenChange: externalOnOpenChange
}: { 
  course?: Course, 
  trigger?: React.ReactElement,
  open?: boolean,
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = externalOnOpenChange || setInternalOpen
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(course?.image_url || null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      title: course?.title || "",
      slug: course?.slug || "",
      description: course?.description || "",
      price: Number(course?.price || 0),
      original_price: Number(course?.original_price || 0),
      sessions: course?.sessions || "",
      schedule: course?.schedule || "",
      commencement: course?.commencement || "",
      level: course?.level || "Offline",
      category: course?.category || "Chuyên Sâu",
      instructor_name: course?.instructor_name || "",
      instructor_role: course?.instructor_role || "",
      target_audience: course?.target_audience || "",
      benefits: course?.benefits?.join('\n') || "",
      special_benefits: course?.special_benefits || "",
      content: course?.content || "",
      external_form_url: course?.external_form_url || "",
      status: course?.status || "Sắp khai giảng",
      is_featured: !!course?.is_featured,
    },
  })

  // Tự động tạo slug từ tiêu đề (chỉ cho khóa học mới)
  const watchedTitle = form.watch("title")
  useEffect(() => {
    if (!course && watchedTitle) {
      const slug = watchedTitle
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
      
      form.setValue("slug", slug, { shouldValidate: true })
    }
  }, [watchedTitle, form, course])

  useEffect(() => {
    if (open) {
      form.reset({
        title: course?.title || "",
        slug: course?.slug || "",
        description: course?.description || "",
        price: Number(course?.price || 0),
        original_price: Number(course?.original_price || 0),
        sessions: course?.sessions || "",
        schedule: course?.schedule || "",
        commencement: course?.commencement || "",
        level: course?.level || "Offline",
        category: course?.category || "Chuyên Sâu",
        instructor_name: course?.instructor_name || "",
        instructor_role: course?.instructor_role || "",
        target_audience: course?.target_audience || "",
        benefits: course?.benefits?.join('\n') || "",
        special_benefits: course?.special_benefits || "",
        content: course?.content || "",
        external_form_url: course?.external_form_url || "",
        status: course?.status || "Sắp khai giảng",
        is_featured: !!course?.is_featured,
      })
      setPreview(course?.image_url || null)
      setImageFile(null)
    }
  }, [course, open, form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const formData = new FormData()
      if (course?.id) {
        formData.append('id', course.id)
      }
      formData.append('title', values.title)
      formData.append('slug', values.slug)
      formData.append('description', values.description)
      formData.append('price', String(values.price))
      formData.append('original_price', String(values.original_price || ''))
      formData.append('instructor_name', values.instructor_name)
      formData.append('instructor_role', values.instructor_role)
      formData.append('target_audience', values.target_audience)
      formData.append('external_form_url', values.external_form_url || '')
      formData.append('duration', values.sessions) // duration = sessions!
      formData.append('schedule', values.schedule)
      formData.append('level', values.level)
      formData.append('category', values.category)
      formData.append('is_featured', String(!!values.is_featured))
      formData.append('imageUrl', course?.image_url || '')

      if (imageFile) {
        formData.append('imageFile', imageFile)
      }

      // Đóng gói content JSONB
      const contentJson = {
        overview: values.content,
        commencement: values.commencement,
        benefits: values.benefits.split('\n').filter((b: string) => b.trim() !== ''),
        special_benefits: values.special_benefits,
        status: values.status,
        curriculum: course?.curriculum || []
      }
      formData.append('content', JSON.stringify(contentJson))

      const res = await upsertCourse(formData)
      
      if (res.error) {
        throw new Error(res.error)
      }
      
      toast.success(course ? "Cập nhật thành công!" : "Tạo khóa học thành công!")
      setOpen(false)
      window.location.reload() // Reload to reflect changes
    } catch (error: any) {
      toast.error("Lỗi: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger || (
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2 h-12 rounded-xl shadow-lg shadow-primary/20">
              <Plus className="w-5 h-5" /> Thêm khóa học
            </Button>
          )
        }
      />
      <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-0 border-none shadow-2xl bg-slate-50 selection:bg-secondary/30">

        <DialogHeader className="p-8 md:p-12 bg-primary text-white sticky top-0 z-30 flex flex-row items-center justify-between overflow-hidden">
          <div className="relative z-10">
            <DialogTitle className="text-3xl md:text-4xl font-black tracking-tight">{course ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}</DialogTitle>
            <DialogDescription className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-3 flex items-center gap-2">
               <Layers className="w-4 h-4 text-secondary" /> Hệ thống quản lý nội dung đào tạo chuyên sâu
            </DialogDescription>
          </div>
          <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          <div className="hidden md:block relative z-10">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl" onClick={() => setOpen(false)}>Hủy bỏ</Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-12 space-y-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* LEFT COLUMN: CORE INFO */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* SECTION: BASIC INFO */}
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 space-y-8 relative overflow-hidden group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-secondary rounded-full" />
                    <h4 className="font-black text-primary uppercase text-sm tracking-widest">Thông tin cơ bản</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Tên khóa học chính thức</FormLabel>
                          <FormControl>
                            <Input placeholder="Ví dụ: Nghề Nhân sự Chuyên nghiệp..." {...field} className="h-16 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white transition-all text-xl font-bold text-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Slug (Đường dẫn)</FormLabel>
                          <FormControl>
                            <Input placeholder="nghe-nhan-su-chuyen-nghiep" {...field} className="h-16 rounded-2xl bg-slate-50/50 border-slate-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Mô tả ngắn (Hiển thị trên card)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Nhập mô tả tóm tắt giá trị khóa học..." {...field} className="min-h-[100px] rounded-2xl bg-slate-50/50 border-slate-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Danh mục</FormLabel>
                          <FormControl>
                            <Input placeholder="Chuyên Sâu / Kỹ Năng..." {...field} className="h-14 rounded-2xl bg-slate-50/50 border-slate-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Trạng thái</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-14 rounded-2xl bg-slate-50/50 border-slate-200">
                                <SelectValue placeholder="Chọn trạng thái" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-none shadow-2xl">
                              {['Sắp khai giảng', 'Đang diễn ra', 'Đã kết thúc'].map(s => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* SECTION: SCHEDULE & LOGISTICS */}
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-secondary rounded-full" />
                    <h4 className="font-black text-primary uppercase text-sm tracking-widest">Lịch học & Khai giảng</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Hình thức học</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-14 rounded-2xl bg-slate-50/50 border-slate-200">
                                <SelectValue placeholder="Chọn hình thức" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-none shadow-2xl">
                              {['Online', 'Offline', 'Inhouse', 'Coaching 1:1'].map(l => (
                                <SelectItem key={l} value={l}>{l}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sessions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Số buổi học</FormLabel>
                          <FormControl>
                            <Input placeholder="Ví dụ: 24 buổi" {...field} className="h-14 rounded-2xl bg-slate-50/50 border-slate-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="schedule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Thời gian học chi tiết</FormLabel>
                          <FormControl>
                            <Input placeholder="Ví dụ: 19h30 - 21h30, Thứ 2-4-6" {...field} className="h-14 rounded-2xl bg-slate-50/50 border-slate-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="commencement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Thời gian khai giảng</FormLabel>
                          <FormControl>
                            <Input placeholder="Ví dụ: Tháng 08/2026" {...field} className="h-14 rounded-2xl bg-slate-50/50 border-slate-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* SECTION: COURSE CONTENT & DETAILS */}
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-secondary rounded-full" />
                    <h4 className="font-black text-primary uppercase text-sm tracking-widest">Nội dung chi tiết & Đối tượng</h4>
                  </div>
                  <FormField
                    control={form.control}
                    name="target_audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Đối tượng phù hợp</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Mô tả các nhóm đối tượng nên tham gia khóa học..." {...field} className="min-h-[100px] rounded-2xl bg-slate-50/50 border-slate-200 p-6" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Lợi ích sau khóa học (Mỗi dòng 1 lợi ích)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ví dụ:&#10;Thành thạo kỹ năng X&#10;Nắm vững quy trình Y..." {...field} className="min-h-[150px] rounded-2xl bg-slate-50/50 border-slate-200 p-6" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Giới thiệu chi tiết khóa học</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Nhập nội dung giới thiệu đầy đủ về khóa học..." {...field} className="min-h-[250px] rounded-[2rem] bg-slate-50/50 border-slate-200 p-8" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: PARAMETERS & MEDIA */}
              <div className="space-y-12">
                
                {/* PRICING CARD */}
                <div className="bg-primary p-10 rounded-[3rem] text-white shadow-2xl shadow-primary/30 space-y-8 relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-full" />
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-6 bg-secondary rounded-full" />
                    <h4 className="font-black uppercase text-[10px] tracking-widest text-white/80">Học phí & Ưu đãi</h4>
                  </div>
                  <FormField
                    control={form.control}
                    name="original_price"
                    render={({ field }) => {
                      const displayValue = field.value ? new Intl.NumberFormat('vi-VN').format(field.value) : ''
                      return (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-white/40 tracking-wider">Học phí gốc (VND)</FormLabel>
                          <FormControl>
                            <Input 
                              type="text" 
                              value={displayValue}
                              onChange={(e) => {
                                const rawValue = e.target.value.replace(/\./g, '')
                                field.onChange(rawValue ? Number(rawValue) : 0)
                              }}
                              className="h-12 rounded-xl bg-white/5 border-white/10 text-center text-white" 
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => {
                      const displayValue = field.value ? new Intl.NumberFormat('vi-VN').format(field.value) : ''
                      return (
                        <FormItem>
                          <FormLabel className="text-[10px] font-black uppercase text-white/50 tracking-wider">Học phí ưu đãi (Hiện tại)</FormLabel>
                          <FormControl>
                            <Input 
                              type="text" 
                              value={displayValue}
                              onChange={(e) => {
                                const rawValue = e.target.value.replace(/\./g, '')
                                field.onChange(rawValue ? Number(rawValue) : 0)
                              }}
                              className="h-16 rounded-2xl bg-white/10 border-white/20 text-2xl font-black text-secondary focus:bg-white/20 transition-all text-center" 
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="special_benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase text-secondary/60 tracking-wider">Quyền lợi đặc biệt</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ví dụ: Tặng bộ template, Hỗ trợ 1:1..." {...field} className="min-h-[100px] bg-white/5 border-white/10 text-white rounded-xl" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* INSTRUCTOR CARD */}
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-secondary rounded-full" />
                    <h4 className="font-black text-primary uppercase text-[10px] tracking-widest">Giảng viên</h4>
                  </div>
                  <FormField
                    control={form.control}
                    name="instructor_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Họ tên giảng viên</FormLabel>
                        <FormControl>
                          <Input placeholder="Ms. Trần Thị Hồng Nhung" {...field} className="h-14 rounded-2xl bg-slate-50/50 border-slate-100" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instructor_role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Chức vụ / Chuyên môn</FormLabel>
                        <FormControl>
                          <Input placeholder="CEO Inspiring HR" {...field} className="h-14 rounded-2xl bg-slate-50/50 border-slate-100" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* IMAGE CARD */}
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 space-y-6">
                   <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-secondary rounded-full" />
                    <h4 className="font-black text-primary uppercase text-[10px] tracking-widest">Hình ảnh đại diện</h4>
                  </div>
                  <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center group hover:border-secondary/50 transition-all cursor-pointer">
                    {preview ? (
                      <Image src={preview} alt="Course preview" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto">
                          <ImageIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tải ảnh lên</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium text-center leading-normal mt-2">
                    Khuyến nghị: Tỷ lệ <strong>16:9</strong> (Kích thước: 1200x675px hoặc 800x450px) để hiển thị tốt nhất trên thiết bị di động & máy tính.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-4 space-y-0 rounded-[2rem] border-2 border-dashed border-slate-100 p-6 bg-slate-50/30">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} className="w-6 h-6 rounded-lg" />
                      </FormControl>
                      <FormLabel className="text-xs font-black uppercase text-primary">🔥 Khóa học nổi bật</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* EXTERNAL LINK BOX */}
            <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden relative group">
               <div className="absolute right-0 top-0 h-full w-2 bg-secondary group-hover:w-4 transition-all" />
               <FormField
                  control={form.control}
                  name="external_form_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase text-secondary tracking-[0.2em] mb-4 block">Liên kết đăng ký ngoài (Google Form / Sheet)</FormLabel>
                      <FormControl>
                        <div className="relative">
                           <ArrowRight className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40" />
                           <Input placeholder="https://forms.gle/..." {...field as any} value={field.value || ''} className="h-16 pl-14 rounded-2xl bg-secondary/5 border-dashed border-secondary/30 text-primary font-medium" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
            </div>

            {/* ACTION FOOTER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t-4 border-slate-50">
              <div className="flex items-start gap-4 max-w-md">
                 <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Save className="w-5 h-5 text-slate-400" />
                 </div>
                 <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-tighter">
                   Dữ liệu sẽ được đồng bộ ngay lập tức. Vui lòng kiểm tra lại Slug và Học phí trước khi xác nhận lưu.
                 </p>
              </div>
              <div className="flex gap-6 w-full md:w-auto">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="flex-1 md:flex-none rounded-2xl h-16 px-10 font-black text-slate-400 hover:text-primary transition-colors">Hủy bỏ</Button>
                <Button type="submit" className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white rounded-[1.5rem] h-20 px-16 font-black text-xl shadow-[0_20px_40px_rgba(26,67,1,0.25)] hover:shadow-none transition-all active:scale-95" disabled={loading}>
                  {loading ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <Save className="mr-3 h-6 w-6 text-secondary" />}
                  Xác nhận lưu khóa học
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
