export default {
    // 科室的名称
    deptType: '',
    style: {
      width: "1300px"
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
          name: '意识',
          style: {
            minWidth: '44px',
            maxWidth: '44px',
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '瞳孔',
          style: {
            minWidth: '50px',
            maxWidth: '50px',
          },
          colspan: '3',
          rowspan: '1'
        },
        {
          name: `
          体温
          `,
          colspan: '1',
          rowspan: '1',
          style: {
            minWidth: '20px',
            maxWidth: '20px',
          },
        },
        {
          name: `
          脉搏/心率
          `,
          colspan: '1',
          rowspan: '1',
          style: {
            minWidth: '50px',
            maxWidth: '50px',
          },
        },
        {
          name: `
          呼吸
          `,
          colspan: '1',
          rowspan: '1',
          style: {
            minWidth: '20px',
            maxWidth: '20px',
          },
        },
        {
          name: `
          血压
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
          血氧饱和度
          `,
          colspan: '1',
          rowspan: '1',
          style: {
            minWidth: '28px',
            maxWidth: '28px',
          },
        },
        {
          name: `
          氧疗
          `,
          colspan: '3',
          rowspan: '1',
          style: {
            minWidth: '50px',
          },
        },
        {
          name: `
          出入量
          `,
          colspan: '5',
          rowspan: '1',
          style: {
            minWidth: '100px',
            maxWidth: '100px',
          },
        },
        {
          name: ``,
          colspan: '1',
          rowspan: '3',
          key:"customTitle",
          canSet:true
        },
        {
          name: ``,
          colspan: '1',
          rowspan: '3',
          key:"fieldNine",
          canSet:true
        },
        {
          name: `
          病情观察及护理措施
          `,
          colspan: '1',
          rowspan: '3',
          style: {
            minWidth: '245px'
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
      mid: [
        {
          name: '日期',
          style: {
            minWidth: '25px',
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
        },{
          name: `
          左<br/>(mm)
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '25px',
            maxWidth: '25px'
          },
        },
        {
          name: `
          右<br/>(mm)
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '25px',
            maxWidth: '25px'
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
            minWidth: '35px',
            maxWidth: '35px'
          },
        },
        {
          name: `
          次/分
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '28px',
            maxWidth: '28px'
          },
        },
        {
          name: `
          次/分
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
          mmHg
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
          %
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '30px',
            maxWidth: '30px'
          },
        },
        {
          name: `
          鼻导管
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '50px',
            maxWidth: '50px'
          },
        },
        {
          name: `
          面罩
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '30px',
            maxWidth: '30px'
          },
        },
        {
          name: ``,
          colspan: '1',
          rowspan: '2',
          key:"fieldSeven",
          canSet:true
        },
        
        {
          name: `
          入量
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '70px',
            maxWidth: '70px'
          },
        },
        {
          name: `
          量<br/>(ml)
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
          出量
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '70px',
            maxWidth: '70px'
          },
        },
        {
          name: `
          量<br/>(ml)
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
          颜色<br/>性状
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '35px',
            maxWidth: '35px'
          },
        },
      ],
      bottom: [
      ]
    }
  }
  