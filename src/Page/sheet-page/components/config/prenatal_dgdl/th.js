import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1300px"
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
        T<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        P<br/>次/min
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      // {
      //   name: `
      //   HR<br/>次/min
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      // },
      {
        name: `
        R<br/>次/min
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
        意识
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
        入量(ml)
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量(ml)
        `,
        style: {},
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        胎方位
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎心<br />(次/min)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        宫缩
        `,
        style: {},
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        胎动<br />(次/h)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        宫颈扩张<br />(cm)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        先露高低<br />(cm)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎膜
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        宫缩<br/>疼痛<br/>评分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        非药物<br/>疼痛<br/>方法
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        吸氧<br />L/分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎监<br />评价
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        膀胱<br />充盈度
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        膝反射
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `自定义1`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwentyTwo",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `自定义2`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwentyThree",
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
          minWidth: "150px",
          maxWidth: "150px"
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
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: "量<br/>ml",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "内容",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: "量<br/>ml",
        colspan: "1",
        rowspan: "2"
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
      {
        name: "无",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        },
      },
      {
        name: "强度",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: "持续<br />(s)",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: "间歇<br />(min)",
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
