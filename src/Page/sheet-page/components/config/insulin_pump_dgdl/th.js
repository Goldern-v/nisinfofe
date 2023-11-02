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
        name: "胰岛素泵运行",
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "皮肤情况",
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: "输注管路",
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "50px"
        }
      },
      {
        name: `敷贴`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `剩余药量(U)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `基础率(U)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px"
        }
      },
      {
        name: `更换笔芯`,
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `更换管道`,
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `更换储药器`,
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
        colspan: "1",
        rowspan: "3"
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
        name: `暂停`,
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
        name: `红肿`,
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
        name: `曲折`,
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
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `卷边`,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },

    ],
    bottom: [

    ]
  }
};
