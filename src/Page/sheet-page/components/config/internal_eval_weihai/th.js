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
        name: '意识',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: "体温<br/>℃",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: `
        心率<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {
          minWidth: "60px"
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
        左侧瞳孔<br/>（mm）
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
         name: `
        右侧瞳孔<br/>（mm）
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        病情观察及护理措施
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '340px'
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
