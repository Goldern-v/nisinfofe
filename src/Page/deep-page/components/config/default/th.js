export default {
  // 科室的名称
  deptType: '',
  th: {
    top: [
      {
        name: '日期',
        style: {
          minWidth: '28px',
          maxWidth: '28px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        T<br/>(℃)
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        P/HR<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        R<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        Bp<br/>(mmHg)
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        血氧饱和度%
        `,
        style: {},
        key: 'fieldTen',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        意识
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        入
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        出
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `伤口疼痛`,
        key: 'fieldOne',
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `伤口敷料`,
        key: 'fieldTwo',
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `患肢皮温`,
        key: 'fieldThree',
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `患肢颜色`,
        key: 'fieldFour',
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `患肢感觉`,
        key: 'fieldFive',
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `患肢肿胀`,
        key: 'fieldSix',
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `标题1`,
        style: {},
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: 'fieldSeven'
      },
      {
        name: `
        标题2
        `,
        style: {},
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: 'fieldEight'
      },
      {
        name: `
        标题3
        `,
        style: {},
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: 'fieldNine'
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '153px',
          maxWidth: '153px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: [
      {
        name: `
        名称
        `,
        style: {
          minWidth: '69px',
          maxWidth: '69px'
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        量(ml)
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        名称
        `,
        style: {
          minWidth: '66px',
          maxWidth: '66px'
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        量(ml)
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '1'
      },
    ]
  }
}