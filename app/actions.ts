'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { CenterInfo, Course, Contact } from '@/types'
import { mockDb } from '@/lib/mock-db'
import crypto from 'crypto'

const adminEmails = ['khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com']

async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw new Error(`Lỗi xác thực: ${error.message}`)
  if (!user || !adminEmails.includes(user.email || '')) {
    throw new Error('Thiếu quyền cập nhật (Yêu cầu tài khoản Admin)')
  }
  return { supabase, user }
}

// STORAGE ACTIONS
async function uploadFile(file: File, path: string) {
  const { supabase } = await getAdminUser()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
  const filePath = `${path}/${fileName}`

  console.log(`[Storage] Uploading to edu-storage/${filePath}`)

  const { error: uploadError } = await supabase.storage
    .from('edu-storage')
    .upload(filePath, file, { upsert: true })

  if (uploadError) {
    console.error('[Storage] Upload error raw:', JSON.stringify(uploadError))
    throw new Error(`Lỗi upload ảnh: ${uploadError.message} (status: ${(uploadError as any).statusCode ?? 'unknown'})`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('edu-storage')
    .getPublicUrl(filePath)

  console.log(`[Storage] Upload thành công: ${publicUrl}`)
  return publicUrl
}

// Public Image Upload Action (from admin forms)
export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('imageFile') as File
    const path = formData.get('path') as string || 'general'
    if (!file || file.size === 0) {
      throw new Error('Không tìm thấy file để upload.')
    }
    const publicUrl = await uploadFile(file, path)
    return { success: true, url: publicUrl }
  } catch (error: any) {
    console.error('[Action Error] uploadImageAction:', error)
    return { success: false, error: error.message }
  }
}

// AUTH ACTIONS
export async function signOut() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
  } catch (error: any) {
    console.error('Lỗi signOut:', error)
    return { error: error.message || 'Lỗi hệ thống khi đăng xuất' }
  }
}

// ADMIN 2-LAYER SECURITY ACTIONS
export async function verifyAdminSecondaryPassword(email: string, secondaryPassword: string) {
  try {
    const supabase = await createClient()
    const cleanEmail = email.trim().toLowerCase()
    const hash = crypto.createHash('sha256').update(secondaryPassword.trim()).digest('hex')
    
    const { data, error } = await supabase
      .from('admin_security')
      .select('secondary_password_hash')
      .eq('admin_email', cleanEmail)
      .single()
      
    const isDev = process.env.NODE_ENV === 'development'
      
    if (error || !data) {
      console.error('Lỗi khi truy cập mật khẩu cấp 2:', error)
      if (isDev && secondaryPassword.trim() === '123456') {
        console.log('[Dev Security Bypass] Cho phép đăng nhập bằng mật khẩu cấp 2 mặc định: 123456')
        return { success: true }
      }
      return { success: false, error: 'Tài khoản admin chưa được thiết lập bảo mật cấp 2.' }
    }
    
    if (data.secondary_password_hash === hash || (isDev && secondaryPassword.trim() === '123456')) {
      if (isDev && data.secondary_password_hash !== hash) {
        console.log('[Dev Security Bypass] Cho phép đăng nhập bằng mật khẩu cấp 2 mặc định: 123456')
      }
      return { success: true }
    } else {
      return { success: false, error: 'Mật khẩu cấp 2 không chính xác.' }
    }
  } catch (error: any) {
    console.error('[Action Error] verifyAdminSecondaryPassword:', error)
    return { success: false, error: error.message }
  }
}

export async function changeAdminSecondaryPassword(email: string, currentSecondaryPassword: string, newSecondaryPassword: string) {
  try {
    const { supabase } = await getAdminUser()
    const cleanEmail = email.trim().toLowerCase()
    
    // Kiểm tra mật khẩu hiện tại
    const currentHash = crypto.createHash('sha256').update(currentSecondaryPassword.trim()).digest('hex')
    const { data, error: selectErr } = await supabase
      .from('admin_security')
      .select('secondary_password_hash')
      .eq('admin_email', cleanEmail)
      .single()
      
    if (selectErr || !data) {
      throw new Error('Tài khoản admin chưa được thiết lập bảo mật cấp 2.')
    }
    
    if (data.secondary_password_hash !== currentHash) {
      throw new Error('Mật khẩu cấp 2 hiện tại không chính xác.')
    }
    
    // Hash mật khẩu mới và cập nhật
    const newHash = crypto.createHash('sha256').update(newSecondaryPassword.trim()).digest('hex')
    const { error: updateErr } = await supabase
      .from('admin_security')
      .upsert({
        admin_email: cleanEmail,
        secondary_password_hash: newHash,
        updated_at: new Date().toISOString()
      }, { onConflict: 'admin_email' })
      
    if (updateErr) throw updateErr
    
    return { success: true }
  } catch (error: any) {
    console.error('[Action Error] changeAdminSecondaryPassword:', error)
    return { success: false, error: error.message }
  }
}

