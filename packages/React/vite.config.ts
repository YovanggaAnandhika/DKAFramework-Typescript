import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import viteCompression from 'vite-plugin-compression';
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import tailwindcss from "tailwindcss";
import { visualizer } from "rollup-plugin-visualizer";

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
        debugProtection: false,
        ignoreImports: true,
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
    visualizer({
      template: "treemap", // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "analyse.html", // will be saved in project's root
    }) as PluginOption,
    viteCompression({
      algorithm : "brotliCompress"
    })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});