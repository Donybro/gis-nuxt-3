import BASE_URL from '~/helpers/baseURL'

export const useFetchApi = async (path, method = 'GET', params = {}) => {
    const localeCookie = useCookie('locale')
    const reqLocale = localeCookie?.value || 'uz'
    return await $fetch(`${BASE_URL}/${reqLocale}${path}`, { method, params })
}
