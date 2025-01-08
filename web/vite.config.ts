import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    strictPort: true,
    host: process.env.HOST ?? 'gimnazija.local',
    open: false,
  },
});
