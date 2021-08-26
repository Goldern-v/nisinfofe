import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "980px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          width: "40px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: "护理操作项目",
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "护理操作结果",
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        护理问题
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "48px"
        }
      },
      {
        name: `
        护理类型
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "48px"
        }
      },
      {
        name: `
        安全护理
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "48px"
        }
      },
      {
        name: `
        导管护理
        `,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        皮肤护理
        `,
        style: {
          width: "48px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        气管护理
        `,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        体位护理
        `,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        营养护理
        `,
        style: {
          width: "48px"
        },
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
          width: "48px"
        },
      },
      {
        name: `饮食情况`,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `排尿困难`,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `隔离`,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `腹围<br>(cm)`,
        style: {
          width: "48px"
        },
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
          width: "52px"
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
        style: {
          width: "28px"
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "28px"
        },
      }
    ]
  }
};
