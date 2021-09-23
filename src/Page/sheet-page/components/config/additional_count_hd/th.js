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
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        canSet: true,
        key: "recordYear",
      },
      {
        name: "护理操作项目",
        
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "护理操作结果",
        
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        护理问题
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        护理类型
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        安全护理
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        导管护理
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        皮肤护理
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        气管护理
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        体位护理
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        营养护理
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
      },
      {
        name: `饮食情况`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `排尿困难`,
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
