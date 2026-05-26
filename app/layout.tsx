import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from '@next/third-parties/google'
import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'
import { AuthProvider } from '@/context/auth-context'
import { PromoModal } from "@/components/promo-modal"

// export const dynamic = 'force-dynamic'
// export const revalidate = 0

const inter = Inter({
  variable: "--font-inter",
  subsets: ["vietnamese", "latin"],
});

export const viewport: Viewport = {
  themeColor: "#023605",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Inspiring HR - Chuyên gia Đào tạo & Tư vấn Nhân sự",
    template: "%s | Inspiring HR"
  },
  description: "Nâng tầm năng lực của người làm nghề Nhân sự tại Việt Nam thông qua các chương trình đào tạo mang tính ứng dụng thực tiễn cao nhất.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Inspiring HR",
    description: "Nâng tầm năng lực nghề Nhân sự cùng đội ngũ chuyên gia CHRO hàng đầu.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspiring HR - Đào tạo chuyên nghiệp",
    description: "Học tập đột phá, thành công vững bền cùng đội ngũ chuyên gia hàng đầu.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col selection:bg-secondary/30 selection:text-primary`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          
          {/* Floating Action Buttons */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            <Link 
              href="https://zalo.me/0915099642" 
              target="_blank"
              className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-blue-500/50 transition-all duration-300 animate-bounce"
              title="Chat Zalo"
            >
              <MessageCircle className="w-7 h-7" />
            </Link>
            <Link 
              href="tel:0915099642" 
              className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-green-500/50 transition-all duration-300"
              title="Gọi ngay"
            >
              <Phone className="w-7 h-7 animate-pulse" />
            </Link>
          </div>

          <Toaster position="top-right" richColors />
          <PromoModal />
          {gaId && <GoogleAnalytics gaId={gaId} />}
        </AuthProvider>
      </body>
    </html>
  );
}
