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
      },
      {
        name: '意识',
        style: {
          minWidth: '54px',
          maxWidth: '54px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '瞳孔',
        style: {
          minWidth: '90px',
          maxWidth: '90px',
        },
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `
        T
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
      },
      {
        name: `
        PR/HR
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        R
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        BP
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '65px',
          maxWidth: '65px',
        },
      },
      {
        name: `
        SPO2
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        氧疗
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: '100px',
        },
      },
      {
        name: `
        出入量
        `,
        colspan: '4',
        rowspan: '1',
        style: {
          minWidth: '250px',
          maxWidth: '250px',
        },
      },
      {
        name: `自定义`,
        colspan: '1',
        rowspan: '3',
        key:"customTitle",
        canSet:true
      },
      {
        name: `
        病情观察及护理措施
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '240px'
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
      //   护士签名
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
          maxWidth: '35px'
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
          maxWidth: '35px'
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
          maxWidth: '20px'
        },
      },
      {
        name: `
        ℃
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
          maxWidth: '45px'
        },
      },
      {
        name: `
        次/分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
          maxWidth: '45px'
        },
      },
      {
        name: `
        次/分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
          maxWidth: '45px'
        },
      },
      {
        name: `
        mmHg
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
          maxWidth: '45px'
        },
      },
      {
        name: `
        %
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
          maxWidth: '45px'
        },
      },
      {
        name: `
        方式
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
      },
      {
        name: `
        L/min
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
      },
      {
        name: `
        入量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '80px',
          maxWidth: '80px'
        },
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
          maxWidth: '45px'
        },
      },
      {
        name: `
        出量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '80px',
          maxWidth: '80px'
        },
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '45px',
          maxWidth: '45px'
        },
      },
    ],
    bottom: [
    ]
  }
}
