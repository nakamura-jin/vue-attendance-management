<style lang="scss" scoped>
  @import '@/styles/SelectMonth.scss';
</style>

<template>
  <div class="select">
    <select class="select__month" v-model="setMonth">
      <option v-for="(month, index) in selectMonth" :key="index">{{month}}</option>
    </select>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import attendance from '@/mixins/attendance'

export default {
  mixins: [attendance],
  data() {
    return {
      selectMonth: [],
      setMonth: dayjs().format('YYYY年M月')
    }
  },
  created() {
    this.$store.dispatch('month', dayjs().format('YYYY年M月'))
    this.createSelectMonth()
  },
  watch: {
    setMonth(nVal) {
      this.$store.dispatch('month', nVal)
      this.changeList(nVal)
    }
  },
  methods: {
    createSelectMonth() {
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
      this.selectMonth = set
    }
  }
}
</script>

<style>

</style>