// CENTER INFO ACTIONS
export async function updateCenterInfo(formData: FormData) {
  try {
    const { supabase } = await getAdminUser()

    const logoUrl = formData.get('logoUrl') as string || ''
    const bannerUrl = formData.get('bannerUrl') as string || ''

    const updates = {
      name: formData.get('name') as string,
      slogan: formData.get('slogan') as string,
      description: formData.get('description') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      zalo_url: formData.get('zaloUrl') as string,
      facebook_url: formData.get('facebookUrl') as string,
      logo_url: logoUrl,
      banner_url: bannerUrl,
      map_url: formData.get('mapUrl') as string,
      stats_courses: Number(formData.get('statsCourses') || 50),
      stats_students: Number(formData.get('statsStudents') || 12000),
      stats_rating: Number(formData.get('statsRating') || 4.9),
      show_stats: formData.get('showStats') === 'true',
      hero_badge_text: formData.get('heroBadgeText') as string,
      cta_primary_text: formData.get('ctaPrimaryText') as string,
      cta_secondary_text: formData.get('ctaSecondaryText') as string,
      cta_secondary_url: formData.get('ctaSecondaryUrl') as string,
      community_title: formData.get('communityTitle') as string,
      community_text: formData.get('communityText') as string,
      international_title: formData.get('internationalTitle') as string,
      international_text: formData.get('internationalText') as string,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
      .from('center_info')
      .upsert(
        { id: '00000000-0000-0000-0000-000000000000', ...updates },
        { onConflict: 'id' }
      )

    if (error) {
      if (error.code === '42P01') throw new Error('Không tìm thấy bảng center_info. Hãy chạy SQL schema.')
      if (error.code === '42703') throw new Error('Cột dữ liệu bị thiếu trong bảng center_info.')
      if (error.code === '42501') throw new Error('Thiết lập RLS trong db chặn bạn cập nhật (Chưa có Policy Update).')
      throw new Error(`Cập nhật db thất bại: ${error.message}`)
    }

    revalidatePath('/', 'layout')
    revalidatePath('/about')
    revalidatePath('/courses')
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    console.error('[Action Error] updateCenterInfo:', error)
    return { error: error.message || 'Lỗi không xác định khi cập nhật.' }
  }
}

// COURSE ACTIONS
export async function getCourses() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) {
      if (error.code === '42P01') {
        const sortedMock = mockDb.getCourses().sort((a: Course, b: Course) => (a.display_order || 99) - (b.display_order || 99))
        return { success: true, data: sortedMock }
      }
      throw error
    }
    
    let coursesData = data
    // Nếu chưa có khoá học nào trong Supabase, seed dữ liệu mẫu
    if (!data || data.length === 0) {
      await seedSampleCoursesOnly()
      const { data: reseeded, error: reseedError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
      if (!reseedError && reseeded) {
        coursesData = reseeded
      }
    }
    
    // Map to client Course structure
    const mapped = (coursesData || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      description: row.description || '',
      price: Number(row.price || 0),
      original_price: row.original_price ? Number(row.original_price) : undefined,
      sessions: row.duration || '',
      schedule: row.schedule || '',
      level: row.level || '',
      category: row.category || '',
      is_featured: !!row.is_featured,
      display_order: row.display_order !== undefined && row.display_order !== null ? Number(row.display_order) : 0,
      image_url: row.image_url || '',
      instructor_name: row.instructor_name || '',
      instructor_role: row.instructor_role || '',
      target_audience: row.target_audience || '',
      external_form_url: row.external_form_url || '',
      created_at: row.created_at,
      updated_at: row.updated_at,
      content: row.content?.overview || '',
      commencement: row.content?.commencement || '',
      benefits: row.content?.benefits || [],
      special_benefits: row.content?.special_benefits || '',
      status: row.content?.status || 'Sắp khai giảng',
      curriculum: row.content?.curriculum || []
    }))
    
    // Sắp xếp: Ưu tiên display_order > 0 (1, 2, 3...), tiếp đến is_featured, cuối cùng là created_at
    mapped.sort((a: any, b: any) => {
      const orderA = a.display_order && a.display_order > 0 ? a.display_order : 999
      const orderB = b.display_order && b.display_order > 0 ? b.display_order : 999
      if (orderA !== orderB) return orderA - orderB
      if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    })

    return { success: true, data: mapped as Course[] }
  } catch (error: any) {
    console.error('[Action Error] getCourses:', error)
    return { success: false, error: error.message, data: mockDb.getCourses() }
  }
}

