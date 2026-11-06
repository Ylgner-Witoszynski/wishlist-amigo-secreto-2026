import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: process.env.PAGES_BASE_PATH || "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        principal: resolve(projectRoot, "index.html"),
        alternativa: resolve(projectRoot, "alternativa.html"),
        editorial: resolve(projectRoot, "versao-editorial.html"),
      },
    },
  },
});
