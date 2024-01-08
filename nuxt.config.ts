// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, timeline: { enabled: true } },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  supabase: {
    redirect: false,
  },
  typescript: {
    typeCheck: true,
  },
})
