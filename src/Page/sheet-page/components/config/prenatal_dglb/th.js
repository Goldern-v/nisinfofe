import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1150px"
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
        T<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        P<br/>次/min
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        HR<br/>次/min
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        R<br/>次/min
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
        意识
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        SPO<br/>2%
        `,
        colspan: "1",
        rowspan: "3"
      },
      // {
      //   name: `
      //   阴道出血<br/>ml
      //   `,
      //   colspan: "1",
      //   rowspan: "3",
      // },

      // {
      //   name: `子宫收缩`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldSix",
      //   style: {
      //     minWidth: "30px",
      //     maxWidth: "30px"
      //   }
      // },
      // {
      //   name: `宫底高度<br/>(U=<br/>FB)`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldSeven",
      //   style: {
      //     minWidth: "30px",
      //     maxWidth: "30px"
      //   }
      // },
      // {
      //   name: `乳房情况`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldEight",
      //   style: {
      //     minWidth: "30px",
      //     maxWidth: "30px"
      //   }
      // },
      // {
      //   name: `泌乳情况`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldNine",
      //   style: {
      //     minWidth: "30px",
      //     maxWidth: "30px"
      //   }
      // },
      // {
      //   name: `指导挤奶`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldEleven",
      //   style: {
      //     minWidth: "30px",
      //     maxWidth: "30px"
      //   }
      // },
      // {
      //   name: `腹部切口敷料`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldEleven1",
      //   style: {
      //     minWidth: "30px",
      //     maxWidth: "30px"
      //   }
      // },
      // {
      //   name: `会阴伤口`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldEleven2",
      //   style: {
      //     minWidth: "40px",
      //     maxWidth: "40px"
      //   }
      // },
      // {
      //   name: `肛门排气/肠鸣音<br /> (次/分)`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldEleven3",
      //   style: {
      //     minWidth: "50px",
      //     maxWidth: "50px"
      //   }
      // },
      {
        name: `
        入量(ml)
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量(ml)
        `,
        style: {},
        colspan: "3",
        rowspan: "1"
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
        胎心<br />(次/min)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        宫缩
        `,
        style: {},
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        胎动<br />(次/h)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        宫颈扩张<br />(cm)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        先露高低<br />(cm)
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
      // {
      //   name: `
      //   宫颈<br />疼痛<br />评分
      //   `,
      //   colspan: "1",
      //   rowspan: "3"
      // },
      // {
      //   name: `
      //   非药<br />物减<br />痛方法
      //   `,
      //   colspan: "1",
      //   rowspan: "3"
      // },
      {
        name: `
        膀胱<br />充盈度
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        膝反射
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `自定义1`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwentyTwo",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `自定义2`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwentyThree",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
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
        护士签名
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      // {
      //   name: `
      //   上级护士签名
      //   `,
      //   colspan: "1",
      //   rowspan: "3",
     
      // }
    ],
    mid: [
      { 
        name: `日期`, 
        colspan: "1",
        rowspan: "2" 
        
      },
      { 
        name: `时间`,
        colspan: "1", 
        rowspan: "2" 
      },
      {
        name: "内容",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: "量<br/>ml",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "内容",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: "量<br/>ml",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "颜色",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: "无",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        },
      },
      {
        name: "强度",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: "持续<br />(s)",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: "间歇<br />(min)",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
    ],
    bottom: [

    ]
  }
}; 
