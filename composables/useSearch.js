export default function useSearch(){
    const  searchHandler = (q, content,type)=> {
        let textToSearch = q
        let paragraph = content
        textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        let pattern = new RegExp(`${textToSearch}`, "gi");

        let result = paragraph?.toLowerCase().indexOf(textToSearch.toLowerCase())
        let resultContent;
        if(paragraph.length >70 && type=== 'description'){
            result = result - 20
            if (result) {
                paragraph = paragraph.substring(result, result + 100)
            }
            let res = paragraph?.replace(pattern, match => { return `<mark>${match}</mark>` })
            resultContent = `...${res}...`
        }
        else {
            resultContent = paragraph?.replace(pattern, match => { return `<mark>${match}</mark>` })
        }
        return resultContent


    }

    const getSearch = async (search)=>{
        const filter = {
            query: search || '',
        }
        const {data} =  await useApi(`/api/search/`,'GET',{
            q:search
        },search)
        let post = data.value.results

        post = post.map((n, i) => {
            n.description ? n.description = searchHandler(filter.query, n.description,'description')  : ''
            n.title ? n.title = searchHandler(filter.query, n.title) : ''
            return n
        })

        return post
    }

    return {
        getSearch
    }
}
