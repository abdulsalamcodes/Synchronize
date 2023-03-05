import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt", "@nuxtjs/supabase"],
    // serverMiddleware: [
    //     "~/api/index.js"
    // ],
    // alias: {
    //     'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
    //     'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
    //     'data': fileURLToPath(new URL('./assets/other/data', import.meta.url))
    //   },
    app: {
        head: {
            title: 'Syncronize',
            meta: [
                { name: 'description', content: "Boost your productivity with Synchronize's collection of hand-picked apps, including a to-do list manager, habit tracker, note taker, and project management tool. With a seamless user interface, real-time updates, and automatic syncing across all devices, stay on top of your workflow from anywhere. Try Synchronize for free today and reach your productivity goals" },
                {
                    name: 'title',
                    content: 'Synchronize - Streamline Your Workflow and Boost Productivity'
                },
                {
                    name: 'keywords',
                    content: 'productivity, to-do list, habit tracker, note taking, project management'
                },
                {
                    name: 'robots',
                    content: 'index, follow'
                },
                {
                    name: 'author',
                    content: 'Your Name or Company Name'
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    name: 'twitter:title',
                    content: 'Synchronize - Streamline Your Workflow and Boost Productivity'
                },
                {
                    name: 'twitter:description',
                    content: 'Boost your productivity with Synchronize\'s collection of hand-picked apps, including a to-do list manager, habit tracker, note taker, and project management tool. With a seamless user interface, real-time updates, and automatic syncing across all devices, stay on top of your workflow from anywhere. Try Synchronize for free today and reach your productivity goals'
                },
                {
                    name: 'twitter:image',
                    content: 'https://example.com/synchronize.jpg'
                },
                {
                    name: 'og:title',
                    content: 'Synchronize - Streamline Your Workflow and Boost Productivity'
                },
                {
                    name: 'og:description',
                    content: 'Boost your productivity with Synchronize\'s collection of hand-picked apps, including a to-do list manager, habit tracker, note taker, and project management tool. With a seamless user interface, real-time updates, and automatic syncing across all devices, stay on top of your workflow from anywhere. Try Synchronize for free today and reach your productivity goals'
                },
                {
                    name: 'og:image',
                    content: 'https://example.com/synchronize.jpg'
                },
                {
                    name: 'og:url',
                    content: 'https://example.com'
                },
                {
                    name: 'og:type',
                    content: 'website'
                },
                {
                    name: 'og:site_name',
                    content: 'Synchronize'
                },
                {
                    name: 'og:locale',
                    content: 'en_US'
                }

            ],
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700&display=swap' }
            ]
        }
    },
});
