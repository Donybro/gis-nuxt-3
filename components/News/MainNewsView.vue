<template>
  <div class="" v-if="mainNews">
    <h1 class="section_title">{{$t('main-page.news')}}</h1>
    <div class="grid grid-cols-12 gap-[28px]">
      <div class="col-span-12 xl:col-span-9">
        <NewsBigCard :news="mainNews" @click="onNewsCardClick"/>
      </div>
      <div class="col-span-12 xl:col-span-3 mt-[30px] xl:mt-0">
          <div class="flex flex-col gap-[16px]">
            <NewsListItem v-for="news in secondaryNewsList" :key="news.id" :news="news" @click="onNewsCardClick"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NewsBigCard from "./NewsBigCard";
import NewsListItem from "./NewsListItem";
import {getMainPageNews} from "../../api/getInfoServiceData";

const mainNews = ref(null)
const secondaryNewsList = ref(null)
const router = useRouter()


const { locale} = useI18n()

watch( () => locale.value, async()=>{
  const {data} = await getMainPageNews()
  if(data?.value){
    const [main,...otherNewsList] = data?.value
    mainNews.value = main
    secondaryNewsList.value = otherNewsList
  }

})

const {data} = await getMainPageNews()
if(data?.value){
  const [main,...otherNewsList] = data?.value
  mainNews.value = main
  secondaryNewsList.value = otherNewsList
}


function onNewsCardClick(newsid){
  router.push(`/info_service/${newsid}`)
}

</script>

<style scoped>

</style>
