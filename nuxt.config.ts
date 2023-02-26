export default {
    modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt"],
    buildModules: ["@nuxtjs/google-fonts"],
    googleFonts: {
        families: {
            Raleway: [100, 200, 300, 400, 500, 600, 700],
        },
        display: 'swap'
    }
};
