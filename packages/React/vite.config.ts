import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import viteCompression from 'vite-plugin-compression';
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "react-beautiful-timeline",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    emptyOutDir: true,
  },
  server: {
    port: 3001,
  },
  plugins: [
    dts({ rollupTypes: true }),
    react(),
    obfuscatorPlugin({
      options: {
        // your javascript-obfuscator options
        debugProtection: true,
        // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
      },
    }),
    ViteMinifyPlugin({
      removeTagWhitespace : true,
      preventAttributesEscaping : true,
      collapseInlineTagWhitespace : true,
      removeOptionalTags : true,
      preserveLineBreaks : true,
      removeRedundantAttributes : true
    }),
    viteCompression({
      algorithm : "brotliCompress"
    })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});