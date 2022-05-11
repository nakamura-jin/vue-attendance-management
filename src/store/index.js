import Vue from 'vue'
import Vuex from 'vuex'
import { attendance } from './modules/attendance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    month: '',
    user: '',
  },
  getters: {
    month: (state) => state.month,
    user: (state) => state.user
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
    },
    USER(state, user) {
      state.user = user
    }
  },
  actions: {
    month({ commit }, month) {
      commit('MONTH',month)
    },
    user({ commit }, user) {
      commit('USER', user)
    }
  },
  modules: { attendance },
});
