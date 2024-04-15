import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webExtension, { readJsonFile } from 'vite-plugin-web-extension';
import path from 'node:path';

function generateManifest() {
  const manifest = readJsonFile('manifest.json');
  const pkg = readJsonFile('package.json');
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

export default defineConfig({
  base: './', // 如果你的资源文件是相对于项目根目录的，请设置正确的 base 路径
  plugins: [
    react(),
    webExtension({
      manifest: generateManifest,
    }),
  ],
  resolve: {
    alias: {
      '/@react-refresh': path.resolve(
        'node_modules/@vitejs/plugin-react-swc/refresh-runtime.js'
      )
    }
  }
});
