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
      const defaults: Course[] = []
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
