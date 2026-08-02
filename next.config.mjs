/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    proxyClientMaxBodySize: "10mb",
  },
};

export default nextConfig;