import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/More-proposal/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vision: resolve(__dirname, 'vision.html'),
        experiences: resolve(__dirname, 'experiences.html'),
        journal: resolve(__dirname, 'journal.html'),
        destinations: resolve(__dirname, 'destinations.html'),
        product: resolve(__dirname, 'product.html'),
        contact: resolve(__dirname, 'contact.html'),
      }
    }
  }
});