async function seedSampleCoursesOnly() {
  try {
    const supabase = await createClient()
    const defaultCourses = mockDb.getCourses()
    for (const course of defaultCourses) {
      const slug = course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      await supabase.from('courses').upsert({
        title: course.title,
        slug: slug,
        description: course.description,
        price: course.price,
        duration: course.sessions,
        level: course.level,
        category: course.category,
        image_url: course.image_url,
        is_featured: course.is_featured,
        display_order: course.display_order || 0,
        content: { 
          overview: course.description || '', 
          curriculum: course.curriculum || [],
          commencement: course.commencement || '',
          benefits: course.benefits || [],
          special_benefits: course.special_benefits || '',
          status: course.status || 'Sắp khai giảng'
        }
      }, { onConflict: 'slug' })
    }
  } catch (e) {
    console.error('Lỗi seed courses phụ:', e)
  }
}

export async function upsertCourse(formData: FormData) {
  try {
    const { supabase } = await getAdminUser()

    let imageUrl = formData.get('imageUrl') as string
    const imageFile = formData.get('imageFile') as File
    
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFile(imageFile, 'courses')
    }

    const id = formData.get('id') as string
    const courseData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      original_price: formData.get('original_price') ? Number(formData.get('original_price')) : null,
      discount_percent: formData.get('discount_percent') ? Number(formData.get('discount_percent')) : null,
      instructor_name: formData.get('instructor_name') as string,
      instructor_role: formData.get('instructor_role') as string,
      learning_goals: formData.get('learning_goals') as string,
      target_audience: formData.get('target_audience') as string,
      external_form_url: formData.get('external_form_url') as string,
      duration: formData.get('duration') as string,
      schedule: formData.get('schedule') as string,
      level: formData.get('level') as string,
      category: formData.get('category') as string,
      is_featured: formData.get('is_featured') === 'true',
      display_order: formData.get('display_order') ? Number(formData.get('display_order')) : 0,
      image_url: imageUrl,
      updated_at: new Date().toISOString(),
      content: JSON.parse(formData.get('content') as string || '{"overview":"","curriculum":[]}')
    }

    const { data, error } = await supabase
      .from('courses')
      .upsert(id ? { id, ...courseData } : courseData)
      .select()
      .single()

    if (error) {
      if (error.code === '42P01') throw new Error('Không tìm thấy bảng courses.')
      throw new Error(`Cập nhật khóa học lỗi: ${error.message}`)
    }

    revalidatePath('/', 'layout')
    revalidatePath('/courses')
    revalidatePath('/khoa-hoc')
    return { success: true, data }
  } catch (error: any) {
    console.error('[Action Error] upsertCourse:', error)
    return { error: error.message || 'Lỗi không xác định khi lưu khóa học.' }
  }
}

export async function deleteCourse(id: string) {
  try {
    const { supabase } = await getAdminUser()

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)

    if (error) throw new Error(`Xóa thất bại: ${error.message}`)

    revalidatePath('/', 'layout')
    revalidatePath('/courses')
    revalidatePath('/khoa-hoc')
    return { success: true }
  } catch (error: any) {
    console.error('[Action Error] deleteCourse:', error)
    return { error: error.message || 'Lỗi khi xóa khóa học.' }
  }
}

