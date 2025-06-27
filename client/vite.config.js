import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward all requests starting with /address to backend server
      '/address': 'http://localhost:3000'
    }
  }
})
