'use client'

import { useState, useEffect, useRef, useTransition, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  User, Mail, Phone, BookOpen, Calendar, MessageSquare, 
  RefreshCw, ExternalLink, Layers, Search, Loader2, Sparkles, 
  PhoneCall, PartyPopper 
} from 'lucide-react'
import { getGoogleSheetRegistrations } from '@/app/actions'
import { toast } from 'sonner'

interface SheetRecord {
  id: string
  date: string
  name: string
  phone: string
  email: string
  courseTitle: string | null
  level: string | null
  message: string | null
  type: string
  status: string
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1szp_pNmmnoGjtRbc5vkmUA-kCwlShQNv7tYTRcO4Ckw/edit?usp=sharing'

export default function AdminStudentsPage() {
  const [registrations, setRegistrations] = useState<SheetRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'registration' | 'contact'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const prevCountRef = useRef<number | null>(null)

  const fetchData = useCallback(async (showToast = false) => {
    setIsRefreshing(true)
    try {
      const res = await getGoogleSheetRegistrations()
      if (res.success && res.data) {
        setRegistrations(res.data)
        
        // Kiểm tra xem có bản ghi mới không (dựa trên tổng số lượng dòng)
        if (prevCountRef.current !== null && res.data.length > prevCountRef.current) {
          const newItemsCount = res.data.length - prevCountRef.current
          const newestItem = res.data[0]
          if (newestItem) {
            toast.success(`🎉 Có ${newItemsCount} yêu cầu mới!`, {
              description: `Từ: ${newestItem.name} (${newestItem.phone})`
            })
          }
        }
        prevCountRef.current = res.data.length
        if (showToast) toast.success('Đã làm mới dữ liệu từ Google Sheet')
      } else {
        if (showToast) toast.error('Lỗi khi tải dữ liệu: ' + res.error)
      }
    } catch (err: any) {
      if (showToast) toast.error('Lỗi hệ thống: ' + err.message)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  // Auto-refresh mỗi 7 giây
  useEffect(() => {
    fetchData()
    const timer = setInterval(() => {
      fetchData(false)
    }, 7000)
    return () => clearInterval(timer)
  }, [fetchData])

  const filteredRegistrations = registrations.filter(item => {
    const matchesFilter = filterType === 'all' || item.type === filterType
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.phone.includes(searchQuery) ||
                          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.courseTitle && item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const regCount = registrations.filter(r => r.type === 'registration').length
  const contactCount = registrations.filter(r => r.type === 'contact').length

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="space-y-2">
          <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Nguồn: Google Sheets Trực Tiếp
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">Quản lý Đăng ký & Tư vấn</h1>
          <p className="text-slate-500 text-sm font-medium">Theo dõi và phản hồi tự động các yêu cầu gửi về từ website.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button 
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            variant="outline"
            className="h-12 px-5 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 gap-2.5 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
            Làm mới ngay
          </Button>

          <Button 
            asChild
            className="h-12 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2.5 shadow-md shadow-emerald-600/20"
          >
            <a href={SHEET_URL} target="_blank" rel="noopener noreferrer">
              Mở Google Sheet <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Thống kê & Bộ lọc */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          onClick={() => setFilterType('all')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all ${filterType === 'all' ? 'bg-primary text-white shadow-xl shadow-primary/20 border-primary' : 'bg-white hover:border-slate-300 border-slate-100'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Tất cả yêu cầu</span>
            <Layers className="w-5 h-5 opacity-80" />
          </div>
          <div className="text-4xl font-black">{registrations.length}</div>
        </Card>

        <Card 
          onClick={() => setFilterType('registration')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all ${filterType === 'registration' ? 'bg-[#F2A900] text-[#0E3B0F] shadow-xl shadow-yellow-500/20 border-[#F2A900]' : 'bg-white hover:border-slate-300 border-slate-100'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Đăng ký học</span>
            <BookOpen className="w-5 h-5 opacity-80" />
          </div>
          <div className="text-4xl font-black">{regCount}</div>
        </Card>

        <Card 
          onClick={() => setFilterType('contact')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all ${filterType === 'contact' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 border-blue-600' : 'bg-white hover:border-slate-300 border-slate-100'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Yêu cầu tư vấn</span>
            <MessageSquare className="w-5 h-5 opacity-80" />
          </div>
          <div className="text-4xl font-black">{contactCount}</div>
        </Card>
      </div>

      {/* Tìm kiếm */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <Input 
            placeholder="Tìm kiếm theo Tên, SĐT, Email, Khóa học hoặc Lời nhắn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 bg-slate-50 border-none rounded-xl text-base font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      {/* Danh sách */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4 bg-white rounded-[3rem] border border-slate-100">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="font-bold text-slate-400">Đang đồng bộ dữ liệu từ Google Sheets...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <MessageSquare className="w-8 h-8" />
            </div>
            <p className="font-bold text-slate-500">Không có bản ghi nào khớp với điều kiện tìm kiếm.</p>
          </div>
        ) : (
          filteredRegistrations.map((item) => (
            <Card key={item.id} className="p-8 border-none shadow-sm rounded-[2.5rem] bg-white flex flex-col xl:flex-row xl:items-center justify-between gap-8 hover:shadow-md transition-all">
              <div className="flex items-start gap-6 flex-grow">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'registration' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-black text-primary">{item.name || '[Không tên]'}</h3>
                    <Badge className={item.type === 'registration' ? 'bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-1 text-xs rounded-full' : 'bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 text-xs rounded-full'}>
                      {item.type === 'registration' ? 'Đăng ký học' : 'Yêu cầu tư vấn'}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-600">
                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-primary" /> {item.phone}</span>
                    {item.email && <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-primary" /> {item.email}</span>}
                    <span className="flex items-center gap-1.5 text-slate-400"><Calendar className="w-4 h-4" /> {item.date}</span>
                  </div>

                  {item.courseTitle && (
                    <div className="flex flex-wrap items-center gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-100/80">
                      <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span>Khóa học:</span>
                      </div>
                      <span className="font-black text-amber-950 text-sm">{item.courseTitle}</span>
                      {item.level && (
                        <Badge variant="outline" className="bg-white text-amber-800 border-amber-200 font-bold">
                          {item.level}
                        </Badge>
                      )}
                    </div>
                  )}

                  {item.message && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nội dung lời nhắn:</p>
                      <p className="text-slate-700 text-sm italic font-medium leading-relaxed">"{item.message}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap xl:flex-col gap-3 shrink-0 pt-4 xl:pt-0 border-t xl:border-t-0 border-slate-100">
                <Button 
                  asChild 
                  variant="outline" 
                  className="h-11 px-5 rounded-xl border-blue-200 hover:bg-[#0068ff] hover:text-white hover:border-transparent font-bold gap-2 group transition-all"
                >
                  <a href={`https://zalo.me/${item.phone.replace(/[\s.-]/g, '')}`} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 text-blue-500 group-hover:text-white" />
                    Nhắn Zalo
                  </a>
                </Button>

                <Button 
                  asChild 
                  variant="outline" 
                  className="h-11 px-5 rounded-xl border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-transparent font-bold gap-2 group transition-all"
                >
                  <a href={`tel:${item.phone.replace(/[\s.-]/g, '')}`}>
                    <PhoneCall className="w-4 h-4 text-emerald-500 group-hover:text-white" />
                    Gọi trực tiếp
                  </a>
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
