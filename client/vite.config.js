import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001', // Changed to 3001, assuming your GraphQL server runs on this port
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxy
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  },
  build: {
    outDir: 'dist',
  },
})