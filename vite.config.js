import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.glb'],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Production optimizations using esbuild (built-in, no extra install)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Better chunk splitting for caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion', 'motion'],
        },
      },
    },
    // Disable source maps for smaller builds
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
});
