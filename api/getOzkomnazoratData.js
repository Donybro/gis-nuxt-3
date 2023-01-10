export const getOzkomAboutBySlug = async function ({slug},key){
    return  await useApi('/api/about/aboutBySubmenuSlug/','GET',{
        submenu_slug: slug
    },key)
}

export const  getOzkomEmployeeBySlug =  async function ({slug},key,page){
    return  await useApi('/api/employee/employeeBySlug/','GET',{
        submenu_slug:slug,
        page,
        page_size:4
    },key+page)
    // return  await useFetchApi('/api/employee/employeeBySlug/','GET',{
    //     submenu_slug:slug,
    //     page,
    //     page_size:4
    // })
}
export const  getOzkomStructureBySlug =  async function ({slug},key){
    return  await useApi('/api/about/structure/organizationalStructureBySubmenuSlug/','GET',{
        submenu_slug:slug
    },key)
}

export const  getOzkomVacancies =  async function (page){
    return  await useApi('/api/employee/vacancy/vacancy/','GET',{
        page,
        page_size:5
    },'vacancy/vacancy'+page)
    // return  await useFetchApi('/api/employee/vacancy/vacancy/','GET',{
    //     page,
    //     page_size:5
    // })
}
export const  sendResume=  async function (formData){
    return  await useApi('/api/employee/send_vacancy_resume/','POST',{},'sendResume',formData)
}

export const  getOzkomVacancyById =  async function (id){
    return  await useApi(`/api/employee/vacancy/vacancy/${id}/`,'GET')
}


export const  getLogoBySlug =  async function ({slug}){
    return  await useApi('/api/about/aboutLogoBySubmenuSlug','GET',{
        submenu_slug:slug
    },'logo')
}
