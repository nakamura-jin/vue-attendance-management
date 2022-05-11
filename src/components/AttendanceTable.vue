<style lang="scss" scoped>
  @import '@/styles/AttendanceTable.scss';
</style>

<template>
  <div class="list">
    <table>
      <tr>
        <th class="list__ttl-day">日付</th>
        <th class="list__ttl-start">出勤時間</th>
        <th class="list__ttl-end">退勤時間</th>
        <th class="list__ttl-breake">休憩時間</th>
        <th class="list__ttl-remarks">備考</th>
        <th class="list__ttl-edit">編集</th>
      </tr>
      <tr v-for="(data, index) in setDate" :key="index">
        <td class="list__day">{{ data.day }}({{ data.week }})</td>
        <td class="list__start">{{ getAttendance(data).start_time }}</td>
        <td class="list__end">{{ getAttendance(data).end_time }}</td>
        <td class="list__breake">{{ getAttendance(data).breake_time }}</td>
        <template>
          <td class="list__remarks" v-if="getAttendance(data).remarks">{{ getAttendance(data).remarks | omittedText20}}</td>
          <td class="list__remarks" v-else></td>
        </template>
        <td class="list__edit"><button><font-awesome-icon icon="fa-solid fa-pen" /></button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import week from '@/mixins/week'
import attendance from '@/mixins/attendance'

export default {
  mixins: [week, attendance],
  data() {
    return {
      setDate: [],
      attendanceItem: []
    }
  },
  filters: {
    omittedText20(text) {
      return text.length > 20 ? text.substring(0, 20) + '...' : text;
    },
  },
  computed: {
    setMonth() {
      return this.$store.getters['month']
    },
    attendance() {
      return this.$store.getters['attendance/attendance']
    }
  },
  methods: {
    getAttendance(data){
      let list = {}
      this.attendance.forEach(item => {
        if(item.date === data.day) {
          list = item
        }
      })
      return list
    }
  },
  created() {
    this.createDay()
    this.getUser()
    this.myAttendance(this.year, this.month)
  }
}
</script>