export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1400px"
  },
  th: {
    top: [
      {
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        生命体征项目
        `,
        style: {},
        colspan: '6',
        rowspan: '1',
      },
      {
        name: `
        出量
        `,
        colspan: "5",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        入量
        `,
        colspan: "4",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        基础护理
        `,
        style: {},
        colspan: '5',
        rowspan: '1',
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
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {},
      //   colspan: '1',
      //   rowspan: '2'
      // },
    ],
    mid: [
      {
        name: `
        体温℃
        `,
        style: {},
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        style: {},
        colspan: '1',
        rowspan: '2',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '38px',
        }
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        style: {},
        colspan: '1',
        rowspan: '2',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '38px',
        }
      },
      {
        name: `
        血压mmHg
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
        氧饱和度%
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        神志
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },

      {
        name: `尿量ml`,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `呕吐ml`,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `大便ml`,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `其他引流量ml`,
        style: {
          minWidth: '80px',
          maxWidth: '80px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `其他`,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `口服ml`,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `静脉ml`,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `肌肉注释ml`,
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `灌肠ml`,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `皮肤情况`,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `管道护理`,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `气道护理`,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `痰液性状`,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `其他`,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      }
    ],
    bottom: [
    ]
  }
}
