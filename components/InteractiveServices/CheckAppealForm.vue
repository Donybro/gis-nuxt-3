<template>
  <form @submit="onSubmit">
    <div class="grid grid-cols-1 xl:gap-[14px]">
      <div class="form_wrapper my-3">
        <label class="form_label" for="code_request">
          {{ $t("modal.appeal-code") }}
        </label>
        <input
          class="base_input"
          id="code_request"
                    type="text"
                    v-model="code_request"
                    name="code_request"
        />
        <span class="error_message">{{ code_requestError }}</span>
      </div>
      <div class="form_wrapper my-3">
        <label class="form_label" for="code_password">
          {{ $t("modal.appeal-check-code") }}
        </label>
        <input
          id="code_password"
          v-model="code_password"
          class="base_input"
          type="text"
          name="code_password"
        />
        <span class="error_message">{{ code_passwordError }}</span>
      </div>
      <div class="form_wrapper my-3">
        <label class="form_label" for="captcha_is_correct"></label>
        <CustomCapcha
                    id="captcha_is_correct"
                    :clear-form="clearForm"
                    @change="setCaptcha"
        />
        <span class="error_message">{{ captcha_is_correctError }}</span>
      </div>
      <div class="">
        <button
          type="submit"
                    class="px-[70px] py-[20px] hover:text-primary hover:bg-white text-white bg-primary border border-white"
        >
          {{ $t("button.check") }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import CustomCapcha from "~/components/CustomCapcha.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import useValidatorMessages from "../../composables/validatorMessages";

const { handleSubmit, isSubmitting, resetForm } = useForm();

const { requiredValidatorMessage } = useValidatorMessages();
const emit = defineEmits(["create-form"]);

const clearForm = ref(false);

const props = defineProps({
  resetFormFields: Boolean,
});

const { resetFormFields } = toRefs(props);
watch(
  () => resetFormFields.value,
  (val) => {
    if (val) {
      clearForm.value = true;
      resetForm();
    }
  }
);

function onInvalidSubmit({ errors }) {
  console.log(errors, "Errors");
}

const onSubmit = handleSubmit(async (values) => {
  const formData = new FormData();
  Object.keys(values).forEach((k) => {
    formData.append(k, values[k]);
  });
  emit("create-form", formData);
}, onInvalidSubmit);

const { value: code_request, errorMessage: code_requestError } = useField(
  "code_request",
  yup.string().required(requiredValidatorMessage),
  { initialValue: "" }
);

const { value: code_password, errorMessage: code_passwordError } = useField(
  "code_password",
  yup.string().required(requiredValidatorMessage),
  { initialValue: "" }
);

const { value: captcha_is_correct, errorMessage: captcha_is_correctError } =
  useField(
    "captcha_is_correct",
    yup
      .boolean()
      .oneOf([true], requiredValidatorMessage)
      .required(requiredValidatorMessage),
    { initialValue: undefined }
  );

function setCaptcha(val) {
  captcha_is_correct.value = val;
}
</script>

<style scoped></style>
