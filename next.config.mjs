/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/codespaces-quota-calculator',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
