import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { obfuscator } from 'rollup-obfuscator';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), obfuscator()],
});
