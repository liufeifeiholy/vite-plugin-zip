import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import zip from '../dist/index.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    zip({
      dir: 'dist',
      outputName: 'liufeifeiholy'
    })
  ]
})
