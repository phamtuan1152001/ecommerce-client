/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   serverActions: true
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.pixa.asia',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn3.dhht.vn',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'file.hstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.loveitopcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'product.hstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thaithanh.com.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bmwcar.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'desmonshop.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'salt.tikicdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'trangsuchas.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vuahanghieu.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
