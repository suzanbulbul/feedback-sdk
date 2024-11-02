import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "src/main.ts",
      name: "FeedbackWidget",
      fileName: (format) => `feedback-widget.${format}.js`,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  define: {
    "process.env": {},
  },
});
