import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),visualizer()],
  server:{
    // host: '192.168.31.55',
    host: '192.168.0.155',
    port:80,
    hmr:true
  }
})
