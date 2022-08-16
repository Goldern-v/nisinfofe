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
      width: "1200px"
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
        P/HR<br/>次/<br/>分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        R<br/>次/<br/>分
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
        SPO<sub>2</sub><br/>%
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        意识
        `,
        colspan: "1",
        rowspan: "3"
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
        健康<br/>宣教
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        标题1
        `,
        canSet: true,
        colspan: "1",
        rowspan: "3",
        key: "affectedLimb",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `标题2`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customItem1",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `标题3`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customItem2",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `标题4`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customItem3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "215px",
          maxWidth: "215px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        记录者<br/>签名
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        "name": "审核<br/>签名", 
        "colspan": "1", 
        "rowspan": "3"
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
      },
      {
        name: `
        量<br/>ml/g
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
