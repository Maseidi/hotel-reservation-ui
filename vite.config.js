import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {'process.env': {
    Domain: 'http://localhost:3000',
    URL: 'http://localhost:3000/api'
  }}
})
