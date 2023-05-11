/*
  江门妇幼-新生儿监护单
*/
import {
  wrap
} from "lodash";

// 年份
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1270px"
  },
  th: {
    top: [
      {
        name: currYear(),
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      // {
      //   name: '日期',
      //   style: {
      //     minWidth: '38px',
      //     maxWidth: '38px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // },
      // {
      //   name: '时间',
      //   style: {
      //     minWidth: '38px',
      //     maxWidth: '38px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // },
      {
        name: `
        台<br/>箱<br/>温<br/>℃
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: wrap,
          minWidth: '36px',
        }
      },
      {
        name: `
        台<br/>箱<br/>编<br/>号
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
        }
      },
      {
        name: `
        体温<br/>℃
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
        }
      },
      {
        name: `
        心率<br/>次/<br>分
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
        }
      },
      {
        name: `
        呼吸<br/>次/<br>分
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
        }
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        SPO<sub>2</sub><br>(%)
        `,
        style: {
          minWidth: '35px',
          maxWidth: '35px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        反应
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          width: '30px',
        }
      },
      {
        name: `
        哭声
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        }
      },
      {
        name: `
        肤色
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        }
      },
      {
        name: `
        肌<br>张<br>力
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '60px',
        }
      },
      {
        name: `
        脐部情况
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '36px',
          maxWidth: '42px'
        }
      },
      {
        name: `
        体位
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '30px',
        }
      },
      {
        name: `
        皮测<br>umol<br>/L
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
        }
      },
      {
        name: `
        蓝光治疗
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '20px',
        }
      },
      {
        name: `入量`,
        colspan: '2',
        rowspan: '1',
        style: {
          width: '60px',
        }
      },
      {
        name: `出量`,
        colspan: '3',
        rowspan: '1',
        style: {
          width: '80px',
        }
      },
      {
        name: `用氧方式`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `FiO2<br>(%)`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `血糖<br/>mmol<br/>/L`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '145px',
          maxWidth: '145px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        上级护士签名
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: '日期',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `静脉<br>ml`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '30px',
        },
      },
      {
        name: `进食<br>ml`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '50px',
        },
      },
      {
        name: `大便<br>g/性状`,
        style: {
          minWidth: '30px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `小便<br>ml`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '30px',
        },
      },
      {
        name: `标题1`,
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldSeventeen",
      },
    ],
    bottom: []
  }
}
