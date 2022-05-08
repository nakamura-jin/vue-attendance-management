import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    START_LOADING(state) {
      state.loading = true;
    },
    FINISH_LOADING(state) {
      state.loading = false;
    },
  },
  actions: {},
  modules: {},
});
