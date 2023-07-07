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
          minWidth: "40px"
        }
      },
      {
        name: "Spo2<br/>%",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `胎<br/>心<br/>次<br/>/<br/>分`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `胎<br/>动<br/>次<br/>/h`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `胎膜`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `宫缩`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `先露`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `宫颈`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "40px"
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
        name: `阴<br/>道<br/>出<br/>血`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `子<br/>宫<br/>收<br/>缩`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `静<br/>脉<br/>置<br/>管`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `尿<br/>管`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "35px"
        }
      },
      {
        name: `入量`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `出量`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "40px"
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
        name: `护<br/>理<br/>措<br/>施`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `其他`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "150px"
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
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `持续/间歇`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `方位`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `高低`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `大小`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `厚薄`,
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
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
    ],
    bottom: [

    ]
  }
};
