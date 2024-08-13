import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load env vars for local development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://rig-builderpro.onrender.com'
          : 'http://localhost:3001',
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production',
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
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // Add other environment variables you need in the frontend
    // 'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
  },
});