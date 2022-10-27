export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "1270px"
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
          name: "神志",
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
            whiteSpace: "nowrap",
            minWidth: "38px"
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
            whiteSpace: "nowrap",
            minWidth: "38px"
          }
        },
        //SPO2
        {
          name: `
          SPO2<br/>(%)
          `,
          style: {
            minWidth: "40px",
            maxWidth: "40px"
          },
          colspan: "1",
          rowspan: "3"
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
          colspan: "2",
          rowspan: "1",
          canSet: false
        },
        //护理记录
        {
          name: `
          护理记录
          `,
          style: {
            minWidth: "346px",
            maxWidth: "346px"
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
          项目
          `,
          style: {
            minWidth: "110px",
            maxWidth: "110px"
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
            minWidth: "66px",
            maxWidth: "66px"
          }
        },
        {
          name: `
          项目
          `,
          style: {
            minWidth: "110px",
            maxWidth: "110px"
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
            minWidth: "66px",
            maxWidth: "66px",
            whiteSpace: "nowrap"
          }
        }
      ],
      bottom: []
    }
  };
  