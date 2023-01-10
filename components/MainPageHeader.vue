<template>
  <header class="relative">
    <div class="fixed z-[10] top-0 mt-[152px] w-[60px] h-full hidden 3xl:block left-[43px]">
      <HeaderSocial :socials="socials"/>
    </div>
    <div class="gradient-overlay"></div>
    <video autoplay muted="muted" loop src="/video/headerVideo.webm"></video>
  </header>
</template>

<script setup>
import HeaderSocial from "./HeaderSocial";
import {useSocialMediaStore} from "../store/socials";

const socialMediaStore = useSocialMediaStore()

const socials = ref({})

if (socialMediaStore.getSocials.facebook || socialMediaStore.getSocials.instagram) {
  console.log(socialMediaStore.getSocials)
  socials.value = {...socialMediaStore.getSocials}
} else {
  await socialMediaStore.fetchSocials()
  socials.value = {...socialMediaStore.getSocials}
}


</script>

<style scoped>

header {
  position: relative;
  color: white;
  width: 100%;
  height: calc(100vh);
  /*height:  100vh;*/
  overflow: hidden;
}

/*.header-content{*/
/*  width: 100%;*/
/*  position: absolute;*/
/*  height: 100%;*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: center;*/
/*  z-index: 6;*/
/*  left: auto;*/
/*  right: auto;*/
/*}*/
/*.header-content h1{*/
/*  font-family: 'Montserrat', sans-serif;*/
/*  font-weight: 700;*/
/*  font-size: 64px;*/
/*  line-height: 78px;*/
/*  margin-bottom: 16px;*/
/*}*/
/*.header-content p {*/
/*  font-family: 'Roboto',sans-serif;*/
/*  font-weight: 400;*/
/*  font-size: 24px;*/
/*  line-height: 140%;*/
/*  margin-bottom: 36px;*/
/*}*/
/*.header-content button{*/
/*  font-family: 'Inter',sans-serif;*/
/*  display: inline;*/
/*  padding: 20px 48px;*/
/*  border: 2px solid #FFFFFF;*/
/*  box-sizing: border-box;*/
/*}*/


/* Update this */
.gradient-overlay {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(83.34deg, rgba(23, 17, 66, 0.8) -4.52%, rgba(12, 47, 117, 0) 100%);
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  z-index: 1;
  object-fit: cover;
}
</style>
