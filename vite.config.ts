import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite';
import Checker from 'vite-plugin-checker'
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Checker({
      vueTsc: true
    }),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [`@use "@/app/styles/shared/mixins" as *;`]
      }
    }
  },
})
