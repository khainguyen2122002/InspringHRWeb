'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockDb } from '@/lib/mock-db'
import { User, Mail, Phone, BookOpen, Calendar, Trash2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminStudentsPage() {
  const [registrations, setRegistrations] = useState<any[]>([])

  const fetchInquiries = () => {
    setRegistrations(mockDb.getInquiries())
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) {
      mockDb.deleteInquiry(id)
      fetchInquiries()
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tight">Quản lý Đăng ký & Tư vấn</h1>
          <p className="text-slate-500 font-medium">Theo dõi và phản hồi các yêu cầu từ học viên.</p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span className="font-black text-amber-600">{registrations.filter(r => r.type === 'registration').length} Đăng ký học</span>
           </div>
           <div className="px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="font-black text-blue-600">{registrations.filter(r => r.type === 'contact').length} Yêu cầu tư vấn</span>
           </div>
        </div>
      </div>

      <div className="grid gap-6">
        {registrations.map((reg) => (
          <Card key={reg.id} className="p-8 border-none shadow-xl rounded-[3rem] bg-white flex flex-col md:flex-row md:items-center justify-between gap-8 relative group">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleDelete(reg.id)}
              className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-primary shrink-0 ${reg.type === 'registration' ? 'bg-amber-100' : 'bg-blue-100'}`}>
                <User className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-primary">{reg.name}</h3>
                  <Badge className={reg.type === 'registration' ? 'bg-amber-500' : 'bg-blue-500'}>
                    {reg.type === 'registration' ? 'Đăng ký học' : 'Tư vấn'}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-primary" /> {reg.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-primary" /> {reg.phone}</span>
                </div>
                {reg.message && (
                  <p className="text-slate-500 mt-2 p-3 bg-slate-50 rounded-xl text-sm italic">
                    "{reg.message}"
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
              {reg.courseTitle && (
                <div className="flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="font-black text-primary">{reg.courseTitle}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5" /> {reg.date}
              </div>
            </div>
          </Card>
        ))}
        {registrations.length === 0 && <p className="text-center text-slate-400 font-bold py-20 bg-white rounded-[3rem] shadow-inner">Chưa có học viên đăng ký khóa học nào.</p>}
      </div>
    </div>
  )
}
