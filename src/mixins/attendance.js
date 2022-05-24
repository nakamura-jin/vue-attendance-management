import dayjs from "dayjs";
import loading from "@/mixins/loading";
import $http from '@/services/httpService'

export default {
  mixins: [loading],
  data() {
    return {
      year: parseInt(dayjs().format("YYYY")),
      month: parseInt(dayjs().format("MM")),
      date: parseInt(dayjs().format("DD")),
      id: null,
      sheetMonth: null,
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
      const storage = JSON.parse(sessionStorage.getItem("data"));
      this.id = parseInt(JSON.parse(sessionStorage.getItem("worker_id")));
      if (!this.id) this.id = storage.user.id;
      const query = {
        id: this.id,
        year: setYear,
        month: setMonth,
      };
      const response = await $http.get("/attendance", query)
      this.$store.dispatch("attendance/myAttendance", response.data.attendance)
      this.judgeModal();
      setTimeout(() => this.finishLoading(), 1000);
    },

    /**
     * 条件でモーダルを自動表示
     */
    async judgeModal() {
      const response = await $http.get("/holiday");
      const holiday = response.data.holiday;
      const list = this.$store.getters["attendance/attendance"];
      if (list.lenth !== 0) {
        const check = list.some((item) => {
          const judge =
            (holiday === false && item.date === this.date) || holiday === true;
          this.sheetMonth = item.month;
          if (judge) {
            return true;
          }
        });
        const worker_id = sessionStorage.getItem("worker_id");
        if (!check && this.sheetMonth === this.month && !worker_id)
          this.$store.dispatch("attendance/changeModal", true);
      }
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

    attendanceEdit(day) {
      const list = this.$store.getters['attendance/attendance']
      const year = list[0].year
      const month = list[0].month
      this.$router.push(`/worker_list/edit/${this.id}/${year}/${month}/${day}`)
    }
  },
};
