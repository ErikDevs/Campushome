import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "sborra.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "google.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "forum.arcaneodyssey.dev",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
