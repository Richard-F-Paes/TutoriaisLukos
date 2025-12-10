import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // =================================================================
  // Configuração base - removida para desenvolvimento local
  // Para produção, descomente a linha abaixo:
  // base: "/TutoriaisLukos/",
  // =================================================================

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    include: ['lowlight'],
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