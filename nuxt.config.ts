// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@pinia/nuxt'],
    app: {
        head: {
            script: [
                {
                    src: '/responsive.voice.js',
                },
            ],
        },
    },
    i18n: {
        detectBrowserLanguage: false,
        locales: [
            { code: 'en', file: 'en.json' },
            { code: 'ru', file: 'ru.json' },
            { code: 'uz', file: 'uz.json' },
            { code: 'uzb', file: 'uzb.json' },
        ],
        lazy: true,
        langDir: 'locales',
        defaultLocale: 'uz',
    },
    build: {
        transpile: [/echarts/, 'swiper/vue', 'maska'],
    },
    css: ['@/assets/css/app.css', '@/assets/css/tailwind.css'],
})
