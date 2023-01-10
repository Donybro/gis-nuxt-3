import {useApi} from "~/composables/useApi";

export const getSurveyList =  async function (submenu_slug){
    return await useFetchApi(`/api/survey/surveyBySubmenuSlug/`,'GET',{
        submenu_slug
    })
}
export const answerToSurveyList =  async function (formData){
    return await useApi(`/api/survey/answer/`,'POST',{},'answeredSurveyList'+Date.now(),formData)
}
