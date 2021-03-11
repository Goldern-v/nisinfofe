export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1000px"
  },
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        入量（ml）
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: '80px',
        },
      },
      {
        name: `
        出量（ml）
        `,
        colspan: '6',
        rowspan: '1',
        style: {
          minWidth: '224px',
        },
      },
      {
        name: `
        病情记录
        `,
        colspan: '11',
        rowspan: '1',
        style: {
          minWidth: '412px',
        },
      },
      {
        name: `
        特殊处理及病情观察
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '150px'
        },
      },
      {
        name: `
        签名
        `,
        // style: {
        //   width: '50px'
        // },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [{
        name: `
        项目
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '36px',
        },
      },
      {
        name: `
        实入量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px',
        },
      },
      {
        name: `
        尿量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        大便
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        呕吐
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        引流
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        其它
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        总出量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '36px',
        },
      },
      {
        name: `
        意识
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        瞳孔
        `,
        colspan: '3',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        体温<br>℃
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        心率<br>/脉搏<br/>次/分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px'
        }
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px'
        }
      },
      {
        name: `
        血压<br/>(mmHg)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '50px'
        }
      },
      {
        name: `
        血氧饱和度%
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        氧疗<br>升/分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        疼痛
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
    ],
    bottom: [{
        name: `
        左<br>(mm)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        右<br>(mm)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        光反射
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
    ]
  }
}
