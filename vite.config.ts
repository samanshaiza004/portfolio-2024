import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Ensure the buffer package is aliased
      buffer: "buffer",
    },
  },
  define: {
    // Define global `Buffer` for compatibility
    global: "window",
  },
  optimizeDeps: {},
  build: {
    minify: true,
  },
});
