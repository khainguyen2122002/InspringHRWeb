'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, X, Save, Calendar, Loader2, Upload, ImageIcon } from 'lucide-react'
import { mockDb } from '@/lib/mock-db'
import { toast } from 'sonner'
import { getGoogleSheetNews, saveNewsToGoogleSheet, deleteSupabaseNews, uploadImageAction } from '@/app/actions'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// @ts-ignore
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-[300px] rounded-3xl border border-slate-100 bg-slate-50 flex items-center justify-center"><p className="text-slate-400">Đang tải trình soạn thảo...</p></div> 
})

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await getGoogleSheetNews()
        if (res.success && res.data && res.data.length > 0) {
          setNews(res.data)
        } else {
          setNews(mockDb.getNews())
        }
      } catch (e) {
        setNews(mockDb.getNews())
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleEdit = (item: any) => {
    setCurrentItem(item)
    setIsEditing(true)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const toastId = toast.loading('Đang tải ảnh lên hệ thống...')

    try {
      const formData = new FormData()
      formData.append('imageFile', file)
      formData.append('path', 'news')

      const res = await uploadImageAction(formData)
      if (res.success && res.url) {
        setCurrentItem((prev: any) => ({ ...prev, image: res.url }))
        toast.success('Tải ảnh lên thành công!', { id: toastId })
      } else {
        toast.error('Tải ảnh thất bại: ' + (res.error || 'Chưa bật Storage hoặc phân quyền RLS.'), { id: toastId })
      }
    } catch (err: any) {
      toast.error('Lỗi khi tải ảnh lên: ' + err.message, { id: toastId })
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddNew = () => {
    setCurrentItem({
      title: '',
      date: new Date().toLocaleDateString('vi-VN'),
      type: 'Tin Tức',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
      desc: '',
      content: ''
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này khỏi hệ thống Supabase?')) {
      setIsLoading(true)
      try {
        const res = await deleteSupabaseNews(id)
        if (res.success) {
          toast.success('Đã xóa bài viết thành công.')
          const refreshed = await getGoogleSheetNews()
          if (refreshed.success) {
            setNews(refreshed.data || [])
          }
        } else {
          toast.error('Xóa thất bại: ' + (res.error || ''))
        }
      } catch (err: any) {
        toast.error('Lỗi: ' + err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const toastId = toast.loading('Đang lưu dữ liệu lên Supabase...')
    
    try {
      const res = await saveNewsToGoogleSheet(currentItem)
      if (res && res.success) {
        toast.success('Đã lưu bài viết thành công!', { id: toastId })
        const refreshed = await getGoogleSheetNews()
        if (refreshed.success && refreshed.data) {
          setNews(refreshed.data)
        }
        setIsEditing(false)
      } else {
        toast.error('Lưu thất bại: ' + (res?.error || ''), { id: toastId })
      }
    } catch (err: any) {
      toast.error('Lỗi xuất bản: ' + err.message, { id: toastId })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-primary tracking-tight">Quản lý Tin tức & Hội thảo</h1>
        <Button onClick={handleAddNew} className="bg-primary text-white rounded-2xl h-14 px-8 font-black shadow-xl hover:bg-primary/95 transition-all">
          <Plus className="mr-2 w-5 h-5" /> Viết bài mới
        </Button>
      </div>

      {isEditing ? (
        <Card className="p-8 md:p-12 border-none shadow-2xl rounded-[3rem] bg-white animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-10">
             <h2 className="text-2xl font-black text-primary">{currentItem.id ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}</h2>
             <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}><X className="w-6 h-6" /></Button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Tiêu đề bài viết</label>
              <Input 
                value={currentItem.title} 
                onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                required
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Danh mục / Loại</label>
              <Input 
                value={currentItem.type} 
                onChange={(e) => setCurrentItem({...currentItem, type: e.target.value})}
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Ngày đăng</label>
              <Input 
                value={currentItem.date} 
                onChange={(e) => setCurrentItem({...currentItem, date: e.target.value})}
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Hình ảnh minh họa (Kích thước khuyên dùng: tỷ lệ 16:9 hoặc 1.91:1, vd: 1200x675px)</label>
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                 <div className="w-48 h-32 rounded-[2rem] overflow-hidden shrink-0 border border-slate-100 bg-slate-50 flex items-center justify-center">
                   {currentItem.image ? (
                     <img src={currentItem.image} alt="preview" className="w-full h-full object-cover" />
                   ) : (
                     <ImageIcon className="w-10 h-10 text-slate-300" />
                   )}
                 </div>
                 <div className="space-y-3 flex-1 w-full">
                    <div className="relative">
                      <Input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isUploading}
                        className="hidden"
                        id="news-image-upload"
                      />
                      <label 
                        htmlFor="news-image-upload"
                        className="flex items-center justify-center gap-2 h-14 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary cursor-pointer transition-all font-bold text-slate-600"
                      >
                        {isUploading ? (
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        ) : (
                          <Upload className="w-5 h-5 text-slate-400" />
                        )}
                        Tải ảnh lên từ máy tính
                      </label>
                    </div>
                    <Input 
                      placeholder="Hoặc dán URL hình ảnh bên ngoài..."
                      value={currentItem.image} 
                      onChange={(e) => setCurrentItem({...currentItem, image: e.target.value})}
                      className="h-14 rounded-2xl border-slate-100"
                    />
                 </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Nội dung tóm tắt</label>
              <Textarea 
                value={currentItem.desc} 
                onChange={(e) => setCurrentItem({...currentItem, desc: e.target.value})}
                className="h-20 rounded-2xl border-slate-100"
              />
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Nội dung đầy đủ</label>
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-100 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base [&_.ql-editor]:text-slate-700">
                 <ReactQuill 
                   theme="snow"
                   value={currentItem.content || ''} 
                   onChange={(value: string) => setCurrentItem({...currentItem, content: value})}
                 />
              </div>
            </div>

            <div className="md:col-span-2 pt-6 flex gap-4">
               <Button type="submit" disabled={isSaving || isUploading} className="bg-primary text-white h-14 px-10 rounded-2xl font-black shadow-xl hover:bg-primary/95 transition-all">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="mr-2 w-5 h-5" />}
                  Xuất bản bài viết
               </Button>
               <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="h-14 px-10 rounded-2xl font-bold border-slate-100 hover:bg-slate-50">
                  Hủy bỏ
               </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid gap-6">
          {news.map((item) => (
            <Card key={item.id} className="p-10 border-none shadow-xl rounded-[3rem] bg-white flex flex-col md:flex-row items-center justify-between gap-10 group hover:shadow-2xl transition-all duration-500">
               <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  <div className="w-full md:w-48 h-32 bg-slate-100 rounded-[2rem] overflow-hidden shrink-0 border border-slate-100 shadow-inner">
                     <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                       <Badge className="bg-secondary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full">{item.type}</Badge>
                       <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {item.date}</span>
                    </div>
                    <h3 className="font-black text-primary text-2xl leading-tight group-hover:text-secondary transition-colors">{item.title}</h3>
                    <p className="text-slate-500 font-medium line-clamp-2 italic">"{item.desc}"</p>
                  </div>
               </div>
               <div className="flex gap-3 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="w-14 h-14 rounded-2xl bg-slate-50 hover:bg-primary hover:text-white transition-all shadow-sm"><Edit className="w-6 h-6" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 className="w-6 h-6" /></Button>
               </div>
            </Card>
          ))}
          {news.length === 0 && <p className="text-center text-slate-400 font-bold py-20 bg-white rounded-[3rem] shadow-inner">Chưa có bài viết nào.</p>}
        </div>
      )}
    </div>
  )
}
