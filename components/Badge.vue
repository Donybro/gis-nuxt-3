  <template>
  <div class="px-[10px] py-[5px] rounded-[4px]" :class="$attrs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Badge"
}
</script>

<style scoped>

</style>
