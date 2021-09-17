import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1470px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "62px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: `
        箱<br/>温<br/>/<br/>床<br/>温<br/>℃
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        体<br/>温<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "30px",
          maxWidth: "30px",
        }
      },
      {
        name: `
        脉搏<br/>心率<br/>次<br/>/<br/>分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "30px",
          maxWidth: "30px",
        }
      },
      {
        name: `
        呼<br/>吸<br/>次<br/>/<br/>分
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血<br/>压<br/>m<br/>m<br/>H<br/>g
        `,
        style: {
          minWidth: "46px",
          maxWidth: "46px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血<br/>氧<br/>饱<br/>和<br/>度<br/>%
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        体<br/>位
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "30px",
          maxWidth: "30px",
        }
      },
      {
        name: `
        吸<br/>吮<br/>力
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脐<br/>部
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        经<br/>皮<br/>胆<br/>红<br/>素<br/>Umol<br/>/<br/>L
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
        胃<br/>管<br/>深<br/>度<br/>cm
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
        入量
        `,
        style: {
          minWidth: '86px',
        },
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量
        `,
        style: {
          minWidth: '126px',
        },
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        氧疗
        `,
        colspan: "3",
        rowspan: "1",
        canSet: false,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      }, {
        name: `
        吸痰性状/量
        `,
        colspan: "4",
        rowspan: "1",
        canSet: false,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `蓝<br/>光<br/>治<br/>疗`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `反应`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSix", //标题1
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: `哭声`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSeven", //标题2
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEight", //标题3
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        质控护士签名
        `,
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [
      {
        name: '日期',
        style: {
          minWidth: '34px',
          maxWidth: '34px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '34px',
          maxWidth: '34px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "52px"
        },
      },
      {
        name: `
        量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "30px"
        },
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "52px"
        },
      },
      {
        name: `
        量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "30px"
        },
      },
      {
        name: `
        颜色
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        方<br/>式
        `,
        colspan: "1",
        rowspan: "2",
        style: {}
      },
      {
        name: `
        流<br/>量<br/>L/<br/>分
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
        }
      },
      {
        name: `
        浓<br/>度<br/>%
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        }
      },
      {
        name: `
        口腔
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
        }
      },
      {
        name: `
        气管<br/>插管
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        }
      }
    ],
    bottom: [
      {
        name: `
        性状
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
        }
      },
      {
        name: `
        痰量
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        }
      },
      {
        name: `
        性状
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
        }
      },
      {
        name: `
        痰量
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        }
      }
    ]
  }
};
