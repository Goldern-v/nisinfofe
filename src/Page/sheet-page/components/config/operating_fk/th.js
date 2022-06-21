/*
武汉肺科-手术科室记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1362px"
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
        动脉<br/>血压
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        Sp02<br/>%
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
        colspan: "4",
        rowspan: "1",
      },
      {
        name: `
        静脉置管
        `,
        style: {},
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        受压<br/>皮肤
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      }, 
      {
        name: `
        切口<br/>敷料
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        口腔<br/>黏膜
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        导管及引流管
        `,
        style: {},
        colspan: "5",
        rowspan: "1",
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: "4",
        rowspan: "1",
      },
      { "name": "其他", "colspan": "1", "rowspan": "3",style: { minWidth: "180px",  maxWidth: "180px"} }, 
      {
        name: `
        签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
        colspan: "1",
        rowspan: "3",
      }
    ],
    mid: [
      {
        name: `
        日期
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        时间
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        T<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        P<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        R<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        BP<br/>mmHg
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        大小(mm)
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        反射
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        留置针
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        CVC
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        PICC
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: 
        ``,
        style: {},
        colspan: "1",
        rowspan: "2",
        key:"drainage1",
        canSet:true
      },
      {
        name: 
        ``,
        style: {},
        colspan: "1",
        rowspan: "2",
        key:"drainage2",
        canSet:true
      },
      {
        name: 
        ``,
        style: {},
        colspan: "1",
        rowspan: "2",
        key:"subcutaneous",
        canSet:true
      },
      {
        name: 
        ``,
        style: {},
        colspan: "1",
        rowspan: "2",
        key:"drainage3",
        canSet:true
      },
      {
        name: 
        ``,
        style: {},
        colspan: "1",
        rowspan: "2",
        key:"drainage4",
        canSet:true
      },
      {
        name: `
        项目
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        量<br/>ml
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        项目
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        颜色
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        性状
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        量<br/>ml
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [
      {
        name: `
        左
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        左
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
    ]
  }
};
