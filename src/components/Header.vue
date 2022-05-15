<style lang="scss" scoped>
  @import '@/styles/Header.scss';
</style>

<template>
  <div :class="{ header__admin : admin , header : !admin }">
    <div class="header__container">
      <div class="header__logo">
        <img v-if="admin" src="@/assets/img/logo-green.png" alt="">
        <img v-else src="@/assets/img/logo-white.png" alt="">
      </div>
      <div class="header__nav">
        <p :class="{ header__admin_name : admin, header__user_name : !admin }">{{ userName }}</p>
        <div :class="{ header__admin_logout : admin, header__logout : !admin }">
          <button @click="show = !show">
            <font-awesome-icon icon="fa-solid fa-user" />
          </button>
        </div>
        <transition name="fade" type="out-in">
          <div class="header__tab" v-if="show">
            <button @click="openModal">モーダル</button>
            <button @click="logout">ログアウト</button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    openModal(){
      this.$store.dispatch('attendance/changeModal', true)
      this.show = false
    },
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
    },
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