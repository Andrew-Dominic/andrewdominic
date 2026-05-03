import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    build: {
      // Production optimizations
      target: 'es2020',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // Split vendor chunks for better caching
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-gsap': ['gsap'],
            'vendor-motion': ['motion'],
            'vendor-lenis': ['lenis'],
            'vendor-three': ['three', '@react-three/fiber'],
          },
        },
      },
      // Inline small assets to reduce HTTP requests
      assetsInlineLimit: 4096,
      // Generate source maps for debugging (disable for max perf)
      sourcemap: false,
      // CSS code splitting
      cssCodeSplit: true,
    },
  };
});
