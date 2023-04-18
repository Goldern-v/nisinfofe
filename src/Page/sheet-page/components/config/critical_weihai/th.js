export default {
  // 胎心记录单
  deptType: '',
  style: {
    width: "1260px"
  },
  th: {
    top: [
      {
        name: '',
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: '基础护理',
        colspan: '3',
        rowspan: '1'
      },
      {
        name: '专科护理',
        colspan: '8',
        rowspan: '1'
      },
      {
        name: '其他',
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '用药情况',
        colspan: '4',
        rowspan: '1',
      },
      {
        name: `特殊情况记录`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '250px',
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
          口腔护理/会阴护理
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '35px',
          minWidth: '35px',
        },
      },
      {
        name: `
        床上擦浴/洗头
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '35px',
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
        气切护理
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
        约束护理
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
        动静脉置管护理
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '35px',
          minWidth: '35px',
        },
      },
      {
        name: `
        引流管护理
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '35px',
          minWidth: '35px',
        },
      },
      {
        name: `
        吸痰
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
        痰液颜色
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
        痰液性状
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
        痰液量
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
        尿液颜色
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
        大便颜色
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          maxWidth: '30px',
          minWidth: '30px',
        },
      },
      // {
      //   name: `自定义标题1`,
      //   canSet:true,
      //   key:"customTitle1",
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: "32px",
      //     maxWidth: "32px"
      //   },
      // },
      // {
      //   name: `自定义标题2`,
      //   canSet:true,
      //   key:"customTitle2",
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: "32px",
      //     maxWidth: "32px"
      //   },
      // },
      // {
      //   name: `自定义标题3`,
      //   canSet:true,
      //   key:"customTitle3",
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: "32px",
      //     maxWidth: "32px"
      //   },
      // },
      // {
      //   name: `自定义标题4`,
      //   canSet:true,
      //   key:"customTitle4",
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: "32px",
      //     maxWidth: "32px"
      //   },
      // },
      {
        name: `
        输液/注射用药
          `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        用量<br/>(ml)
          `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        口服/鼻饲用药
          `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        用量<br/>(ml)
          `,
        colspan: '1',
        rowspan: '2',
      },
    ],
    bottom: [

    ]
  }
}
