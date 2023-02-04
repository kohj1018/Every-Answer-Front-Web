/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: []
  },
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY
  }
}

module.exports = nextConfig
