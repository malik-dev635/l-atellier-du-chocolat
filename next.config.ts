import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Tous les visuels sont des imports statiques locaux : aucun domaine distant.
    formats: ["image/avif", "image/webp"],
  },
  // Site vitrine : l'ancienne route « boutique » redirige vers la gamme.
  async redirects() {
    return [{ source: "/boutique", destination: "/gamme", permanent: true }];
  },
};

export default nextConfig;
