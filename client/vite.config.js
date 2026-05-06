import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 1990,
    proxy: {
      "/api": {
        target: "https://dealmacenes-backend.vercel.app", // Puerto donde corre tu backend local
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  base: "/",
});
