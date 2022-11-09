export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "1300px"
    },
    th: {
      top: [
        {
          name: "日期",
          style: {
            minWidth: "36px",
            maxWidth: "36px"
          },
          colspan: "1",
          rowspan: "3"
        },
        {
          name: "时间",
          style: {
            minWidth: "36px",
            maxWidth: "36px"
          },
          colspan: "1",
          rowspan: "3"
        },
        //神志
        {
          name: "意识",
          style: {
            minWidth: "36px",
            maxWidth: "36px"
          },
          colspan: "1",
          rowspan: "3"
        },
        //体温
        {
          name: `
          体温<br/>(℃)
          `,
          style: {},
          colspan: "1",
          rowspan: "3",
          style: {
            minWidth: "18px",
            minWidth: "18px"
          }
        },
        //心率
        {
          name: `
          心率<br/>(次/分)
          `,
          style: {},
          colspan: "1",
          rowspan: "3",
          style: {
            whiteSpace: "nowrap",
            minWidth: "38px"
          }
        },
        //血压
        {
          name: `
          血压<br/>(mmHg)
          `,
          style: {
            minWidth: "52px",
            maxWidth: "52px",
            whiteSpace: "nowrap"
          },
          colspan: "1",
          rowspan: "3"
        },
        //呼吸
        {
          name: `
          呼吸<br/>(次/分)
          `,
          style: {},
          colspan: "1",
          rowspan: "3",
          style: {
            minWidth: "18px",
            minWidth: "18px"
          }
        },
        //SPO2
        {
          name: `
          血氧<br/>饱和度<br/>(%)
          `,
          style: {
            minWidth: "30px",
            maxWidth: "30px"
          },
          colspan: "1",
          rowspan: "3"
        },
        {
          name: `
          氧疗
          `,
          colspan: "3",
          rowspan: "1",
          canSet: false
        },
        //入量
        {
          name: `
          入量
          `,
          colspan: "2",
          rowspan: "1",
          canSet: false
        },
        //出量
        {
          name: `
          出量
          `,
          colspan: "3",
          rowspan: "1",
          canSet: false
        },
        // {
        //   name: `
        //   自定义
        //   `,
        //   key: "fieldNine", 
        //   style: {
        //     minWidth: "45px",
        //     maxWidth: "45px"
        //   },
        //   canSet: true,
        //   colspan: "1",
        //   rowspan: "3"
        // },
        {
          name: `
           
          `,
          key: "fieldTen", 
          style: {
            minWidth: "35px",
            maxWidth: "35px"
          },
          canSet: true,
          colspan: "1",
          rowspan: "3"
        },
        {
          name: `
           
          `,
          key: "expand2",
          style: {
            minWidth: "35px",
            maxWidth: "35px"
          },
          canSet: true,
          colspan: "1",
          rowspan: "3"
        },
        //护理记录
        {
          name: `
          病情观察及护理措施
          `,
          style: {
            minWidth: "255px",
            maxWidth: "255px"
          },
          colspan: "1",
          rowspan: "3"
        },
        //签名
        {
          name: `
          护士签名
          `,
          style: {},
          colspan: "1",
          rowspan: "3"
        }
      ],
      mid: [
        {
          name: `
          鼻导管
          `,
          style: {
            minWidth: "35px",
            maxWidth: "35px"
          },
          colspan: "1",
          rowspan: "2"
        },
        {
          name: `
          面罩
          `,
          style: {
            minWidth: "35px",
            maxWidth: "35px"
          },
          colspan: "1",
          rowspan: "2"
        },
        {
          name: `
           
          `,
          key: "fieldSeven",
          style: {
            minWidth: "35px",
            maxWidth: "35px"
          },
          canSet: true,
          colspan: "1",
          rowspan: "2"
        },
        {
          name: `
          项目
          `,
          style: {
            minWidth: "100px",
            maxWidth: "100px"
          },
          colspan: "1",
          rowspan: "2"
        },
        {
          name: `
          入量<br/>(ml)
          `,
          colspan: "1",
          rowspan: "2",
          style: {
            minWidth: "46px",
            maxWidth: "46px"
          }
        },
        {
          name: `
          项目
          `,
          style: {
            minWidth: "100px",
            maxWidth: "100px"
          },
          colspan: "1",
          rowspan: "2"
        },
        {
          name: `
          出量<br/>(ml)
          `,
          colspan: "1",
          rowspan: "2",
          style: {
            minWidth: "46px",
            maxWidth: "46px",
            whiteSpace: "nowrap"
          }
        },
        {
          name: `
          颜色<br/>性状
          `,
          colspan: "1",
          rowspan: "2",
          style: {
            minWidth: "56px",
            maxWidth: "56px",
            whiteSpace: "nowrap"
          }
        }
      ],
      bottom: []
    }
  };
  