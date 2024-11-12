import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_HOST': JSON.stringify(process.env.VITE_APP_HOST),
    'import.meta.env.VITE_APP_PORT': JSON.stringify(process.env.VITE_APP_PORT),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },

    server: {
      port: Number(process.env.VITE_APP_PORT) || 3004,
      host: process.env.VITE_APP_HOST || '0.0.0.0'
    },
  },
});
