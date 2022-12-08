import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1400px"
  },
  th: {
    top: [{
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px"
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px"
        },
      },
      {
        name: '生命体征',
        style: {
          minWidth: '',
          maxWidth: '',
        },
        colspan: '5',
        rowspan: '1'
      },
      {
        name: '反应',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '哭声',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '肌张力',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '皮肤',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '呼吸',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '末梢',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '氧疗方式',
        style: {
          minWidth: '',
          maxWidth: '',
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '吸痰',
        style: {
          minWidth: '',
          maxWidth: '',
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '喂养观察',
        style: {
          minWidth: '',
          maxWidth: '',
        },
        colspan: '5',
        rowspan: '1'
      },
      {
        name: '小便观察',
        style: {
          minWidth: '',
          maxWidth: '',
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '大便观察',
        style: {
          minWidth: '',
          maxWidth: '',
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '管道观察',
        style: {
          minWidth: '',
          maxWidth: '',
        },
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `
        病情变化
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '150px'
        },
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '55px',
          maxWidth: '55px',
        },
        colspan: '1',
        rowspan: '2'
      },
      // {
      //   name: `
      //   医师签名
      //   `,
      //   style: {
      //     minWidth: '55px',
      //     maxWidth: '55px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: "体温<br/>℃",
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        心率（次/分）
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        呼吸（次/分）
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        血压（mmHg）
        `,
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        SPO2%
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        方式
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        流量（升/分）
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        痰色/性质
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        量（ml)
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        喂养方式
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        胃管深度(cm)
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        奶/母乳（ml）
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        水(ml)
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        呕吐(ml)
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        量(ml)
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        颜色
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: `
        量(ml)
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        颜色
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `
        管道名称
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: `
        引流量
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: `
        颜色/性状
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "100px",
          maxWidth: "100px"
        },
      },
    ],
    bottom: []
  }
}
