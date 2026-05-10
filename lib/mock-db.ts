// Mock Database using LocalStorage for Persistence
import { Course } from '@/types'

const COURSES_KEY = 'ih_courses_data'
const NEWS_KEY = 'ih_news_data'
const INQUIRIES_KEY = 'ih_inquiries_data'

export const mockDb = {
  // --- COURSES ---
  getCourses: (): Course[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(COURSES_KEY)
    if (!data) {
      // Default sample data
      const defaults: Course[] = [
        {
          id: '1',
          slug: 'nghe-nhan-su-chuyen-nghiep',
          title: 'Nghề Nhân sự Chuyên nghiệp (Professional HR)',
          description: 'Lộ trình từ A-Z dành cho người mới hoặc muốn hệ thống lại kiến thức quản trị nhân sự tổng thể.',
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
          category: 'Chuyên Sâu',
          level: 'Offline',
          sessions: '24 buổi',
          schedule: '19h30 - 21h30, Thứ 2-4-6',
          commencement: 'Tháng 08/2026',
          price: 3500000,
          original_price: 3600000,
          instructor_name: 'Ms. Trần Thị Hồng Nhung',
          instructor_role: 'Founder & CEO Inspiring HR',
          target_audience: 'Sinh viên năm cuối, Người mới bắt đầu với nghề HR, Chuyên viên HR muốn hệ thống lại kiến thức.',
          benefits: [
            'Nắm vững toàn bộ quy trình vận hành phòng Nhân sự',
            'Thành thạo kỹ năng tuyển dụng và sàng lọc ứng viên',
            'Hiểu sâu về Luật lao động và các tình huống thực tế',
            'Xây dựng tư duy quản trị nhân sự hiện đại'
          ],
          special_benefits: 'Tặng bộ biểu mẫu HR thực chiến + Hỗ trợ giải đáp 1:1 sau khóa học.',
          content: 'Khóa học cung cấp cái nhìn toàn cảnh về nghề nhân sự, từ khâu hoạch định, tuyển dụng đến quản trị và phát triển con người.',
          curriculum: [
            { title: 'Phần 1: Tổng quan về Quản trị Nhân sự', lessons: ['Vai trò của HR trong doanh nghiệp', 'Cơ cấu tổ chức và bản mô tả công việc'] },
            { title: 'Phần 2: Tuyển dụng & Thu hút nhân tài', lessons: ['Kế hoạch tuyển dụng', 'Kỹ năng phỏng vấn hành vi BEI'] },
            { title: 'Phần 3: Quản trị Hiệu suất & Đào tạo', lessons: ['Thiết lập KPI/OKR', 'Quy trình đào tạo nội bộ'] }
          ],
          status: 'Sắp khai giảng',
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as any,
        {
          id: '2',
          slug: 'nghiep-vu-luong-phuc-loi-cb',
          title: 'Nghiệp vụ Lương & Phúc lợi (C&B Master)',
          description: 'Làm chủ bảng lương, bảo hiểm xã hội, thuế TNCN và các chính sách đãi ngộ hiện đại.',
          image_url: 'https://images.unsplash.com/photo-1454165833767-131ef24896b3?q=80&w=2070&auto=format&fit=crop',
          category: 'Kỹ Năng',
          level: 'Online/Offline',
          sessions: '16 buổi',
          schedule: '19h30 - 21h30, Thứ 3-5',
          commencement: 'Tháng 09/2026',
          price: 4500000,
          original_price: 4800000,
          instructor_name: 'Ms. Trần Thị Hồng Nhung',
          instructor_role: 'Chuyên gia C&B thực chiến',
          target_audience: 'Chuyên viên Nhân sự, Kế toán muốn chuyển sang mảng C&B.',
          benefits: [
            'Thành thạo tính lương trên Excel/Phần mềm',
            'Kê khai BHXH, Thuế TNCN thành thạo',
            'Xây dựng chính sách phúc lợi cạnh tranh'
          ],
          special_benefits: 'Tặng file Excel tính lương mẫu + Update luật mới 1 năm.',
          content: 'Khóa học tập trung vào kỹ năng thực hành tính toán và tuân thủ pháp luật lao động trong quản lý lương.',
          curriculum: [
            { title: 'Chương 1: Tiền lương và các khoản trích theo lương', lessons: ['Cơ cấu thu nhập', 'Cách tính lương sản phẩm, lương thời gian'] },
            { title: 'Chương 2: Bảo hiểm xã hội & Thuế', lessons: ['Quy trình kê khai BHXH', 'Quyết toán thuế TNCN'] }
          ],
          status: 'Sắp khai giảng',
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
  }
}
