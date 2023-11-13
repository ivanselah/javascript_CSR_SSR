import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'main.js'),
        name: 'index',
        fileName: 'index',
      },
    },
  };
});
