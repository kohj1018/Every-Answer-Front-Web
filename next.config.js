/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: []
  },
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    SIGNIN_CALLBACK_URL: process.env.SIGNIN_CALLBACK_URL
  }
}

module.exports = nextConfig
