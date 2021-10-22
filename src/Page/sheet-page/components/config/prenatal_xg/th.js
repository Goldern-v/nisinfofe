/*
东莞谢岗 - 产前待产记录单
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
        BP<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        P<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        R<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        胎方位
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        胎心<br/>次/分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        衔接
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        宫缩
        `,
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        宫颈
        `,
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        先露<br/>高低<br/>cm
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎<br/>膜<br/>破<br/>裂
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        羊<br/>水<br/>性<br/>状
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        检<br/>查<br/>方<br/>式
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎<br/>动<br/>情<br/>况
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎<br/>心<br/>监<br/>护
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        barthel<br/>评分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        健康宣教
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
        key: "customItem",
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
    mid: [
      {
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
        name: `
        无
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        有
        `,
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        扩张<br/>cm
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [
      {
        name: `
        强度
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        持续<br/>(s)
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        间歇<br/>min
        `,
        colspan: "1",
        rowspan: "1",
      },
    ]
  }
};
