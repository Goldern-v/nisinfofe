/*
江门妇幼-产前待产护理记录单
*/
import moment from "moment";
function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1300px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          // minWidth: "62px"
          minWidth: "40px"
        },
        // canSet: true,
        key: "recordYear",
      },
      {
        name: `
        孕周
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
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
        血糖<br/>mmol<br/>/L
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎方位
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎心音<br/>次/分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        宫缩
        `,
        style: {},
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        宫颈
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        先<br/>露<br/>高<br/>低
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `胎<br/>膜`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `羊<br/>水<br/>性<br/>质`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        胎动<br/>次/h
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `排<br/>尿<br/>情<br/>况`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `破<br/>膜<br/>时<br/>间`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `临产时间`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `胎<br/>儿<br/>娩<br/>出<br/>时<br/>间`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `静滴催产素`,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: ``,
        canSet:true,
        key:"armValue",
        colspan: "1",
        rowspan: "3",
      },
      {
        name: ``,
        canSet:true,
        key:"armValue2",
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        特殊情况记录
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
        rowspan: "3",
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
      },
      {
        name: `上级护士签名
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
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
        name: "强<br/>度",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "持<br/>续<br/>s",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "间<br/>歇<br/>min",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "扩<br/>张<br/>cm",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "评<br/>分",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "缩宫素<br/>浓度<br/>U/500ml",
        colspan: "1",
        rowspan: "2",
      },
      {
        name: "滴数<br/>滴/分",
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
