import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 横沥 - 手外科术后血运观察表
  deptType: "",
  style: {
    width: "900px"
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
        name: `指端/皮瓣颜色`,
        style: {
          minWidth: '96px',
          maxWidth: '96px'
        },
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `皮温`,
        style: {
          minWidth: '32px',
          maxWidth: '32px'
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `毛细血管<br/>充盈实验`,
        style: {
          minWidth: '32px',
          maxWidth: '32px'
        },
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `
      指端张力
      `,
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `
      肿胀程度
      `,
        colspan: '4',
        rowspan: '1',
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [
      {
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
        name: '正<br/>常',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '暗<br/>紫',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '苍<br/>白',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '正<br/>常',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '偏<br/>低',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '正<br/>常',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '慢',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '消<br/>失',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '正<br/>常',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '偏<br/>高',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '偏<br/>低',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '正<br/>常',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '轻<br/>度',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '中<br/>度',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '重<br/>度',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: []
  }
};
