<style lang="scss" scoped>
  @import '@/styles/Modal.scss';
</style>

<template>
  <div class="modal">
    <div class="modal__card">
      <div class="modal__head">
        <h3 class="modal__today">{{ today }}({{ week }})</h3>
        <button @click="closeModal"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
      </div>
      <div class="modal__time">
        <div class="modal__start">
          <label>開始時間</label>
          <input type="text" disabled :value="start_time">
          <button class="modal__set-time" @click="start(start_time)">打刻</button>
        </div>
        <div class="modal__end">
          <label>終了時間</label>
          <input v-if="!registedStart" type="text" disabled>
          <input v-else type="text" :value="end_time" disabled>
          <button class="modal__set-time" @click="end(end_time)">打刻</button>
        </div>
        <div class="modal__breake">
          <label>休憩時間</label>
          <input type="text" placeholder="1:00">
        </div>
      </div>
      <div class="modal__business">
        <textarea class="modal__content" placeholder="業務内容"></textarea>
      </div>
      <div class="modal__register">
        <button @click="register">登録</button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import loading from '@/mixins/loading'
import attendance from '@/mixins/attendance'
import axios from 'axios'
export default {
  mixins:[loading, attendance],
  data() {
    return {
      today: dayjs().format('M/D'),
      start_time: '9:00',
      end_time: dayjs().format('H:m'),
      breake_time: '1:00',
      registedStart: false,
      timeError: '',
      week: ''
    }
  },
  methods: {
    /**
     * 今日の曜日取得
     */
    setWeek() {
      const today = dayjs().date();
      const todaysWeek = this.checkWeek(dayjs().date(today).format("ddd"))
      this.week = todaysWeek
    },
    /**
     * モーダル閉じる
     */
    closeModal() {
      this.$emit('close-modal')
    },

    /**
     * 開始時間の設定
     */
    start(time) {
      console.log(time)
    },

    /**
     * 終了時間の設定
     */
    end(time) {
      console.log(time)
    },

    /**
     * 登録処理
     */
    async register() {
      this.startLoading()
      const id = JSON.parse(sessionStorage.getItem('user')).id
      const query = {
        year: this.year,
        month: this.month,
        date: this.date,
        start_time: this.start_time,
        user_id: id
      }
      await axios.post(`/work_start/${id}`, query)
      if(!this.registedStart) this.registedStart =true
      setTimeout(() => {
        this.$emit('close-modal')
        this.myAttendance(this.year, this.month)
        this.finishLoading()
      }, 3000)
    }
  },
  created() {
    this.setWeek()
  }
}
</script>