import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/dpc/',
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
        },
      },
    },
  },

})
