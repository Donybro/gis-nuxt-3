import { useFetchApi } from '~/composables/useFetchApi'
import { useApi } from '#imports'

import useMenuNames from '~/composables/useMenuNames'

export default function useMenuList() {
    const { locale } = useI18n()
    const menuList = ref([])
    const { OZCOM, ACTIVITY, INTERACTIVE_SERVICES, EVENTS, INFORMATION_SERVICE, NETWORK } = useMenuNames()
    const shortMenuNames = [OZCOM, ACTIVITY, INTERACTIVE_SERVICES, EVENTS, INFORMATION_SERVICE, NETWORK]

    async function getMenuList() {
        menuList.value = await useFetchApi('/api/menu/')
    }

    const shortMenuList = computed(() =>
        menuList.value.filter((m) => {
            return shortMenuNames.includes(m.name)
        })
    )

    watch(
        () => locale.value,
        async (val) => {
            await getMenuList()
        }
    )
    onMounted(async () => {
        await getMenuList()
    })

    watch(
        () => menuList.value,
        (val) => {
            console.log(val)
        }
    )

    const getMenuByMenuName = (menuName) => {
        return menuList.value.filter((m) => m.name === menuName)[0]
    }
    return {
        menuList,
        shortMenuList,
        getMenuByMenuName,
    }
}
