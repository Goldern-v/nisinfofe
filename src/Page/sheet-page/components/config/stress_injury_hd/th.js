export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1100px"
  },
  th: {
    top: [
      {
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
        name: "部位",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        分<br/>期
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        大小(cm)
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        基底颜色
        `,
        style: {},
        colspan: "4",
        rowspan: "1",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        渗出液</br>(量、性状、颜色)
        `,
        style: {
          minWidth: "52px",
          maxWidth: "52px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        渗液与敷料的关系
        `,
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        气<br/>味
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        潜行/窦道
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "68px",
          maxWidth: "68px"
        }
      },
      {
        name: `
        周围皮肤
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "50px",
          maxWidth: "50px"
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
        签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px",
          maxWidth: "50px",
          whiteSpace: "nowrap"
        },
      }
    ],
    mid: [
      {
        name: `
        长×宽×高
        `,
        style: {
          minWidth: "68px",
          maxWidth: "68px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        红色%
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        }
      },
      {
        name: `
        黄色%
        `,
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        黑色%
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
      其他%
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
          whiteSpace: "nowrap"
        }
      }
    ],
    bottom: []
  }
};
