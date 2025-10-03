import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      // Temporarily bundle from the current CJS build output.
      // After refactor, switch this to 'src/index.ts'.
      entry: resolve(__dirname, 'dist/index.js'),
      name: 'MakerJs',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => `maker.${format}.js`,
    },
    rollupOptions: {
      // Keep external deps unbundled in UMD/IIFE; adjust as needed
      external: ['bezier-js', 'graham_scan', 'kdbush'],
      output: {
        globals: {
          'bezier-js': 'Bezier',
          'graham_scan': 'GrahamScan',
          'kdbush': 'KDBush',
        },
      },
    },
    sourcemap: true,
    target: 'es2020',
    minify: false,
  },
});
