<style lang="scss" scoped>
  @import './Register.scss';
</style>
<template>
  <div class="register">
    <div class="ragister__container">
      <h3 class="register__ttl">社員登録</h3>
      <div class="register__card">
        <validation-observer ref="obs" v-slot="ObserverProps">
          <form class="register__form" @submit.prevent="register">
            <table class="register__table">
              <validation-provider v-slot="{ errors }" rules="required">
                <tr>
                  <th>氏名: </th>
                  <td><input type="text" v-model="form.name" name="氏名"></td>
                </tr>
                <span class="register__error">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider v-slot="{ errors }" rules="required|email">
                <tr>
                  <th>メールアドレス: </th>
                  <td><input type="email" v-model="form.email" name="メールアドレス"></td>
                </tr>
                <span class="register__error">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider v-slot="{ errors }" rules="required">
                <tr>
                  <th>権限付与: </th>
                  <td>
                    <select ref="role" class="register__role" v-model="form.role" name="役職">
                      <option value="0">以下を選択してください</option>
                      <option value="2">なし</option>
                      <option value="1">あり</option>
                    </select>
                  </td>
                </tr>
                <span class="register__error">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider v-slot="{ errors }" rules="required|min:6" vid="password">
                <tr>
                  <th>パスワード: </th>
                  <td><input type="password" v-model="form.password" name="パスワード"></td>
                </tr>
                <span class="register__error">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider v-slot="{ errors }" rules="confirmed:password">
                <tr>
                  <th>パスワード(確認用): </th>
                  <td><input type="password" v-model="form.password_confirmed" name="パスワード確認"></td>
                </tr>
                <span class="register__error">{{ errors[0] }}</span>
              </validation-provider>
            </table>
            <div class="register__button">
              <button type="submit" :disabled="ObserverProps.invalid || !ObserverProps.validated || form.role == 0">登録</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import loading from '@/mixins/loading'
export default {
  mixins: [loading],
  data() {
    return {
      form: {
        name: '',
        email: '',
        role: 0,
        password: '',
        password_confirmed: '',
      }
    }
  },
  methods: {
    async register() {
      this.startLoading()
      await axios.post('/register', this.form)
      .then(() => {
        setTimeout(() => {
          this.$router.push('/workers')
          this.finishLoading()
        }, 3000)
      })
    }
  }
}
</script>
