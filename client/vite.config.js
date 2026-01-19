import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // allows external access (ngrok)
    port: 5173,          // your dev port
    strictPort: true,    // optional, prevents automatic port switching
    allowedHosts: [
      '8719af0f84b7.ngrok-free.app', // your current ngrok URL
      'localhost',
      '127.0.0.1'
    ],
  },
});
