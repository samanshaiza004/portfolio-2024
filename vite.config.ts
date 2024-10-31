import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
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
  optimizeDeps: {
    esbuildOptions: {
      // Polyfill global and Buffer
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
});
