/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://cahn-api.campdi.vn',
    NEXT_PUBLIC_APP_URL: 'https://cahn.campdi.vn',
    NEXTAUTH_URL: 'https://cahn.campdi.vn',
    NEXTAUTH_SECRET: 'Ydgv0bGn5m4KmOA6W2Rq7anDSnEFvtckmjxy5bdbGUw=',
    NEXT_PUBLIC_GA_ID: 'YOUR_GA_ID',
    NEXT_PUBLIC_FACEBOOK_ID: '1391242984962331',
    NEXT_PUBLIC_FACEBOOK_SECRET: '1ea0f3eb9fd10649680e0d78d91e52d5',
    NEXT_PUBLIC_GOOGLE_ID:
      '456556418271-p8a0berd1ssgutdhub3fjcbfjt88k9un.apps.googleusercontent.com',
    NEXT_PUBLIC_GOOGLE_SECRET: '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',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
      }
    }

    return config
  },
}

module.exports = nextConfig
