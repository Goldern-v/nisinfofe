export default {
  style: {
    width: "1240px"
  },
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
        name: '患者',
        style: {},
        colspan: "5",
        rowspan: "1",
        key:''
      },
      {
        name: '机器参数',
        style: {},
        colspan: "9",
        rowspan: "1",
        key:''
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "420px",
          maxWidth: "420px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        签名
        `,
        colspan: "1",
        rowspan: "3"
      },

    ],
    mid: [
      {
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "2",
      },
      //患者  
      {
        name: "体温<br/>℃",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "血压<br/>mmHg",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "心率<br/>次/分",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "呼吸<br/>次/分",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "血氧<br/>饱和<br/>度%",
        colspan: "1",
        rowspan: "2"
      },
      // 机器参数
      {
        name: "血流量<br/>ml/min",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "动脉压<br/>mmHg",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "静脉压<br/>mmHg",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "滤前压<br/>mmHg",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "跨膜压<br/>mmHg",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "透析液<br/>流速<br/>ml/h",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "血浆分离<br/>流速<br/>ml/h",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "超滤量<br/>ml",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "机温<br/>℃",
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [

    ]
  }
};
