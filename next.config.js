/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables are handled by Next.js automatically
  // No need to explicitly define them here for deployment
  experimental: {
    // Enable server components
    serverComponentsExternalPackages: ['mongodb']
  }
}

module.exports = nextConfig