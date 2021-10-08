import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1400px"
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
        name: "护理操作项目",
        
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "183px",
          maxWidth: "183px"
        },
      },
      {
        name: "护理操作结果",
        
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "98px",
          maxWidth: "98px"
        },
      },
      {
        name: `
        护理问题
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "153px",
          maxWidth: "153px"
        },
      },
      {
        name: `
        护理类型
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "78px",
          maxWidth: "78px"
        },
      },
      {
        name: `
        安全护理
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "78px",
          maxWidth: "78px"
        },
      },
      {
        name: `
        导管护理
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "108px",
          maxWidth: "108px"
        },
      },
      {
        name: `
        皮肤<br/>护理
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        气管护理
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "78px",
          maxWidth: "78px"
        },
      },
      {
        name: `
        体位<br/>护理
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        营养<br/>护理
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        心理护理
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "78px",
          maxWidth: "78px"
        },
      },
      {
        name: `饮食情况`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `排尿<br/>困难`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `隔离`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `腹围<br>(cm)`,
        colspan: "1",
        rowspan: "2",
      },
      // {
      //   name: `
      //   特殊情况记录
      //   `,
      //   style: {
      //     width: "160px"
      //   },
      //   colspan: "1",
      //   rowspan: "2"
      // },
      {
        name: `
        记录人签名
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          width: "70px"
        },
      },
      // {
      //   name: `
      //   记录人签名
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "2"
      // }
    ],
    mid: [{
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "1",
      }
    ]
  }
};
