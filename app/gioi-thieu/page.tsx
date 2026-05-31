import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Award, Users, Target, Building2, Sparkles, ArrowRight, FileText, Handshake, Headphones, GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { GalleryCarousel } from '@/components/gallery-carousel'

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
    <div className="flex flex-col min-h-screen bg-white pt-20 md:pt-24">
      {/* Hero Section - Mới (2 cột) */}
      <section className="bg-gradient-to-br from-[#043319] via-[#4f885e] to-[#eef5ee] py-16 md:py-24 relative overflow-hidden shadow-2xl">
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
           <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Cột trái: Nội dung (chiếm khoảng 50-55%) */}
              <div className="text-center lg:text-left space-y-6 lg:pr-8 order-2 lg:order-1">
                 <Badge className="bg-white/20 text-white border-none px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm">
                   Về Chúng Tôi
                 </Badge>
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                   INSPIRING HR
                 </h1>
                 <p className="text-xl md:text-3xl text-[#FFCE54] font-black italic leading-relaxed drop-shadow-md">
                   "Từ Đam Mê Đến Chuyên Nghiệp: Nâng Tầm Năng Lực HR Thực Chiến"
                 </p>
                 <p className="text-sm md:text-lg text-white/90 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                   Chúng tôi không chỉ dạy kỹ năng, chúng tôi truyền cảm hứng để bạn trở thành phiên bản chuyên nghiệp nhất của chính mình trong nghề Nhân sự.
                 </p>
              </div>

              {/* Cột phải: Hình ảnh */}
              <div className="relative aspect-square md:aspect-[4/3] w-full max-w-lg mx-auto lg:ml-auto order-1 lg:order-2">
                 <Image 
                   src="/about-heading.png" 
                   alt="Inspiring HR Heading" 
                   fill 
                   className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                 />
              </div>
           </div>
        </div>
        
        {/* Hiệu ứng trang trí nền */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
      </section>

      {/* Về Inspiring HR Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Cột trái: Nội dung */}
              <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">
                 <div className="space-y-4">
                    <h2 className="text-sm md:text-base font-black uppercase tracking-widest text-[#103C11]">
                       Câu chuyện của chúng tôi
                    </h2>
                    <div className="w-16 h-1 bg-[#C7A959] mx-auto lg:mx-0 rounded-full" />
                 </div>
                 
                 <div className="space-y-6 text-[#103C11] text-base md:text-lg font-medium leading-[1.7]">
                    <p>
                       Inspiring HR ra đời từ tâm huyết của Founder Trần Thị Hồng Nhung – chuyên gia với hơn 15 năm kinh nghiệm quản trị – cùng đội ngũ giảng viên là các Giám đốc Nhân sự, Chuyên gia nhân sự giàu kinh nghiệm thực tế tại các tập đoàn lớn.
                    </p>
                    <p>
                       Chúng tôi không định hình mình là một trường lớp hàn lâm, mà là người đồng hành chia sẻ những kiến thức "xương máu", biểu mẫu thực tế và giải pháp quản trị tối ưu có thể áp dụng ngay vào doanh nghiệp.
                    </p>
                    <p>
                       Với triết lý lấy con người làm trung tâm, Inspiring HR cam kết giúp các học viên bứt phá năng lực, rút ngắn con đường đi đến thành công và đồng hành cùng doanh nghiệp tối ưu hóa nguồn lực quý giá nhất.
                    </p>
                 </div>

                 <div className="pt-4 flex justify-center lg:justify-start">
                    <Link 
                       href="/lien-he" 
                       className="inline-flex items-center gap-3 bg-[#C7A959] hover:bg-[#d6b763] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm uppercase tracking-widest"
                    >
                       Liên hệ tư vấn ngay <ArrowRight className="w-5 h-5" />
                    </Link>
                 </div>
              </div>

              {/* Cột phải: Hình ảnh */}
              <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/5] order-1 lg:order-2">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#103C11] to-[#0A290A] rounded-[2rem] md:rounded-[3rem] translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 -z-10 shadow-2xl" />
                 <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl border-4 border-white group">
                    <Image 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
                      alt="Inspiring HR Team" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CAM KẾT SECTION */}
      <section className="py-20 md:py-28 bg-[#fdfcf8]">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-[#103C11] tracking-tight uppercase drop-shadow-sm">
                 CAM KẾT TỪ INSPIRING HR
              </h2>
              <div className="w-24 h-1.5 bg-[#C7A959] mx-auto rounded-full shadow-sm" />
           </div>

           <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Cam kết chất lượng (Dark Green) */}
              <div className="bg-gradient-to-br from-[#103C11] to-[#0A290A] p-8 md:p-12 rounded-[2rem] shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                 <h3 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-4">
                    <span className="w-14 h-14 bg-[#C7A959]/20 rounded-2xl flex items-center justify-center shrink-0">
                       <Award className="w-7 h-7 text-[#C7A959]" />
                    </span>
                    Cam kết chất lượng
                 </h3>
                 <div className="space-y-6">
                    <div className="flex gap-4">
                       <Target className="w-7 h-7 text-[#C7A959] shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-lg font-bold text-[#C7A959] group-hover:text-white transition-colors duration-300">Thực chiến 100%</h4>
                          <p className="text-white/85 font-medium leading-[1.7] mt-1">Học qua tình huống thực tế, nói không với lý thuyết suông.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <GraduationCap className="w-7 h-7 text-[#C7A959] shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-lg font-bold text-[#C7A959] group-hover:text-white transition-colors duration-300">Chuyên gia đầu ngành</h4>
                          <p className="text-white/85 font-medium leading-[1.7] mt-1">Giảng viên là các CHRO, Luật sư giàu kinh nghiệm.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <FileText className="w-7 h-7 text-[#C7A959] shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-lg font-bold text-[#C7A959] group-hover:text-white transition-colors duration-300">Hệ thống biểu mẫu độc quyền</h4>
                          <p className="text-white/85 font-medium leading-[1.7] mt-1">Bộ tài liệu chuẩn hóa, áp dụng được ngay.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <Sparkles className="w-7 h-7 text-[#C7A959] shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-lg font-bold text-[#C7A959] group-hover:text-white transition-colors duration-300">Phương pháp linh hoạt</h4>
                          <p className="text-white/85 font-medium leading-[1.7] mt-1">Tương tác cao, thực hành trực tiếp tại lớp học.</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Cam kết đồng hành (Light Gold/Cream) */}
              <div className="bg-[#FFFDF5] p-8 md:p-12 rounded-[2rem] shadow-xl border border-[#C7A959]/20 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                 <h3 className="text-2xl md:text-3xl font-black text-[#103C11] mb-8 flex items-center gap-4">
                    <span className="w-14 h-14 bg-[#103C11]/10 rounded-2xl flex items-center justify-center shrink-0">
                       <Handshake className="w-7 h-7 text-[#103C11]" />
                    </span>
                    Cam kết đồng hành
                 </h3>
                 <div className="space-y-6">
                    <div className="flex gap-4">
                       <Headphones className="w-7 h-7 text-[#103C11] shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-lg font-bold text-[#103C11] group-hover:text-[#C7A959] transition-colors duration-300">Hỗ trợ chuyên môn 24/7</h4>
                          <p className="text-[#103C11]/80 font-medium leading-[1.7] mt-1">Giải đáp và đôn đốc suốt quá trình học.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <Building2 className="w-7 h-7 text-[#103C11] shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-lg font-bold text-[#103C11] group-hover:text-[#C7A959] transition-colors duration-300">Thiết kế chuẩn doanh nghiệp</h4>
                          <p className="text-[#103C11]/80 font-medium leading-[1.7] mt-1">Nội dung "may đo" theo thực trạng tổ chức.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <Users className="w-7 h-7 text-[#103C11] shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-lg font-bold text-[#103C11] group-hover:text-[#C7A959] transition-colors duration-300">Cộng đồng HR bền vững</h4>
                          <p className="text-[#103C11]/80 font-medium leading-[1.7] mt-1">Kết nối mạng lưới nhân sự, chia sẻ cơ hội nghề nghiệp.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <CheckCircle2 className="w-7 h-7 text-[#103C11] shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-lg font-bold text-[#103C11] group-hover:text-[#C7A959] transition-colors duration-300">Cố vấn sau khóa học</h4>
                          <p className="text-[#103C11]/80 font-medium leading-[1.7] mt-1">Tiếp tục đồng hành và gợi ý giải pháp thực tiễn.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-primary/5">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-3">
               <h2 className="text-xl md:text-3xl font-black text-primary tracking-tight">Giá Trị Cốt Lõi</h2>
               <div className="w-10 md:w-12 h-1 bg-secondary mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {values.map((v, i) => (
                 <Card key={i} className="p-6 md:p-8 border-none shadow-sm rounded-2xl bg-white group hover:shadow-md transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-5 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                       <v.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-[15px] md:text-base font-black text-primary mb-2 md:mb-3">{v.title}</h3>
                    <p className="text-[12px] md:text-[13px] text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                 </Card>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-mesh-green">
         <div className="container mx-auto px-4 text-center max-w-4xl space-y-6 md:space-y-8">
            <h2 className="text-xl md:text-4xl font-black text-white leading-tight px-4 md:px-0">
               Hãy Để Chúng Tôi Đồng Hành Cùng <br className="hidden md:block" /> <span className="text-secondary italic">Sự Nghiệp Của Bạn</span>
            </h2>
            <p className="text-white/70 text-sm md:text-lg font-medium leading-relaxed px-4 md:px-0">
               Gia nhập cộng đồng nhân sự chuyên nghiệp và bứt phá giới hạn năng lực bản thân ngay hôm nay.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 md:pt-4 px-4 md:px-0">
               <Link href="/khoa-hoc" className="bg-[#C7A959] text-white font-black px-10 h-13 md:h-14 rounded-xl flex items-center justify-center gap-2 hover:bg-[#d6b763] transition-all text-sm w-full sm:w-auto uppercase tracking-widest shadow-lg hover:-translate-y-1">
                  Khám phá khóa học <ArrowRight className="w-4 h-4" />
               </Link>
               <Link href="/lien-he" className="bg-white/10 text-white border border-white/20 font-black px-10 h-13 md:h-14 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all text-sm w-full sm:w-auto">
                  Tư vấn lộ trình
               </Link>
            </div>
         </div>
      </section>

      {/* Gallery Carousel (Đẩy xuống cuối cùng) */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center mb-10">
           <h2 className="text-2xl md:text-4xl font-black text-[#103C11] tracking-tight uppercase drop-shadow-sm">Khoảnh Khắc Đáng Nhớ</h2>
           <div className="w-24 h-1.5 bg-[#C7A959] mx-auto rounded-full shadow-sm mt-4" />
        </div>
        <GalleryCarousel />
      </div>
    </div>
  )
}
