export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1100px"
  },
  th: {
    top: [{
        name: "日期",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "时间",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        医<br/>嘱<br/>奶<br/>量<br/>ml
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "34px"
        }
      },
      {
        name: `
       实际奶量<br/>(ml)
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        尿<br/>量<br/>ml
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        呕<br/>吐<br/>量<br/>m
        `,
        style: {
          minWidth: "52px",
          maxWidth: "52px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        大<br/>便<br/>次
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        体<br/>重<br/>Kg
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [{
        name: `
       母<br/>乳
        `,
        style: {
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
      配<br/>方
        `,
        style: {
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      }
    ],
    bottom: []
  }
};
