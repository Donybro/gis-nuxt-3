import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import uz from '../locales/uz.json'
import uzb from '../locales/uzb.json'
import ru from '../locales/ru.json'


export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'uz',
    fallbackLocale:"uzb",
    messages: {
        en,uz,uzb,ru
    }
})

export default defineNuxtPlugin(({ vueApp }) =>{
    vueApp.use(i18n)
})
