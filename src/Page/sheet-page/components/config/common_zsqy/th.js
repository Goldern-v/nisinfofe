import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1300px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "82px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: "体温<br/>℃",
        style: {
          width: "30px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          width: "30px"
        }
      },
      {
        name: `
        心率<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          width: "30px"
        }
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          width: "30px"
        }
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血氧<br>饱和<br>度<br>(%)
        `,
        style: {
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        微量血<br>糖测量<br>mmol/L
        `,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        氧疗
        `,
        style: {
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        神志
        `,
        style: {
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胃纳
        `,
        style: {
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        恶心
        `,
        style: {
          width: "25px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        呕吐
        `,
        style: {
          width: "25px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        腹胀
        `,
        style: {
          width: "25px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        头晕
        `,
        style: {
          width: "25px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胸闷
        `,
        style: {
          width: "25px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        痰
        `,
        style: {
          minWidth: '78px',
        },
        colspan: "4",
        rowspan: "2"
      },
      {
        name: `
        瞳孔
        `,
        style: {
          minWidth: '78px',
        },
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        四肢肌力
        `,
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: '53px',
        },
      },
      {
        name: `
        入量
        `,
        style: {
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        出量
        `,
        style: {
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        统计量
        `,
        style: {
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        管道记录
        `,
        style: {
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `补充`,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldOne",
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "150px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px",
        },
      },
    ],
    mid: [{
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      
      {
        name: `
        左侧
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        右侧
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        左侧
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        右侧
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          width: "40px"
        },
      },
    ],
    bottom: [
      {
        name: `
        吸<br>/<br>咳
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        色
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        量
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        质
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        直<br>径<br>m<br>m
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        对<br>光<br>反<br>射
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        直<br>径<br>m<br>m
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        对<br>光<br>反<br>射
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        上<br>肢
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        下<br>肢
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        上<br>肢
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
      {
        name: `
        下<br>肢
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "25px"
        },
      },
    ]
  }
};
