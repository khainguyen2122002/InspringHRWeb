'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, User, ArrowLeft, Share2, Facebook, MessageCircle, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function NewsDetailPage() {
  const post = {
    title: 'Xu hướng Quản trị Nhân sự 2026: Kỷ nguyên của AI và Trải nghiệm nhân viên',
    date: '10/05/2026',
    author: 'Ms. Hồng Nhung',
    type: 'Xu Hướng',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
    content: [
      'Năm 2026 đánh dấu bước ngoặt lớn trong cách thức vận hành của bộ phận Nhân sự. Không còn chỉ là các thủ tục hành chính khô khan, HR hiện đại đang chuyển mình trở thành đối tác chiến lược quan trọng, trực tiếp đóng góp vào sự tăng trưởng của doanh nghiệp.',
      'Ứng dụng Trí tuệ Nhân tạo (AI) đã không còn là điều xa xỉ. Từ việc sàng lọc CV tự động, phân tích hành vi ứng viên đến việc thiết kế lộ trình đào tạo cá nhân hóa, AI đang giúp HR tiết kiệm hàng trăm giờ làm việc mỗi tháng.',
      'Tuy nhiên, công nghệ không thể thay thế con người hoàn toàn. Trải nghiệm nhân viên (Employee Experience) mới là yếu tố cốt lõi để giữ chân nhân tài. Doanh nghiệp cần tập trung vào việc xây dựng môi trường làm việc hạnh phúc, nơi mỗi cá nhân đều cảm thấy được trân trọng và phát triển.',
      'Tại Inspiring HR, chúng tôi luôn cập nhật những xu hướng này vào các chương trình đào tạo thực chiến để học viên không chỉ giỏi kỹ năng mà còn có tư duy chiến lược dẫn đầu thị trường.'
    ]
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
           {/* Breadcrumb */}
           <div className="mb-8">
              <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-primary transition-colors group uppercase tracking-widest">
                 <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Danh sách bài viết
              </Link>
           </div>

           {/* Post Header */}
           <div className="space-y-5 mb-10">
              <Badge className="bg-secondary text-primary px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border-none">
                 {post.type}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-black text-primary leading-tight tracking-tight">
                 {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-6">
                 <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-secondary" /> {post.date}
                 </div>
                 <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary" /> {post.author}
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" /> 5 phút đọc
                 </div>
              </div>
           </div>

           {/* Image */}
           <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-10 border border-slate-50">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
           </div>

           {/* Content */}
           <div className="space-y-6">
              {post.content.map((para, i) => (
                <p key={i} className="text-slate-600 leading-loose text-sm md:text-base font-medium text-justify">
                   {para}
                </p>
              ))}
              
              <div className="bg-slate-50 p-8 rounded-2xl border-l-4 border-primary mt-10 italic text-primary font-bold text-base leading-relaxed">
                 "Thách thức lớn nhất của HR không phải là công nghệ, mà là làm sao để giữ được bản sắc con người trong một thế giới số hóa."
              </div>
           </div>

           {/* Share */}
           <div className="mt-12 pt-6 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Chia sẻ</span>
                 <div className="flex gap-2">
                    <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Facebook className="w-4 h-4" /></button>
                    <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><MessageCircle className="w-4 h-4" /></button>
                    <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Share2 className="w-4 h-4" /></button>
                 </div>
              </div>
              <Link href="/khoa-hoc">
                 <Button className="bg-secondary text-primary font-bold px-6 h-11 rounded-xl hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-widest">
                    Xem khóa học liên quan
                 </Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
