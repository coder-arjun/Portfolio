import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // SITE_URL (the public address, e.g. https://arjunpk.pages.dev) is read by both the build script and the
  // browser code, so it only needs setting once in the host's environment variables.
  envPrefix: ['VITE_', 'SITE_URL'],
});
