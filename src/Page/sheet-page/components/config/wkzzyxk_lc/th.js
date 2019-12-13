export default {
  // 科室的名称
  deptType: '',
  th: {
    top: [
      //日期时间
      {
        name: `日期<br/>时间`,
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      //神志
      {
        name: '神志',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      //瞳孔
      {
        name: `
        瞳孔
        `,
        style: {},
        colspan: '4',
        rowspan: '1'
      },
      //体温
      {
        name: `
        体温<br/>(℃)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '34px',
        }
      },
      //心率
      {
        name: `
        心率<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '38px',
        }
      },
      //血压
      {
        name: `
        血压<br/>(mmHg)
        `,
        style: {
          minWidth: '52px',
          maxWidth: '52px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '3'
      },
      //呼吸
      {
        name: `
        呼吸<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '38px',
        }
      },
      //SpO2
      {
        name: `
        SpO2
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px'
        },
        colspan: '1',
        rowspan: '3'
      },
      //入量
      {
        name: `
        入量
        `,
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },
      //出量
      {
        name: `
        出量
        `,
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },
      //护理记录
      {
        name: `
        护理记录
        `,
        style: {
          minWidth: '153px',
          maxWidth: '153px',
        },
        colspan: '1',
        rowspan: '3'
      },
      //签名
      {
        name: `
        签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: `
        左
        `,
        style: {
          whiteSpace: 'nowrap'
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        右
        `,
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        项目
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        入量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '28px',
          maxWidth: '28px',
        },
      },
      {
        name: `
        项目
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        出量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '28px',
          maxWidth: '28px',
          whiteSpace: 'nowrap'
        },
      },
    ],
    bottom: [
      {
        name: `
        直径(mm)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        光反应
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        直径(mm)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        光反应
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
    ]
  }
}
