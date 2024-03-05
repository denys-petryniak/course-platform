import vsharp from 'vite-plugin-vsharp'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Online Course Platform',
      meta: [
        {
          name: 'description',
          content:
            'This app is a full-stack web application that utilizes various technologies to create a robust and maintainable user experience.',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  runtimeConfig: {
    stripeSecret: '',
    stripeWebhookSecret: '',
    public: {
      stripeKey: '',
    },
  },

  nitro: {
    prerender: {
      // Only prerender the main page
      routes: ['/'],
    },
  },

  vite: {
    plugins: [vsharp()],
  },

  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vue-macros/nuxt',
  ],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/*'], // implemented own auth behavior in the auth middleware
    },
  },

  devtools: {
    enabled: false,
  },

  typescript: {
    strict: true,
  },
})
