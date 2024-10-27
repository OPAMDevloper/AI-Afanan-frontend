import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },

    server: {
      port: Number(process.env.VITE_APP_PORT) || 3004,
      host: process.env.VITE_APP_HOST || 'localhost'
    },
  },
});
