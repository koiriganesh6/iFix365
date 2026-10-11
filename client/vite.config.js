import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.API_PROXY_TARGET;

  return {
    plugins: [react()],
    server: {
      proxy: apiProxyTarget ? { '/api': { target: apiProxyTarget, changeOrigin: true } } : undefined,
    },
  };
});
