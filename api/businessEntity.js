// /api/business_entity/businessEntityBySubmenuSlug/?submenu_slug=/test/business_entity/
export const  getBusinessEntityBySlug =  async function (slug,key,page){
    return await useApi(`/api/business_entity/businessEntityBySubmenuSlug/`,'GET',{
        submenu_slug:slug,
        page,
        page_size:10
    },key+page)
}
export const  getBusinessEntityById=  async function (id){
    return await useApi(`/api/business_entity/${id}`,'GET',id)
}
