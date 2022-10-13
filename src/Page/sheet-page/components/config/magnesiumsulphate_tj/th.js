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
        宫缩
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
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
        胎心音<br/>(次/min)
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `标题1`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFour',
        style: {
          minWidth: '80px',
          maxWidth: '80px',
        }
      },
     /* {
        name: `标题2`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFive',
        style: {
          minWidth: '80px',
          maxWidth: '80px',
        }
      },*/
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
        style: {
          minWidth: '66px',
          maxWidth: '66px',
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [{
        name: '日期',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
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
