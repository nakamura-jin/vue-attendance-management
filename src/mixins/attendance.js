import dayjs from "dayjs";

export default {
  data() {
    return {
      year: parseInt(dayjs().format("YYYY")),
      month: parseInt(dayjs().format("MM")),
    };
  },
  methods: {
    async getUser() {
      await this.$axios.get('/user').then((response) => {
        sessionStorage.setItem('user', JSON.stringify(response.data))
      });
    },
    async myAttendance(setYear, setMonth) {
      await this.$axios
        .get("/attendance", {
          params: {
            year: setYear,
            month: setMonth,
          },
        })
        .then((response) => {
          this.$store.dispatch(
            "attendance/myAttendance",
            response.data.attendance
          );
        });
    },
  },
};
