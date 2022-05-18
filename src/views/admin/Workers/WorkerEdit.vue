<style lang="scss" scoped>
  @import './WorkerEdit.scss';
</style>

<template>
  <div class="edit">
    <div class="edit__container">
      <h3 class="edit__ttl">社員情報編集</h3>
      <div class="edit__card">
        <validation-observer ref="edit" v-slot="EditProps">
          <form class="edit__form" @submit.prevent="edit">
            <table class="edit__table">
              <validation-provider v-slot="{ errors }" rules="required">
                <tr>
                  <th>氏名: </th>
                  <td><input type="text" v-model="form.name" name="氏名"></td>
                </tr>
                <span class="edit__error">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider v-slot="{ errors }" rules="required|email">
                <tr>
                  <th>メールアドレス: </th>
                  <td><input type="email" v-model="form.email" name="メールアドレス"></td>
                </tr>
                <span class="edit__error">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider v-slot="{ errors }" rules="required">
                <tr>
                  <th>権限付与: </th>
                  <td>
                    <select class="edit__role" v-model="form.role" name="役職">
                      <option value="2">なし</option>
                      <option value="1">あり</option>
                    </select>
                  </td>
                </tr>
                <span class="edit__error">{{ errors[0] }}</span>
              </validation-provider>
            </table>
            <div class="edit__button">
              <button type="submit" :disabled="EditProps.invalid">登録</button>
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
        role: null,
      },
      id: null,
      user: [],
      text: '',
    }
  },
  methods: {
    async getWorkerData() {
      this.id = sessionStorage.getItem('id')
      await axios.get('/admin/worker', {
        params: {
          id: this.id
        }
      })
      .then(response => {
        this.form.name = response.data.worker[0].name
        this.form.email = response.data.worker[0].email
        this.form.role = response.data.worker[0].role
      })
    },

    async edit() {
      this.startLoading()
      await axios.put(`/admin/worker/${this.id}`, this.form)
      setTimeout(() => {
        this.$router.push('/workers')
        this.finishLoading()
      }, 3000)
    },
  },
  created() {
    this.getWorkerData()
  },
  computed: {
    check() {
      return true
    }
  }
}
</script>
