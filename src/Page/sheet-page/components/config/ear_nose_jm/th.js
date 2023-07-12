/*
  江门妇幼-儿科护理记录单
*/
// 添加的
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  style: {
    width: '1200px'
  },
  deptType: '',
  th: {
    top: [
      {
        name: currYear(),
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: `体温<br/>(℃)`,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        }
      },
      {
        name: `脉搏<br/>次/分`,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        }
      },
      {
        name: `呼吸<br/>次/分`,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        }
      },
      {
        name: `血压<br/>mmHg`,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `血氧饱和度`,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        }
      },
      {
        name: `意识`,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          width: '48px',
        }
      },
      {
        name: `
        入量
        `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `出量`,
        colspan: '3',
        rowspan: '1',
      },
      {
        name: `咽痛`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        }
      },
      {
        name: `睡眠<br>打鼾`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        }
      },
      {
        name: `低流<br>量吸<br>氧`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        }
      },
      {
        name: `心电<br>监护`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        }
      },
      {
        name: `咽部伤口渗血`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        }
      },
      {
        name: `自定义`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldSix',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `自定义`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldSix2',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `自定义`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldSix3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `特殊情况记录`,
        style: {
          minWidth: '200px',
          maxWidth: '200px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `护士签名`,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
    ],
    mid: [
       {
        name: '日期',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `静脉<br>ml`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `口服<br>ml`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: `大便<br>g`,
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `尿<br>ml`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
      }, {
        name: `颜色<br>性状`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
    ],
    bottom: []
  }
}
