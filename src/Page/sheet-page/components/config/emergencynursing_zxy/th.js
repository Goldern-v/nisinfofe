/*
南方中西医 - 急诊留观护理单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  // style: {
  //     width: "1200px"
  //   },
  th: {
    top: [{
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: "生命体征",
        colspan: "4",
        rowspan: "1"
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
        神志
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "瞳孔",
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        入量名称
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入量<br/>ml
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        出量名称
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        出量<br/>ml
        `,
        colspan: "1",
        rowspan: "3"
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
        name: "T<br/>℃",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        P<br/>次/<br/>分
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        R<br/>次/<br/>分
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        BP<br/>mmHg
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        大小
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        反射
        `,
        colspan: "2",
        rowspan: "1",
      },
    ],
    bottom: [
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
      },
    ]
  }
};
