export type CenterInfo = {
  id: string
  name: string
  slogan: string | null
  description: string
  address: string
  phone: string
  email: string
  zalo_url: string | null
  facebook_url: string | null
  logo_url: string | null
  banner_url: string | null
  map_url: string | null
  stats_courses: number
  stats_students: number
  stats_rating: number
  show_stats: boolean
  hero_badge_text: string
  cta_primary_text: string
  cta_secondary_text: string
  cta_secondary_url: string
  community_title: string
  community_text: string
  international_title: string
  international_text: string
  updated_at: string
}

export interface Course {
  id: string
  slug?: string
  title: string
  description: string // Mô tả ngắn
  image_url: string
  category: string
  level: string // Hình thức học
  sessions: string // Số buổi
  schedule?: string // Lịch học (19h30 - 21h30, Thứ 2,4,6)
  commencement?: string // Khai giảng
  price: number // Học phí ưu đãi
  original_price?: number // Học phí gốc
  instructor_name?: string
  instructor_role?: string
  target_audience?: string // Đối tượng phù hợp
  benefits?: string[] // Lợi ích sau khóa học
  special_benefits?: string // Quyền lợi đặc biệt
  content?: string // Nội dung chi tiết (Markdown hoặc HTML)
  curriculum?: Array<{
    title: string
    lessons: string[]
  }>
  status?: 'Sắp khai giảng' | 'Đang diễn ra' | 'Đã kết thúc'
  external_form_url?: string
  is_featured: boolean
  display_order?: number
  views: number
  created_at: string
  updated_at: string
}

export type Contact = {
  id: string
  name: string
  email: string | null
  phone: string
  message: string | null
  course_id: string | null
  type: 'contact' | 'consultation'
  status: 'new' | 'contacted' | 'resolved'
  created_at: string
}
