import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Award, Users, Target, Building2, Sparkles, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Giới thiệu | CÔNG TY TNHH INSPIRING HR',
  description: 'Hành trình sứ mệnh và giá trị cốt lõi của Inspiring HR trong đào tạo nguồn nhân lực.',
}

export default function AboutPage() {
  const values = [
    { title: 'Tâm Huyết', desc: 'Mọi hoạt động đều xuất phát từ cái tâm và sự tận tụy với nghề giáo.', icon: Award },
    { title: 'Thực Chiến', desc: 'Không lý thuyết suông, chỉ tập trung vào giải pháp có thể áp dụng ngay.', icon: Target },
    { title: 'Kết Nối', desc: 'Xây dựng cộng đồng nhân sự chuyên nghiệp, sẵn sàng chia sẻ và học hỏi.', icon: Users },
    { title: 'Cam Kết', desc: 'Đồng hành cùng học viên và doanh nghiệp cho đến khi đạt được kết quả.', icon: Building2 }
  ]

  const milestones = [
    { year: '2018', title: 'Khởi đầu Sứ mệnh', desc: 'Những lớp học HR thực chiến đầu tiên được tổ chức tại TP.HCM.' },
    { year: '2020', title: 'Chuyển đổi Số', desc: 'Triển khai hệ thống đào tạo Online hỗ trợ học viên trên toàn quốc.' },
    { year: '2022', title: 'Đẳng cấp Tư vấn', desc: 'Trở thành đối tác chiến lược cho các tập đoàn quy mô >1000 nhân sự.' },
    { year: '2024', title: 'Nâng tầm Thương hiệu', desc: 'Inspiring HR khẳng định vị thế trung tâm đào tạo HR uy tín hàng đầu.' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white pt-24">
      {/* Hero Section - Sạch sẽ, typography tinh tế */}
      <section className="bg-slate-50 py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Badge className="bg-primary/5 text-primary border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            Hành trình Inspiring HR
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-primary leading-tight tracking-tight mb-6">
            Khơi Nguồn Cảm Hứng <br />
            <span className="text-secondary italic">Nâng Tầm Năng Lực</span>
          </h1>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            Chúng tôi không chỉ dạy kỹ năng, chúng tôi truyền cảm hứng để bạn trở thành phiên bản chuyên nghiệp nhất của chính mình trong nghề Nhân sự.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-slate-50">
                 <Image 
                   src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                   alt="Ms. Trần Thị Hồng Nhung" 
                   fill 
                   className="object-cover"
                 />
                 <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                    <h3 className="text-xl font-black text-primary">Ms. Trần Thị Hồng Nhung</h3>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">Founder & CEO Inspiring HR</p>
                 </div>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-3">
                    <p className="text-secondary font-bold uppercase tracking-widest text-[10px]">Người truyền lửa</p>
                    <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight">Chuyên gia với 15+ năm <br /> kinh nghiệm thực chiến</h2>
                 </div>
                 <div className="space-y-4 text-slate-600 text-sm md:text-base leading-loose font-medium">
                    <p>Với hành trình hơn 15 năm kinh nghiệm đảm nhiệm các vị trí Giám đốc Nhân sự (CHRO), Trưởng phòng Nhân sự tại các tập đoàn lớn, Ms. Hồng Nhung hiểu rõ những nỗi đau và thách thức mà người làm nghề HR đang gặp phải.</p>
                    <p>Inspiring HR ra đời từ tâm huyết muốn chia sẻ những kiến thức "xương máu", những biểu mẫu "thực chiến" mà không một trường lớp hàn lâm nào giảng dạy. Mục tiêu duy nhất là giúp học viên rút ngắn thời gian thành công và doanh nghiệp tối ưu được nguồn lực quý giá nhất: <strong>Con người</strong>.</p>
                 </div>
                 <div className="flex gap-8 pt-4">
                    <div className="space-y-1">
                       <p className="text-2xl font-black text-primary">5000+</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Học viên đào tạo</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-2xl font-black text-primary">50+</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doanh nghiệp tư vấn</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-y-3">
               <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">Giá Trị Cốt Lõi</h2>
               <div className="w-12 h-1 bg-secondary mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {values.map((v, i) => (
                 <Card key={i} className="p-8 border-none shadow-sm rounded-2xl bg-white group hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                       <v.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-primary mb-3">{v.title}</h3>
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                 </Card>
               ))}
            </div>
         </div>
      </section>

      {/* Partners / Clients */}
      <section className="py-20">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-y-3">
               <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">Đối Tác Đồng Hành</h2>
               <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Tin tưởng bởi các doanh nghiệp hàng đầu</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
               {['Vingroup', 'Viettel', 'FPT', 'Sun Group'].map((client, i) => (
                 <div key={i} className="flex items-center justify-center h-20 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <span className="text-xl font-black text-slate-400">{client}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
         <div className="container mx-auto px-4 text-center max-w-4xl space-y-8">
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
               Hãy Để Chúng Tôi Đồng Hành Cùng <br /> <span className="text-secondary italic">Sự Nghiệp Của Bạn</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed">
               Gia nhập cộng đồng nhân sự chuyên nghiệp và bứt phá giới hạn năng lực bản thân ngay hôm nay.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
               <Link href="/khoa-hoc" className="bg-secondary text-primary font-black px-10 h-14 rounded-xl flex items-center justify-center gap-2 hover:bg-[#E09D00] transition-all">
                  Khám phá các khóa học <ArrowRight className="w-4 h-4" />
               </Link>
               <Link href="/lien-he" className="bg-white/10 text-white border border-white/20 font-black px-10 h-14 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                  Tư vấn lộ trình
               </Link>
            </div>
         </div>
      </section>
    </div>
  )
}
