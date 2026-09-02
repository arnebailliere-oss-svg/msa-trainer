/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// GitHub Pages serves the site under /<repo>/ — set BASE_PATH in CI.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    rollupOptions: {
      output: {
        // KaTeX is the single largest dependency; keep it in its own long-cached chunk.
        manualChunks: { katex: ["katex"], react: ["react", "react-dom", "react-router-dom"] },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/*.png", "icons/*.svg"],
      manifest: {
        name: "MSA Trainer Berlin",
        short_name: "MSA Trainer",
        description: "Übungs-App für den Mittleren Schulabschluss (Klasse 9/10, Berlin)",
        lang: "de",
        start_url: base,
        scope: base,
        display: "standalone",
        background_color: "#0f0f1a",
        theme_color: "#0f0f1a",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,woff2,png,svg,json}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
  },
});
