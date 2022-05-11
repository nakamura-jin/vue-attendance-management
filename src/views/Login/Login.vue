<style lang="scss" scoped>
  @import './login.scss';
</style>

<template>
  <div class="container">
    <div class="login">
      <div class="login__logo">
        <router-link to="/"><img src="@/assets/img/Logo-large.png" alt=""></router-link>
      </div>
      <h2 class="login__ttl">ログイン</h2>
      <div class="login__form">
        <form @submit.prevent="login">
          <div class="login__card">
            <span v-if="error" class="login__error">{{ error }}</span>
            <template class="login__worker_id">
              <label class="login__input-ttl">社員ID: </label>
              <input type="text" v-model="form.worker_id"/>
            </template>
            <template class="login__password">
              <label class="login__input-ttl">パスワード: </label>
              <input type="password" v-model="form.password"/>
            </template>
            <span class="login__password-forgot">※ パスワードを忘れた場合は担当者へご連絡ください</span>
            <div class="login__button-wrapper">
              <button class="login__button">登録</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '@/mixins/loading'
export default {
  mixins: [loading],
  data() {
    return {
      form: {
        worker_id: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async login() {
      this.startLoading();
      await this.$axios.post('/login', this.form)
      .then(res => {
        this.$cookies.set('token', res.data.access_token)
        setTimeout(() => {
          this.$router.push('/')
          this.finishLoading();
        }, 2000)
      })
      .catch(() => {
        setTimeout(() => {
          this.error = '認証に失敗しました'
          this.finishLoading();
        }, 1000)
      })
    }
  }
}
</script>
