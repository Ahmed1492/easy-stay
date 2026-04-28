import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Never fail the build due to warnings
    rollupOptions: {
      onwarn(warning, warn) {
        // suppress all warnings during build
        return;
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: 'all',
  },
});
