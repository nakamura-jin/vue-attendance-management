<style lang="scss" scoped>
  @import './WorkersList.scss';
</style>

<template>
  <div class="workers">
    <h3 class="workers__ttl">社員一覧</h3>
    <div class="workers__search">
      <input type="text" v-model="keyword" placeholder="社員IDもしくは氏名" />
    </div>
    <table>
      <tr class="workers__header">
        <th>社員番号</th>
        <th>氏名</th>
        <th>メールアドレス</th>
        <th>権限</th>
        <th>リスト</th>
        <th>編集</th>
        <th>削除</th>
      </tr>
      <template v-for="worker in filterdWorkers">
        <tr :key="worker.id">
          <td>{{ worker.worker_id }}</td>
          <td>{{ worker.name }}</td>
          <td>{{ worker.email }}</td>
          <td v-if="worker.role === 1">あり</td>
          <td v-else>なし</td>
          <td><font-awesome-icon icon="fa-solid fa-list" class="workers__list" @click="workerAttendance(worker)" /></td>
          <td><font-awesome-icon icon="fa-solid fa-pen" class="workers__edit" @click="workerEdit(worker.id)" /></td>
          <td><font-awesome-icon icon="fa-solid fa-trash-can" class="workers__delete" @click="workerDelete(worker.id)" /></td>
        </tr>
      </template>
    </table>
    <template v-if="deleteModal">
      <transition-group name="fade" type="out-in">
      <div key="modal" class="delete__modal" @click="cancel">
        <div key="modal" class="delete__card" @click.stop>
          <h3  class="delete__ttl">本当に削除しますか？</h3>
          <span class="delete__alert">一度削除すると戻すことはできません。</span>
          <div key="modal" class="delete__select">
            <button class="cancel" @click="cancel">キャンセル</button>
            <button class="destroy" @click="destroy">削除する</button>
          </div>
        </div>
      </div>
      </transition-group>
    </template>
  </div>
</template>

<script>
import attendance from '@/mixins/attendance'
import loading from '@/mixins/loading'
import $http from '@/services/httpService'

export default {
  mixins: [ attendance, loading ],
  data() {
    return {
      workers: [],
      keyword: '',
      deleteModal: false,
      deleteId: null
    }
  },
  computed: {
    /**
     * リアルタイム検索
     */
    filterdWorkers() {
      let arrayWorkers = [];
      for(let i in this.workers) {
        let worker = this.workers[i];
        if(worker.name.indexOf(this.keyword) !== -1 || String(worker.worker_id).indexOf(this.keyword) !== -1) {
          arrayWorkers.push(worker);
        }
      }
      return arrayWorkers
    }
  },
  methods: {
    async getWorkers(){
      const response = await $http.get('/admin/workers')
      this.workers = response.data.data
    },
    workerAttendance(worker) {
      const setAdmin = JSON.parse(sessionStorage.getItem('data')).user.role
      console.log(setAdmin)
      if(setAdmin === 1) {
        sessionStorage.setItem('worker_id', worker.id)
        sessionStorage.setItem('name', worker.name)
        this.myAttendance(this.year, this.month)
        this.$router.push('/worker_list')
      } else return
    },
    workerEdit(id) {
      sessionStorage.setItem('id', id )
      this.$router.push('/worker_edit')
    },

    workerDelete(id) {
      this.deleteId = id
      this.deleteModal = true
    },

    cancel() {
      this.deleteModal = false;
      this.deleteId = null;
    },

    async destroy() {
      this.startLoading()
      await $http.delete(`admin/worker/${this.deleteId}`)
      this.getWorkers()
      this.deleteModal = false
      setTimeout(() => this.finishLoading(), 2000)
    }

  },
  created() {
    this.getWorkers()
  }
}
</script>
