import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [uni()],
  server: {
    host: true, // 监听所有地址，包括局域网 IP
    port: 5174, // 避免与原项目 demo 的 5173 冲突
  },
});
