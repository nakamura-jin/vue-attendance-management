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
// import axios from 'axios'
export default {
  components: {
    Header,
    Modal
  },
  // methods: {
  //   async holiday() {
  //     await axios.get('/holiday')
  //     .then(response => console.log(response))
  //   }
  // },
  // created() {
  //   this.holiday()
  // }
}
</script>

