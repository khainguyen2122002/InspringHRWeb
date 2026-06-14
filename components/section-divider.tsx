'use client'

import { GraduationCap, Star } from 'lucide-react'

interface SectionDividerProps {
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  lightTheme?: boolean
}

export function SectionDivider({ title, subtitle, align = 'center', lightTheme = false }: SectionDividerProps) {
  const isCenter = align === 'center'

  // Metallic silver gradients for the lines (using multi-stop linear gradients to simulate chrome reflections)
  const silverGradientLeft = lightTheme
    ? { background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1) 20%, #F1F5F9 50%, #FFFFFF 80%, #CBD5E1)' }
    : { background: 'linear-gradient(to right, transparent, rgba(148, 163, 184, 0.1) 20%, #CBD5E1 50%, #94A3B8 80%, #64748B)' }

  const silverGradientRight = lightTheme
    ? { background: 'linear-gradient(to right, #CBD5E1, #FFFFFF 20%, #F1F5F9 50%, rgba(255, 255, 255, 0.1) 80%, transparent)' }
    : { background: 'linear-gradient(to right, #64748B, #94A3B8 20%, #CBD5E1 50%, rgba(148, 163, 184, 0.1) 80%, transparent)' }

  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} space-y-3 md:space-y-4`}>
      {/* SVG Definitions for metallic gradients to apply to Lucide icons */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="silver-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="75%" stopColor="#F1F5F9" />
            <stop offset="90%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="silver-metallic-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
      </svg>

      {subtitle && (
        <p className={`${lightTheme ? 'text-secondary/80' : 'text-secondary'} font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px]`}>
          {subtitle}
        </p>
      )}
      
      <h2 className={`text-2xl md:text-4xl font-black tracking-tight leading-snug ${lightTheme ? 'text-white' : 'text-[#0E3B0F]'}`}>
        {title}
      </h2>
      
      <div className={`flex items-center gap-3 ${isCenter ? 'justify-center w-full' : 'justify-start'} pt-2`}>
        <div 
          className="h-[2px] w-12 sm:w-16 md:w-24 rounded-full" 
          style={silverGradientLeft}
        />
        <div className="flex items-center gap-1.5 shrink-0">
          <Star 
            className="w-3.5 h-3.5 fill-current" 
            style={{ 
              fill: `url(#${lightTheme ? 'silver-metallic-light' : 'silver-metallic'})`,
              stroke: `url(#${lightTheme ? 'silver-metallic-light' : 'silver-metallic'})`,
              strokeWidth: 1.5
            }} 
          />
          <GraduationCap 
            className="w-5 h-5" 
            style={{ 
              stroke: `url(#${lightTheme ? 'silver-metallic-light' : 'silver-metallic'})`,
              strokeWidth: 2
            }} 
          />
          <Star 
            className="w-3.5 h-3.5 fill-current" 
            style={{ 
              fill: `url(#${lightTheme ? 'silver-metallic-light' : 'silver-metallic'})`,
              stroke: `url(#${lightTheme ? 'silver-metallic-light' : 'silver-metallic'})`,
              strokeWidth: 1.5
            }} 
          />
        </div>
        <div 
          className="h-[2px] w-12 sm:w-16 md:w-24 rounded-full" 
          style={silverGradientRight}
        />
      </div>
    </div>
  )
}

