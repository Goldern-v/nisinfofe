/*
武警 - 待产护理记录单
*/
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
    top: [
      {
        name: `日期`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `时间`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: "体温<br/>(℃)",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脉搏<br/>(次/<br/>分)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        心率<br/>(次/<br/>分)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>(次/<br/>分)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br/>(mmHg)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        胎位
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "胎心音",
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        衔<br/>接
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "宫缩",
        colspan: "2",
        rowspan: "1"
      },
      {
        name: "宫颈",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        先露<br/>高低
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎膜
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        羊水<br/>性状
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        阴道<br/>流血<br/>ml
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        检查<br/>方式
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血糖<br/>mmol/L
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `标题1`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
        canSet: true,
        key: "customField1",
      },
      {
        name: `
        特殊情况
        `,
        style: {
          minWidth: "165px",
          maxWidth: "165px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士<br/>签名
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "1",
        rowspan: "3",
      },
    ],
    mid: [
      {
        name: `
        部位
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        心率
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        间歇(')
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        持续
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        扩张
        `,
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: []
  }
};
