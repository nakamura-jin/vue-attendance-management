<style lang="scss" scoped>
  @import './login.scss';
</style>

<template>
  <div class="container">
    <div class="login">
      <div class="login__logo">
        <img src="@/assets/Logo-large.png" alt="">
      </div>
      <h2 class="login__ttl">ログイン</h2>
      <div class="login__form">
        <form @submit.prevent="login">
          <div class="login__card">
            <template class="login__worker_id">
              <label class="login__input-ttl">社員ID: </label>
              <input type="text" v-model="form.worker_id"/>
            </template>
            <template class="login__password">
              <label class="login__input-ttl">パスワード: </label>
              <input type="password" v-model="form.password"/>
            </template>
            <router-link to="/" class="login__password-change">パスワード変更はこちら</router-link>
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
import axios from "axios"
export default {
  data() {
    return {
      form: {
        worker_id: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      await axios.post('/login', this.form)
      .then(res => {
        this.$cookies.set('token', res.data.access_token)
        //権限者者beforeEarchで権限確認して遷移先決める
        this.$router.push('#')
      })
    }
  }
}
</script>
