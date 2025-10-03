/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  // App Router configuration
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Image optimization
  images: {
    domains: [
      'localhost',
      'vercel.app',
      'areluna.com',
      'instituto-areluna.com',
      'pinklegion.com',
      'papagaiofotogenico.com',
      'nuvensautoctones.com',
      'prostoral.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers for security and CORS
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Tenant-ID' },
        ],
      },
    ]
  },
  
  // Redirects for tenant routing
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'localhost:3000',
          },
        ],
        destination: '/auth/signin',
        permanent: false,
      },
    ]
  },
  
  // Rewrites for multi-tenant support
  async rewrites() {
    return [
      // API routes remain unchanged
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      // Tenant-specific rewrites will be handled by middleware
    ]
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'areluna-erp',
    NEXT_PUBLIC_APP_NAME: 'AreLuna ERP',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
  
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    // Optimize bundle
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all'
    }
    
    return config
  },
  
  // Output configuration for Vercel
  output: 'standalone',
  
  // Compression
  compress: true,
  
  // Power by header
  poweredByHeader: false,
  
  // React strict mode
  reactStrictMode: true,
  
  // SWC minification
  swcMinify: true,
  
  // Trailing slash
  trailingSlash: false,
}

// Sentry configuration
const sentryWebpackPluginOptions = {
  silent: true,
  org: 'areluna-group',
  project: 'erp-web',
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
}

module.exports = process.env.NODE_ENV === 'production' 
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig