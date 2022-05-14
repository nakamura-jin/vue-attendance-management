export const attendance = {
  namespaced: true,
  state: {
    modal: false,
    attendance: [],
    dateList: [],
    sheet_id: null
  },
  getters: {
    attendance: (state) => state.attendance,
    dateList: (state) => state.dateList,
    modal: (state) => state.modal,
    sheet_id: (state) => state.sheet_id,
  },
  mutations: {
    MY_ATTENDANCR(state, attendance) {
      state.attendance = attendance;
    },
    DATE_LIST(state, date) {
      state.dateList = date;
    },
    IS_MODAL(state, modal) {
      state.modal = modal;
    },
    TODAY_SHEET_ID(state, id) {
      state.sheet_id = id;
    }
  },
  actions: {
    myAttendance({ commit }, attendance) {
      commit("MY_ATTENDANCR", attendance);
    },
    createDateList({ commit }, dateList) {
      commit("DATE_LIST", dateList);
    },
    changeModal({ commit }, modal) {
      commit("IS_MODAL", modal);
    },
    setTodaySheet({ commit }, id) {
      commit("TODAY_SHEET_ID", id);
    },
  },
};
