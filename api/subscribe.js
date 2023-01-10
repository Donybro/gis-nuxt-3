import {useApi} from "~/composables/useApi";

export const subscribe =  async function (email){
    return  await useApi(`/api/distribution/subscribe/`,'POST',{},email,email)
}

export const unsubscribe =  async function (email){
    return await useApi(`/api/distribution/unsubscribe/${email}`,'DELETE',{},email,{
        email
    })
}
