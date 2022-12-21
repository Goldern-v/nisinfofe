// 护理记录单（统一护理记录单）
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1520px"
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
        入量
        `,
        style: {},
        colspan: "3",
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
        name: `
        病情评估
        `,
        colspan: "25",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        特殊处理及病区观察
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
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      }
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3"
      // }
    ],
    mid: [
      {
        name: "日期",

        colspan: "1",
        rowspan: "2"
      },
      {
        name: "时间",
 
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        途径
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        实入<br />量ml
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        出量<br />ml
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        颜色<br />性状
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        意识
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        瞳孔mm/<br />对光反应
        `,
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `肌力/级`,
        style: {
          // minWidth: "50px",
        },
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `体温<br/>℃`,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `心率<br />/<br />脉搏次/分`,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `呼吸<br />次/分`,
        style: {
          minWidth: "35px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `血压<br />mmHg`,
        style: {
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `血氧饱<br />和度%`,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `疼痛<br />评分 `,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      // {
      //   name: `氧疗/流量<br />L/min `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "2"
      // },
      {
        name: `氧疗/流量<br />L/min`,
        style: {},
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `多重<br />耐药`,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `护理<br />措施`,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `体位`,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `约束`,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `皮肤`,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `心理<br />状态`,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `营养<br />状况`,
        style: {},
        colspan: "1",
        rowspan: "2"
      }
    ],
    bottom: [{
        name: `左
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        RA
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        LA
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        RL
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        LL
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        鼻导管
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        面罩
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: ``, // 自定义
        style: {},
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "expand",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
    ]
  }
};
