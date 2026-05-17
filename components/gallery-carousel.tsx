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
    <section className="py-12 md:py-16 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-secondary/10 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-6">
           <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2">
                 <Camera className="w-3.5 md:w-4 h-3.5 md:h-4 text-secondary" />
                 <p className="text-secondary font-black uppercase tracking-[0.2em] text-[8px] md:text-[9px]">Hình Ảnh Thực Tế</p>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
                 Khoảnh Khắc Tại <br className="hidden sm:block" /><span className="text-secondary italic">Inspiring HR</span>
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
         className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-10 pb-4 md:pb-6 scrollbar-hide"
         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Lớp đệm giả để cách lề đồng bộ với container */}
        <div className="shrink-0 w-[2vw] md:w-[5vw]" />
        
        {gallery.map((item) => (
          <div 
             key={item.id} 
             className="shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] lg:w-[480px] aspect-[16/10] snap-center relative rounded-3xl overflow-hidden group cursor-pointer border border-white/15 shadow-2xl"
          >
             <Image 
                src={item.image} 
                alt={item.caption || 'Gallery Image'} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500" />
             
             {item.caption && (
               <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-1 bg-secondary mb-3 rounded-full scale-0 origin-left group-hover:scale-100 transition-transform duration-500 delay-100 shadow-md" />
                  <p className="text-white font-bold text-sm md:text-base lg:text-lg leading-snug line-clamp-2 drop-shadow-md">{item.caption}</p>
               </div>
             )}
          </div>
        ))}
        
        <div className="shrink-0 w-[2vw] md:w-[5vw]" />
      </div>
    </section>
  )
}
