import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import generateCacheListPlugin from './vite-plugin-generate-cache-list'

export default defineConfig({
  plugins: [
    react(),
    generateCacheListPlugin()
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
  }
})
