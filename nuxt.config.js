export default {
  env: {
    apiURL: 'http://localhost:8888/api'
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"}
    ],
    script: [
      {src: '/js/jquery-3.2.1.min.js'},
      {src: '/js/popper.min.js'},
      {src: '/js/bootstrap.min.js'},
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#069255',
    height: '0px'
  },

  /*
  ** Global CSS
  */
  css: [
    '@/static/css/bootstrap.min.css',
    '@/node_modules/vue-multiselect/dist/vue-multiselect.min.css',
    '@/node_modules/vue-select/dist/vue-select.css',
    '@/static/css/style.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/main.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/font-awesome',
    '@nuxtjs/dotenv',
    ['nuxt-vuex-localstorage', {mode: 'debug'}]
  ],

  toast: {
    position: 'bottom-center',
    duration: 4000,
    theme: 'bubble',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'data.access_token' },
          logout: { url: 'auth/logout', method: 'post' },
          user: { url: 'auth/get-user', method: 'get', propertyName: 'data' }
        },
      }
    },
    redirect: false,
  },

  router: {
    middleware: ['auth']
  },

  axios: {
    baseURL: 'http://localhost:8888/api'
  },

  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8888',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '/' },
  //   },
  // },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
