import { sentryVitePlugin } from '@sentry/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN

// https://vite.dev/config/
export default defineConfig({
  define: {
    __DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    sentryAuthToken &&
      sentryVitePlugin({
        org: 'arman-4n',
        project: 'dnd-resume',
        applicationKey: 'dnd-resume',
        sourcemaps: {
          disable: sentryAuthToken ? false : true,
        },
      }),
  ],
  build: {
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              name: 'vendor-react',
              test: /\/react@19|\/react-dom|\/react-router/,
            },
            { name: 'vendor-tiptap', test: /\/@tiptap|\/prosemirror/ },
            {
              name: 'vendor-sentry',
              test: /\/@sentry/,
            },
            { name: 'vendor', test: /\/node_modules/ },
          ],
        },
      },
    },
    sourcemap: sentryAuthToken ? true : false,
  },
})
