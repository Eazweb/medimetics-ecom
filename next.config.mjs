/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "i.ibb.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
