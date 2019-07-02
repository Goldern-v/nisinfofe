import moment from "moment";
import { variables } from "./variables";

function getWeekDays(date) {
  console.log(date, "datedatedatedate");
  return variables.WEEK_DAYS.map((item, index) => {
    let label = "";
    if (
      moment().format("YYYY-MM-DD") ==
      moment(date)
        .add(index, "d")
        .format("YYYY-MM-DD")
    ) {
      label = "今天";
    } else {
      label = `${moment(date)
        .add(index, "d")
        .format("MM-DD")}(${item})`;
    }
    return {
      label: label,
      colSpan: 3,
      rowSpan: 1,
      style: {
        height: variables.THEAD_ROW_0_HEIGHT,
        fontSize: variables.THEAD_ROW_0_FONT_SIZE
      }
    };
  });
}

export function getApn() {
  let apnList = [];
  for (let day = 0; day < variables.WEEK_DAYS.length; day++) {
    for (let apn = 0; apn < variables.APN.length; apn++) {
      apnList.push({
        label: variables.APN[apn],
        colSpan: 1,
        rowSpan: 1,
        style: {
          width: variables.CELL_WIDTH,
          height: variables.THEAD_ROW_1_HEIGHT,
          fontSize: variables.THEAD_ROW_1_FONT_SIZE
        },
        weekNumber: day,
        apnNumber: apn,
        timeSlice: variables.APN[apn]
      });
    }
  }
  return apnList;
}

export const thead = date => {
  const head = [
    [
      {
        label: "分区",
        rowSpan: 2,
        style: { width: variables.FQ_WIDTH }
      },
      {
        label: "机号",
        rowSpan: 2,
        style: { width: variables.JH_WIDTH }
      },
      ...getWeekDays(date)
    ],
    getApn()
  ];
  return head;
};
