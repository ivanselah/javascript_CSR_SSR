import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      minify: false,
      lib: {
        entry: resolve(__dirname, 'main.js'),
        name: 'index',
        fileName: 'index',
      },
    },
  };
});
