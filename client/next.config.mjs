/** @type {import('next').NextConfig} */
import path from 'path' // Import the path module

const nextConfig = {
  images: {
    domains: [
      'im.uniqlo.com',
      'media.debenhams.com',
      'media.boohoo.com',
      'www.nastygal.com'
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable or use a faster source map option
      config.devtool = 'eval-cheap-module-source-map'
    }
    config.resolve.modules = [path.resolve('./src'), 'node_modules']
    return config
  }
}

export default nextConfig
