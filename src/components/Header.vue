<style lang="scss" scoped>
  @import '@/styles/Header.scss';
</style>

<template>
  <div class="header">
    <div class="header__container">
      <div class="header__logo">
        <img src="@/assets/img/Logo-large.png" alt="">
      </div>
      <div class="header__nav">
        <p class="header__user">{{ userName }}</p>
        <div class="header__logout">
          <button @click="logout">
            <font-awesome-icon icon="fa-solid fa-user" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      this.$router.push('/login')
    }
  },
  computed: {
    userName() {
      const user = JSON.parse(sessionStorage.getItem('user'))
      return user.name
    }
  }
}
</script>