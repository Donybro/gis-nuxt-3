// export const  getPostById =  async function (id){
//     return  await useApi(`/api/activity/${id}`,'GET')
// }

export const  getStatisticsByType =  async function (type){
    return await useApi(`/api/statistics/`,'GET',{
        type
    },type)
}
export const  getStatisticsForMainPage =  async function (){
    return await useApi(`/api/statistics/forHomePage/`,'GET',{},'getStatisticsForMainPage')
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
