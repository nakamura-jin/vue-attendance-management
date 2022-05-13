<style lang="scss" scoped>
  @import './attendance.scss';
</style>

<template>
  <div class="attendance">
    <Modal v-if="isModal" @close-modal="closeModal" />
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
import axios from 'axios'

export default {
  mixis: [attendance],
  components: {
    AttendanceTable,
    SelectMonth,
    Modal
  },
  data() {
    return {
      isModal: true
    }
  },
  methods: {
    async checkHoliday() {
      await axios.get('/holiday')
      .then(response => this.holiday = response.data.holiday)
    },
    closeModal() {
      this.isModal = false
    }
  },
  created() {
    this.checkHoliday()
  }
}
</script>