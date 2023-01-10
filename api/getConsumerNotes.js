export const  getNoteForConsumerBySlug =  async function ({slug},key){
    return await useApi(`/api/consumers/noteForConsumerBySubmenuSlug/`,'GET',{
        submenu_slug:slug,
    },key)
}
