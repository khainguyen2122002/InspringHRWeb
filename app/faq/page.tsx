'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Search, MessageCircle, PhoneCall, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [search, setSearch] = useState('')

  const faqs = [
    {
      question: 'Inspiring HR là trung tâm như thế nào?',
      answer: 'Inspiring HR là công ty chuyên cung cấp dịch vụ đào tạo và tư vấn Quản trị Nhân sự với sứ mệnh “Truyền cảm hứng và nâng tầm năng lực cho người làm nghề Nhân sự”. Chúng tôi tập trung vào đào tạo thực tiễn, kết nối và chất lượng cao, hướng đến sự phát triển bền vững của học viên và doanh nghiệp. Đội ngũ 100% là chuyên gia HR đang làm việc tại các tập đoàn lớn với hơn 15 năm kinh nghiệm thực tiễn.'
    },
    {
      question: 'Giảng viên chính của trung tâm là ai?',
      answer: 'Giảng viên chính là Ms. Trần Thị Hồng Nhung – Tổng Giám đốc Công ty TNHH Inspiring HR. Chị có nhiều năm kinh nghiệm giữ vị trí Trưởng phòng Nhân sự tại các tập đoàn lớn như Tập đoàn Hưng Thịnh, Kim Gia Phạm, Bơm Toàn Cầu, RENDEZ-VOUS, SAVISTA… Phong cách giảng dạy thực tế, tương tác cao và hỗ trợ học viên lâu dài.'
    },
    {
      question: 'Khóa học Nghề Nhân sự Chuyên nghiệp phù hợp với ai?',
      answer: 'Khóa học phù hợp với:\n• Sinh viên, người mới tốt nghiệp muốn theo nghề HR.\n• Người đi làm trái ngành muốn chuyển sang Nhân sự.\n• Nhân viên Hành chính – Nhân sự muốn nâng cao nghiệp vụ.\n• Chuyên viên HR muốn thăng tiến lên HRBP, HR Manager.\n• Cấp quản lý đang phụ trách HR tại doanh nghiệp.'
    },
    {
      question: 'Sau khóa học tôi sẽ đạt được những gì?',
      answer: 'Bạn sẽ:\n• Nắm vững toàn bộ nghiệp vụ HR từ A đến Z (Tuyển dụng, Hành chính, Pháp lý lao động, Lương – Phúc lợi, BHXH, Thuế TNCN…).\n• Thành thạo Excel tính lương, quyết toán thuế, nghiệp vụ BHXH.\n• Xây dựng được tư duy quản trị nhân sự chuyên nghiệp.\n• Được cấp Giấy chứng nhận hoàn thành (dấu đỏ).\n• Được hỗ trợ kết nối việc làm và coaching 1-1 định hướng nghề nghiệp.'
    },
    {
      question: 'Học phí của khóa học có ưu đãi không?',
      answer: '• Nhóm 2 người: giảm thêm 5%.\n• Nhóm 3 người trở lên: giảm thêm 10%.\n• Sinh viên chưa tốt nghiệp: giảm thêm 5%.'
    },
    {
      question: 'Có hỗ trợ gì sau khi kết thúc khóa học không?',
      answer: 'Có. Inspiring HR cam kết hỗ trợ dài hạn:\n• Xem lại record bài giảng.\n• Tư vấn nghiệp vụ miễn phí trong và sau khóa học.\n• Nhóm hỗ trợ học viên + follow-up 30 ngày.\n• Cung cấp cập nhật văn bản luật mới.\n• Hỗ trợ kết nối tuyển dụng và coaching 1-1.'
    },
    {
      question: 'Khóa học có thực hành không?',
      answer: 'Rất nhiều thực hành. Học viên được thực hành trực tiếp:\n• Xây dựng bảng chấm công, bảng lương trên Excel.\n• Tính lương Gross-Net, quyết toán thuế TNCN.\n• Xử lý nghiệp vụ BHXH trên phần mềm.\n• Soạn thảo hợp đồng, nội quy lao động, chính sách phúc lợi… 100% ví dụ và case study lấy từ thực tế doanh nghiệp.'
    },
    {
      question: 'Làm thế nào để đăng ký khóa học?',
      answer: 'Bạn truy cập link đăng ký: https://forms.gle/ehxCpRNz8mL5QBaFA\n\nHoặc liên hệ trực tiếp:\nMs. Nhung – Điện thoại/Zalo: 0915 099 642\nEmail: inspiringhr.daotaonhansu@gmail.com'
    },
    {
      question: 'Nếu không hài lòng với chất lượng khóa học thì sao?',
      answer: 'Chúng tôi có chính sách Học thử 01 buổi đầu tiên hoàn toàn miễn phí. Nếu không hài lòng về chất lượng, bạn sẽ được hoàn phí 100%. Chúng tôi rất tự tin vào chất lượng thực tiễn và sự tận tâm của đội ngũ.'
    }
  ]

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-primary/5 pt-20 md:pt-32 pb-16 md:pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header - Tinh gọn */}
        <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
          <Badge className="bg-primary/5 text-primary border-none px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            Giải đáp thắc mắc
          </Badge>
          <h1 className="text-xl md:text-4xl font-black text-primary tracking-tight leading-tight">
            Câu Hỏi Thường Gặp
          </h1>
          <p className="text-[13px] md:text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-4 md:px-0">
            Mọi thắc mắc của bạn về lộ trình học tập, học phí và các quyền lợi đi kèm sẽ được giải đáp tại đây.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 md:mb-12 max-w-2xl mx-auto">
          <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Tìm kiếm câu hỏi..." 
            className="pl-11 md:pl-12 h-12 md:h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20 text-[13px] md:text-sm font-medium"
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
                className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <HelpCircle className="w-3.5 h-3.5 md:w-4 h-4" />
                  </div>
                  <span className="text-[13px] md:text-base font-bold text-slate-800 leading-snug">{faq.question}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 md:w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="pb-5 md:pb-6 pl-14 md:pl-16 pr-5 md:pr-8 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-slate-600 text-[12px] md:text-base leading-relaxed font-medium whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 md:mt-16 bg-mesh-green rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="relative z-10 space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-2xl font-black">Bạn vẫn còn thắc mắc khác?</h3>
              <p className="text-white/70 text-[13px] md:text-sm font-medium px-4 md:px-0">Đội ngũ tư vấn của Inspiring HR luôn sẵn sàng hỗ trợ bạn 24/7.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pt-2">
                 <a href="https://zalo.me/0915099642" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button className="w-full bg-secondary text-primary font-black px-8 h-12 rounded-xl hover:bg-white transition-all text-[11px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                       <MessageCircle className="w-4 h-4" /> Chat qua Zalo
                    </Button>
                 </a>
                 <Link href="/lien-he" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full border-white/20 text-white font-black px-8 h-12 rounded-xl hover:bg-white/10 transition-all text-[11px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                       <MessageCircle className="w-4 h-4" /> Chat ngay
                    </Button>
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
