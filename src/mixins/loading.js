export default {
  methods: {
    startLoading() {
      this.$store.commit('START_LOADING')
    },
    finishLoading() {
      this.$store.commit('FINISH_LOADING')
    }
  }
}