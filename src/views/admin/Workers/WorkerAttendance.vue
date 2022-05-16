<style lang="scss" scoped>
  @import './WorkerAttendance.scss';
</style>

<template>
  <div class="attendance">
    <Modal />
    <h3 class="attendance__ttl">{{ name }}</h3>
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
  },
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = sessionStorage.getItem('name')
  }
}
</script>