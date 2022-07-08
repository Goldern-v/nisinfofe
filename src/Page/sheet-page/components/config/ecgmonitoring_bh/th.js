/*
北海人一-心电监护观察记录
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  th: {
    top: [{
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: "循环",
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        呼吸
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `自定义项`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customItem1"
      },
      {
        name: `自定义项`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customItem2"
      },
      {
        name: `自定义项`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customItem3"
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "158px",
          maxWidth: "158px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: `
        体温<br/>℃
        `,
        style: {
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        心率<br/>(次/分)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        血压<br/>(mmHg)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        脉搏<br/>(次/分)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        呼吸频率<br/>(次/分)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        SPO<sub>2</sub>(%)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
