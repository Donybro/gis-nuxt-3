import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        setTimeout(() => {
            window.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }, 0)
    })
})
