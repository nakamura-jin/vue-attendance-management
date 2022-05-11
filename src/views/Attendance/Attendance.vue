<style lang="scss" scoped>
  @import './attendance.scss';
</style>

<template>
  <div class="attendance">
    <h3 class="attendance__ttl">月別リスト</h3>
      <select-month
        :year="year"
        :month="month"
      />
      <attendance-table />
  </div>
</template>

<script>
import AttendanceTable from '@/components/AttendanceTable'
import SelectMonth from '@/components/SelectMonth'
import week from '@/mixins/week'

export default {
  components: {
    AttendanceTable,
    SelectMonth
  },
  mixins: [week]
}
</script>