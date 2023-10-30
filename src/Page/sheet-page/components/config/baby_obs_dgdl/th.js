import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1320px"
  },
  th: {
    top: [{
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: "体温",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "喂养方法",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "反应",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: "肌张力",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: "哭声",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `吸吮力`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `呕吐`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `皮肤颜色`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `脐部情况`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `臀部情况`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `大便次数`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `小便次数`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `自定义1`,
        colspan: "1",
        rowspan: "3",
        key:"customTitle1",
        canSet:true,
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `自定义2`,
        colspan: "1",
        rowspan: "3",
        key:"customTitle2",
        canSet:true,
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `特殊情况记录`,
        style: {
          minWidth: "300px",
          maxWidth: "300px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `护士签名`,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "3",
      },
    ],
    mid: [{
        name: `日期`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
      {
        name: `时间`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
    ],
    bottom: [

    ]
  }
};
