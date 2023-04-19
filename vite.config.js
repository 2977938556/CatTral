import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import autoprefixer from 'autoprefixer';
import pxtoviewport from 'postcss-px-to-viewport';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置@符号src
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 配置代理
  proxy: {
    // 将本地 /api/xxx 转发到 target 地址
    '/api': {
      target: 'http://127.0.0.1:8848',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
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
    ]
  },

})
