/*
广东同江-心电监护观察记录
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "900px"
  },
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
          name: `
          心律<br/>(次/分)
          `,
          style: {},
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
        // {String} fieldTwo 自定义标题1
// {String} fieldThree 自定义标题2
// {String} fieldFour 自定义标题3
// {String} fieldFive 自定义内容1
// {String} fieldSix 自定义内容2
// {String} fieldSeven 自定义内容3
// {String} fieldEight 心电监护特殊记录
      {
        name: `自定义项`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldTwo"
      },
      {
        name: `自定义项`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldThree"
      },
      {
        name: `自定义项`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldFour"
      },
      {
        name: `
        心电监护特殊情况
        `,
        style: {
          minWidth: "158px",
          maxWidth: "158px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        带教<br/>护士
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      // {"name":"带教<br/>护士","colspan":"1","rowspan":"2","style":{"minWidth":"50px","maxWidth":"50px"}},
      // {
      //   name: `
      //   审核签名
      //   `,
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      // {
      //   name: `
      //   体温<br/>℃
      //   `,
      //   style: {
      //   },
      //   colspan: "1",
      //   rowspan: "2",
      // },
      // {
      //   name: `
      //   心率<br/>(次/分)
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "2",
      // },
      // {
      //   name: `
      //   血压<br/>(mmHg)
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "2",
      // },
      // {
      //   name: `
      //   脉搏<br/>(次/分)
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "2",
      // },
      // {
      //   name: `
      //   呼吸频率<br/>(次/分)
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "2",
      // },
      // {
      //   name: `
      //   SPO<sub>2</sub>(%)
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "2",
      // },
    ],
    bottom: [

    ]
  }
};
