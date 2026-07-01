/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    // Manual chunks keep the vendor bundle cacheable and split heavy libs.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/react-router|react-dom|\/react\//.test(id)) return 'react-vendor'
          if (/@tanstack|axios|zustand/.test(id)) return 'data-vendor'
          if (/react-hook-form|\/zod\/|@hookform/.test(id)) return 'form-vendor'
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion-vendor'
          return undefined
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/mocks/**', '**/*.config.*', '**/test/**', '**/*.d.ts'],
    },
  },
})
