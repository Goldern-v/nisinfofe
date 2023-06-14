import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  th: {
    top: [{
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
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
        rowspan: "3",
        style: {
          minWidth: "26px",
          maxWidth: "26px"
        },
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
          minWidth: "48px"
        }
      },
      {
        name: `
        基底颜色
        `,
        colspan: "4",
        rowspan: "1",
      },
      {
        name: `
        渗出液</br>(量、性状、颜色)
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
        渗液与敷料的关系
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
        气<br/>味
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
        潜行/窦道
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `
        周围皮肤
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          width: "153px"
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
      }
    ],
    mid: [{
        name: "日期",
        colspan: "1",
        rowspan: "2",
      },
      {
        name: "时间",
        colspan: "1",
        rowspan: "2",
      }, {
        name: `
        长×宽×高
        `,
        style: {
          minWidth: "48px",
          maxWidth: "48px"
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
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `
        黄色%
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
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
          minWidth: "50px",
          maxWidth: "50px",
        }
      },
      {
        name: `
      其他%
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px",
        }
      }
    ],
    bottom: []
  }
};
