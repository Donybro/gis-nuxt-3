import {useFetchApi} from "~/composables/useFetchApi";

export const  getRegionsList =  async function (){
    return  await useApi(`/api/employee/region/regions/`,'GET',{},'regions')
}

export const  getDistrictsByRegionId =  async function (region_id){
    return  await useApi(`/api/employee/district/byRegionId/`,'GET',{
        region_id
    },'districts'+region_id)
}
export const  getRegionInspectorById =  async function (region_id){
    return  await useApi(`/api/employee/territory/territorialInspectionByRegionId/`,'GET',{
        region_id
    },region_id)

    // return  await useFetchApi(`/api/employee/territory/territorialInspectionByRegionId/`,'GET',{
    //     region_id
    // })
}
