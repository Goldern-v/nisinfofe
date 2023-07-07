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
        name: "局部皮肤",
        colspan: "5",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "电池电量",
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: "基础率",
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "胰岛素<br/>剩余量",
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `管道通畅`,
        colspan: "2",
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
        name: `疼痛`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `瘙痒`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `渗血`,
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
        name: `异常`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
      },
      {
        name: `U/小时`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `U`,
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
        name: `更换<br/>贴膜`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `更换<br/>部位`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `更换<br/>贮药器`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
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
