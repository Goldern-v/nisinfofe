import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1120px"
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
        name: `
        体温<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼<br/>吸<br/>次/<br/>分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        体重<br/>kg
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        指尖<br/>血糖<br/>mmol/L
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        哭<br/>声
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        皮<br/>肤<br/>颜<br/>色
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        呕吐
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        吸吮力
        `,
        colspan: "1",
        rowspan: "3",
        canSet: false,
      },
      {
        name: `
        喂养
        `,
        colspan: "4",
        rowspan: "1",
        canSet: false,
      },
      {
        name: `
        脐部情况
        `,
        colspan: "3",
        rowspan: "1",
        canSet: false,
      },
      {
        name: `大便`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `小便`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldFifteen", //标题1
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题2`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSixteen",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士<br>签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        质控护士签名
        `,
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [
      {
        name: '日期',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        自<br/>吮
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        母乳
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        人<br/>工
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        奶<br/>量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        干洁
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        渗血
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        渗液
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: []
  }
};
