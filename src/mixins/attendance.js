import dayjs from "dayjs";
import axios from "axios";
import loading from "@/mixins/loading";

export default {
  mixins: [loading],
  data() {
    return {
      year: parseInt(dayjs().format("YYYY")),
      month: parseInt(dayjs().format("MM")),
    };
  },
  methods: {
    //曜日を日本語に変換
    checkWeek(week) {
      if (week === "Sun") return "日";
      if (week === "Mon") return "月";
      if (week === "Tue") return "火";
      if (week === "Wed") return "水";
      if (week === "Thu") return "木";
      if (week === "Fri") return "金";
      if (week === "Sat") return "土";
    },

    //リストの日付設定
    createDay() {
      const day = [];
      const end = parseInt(dayjs().endOf("month").format("D"));
      for (let i = 1; i <= end; i++) {
        let weekFormat = dayjs().date(i).format("ddd");
        let week = this.checkWeek(weekFormat);
        day.push({ day: i, week: week });
      }
      this.setDate = day;
    },

    //リスト取得
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
        });
    },

    //リストの月変更
    changeList(nMonth) {
      let data = nMonth.replace(/[^0-9]/g, "");
      let year = data.slice(0, 4);
      let month = data.slice(4, data.length);
      this.startLoading();
      this.myAttendance(year, month);
    },
  },
};
