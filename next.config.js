/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    githubToken: process.env.NEXT_PUBLIC_GITHUB_TOKEN
  }
}

module.exports = nextConfig
