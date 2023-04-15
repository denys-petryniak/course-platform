// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ["/landing"],
    },
  },

  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "@pinia/nuxt",
  ],

  devtools: {
    enabled: false,
  },

  typescript: {
    shim: false,
  },
});
