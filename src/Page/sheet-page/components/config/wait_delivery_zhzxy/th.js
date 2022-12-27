import moment from "moment";
import {
  limitChange
} from "../keyEvent/f1.js";
function currYear() {
  return moment().format('YYYY')
}
export default {
  style: {
    width: "1200px"
  },
  // 科室的名称 关节骨科
  deptType: "",
  th: {
    top: [
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: `
        血压<br/>(mmHg)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "55px"
        }
      },
      {
        name: `
        胎位
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "73px"
        }
      },
      {
        name: `
        胎心
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        宫缩
        `,
        style: {
          minWidth: "52px",
          maxWidth: "52px",
          whiteSpace: "nowrap"
        },
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        宫颈开张<br/>(cm)
        `,
        style: {
          minWidth: "55px",
          maxWidth: "55px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        先露高低<br/>S
        `,
        style: {
          minWidth: "55px",
          maxWidth: "55px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎膜
        `,
        style: {
          minWidth: "55px",
          maxWidth: "55px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        羊水性状
        `,
        style: {
          minWidth: "55px",
          maxWidth: "55px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        检查方式
        `,
        style: {
          minWidth: "55px",
          maxWidth: "55px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `催产素浓度<br/>(U/500ml)`,
        style: {
          minWidth: "65px",
          maxWidth: "65px",
        },
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `滴数<br/>(滴/分)`,
        style: {
          minWidth: "55px",
          maxWidth: "55px",
        },
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        质控护士签名
        `,
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [
      {
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: "心率<br/>次/分",
        style: {
          minWidth: "55px",
          maxWidth: "55px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "间歇<br/>(min)",
        style: {
          minWidth: "55px",
          maxWidth: "55px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "持续<br/>(s)",
        style: {
          minWidth: "55px",
          maxWidth: "55px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "缩力",
        style: {
          minWidth: "55px",
          maxWidth: "55px"
        },
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [

    ]
  }
};
