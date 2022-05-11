<style lang="scss" scoped>
  @import './attendance.scss';
</style>

<template>
  <div class="attendance">
    <h3 class="attendance__ttl">月別リスト</h3>
      <select-month />
      <attendance-table />
  </div>
</template>

<script>
import AttendanceTable from '@/components/AttendanceTable'
import SelectMonth from '@/components/SelectMonth'

export default {
  components: {
    AttendanceTable,
    SelectMonth
  },
}
</script>