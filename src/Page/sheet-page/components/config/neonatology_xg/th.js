/*
东莞谢岗 - 护理记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
      width: "1180px"
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
        name: "T<br/>℃",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        HR<br/>次/分
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
        BP<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        SaO₂<br/>%
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        瞳孔左/右
        `,
        colspan: "2",
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
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        喂养
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        反应
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        哭声
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        吸吮力
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        皮肤颜色
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脐部情况
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        吸氧方式
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        箱温<br/>℃
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        翻身
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
        记录<br/>签名
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        审核<br/>签名
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
        大小<br/>(mm)
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        对光<br/>反射
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },
        
      },
      {
        name: `
        量<br/>ml/g
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },
      },
      {
        name: `
        量<br/>ml/g
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        方式
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        种类
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
