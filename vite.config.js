import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [uni()],
  base: process.env.NODE_ENV === 'production' ? '/animal-island-uniapp/' : '/',
  server: {
    host: true,
    port: 5173
  },
});
