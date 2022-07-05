export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1250px"
  },
  th: {
    top: [
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
      },{
        name: '意识',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '瞳孔',
        style: {
          minWidth: '95px',
          maxWidth: '95px',
        },
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `
        体温<br/>(°C)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        心率/脉搏<br/>（次/分）
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '50px',
        },
      },
      {
        name: `
        呼吸<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
        },
      },
      {
        name: `
        血压<br/>(mmHg)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        SPO₂%
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        氧疗
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: '90px',
        },
      },
      {
        name: `
        出入量
        `,
        colspan: '9',
        rowspan: '1',
      },
      {
        name: `
        病情观察及护理措施
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '140px'
        },
      },
      {
        name: `
        签名
        `,
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   医师签名
      //   `,
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [{
        name: `
        左<br/>(mm)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '35px',
        },
      },
      {
        name: `
        右<br/>(mm)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '35px',
        },
      },
      {
        name: `
        光<br/>反<br/>射
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '20px',
        },
      },
      {
        name: `
        方式
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
        },
      },
      {
        name: `
        L/min
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
        },
      },
      {
        name: `
        项目
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '55px',
        },
      },
      {
        name: `
        入量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
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
        大便量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        痰液量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        标题1
        `,
        key:'fieldFour',
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
        canSet: true
      },
      {
        name: `
        标题2
        `,
        key:'dischargeSize',
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
        canSet: true
      },
      {
        name: `
        标题3
        `,
        key:'accessCustomize',
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
         canSet: true
      },
      {
        name: `
        出量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px',
        },
      },
    ],
    bottom: [
    ]
  }
}
