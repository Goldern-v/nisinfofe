import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1300px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "62px"
        },
        canSet: true,
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
        colspan: "3",
        rowspan: "1"
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
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSix", //标题1
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
        key: "fieldSeven", //标题2
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
        key: "fieldEight", //标题3
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
        key: "fieldNine", //标题4
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
        rowspan: "3"
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
        colspan: "3",
        rowspan: "1",
      },
    ],
    bottom: [
    {
      name: "尿管",
      colspan: "1",
      rowspan: "1",
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
    },
    {
      name: "胸壁",
      colspan: "1",
      rowspan: "1",
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
    },
    {
      name: "腋窝",
      colspan: "1",
      rowspan: "1",
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
    },

    ]
  }
};
