
export const attendance = {
  namespaced: true,
  state: {
    attendance: []
  },
  getters: {
    attendance: (state) => state.attendance
  },
  mutations: {
    MY_ATTENDANCR(state, attendance) {
      state.attendance = attendance
    }
  },
  actions: {
    myAttendance({ commit }, attendance) {
      commit("MY_ATTENDANCR", attendance);
    },
  },
};
