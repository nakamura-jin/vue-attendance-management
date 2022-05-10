<style lang="scss" scoped>
  @import './attendance.scss';
</style>

<template>
  <div class="attendance">
    <h3 class="attendance__ttl">月別リスト</h3>
    <div class="attendance__select">
      <!-- <v-select class="attendance__month" :options="setMonth" v-model="tMonth">
      </v-select> -->
      <select class="attendance__month" v-model="tMonth">
        <option v-for="(month, index) in setMonth" :key="index">{{month}}</option>
      </select>
    </div>
    <attendance-table />
  </div>
</template>

<script>
import AttendanceTable from '@/components/AttendanceTable'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      setMonth: [],
      tMonth: dayjs().format('YYYY年M月')
    }
  },
  components: {
    AttendanceTable,
  },
  created() {
    let year = dayjs().year()
    let month = dayjs().month()
    let set = []
    // 4月を年度始めに設定。念の為前年の3ヶ月前まで遡れるように。
    if(4 <= month) {
      for(let i = 1; i <= 15; i++) {
        if(i >= 13) set.push((year + 1) + '年' + (i -12) + '月')
        else set.push(year + '年' + i + '月')
      }
    } else {
      for(let i = 1; i <= 15; i++) {
        if(i >= 13) set.push(year + '年' + (i - 12) + '月')
        else set.push((year - 1) + '年' + i + '月')
      }
    }
    this.setMonth = set
  },
}
</script>