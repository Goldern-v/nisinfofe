import moment from "moment";
export default {
  filters: {
    filterTime(val) {
      try {
        // 判断是否今天之前
        let currDay = moment().startOf("day");
        if (moment(val).isBefore(currDay)) {
          return '超时 ' + moment(val).fromNow().replace('前', '')
        } else {
          if (val.indexOf("00:00:00") > -1) {
            return "今天";
          } else {
            return '今天 ' + moment(val).format("HH:mm");
          }
        }
      } catch (e) {}
    }
  }
};
