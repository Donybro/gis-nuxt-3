<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup >
const {locale} = useI18n()
const localeCookie = useCookie('locale')
if(localeCookie.value){
  locale.value = localeCookie.value
}

</script>
