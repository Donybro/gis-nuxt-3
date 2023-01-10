import BASE_URL from "~/helpers/baseURL";
export default function usePhotoPathCreator(){
    function createPhotoPath(path){
        return `${BASE_URL}/${path}`
    }

    return {
        createPhotoPath
    }
}
