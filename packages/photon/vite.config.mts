import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      // ES module entry (WIP: progressively exporting modules)
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Photon',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => `photon.${format}.js`,
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
