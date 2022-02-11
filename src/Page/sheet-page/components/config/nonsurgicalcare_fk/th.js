import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 武汉肺科 - 非手术科室护理记录单
  deptType: "",
  style: {
    width: "1250px"
  },
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
        生命体征
        `,
        style: {},
        colspan: "4",
        rowspan: "1",
      },
      {
        name: `
        SPO2(%)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        意识
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        瞳孔
        `,
        style: {},
        colspan: "3",
        rowspan: "1",
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet:true,
        key:"customItem1"
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet:true,
        key:"customItem2"
      },
      {
        name: `
        静脉<br/>置管
        `,
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        导管及引流管
        `,
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        入量
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量
        `,
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        受压<br/>皮肤
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        卧位
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        其他
        `,
        style: {
          minWidth: "180px",
          maxWidth: "180px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "3"
      }
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
        name: "T<br/>°C",
        colspan: "1",
        rowspan: "2",
      },
      {
        name: "P<br/>次<br/>/分",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "R<br/>次<br/>/分",
        colspan: "1",
        rowspan: "2",
      },
      {
        name: "BP<br/>mmHg",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "左<br/>mm",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "右<br/>mm",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "对光<br/>反射",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet:true,
        key:"venousCatheter"
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet:true,
        key:"drainageTube1"
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet:true,
        key:"drainageTube2"
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet:true,
        key:"drainageTube3"
      },
      {
        name: "项目",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "量ml",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "项目",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "颜色",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "性状",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "量ml",
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [

    ]
  }
};
