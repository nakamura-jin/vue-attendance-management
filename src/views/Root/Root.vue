<template>
  <div class="app-root">
    <Loader />
    <Header />
    <main class="app-main">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Loader from '../../components/Loader.vue'
export default {
  components: {
    Header,
    Loader
  },
}
</script>

