import {useApi} from "~/composables/useApi";

export const getPartnersData = async function (){
    return  await useApi('/api/partners/','GET','partners')
}
