export default {
  // 胎心记录单
  deptType: '',
  style: {
    width: "1100px"
  },
  th: {
    top: [
      // {
      //   name: '',
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   key:'recordYear'
      // },
      {
        name: '日期',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '基础护理',
        colspan: '3',
        rowspan: '1'
      },
      {
        name: '呼吸道管理',
        colspan: '4',
        rowspan: '1'
      },
      {
        name: '管路护理',
        colspan: '8',
        rowspan: '1'
      },
      {
        name: '用药情况',
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `特殊情况记录`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '200px',
        },
      },
      {
        name: `签名`,
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: `
          口腔护理/会阴护理
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '42px',
          minWidth: '35px',
        },
      },
      {
        name: `
          翻身/扣背
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '30px',
          minWidth: '30px',
        },
      },
      {
        name: `
          皮肤护理
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '28px',
          minWidth: '28px',
        },
      },
      {
        name: `
          吸痰
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '28px',
          minWidth: '28px',
        },
      },
      {
        name: `
          颜色
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '28px',
          minWidth: '28px',
        },
      },
      {
        name: `
          性状
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '28px',
          minWidth: '28px',
        },
      },
      {
        name: `
          量
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '28px',
          minWidth: '28px',
        },
      },
      {
        name: `
          动静脉置管
          `,
        colspan: '3',
        rowspan: '1',
      },
      {
        name: `
          引流管
          `,
        colspan: '3',
        rowspan: '1',
      },
      {
        name: `
          尿管
          `,
        colspan: '2',
        rowspan: '1',
      },
    ],
    bottom: [
      {
        name: `
          名称
          `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '35px',
        },
      },
      {
        name: `
          长度
          `,
        colspan: '1',
        rowspan: '1',
        style: {
          maxWidth: '28px',
          minWidth: '28px',
        },
      },
      {
        name: `
          护理/通畅
          `,
        colspan: '1',
        rowspan: '1',
        style: {
          maxWidth: '30px',
          minWidth: '30px',
        },
      },
      {
        name: `
          名称
          `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '35px',
        },
      },
      {
        name: `
          引流液颜色
          `,
        colspan: '1',
        rowspan: '1',
        style: {
          maxWidth: '38px',
          minWidth: '35px',
        },
      },
      {
        name: `
          护理/通畅
          `,
        colspan: '1',
        rowspan: '1',
        style: {
          maxWidth: '30px',
          minWidth: '30px',
        },
      },
      {
        name: `
          尿液颜色
          `,
        colspan: '1',
        rowspan: '1',
        style: {
          maxWidth: '30px',
          minWidth: '30px',
        },
      },
      {
        name: `
          护理/通畅
          `,
        colspan: '1',
        rowspan: '1',
        style: {
          maxWidth: '30px',
          minWidth: '30px',
        },
      },
    ]
  }
}
