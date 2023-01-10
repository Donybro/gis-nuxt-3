<template>
  <section class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <Tab v-model:selectedItem="selectedTab" :tab-items="tabItems" class="mb-[12px]"/>
        <Alert v-if="createAppealAlertData .title" :alert-type="createAppealAlertData?.type"
               :alertData="createAppealAlertData"
               @close="clearAlert"/>
        <Alert v-if="checkAppealAlertData.title || checkAppealAlertData.code_request"
               :alert-type="checkAppealAlertData?.type"
               :alertData="checkAppealAlertData" @close="clearAlert">
          <template v-if="checkAppealAlertData?.code_request">
            <CheckAppealAlertContent :alert-data="checkAppealAlertData"/>
          </template>
        </Alert>
        <div class="grid grid-cols-12">
          <div :class="selectedTab === 'send' ? 'col-span-12':'col-span-12 xl:col-span-6'">
            <AppealForm v-if="selectedTab==='send'" :resetFormFields="resetForm"
                        @create-form="createAppealFormHandler"/>
            <CheckAppealForm v-if="selectedTab === 'check'" :resetFormFields="resetForm"
                             @create-form="checkAppealFormHandler"/>
          </div>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppealForm from "../../components/InteractiveServices/AppealForm";
import CheckAppealForm from "../../components/InteractiveServices/CheckAppealForm";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {checkAppealForm, createAppealForm} from "../../api/createForms";
import {useI18n} from "vue-i18n";
import Alert from "../../components/Alert/Alert";
import CheckAppealAlertContent from "../../components/Alert/CheckAppealAlertContent";
import {useHead} from "nuxt/app";

const {t: $t} = useI18n()
const selectedTab = ref('send')

useHead({
  title: $t('navbar.ozcom-full')
})


const createAppealAlertData = ref({
  title: "",
  type: "",
  titleText: ""
})
const checkAppealAlertData = ref({
  title: "",
  type: "",
  titleText: ""
})


function clearAlert() {
  checkAppealAlertData.value = {
    title: "",
    type: "",
    titleText: ""
  }
  createAppealAlertData.value = {
    title: "",
    type: "",
    titleText: ""
  }
}


const swal = inject("$swal");

const resetForm = ref(false)

const tabItems = computed(() => {
  return [{
    title: $t("form.interactive-service.send-appeal"),
    id: 'send'
  }, {
    title: $t("form.interactive-service.check-appeal"),
    id: 'check',
  }]
})

function scrollToTop() {
  window.scrollTo({top: 0, behavior: "smooth"});
}

async function createAppealFormHandler(formData) {
  try {
    const {data} = await createAppealForm(formData)
    if (data && data.value) {
      const {code_request, code_password} = data?.value
      resetForm.value = true
      clearAlert()
      createAppealAlertData.value = {
        type: "success",
        title: $t('modal.appeal-applied'),
        titleText: `${$t('modal.appeal-code')} : ${code_request},
                   ${$t('modal.appeal-check-code')} : ${code_password}`,
      }
      scrollToTop()
    } else {
      throw  new Error('createAppealFormHandler Error')
    }
  } catch (e) {
    console.log(e)
    clearAlert()
    createAppealAlertData.value = {
      type: "error",
      title: $t('modal.appeal-not-applied'),
    }
    scrollToTop()
  }
}

async function checkAppealFormHandler(formData) {
  try {
    const {data} = await checkAppealForm(formData)
    if (data && data?.value) {
      const {
        code_request,
        created_at,
        full_name,
        email,
        phone,
        region,
        address,
        file,
        text,
        status,
        district,
        attachment_file,
        answer_text
      } = data?.value
      clearAlert()
      checkAppealAlertData.value = {
        type: "done",
        code_request,
        created_at,
        full_name,
        email,
        phone,
        region,
        district,
        address,
        file,
        text,
        status,
        answer_text,
        attachment_file
      }
      scrollToTop()
    } else {
      throw  new Error('checkAppealFormHandler Error')
    }
  } catch (e) {
    console.log(e)
    clearAlert()
    checkAppealAlertData.value = {
      type: "error",
      title: $t('modal.appeal-not-applied'),
    }
    scrollToTop()
  }
}

</script>

<style>
.swal_timerProgressBar {
  background: #0eba0c !important;
}

.swal_popup {
  opacity: 100% !important;
  border: 2px solid #3C3971 !important;
}
</style>
