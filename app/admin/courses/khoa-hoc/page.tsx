'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, X, Check, Save } from 'lucide-react'
import { mockDb } from '@/lib/mock-db'
import { toast } from 'sonner'

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<any>(null)

  useEffect(() => {
    setCourses(mockDb.getCourses())
  }, [])

  const handleEdit = (course: any) => {
    setCurrentCourse(course)
    setIsEditing(true)
  }

  const handleAddNew = () => {
    setCurrentCourse({
      title: '',
      category: 'Chuyên Sâu',
      duration: '',
      level: 'Cơ bản',
      price: 0,
      status: 'Đang mở',
      image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
      description: ''
    })
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa khóa học này?')) {
      mockDb.deleteCourse(id)
      setCourses(mockDb.getCourses())
      toast.success('Đã xóa khóa học.')
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    mockDb.saveCourse(currentCourse)
    setCourses(mockDb.getCourses())
    setIsEditing(false)
    toast.success('Đã lưu thay đổi.')
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-primary tracking-tight">Quản lý Khóa học</h1>
        <Button onClick={handleAddNew} className="bg-primary text-white rounded-2xl h-14 px-8 font-black shadow-xl">
          <Plus className="mr-2 w-5 h-5" /> Thêm khóa học mới
        </Button>
      </div>

      {isEditing ? (
        <Card className="p-8 md:p-12 border-none shadow-2xl rounded-[3rem] bg-white animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-10">
             <h2 className="text-2xl font-black text-primary">{currentCourse.id ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}</h2>
             <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}><X className="w-6 h-6" /></Button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Tiêu đề khóa học</label>
              <Input 
                value={currentCourse.title} 
                onChange={(e) => setCurrentCourse({...currentCourse, title: e.target.value})}
                required
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Danh mục</label>
              <Input 
                value={currentCourse.category} 
                onChange={(e) => setCurrentCourse({...currentCourse, category: e.target.value})}
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Giá học phí (VNĐ)</label>
              <Input 
                type="number"
                value={currentCourse.price} 
                onChange={(e) => setCurrentCourse({...currentCourse, price: parseInt(e.target.value)})}
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Thời lượng</label>
              <Input 
                value={currentCourse.duration} 
                onChange={(e) => setCurrentCourse({...currentCourse, duration: e.target.value})}
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Cấp độ</label>
              <Input 
                value={currentCourse.level} 
                onChange={(e) => setCurrentCourse({...currentCourse, level: e.target.value})}
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Mô tả ngắn</label>
              <Textarea 
                value={currentCourse.description} 
                onChange={(e) => setCurrentCourse({...currentCourse, description: e.target.value})}
                className="h-20 rounded-2xl border-slate-100"
              />
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Nội dung chi tiết</label>
              <Textarea 
                value={currentCourse.content || ''} 
                onChange={(e) => setCurrentCourse({...currentCourse, content: e.target.value})}
                className="min-h-[200px] rounded-3xl border-slate-100 p-6"
                placeholder="Nhập lộ trình học, lợi ích..."
              />
            </div>

            <div className="md:col-span-2 pt-6 flex gap-4">
               <Button type="submit" className="bg-primary text-white h-14 px-10 rounded-2xl font-black shadow-xl">
                  <Save className="mr-2 w-5 h-5" /> Lưu lại
               </Button>
               <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="h-14 px-10 rounded-2xl font-bold border-slate-100">
                  Hủy bỏ
               </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="p-6 border-none shadow-lg rounded-[2.5rem] bg-white flex items-center justify-between group hover:shadow-xl transition-all">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-slate-100 rounded-3xl overflow-hidden shrink-0">
                     <img src={course.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-black text-primary text-xl">{course.title}</h3>
                    <div className="flex gap-4 mt-1">
                       <Badge variant="outline" className="bg-primary/5 text-primary border-none font-bold text-[10px]">{course.category}</Badge>
                       <span className="text-slate-400 text-sm font-bold">{new Intl.NumberFormat('vi-VN').format(course.price)} VNĐ</span>
                    </div>
                  </div>
               </div>
               <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(course)} className="rounded-xl hover:bg-primary/10 hover:text-primary"><Edit className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)} className="rounded-xl hover:bg-red-50 hover:text-red-500"><Trash2 className="w-5 h-5" /></Button>
               </div>
            </Card>
          ))}
          {courses.length === 0 && <p className="text-center text-slate-400 font-bold py-20 bg-white rounded-[3rem] shadow-inner">Chưa có khóa học nào.</p>}
        </div>
      )}
    </div>
  )
}
