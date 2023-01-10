export const  getEventById =  async function (id){
    return  await useApi(`/api/events/${id}`,'GET')
}

export const  getEventsDataBySlug =  async function (slug,key,page){
    return await useApi(`/api/events/eventBySubmenuSlug/`,'GET',{
        submenu_slug:slug,
        page,
        page_size:10
    },key+page)
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
