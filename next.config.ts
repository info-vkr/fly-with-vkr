import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**", // allow all Cloudinary paths
      },
    ],
  },
};

export default nextConfig;
