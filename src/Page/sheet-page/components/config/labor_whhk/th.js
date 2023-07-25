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
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        衔接
        `,
        style: {
          minWidth: "25px",
          maxWidth: "25px",
        },
        colspan: "1",
        rowspan: "3"
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
        宫颈
        `,
        style: {
          minWidth: "20px",
          maxWidth: "20px",
        },
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        先露高低<br/>S
        `,
        style: {
          minWidth: "20px",
          maxWidth: "20px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        矢状缝
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `
        胎膜
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        羊水性状
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        检查方式
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSixteen",
      },
      {
        name: `标题2`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSeventeen",
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "203px",
          maxWidth: "203px"
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
      // {
      //   name: `
      //   质控护士签名
      //   `,
      //   colspan: "1",
      //   rowspan: "3"
      // }
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
        name: "部位",
        style: {
          minWidth: "73px",
          maxWidth: "73px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "心率<br/>次/分",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "间歇<br/>(min)",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "持续<br/>(s)",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "缩力",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "开张<br/>(cm)",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "均势",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "质",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [

    ]
  }
};
