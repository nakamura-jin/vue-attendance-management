<style lang="scss" scoped>
  @import '@/styles/Sidebar.scss';
</style>
<template>
  <div class="sidebar" v-if="admin">
    <div class="sidebar__icon">
      <router-link to="/admin/attendance"><font-awesome-icon icon="fa-solid fa-list" class="sidebar__link" /></router-link>
      <router-link to="/workers"><font-awesome-icon icon="fa-solid fa-address-book" class="sidebar__link" /></router-link>
      <router-link to="/register"><font-awesome-icon icon="fa-solid fa-address-card" class="sidebar__link" /></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowHeight: null
    }
  },
  computed: {
    admin() {
      const role = JSON.parse(sessionStorage.getItem('user')).role
      if(role === 1) {
        return true
      }
      return false
    }
  }
}
</script>

<style>

</style>