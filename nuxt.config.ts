import vsharp from "vite-plugin-vsharp";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: "",
    stripeWebhookSecret: "",
    public: {
      stripeKey: "",
    },
  },

  nitro: {
    prerender: {
      routes: ["/landing"],
    },
  },

  vite: {
    plugins: [vsharp()],
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
