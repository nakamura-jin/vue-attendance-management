import dayjs from 'dayjs'

export default {
  data() {
    return {
      year: parseInt(dayjs().format("YYYY")),
      month: parseInt(dayjs().format("MM")),
    };
  },
  // filters: {
  //   omittedText20(text) {
  //     return text.length > 20 ? text.slice(0, 20) + "…" : text;
  //   },
  // },
  methods: {
    checkWeek(week) {
      if (week === "Sun") return "日";
      if (week === "Mon") return "月";
      if (week === "Tue") return "火";
      if (week === "Wed") return "水";
      if (week === "Thu") return "木";
      if (week === "Fri") return "金";
      if (week === "Sat") return "土";
    },
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
  },
};