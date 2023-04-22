import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import autoprefixer from 'autoprefixer';
import pxtoviewport from 'postcss-px-to-viewport';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    host: true,
  },
  // 配置@符号src
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  // 配置适配移动端
  css: {
    plugins: [
      pxtoviewport({
        viewportWidth: 375,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false
      })
    ],
    preprocessorOptions: {
      less: {
        additionalData: `
              @import "@/assets/styeles/rule.less";
              @import "@/assets/styeles/default.less";
            `,
      },
    },
  },

})
