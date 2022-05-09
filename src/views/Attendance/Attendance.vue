<style lang="scss" scoped>
  @import './attendance.scss';
</style>

<template>
  <div class="attendance">
    <h3 class="attendance__ttl">月別リスト</h3>
    <div class="attendance__select">
      <select class="attendance__month">
        <option value="">2022年4月</option>
        <option value="">2022年5月</option>
        <option value="">2022年6月</option>
        <option value="">2022年7月</option>
      </select>
    </div>
    <attendance-table />
  </div>
</template>

<script>
import AttendanceTable from '@/components/AttendanceTable'
export default {
  components: {
    AttendanceTable,
  }
}
</script>