<template>
  <div id="app">
    <Loader />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
export default {
  components: {
    Loader
  },
}
</script>

<style lang="scss">
  @import "@/styles/global.scss";
  @import "@/assets/css/reset.scss";
</style>