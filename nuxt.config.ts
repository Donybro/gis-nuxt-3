// https://nuxt.com/docs/api/configuration/nuxt-config
import uzLocale from './locales/uz.json'
import uzbLocale from './locales/uzb.json'
import ruLocale from './locales/ru.json'
import enLocale from './locales/en.json'

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/image-edge'],
    app: {
        head: {
            script: [
                {
                    src: '/responsive.voice.js',
                    async: true,
                },
            ],
        },
    },
    i18n: {
        detectBrowserLanguage: false,
        vueI18n: {
            legacy: false,
            globalInjection: true,
            locale: 'uz',
            fallbackLocale: 'uzb',
            messages: {
                en: enLocale,
                uz: uzLocale,
                uzb: uzbLocale,
                ru: ruLocale,
            },
        },
    },
    image: {
        domains: ['localhost:3000', 'back.gis.uz'],
        screens: {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1140,
            '2xl': 1440,
            '3xl': 1680,
        },
    },
    build: {
        transpile: [/echarts/, 'swiper/vue', 'maska'],
    },
    css: ['@/assets/css/app.css', '@/assets/css/tailwind.css'],
})