// CONTACT ACTIONS (Registrations & Consultations)
export async function submitContact(formData: FormData) {
  try {
    const supabase = await createClient()

    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      course_id: formData.get('courseId') as string || null,
      course_title: formData.get('courseTitle') as string || null,
      level: formData.get('level') as string || null,
      type: formData.get('type') as string || 'contact',
      status: 'new'
    }

    const { error } = await supabase
      .from('contacts')
      .insert([contactData])

    if (error) {
       if (error.code === '42P01') throw new Error('Không tìm thấy bảng contacts (chưa tạo db).')
       throw new Error(`Đã có lỗi CSDL: ${error.message}`)
    }

    console.log(`[Notification] Có yêu cầu mới từ ${contactData.name} (${contactData.phone})`)
    revalidatePath('/admin/registrations')
    return { success: true }
  } catch (error: any) {
    console.error('[Action Error] submitContact:', error)
    return { error: error.message || 'Không thể gửi thông tin liên hệ.' }
  }
}

export async function getContacts() {
  try {
    const { supabase } = await getAdminUser()
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data: data as Contact[] }
  } catch (error: any) {
    console.error('[Action Error] getContacts:', error)
    return { error: error.message || 'Lỗi khi lấy danh sách liên hệ.' }
  }
}

export async function updateContactStatus(id: string, status: 'new' | 'contacted' | 'resolved') {
  try {
    const { supabase } = await getAdminUser()
    const { error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/registrations')
    return { success: true }
  } catch (error: any) {
    console.error('[Action Error] updateContactStatus:', error)
    return { error: error.message || 'Lỗi khi cập nhật trạng thái.' }
  }
}

export async function deleteContact(id: string) {
  try {
    const { supabase } = await getAdminUser()
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    if (error) throw error
    revalidatePath('/admin/registrations')
    return { success: true }
  } catch (error: any) {
    console.error('[Action Error] deleteContact:', error)
    return { error: error.message || 'Lỗi khi xóa liên hệ.' }
  }
}

// Transition registrations from Google Sheets/CSVs to Supabase Table Contacts
export async function getGoogleSheetRegistrations() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      if (error.code === '42P01') {
        return { success: true, data: [] }
      }
      throw error
    }

    const records = data.map((row: any) => ({
      id: row.id,
      date: row.created_at ? new Date(row.created_at).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN'),
      name: row.name || '',
      phone: row.phone || '',
      email: row.email || '',
      courseTitle: row.course_title || null,
      level: row.level || null,
      message: row.message || null,
      type: row.type || 'contact',
      status: row.status || 'new'
    }))

    return { success: true, data: records }
  } catch (err: any) {
    console.error('Error in getGoogleSheetRegistrations (Supabase):', err)
    return { success: false, error: err.message, data: [] }
  }
}

// NEWS ACTIONS
export async function getGoogleSheetNews() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      if (error.code === '42P01') {
        return { success: true, data: mockDb.getNews() }
      }
      throw error
    }

    if (!data || data.length === 0) {
      // Seed default news if empty
      const defaultNews = mockDb.getNews()
      for (const item of defaultNews) {
        await supabase.from('news').insert({
          title: item.title,
          type: item.type,
          author: item.author,
          image: item.image,
          desc: item.desc,
          content: item.content,
          views: item.views,
          date: item.date || new Date().toLocaleDateString('vi-VN')
        })
      }
      const { data: refetched } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
      return { success: true, data: refetched || defaultNews }
    }

    return { success: true, data }
  } catch (err: any) {
    console.error('Error in getGoogleSheetNews (Supabase):', err)
    return { success: false, error: err.message, data: mockDb.getNews() }
  }
}

