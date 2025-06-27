// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      categoriesApiUrl: process.env.API_URL,
    }
  },
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      // { code: 'fr', domain: 'fr.localhost:3000', file: 'fr.json' },
      // { code: 'uk', domain: 'uk.localhost:3000', file: 'uk.json' }
    ],
    // differentDomains: true,
    defaultLocale: 'en',
    langDir: '../locales/',
    detectBrowserLanguage: false
  },
  ssr: false,
  app: {
    baseURL: process.env.NODE_ENV || '/',
    buildAssetsDir: 'assets'
  },
  nitro: {
    preset: "github-pages"
  }
})
