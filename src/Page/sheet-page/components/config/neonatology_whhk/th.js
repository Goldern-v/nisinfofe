import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1330px"
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
        name: "生命体征",
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: "SpO₂<br/>%",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: "体重<br/>Kg",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
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
        name: `面色`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `呼吸支持及氧疗`,
        colspan: "7",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `静脉<br/>导管`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: ``,
        canSet: true,
        key: 'order',
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `入量ml`,
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "出量",
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `其他`,
        style: {
          minWidth: "190px",
          maxWidth: "190px"
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
        name: `T<br/>℃`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `HR<br/>次/分`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `R<br/>次/分`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `BP<br/>mmHg`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `呼吸机<br/>模式`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `f<br/>次/分`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `FiO₂<br/>%`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `插管<br/>深度<br/>cm`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `CPAP<br/>%`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `氧疗箱<br/>%`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `面罩<br/>l/min`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: ``,
        canSet: true,
        key: 'catheter',
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `静脉给药`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `饮食`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `小便<br/>次`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: `大便<br/>次`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `其他ml`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
    ],
    bottom: [
      {
        name: `项目`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `量`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: `项目`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `量`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
      {
        name: `项目`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `量`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
      },
    ]
  }
};
