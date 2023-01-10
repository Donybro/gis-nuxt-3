<template>
 <div class="">
   <FooterTop/>
   <FooterBottom class="hidden xl:grid"/>
 </div>
</template>

<script>
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";
export default {
  name: "Footer",
  components: {FooterBottom, FooterTop}
}
</script>

<style scoped>

</style>
