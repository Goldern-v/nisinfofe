/*
江门妇幼-产前待产护理记录单
*/
import moment from "moment";
function currYear() {
  return moment().format('YYYY年')
}
export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1200px"
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
        氧疗及机械通气参数
        `,
        style: {},
        colspan: "12",
        rowspan: "1",
      },
      {
        name: `签名
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '80px',
          maxWidth: '800px',
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
        氧疗模式
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        流量<br/>L/min
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        通气模式
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        PIP<br/>cmH2O
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        PEEP<br/>cmH2O
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        Pmean
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        FiO2<br/>%
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        Ti<br/>Ampl/秒
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        MV<br/>L/min
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `RR<br/>次/ min`,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `P/振幅`,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        湿化器显<br/>示温度℃
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
