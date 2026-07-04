'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, User, ArrowLeft, Share2, Facebook, MessageCircle, Clock, Loader2, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { getGoogleSheetNews } from '@/app/actions'
import { mockDb } from '@/lib/mock-db'

/**
 * Replaces regular hyphens between alphanumeric / slash characters
 * with Non-Breaking Hyphens (U+2011) so codes like "TT-BTC" or
 * "87/2026/TT-BTC" are never split across lines by the browser.
 * Visually identical to a regular hyphen.
 */
function protectHyphens(html: string): string {
  return html
    // Replace hyphen between word/slash chars → non-breaking hyphen ‑
    .replace(/([A-Za-z0-9\/])(-{1})([A-Za-z0-9])/g, '$1\u2011$3')
    // Replace em-dash (–) followed by a regular space → non-breaking space
    // so the em-dash stays attached to the preceding word
    .replace(/\u2013\u0020/g, '\u2013\u00A0')
    .replace(/\u2014\u0020/g, '\u2014\u00A0')
}


function NewsDetailContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await getGoogleSheetNews()
        const allNews = res && res.success && res.data && res.data.length > 0 ? res.data : mockDb.getNews()
        if (id) {
          const found = allNews.find((item: any) => item.id.toString() === id.toString())
          if (found) {
            setPost(found)
            return
          }
        }
        setPost(allNews[0])
      } catch (err) {
        setPost(mockDb.getNews()[0])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center space-y-4 flex-col">
         <Loader2 className="w-10 h-10 animate-spin text-primary" />
         <p className="text-sm font-bold text-slate-400">Đang tải nội dung chi tiết từ Google Sheets...</p>
      </div>
    )
  }

  // Split content into paragraphs if it's a raw string
  const paragraphs = Array.isArray(post.content) 
    ? post.content 
    : typeof post.content === 'string' && post.content.trim().length > 0
    ? post.content.split('\n').filter((p: string) => p.trim().length > 0)
    : [post.desc || 'Nội dung chi tiết đang được cập nhật.']

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
           {/* Breadcrumb */}
           <div className="mb-8">
              <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-primary transition-colors group uppercase tracking-widest">
                 <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Danh sách bài viết
              </Link>
           </div>

           {/* Post Header */}
           <div className="space-y-5 mb-10">
              <Badge className="bg-secondary text-primary px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border-none">
                 {post.type || 'Tin Tức'}
              </Badge>
              <h1 className="text-2xl md:text-4xl font-black text-primary leading-tight tracking-tight">
                 {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-6">
                 <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-secondary" /> {post.date || '2026'}
                 </div>
                 <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary" /> {post.author || 'Inspiring HR'}
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" /> {Math.ceil((post.content?.length || 1000) / 800)} phút đọc
                 </div>
              </div>
           </div>

           {/* Image */}
           <div className="relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl mb-10 border border-slate-100 bg-slate-100">
              <Image src={post.image || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop'} alt={post.title} fill className="object-cover" />
           </div>

           {/* Content */}
           <div className="space-y-6 min-w-0 w-full">
              {typeof post.content === 'string' && (post.content.includes('<') || post.content.includes('&nbsp;')) ? (
                <div 
                  className="quill-content min-w-0 w-full"
                  dangerouslySetInnerHTML={{ __html: protectHyphens(post.content) }} 
                />
              ) : (
                paragraphs.map((para: string, i: number) => (
                  <p key={i} className="text-slate-600 leading-loose text-sm md:text-base font-medium">
                     {para}
                  </p>
                ))
              )}

              {post.attachment_url && (
                <div className="mt-10 p-6 md:p-8 bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="font-black text-primary text-base">Tài liệu / Link đính kèm</p>
                    <p className="text-xs text-slate-400 truncate max-w-sm md:max-w-md">{post.attachment_url}</p>
                  </div>
                  <a 
                    href={post.attachment_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-primary text-white font-black px-8 py-4 rounded-2xl hover:bg-secondary hover:text-primary transition-all text-xs uppercase tracking-widest shadow-lg shadow-primary/10 shrink-0 flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                  >
                    Truy cập ngay <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
              
              <div className="bg-slate-50 p-8 rounded-2xl md:rounded-[2rem] border-l-4 border-primary mt-12 italic text-primary font-bold text-base leading-relaxed">
                 "Inspiring HR - Nơi hội tụ tri thức thực chiến, đồng hành cùng sự thăng tiến vượt bậc của cộng đồng Nhân sự Việt Nam."
              </div>
           </div>

           {/* Share */}
           <div className="mt-12 pt-6 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Chia sẻ</span>
                 <div className="flex gap-2">
                    <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Facebook className="w-4 h-4" /></button>
                    <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><MessageCircle className="w-4 h-4" /></button>
                    <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Share2 className="w-4 h-4" /></button>
                 </div>
              </div>
              <Link href="/khoa-hoc">
                 <Button className="bg-secondary text-primary font-black px-8 h-12 rounded-xl hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-widest shadow-md">
                    Xem khóa học thực chiến
                 </Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  )
}

export default function NewsDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    }>
      <NewsDetailContent />
    </Suspense>
  )
}
