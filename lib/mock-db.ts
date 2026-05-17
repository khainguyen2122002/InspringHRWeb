// Mock Database using LocalStorage for Persistence
import { Course } from '@/types'

const COURSES_KEY = 'ih_courses_data_v2'
const NEWS_KEY = 'ih_news_data_v2'
const INQUIRIES_KEY = 'ih_inquiries_data'
const GALLERY_KEY = 'ih_gallery_data_v2'

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
          description: 'Khóa học cung cấp kiến thức toàn diện về quản trị nhân sự hiện đại, từ tuyển dụng, đào tạo đến C&B và quan hệ lao động.',
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Quản trị Tiền lương & Phúc lợi (C&B) Chuyên sâu',
          category: 'C&B',
          price: 4800000,
          sessions: '10 Buổi',
          level: 'Nâng cao',
          image_url: 'https://images.unsplash.com/photo-1454165833767-027eeea15539?q=80&w=2070&auto=format&fit=crop',
          views: 840,
          description: 'Học cách xây dựng hệ thống lương thưởng, bảo hiểm và các chính sách nhân sự giúp thu hút và giữ chân nhân tài.',
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
          description: 'Nắm vững các bộ câu hỏi phỏng vấn hành vi và kỹ năng đánh giá ứng viên chuẩn xác nhất.',
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
          description: 'Lộ trình từng bước để định hình và lan tỏa giá trị cốt lõi, gắn kết đội ngũ một cách tự nhiên.',
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
          title: 'Báo cáo Xu hướng Quản trị Nhân sự & AI Thực chiến 2026', 
          date: '15/05/2026', 
          type: 'Tin Tức', 
          author: 'Chuyên gia Hồng Nhung',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
          desc: 'Cập nhật toàn diện những biến chuyển của ngành quản trị nhân sự khi Trí tuệ nhân tạo (AI) định hình lại quy trình tuyển dụng và đánh giá năng lực.',
          views: 1850,
          content: 'Nội dung chi tiết bài viết báo cáo xu hướng quản trị nhân sự 2026...'
        },
        { 
          id: '2', 
          title: 'Chiến lược giữ chân nhân tài và xây dựng gói phúc lợi linh hoạt', 
          date: '12/05/2026', 
          type: 'Sự Kiện', 
          author: 'Inspiring HR',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
          desc: 'Giải pháp thiết kế hệ thống C&B và các chính sách đãi ngộ phi tài chính giúp gắn kết nhân viên sâu sắc trong thời đại mới.',
          views: 940,
          content: 'Nội dung chi tiết...'
        },
        { 
          id: '3', 
          title: 'Workshop: Xây dựng lộ trình thăng tiến và định hướng nghề HR', 
          date: '10/05/2026', 
          type: 'Hội Thảo', 
          author: 'Ban Đào tạo',
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
          desc: 'Buổi đối thoại trực tiếp cùng các CHRO hàng đầu về bí quyết bứt phá từ Chuyên viên lên vị trí Giám đốc Nhân sự.',
          views: 2310,
          content: 'Nội dung chi tiết...'
        },
        { 
          id: '4', 
          title: 'Ứng dụng OKRs và KPIs trong đánh giá hiệu suất nhân sự', 
          date: '08/05/2026', 
          type: 'Kiến Thức', 
          author: 'Inspiring HR',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
          desc: 'Phương pháp kết hợp OKRs truyền cảm hứng với bộ chỉ số KPIs cốt lõi để thúc đẩy năng suất doanh nghiệp vượt trội.',
          views: 3560,
          content: 'Nội dung chi tiết...'
        },
        { 
          id: '5', 
          title: 'Bí quyết xây dựng thương hiệu nhà tuyển dụng (Employer Branding)', 
          date: '05/05/2026', 
          type: 'Tin Tức', 
          author: 'Ban Truyền thông',
          image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
          desc: 'Tại sao việc định vị văn hóa doanh nghiệp lại đóng vai trò quyết định trong việc thu hút thế hệ nhân tài trẻ?',
          views: 1420,
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
      news.unshift({ 
        ...item, 
        id: Math.random().toString(36).substr(2, 9),
        author: item.author || 'Quản trị viên',
        views: item.views || 120,
        date: item.date || new Date().toLocaleDateString('vi-VN')
      })
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
          image: '/images/gallery/nhung-stage-1.png',
          caption: 'Chuyên gia Trần Thị Hồng Nhung chia sẻ hành trình định hướng nghề Nhân sự',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          image: '/images/gallery/nhung-stage-2.png',
          caption: 'Phân tích 07 kỹ năng mềm quan trọng nhất để chinh phục nhà tuyển dụng',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          image: '/images/gallery/nhung-flowers.png',
          caption: 'Tri ân đội ngũ Diễn giả & Giảng viên đồng hành cùng Inspiring HR',
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          image: '/images/gallery/ceremony.png',
          caption: 'Lễ trao chứng chỉ tốt nghiệp khóa Quản trị Nhân sự Chuyên nghiệp',
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          image: '/images/gallery/classroom.png',
          caption: 'Khoảnh khắc gắn kết tuyệt vời giữa giảng viên và học viên sau khóa học',
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
