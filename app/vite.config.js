import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio-bilel/',     // <-- nom EXACT de ton repo GitHub
  build: {
    outDir: '../docs',           // le build ira dans docs/ (GitHub Pages)
    emptyOutDir: true
  }
})