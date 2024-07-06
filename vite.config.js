import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {'process.env': {
    URL: 'https://1d2b-151-240-203-207.ngrok-free.app/api'
  }}
})
