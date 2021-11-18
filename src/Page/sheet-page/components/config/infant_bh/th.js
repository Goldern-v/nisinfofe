/*
北海人一-婴儿记录表
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  style: {
    width: '1200px'
  },
  deptType: "",
  th: {
    top: [{
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: "体温<br/>(°C)",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        表顶注释
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        胎动
        `,
        colspan: "9",
        rowspan: "1",
      },
      {
        name: `
        护士签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
        colspan: "1",
        rowspan: "3",
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {
      //     minWidth: "80px",
      //     maxWidth: "80px",
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: `
        班次
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        体重
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        小便次数
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        大便次数
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        喂养方式
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        呕吐
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        皮肤
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        脐带
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [
      {
        name: `
        母乳次数
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        人工次数
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
    ]
  }
};
