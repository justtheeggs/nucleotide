// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss'
  ],
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    },
  ],
  typescript: {
    shim: false
  },

  devtools: {
    enabled: true
  },

  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer','trpc-nuxt'
          ]
        : ['@juggle/resize-observer','trpc-nuxt']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
          : []
    }
  }
})
