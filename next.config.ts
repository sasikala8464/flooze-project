/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['http://192.168.1.10:3000'], // your LAN IP
  },
};

module.exports = nextConfig;
