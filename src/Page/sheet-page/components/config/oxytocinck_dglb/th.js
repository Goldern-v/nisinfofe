export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "850px"
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
        name: '体温<br/>（℃）',
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '脉搏<br/>（次/分）',
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '呼吸<br/>（次/分）',
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        血压<br>mmHg
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: '1',
        rowspan: '3',
        canSet: false,
      },
      {
        name: `催产<br>素浓<br>度<br>（u/500ml）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `滴数<br>滴/分`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `宫缩<br>min`,
        style: {
          minWidth: '90px',
          maxWidth: '90px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `宫缩<br>强度<br>s`,
        style: {
          minWidth: '44px',
          maxWidth: '44px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `胎<br>方位`,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `胎心<br>次/分`,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `宫口<br>扩张<br>cm`,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `先露<br>高低<br>cm`,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `特殊情况记录`,
        style: {
          minWidth: '153px',
          maxWidth: '153px',
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `
        护士签名
        `,
        style: {
          minWidth: '46px',
          // maxWidth: '72px',
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {
      //     minWidth: '46px',
      //     // maxWidth: '72px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
          // display: 'none',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: [
    ]
  }
}
