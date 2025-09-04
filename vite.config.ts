// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 👈 Set dev server to run on port 3000
    open: true, // Optional: auto-open browser
  },
  preview: {
    port: 3000, // 👈 Also run preview on port 3000
    open: true,
  },
});
