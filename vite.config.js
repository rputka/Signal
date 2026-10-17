import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Resolve this file's folder in an ES module (where __dirname is not defined).
const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@/..." points at src/ so deep imports stay short.
      "@": path.resolve(rootDir, "./src"),
    },
  },
  build: {
    // The Parse SDK alone is ~400 kB, so raise the default 500 kB warning.
    // TODO (future work): lazy-load routes with React.lazy to split the bundle.
    chunkSizeWarningLimit: 700,
  },
});
