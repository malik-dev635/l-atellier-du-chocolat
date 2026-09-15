import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Tous les visuels sont des imports statiques locaux : aucun domaine distant.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
