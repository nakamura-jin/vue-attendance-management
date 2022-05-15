<style lang="scss" scoped>
  @import '@/styles/Modal.scss';
</style>

<template>
  <div class="modal" v-if="isModal" @click="hideModal">
    <div class="modal__card" @click.stop>
      <div class="modal__head">
        <h3 class="modal__today">{{ today }}({{ week }})</h3>
        <button @click="closeModal"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
      </div>
      <div class="modal__time">
        <div class="modal__start">
          <label>開始時間</label>
          <input type="text" v-model="start_time">
          <button class="modal__set-time" @click="start()">打刻</button>
        </div>
        <div class="modal__end">
          <label>終了時間</label>
          <input type="text" v-model="end_time">
          <button class="modal__set-time" @click="end(end_time)">打刻</button>
        </div>
        <div class="modal__breake">
          <label>休憩時間</label>
          <input type="text" v-model="breake_time">
        </div>
      </div>
      <div class="modal__business">
        <textarea class="modal__content" placeholder="業務内容" v-model="remarks"></textarea>
      </div>
      <div class="modal__register">
        <button v-if="started" @click="register">登録</button>
        <button v-else @click="sheetUpdate(end_time, breake_time)">登録済み</button>
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
      start_time: null,
      end_time: null,
      breake_time: null,
      remarks: '',
      registedStart: false,
      timeError: '',
      week: '',
    }
  },
  computed: {
    isModal() {
      return this.$store.getters['attendance/modal']
    },
    started() {
      const list = this.$store.getters['attendance/attendance']
      for(let i = 0; i < list.length; i++) {
        if(list[i].date === dayjs().date()) {
          this.$store.dispatch('attendance/setTodaySheet', list[i].id)
          return false
        }
      }
      return true
    }
  },
  methods: {

    hideModal() {
      this.$store.dispatch('attendance/changeModal', false)
    },

    /**
     * 今日の曜日取得
     */
    setWeek() {
      const today = dayjs().date();
      this.week = this.checkWeek(dayjs().date(today).format("ddd"))
    },
    /**
     * モーダル閉じる
     */
    closeModal() {
      this.$store.dispatch('attendance/changeModal', false)
    },

    /**
     * 開始時間の設定
     */
    start() {
      this.start_time = dayjs().format('H:mm')
    },

    /**
     * 終了時間の設定
     */
    end() {
      this.end_time = dayjs().format('H:mm')
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
      if(!this.registedStart) this.registedStart = true
      setTimeout(() => {
        this.$store.dispatch('attendance/changeModal', false)
        this.myAttendance(this.year, this.month)
        this.finishLoading()
      }, 3000)
    },

    /**
     * 休憩時間の登録、終了時間の登録
     */
    async sheetUpdate(end_time, breake_time, remarks) {
      const query = {
        id: this.$store.getters['attendance/sheet_id'],
        end_time: end_time,
        breake_time: breake_time,
        remarks: remarks
      }

      await axios.put(`work/${query.id}`, query)
      setTimeout(() => {
        this.$store.dispatch('attendance/changeModal', false)
        this.myAttendance(this.year, this.month)
        this.finishLoading()
      }, 3000)
    }
  },
  created() {
    this.setWeek()
  },
}
</script>