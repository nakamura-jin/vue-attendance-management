<template>
  <div class="app-root">
    <Modal />
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
import Modal from '@/components/Modal'

export default {
  components: {
    Header,
    Modal
  },
}
</script>

