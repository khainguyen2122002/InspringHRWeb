'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, MoreHorizontal, Edit, Trash, ExternalLink, Eye, LayoutGrid, List, Filter, BookOpen } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CourseFormDialog } from '@/components/admin/course-form-dialog'
import { Course } from '@/types'
import { mockDb } from '@/lib/mock-db'
import { toast } from 'sonner'

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const fetchCourses = () => {
    setLoading(true)
    const data = mockDb.getCourses()
    setCourses(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      try {
        mockDb.deleteCourse(id)
        toast.success("Đã xóa khóa học")
        fetchCourses()
      } catch (error: any) {
        toast.error("Lỗi: " + error.message)
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quản lý khóa học</h1>
          <p className="text-slate-500">Toàn bộ khóa học hiện có trên hệ thống.</p>
        </div>
        <CourseFormDialog 
          trigger={
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-xl h-12 px-6 shadow-lg shadow-primary/20">
              <Plus className="w-5 h-5" /> Thêm khóa học mới
            </Button>
          }
        />
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-slate-50">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input 
                placeholder="Tìm kiếm theo tên hoặc danh mục..." 
                className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary text-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
               <Button variant="outline" className="h-14 rounded-2xl gap-2 border-slate-100">
                  <Filter className="w-4 h-4" /> Lọc
               </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-50 h-16">
                <TableHead className="w-[350px] font-bold text-slate-400 uppercase text-[10px] tracking-widest pl-8">Khóa học</TableHead>
                <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Danh mục</TableHead>
                <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Hình thức</TableHead>
                <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Nổi bật</TableHead>
                <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Học phí</TableHead>
                <TableHead className="text-right pr-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-slate-50/50 transition-colors border-slate-50 h-24">
                  <TableCell className="pl-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                        {course.image_url ? (
                          <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="bg-slate-50 w-full h-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-slate-200" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 leading-tight">{course.title}</span>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase">{course.sessions}</span>
                          <span className="text-[10px] font-black bg-secondary/10 text-secondary px-1.5 py-0.5 rounded uppercase">{course.commencement}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-lg font-bold text-primary bg-primary/5 border-none px-3 py-1">{course.category}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge className={cn(
                       "border-none rounded-lg font-bold px-3 py-1",
                       course.level?.includes('Online') ? 'bg-blue-100 text-blue-600' : 
                       course.level?.includes('Offline') ? 'bg-emerald-100 text-emerald-600' :
                       course.level?.includes('Inhouse') ? 'bg-purple-100 text-purple-600' :
                       'bg-amber-100 text-amber-600'
                     )}>
                       {course.level || 'Offline'}
                     </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {course.is_featured ? (
                       <Badge className="bg-amber-100 text-amber-600 border-none rounded-lg font-bold">HOT 🔥</Badge>
                    ) : (
                      <span className="text-slate-200 text-xs">-</span>
                    )}
                  </TableCell>
                  <TableCell className="font-black text-primary text-lg">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedCourse(course)
                          setIsEditDialogOpen(true)
                        }}
                        className="h-9 px-3 rounded-xl hover:bg-secondary/10 hover:text-secondary text-slate-600 font-bold flex items-center gap-1.5"
                        title="Chỉnh sửa khóa học"
                      >
                        <Edit className="w-4 h-4 text-secondary" /> <span className="hidden sm:inline">Sửa</span>
                      </Button>

                      <Link 
                        href={`/courses/view?id=${course.id}`} 
                        target="_blank"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-9 px-3 rounded-xl hover:bg-blue-50 text-blue-600 font-bold flex items-center gap-1.5")}
                        title="Xem trang demo chi tiết"
                      >
                        <Eye className="w-4 h-4 text-blue-500" /> <span className="hidden sm:inline">Xem</span>
                      </Link>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(course.id)}
                        className="h-9 px-3 rounded-xl hover:bg-red-50 text-red-500 font-bold flex items-center gap-1.5"
                        title="Xóa khóa học"
                      >
                        <Trash className="w-4 h-4" /> <span className="hidden sm:inline">Xóa</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && filteredCourses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-32 text-slate-300">
                    <div className="flex flex-col items-center gap-4">
                      <Search className="w-12 h-12 text-slate-100" />
                      <p className="text-lg">Không tìm thấy khóa học nào phù hợp.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Hidden Dialog for Editing */}
      <CourseFormDialog 
        course={selectedCourse as any} 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  )
}
