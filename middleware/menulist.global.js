import {useMenuStore} from "~/store/menu";
import {useSocialMediaStore} from "~/store/socials";
export default defineNuxtRouteMiddleware(async() => {
    const menuStore = useMenuStore()
    const socialsStore = useSocialMediaStore()
    if(!menuStore?.fullMenuList?.length){
        await menuStore.fetchMenuList()
    }
    const socialsIsEmpty = Object.values(socialsStore.getSocials).filter(k=>k!=='').length === 0
    if(socialsIsEmpty){
        await socialsStore.fetchSocials()
    }
})
