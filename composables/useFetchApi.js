import BASE_URL from "~/helpers/baseURL";


export const useFetchApi = async (path,method="GET",params={}) => {
    const localeCookie = useCookie('locale')
    const reqLocale = localeCookie?.value || 'uz'

    console.log(reqLocale)
    return await $fetch( `${BASE_URL}/${reqLocale}${path}`, {method, params});
}
