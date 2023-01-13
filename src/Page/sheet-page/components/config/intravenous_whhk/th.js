import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1280px"
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
        name: "局部皮肤",
        colspan: "6",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "导管置<br/>入长度",
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "管道通畅",
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "贴膜情况",
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `护理措施`,
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `其他`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "200px"
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
        name: `正常`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `红肿`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `压痛`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `硬结`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `皮温升高`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `脓性<br/>分泌物`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `厘米`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `通畅`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `不通畅`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `正常`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `潮湿`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `污染`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `松动`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `更换<br/>贴膜`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `开管`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `封管`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `拔管`,
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
