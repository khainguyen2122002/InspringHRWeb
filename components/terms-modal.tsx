'use client'

import { useEffect, useRef } from 'react'
import { X, FileText, MapPin, Phone, Mail } from 'lucide-react'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

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
      title: 'Quy định về tài khoản và quyền truy cập',
      items: [
        { label: 'Tính chính xác', desc: 'Khách hàng có trách nhiệm cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký tài khoản hoặc sử dụng dịch vụ tại Inspiring HR.' },
        { label: 'Bảo mật tài khoản', desc: 'Học viên có trách nhiệm tự bảo quản mật khẩu và tài khoản cá nhân của mình. Mọi hoạt động diễn ra dưới tài khoản của bạn sẽ thuộc trách nhiệm pháp lý của chính bạn.' },
        { label: 'Quy định chống chia sẻ tài khoản', desc: 'Tài khoản học tập (cho các khóa học trực tuyến/tài nguyên số) được cấp riêng cho từng cá nhân. Inspiring HR nghiêm cấm mọi hình thức chung vốn, chia sẻ, chuyển nhượng hoặc bán lại tài khoản cho người khác. Nếu phát hiện vi phạm, chúng tôi có quyền khóa tài khoản vĩnh viễn mà không hoàn trả học phí.' },
      ],
    },
    {
      num: '2',
      title: 'Quyền sở hữu trí tuệ và bảo hộ bản quyền',
      items: [
        { label: 'Sở hữu tài nguyên', desc: 'Toàn bộ nội dung bài giảng, video khóa học, hình ảnh, tài liệu điện tử, giáo trình và đặc biệt là hệ thống biểu mẫu quản trị độc quyền hiển thị trên hệ thống đều thuộc quyền sở hữu trí tuệ duy nhất của Inspiring HR.' },
        { label: 'Giới hạn sử dụng', desc: 'Học viên chỉ được quyền sử dụng các tài nguyên này phục vụ cho mục đích học tập cá nhân và áp dụng trực tiếp vào công việc của doanh nghiệp mình.' },
        { label: 'Hành vi nghiêm cấm', desc: 'Tuyệt đối không được sao chép, ghi hình/ghi âm bài giảng, phát tán tài liệu ra ngoài mạng xã hội, hoặc sử dụng các tài nguyên của Inspiring HR để thương mại hóa (như mở lớp giảng dạy lại, bán lại tài liệu) khi chưa có sự đồng ý bằng văn bản từ chúng tôi.' },
      ],
    },
    {
      num: '3',
      title: 'Quy định về học phí và thanh toán',
      items: [
        { label: 'Giá dịch vụ', desc: 'Học phí các khóa học và giá tài liệu được niêm yết công khai trên website. Giá này có thể thay đổi tùy từng thời điểm áp dụng chương trình ưu đãi mà không cần báo trước.' },
        { label: 'Xác nhận thanh toán', desc: 'Giao dịch thanh toán chỉ được coi là hoàn tất khi hệ thống của Inspiring HR nhận được đúng và đủ số tiền theo hóa đơn/đơn đặt hàng.' },
        {
          label: 'Chính sách hoàn tiền và bảo lưu',
          desc: 'Học phí sẽ không được hoàn lại sau khi khóa học đã khai giảng hoặc tài liệu số đã được cấp quyền truy cập.',
          sub: 'Học viên có nhu cầu bảo lưu khóa học cần gửi yêu cầu bằng văn bản/email cho bộ phận CSKH trước ngày khai giảng tối thiểu 03 ngày làm việc. Thời gian bảo lưu tối đa là 06 tháng kể từ ngày duyệt yêu cầu.',
        },
      ],
    },
    {
      num: '4',
      title: 'Trách nhiệm của học viên khi tham gia khóa học',
      bullets: [
        'Tuân thủ đầy đủ nội quy lớp học (đối với cả hình thức Online lẫn Offline).',
        'Tôn trọng giảng viên, chuyên gia và các học viên khác; không có các hành vi gây rối, làm ảnh hưởng đến chất lượng chung của lớp học.',
        'Nghiêm cấm phát ngôn xúc phạm, bôi nhọ, hoặc lan truyền các thông tin sai sự thật về trung tâm hoặc các thành viên khác trên các kênh truyền thông chung của lớp học.',
      ],
    },
    {
      num: '5',
      title: 'Giới hạn trách nhiệm của Inspiring HR',
      bullets: [
        'Inspiring HR cam kết cung cấp kiến thức, phương pháp và công cụ quản trị thực chiến tối ưu nhất. Tuy nhiên, kết quả áp dụng thực tế hoàn toàn phụ thuộc vào năng lực triển khai, sự chủ động của học viên và thực trạng nội tại của từng doanh nghiệp.',
        'Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại kinh tế trực tiếp hoặc gián tiếp nào phát sinh từ việc học viên tự vận hành, áp dụng sai lệch kiến thức được học vào thực tế tổ chức của mình.',
      ],
    },
    {
      num: '6',
      title: 'Sửa đổi điều khoản',
      content:
        'Inspiring HR giữ quyền thay đổi, bổ sung hoặc loại bỏ bất kỳ nội dung nào của bản Điều khoản dịch vụ này vào bất kỳ lúc nào để phù hợp với định hướng hoạt động và quy định pháp luật. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải chính thức trên website.',
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
        aria-label="Điều khoản dịch vụ"
        className="fixed inset-4 md:inset-8 lg:inset-12 z-[9999] bg-white rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 fade-in duration-300 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 md:px-12 py-6 md:py-8 bg-gradient-to-r from-[#103C11] to-[#1a5c1b] shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#C7A959]/20 rounded-2xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-[#C7A959]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                ĐIỀU KHOẢN DỊCH VỤ
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
              Chào mừng bạn đến với Inspiring HR. Khi bạn truy cập vào website, đăng ký tài khoản, sử dụng tài liệu hoặc tham gia các khóa học của chúng tôi, đồng nghĩa với việc bạn đã đọc, hiểu và tự nguyện tuân thủ các điều khoản được quy định dưới đây.
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

              {/* Content text */}
              {section.content && (
                <p className="text-slate-600 leading-[1.8] font-medium text-sm md:text-base pl-11">
                  {section.content}
                </p>
              )}

              {/* Key-value items */}
              {section.items && (
                <ul className="pl-11 space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm md:text-base text-slate-600 leading-[1.8]">
                      <div className="flex gap-2">
                        <span className="text-[#C7A959] font-black shrink-0 mt-0.5">•</span>
                        <div>
                          <strong className="text-[#103C11] font-bold">{item.label}:</strong>{' '}
                          {item.desc}
                          {(item as any).sub && (
                            <div className="mt-2 pl-4 border-l-2 border-[#C7A959]/40 text-slate-500 italic">
                              {(item as any).sub}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Bullet-only items */}
              {section.bullets && (
                <ul className="pl-11 space-y-3">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-sm md:text-base text-slate-600 leading-[1.8]">
                      <span className="text-[#C7A959] font-black shrink-0 mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Bottom padding */}
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
