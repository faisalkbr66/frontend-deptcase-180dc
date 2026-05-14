import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Mengalihkan semua request yang berawalan '/api' ke target backend
      '/api': {
        target: 'https://test-180dc.vercel.app',
        changeOrigin: true,
        secure: false, // Menghindari isu sertifikat SSL lokal
      }
    }
  }
})