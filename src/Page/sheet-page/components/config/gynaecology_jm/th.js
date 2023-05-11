/*
江门妇幼-妇科护理记录单
*/
import moment from "moment";
function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1240px"
  },
  th: {
    top: [{
        // name: currYear() + '年',
        name:currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
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
        血压<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血<br/>氧<br/>饱<br/>和<br/>度%
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意<br/>识
        `,
        colspan: "1",
        rowspan: "3",
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
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `留<br/>置<br/>尿<br/>管`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `留<br/>置<br/>镇<br/>痛<br/>泵`,
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
        rowspan: "3",
      },
      {
        name: `腹<br/>痛<br/>情<br/>况`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `阴<br/>道<br/>流<br/>血`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `特<br/>殊<br/>药<br/>物<br/>使<br/>用`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      // {
      //   name: `功<br/>能<br/>锻<br/>炼`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      // },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "measuresEight", //标题1
        style: {
          minWidth: "36px",
          maxWidth: "50px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "measuresNine", //标题2
        style: {
          minWidth: "36px",
          maxWidth: "50px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "measuresTen", //标题3
        style: {
          minWidth: "36px",
          maxWidth: "50px"
        }
      },
      {
        name: `
        特殊情况记录
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '155px',
          maxWidth: '155px',
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
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: "静脉<br/>（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
      },
      {
        name: "口服<br/>（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
      },
      {
        name: "血<br/>（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
      },
      {
        name: "引流量及性质",
        colspan: "4",
        rowspan: "1",
      },
    ],
    bottom: [
      // {
      //   name: "尿管<br/>（ml）",
      //   colspan: "1",
      //   rowspan: "1",
      //   style: {
      //     minWidth: '40px',
      //     maxWidth: '40px',
      //   },
      // },
      // {
      //   name: "胸壁<br/>（ml）",
      //   colspan: "1",
      //   rowspan: "1",
      //   style: {
      //     minWidth: '40px',
      //     maxWidth: '40px',
      //   },
      // },
      // {
      //   name: "腋窝<br/>（ml）",
      //   colspan: "1",
      //   rowspan: "1",
      //   style: {
      //     minWidth: '40px',
      //     maxWidth: '40px',
      //   },
      // },
      // {
      //   name: "腋窝<br/>（ml）",
      //   colspan: "1",
      //   rowspan: "1",
      //   style: {
      //     minWidth: '40px',
      //     maxWidth: '40px',
      //   },
      // },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "postOutputOne", // 出量-标题1
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "postOutputTwo", //标题2
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "postOutputThree", //标题3
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "postOutputFour", //标题4
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
    ]
  }
};
