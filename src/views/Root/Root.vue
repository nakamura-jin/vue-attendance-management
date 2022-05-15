<style type="scss" scoped>
  @import './Root.scss';
</style>
<template>
  <div class="app-root">
    <Loader />
    <Header />
    <div class="app-wrapper">
      <aside class="app-side">
        <Sidebar />
      </aside>
      <main class="app-main">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Loader from '../../components/Loader.vue'
import Sidebar from '../../components/Sidebar.vue'
export default {
  components: {
    Header,
    Loader,
    Sidebar
  },
}
</script>

