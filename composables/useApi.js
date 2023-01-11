import BASE_URL from '~/helpers/baseURL'

export const useApi = async (path, method = 'GET', params = {}, key = '', body) => {
    const localeCookie = useCookie('locale')
    const reqLocale = localeCookie?.value || 'uz'
    const requestKey = key ? key + reqLocale : method + path + reqLocale
    return useAsyncData(requestKey, () => $fetch(`${BASE_URL}/${reqLocale}${path}`, { method, params, body }))
}
