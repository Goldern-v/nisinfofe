import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
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
        体温<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "36px",
          maxWidth: "36px",
        }
      },
      {
        name: `
        呼<br/>吸<br/>次/<br/>分
        `,
        style: {
          minWidth: "36px",
          maxWidth: "36px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        体重<br/>kg
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        指尖<br/>血糖<br/>mmol/L
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        哭<br/>声
        `,
        style: {
          minWidth: "20px",
          maxWidth: "20px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        皮<br/>肤<br/>颜<br/>色
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        呕吐
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        吸吮力
        `,
        colspan: "1",
        rowspan: "3",
        canSet: false,
        style: {
          minWidth: "40px",
          maxWidth: "40px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        喂养
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
        name: `
        脐部情况
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
        name: `大便`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `小便`,
        style: {},
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
        key: "fieldFifteen", //标题1
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
        key: "fieldSixteen",
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
        护士<br>签名
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
          Width: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          Width: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        自<br/>吮
        `,
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        母乳
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
        人<br/>工
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
        奶<br/>量<br/>ml
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
        干洁
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "20px",
          maxWidth: "20px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        渗血
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "20px",
          maxWidth: "20px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        渗液
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "20px",
          maxWidth: "20px",
          whiteSpace: "nowrap"
        }
      },
    ],
    bottom: []
  }
};
