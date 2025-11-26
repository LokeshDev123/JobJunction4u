import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
       {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },

      {
        protocol: "https",
        hostname: "jobjunction4u.com",
      },

       {
        protocol: "https",
        hostname: "www.jobjunction4u.com",
      },
      

      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
