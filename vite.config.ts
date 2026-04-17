import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import "dotenv/config";

export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE_URL || "/",
  build: {
    outDir: process.env.VITE_BUILD_DIR || "dist",
  },
});
