/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
   images: {
    domains: [
      "pickupmtaani.com",
      'd38vok79sctage.cloudfront.net',
      'img.freepik.com',
      'icons-for-free.com',
      'dev.nuzo.co',
      'scontent.fnbo9-1.fna.fbcdn.net',
      'scontent.fnbo10-1.fna.fbcdn.net',
      'cdn-icons-png.flaticon.com',
      'is1-ssl.mzstatic.com'
    ],
  },
}

module.exports = nextConfig
