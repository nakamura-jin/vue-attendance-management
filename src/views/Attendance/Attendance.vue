<style lang="scss" scoped>
  @import './attendance.scss';
</style>

<template>
  <div class="attendance">
    <Modal />
    <h3 class="attendance__ttl">月別リスト</h3>
      <select-month />
      <attendance-table />
  </div>
</template>

<script>
import AttendanceTable from '@/components/AttendanceTable'
import SelectMonth from '@/components/SelectMonth'
import attendance from '@/mixins/attendance'
import Modal from '@/components/Modal.vue'

export default {
  mixis: [attendance],
  components: {
    AttendanceTable,
    SelectMonth,
    Modal
  }
}
</script>