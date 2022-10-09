/*
南方中西医 - 护理记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
      width: "1220px"
    },
  th: {
    top: [{
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: "T<br/>℃",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        P/HR<br/>次/<br/>min
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        R<br/>次/<br/>min
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        BP<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        SPO<sub>2</sub><br/>(%)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意识
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `标题1`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
        canSet: true,
        key: "kong1",
      },
      {
        name: `标题2`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
        canSet: true,
        key: "kong2",
      },
      {
        name: `标题3`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
        canSet: true,
        key: "kong3",
      },
      {
        name: `标题4`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
        canSet: true,
        key: "kong4",
      },
      {
        name: `标题5`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
        canSet: true,
        key: "kong5",
      },
      {
        name: `
        病情观察、病情主诉、治疗、护理措施、效果
        `,
        style: {
          minWidth: "340px",
          maxWidth: "340px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士<br/>签名
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "1",
        rowspan: "3",
      },
    ],
    mid: [{
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
        name: `
        入量名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "105px",
          maxWidth: "105px"
        },

      },
      {
        name: `
        入量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        出量名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },
      },
      {
        name: `
        出量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
