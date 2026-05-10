'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, X, Save, Calendar } from 'lucide-react'
import { mockDb } from '@/lib/mock-db'
import { toast } from 'sonner'

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)

  useEffect(() => {
    setNews(mockDb.getNews())
  }, [])

  const handleEdit = (item: any) => {
    setCurrentItem(item)
    setIsEditing(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        const MAX_DIM = 800

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width
            width = MAX_DIM
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height
            height = MAX_DIM
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          const base64Url = canvas.toDataURL('image/jpeg', 0.7)
          setCurrentItem((prev: any) => ({...prev, image: base64Url}))
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleAddNew = () => {
    setCurrentItem({
      title: '',
      date: new Date().toLocaleDateString('vi-VN'),
      type: 'Tin Tức',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
      desc: ''
    })
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      mockDb.deleteNews(id)
      setNews(mockDb.getNews())
      toast.success('Đã xóa bài viết.')
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    mockDb.saveNews(currentItem)
    setNews(mockDb.getNews())
    setIsEditing(false)
    toast.success('Đã lưu bài viết.')
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-primary tracking-tight">Quản lý Tin tức & Hội thảo</h1>
        <Button onClick={handleAddNew} className="bg-primary text-white rounded-2xl h-14 px-8 font-black shadow-xl">
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
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Hình ảnh minh họa</label>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                 {currentItem.image && (
                   <div className="w-32 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                      <img src={currentItem.image} alt="preview" className="w-full h-full object-cover" />
                   </div>
                 )}
                 <div className="space-y-2 flex-1 w-full">
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="h-14 rounded-2xl border-slate-100 pt-3"
                    />
                    <Input 
                      placeholder="Hoặc dán URL hình ảnh vào đây..."
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
              <Textarea 
                value={currentItem.content || ''} 
                onChange={(e) => setCurrentItem({...currentItem, content: e.target.value})}
                className="min-h-[300px] rounded-3xl border-slate-100 p-6"
                placeholder="Nhập nội dung chi tiết bài viết..."
              />
            </div>

            <div className="md:col-span-2 pt-6 flex gap-4">
               <Button type="submit" className="bg-primary text-white h-14 px-10 rounded-2xl font-black shadow-xl">
                  <Save className="mr-2 w-5 h-5" /> Xuất bản bài viết
               </Button>
               <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="h-14 px-10 rounded-2xl font-bold border-slate-100">
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