export async function saveNewsToGoogleSheet(newsItem: any) {
  let supabase = createAdminClient()
  let isUsingAdmin = !!supabase
  
  if (!supabase) {
    // If admin client is not available (no service_role key), fall back to regular anon client
    supabase = await createClient()
  }

  if (!supabase) {
    // Fallback if no Supabase environment variables are set at all
    mockDb.saveNews(newsItem)
    return { success: true, fallback: true }
  }

  try {
    const payload = {
      title: newsItem.title || '',
      type: newsItem.type || 'Tin Tức',
      author: newsItem.author || 'Ban Biên tập',
      image: newsItem.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
      desc: newsItem.desc || '',
      content: newsItem.content || '',
      attachment_url: newsItem.attachment_url || '',
      views: Number(newsItem.views || 150),
      date: newsItem.date || new Date().toLocaleDateString('vi-VN'),
      updated_at: new Date().toISOString()
    }

    let error;
    // Check if it's a valid UUID
    const isUUID = newsItem.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(newsItem.id)
    
    if (isUUID) {
      const { error: upsertError } = await supabase
        .from('news')
        .upsert({ id: newsItem.id, ...payload })
      error = upsertError
    } else {
      const { error: insertError } = await supabase
        .from('news')
        .insert([payload])
      error = insertError
    }

    if (error) throw error

    revalidatePath('/tin-tuc')
    revalidatePath('/')
    revalidatePath('/admin/news')
    return { success: true, fallback: !isUsingAdmin } // if not using admin, notify client
  } catch (error: any) {
    console.error('Error in saveNewsToGoogleSheet (Supabase):', error)
    
    // Check if error is RLS policy violation or API key issue
    const isFallbackNeeded = error.message && (
      error.message.includes('row-level security') ||
      error.message.includes('Invalid API key') || 
      error.message.includes('apiKey') || 
      error.message.includes('JWT') ||
      error.message.includes('invalid') ||
      error.message.includes('service_role')
    )
    
    if (isFallbackNeeded) {
      console.warn('Supabase write restricted, falling back to mockDb / localStorage...')
      mockDb.saveNews(newsItem)
      return { success: true, fallback: true }
    }
    
    return { success: false, error: error.message }
  }
}

export async function deleteSupabaseNews(id: string) {
  let supabase = createAdminClient()
  let isUsingAdmin = !!supabase
  
  if (!supabase) {
    supabase = await createClient()
  }

  if (!supabase) {
    mockDb.deleteNews(id)
    revalidatePath('/tin-tuc')
    revalidatePath('/')
    revalidatePath('/admin/news')
    return { success: true, fallback: true }
  }

  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)
      
    if (error) {
      const isFallbackNeeded = error.message && (
        error.message.includes('row-level security') ||
        error.message.includes('Invalid API key') || 
        error.message.includes('apiKey') || 
        error.message.includes('JWT') ||
        error.message.includes('invalid') ||
        error.message.includes('service_role')
      )
      if (isFallbackNeeded) {
        mockDb.deleteNews(id)
        revalidatePath('/tin-tuc')
        revalidatePath('/')
        revalidatePath('/admin/news')
        return { success: true, fallback: true }
      }
      throw error
    }
    
    revalidatePath('/tin-tuc')
    revalidatePath('/')
    revalidatePath('/admin/news')
    return { success: true }
  } catch (error: any) {
    console.error('[Action Error] deleteSupabaseNews:', error)
    return { success: false, error: error.message }
  }
}


