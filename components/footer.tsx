'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'
import { PrivacyModal } from '@/components/privacy-modal'
import { TermsModal } from '@/components/terms-modal'

export function Footer() {
  const year = new Date().getFullYear()
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <>
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

      <footer className="bg-white text-primary border-t border-primary shadow-[0_-12px_40px_-12px_rgba(16,60,17,0.12)] relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 lg:gap-16 text-center md:text-left">
            {/* Brand */}
            <div className="space-y-6 md:col-span-1 flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
                <div className="relative h-14 w-14 md:h-16 md:w-16 bg-white p-2 rounded-2xl shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/20 border border-primary/10">
                  <Image 
                    src="/logo.png" 
                    alt="Inspiring HR Logo" 
                    fill
                    sizes="(max-width: 768px) 56px, 64px"
                    className="object-contain p-1 transition-opacity duration-300 group-hover:opacity-95"
                  />
                </div>
              </Link>
              <p className="text-primary/80 text-[13px] md:text-sm leading-relaxed font-medium max-w-xs md:max-w-none">
                Đồng hành cùng cộng đồng HR Việt Nam bằng tri thức thực chiến và sự tận tâm nghề nghiệp.
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/groups/1032901501324030" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary/5 text-primary/80 rounded-lg flex items-center justify-center hover:bg-secondary hover:text-white transition-all shadow-sm">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-primary/5 text-primary/80 rounded-lg flex items-center justify-center hover:bg-secondary hover:text-white transition-all shadow-sm">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-primary font-bold mb-6 uppercase text-[10px] tracking-widest">Khám Phá</h3>
              <ul className="space-y-3 text-[13px] text-primary/80">
                <li><Link href="/gioi-thieu" className="hover:text-primary transition-colors font-medium flex items-center gap-2 group">Giới thiệu</Link></li>
                <li><Link href="/khoa-hoc" className="hover:text-primary transition-colors font-medium flex items-center gap-2 group">Khóa học đào tạo</Link></li>
                <li><Link href="/tu-van-doanh-nghiep" className="hover:text-primary transition-colors font-medium flex items-center gap-2 group">Dịch vụ doanh nghiệp</Link></li>
                <li><Link href="/tin-tuc" className="hover:text-primary transition-colors font-medium flex items-center gap-2 group">Tin tức & Blog</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-2 space-y-6 flex flex-col items-center md:items-start">
              <h3 className="text-primary font-bold mb-2 md:mb-6 uppercase text-[9px] md:text-[10px] tracking-widest">Thông Tin Liên Hệ</h3>
              <div className="space-y-4 text-[13px] text-primary/80 flex flex-col items-center md:items-start">
                <p className="font-bold text-sm text-primary uppercase tracking-wider">CÔNG TY TNHH INSPIRING HR</p>
                <div className="flex items-start gap-3 justify-center md:justify-start">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">114/2K hẻm 222 đường Trường Chinh, P. Đông Hưng Thuận, TP. HCM</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>Hotline: 0915 099 642</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>Email: inspiringhr.daotaonhansu@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <p className="text-[10px] md:text-[11px] text-primary/60 font-medium tracking-wide">
              © {year} Inspiring HR. All rights reserved.
            </p>
            <div className="flex gap-6 text-[10px] md:text-[11px] text-primary/60 font-bold uppercase tracking-widest">
              <button
                onClick={() => setTermsOpen(true)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Điều khoản
              </button>
              <button
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Bảo mật
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
