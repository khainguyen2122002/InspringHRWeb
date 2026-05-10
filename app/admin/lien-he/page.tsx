'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockDb } from '@/lib/mock-db'
import { Mail, Phone, Calendar, User } from 'lucide-react'

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])

  useEffect(() => {
    setInquiries(mockDb.getInquiries().filter((iq: any) => iq.type === 'contact'))
  }, [])

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-black text-primary tracking-tight">Danh sách Liên hệ</h1>

      <div className="grid gap-6">
        {inquiries.map((iq) => (
          <Card key={iq.id} className="p-8 border-none shadow-xl rounded-[3rem] bg-white space-y-6">
            <div className="flex justify-between items-start">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-primary">{iq.name}</h3>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {iq.date}</p>
                  </div>
               </div>
               <Badge className="bg-secondary/10 text-primary border-none font-black text-[10px] py-1 px-4 rounded-full uppercase tracking-widest">Tin nhắn mới</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
               <div className="flex items-center gap-3 text-slate-600 font-bold bg-slate-50 p-4 rounded-2xl">
                  <Mail className="w-4 h-4 text-primary" /> {iq.email}
               </div>
               <div className="flex items-center gap-3 text-slate-600 font-bold bg-slate-50 p-4 rounded-2xl">
                  <Phone className="w-4 h-4 text-primary" /> {iq.phone}
               </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
               <p className="text-slate-700 font-medium leading-relaxed italic">"{iq.message}"</p>
            </div>
          </Card>
        ))}
        {inquiries.length === 0 && <p className="text-center text-slate-400 font-bold py-20 bg-white rounded-[3rem] shadow-inner">Chưa có tin nhắn liên hệ nào.</p>}
      </div>
    </div>
  )
}
