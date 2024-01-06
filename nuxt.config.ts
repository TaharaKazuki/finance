// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, timeline: { enabled: true } },
  modules: ['@nuxthq/ui', '@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  typescript: {
    typeCheck: true,
  },
})
