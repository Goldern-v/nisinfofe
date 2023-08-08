import moment from "moment";
import {
  limitChange
} from "../keyEvent/f1.js";
function currYear() {
  return moment().format('YYYY')
}
export default {
  style: {
    width: "800px"
  },
  // 科室的名称 关节骨科
  deptType: "",
  th: {
    top: [
      {
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        结果（次/分）
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        签名
        `,
        colspan: "1",
        rowspan: "3"
      },
    ],
    mid: [
    ],
    bottom: [

    ]
  }
};
