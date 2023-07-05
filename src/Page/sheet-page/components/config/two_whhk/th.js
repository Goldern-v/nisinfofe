import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1420px"
  },
  th: {
    top: [
      { name: "", colspan: "2", rowspan: "1", key: "recordYear" },
      {
        name: "意识",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: "生命体征",
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: "SpO₂<br/>%",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `切<br/>口<br/>敷<br/>料`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `受<br/>压<br/>皮<br/>肤`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `静脉置管`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "120px"
        }
      },
      {
        name: `导管及引流管`,
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `入量`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `出量`,
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `护<br/>理<br/>措<br/>施`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `健<br/>康<br/>教<br/>育`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `其他`,
        colspan: "5",
        rowspan: "1",
        style: {
          minWidth: "35px"
        }
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
        name: `T<br/>℃`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `P<br/>次/分`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `R<br/>次/分`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `Bp<br/>mmHg`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldFive',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'intravenous2',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldFifteen',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldSixteen',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldSeventeen',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldEighteen',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `项目`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `量<br/>ml`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: `项目`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `量<br/>ml`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: `颜色`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: `性状`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldEleven',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldTwelve',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldThirteen',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'fieldFourteen',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'description',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "150px",
          maxWidth: "150px"
        },
      },
    ],
    bottom: [

    ]
  }
};
