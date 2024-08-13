import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ command, mode }) => {
  const { default: dotenv } = await import('dotenv');
  
  // Load env vars for local development
  if (mode !== 'production') {
    dotenv.config();
  }

  return {
    plugins: [react()],
    base: '/',
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/graphql': {
          target: mode === 'production' 
            ? 'https://rig-builderpro.onrender.com'
            : 'http://localhost:3001',
          changeOrigin: true,
          secure: mode === 'production',
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
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});
