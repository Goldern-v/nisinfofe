import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1400px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "62px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: `
        体温<br/>（℃）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        脉搏<br/>（次/分）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>（次/分）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br/>（mmHg）
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        SPO<sub>2</sub><br/>（%）
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        膀胱<br/>情况
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        乳量
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `宫底<br/>高度<br/>U-FB`,
        style: {},
        colspan: "1",
        rowspan: "3",
        // canSet: true,
        key: "fieldSeven",
      },
      {
        name: `子<br/>宫<br/>收<br/>缩`,
        style: {},
        colspan: "1",
        rowspan: "3",
        // canSet: true,
        key: "fieldSix",
      },
      {
        name: `
        伤口
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `留<br/>置<br/>尿<br/>管`,
        style: {},
        colspan: "1",
        rowspan: "3",
        // canSet: true,
        key: "fieldSix",
      },
      {
        name: `尿<br/>色`,
        style: {},
        colspan: "1",
        rowspan: "3",
        // canSet: true,
        key: "fieldSix",
      },
      {
        name: `镇<br/>痛<br/>泵`,
        style: {},
        colspan: "1",
        rowspan: "3",
        // canSet: true,
        key: "fieldSix",
      },
      {
        name: `母<br/>乳<br/>喂<br/>养<br/>指<br/>导`,
        style: {},
        colspan: "1",
        rowspan: "3",
        // canSet: true,
        key: "fieldSix",
      },
      {
        name: `VAS<br/>评<br/>分`,
        style: {},
        colspan: "1",
        rowspan: "3",
        // canSet: true,
        key: "fieldSix",
      },
      {
        name: `跌<br/>倒<br/>告<br/>知`,
        style: {},
        colspan: "1",
        rowspan: "3",
        // canSet: true,
        key: "fieldSix",
      },
      {
        name: `
        特殊情况
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '150px',
          maxWidth: '150px',
        },
      },
      {
        name: `签名
        `,
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [{
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: "静脉<br/>（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "口服<br/>(ml)",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "血<br/>（ml）",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "尿<br/>(ml)",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "其他<br/>(ml)",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "腹<br/>部",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "会<br/>阴",
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [

    ]
  }
};
