import Link from 'next/link'
import { CheckCircle2, Building2, Scale, Calculator, Presentation, ArrowRight, PhoneCall, Mail, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Tư vấn Doanh nghiệp | CÔNG TY TNHH INSPIRING HR',
  description: 'Giải pháp tư vấn quản trị nhân sự toàn diện, bám sát thực tiễn doanh nghiệp.',
}

export default function ConsultingPage() {
  const services = [
    {
      title: 'Thiết lập Hệ thống HR',
      desc: 'Xây dựng trọn bộ quy trình, biểu mẫu và sơ đồ tổ chức tối ưu cho doanh nghiệp mới hoặc tái cấu trúc.',
      icon: Building2,
      features: ['Sơ đồ tổ chức', 'Bảng mô tả công việc (JD)', 'Quy trình vận hành chuẩn (SOP)']
    },
    {
      title: 'Pháp lý Lao động',
      desc: 'Tư vấn soạn thảo hợp đồng, nội quy lao động và xử lý các vấn đề quan hệ nhân sự theo luật định.',
      icon: Scale,
      features: ['Hợp đồng lao động', 'Nội quy & Thỏa ước', 'Xử lý kỷ luật đúng luật']
    },
    {
      title: 'Xây dựng Hệ thống C&B',
      desc: 'Thiết kế thang bảng lương, chính sách thưởng và phúc lợi giúp giữ chân nhân tài hiệu quả.',
      icon: Calculator,
      features: ['Thang bảng lương 3P', 'Chính sách thưởng KPI', 'Hệ thống phúc lợi tự nguyện']
    },
    {
      title: 'Đào tạo Inhouse',
      desc: 'Thiết kế chương trình đào tạo riêng biệt theo yêu cầu và đặc thù ngành nghề của doanh nghiệp.',
      icon: Presentation,
      features: ['Nâng cao năng lực quản lý', 'Kỹ năng mềm cho nhân viên', 'Đào tạo chuyên môn HR']
    }
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Hero Section - Sạch sẽ */}
      <section className="bg-[#f8fafc] py-20 relative overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
            <Badge className="bg-primary/5 text-primary border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Dành cho Doanh nghiệp
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black text-primary leading-tight tracking-tight">
              Giải Pháp Tư Vấn <br />
              <span className="text-secondary italic">Quản Trị Nhân Sự Toàn Diện</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
              Đồng hành cùng doanh nghiệp xây dựng hệ thống quản trị bài bản, tối ưu nguồn lực và nâng cao hiệu quả kinh doanh thông qua con người.
            </p>
            <div className="flex gap-4 pt-2">
               <Link href="/lien-he">
                  <Button className="bg-secondary text-primary font-black px-8 h-14 rounded-xl hover:bg-primary hover:text-white transition-all shadow-md">
                     Yêu cầu tư vấn ngay
                  </Button>
               </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <Card key={i} className="p-8 border border-slate-100 shadow-sm rounded-2xl bg-white group hover:shadow-lg transition-all duration-500">
                   <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                         <service.icon className="w-7 h-7" />
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-xl font-black text-primary leading-tight">{service.title}</h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed">{service.desc}</p>
                         <ul className="space-y-2 pt-2">
                            {service.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
                                 <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {feature}
                              </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
         <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16 space-y-3">
               <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">Quy Trình Triển Khai</h2>
               <div className="w-12 h-1 bg-secondary mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-12 relative">
               <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block" />
               {[
                 { step: '01', title: 'Khảo sát & Phân tích', desc: 'Đánh giá thực trạng hệ thống nhân sự tại doanh nghiệp.' },
                 { step: '02', title: 'Thiết kế Giải pháp', desc: 'Xây dựng phương án chuyên biệt theo đặc thù đơn vị.' },
                 { step: '03', title: 'Chuyển giao & Đào tạo', desc: 'Triển khai vào thực tế và hướng dẫn vận hành.' }
               ].map((item, i) => (
                 <div key={i} className="relative bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border border-slate-100 z-10">
                    <span className="text-3xl font-black text-secondary/20">{item.step}</span>
                    <h4 className="text-base font-black text-primary">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
         <div className="container mx-auto px-4 max-w-4xl">
            <Card className="bg-[#0E3B0F] text-white p-10 md:p-16 rounded-[2.5rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
               <div className="relative z-10 space-y-6">
                  <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">Nâng Tầm Hệ Thống Quản Trị Của Bạn</h2>
                  <p className="text-white/70 text-sm md:text-base font-medium max-w-xl mx-auto">Chúng tôi sẵn sàng cử chuyên gia đến khảo sát trực tiếp tại doanh nghiệp của bạn.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                     <Link href="/lien-he">
                        <Button className="bg-secondary text-primary font-black px-10 h-14 rounded-xl hover:bg-white transition-all text-base flex items-center gap-2">
                           <MessageSquare className="w-4 h-4" /> Liên hệ tư vấn
                        </Button>
                     </Link>
                     <Link href="tel:0915099642">
                        <Button variant="outline" className="border-white/20 text-white font-black px-10 h-14 rounded-xl hover:bg-white/10 transition-all text-base flex items-center gap-2">
                           <PhoneCall className="w-4 h-4" /> 0915 099 642
                        </Button>
                     </Link>
                  </div>
               </div>
            </Card>
         </div>
      </section>
    </div>
  )
}
