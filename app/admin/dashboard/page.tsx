'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Newspaper, Users, MessageSquare, TrendingUp, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react'
import { getCourses, getGoogleSheetNews, getContacts } from '@/app/actions'
import { mockDb } from '@/lib/mock-db'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    news: 0,
    inquiries: 0,
    users: 0
  })

  useEffect(() => {
    async function loadStats() {
      try {
        const [coursesRes, newsRes, contactsRes] = await Promise.all([
          getCourses(),
          getGoogleSheetNews(),
          getContacts()
        ])

        const coursesLen = coursesRes.success && coursesRes.data ? coursesRes.data.length : mockDb.getCourses().length
        const newsLen = newsRes.success && newsRes.data ? newsRes.data.length : mockDb.getNews().length
        
        let inquiriesLen = 0
        let registrationsLen = 0
        
        if (contactsRes && 'data' in contactsRes && contactsRes.data) {
          const allContacts = contactsRes.data as any[]
          inquiriesLen = allContacts.filter(c => c.type === 'contact').length
          registrationsLen = allContacts.filter(c => c.type === 'registration').length
        } else {
          const allInquiries = mockDb.getInquiries()
          inquiriesLen = allInquiries.filter(i => i.type === 'contact').length
          registrationsLen = allInquiries.filter(i => i.type === 'registration').length
        }

        setStats({
          courses: coursesLen,
          news: newsLen,
          inquiries: inquiriesLen,
          users: registrationsLen
        })
      } catch (err) {
        console.error('Lỗi khi tải thống kê:', err)
        const courses = mockDb.getCourses()
        const news = mockDb.getNews()
        const allInquiries = mockDb.getInquiries()
        setStats({
          courses: courses.length,
          news: news.length,
          inquiries: allInquiries.filter(i => i.type === 'contact').length,
          users: allInquiries.filter(i => i.type === 'registration').length
        })
      }
    }
    loadStats()
  }, [])

  const statCards = [
    { label: 'Khóa học', value: stats.courses, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Bài viết', value: stats.news, icon: Newspaper, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
    { label: 'Học viên', value: stats.users, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Yêu cầu tư vấn', value: stats.inquiries, icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  ]

  return (
    <div className="space-y-12">
      
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-primary p-12 rounded-[3.5rem] text-white shadow-2xl shadow-primary/20">
         <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
               <Badge className="bg-white/10 text-white border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit">
                  <ShieldCheck className="w-3 h-3 text-secondary" /> Hệ thống bảo mật
               </Badge>
               <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
                  Chào buổi sáng, <br />
                  <span className="text-secondary italic">Quản trị viên!</span>
               </h1>
               <p className="text-white/60 font-medium max-w-md">
                  Chào mừng trở lại bảng điều khiển của Inspiring HR. Hôm nay bạn có <span className="text-white font-black">{stats.users + stats.inquiries}</span> yêu cầu mới cần xử lý.
               </p>
            </div>
            <Link href="/admin/courses">
               <Button className="h-16 px-10 rounded-2xl bg-secondary hover:bg-yellow-500 text-primary font-black text-lg gap-3 shadow-xl active:scale-95 transition-all">
                  <Sparkles className="w-5 h-5" /> Quản lý nội dung ngay
               </Button>
            </Link>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <Card key={i} className={`p-10 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-[3rem] bg-white flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="space-y-1">
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">{stat.label}</p>
              <div className="flex items-end gap-3">
                 <p className="text-5xl font-black text-primary tracking-tighter">{stat.value}</p>
                 <Badge className="mb-2 bg-emerald-50 text-emerald-600 border-none font-bold text-[10px]">+12%</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Shortcuts */}
         <Card className="lg:col-span-2 p-12 border-none shadow-2xl rounded-[4rem] bg-white space-y-10">
            <div className="flex justify-between items-center">
               <h3 className="text-3xl font-black text-primary tracking-tight">Lối tắt nhanh</h3>
               <TrendingUp className="text-secondary w-8 h-8" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { title: 'Thêm Khóa Học', desc: 'Đăng tải chương trình đào tạo mới', href: '/admin/courses', icon: BookOpen, color: 'bg-blue-500' },
                 { title: 'Viết Tin Tức', desc: 'Chia sẻ sự kiện & kiến thức nhân sự', href: '/admin/news', icon: Newspaper, color: 'bg-purple-500' },
                 { title: 'Duyệt Học Viên', desc: 'Quản lý danh sách đăng ký học', href: '/admin/registrations', icon: Users, color: 'bg-emerald-500' },
                 { title: 'Xem Tư Vấn', desc: 'Phản hồi yêu cầu của khách hàng', href: '/admin/registrations', icon: MessageSquare, color: 'bg-amber-500' },
               ].map((item, i) => (
                 <Link href={item.href} key={i}>
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] group hover:bg-primary transition-all duration-500 cursor-pointer flex flex-col gap-6">
                       <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/10`}>
                          <item.icon className="w-6 h-6" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-xl font-black text-primary group-hover:text-white transition-colors">{item.title}</h4>
                          <p className="text-slate-400 text-sm font-medium group-hover:text-white/60 transition-colors">{item.desc}</p>
                       </div>
                    </div>
                 </Link>
               ))}
            </div>
         </Card>

         {/* System Health */}
         <Card className="p-12 border-none shadow-2xl rounded-[4rem] bg-white space-y-10 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-tl-full" />
            <h3 className="text-2xl font-black text-primary">Hệ thống</h3>
            <div className="space-y-6">
               <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database</p>
                     <p className="font-black text-primary">IH-Storage (Realtime)</p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200 animate-pulse" />
               </div>
               <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Version</p>
                     <p className="font-black text-primary">Build 2026.05.stable</p>
                  </div>
                  <Badge className="bg-primary text-white border-none px-3 font-black text-[10px]">NEW</Badge>
               </div>
               <div className="pt-6 space-y-4">
                  <p className="text-xs font-bold text-slate-400 italic">Mọi thay đổi trên Dashboard này sẽ ảnh hưởng trực tiếp đến dữ liệu hiển thị phía người dùng.</p>
               </div>
            </div>
         </Card>
      </div>
    </div>
  )
}
