<style lang="scss" scoped>
  @import '@/styles/Modal.scss';
</style>

<template>
  <div class="modal" v-if="modal">
    <div class="modal__card">
      <div class="modal__head">
        <h3 class="modal__today">5/9(月)</h3>
        <button><font-awesome-icon icon="fa-solid fa-xmark" /></button>
      </div>
      <div class="modal__time">
        <div class="modal__start">
          <input type="text" placeholder="9:00">
          <button class="modal__set-time">打刻</button>
        </div>
        <div class="modal__end">
          <input type="text" placeholder="18:00">
          <button class="modal__set-time">打刻</button>
        </div>
        <div class="modal__breake">
          <input type="text" placeholder="1:00">
        </div>
      </div>
      <div class="modal__business">
        <textarea class="modal__content" placeholder="業務内容"></textarea>
      </div>
      <div class="modal__register">
        <button>登録</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      holiday: true
    }
  },
  computed: {
    modal() {
      return this.holiday
    }
  },
  methods: {
    async check_modal() {
      await this.$axios.get('holiday').then(response => {
        this.holiday = response.data.holiday
      })
    }
  },
  created() {
    this.check_modal()
  }
}
</script>