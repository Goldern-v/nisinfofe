import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1350px"
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
        体温<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        脉搏<br/>心率<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        SPO<br/>2%
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意识
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `子宫收缩`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "uterineShrink",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `宫底高度<br/>(U=<br/>FB)`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fundusHeight",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `乳房情况`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "breastCondition",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `泌乳情况`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "lactation",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `腹部切口敷料`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "dressing",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `会阴<br/>伤口`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customTitle3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `疼痛<br/>评分`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "painScore",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `膀胱充<br />盈度`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "bladder",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
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
        colspan: "3",
        rowspan: "1"
      },
      {
        name: '吸氧<br />升/分',
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: 'oxygenInhalation',
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: '膝反射',
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "kneeReflex",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: '留置尿管',
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "urineTube",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: '留置镇痛泵',
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "pump",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: '肛门排气',
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "exhaust",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `标题1`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customTitle1",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `标题2`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customTitle2",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
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
      {
        name: "颜色",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
    ],
    bottom: [

    ]
  }
};
