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
    top: [
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: "先露部",
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: "宫口",
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: "胎心<br/>(次/分)",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: "阵缩",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `胎位`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      // {
      //   name: `血压`,
      //   colspan: "1",
      //   rowspan: "3",
      //   style: {
      //     minWidth: "50px"
      //   }
      // },
      {
        name: `胎膜`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `T<br/>℃`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `P<br/>(次/分)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `R<br/>(次/分)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `BP<br/>(mmHg)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `SpO₂<br/>%`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px"
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
        name: `检查`,
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
        name: `位置`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `高低`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `大小`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `硬度`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
    ],
    bottom: [

    ]
  }
};
