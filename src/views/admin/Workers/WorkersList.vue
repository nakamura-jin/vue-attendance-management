<style lang="scss" scoped>
  @import './WorkersList.scss';
</style>

<style lang="scss" scoped>
  @import './WorkersList.scss';
</style>

<template>
  <div class="workers">
    <h3 class="workers__ttl">社員一覧</h3>
    <div class="workers__search">
      <input type="text" />
      <button>社員登録</button>
    </div>
    <table>
      <tr class="workers__header">
        <th>社員番号</th>
        <th>氏名</th>
        <th>フリガナ</th>
        <th>月別リスト</th>
        <th>編集</th>
        <th>削除</th>
      </tr>
      <template v-for="worker in workers">
        <tr :key="worker.id">
          <td>{{ worker.worker_id }}</td>
          <td>{{ worker.name }}</td>
          <td></td>
          <td><font-awesome-icon icon="fa-solid fa-list" class="workers__list" /></td>
          <td><font-awesome-icon icon="fa-solid fa-pen" class="workers__edit" /></td>
          <td><font-awesome-icon icon="fa-solid fa-trash-can" class="workers__delete" /></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      workers: []
    }
  },
  methods: {
    async getWorkers(){
      await axios.get('/admin/workers')
      .then(response => this.workers = response.data.data)
      .catch(err => console.log(err))
    }
  },
  created() {
    this.getWorkers()
  }
}
</script>
