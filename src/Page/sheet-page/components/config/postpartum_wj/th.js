/*
武警 - 产后(产房)观察记录单
*/
export default {
  style: {
    width: '900px'
  },
  // 科室的名称
  deptType: '',
  th: {
    top: [{
        name: '日期',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '血压<br/>(mmHg)',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '脉搏<br/>(次/min)',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '宫底<br/>U-Fb',
        colspan: '1',
        rowspan: '3'
      },
      
      {
        name: '子宫<br/>收缩',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        出血量<br/>(ml)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        膀胱<br/>情况
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        肛查
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        附注
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px"
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '70px',
          maxWidth: "153px",
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [],
    bottom: []
  }
}
