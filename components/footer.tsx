import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0E3B0F] text-white border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-6 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-[130px] h-[40px] rounded-lg overflow-hidden flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="Inspiring HR Logo" 
                  fill 
                  className="object-contain mix-blend-multiply"
                />
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-medium">
              Đồng hành cùng cộng đồng HR Việt Nam bằng tri thức thực chiến và sự tận tâm nghề nghiệp.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary font-bold mb-6 uppercase text-[10px] tracking-widest">Khám Phá</h3>
            <ul className="space-y-3 text-[13px] text-white/70">
              <li><Link href="/gioi-thieu" className="hover:text-secondary transition-colors font-medium flex items-center gap-2 group">Giới thiệu</Link></li>
              <li><Link href="/khoa-hoc" className="hover:text-secondary transition-colors font-medium flex items-center gap-2 group">Khóa học đào tạo</Link></li>
              <li><Link href="/tu-van-doanh-nghiep" className="hover:text-secondary transition-colors font-medium flex items-center gap-2 group">Dịch vụ doanh nghiệp</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-secondary transition-colors font-medium flex items-center gap-2 group">Tin tức & Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-secondary font-bold mb-6 uppercase text-[10px] tracking-widest">Thông Tin Liên Hệ</h3>
            <div className="space-y-4 text-[13px] text-white/70">
              <p className="font-bold text-sm text-white uppercase tracking-wider">CÔNG TY TNHH INSPIRING HR</p>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span className="leading-relaxed">114/2K hẻm 222 đường Trường Chinh, P. Đông Hưng Thuận, TP. HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>Hotline: 0915 099 642</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>Email: inspiringhr.daotaonhansu@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/40 font-medium tracking-wide">
            © {year} Inspiring HR. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] text-white/40 font-bold uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">Điều khoản</Link>
            <Link href="#" className="hover:text-white transition-colors">Bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
