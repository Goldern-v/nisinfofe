export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1200px"
  },
  th: {
    top: [{
        name: "日期",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "时间",
        style: {
          minWidth: "25px",
          maxWidth: "25px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        体温<br/>(℃)
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脉搏<br/>(次/分)
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        呼吸<br/>(次/分)
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血压<br/>(mmHg)
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `胎位`,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `胎膜`,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `胎心<br>次/min`,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `血氧饱和度<br>%`,
        colspan: "1",
        rowspan: "3"
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
        宫缩
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `宫颈<br/>扩张<br>(cm)`,
        style: {
          minWidth: "60px",
          maxWidth: "60px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `先露<br/>高低<br>(cm)`,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "260px",
          maxWidth: "260px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        签名
        `,
        style: {},
        colspan: "1",
        rowspan: "2"
      }
    ],
    mid: [{
        name: `
      内<br/>容
      `,
        style: {
          minWidth: "38px",
          maxWidth: "38px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
      量<br/>(ml)
      `,
        style: {
          minWidth: "38px",
          maxWidth: "38px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
      内<br/>容
      `,
        style: {
          minWidth: "38px",
          maxWidth: "38px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
      量<br/>(ml)
      `,
        style: {
          minWidth: "62px",
          maxWidth: "62px",
        },
        colspan: "1",
        rowspan: "2"
      }, {
        name: `
        强度
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        持续<br>(s)
        `,
        style: {
          minWidth: "45px",
          maxWidth: "45px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        间歇<br/>(min)
        `,
        style: {
          minWidth: "45px",
          maxWidth: "45px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: []
  }
};
