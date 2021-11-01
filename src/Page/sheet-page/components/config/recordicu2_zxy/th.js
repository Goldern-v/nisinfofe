/*
南方中西医 - 护理记录单
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
        name: `
        入
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        性质
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        病情及治疗、效果
        `,
        style: {
          minWidth: "413px",
          maxWidth: "413px"
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
        入量名称
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
        入量ml
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        出量名称
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
        出量ml
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
