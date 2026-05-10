'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { mockDb } from '@/lib/mock-db'
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GalleryCarousel() {
  const [gallery, setGallery] = useState<any[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setGallery(mockDb.getGallery())
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (gallery.length === 0) return null

  return (
    <section className="py-16 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
           <div className="space-y-3">
              <div className="flex items-center gap-2">
                 <Camera className="w-4 h-4 text-secondary" />
                 <p className="text-secondary font-black uppercase tracking-[0.2em] text-[9px]">Hình Ảnh Thực Tế</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                 Khoảnh Khắc Tại <br /><span className="text-secondary italic">Inspiring HR</span>
              </h2>
           </div>
           
           <div className="flex gap-3 hidden md:flex">
              <Button 
                 variant="outline" 
                 size="icon" 
                 onClick={() => scroll('left')}
                 className="w-10 h-10 rounded-full border-white/20 bg-white/5 text-white hover:bg-secondary hover:text-primary hover:border-secondary transition-all"
              >
                 <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                 variant="outline" 
                 size="icon" 
                 onClick={() => scroll('right')}
                 className="w-10 h-10 rounded-full border-white/20 bg-white/5 text-white hover:bg-secondary hover:text-primary hover:border-secondary transition-all"
              >
                 <ChevronRight className="w-5 h-5" />
              </Button>
           </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
         ref={scrollContainerRef}
         className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-10 pb-6 scrollbar-hide"
         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Lớp đệm giả để cách lề đồng bộ với container */}
        <div className="shrink-0 w-[5vw] md:w-[5vw]" />
        
        {gallery.map((item) => (
          <div 
             key={item.id} 
             className="shrink-0 w-[75vw] md:w-[320px] aspect-[4/3] snap-center relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10"
          >
             <Image 
                src={item.image} 
                alt={item.caption || 'Gallery Image'} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B0F]/90 via-[#0E3B0F]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
             
             {item.caption && (
               <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-8 h-1 bg-secondary mb-3 rounded-full scale-0 origin-left group-hover:scale-100 transition-transform duration-500 delay-100" />
                  <p className="text-white font-bold text-sm md:text-base leading-snug line-clamp-2">{item.caption}</p>
               </div>
             )}
          </div>
        ))}
        
        <div className="shrink-0 w-[5vw] md:w-[5vw]" />
      </div>
    </section>
  )
}
