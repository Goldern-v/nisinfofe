/*
北海人一-产科病重（危）患者护理记录
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1220px"
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
        血压<br/>(mmHg)
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
        吸氧<br/>(L/min)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
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
        宫底高度
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        阴道出血
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        手术切口
        `,
        colspan: "1",
        rowspan: "3",
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
        name: `自定义项`,
        style: {
          minWidth: "45px",
          maxWidth: "45px",
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customItem1"
      },
      {
        name: `自定义项`,
        style: {
          minWidth: "45px",
          maxWidth: "45px",
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "customItem2"
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
      {
        name: `
        审核签名
        `,
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
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

    ]
  }
};
