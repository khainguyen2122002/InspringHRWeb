// Mock Database using LocalStorage for Persistence
import { Course } from '@/types'

const COURSES_KEY = 'ih_courses_data'
const NEWS_KEY = 'ih_news_data'
const INQUIRIES_KEY = 'ih_inquiries_data'
const GALLERY_KEY = 'ih_gallery_data'

export const mockDb = {
  // --- COURSES ---
  getCourses: (): Course[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(COURSES_KEY)
    if (!data) {
      // Default sample data
      const defaults: Course[] = [
        {
          id: 'nghe-nhan-su-chuyen-nghiep',
          slug: 'nghe-nhan-su-chuyen-nghiep',
          title: 'Nghề Nhân sự Chuyên nghiệp (Professional HR)',
          description: 'Lộ trình bài bản từ A-Z dành cho người mới hoặc chuyên viên muốn hệ thống lại kiến thức quản trị nhân sự thực chiến.',
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
          category: 'Chuyên Sâu',
          level: 'Online',
          sessions: '24 Buổi',
          schedule: '19h30 - 21h30, Thứ 2-4-6',
          commencement: 'Tháng 08/2026',
          price: 3500000,
          original_price: 3600000,
          instructor_name: 'Ms. Trần Thị Hồng Nhung',
          instructor_role: 'Founder & CEO Inspiring HR',
          target_audience: 'Lộ trình thực chiến từ A-Z dành cho người mới và chuyên viên HR',
          benefits: [
            'Nắm vững kiến thức 6 mảng nhân sự cốt lõi.',
            'Sở hữu bộ tài liệu, biểu mẫu thực chiến 15 năm kinh nghiệm.',
            'Thực hành lập thang bảng lương, chính sách đãi ngộ chuyên nghiệp.',
            'Kỹ năng xử lý tranh chấp lao động và quan hệ nhân sự khéo léo.',
            'Nhận chứng chỉ hoàn thành khóa học từ Inspiring HR.',
            'Hỗ trợ tư vấn chuyên môn trọn đời sau khóa học.'
          ],
          special_benefits: '',
          content: 'Khóa học cung cấp cái nhìn toàn cảnh về nghề nhân sự, từ khâu hoạch định, tuyển dụng đến quản trị và phát triển con người.',
          curriculum: [
            { title: 'Phần 1: Tổng quan Quản trị Nhân sự Hiện đại', lessons: ['Vai trò HR trong doanh nghiệp', 'Cấu trúc bộ máy HR chuyên nghiệp', 'Quy trình vận hành nhân sự chuẩn'] },
            { title: 'Phần 2: Tuyển dụng & Thu hút Nhân tài', lessons: ['Thiết kế JD và thương hiệu tuyển dụng', 'Kỹ năng phỏng vấn hành vi BEI', 'Quy trình Onboarding hiệu quả'] },
            { title: 'Phần 3: Đào tạo & Phát triển', lessons: ['Phân tích nhu cầu đào tạo (TNA)', 'Thiết kế chương trình đào tạo nội bộ', 'Đo lường hiệu quả đào tạo (ROI)'] },
            { title: 'Phần 4: Quản trị Hiệu suất (Performance)', lessons: ['Xây dựng hệ thống KPI/OKR', 'Quy trình đánh giá nhân sự công bằng', 'Kế hoạch cải thiện hiệu suất (PIP)'] },
            { title: 'Phần 5: Lương & Phúc lợi (C&B)', lessons: ['Xây dựng thang bảng lương 3P', 'Bảo hiểm xã hội & Thuế TNCN', 'Chính sách đãi ngộ & Phúc lợi sáng tạo'] },
            { title: 'Phần 6: Pháp luật Lao động & Quan hệ nhân sự', lessons: ['Soạn thảo hợp đồng & Nội quy', 'Kỹ năng xử lý kỷ luật lao động', 'Xây dựng văn hóa doanh nghiệp gắn kết'] }
          ],
          status: 'Sắp khai giảng',
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any,
        {
          id: 'nghiep-vu-luong-phuc-loi-cb',
          slug: 'nghiep-vu-luong-phuc-loi-cb',
          title: 'Nghiệp vụ Lương & Phúc lợi (C&B Master)',
          description: 'Làm chủ bảng lương, bảo hiểm xã hội, thuế TNCN và các chính sách đãi ngộ chuyên sâu dành cho doanh nghiệp.',
          image_url: 'https://images.unsplash.com/photo-1454165833767-131ef24896b3?q=80&w=2070&auto=format&fit=crop',
          category: 'Kỹ Năng',
          level: 'Online/Offline',
          sessions: '16 buổi',
          schedule: '19h30 - 21h30',
          commencement: 'Tháng 09/2026',
          price: 4500000,
          original_price: 4800000,
          instructor_name: 'Ms. Trần Thị Hồng Nhung',
          instructor_role: 'Founder & CEO Inspiring HR',
          target_audience: 'Người muốn nâng cao nghiệp vụ C&B.',
          benefits: ['Thành thạo tính lương, BHXH, thuế TNCN.', 'Thiết kế chính sách đãi ngộ hấp dẫn.'],
          special_benefits: '',
          content: 'Làm chủ bảng lương, bảo hiểm xã hội, thuế TNCN và các chính sách đãi ngộ chuyên sâu dành cho doanh nghiệp.',
          curriculum: [],
          status: 'Đang tuyển sinh',
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any,
        {
          id: 'phap-ly-lao-dong',
          slug: 'phap-ly-lao-dong',
          title: 'Pháp lý Lao động & Xử lý Kỷ luật (HR Legal)',
          description: 'Nắm vững luật lao động hiện hành, cách soạn thảo hợp đồng, nội quy và xử lý khôn khéo các tranh chấp lao động.',
          image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop',
          category: 'Kỹ Năng',
          level: 'Online/Offline',
          sessions: '8 buổi',
          schedule: 'Linh hoạt',
          commencement: 'Tháng 10/2026',
          price: 2500000,
          original_price: 3000000,
          instructor_name: 'Ms. Trần Thị Hồng Nhung',
          instructor_role: 'Founder & CEO Inspiring HR',
          target_audience: 'Chuyên viên nhân sự cần nắm vững pháp lý.',
          benefits: ['Hiểu rõ Luật Lao động', 'Xử lý tranh chấp hiệu quả'],
          special_benefits: '',
          content: 'Nắm vững luật lao động hiện hành, cách soạn thảo hợp đồng, nội quy và xử lý khôn khéo các tranh chấp lao động.',
          curriculum: [],
          status: 'Đang tuyển sinh',
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any,
        {
          id: 'xay-dung-thang-bang-luong',
          slug: 'xay-dung-thang-bang-luong',
          title: 'Xây dựng Thang bảng lương chuẩn mực',
          description: 'Trang bị kỹ năng thiết lập cấu trúc lương, thưởng theo phương pháp hiện đại, giúp doanh nghiệp tối ưu chi phí và giữ chân nhân tài.',
          image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2071&auto=format&fit=crop',
          category: 'Chuyên Sâu',
          level: 'Offline',
          sessions: '12 buổi',
          schedule: 'Linh hoạt',
          commencement: 'Tháng 11/2026',
          price: 5500000,
          original_price: 6000000,
          instructor_name: 'Ms. Trần Thị Hồng Nhung',
          instructor_role: 'Founder & CEO Inspiring HR',
          target_audience: 'Quản lý, Trưởng phòng nhân sự.',
          benefits: ['Xây dựng được hệ thống lương 3P', 'Tối ưu hóa chi phí nhân sự'],
          special_benefits: '',
          content: 'Trang bị kỹ năng thiết lập cấu trúc lương, thưởng theo phương pháp hiện đại, giúp doanh nghiệp tối ưu chi phí và giữ chân nhân tài.',
          curriculum: [],
          status: 'Sắp khai giảng',
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any,
        {
          id: 'quan-tri-hieu-suat-kpi-okr',
          slug: 'quan-tri-hieu-suat-kpi-okr',
          title: 'Quản trị Hiệu suất (KPI/OKR Master)',
          description: 'Thấu hiểu cách thiết lập mục tiêu, xây dựng hệ thống đánh giá năng lực và gắn kết hiệu suất cá nhân với mục tiêu doanh nghiệp.',
          image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
          category: 'Chuyên Sâu',
          level: 'Online',
          sessions: '10 buổi',
          schedule: 'Linh hoạt',
          commencement: 'Tháng 08/2026',
          price: 3800000,
          original_price: 4500000,
          instructor_name: 'Ms. Trần Thị Hồng Nhung',
          instructor_role: 'Founder & CEO Inspiring HR',
          target_audience: 'Quản lý các cấp, Trưởng phòng nhân sự.',
          benefits: ['Triển khai hệ thống KPI/OKR', 'Đánh giá năng lực nhân sự chính xác'],
          special_benefits: '',
          content: 'Thấu hiểu cách thiết lập mục tiêu, xây dựng hệ thống đánh giá năng lực và gắn kết hiệu suất cá nhân với mục tiêu doanh nghiệp.',
          curriculum: [],
          status: 'Đang tuyển sinh',
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any
      ]
      localStorage.setItem(COURSES_KEY, JSON.stringify(defaults))
      return defaults
    }
    return JSON.parse(data)
  },

  saveCourse: (course: Course) => {
    const courses = mockDb.getCourses()
    const index = courses.findIndex(c => c.id === course.id)
    if (index > -1) {
      courses[index] = course
    } else {
      courses.push({ ...course, id: Math.random().toString(36).substr(2, 9) })
    }
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses))
  },

  deleteCourse: (id: string) => {
    const courses = mockDb.getCourses().filter(c => c.id !== id)
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses))
  },

  // --- NEWS ---
  getNews: (): any[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(NEWS_KEY)
    if (!data) {
      const defaults = [
        { 
          id: '1', 
          title: 'Xu hướng Quản trị Nhân sự 2024: Cơ hội và Thách thức', 
          date: '15/05/2024', 
          type: 'Tin Tức', 
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
          desc: 'Cập nhật những thay đổi mới nhất trong ngành nhân sự...',
          content: 'Nội dung chi tiết bài viết về xu hướng 2024...'
        }
      ]
      localStorage.setItem(NEWS_KEY, JSON.stringify(defaults))
      return defaults
    }
    return JSON.parse(data)
  },

  saveNews: (item: any) => {
    const news = mockDb.getNews()
    const index = news.findIndex(n => n.id === item.id)
    if (index > -1) {
      news[index] = item
    } else {
      news.push({ ...item, id: Math.random().toString(36).substr(2, 9) })
    }
    localStorage.setItem(NEWS_KEY, JSON.stringify(news))
  },

  deleteNews: (id: string) => {
    const news = mockDb.getNews().filter(n => n.id !== id)
    localStorage.setItem(NEWS_KEY, JSON.stringify(news))
  },

  // --- INQUIRIES (Contact & Registration) ---
  getInquiries: (): any[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(INQUIRIES_KEY)
    return data ? JSON.parse(data) : []
  },

  saveInquiry: (inquiry: any) => {
    const inquiries = mockDb.getInquiries()
    inquiries.push({ 
      ...inquiry, 
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString('vi-VN')
    })
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries))
  },

  deleteInquiry: (id: string) => {
    const inquiries = mockDb.getInquiries().filter(i => i.id !== id)
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries))
  },

  // --- GALLERY ---
  getGallery: (): any[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(GALLERY_KEY)
    if (!data) {
      const defaults = [
        {
          id: '1',
          image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
          caption: 'Không khí sôi nổi tại lớp học Nghề Nhân Sự',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
          caption: 'Học viên nhận chứng chỉ tốt nghiệp xuất sắc',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
          caption: 'Làm việc nhóm và giải quyết Case Study thực tế',
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
          caption: 'Workshop chuyên sâu về xây dựng văn hóa doanh nghiệp',
          created_at: new Date().toISOString()
        }
      ]
      localStorage.setItem(GALLERY_KEY, JSON.stringify(defaults))
      return defaults
    }
    return JSON.parse(data)
  },

  saveGallery: (item: any) => {
    const gallery = mockDb.getGallery()
    const index = gallery.findIndex(g => g.id === item.id)
    if (index > -1) {
      gallery[index] = { ...gallery[index], ...item }
    } else {
      gallery.unshift({ 
        ...item, 
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      })
    }
    localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery))
  },

  deleteGallery: (id: string) => {
    const gallery = mockDb.getGallery().filter(g => g.id !== id)
    localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery))
  }
}
