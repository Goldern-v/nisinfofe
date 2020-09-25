export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1300px"
  },
  th: {
    top: [{
        name: "日<br/>期",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "时<br/>间",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
        colspan: "1",
        rowspan: "3"
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
        脉<br/>搏<br/>次<br/>/<br/>分
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
          minWidth: "50px",
          maxWidth: "50px",
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
        colspan: "3",
        rowspan: "1",
        canSet: false,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `
        出量
        `,
        colspan: "3",
        rowspan: "1",
        canSet: false,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
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
        colspan: "2",
        rowspan: "2",
        canSet: false,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `篮<br/>光<br/>治<br/>疗<br/>/<br/>呻<br/>吟`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
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
        key: "fieldTwelve",
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
        key: "fieldTwelve",
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
        签名
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [{
        name: `
        口服
        `,
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        },
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        静<br/>脉<br/>入<br/>液<br/>量<br/>ml
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
        尿<br/>量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        大<br/>便<br/>情<br/>况<br/>/量<br/>g
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
        呕<br/>吐<br/>物<br/>性<br/>质<br/>/量<br/>ml
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
    ],
    bottom: [{
        name: `
        种<br/>类
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
        方<br/>式<br/>/<br/>量<br/>ml
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        }
      }, {
        name: `
        口<br/>腔
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
        气<br/>管<br/>插<br/>管
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
