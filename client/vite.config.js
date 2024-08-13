import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
  },
  define: {
    'process.env': process.env
  },
})
