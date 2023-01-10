import {useApi} from "~/composables/useApi";

export const getSurveyList = async function (submenu_slug) {
    const {data} = await useApi(`/api/survey/surveyBySubmenuSlug/`, 'GET', {
        submenu_slug
    })
}
export const checkSite = async function (siteUrl) {
    return useAsyncData(siteUrl + new Date().getSeconds(), () => $fetch('https://cr.gis.uz/api/sites/check', {
        method: "POST", params: {
            siteUrl
        }
    }));
}
