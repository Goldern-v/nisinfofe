import moment from "moment";
export default {
  style: {
    width: "1250px"
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
      },
      {
        name: `
        胎位
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
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
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        先露高低<br/>S
        `,
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
        name: `标题3`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEighteen",
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "242px",
          maxWidth: "242px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `
        质控护士
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
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
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "间歇<br/>(min)",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "持续<br/>(s)",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "缩力",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "开张<br/>(cm)",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "均势",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "质",
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [

    ]
  }
};
