export const  getDocsById =  async function (id){
    return  await useApi(`/api/documents/${id}`,'GET')
}

export const  getDocumentsBySlug =  async function (slug,key,title=null,year=null,page){
    return await useApi(`/api/documents/documentPostBySubmenuSlug/`,'GET',{
        submenu_slug:slug,
        title:title,
        year:year,
        page,
        page_size:10,
    },key+slug+year+title+page)
    // return await useFetchApi(`/api/documents/documentPostBySubmenuSlug/`,'GET',{
    //     submenu_slug:slug,
    //     title:title,
    //     year:year,
    //     page,
    //     page_size:10
    // })
}

// export const  getInfoServiceAdditionalInfoBySlug =  async function ({slug}){
//     return  await useApi(`/api/information_service/additionalInfoBySlug/`,'GET',{
//         submenu_slug:slug
//     })
// }

//
// export const  getInfoServiceById =  async function (id){
//     return  await useApi(`/api/information_service/${id}`,'GET')
// }
//
// export const getImagesCategory = async function (){
//     return await useApi(`/api/photos/photos/`,'GET')
// }
// export const getImageById = async function (id){
//     return await useApi(`/api/photos/photos/${id}`,'GET')
// }
// export const getVideos = async function (){
//     return await useApi(`/api/photos/videos/`,'GET')
// }
