import { resolve } from 'pathe'

export default defineNuxtConfig({
  modules: ['@nuxt/devtools-ui-kit'],

  ssr: false,

  devtools: {
    enabled: false,
  },

  app: {
    baseURL: '/__duck',
  },

  routeRules: {
    'api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'access-control-allow-methods': '*',
        'access-control-allow-headers': '*',
      },
    },
  },

  compatibilityDate: '2024-08-21',

  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client'),
    },
  },

  vite: {
    server: {
      hmr: {
        // Instead of go through proxy, we directly connect real port of the client app
        clientPort: +(process.env.PORT || 3300),
      },
    },
  },
})