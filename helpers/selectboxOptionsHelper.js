export function addEmptyItemToSelectAllFilterOptions(list,showBy,trackBy,text){
    return [...list,{
        [showBy]:text,
        [trackBy]:''
    }]
}
