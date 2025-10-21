import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // =================================================================
  // ADICIONADO: Configuração base para o GitHub Pages
  // O valor DEVE ser o nome exato do seu repositório, com barras.
  // =================================================================
  base: "/TutoriaisLukos/",

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  // O GitHub Pages usa 'build' por padrão, então é bom manter
  // a outDir como 'build' ou garantir que ela combine com 'gh-pages -d build'
  // No seu caso, o script 'deploy' usa 'gh-pages -d dist', então vamos mudar outDir para 'dist'
  build: {
    outDir: 'dist', // Alterado para 'dist' para corresponder ao script 'deploy': "gh-pages -d dist"
    sourcemap: true
  }
})