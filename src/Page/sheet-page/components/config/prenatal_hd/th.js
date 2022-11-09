import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1280px"
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
        脉搏<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        心率<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意识
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血氧饱和度(%)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        指尖血糖<br/>mmol/L
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        阴道<br/>出血<br/>ml
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `健康宣教`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldFive",
        style: {
          minWidth: "73px",
          maxWidth: "73px"
        },
      },
      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSix",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        },
      },
      {
        name: `标题2`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSeven",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        },
      },
      {
        name: `标题3`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEight",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        },
      },
      {
        name: `标题4`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldNine",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        },
      },
      {
        name: `标题5`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTen",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        },
      },
      {
        name: `标题6`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEleven",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        },
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
    mid: [{
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: "内容",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },
      },
      {
        name: "量<br/>ml",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "内容",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },
      },
      {
        name: "量<br/>ml",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "颜色",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
    ],
    bottom: [

    ]
  }
};
