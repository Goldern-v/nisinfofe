import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1200px"
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
        name: `
        脉搏<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },
      {
        name: `
        血压<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },

      {
        name: `
        SPO<br/>2%
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },
      {
        name: `宫底高度<br/>(U=<br/>FB)`,
        colspan: "1",
        rowspan: "3",
        key: "uterineFloor",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },

      {
        name: `膀胱情况`,
        colspan: "1",
        rowspan: "3",
        key: "bladder",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },
      {
        name: `子宫收缩`,
        colspan: "1",
        rowspan: "3",
        key: "uterineShrink",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },

      {
        name: `肛查`,
        colspan: "1",
        rowspan: "3",
        key: "examination",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },

      {
        name: `
        入量
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },

      // {
      //   name: `标题1`,
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "fieldTwelve",
      //   style: {
      //     minWidth: "30px",
      //     maxWidth: "30px"
      //   }
      // },
      // {
      //   name: `标题2`,
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "armValue",
      //   style: {
      //     minWidth: "30px",
      //     maxWidth: "30px"
      //   }
      // },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      // {
      //   name: `
      //   上级护士签名
      //   `,
      //   colspan: "1",
      //   rowspan: "3",

      // }
    ],
    mid: [
      {
        name: `日期`,
        colspan: "1",
        rowspan: "2"

      },
      {
        name: `时间`,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "内容",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },
      },
      {
        name: "量<br/>ml",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: "内容",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },
      },
      {
        name: "量<br/>ml",
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
