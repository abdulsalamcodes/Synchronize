export default {
    modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt"],
    buildModules: ["@nuxtjs/google-fonts"],
    // plugins: [
    //     { src: '~plugins/vuedraggable.js' }
    // ],
    googleFonts: {
        useStylesheet: true,
        display: 'swap',
        text: 'Hello world',
        preload: true,
        preconnect: true,
        families: {
          Raleway: {
            wght: [100, 200, 300, 400, 500, 600, 700],
            ital: [100]
          },
        }
      }
};
