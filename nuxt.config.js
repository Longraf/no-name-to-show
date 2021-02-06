export default {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'SaaS-платформа для работы с маркетплейсами' },
      { property: 'og:image', content: '/sharing.png'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#D6073D' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.scss',
  ],
  styleResources: {
    scss: [
      '~assets/styles/vars/*.scss',
      '~assets/styles/mixins.scss',
      '~assets/styles/vars/media.scss',
      '~assets/styles/vars/layout.scss',
      '~assets/styles/vars/skeleton.scss',
      '~assets/styles/vue-animations.scss',
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~scripts/plugins/global-values'},
    { src: '~scripts/plugins/validate'},
    { src: '~scripts/directives/smooth-height.js', mode: 'client'},
    { src: '~scripts/plugins/jivosite-chat', mode: 'client'},
    { src: '~scripts/plugins/vue-html2pdf', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-2107170-92'
    }],
    ['@nuxtjs/yandex-metrika', {
      id: '47297475',
      webvisor: true,
      clickmap:true,
      //useCDN:false,
      //trackLinks:true,
      //accurateTrackBounce:true,
    }],
    ['nuxt-vk-rtrg', {
      id: 'VK-RTRG-438056-e10dp'
    }],
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: '462483983913804',
      disabled: false
    }],
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: {
          wght: [400, 500, 600, 700, 900],
          ital: [400, 500, 600, 700, 900],
        }
      },
      display: 'swap',
      prefetch: true,
      preconnect: true,
      preload: true,
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    'vue-scrollto/nuxt',
    'nuxt-leaflet',
  ],
  /*
  ** Router options
  */
  router: {
    middleware: ['auth'],
  },
  /*
  ** Svg sprite plugin options
  */
  svgSprite: {
    input: '~/assets/images/icons',
    output: '~/assets/images/icons-gen',
  },
  /*
  ** Layout transitions options
  */
  layoutTransition: {
    name: 'ease-opacity',
    mode: 'out-in'
  }
}
