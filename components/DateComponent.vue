<template>
<!--  <client-only>-->
<!--  <flat-pickr-->
<!--    class="base_input"-->
<!--    :model-value="date"-->
<!--    :config="{...config,...configs}"-->
<!--    @change="changeHandler"-->
<!--    @input="$emit('update:date', $event.target.value)"-->
<!--  />-->
<!--  </client-only>-->
</template>

<script>
// import flatPickr from 'vue-flatpickr-component';
// import {UzbekLatin} from 'flatpickr/dist/l10n/uz_latn';

export default {
  name: 'DateComponent',
  components: {},
  props: {
    configs: {
      type: Object,
      default: () => ({}),
    },
    date: {
      type: [String, Object],
      default: () => new Date(),
    },
  },
  emits: ['update:date'],
  data() {
    return {
      config: {
        // locale: UzbekLatin,
        dateFormat: 'd.m.Y',
      },
    };
  },
  methods: {
    changeHandler: function (selectedDates, dateStr, instance) {
      // console.log(selectedDates);
      // console.log(dateStr);
      // console.log(instance);
    },
  },
};
</script>

<style scoped>

</style>