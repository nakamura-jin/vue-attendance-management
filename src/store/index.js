import Vue from 'vue'
import Vuex from 'vuex'
import { attendance } from './modules/attendance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    month: ''
  },
  getters: {
    month: (state) => state.month
  },
  mutations: {
    START_LOADING(state) {
      state.loading = true;
    },
    FINISH_LOADING(state) {
      state.loading = false;
    },
    MONTH(state, month) {
      state.month = month
    }
  },
  actions: {
    month({ commit }, month) {
      commit('MONTH',month)
    }
  },
  modules: { attendance },
});
