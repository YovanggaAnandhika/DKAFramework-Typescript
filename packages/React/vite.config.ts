import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import viteCompression from 'vite-plugin-compression';
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

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
    chunkSizeWarningLimit : 10,
  },
  server: {
    port: 3001,
  },
  plugins: [
    dts({ rollupTypes: true }),
    react(),
    obfuscatorPlugin({
      apply: "build",
      options: {
        ignoreImports: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
      },
    }),
    ViteMinifyPlugin({
      maxLineLength : 3,
      preventAttributesEscaping : true,
      collapseInlineTagWhitespace : true,
      removeOptionalTags : true,
      preserveLineBreaks : true,
      removeComments : true,
      removeTagWhitespace : true,
      removeRedundantAttributes : true
    }),
    viteCompression({
      algorithm : "brotliCompress",
      threshold : 100,
      ext : ".dka"
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});