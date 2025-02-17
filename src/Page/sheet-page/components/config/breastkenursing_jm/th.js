/*
江门妇幼-乳腺科护理记录单
*/
import moment from "moment";
function currYear() {
  return moment().format('YYYY年')
}
export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1380px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "62px"
        },
        // canSet: true,
        key: "recordYear",
      },
      {
        name: `
        体温<br/>（℃）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        脉搏<br/>（次/分）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>（次/分）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br/>（mmHg）
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血<br/>氧<br/>饱<br/>和<br/>度
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意<br/>识
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: "3",
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
      {
        name: `
        心<br/>电<br/>监<br/>护
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `中<br/>心<br/>静<br/>脉<br/>导<br/>管`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `伤<br/>口<br/>疼<br/>痛`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        伤<br/>口<br/>敷<br/>料
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `功<br/>能<br/>锻<br/>炼`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `静<br/>脉<br/>化<br/>疗`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "measuresSeven", //标题1
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "measuresEight", //标题2
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
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
        name: `护士<br/>签名
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
        name: "静脉<br/>（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "口服<br/>（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "血<br/>（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "引流量及性质",
        colspan: "4",
        rowspan: "1",
      },
    ],
    bottom: [
      {
        name: "尿管<br/>（ml）",
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "postOutputOne",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "胸壁<br/>（ml）",
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "postOutputTwo",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "腋窝<br/>（ml）",
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "postOutputThree", 
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "postOutputFour", //出量自定义
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },

    ]
  }
};
