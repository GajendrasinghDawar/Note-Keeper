import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import generateCacheListPlugin from './vite-plugin-generate-cache-list'
import path from 'path'

/** @type {import('vite').UserConfig} */
export default defineConfig({

  esbuild: {
    // jsxInject: `import React from 'react'`,
  },
  plugins: [
    react(),
    // generateCacheListPlugin()
  ],
  build: {
    rollupOptions: {
      output: {
        // Customize the output filenames
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
})
