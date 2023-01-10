export default function usePaginationOptions(initialPageSizeOptions = [10,15,20], ){
    const router = useRouter()
    const route = useRoute()
    const allPagesCount = ref(0)
    const currentPage = ref(1)
    const pageSizeOptions = ref(initialPageSizeOptions)
    const pageSize = ref(pageSizeOptions.value[0])

    initializeQueriesFromURL()

    function setPageSize(val){
        pageSize.value =  val
    }
    function setCurrentPage(val){
        currentPage.value =  val
    }

    function initializeQueriesFromURL() {
          const {page, page_size} = route?.query;
          if (page) {
              currentPage.value = +page
          }
          if (page_size) {
            pageSize.value = +page_size
          }
    }

    watch(()=>pageSize.value,(page_size)=>{
        if(page_size) {
            router.push({
                path: route.path,
                query: {
                    ...route?.query,
                    page_size
                }
            })
        }
    })
    watch(()=>currentPage.value,(page)=>{
        if(page) {
            router.push({
                path: route.path,
                query: {
                    ...route?.query,
                    page
                }
            })
        }
    })

    return {
        allPagesCount,
        currentPage,
        pageSizeOptions,
        pageSize,
        setPageSize,
        setCurrentPage
    }

}
