// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  nitro: {
    minify: false
  },
  $production: {
    nitro: {
      storage: {
        'data': {
          driver: 'cloudflare-kv-binding',
          binding: 'DATA'
        }
      }
    }
  }
})
