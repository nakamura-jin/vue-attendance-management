<template>
  <div class="spinner" v-if="loading">
    <div class="spinner__lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/Loader.scss';
</style>