/*
东莞谢岗 - 产后护理记录单
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
        血压<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        SPO2<br/>%
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        子宫<br/>收缩
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        宫底<br/>高度<br/>U-Fb
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        恶露<br/>(ml)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        乳房情况
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        伤口
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        PCA<br/>泵
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        尿管
        `,
        colspan: "1",
        rowspan: "3",
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
        质地
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        乳量
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        会阴
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        腹部
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
        量<br/>(ml)
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
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
