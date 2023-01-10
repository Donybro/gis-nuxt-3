export const  getConnectionStaticFields =  async function (){
    return  await useApi(`/api/contact/staticfields/`,'GET',{},'/api/contact/staticfields/')
}

export const  getConnectionDataBySlug =  async function ({slug},key){
    return await useApi(`/api/contact/helplineBySubmenu/`,'GET',{
        submenu_slug:slug,
    },key)
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