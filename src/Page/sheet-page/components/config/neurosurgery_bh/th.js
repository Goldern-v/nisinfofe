/*
北海人一-神经外科危重护理记录
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1350px"
  },
  th: {
    top: [{
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "3",
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
        脉搏<br/>(次/分)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>(次/分)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压(mmHg)
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        血氧饱和度<br/>(%)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        吸氧<br/>(L/min)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        意识
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        GlasGon
        `,
        style: {},
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        瞳孔
        `,
        style: {},
        colspan: "4",
        rowspan: "1",
      },
      {
        name: `
        肌力
        `,
        style: {},
        colspan: "4",
        rowspan: "1",
      },
      {
        name: `
        特殊监测
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: "4",
        rowspan: "1",
      },
      {
        name: `
        管道护理
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        皮肤情况
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        病情记录
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: `
        NIBP
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        IBP
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        睁眼
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        语言
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        运动
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        直径<br/>(mm)
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        光反应
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        左
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        ICP<br/>mmHg
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        CVP<br/>cmH<sub>2</sub>0
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        名称
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        量<br/>ml
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        名称
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        量<br/>ml
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        颜色
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        性状
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [
      {
        name: `
        左
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        左
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        上肢
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        下肢
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        上肢
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        下肢
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },

    ]
  }
};
