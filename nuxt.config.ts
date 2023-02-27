export default {
    modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt", "@nuxtjs/supabase"],
    buildModules: ["@nuxtjs/google-fonts"],
    serverMiddleware: [
        '~/api/index.js'
    ],
    googleFonts: {
        families: {
            Raleway: [100, 200, 300, 400, 500, 600, 700],
        },
        display: 'swap'
    }
};
