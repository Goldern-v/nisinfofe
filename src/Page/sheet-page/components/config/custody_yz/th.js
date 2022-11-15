export default {
  style: {
    width: '830px'
  },
  // 科室的名称
  deptType: '',
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
        name: '神志',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '心律',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: 'HR<br/>(次',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: 'RR<br/>(次',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        BP
        `,
        style: {},
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        Spo2<br/>(%)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        备注
        `,
        style: {
          minWidth: "260px",
          // maxWidth: "260px"
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: '日期',
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        (Kpa)
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        (mmhg)
        `,
        colspan: '1',
        rowspan: '2',
      },
    ],
    bottom: []
  }
}
