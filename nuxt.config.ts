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
        locales: [
            { code: 'en', file: 'en.json' },
            { code: 'ru', file: 'ru.json' },
            { code: 'uz', file: 'uz.json' },
            { code: 'uzb', file: 'uzb.json' },
        ],
        lazy: true,
        langDir: 'locales',
        defaultLocale: 'uz',
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
        presets: {
            cover: {
                modifiers: { fit: 'cover', format: 'webp' },
            },
            contain: {
                modifiers: { fit: 'contain', format: 'webp' },
            },
        },
    },
    build: {
        transpile: [/echarts/, 'swiper/vue', 'maska'],
    },
    css: ['@/assets/css/app.css', '@/assets/css/tailwind.css'],
})
