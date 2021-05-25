import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `体温<br/>（℃）`,
      //   style: {
      //     minWidth: '32px',
      //     maxWidth: '32px'
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // },
      {
        name: `心率<br/>（次/min）`,
        style: {
          minWidth: '32px',
          maxWidth: '32px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `血压<br/>（mmHg）`,
        style: {
          minWidth: '32px',
          maxWidth: '32px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `呼吸<br/>（次/min）`,
        style: {
          minWidth: '32px',
          maxWidth: '32px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        宫缩<br/>（s/min）
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        尿量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        膝反射
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        滴速
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        胎心<br>（次/min）
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '158px',
          maxWidth: '158px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '66px',
          maxWidth: '66px',
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [],
    bottom: []
  }
}
