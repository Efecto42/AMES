import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/Efecto42/AMES/**" }],
  },
};

export default nextConfig;
