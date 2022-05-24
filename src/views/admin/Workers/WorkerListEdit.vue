<style lang="scss" scoped>
  @import './WorkerListEdit.scss';
</style>
<template>
  <div class="list-edit">
    <div class="list-edit__container">
      <h3 class="list-edit__ttl">社員名</h3>
      <div class="list-edit__card">
        <form class="list-edit__form" @submit.prevent="updateList">
          <table>
            <tr>
              <th>開始時間</th>
              <td><input type="text" v-model="form.start" /></td>
            </tr>
            <tr>
              <th>終了時間</th>
              <td><input type="text" v-model="form.end" /></td>
            </tr>
            <tr>
              <th>休憩時間時間</th>
              <td><input type="text" v-model="form.breake" /></td>
            </tr>
            <tr>
              <th>備考</th>
              <td><textarea v-model="form.remarks"></textarea></td>
            </tr>
          </table>
          <div class="list-edit__button">
            <button type="submit">登録</button>
          </div>
        </form>
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
        start: null,
        end: null,
        breake: null,
        remarks: ''
      },
      id: this.$route.params.id,
      year: this.$route.params.year,
      month: this.$route.params.month,
      date: this.$route.params.day,
      listData: []
    }
  },
  methods: {
    async getWorkerEditData() {
      const query = {
        year: this.year,
        month: this.month,
        date: this.date
      }

      const response = await $http.get(`/admin/worker_list/${this.id}`, query)
      this.listData = response.data.attendance
      this.form.start = this.listData[0].start_time
      this.form.end = this.listData[0].end_time
      this.form.breake = this.listData[0].breake_time
      this.form.remarks = this.listData[0].remarks
    },

    async updateList() {
      this.startLoading()
      const query = {
        year: this.year,
        month: this.month,
        date: this.date,
        start_time: this.form.start,
        end_time: this.form.end,
        breake: this.form.breake,
        remarks: this.form.remarks
      }
      await $http.put(`/admin/worker_list/${this.id}`, query)
      this.$router.push('/worker_list')
      setTimeout(() => this.finishLoading(), 1000)
    }
  },
  created() {
    this.getWorkerEditData()
  }
}
</script>