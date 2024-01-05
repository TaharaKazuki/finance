// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, timeline: { enabled: true } },
  modules: ['@nuxthq/ui', '@nuxt/content', '@nuxtjs/tailwindcss'],
  typescript: {
    typeCheck: true,
  },
})