// SEED DATA
export async function seedSampleData() {
  try {
    const { supabase } = await getAdminUser()

    // 1. Seed Center Info
    const centerInfo = {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Inspiring HR',
      slogan: 'Nâng tầm giá trị nguồn nhân lực Việt',
      description: 'Chúng tôi là đơn vị đi đầu trong việc đào tạo và tư vấn giải pháp nhân sự toàn diện, giúp doanh nghiệp tối ưu hóa nguồn lực và xây dựng đội ngũ vững mạnh.',
      address: 'Số 45, Đường Võ Văn Kiệt, Quận 1, TP. Hồ Chí Minh',
      phone: '0901 234 567',
      email: 'hello@inspiringhr.vn',
      zalo_url: 'https://zalo.me/your-id',
      facebook_url: 'https://facebook.com/inspiringhr',
      logo_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
      banner_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
      updated_at: new Date().toISOString()
    }

    const { error: cntrErr } = await supabase.from('center_info').upsert(centerInfo)
    if (cntrErr) throw new Error(`Lỗi seed center_info: ${cntrErr.message}`)

    // 2. Seed 8 HR Courses
    const hrCourses = [
      {
        title: 'Quản trị Nhân sự Hiện đại (HR Generalist)',
        slug: 'quan-tri-nhan-su-hien-dai',
        description: 'Lộ trình từ A-Z dành cho người mới hoặc muốn hệ thống lại kiến thức quản trị nhân sự tổng thể trong kỷ nguyên số.',
        price: 4500000,
        duration: '12 buổi',
        schedule: 'Tối Thứ 2-4-6',
        level: 'Cơ bản',
        category: 'Quản trị',
        is_featured: true,
        image_url: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d262?q=80&w=2069&auto=format&fit=crop',
        content: {
          overview: 'Học viên sẽ được trang bị tư duy quản trị mới nhất, các quy trình nhân sự chuẩn mực từ thu hút đến giữ chân nhân tài.',
          curriculum: [
            { title: 'Chương 1: Tư duy HR 4.0', lessons: ['Vai trò của HR trong doanh nghiệp', 'HR Business Partner là gì?'] },
            { title: 'Chương 2: Quy trình Tuyển dụng', lessons: ['Xây dựng JD', 'Kỹ năng phỏng vấn theo hành vi'] }
          ]
        }
      },
      {
        title: 'Chuyên gia Tuyển dụng & Thu hút Tài năng',
        slug: 'tuyen-dung-va-thu-hut-tai-nang',
        description: 'Nâng cao kỹ năng săn đầu người (Headhunt) và xây dựng thương hiệu tuyển dụng (Employer Branding) chuyên nghiệp.',
        price: 3800000,
        duration: '8 buổi',
        schedule: 'Sáng Thứ 7 & CN',
        level: 'Trung cấp',
        category: 'Tuyển dụng',
        is_featured: true,
        image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
        content: {
          overview: 'Khóa học tập trung vào các kỹ thuật sourcing, phỏng vấn và đánh giá ứng viên hiệu quả.',
          curriculum: [
            { title: 'Chương 1: Kỹ thuật Sourcing', lessons: ['Khai thác LinkedIn', 'Facebook Recruiting'] },
            { title: 'Chương 2: Đánh giá nhân sự', lessons: ['Phương pháp STAR', 'DISC trong tuyển dụng'] }
          ]
        }
      },
      {
        title: 'C&B Toàn diện từ Cơ bản đến Nâng cao',
        slug: 'cb-toan-dien',
        description: 'Làm chủ bảng lương, bảo hiểm, thuế TNCN và các chính sách đãi ngộ phức tạp nhất trong doanh nghiệp.',
        price: 5500000,
        duration: '15 buổi',
        schedule: 'Tối Thứ 3-5',
        level: 'Nâng cao',
        category: 'C&B',
        is_featured: true,
        image_url: 'https://images.unsplash.com/photo-1454165833767-027eeea15539?q=80&w=2070&auto=format&fit=crop',
        content: {
          overview: 'Khóa học cung cấp kiến thức thực chiến về xử lý bảng lương trên Excel và phần mềm HRIS.',
          curriculum: [
            { title: 'Chương 1: Luật Lao động ứng dụng', lessons: ['Hợp đồng lao động', 'Xử lý kỷ luật'] },
            { title: 'Chương 2: Hệ thống Lương', lessons: ['Thiết lập thang bảng lương', 'Tính thuế TNCN'] }
          ]
        }
      },
      {
        title: 'Đào tạo & Phát triển Nguồn nhân lực (L&D)',
        slug: 'dao-tao-va-phat-trien-ld',
        description: 'Xây dựng bản đồ đào tạo, đo lường ROI trong đào tạo và phát triển văn hóa học tập trong doanh nghiệp.',
        price: 4200000,
        duration: '10 buổi',
        schedule: 'Chiều Thứ 7',
        level: 'Trung cấp',
        category: 'Đào tạo',
        is_featured: false,
        image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
        content: {
          overview: 'Học cách thiết kế chương trình đào tạo nội bộ hấp dẫn và mang lại hiệu quả thực chất.',
          curriculum: [
            { title: 'Chương 1: Phân tích nhu cầu đào tạo (TNA)', lessons: ['Công cụ phân tích', 'Xác định mục tiêu'] },
            { title: 'Chương 2: Đo lường hiệu quả', lessons: ['Mô hình Kirkpatrick', 'ROI trong đào tạo'] }
          ]
        }
      },
      {
        title: 'Xây dựng Văn hóa Doanh nghiệp HP',
        slug: 'xay-dung-van-hoa-doanh-nghiep',
        description: 'Làm thế nào để văn hóa trở thành lợi thế cạnh tranh cốt lõi của doanh nghiệp và gắn kết nhân viên.',
        price: 3500000,
        duration: '6 buổi',
        schedule: 'Tối Thứ 6',
        level: 'Nâng cao',
        category: 'Văn hóa',
        is_featured: false,
        image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        content: {
          overview: 'Tìm hiểu về các tầng văn hóa và cách thức triển khai văn hóa xuống từng cấp nhân viên.',
          curriculum: [
            { title: 'Chương 1: Định nghĩa văn hóa', lessons: ['Cốt lõi văn hóa', 'Truyền thông nội bộ'] },
            { title: 'Chương 2: Gắn kết nhân viên', lessons: ['Employee Engagement', 'Khảo sát văn hóa'] }
          ]
        }
      },
      {
        title: 'HR Analytics: Phân tích Dữ liệu Nhân sự',
        slug: 'hr-analytics-du-lieu-nhan-su',
        description: 'Chuyển đổi từ dữ liệu thô sang các báo cáo nhân sự thông minh giúp Ban lãnh đạo ra quyết định chính xác.',
        price: 6000000,
        duration: '10 buổi',
        schedule: 'Tối Thứ 2-4',
        level: 'Chuyên gia',
        category: 'Dữ liệu',
        is_featured: false,
        image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop',
        content: {
          overview: 'Làm chủ PowerBI và Excel để tối ưu hóa báo cáo biến động nhân sự, hiệu suất và chi phí.',
          curriculum: [
            { title: 'Chương 1: Các chỉ số nhân sự (Metrics)', lessons: ['Turnover rate', 'Revenue per employee'] },
            { title: 'Chương 2: Trực quan hóa dữ liệu', lessons: ['Thiết kế Dashboard nhân sự', 'PowerBI cơ bản'] }
          ]
        }
      },
      {
        title: 'Luật Lao động & Quan hệ Lao động',
        slug: 'luat-lao-dong-quan-he-lao-dong',
        description: 'Tránh các rủi ro pháp lý thường gặp và xây dựng quan hệ lao động hài hòa, bền vững.',
        price: 3200000,
        duration: '6 buổi',
        schedule: 'Sáng Thứ 7',
        level: 'Cơ bản',
        category: 'Pháp lý',
        is_featured: false,
        image_url: 'https://images.unsplash.com/photo-1589829545856-110557e00fb3?q=80&w=2070&auto=format&fit=crop',
        content: {
          overview: 'Cập nhật các điểm mới nhất trong Bộ luật Lao động 2019 và các nghị định hướng dẫn.',
          curriculum: [
            { title: 'Chương 1: Hợp đồng & Chấm dứt', lessons: ['Hợp đồng thử việc', 'Đơn phương chấm dứt'] },
            { title: 'Chương 2: Tranh chấp lao động', lessons: ['Hòa giải', 'Tòa án lao động'] }
          ]
        }
      },
      {
        title: 'Kỹ năng Phỏng vấn & Đánh giá Hành vi (BEI)',
        slug: 'ky-nang-phong-van-bei',
        description: 'Trở thành nhà tuyển dụng sắc sảo với kỹ thuật đặt câu hỏi xoáy vào hành vi thực tế của ứng viên.',
        price: 2500000,
        duration: '4 buổi',
        schedule: 'Tối Thứ 5',
        level: 'Trung cấp',
        category: 'Kỹ năng',
        is_featured: false,
        image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop',
        content: {
          overview: 'Khóa học thực hành 100% với các tình huống phỏng vấn giả định khó nhất.',
          curriculum: [
            { title: 'Chương 1: Kỹ thuật BEI', lessons: ['Đặt câu hỏi tình huống', 'Xác minh thông tin'] },
            { title: 'Chương 2: Tâm lý học ứng viên', lessons: ['Đọc vị ngôn ngữ cơ thể', 'Vượt qua định kiến'] }
          ]
        }
      }
    ]

    for (const course of hrCourses) {
      const { error: seedCourseErr } = await supabase.from('courses').upsert(course, { onConflict: 'slug' })
      if (seedCourseErr) throw new Error(`Lỗi seed khoá học: ${seedCourseErr.message}`)
    }

    revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (error: any) {
    console.error('[Action Error] seedSampleData:', error)
    return { error: error.message || 'Lỗi hệ thống khi tạo dữ liệu mẫu.' }
  }
}
