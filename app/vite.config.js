import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/portfolio/',        // nom EXACT du repo
    build: { outDir: '../docs', emptyOutDir: true }
})
