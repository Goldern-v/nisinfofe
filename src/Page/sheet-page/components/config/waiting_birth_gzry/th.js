/*
贵州省人医-产程记录单
 */
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  // style: {
  //   width: "1000px"
  // },
  th: {
    top: [
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: `
        血压<br/>（mmHg）
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: '胎心',
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        衔接
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: '宫缩',
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: '宫颈',
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        先露<br/>高低<br/>s
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        矢状缝
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
        检查<br/>方式
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        潜伏期<br/>开始
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
          maxWidth: "153px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "70px",
        },
      },
    ],
    mid: [
      {
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
        name: `部位`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `心率<br/>次/分`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `间歇<br/>(min)`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `持续<br/>(s)`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `开张<br/>(cm)`,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `质`,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
