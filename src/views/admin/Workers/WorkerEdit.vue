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
import loading from '@/mixins/loading'
import $http from '@/services/httpService'
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
      const query = { id: this.id }
      const response = await $http.get('/admin/worker', query)
      this.form.name = response.data.worker[0].name
      this.form.email = response.data.worker[0].email
      this.form.role = response.data.worker[0].role
    },

    async edit() {
      this.startLoading()
      await $http.put(`/admin/worker/${this.id}`, this.form)
      this.$router.push('/workers')
      setTimeout(() => this.finishLoading(), 1000)
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
