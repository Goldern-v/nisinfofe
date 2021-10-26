/*
江门妇幼-交班记录单
*/
import moment from "moment";
function currYear() {
  return moment().format('YYYY年')
}
export default {
  // 科室的名称 关节骨科
  deptType: "",
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
        交班记录部分
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `签名
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
      },
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
        name: `
        病情变化/护理措施
        `,
        style: {
          minWidth: '905px',
          maxWidth: '905px',
        },
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
