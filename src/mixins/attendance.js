import dayjs from "dayjs";
import axios from "axios";
import loading from "@/mixins/loading";

export default {
  mixins: [loading],
  data() {
    return {
      year: parseInt(dayjs().format("YYYY")),
      month: parseInt(dayjs().format("MM")),
      date: parseInt(dayjs().format("DD")),
    };
  },
  computed: {
    attendanceList() {
      return this.$store.getters["attendance/attendance"];
    },
  },
  methods: {
    /**
     * 曜日を日本語に変換
     */
    checkWeek(week) {
      if (week === "Sun") return "日";
      if (week === "Mon") return "月";
      if (week === "Tue") return "火";
      if (week === "Wed") return "水";
      if (week === "Thu") return "木";
      if (week === "Fri") return "金";
      if (week === "Sat") return "土";
    },

    /**
     * リストの日付設定
     */
    createDay() {
      const day = [];
      const end = parseInt(dayjs().endOf("month").format("D"));
      for (let i = 1; i <= end; i++) {
        let weekFormat = dayjs().date(i).format("ddd");
        let week = this.checkWeek(weekFormat);
        day.push({ day: i, week: week });
      }
      this.$store.dispatch("attendance/createDateList", day);
    },

    /**
     * リスト取得
     */
    async myAttendance(setYear, setMonth) {
      const id = JSON.parse(sessionStorage.getItem("user")).id;
      await axios
        .get("/attendance", {
          params: {
            id: id,
            year: setYear,
            month: setMonth,
          },
        })
        .then((response) => {
          this.$store.dispatch(
            "attendance/myAttendance",
            response.data.attendance
          );
          setTimeout(() => {
            this.judgeModal();
            this.finishLoading();
          }, 500);
        });
    },

    /**
     * 平日かつ開始時間がない場合は自動でモーダルを出す
     */
    async judgeModal() {
      const response = await axios.get("/holiday");
      const holiday = response.data.holiday;
      const list = this.$store.getters["attendance/attendance"];
      const check = list.some((item) => {
        const judge =
          (holiday === false && item.date === this.date) || holiday === true || item.month !== dayjs().month() + 1
        if (judge) {
          return true;
        }
      });
      if (!check) this.$store.dispatch("attendance/changeModal", true);
    },

    /**
     * リストの月変更
     */
    changeList(nMonth) {
      let data = nMonth.replace(/[^0-9]/g, "");
      let year = data.slice(0, 4);
      let month = data.slice(4, data.length);
      this.startLoading();
      this.myAttendance(year, month);
    },
  },
};
