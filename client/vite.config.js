import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import prerender from 'vite-plugin-prerender';          

export default defineConfig({
  plugins: [react(), tailwindcss(), prerender({
    routes: ['/'],
  })],
  server: {
    host: true,
    port: 1990,
  },
});
