<template>
  <div class="rounded-[8px] shadow p-[20px] bg-secondary border border-border_primary ">
    <h1 @click="goToData" class="cursor-pointer text-[.825em] xl:text-[1.285em] text-text_secondary font-montserrat">
      {{ openData?.dataName[locales[$i18n.locale]] }}</h1>
    <p @click="goToData" class="cursor-pointer text-white text-[.7em] xl:text-[1.2em] my-[12px]">
      {{ openData?.orgName[locales[$i18n.locale]] }}</p>
    <span class="text-[1.15em] xl:text-[1.5em] text-text_secondary font-bold">{{ openData?.name }}</span>
    <div class="flex justify-between mt-[10px]">
      <Badge class="hidden xl:block text-white border border-border_primary">
        {{ openData?.sphereName[locales[$i18n.locale]] }}
      </Badge>
      <div class="flex items-center gap-[8px]">
        <a :href="`https://data.egov.uz/apiData/MainData/GetByFile?id=${openData?.structId}&fileType=2&tableType=2`"
           target="_blank" rel="noreferrer" class="file_button">
          xml
        </a>
        <a :href="`https://data.egov.uz/apiData/MainData/GetByFile?id=${openData?.structId}&fileType=4&tableType=2`"
           target="_blank" rel="noreferrer" class="file_button">
          csv
        </a>
        <a :href="`https://data.egov.uz/apiData/MainData/GetByFile?id=${openData?.structId}&fileType=1&tableType=2`"
           target="_blank" rel="noreferrer" class="file_button">
          json
        </a>
        <a :href="`https://data.egov.uz/apiData/MainData/GetByFile?id=${openData?.structId}&fileType=3&tableType=2`"
           target="_blank" rel="noreferrer" class="file_button">
          xls
        </a>
        <a :href="`https://data.egov.uz/apiData/MainData/GetByFile?id=${openData?.structId}&fileType=5&tableType=2`"
           target="_blank" rel="noreferrer" class="file_button">
          rdf
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from "../Badge";

export default {
  name: "OpenDataCard",
  components: {Badge},
  data() {
    return {
      locales: {
        uz: "uzbText",
        uzb: "uzbKrText",
        ru: "rusText",
        en: "engText"
      }
    }
  },
  methods: {
    goToData() {
      window.open(`https://data.egov.uz/data/${this.openData.structId}`, '_blank').focus();
    }
  },
  props: {
    openData: {
      type: Object,
      required: true,
      default: () => ({
        dataName: '',
        name: '',
        orgName: '',
        sphereName: {},
        structId: ''
      })
    }
  }
}
</script>

<style scoped>
.file_button {
  @apply p-[4px] rounded-[4px] border border-text_secondary text-text_secondary
}
</style>
