import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1100px"
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
        name: "箱温<br/>℃",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: "T<br/>℃",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: "HR<br/>次/<br/>min",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: "R<br/>次/<br/>min",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `BP<br/>nmHg`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "55px"
        }
      },
      {
        name: `SPO<sub>2</sub><br>(%)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `反应`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `哭声`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `吸吮<br/>力`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `脐部<br/>情况`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `肛周<br/>情况`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `喂养<br/>方式`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `喂养<br/>种类`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `入`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "27px"
        }
      },
      {
        name: `出`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "27px"
        }
      },
      {
        name: `特殊情况记录`,
        style: {
          minWidth: "200px",
          maxWidth: "200px"
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
      {
        name: `内容`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `量<br/>ml`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `内容`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `量<br/>ml`,
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
