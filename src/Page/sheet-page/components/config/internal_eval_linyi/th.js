import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  // style: {
  //   width: "1000px"
  // },
  th: {
    top: [{
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "25px"
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "25px"
        },
      },
      {
        name: "体温<br/>℃",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脉搏/心率<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "48px"
        },
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {
          minWidth: "48px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        SPO<sub>2</sub><br>(%)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        标题1
        `,
        key: "fieldSeventeen", //标题1
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldEighteen", //标题2
        name: `
        标题2
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldNineteen", //标题3
        name: `
        标题3
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        name: `
        病情观察及护理措施
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '600px'
        },
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '55px',
          maxWidth: '55px',
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   医师签名
      //   `,
      //   style: {
      //     minWidth: '55px',
      //     maxWidth: '55px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [],
    bottom: []
  }
}
