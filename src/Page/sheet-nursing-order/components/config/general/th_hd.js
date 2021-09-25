import moment from "moment";
function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  th: {
    top: [
      {
        name: '起始',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: `开嘱护士签名`,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `护嘱内容`,
        style: {
          minWidth: "220px",
          maxWidth: "220px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `频次`,
        style: {
          minWidth: "100px",
          maxWidth: "100px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `停止`,
        colspan: "2",
        rowspan: "1",
        canSet: false
      },
      {
        name: `停嘱护士签名`,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "2",
        canSet: false
      },
      {
        name: `备注`,
        style: {
          minWidth: "60px",
          maxWidth: "60px",
          width:"60px"
        },
        colspan: "1",
        rowspan: "2"
      }
    ],
    mid: [
      {
        name: "日期",
        style: {
          minWidth: "40px",
          maxWidth: "40px",
          width:"40px",
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "时间",
        style: {
          minWidth: "40px",
          maxWidth: "40px",
          width: "40px",
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "日期",
        style: {
          minWidth: "40px",
          maxWidth: "40px",
          width: "40px",
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "时间",
        style: {
          minWidth: "40px",
          maxWidth: "40px",
          width: "40px",
        },
        colspan: "1",
        rowspan: "1"
      }
    ]
    // bottom: [
    //   {
    //     name: `
    //     左
    //     `,
    //     colspan: "1",
    //     rowspan: "1",
    //     style: {
    //       minWidth: "25px",
    //       whiteSpace: "nowrap"
    //     }
    //   },
    //   {
    //     name: `
    //     右
    //     `,
    //     colspan: "1",
    //     rowspan: "1",
    //     style: {
    //       minWidth: "25px",
    //       whiteSpace: "nowrap"
    //     }
    //   },
    //   {
    //     name: `
    //     左
    //     `,
    //     colspan: "1",
    //     rowspan: "1",
    //     style: {
    //       minWidth: "25px",
    //       whiteSpace: "nowrap"
    //     }
    //   },
    //   {
    //     name: `
    //     右
    //     `,
    //     colspan: "1",
    //     rowspan: "1",
    //     style: {
    //       minWidth: "25px",
    //       whiteSpace: "nowrap"
    //     }
    //   }
    // ]
  }
};