import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1200px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "82px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: "入量(ml)",
        style: {
          width: "30px"
        },
        colspan: "6",
        rowspan: "1"
      },
      {
        name: "余液",
        style: {
          width: "30px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "出量(ml)",
        style: {
          width: "30px"
        },
        colspan: "8",
        rowspan: "1"
      },
      {
        name: "平衡",
        style: {
          width: "30px"
        },
        colspan: "1",
        rowspan: "3"
      },
    ],
    mid: [{
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        静脉
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          width: "30px"
        },
      },
      {
        name: `
        胃肠
        `,
        colspan: "3",
        rowspan: "1",
        style: {
          width: "30px"
        },
      },
      {
        name: `
        总入量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "62px"
        },
      },
      {
        name: `
        尿量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "30px"
        },
      },
      {
        name: `
        大便量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        呕吐量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        痰液量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        汗液量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        标题1
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
        canSet: true
      },
      {
        name: `
        标题2
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
        canSet: true
      },
      {
        name: `
        总出量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      }
    ],
    bottom: [{
        name: `
        液体
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "40px"
        },
      }, {
        name: `
        血制品
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "40px"
        },
      }, {
        name: `
        饮食
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "40px"
        },
      }, {
        name: `
        口服药
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "40px"
        },
      }, {
        name: `
        肠内营养
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "40px"
        },
      },

    ]
  }
};
