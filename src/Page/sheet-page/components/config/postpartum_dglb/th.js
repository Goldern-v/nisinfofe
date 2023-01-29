import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1230px"
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
        SPO<br/>2%
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
        阴道出血<br/>ml
        `,
        colspan: "1",
        rowspan: "3",
      },


      {
        name: `子宫收缩`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSix",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `宫底高度<br/>(U=<br/>FB)`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSeven",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `乳房情况`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEight",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `泌乳情况`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldNine",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `指导挤奶`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEleven",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `腹部切口敷料`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEleven1",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `会阴伤口`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEleven2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `肛门排气/肠鸣音<br /> (次/分)`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEleven3",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve2",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: '膝反射',
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field13",
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
          minWidth: "65px",
          maxWidth: "65px"
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
          minWidth: "65px",
          maxWidth: "65px"
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
    ],
    bottom: [

    ]
  }
}; 
