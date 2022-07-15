export default {
  // 科室的名称
  style:{
    width:'1200px'
  },
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
        name: `
        体温<br/>(℃)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        }
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        心率<br/>次/分
        `,
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
      },
      {
        name: `
        血压<br/>mmHg
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        意识
        `,
        style: {
          minWidth: '45px',
          maxWidth: '45px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        入
        `,
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `
        出
        `,
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `
        乳房<br/>情况
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        沁乳<br/>情况
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        功底<br/>高度<br/>u=Fb
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        子宫<br/>收缩
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        伤口
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `标题1`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'customField1',
        style: {
          minWidth: '38px',
          maxWidth: '38px',
        }
      },
      {
        name: `标题2`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'customField2',
        style: {
          minWidth: '38px',
          maxWidth: '38px',
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '270px',
          maxWidth: '270px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士<br/>签名
        `,
        style: {
          minWidth:'50px'
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: '日期',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        内容
        `,
        style: {
          minWidth: '105px',
          maxWidth: '105px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量<br/>ml
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
      },
      {
        name: `
        内容
        `,
        style: {
          minWidth: '105px',
          maxWidth: '105px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量<br/>ml
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
      }
    ],
    bottom: [
      
    ]
  }
}
