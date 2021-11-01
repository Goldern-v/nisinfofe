/*
南方中西医 - 重症监护病房护理记录单(表一)
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
    top: [{
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: "体温<br/>℃",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        HR<br/>次/<br/>min
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        NBP<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        SPO<sub>2</sub><br/>(%)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        CVP
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
        name: `
        吸氧<br/>升/分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        R<br/>次/分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        人工气道
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        机械通气
        `,
        colspan: "7",
        rowspan: "1"
      },
      {
        name: `
        镇静<br/>评分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "神志",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "瞳孔",
        colspan: "4",
        rowspan: "1"
      },
      {
        name: "肢体反应",
        colspan: "4",
        rowspan: "1"
      },
      {
        name: "心排量",
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "1",
        rowspan: "3",
      },
    ],
    mid: [{
        name: `日期`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `时间`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        插管<br/>深度<br/>cm
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        气囊<br/>压力<br/>cmH<sub>2</sub>O
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        模式
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        VT<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        F<br/>次/分
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        FiO2<br/>%
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        P
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        PEEP
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        PS
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        左
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        左
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        SVO<sub>2</sub>
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        CO
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        PCWP
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        RVEDV
        `,
        colspan: "1",
        rowspan: "1",
      },
    ],
    bottom: [
      {
        name: `
        cmH<sub>2</sub>O
        `,
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        大小
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        反射
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        大小
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        反射
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        上
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        下
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        上
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        下
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        %
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        升/分
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        mmHg
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        ml
        `,
        colspan: "1",
        rowspan: "1",
      },
    ]
  }
};
