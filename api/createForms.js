import BASE_URL from "~/helpers/baseURL";
import {useAsyncData} from "nuxt/app";
import {useApi} from "~/composables/useApi";

export async function createContactForm(formData){
    return await useApi('/api/contact/create_form/','POST',{},'createContactForm',formData)
}
export async function createAppealForm(formData) {
    return await useApi('/api/appeals/create/','POST',{},'createAppealForm',formData)
}
export async function checkAppealForm(formData){
    return await useApi('/api/appeals/check/','POST',{},'checkAppealForm',formData)
}
export async function errorText(formData){
    return useAsyncData('errorText',() => $fetch(`${BASE_URL}/api/error_text/create/`,{method:'POST',body:formData}));
}
