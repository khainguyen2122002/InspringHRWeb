'use client'

import { useEffect, useRef } from 'react'
import { X, Shield, MapPin, Phone, Mail } from 'lucide-react'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Đóng modal khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sections = [
    {
      num: '1',
      title: 'Mục đích và phạm vi thu thập thông tin',
      content: 'Để phục vụ quá trình đăng ký khóa học, mua tài liệu và tối ưu hóa trải nghiệm dịch vụ trên website, Inspiring HR có thể yêu cầu bạn cung cấp một số thông tin cá nhân cụ thể, bao gồm nhưng không giới hạn:',
      items: [
        { label: 'Thông tin cá nhân', desc: 'Họ và tên, số điện thoại, địa chỉ email.' },
        { label: 'Thông tin công việc', desc: 'Tên doanh nghiệp đang công tác, chức vụ/vị trí làm việc.' },
        { label: 'Thông tin giao dịch', desc: 'Địa chỉ nhận tài liệu và dữ liệu thanh toán.' },
      ]
    },
    {
      num: '2',
      title: 'Phạm vi sử dụng thông tin',
      content: 'Mọi thông tin cá nhân thu thập được sẽ chỉ được lưu hành nội bộ và sử dụng cho các mục đích: xác minh danh tính, hỗ trợ học viên, xử lý đơn hàng, gửi thông tin cập nhật (chỉ khi có sự đồng ý).',
    },
    {
      num: '3',
      title: 'Thời gian lưu trữ dữ liệu',
      content: 'Dữ liệu được lưu trữ an toàn vô thời hạn để đảm bảo quyền lợi học viên, chỉ xóa khi có yêu cầu từ khách hàng.',
    },
    {
      num: '4',
      title: 'Những cá nhân/tổ chức được phép tiếp cận thông tin',
      content: 'Chúng tôi cam kết không chia sẻ thông tin cho bên thứ ba vì mục đích thương mại, ngoại trừ đội ngũ nội bộ, đối tác vận chuyển và cơ quan nhà nước theo quy định pháp luật.',
    },
    {
      num: '5',
      title: 'Cơ chế bảo mật và Trách nhiệm của khách hàng',
      content: 'Inspiring HR áp dụng các biện pháp kỹ thuật để bảo vệ dữ liệu. Khách hàng có trách nhiệm bảo mật tài khoản cá nhân.',
    },
    {
      num: '6',
      title: 'Quyền lợi và Phương thức điều chỉnh dữ liệu',
      content: 'Bạn có quyền kiểm tra, cập nhật hoặc yêu cầu xóa thông tin bằng cách đăng nhập tài khoản hoặc liên hệ trực tiếp.',
    },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Chính sách bảo mật thông tin"
        className="fixed inset-4 md:inset-8 lg:inset-12 z-[9999] bg-white rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 fade-in duration-300 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 md:px-12 py-6 md:py-8 bg-gradient-to-r from-[#103C11] to-[#1a5c1b] shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#C7A959]/20 rounded-2xl flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-[#C7A959]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                CHÍNH SÁCH BẢO MẬT THÔNG TIN
              </h2>
              <p className="text-white/60 text-xs md:text-sm font-medium mt-0.5">Công ty TNHH Inspiring HR</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng modal"
            className="w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-200 shrink-0 ml-4"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8 md:py-10 space-y-8">
          
          {/* Intro */}
          <div className="bg-[#103C11]/5 border border-[#103C11]/10 rounded-2xl p-6 md:p-8">
            <p className="text-[#103C11] text-base md:text-lg leading-[1.8] font-medium">
              Chào mừng bạn đến với hệ thống của Inspiring HR. Chúng tôi tôn trọng và cam kết bảo vệ quyền riêng tư cũng như an toàn thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi tiếp nhận, sử dụng và bảo mật thông tin được cung cấp từ phía học viên và đối tác khách hàng.
            </p>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.num} className="space-y-4">
              <h3 className="text-lg md:text-xl font-black text-[#103C11] flex items-center gap-3">
                <span className="w-8 h-8 bg-[#C7A959] text-white rounded-lg flex items-center justify-center text-sm font-black shrink-0">
                  {section.num}
                </span>
                {section.title}
              </h3>
              <p className="text-slate-600 leading-[1.8] font-medium text-sm md:text-base pl-11">
                {section.content}
              </p>
              {section.items && (
                <ul className="pl-11 space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm md:text-base text-slate-600 leading-[1.8]">
                      <span className="text-[#C7A959] font-black shrink-0">•</span>
                      <span><strong className="text-[#103C11] font-bold">{item.label}:</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Section 7 - Liên hệ */}
          <div className="bg-[#103C11] rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-3">
              <span className="w-8 h-8 bg-[#C7A959] text-white rounded-lg flex items-center justify-center text-sm font-black shrink-0">7</span>
              Thông tin liên hệ
            </h3>
            <div className="pl-11 space-y-3">
              <p className="font-black text-[#C7A959] text-base md:text-lg uppercase tracking-wide">Công ty TNHH Inspiring HR</p>
              <div className="flex items-start gap-3 text-white/85 text-sm md:text-base">
                <MapPin className="w-5 h-5 text-[#C7A959] shrink-0 mt-0.5" />
                <span>114/2K hẻm 222 đường Trường Chinh, P. Đông Hưng Thuận, TP. HCM</span>
              </div>
              <div className="flex items-center gap-3 text-white/85 text-sm md:text-base">
                <Phone className="w-5 h-5 text-[#C7A959] shrink-0" />
                <span>Hotline/Zalo: <strong className="text-white">0915 099 642</strong></span>
              </div>
              <div className="flex items-center gap-3 text-white/85 text-sm md:text-base">
                <Mail className="w-5 h-5 text-[#C7A959] shrink-0" />
                <span>Email: <strong className="text-white">inspiringhr.daotaonhansu@gmail.com</strong></span>
              </div>
            </div>
          </div>

          {/* Bottom padding for comfortable scrolling */}
          <div className="h-4" />
        </div>

        {/* Footer */}
        <div className="px-8 md:px-12 py-5 border-t border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/80">
          <p className="text-xs text-slate-400 font-medium">© {new Date().getFullYear()} Inspiring HR. Mọi quyền được bảo lưu.</p>
          <button
            onClick={onClose}
            className="bg-[#103C11] hover:bg-[#1a5c1b] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Đã hiểu, Đóng lại
          </button>
        </div>
      </div>
    </>
  )
}
