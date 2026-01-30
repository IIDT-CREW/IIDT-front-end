/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      { hostname: 'img.seadn.io' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'source.unsplash.com' },
      { hostname: '127.0.0.1' },
    ],
  },

  compress: true,

  // Turbopack config (Next.js 16 default)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // styled-components support
  compiler: {
    styledComponents: true,
  },

  // Webpack config for non-Turbopack builds
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production'

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : config.devtool,
    }
  },
}

module.exports = nextConfig
