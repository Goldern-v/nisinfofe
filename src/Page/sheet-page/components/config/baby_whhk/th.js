import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1200px"
  },
  th: {
    top: [
      { name: "", colspan: "2", rowspan: "1", key: "recordYear" },
      {
        name: "体<br/>温<br/>℃",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: "氧<br/>饱<br/>和<br/>度",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: "心<br/>率",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: "喂养",
        colspan: "3",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `皮肤`,
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `脐部`,
        colspan: "3",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `眼`,
        colspan: "3",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `大便`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "小<br/>便",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `黄疸指数<br/>（mg/dl）`,
        colspan: "3",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `其他`,
        style: {
          minWidth: "200px",
          maxWidth: "200px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `签 名`,
        style: {
          minWidth: "70px",
          maxWidth: "70px"
        },
        colspan: "1",
        rowspan: "3",
      },
    ],
    mid: [
      {
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
      {
        name: `母乳`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `混合`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `人工`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `正常`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `黄疸`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `湿疹`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `红臀`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `正常`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `发炎`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `出血`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `正常`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `分泌<br/>物多`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `红肿`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `次数`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `性状`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `额`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `胸`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `腹`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
    ],
    bottom: [

    ]
  }
};
