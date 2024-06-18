import { defineConfig } from 'vite';
import { resolve } from 'path';
import dotenv from 'dotenv';
import { domToCodePlugin } from 'dom-to-code/vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

dotenv.config();
export default defineConfig({
  base: './',
  plugins: [
    react(),
    process.env.NODE_ENV !== 'production'
      ? domToCodePlugin({
          mode: 'react',
        })
      : undefined,
    tsconfigPaths(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  define: {
    'process.env': {
      API_URL: process.env.API_URL,
      SITE_NAME: process.env.SITE_NAME,
      FAST_API_URL: process.env.FAST_API_URL,
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // nested: resolve(__dirname, 'dist/index.html'),
      },
    },
  },
  server: {
    open: true,
    port: 3040,
  },
});
