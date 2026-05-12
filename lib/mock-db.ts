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
          id: '1',
          title: 'Nghề Nhân Sự Tổng Hợp (All-in-one)',
          category: 'Kỹ Năng Nhân Sự',
          price: 5500000,
          sessions: '12 Buổi',
          level: 'Cơ bản - Nâng cao',
          image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
          views: 1250,
          description: 'Khóa học cung cấp kiến thức toàn diện về quản trị nhân sự hiện đại, từ tuyển dụng, đào tạo đến C&B và quan hệ lao động.'
        },
        {
          id: '2',
          title: 'Quản trị Tiền lương & Phúc lợi (C&B) Chuyên sâu',
          category: 'C&B',
          price: 4800000,
          sessions: '10 Buổi',
          level: 'Nâng cao',
          image_url: 'https://images.unsplash.com/photo-1454165833767-027ffea36c1e?q=80&w=2070&auto=format&fit=crop',
          views: 840,
          description: 'Học cách xây dựng hệ thống lương thưởng, bảo hiểm và các chính sách nhân sự giúp thu hút và giữ chân nhân tài.'
        },
        {
          id: '3',
          title: 'Kỹ năng Phỏng vấn & Tuyển dụng Thành công',
          category: 'Tuyển dụng',
          price: 3500000,
          sessions: '6 Buổi',
          level: 'Cơ bản',
          image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop',
          views: 2100,
          description: 'Nắm vững các bộ câu hỏi phỏng vấn hành vi và kỹ năng đánh giá ứng viên chuẩn xác nhất.'
        },
        {
          id: '4',
          title: 'Xây dựng Văn hóa Doanh nghiệp Thực chiến',
          category: 'Văn hóa',
          price: 6200000,
          sessions: '8 Buổi',
          level: 'Chiến lược',
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
          views: 560,
          description: 'Lộ trình từng bước để định hình và lan tỏa giá trị cốt lõi, gắn kết đội ngũ một cách tự nhiên.'
        }
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
          desc: 'Cập nhật những thay đổi mới nhất trong ngành nhân sự và cách doanh nghiệp thích nghi với kỷ nguyên số.',
          views: 1540,
          content: 'Nội dung chi tiết bài viết về xu hướng 2024...'
        },
        { 
          id: '2', 
          title: 'Kỹ năng giữ chân nhân tài trong thời kỳ suy thoái kinh tế', 
          date: '12/05/2024', 
          type: 'Sự Kiện', 
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
          desc: 'Làm thế nào để duy trì động lực làm việc khi ngân sách phúc lợi bị cắt giảm?',
          views: 890,
          content: 'Nội dung chi tiết...'
        },
        { 
          id: '3', 
          title: 'Workshop: Xây dựng lộ trình phát triển nghề nghiệp cho HR', 
          date: '10/05/2024', 
          type: 'Hội Thảo', 
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
          desc: 'Buổi chia sẻ kinh nghiệm từ các CHRO hàng đầu về con đường thăng tiến trong nghề nhân sự.',
          views: 2105,
          content: 'Nội dung chi tiết...'
        },
        { 
          id: '4', 
          title: 'Tầm quan trọng của Trí tuệ nhân tạo (AI) trong Tuyển dụng', 
          date: '08/05/2024', 
          type: 'Tin Tức', 
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
          desc: 'AI đang thay đổi cách chúng ta lọc hồ sơ và phỏng vấn ứng viên như thế nào?',
          views: 3420,
          content: 'Nội dung chi tiết...'
        },
        { 
          id: '5', 
          title: 'Bí quyết xây dựng thương hiệu cá nhân cho người làm HR', 
          date: '05/05/2024', 
          type: 'Kiến Thức', 
          image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
          desc: 'Tại sao người làm HR cần có thương hiệu cá nhân mạnh mẽ trên mạng xã hội?',
          views: 1230,
          content: 'Nội dung chi tiết...'
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
