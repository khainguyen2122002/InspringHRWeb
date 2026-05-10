'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon } from 'lucide-react'
import { mockDb } from '@/lib/mock-db'
import { toast } from 'sonner'

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)

  useEffect(() => {
    setGallery(mockDb.getGallery())
  }, [])

  const handleEdit = (item: any) => {
    setCurrentItem(item)
    setIsEditing(true)
  }

  const handleAddNew = () => {
    setCurrentItem({
      image: '',
      caption: '',
    })
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa ảnh này?')) {
      mockDb.deleteGallery(id)
      setGallery(mockDb.getGallery())
      toast.success('Đã xóa ảnh.')
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentItem.image) {
      toast.error('Vui lòng chọn hình ảnh')
      return
    }
    mockDb.saveGallery(currentItem)
    setGallery(mockDb.getGallery())
    setIsEditing(false)
    toast.success('Đã lưu khoảnh khắc.')
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
        const MAX_DIM = 1200 // Kích thước lớn hơn một chút cho gallery

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
          const base64Url = canvas.toDataURL('image/jpeg', 0.8)
          setCurrentItem((prev: any) => ({...prev, image: base64Url}))
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-primary tracking-tight">Hình Ảnh Hoạt Động</h1>
        <Button onClick={handleAddNew} className="bg-primary text-white rounded-2xl h-14 px-8 font-black shadow-xl">
          <Plus className="mr-2 w-5 h-5" /> Thêm ảnh mới
        </Button>
      </div>

      {isEditing ? (
        <Card className="p-8 md:p-12 border-none shadow-2xl rounded-[3rem] bg-white animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-10">
             <h2 className="text-2xl font-black text-primary">{currentItem.id ? 'Chỉnh sửa hình ảnh' : 'Thêm hình ảnh mới'}</h2>
             <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}><X className="w-6 h-6" /></Button>
          </div>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Hình ảnh</label>
              <div className="flex flex-col gap-4">
                 {currentItem.image ? (
                   <div className="w-full h-64 rounded-3xl overflow-hidden border border-slate-100 bg-slate-50">
                      <img src={currentItem.image} alt="preview" className="w-full h-full object-cover" />
                   </div>
                 ) : (
                    <div className="w-full h-64 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                       <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                       <span className="font-medium text-sm">Chưa có hình ảnh</span>
                    </div>
                 )}
                 <Input 
                   type="file"
                   accept="image/*"
                   onChange={handleImageChange}
                   className="h-14 rounded-2xl border-slate-100 pt-3"
                 />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Mô tả / Caption ngắn</label>
              <Input 
                value={currentItem.caption || ''} 
                onChange={(e) => setCurrentItem({...currentItem, caption: e.target.value})}
                placeholder="Ví dụ: Lớp Nghề Nhân sự Chuyên nghiệp K28..."
                className="h-14 rounded-2xl border-slate-100"
              />
            </div>

            <div className="pt-6 flex gap-4">
               <Button type="submit" className="bg-primary text-white h-14 px-10 rounded-2xl font-black shadow-xl">
                  <Save className="mr-2 w-5 h-5" /> Lưu khoảnh khắc
               </Button>
               <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="h-14 px-10 rounded-2xl font-bold border-slate-100">
                  Hủy bỏ
               </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <Card key={item.id} className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden group hover:shadow-2xl transition-all duration-500">
               <div className="relative w-full h-64 bg-slate-100 overflow-hidden">
                  <img src={item.image} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     <p className="font-bold text-sm line-clamp-2">{item.caption}</p>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="w-10 h-10 rounded-xl bg-white/90 text-primary hover:bg-white hover:text-secondary shadow-sm"><Edit className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-xl bg-red-500/90 text-white hover:bg-red-600 shadow-sm"><Trash2 className="w-4 h-4" /></Button>
                  </div>
               </div>
            </Card>
          ))}
          {gallery.length === 0 && <div className="col-span-full"><p className="text-center text-slate-400 font-bold py-20 bg-white rounded-[3rem] shadow-inner">Chưa có hình ảnh nào.</p></div>}
        </div>
      )}
    </div>
  )
}
