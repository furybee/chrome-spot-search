import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx, ManifestV3Export } from '@crxjs/vite-plugin';
import ViteRestart from 'vite-plugin-restart';
import manifest from './manifest.json' assert { type: 'json' };
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
  server: {
    watch: {
      ignored: ['!**/_locales/**'],
    },
    strictPort: true,
    port: 5173,
    hmr: {
      clientPort: 5173
    }
  },
  plugins: [
    vue(),
    crx({ manifest: manifest as unknown as ManifestV3Export }),
    ViteRestart({
      restart: ['./_locales/**/*.json'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: '_locales/**/*',
          dest: '_locales',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        spotSearchManager: 'spot-search-manager.html',
      },
    },
  },
})
