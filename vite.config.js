import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/adventurelookup": {
        target: "https://adventurelookup.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/adventurelookup/, ""),
      },
    },
  },
});
