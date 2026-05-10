'use client'

import { useState } from 'react'
import { ChevronDown, Search, MessageCircle, PhoneCall, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [search, setSearch] = useState('')

  const faqs = [
    {
      question: 'Khóa học Nghề Nhân sự Chuyên nghiệp dành cho đối tượng nào?',
      answer: 'Khóa học được thiết kế dành riêng cho các bạn sinh viên năm cuối, người mới bắt đầu bước chân vào nghề Nhân sự (Fresher), hoặc các bạn đang làm chuyên viên (Junior) muốn hệ thống lại kiến thức bài bản và chuyên sâu.'
    },
    {
      question: 'Tôi có được cấp chứng chỉ sau khi hoàn thành khóa học không?',
      answer: 'Có. Sau khi hoàn thành khóa học và đạt kết quả bài kiểm tra cuối khóa, Inspiring HR sẽ cấp chứng nhận hoàn thành khóa học có giá trị xác nhận năng lực thực chiến trong cộng đồng Nhân sự.'
    },
    {
      question: 'Nếu tôi bận và nghỉ một buổi học thì có được học bù không?',
      answer: 'Tất cả các buổi học Online qua Microsoft Teams đều được ghi hình (Record). Bạn có thể xem lại video buổi học bất cứ lúc nào. Ngoài ra, giảng viên luôn sẵn sàng giải đáp thắc mắc của bạn qua nhóm Zalo lớp học.'
    },
    {
      question: 'Inspiring HR có chính sách ưu đãi học phí cho nhóm không?',
      answer: 'Chúng tôi luôn khuyến khích tinh thần học tập theo nhóm. Khi đăng ký từ 3 người trở lên, bạn sẽ nhận được ưu đãi giảm thêm từ 200.000đ - 500.000đ mỗi học viên tùy từng khóa học.'
    },
    {
      question: 'Sau khóa học, tôi có được hỗ trợ gì thêm không?',
      answer: 'Inspiring HR cam kết đồng hành trọn đời. Bạn sẽ được gia nhập cộng đồng học viên tinh hoa, được giảng viên cố vấn chuyên môn và chia sẻ các biểu mẫu, tài liệu thực tế ngay cả khi khóa học đã kết thúc.'
    }
  ]

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header - Tinh gọn */}
        <div className="text-center mb-12 space-y-4">
          <Badge className="bg-primary/5 text-primary border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            Giải đáp thắc mắc
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight leading-tight">
            Câu Hỏi Thường Gặp
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Mọi thắc mắc của bạn về lộ trình học tập, học phí và các quyền lợi đi kèm sẽ được giải đáp tại đây.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Tìm kiếm câu hỏi..." 
            className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20 text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-base font-bold text-slate-800 leading-snug">{faq.question}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="pb-6 pl-16 pr-8 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 bg-primary rounded-[2.5rem] p-10 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="relative z-10 space-y-6">
              <h3 className="text-xl md:text-2xl font-black">Bạn vẫn còn thắc mắc khác?</h3>
              <p className="text-white/70 text-sm font-medium">Đội ngũ tư vấn của Inspiring HR luôn sẵn sàng hỗ trợ bạn 24/7.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                 <Button className="bg-secondary text-primary font-black px-8 h-12 rounded-xl hover:bg-white transition-all text-xs uppercase tracking-widest flex items-center gap-2 mx-auto sm:mx-0">
                    <MessageCircle className="w-4 h-4" /> Chat qua Zalo
                 </Button>
                 <Button variant="outline" className="border-white/20 text-white font-black px-8 h-12 rounded-xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest flex items-center gap-2 mx-auto sm:mx-0">
                    <PhoneCall className="w-4 h-4" /> Gọi ngay
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
