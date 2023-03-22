import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: '',
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
        name: `心率<br/>（次/min）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `血压<br/>（mmHg）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `呼吸<br/>（次/min）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        宫缩
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        浓度<br/>(ml)
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `滴数<br/>（滴/分）`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFour',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        }
      },

      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '153px',
          maxWidth: '153px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [{
      name: '日期',
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: '时间',
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
        name: `
        间歇(min)
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        持续(s)
        `,
        colspan: '1',
        rowspan: '2'
      }
    ],
    bottom: []
  }
}
