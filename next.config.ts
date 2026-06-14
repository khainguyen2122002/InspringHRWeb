import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow tunneling services for dev server
  allowedDevOrigins: [
    'inspiring-hr-preview.loca.lt',
    'localhost:3000',
    'd9e4f892092e271a-115-72-233-60.serveousercontent.com'
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        // Supabase Storage
        protocol: 'https',
        hostname: 'qqkilpcifglxhqoblkgj.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
