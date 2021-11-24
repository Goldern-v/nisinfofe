/*
陵城-病重（病危）患者护理记录（新生儿）
*/
export default {
    // 科室的名称
    style: {
      width: "1300px"
    },
    deptType: '',
    th: {
      top: [{
          name: '日期',
          style: {
            minWidth: '32px',
            maxWidth: '32px',
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '时间',
          style: {
            minWidth: '32px',
            maxWidth: '32px',
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          意识
          `,
          style: {},
          colspan: '1',
          rowspan: '3',
          style: {
            minWidth: '40px',
          }
        },
        {
          name: `
          体<br/>温<br/>(℃)
          `,
          style: {},
          colspan: '1',
          rowspan: '3',
          style: {
            minWidth: '32px',
          }
        },
        {
          name: `
          心<br/>率<br/>(次/分)
          `,
          style: {},
          colspan: '1',
          rowspan: '3',
          style: {
            minWidth: '32px',
          }
        },
        {
          name: `
          呼<br/>吸<br/>(次/分)
          `,
          style: {},
          colspan: '1',
          rowspan: '3',
          style: {
            minWidth: '32px',
          }
        },
        {
          name: `
          血压<br/>(mmHg)
          `,
          style: {
            minWidth: '48px',
            maxWidth: '48px',
            whiteSpace: 'nowrap'
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          SPO2<br/>%
          `,
          style: {
            minWidth: '32px',
            maxWidth: '32px',
            whiteSpace: 'nowrap'
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          反应
          `,
          style: {
            minWidth: '42px',
            maxWidth: '42px',
            whiteSpace: 'nowrap'
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          哭声
          `,
          style: {
            minWidth: '42px',
            maxWidth: '42px',
            // whiteSpace: 'nowrap'
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          肌<br/>张<br/>力
          `,
          colspan: '1',
          rowspan: '3',
          canSet: false,
        },
        {
          name: `
          吸<br/>吮<br/>力
          `,
          colspan: '1',
          rowspan: '3',
          canSet: false,
        },
        {
          name: `
          氧疗(L/min)
          `,
          colspan: '3',
          rowspan: '1'
        },
        {
          name: `
          入量
          `,
          colspan: '2',
          rowspan: '1'
        },
        {
          name: `
          出量
          `,
          colspan: '3',
          rowspan: '1'
        },
        {
          name: `标题1`,
          key:"customTitle1",
          colspan: '1',
          rowspan: '3',
          canSet: true,
          key: 'fieldEleven',
          style: {
            minWidth: '46px',
            maxWidth: '46px',
          }
        },
        {
          name: `标题2`,
          colspan: '1',
          rowspan: '3',
          canSet: true,
          key: 'customTitle2',
          style: {
            minWidth: '46px',
            maxWidth: '46px',
          }
        },
        {
          name: `
          病情观察及护理措施
          `,
          style: {
            minWidth: '303px',
            maxWidth: '303px',
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          护士签名
          `,
          style: {
            minWidth: '60px',
            maxWidth: '60px',
          },
          colspan: '1',
          rowspan: '3'
        }
      ],
      mid: [{
          name: `
          鼻导管
          `,
          colspan: '1',
          rowspan: '2'
        },
        {
          name: `
          面罩
          `,
          colspan: '1',
          rowspan: '2'
        },
        {
          name: `
          标题1
          `,
          key:'therapyCustomize',
          colspan: '1',
          rowspan: '2',
          canSet:true
        },
        {
          name: `
          名称
          `,
          colspan: '1',
          rowspan: '2'
        },
        {
          name: `
          ml
          `,
          colspan: '1',
          rowspan: '2'
        },
        {
          name: `
          名称
          `,
          colspan: '1',
          rowspan: '2'
        },
        {
          name: `
          ml
          `,
          colspan: '1',
          rowspan: '2'
        },
        {
          name: `
          颜色形状
          `,
          colspan: '1',
          rowspan: '2'
        },
      ],
      bottom: []
    }
  }
  