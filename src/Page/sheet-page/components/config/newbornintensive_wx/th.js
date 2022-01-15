/*
威县-新生儿科重症监护记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1450px"
  },
  th: {
    top: [
      { "name": '',
      "colspan": "2",
      "rowspan": "1", 
      "key":'recordYear'
      },
      {
        name: "温<br/>度<br/>°C",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
         湿<br/>度<br/>%
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        生命体征
        `,
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        刻度
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        通气方式
        `,
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        专科项目
        `,
        colspan: "20",
        rowspan: "1"
      },
      {
        name: `
        临时项目
        `,
        colspan: "6",
        rowspan: "1"
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
      },
    ],
    mid: [
      {
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "2",
      },
      // 生命体征
      {
        name: `
        体<br/>温<br/>T<br/>°C
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        心率<br/>HR<br/>次／分
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        血氧<br/>Tcso2<br/>％
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        呼吸<br/>次／分
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      // 刻度
      {
        name: `
        胃管<br/>cm
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        气管<br/>插管<br/>cm
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      // 通气方式
      {
        name: `
        鼻塞<br/>cpap
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        气管<br/>插管
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        鼻导<br/>管吸<br/>氧
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        箱内<br/>吸氧
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      // 专科项目
      {
        name: `
        蓝光
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        灌肠
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        药眠
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        基础<br/>护理
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        全身<br/>皮肤<br/>颜色
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        全身<br/>皮肤<br/>状况
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        雾化<br/>吸入
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        拍背<br/>吸痰
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        经皮<br/>黄疸<br/>mg/dl
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        血糖<br/>mmol/l
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        检查<br/>输液<br/>部位
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        前囟
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        肌张<br/>力
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        吸吮<br/>力
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        肺部<br/>听诊
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        肠鸣<br/>音<br/>次∕分
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        哭声
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        三凹<br/>征
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        腹部
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        意识<br/>状态
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        痰液
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        呕吐
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        胃内<br/>引流
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
    ],
    bottom: [
      {
        name: `
        性质
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        量ml
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        性质
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        量ml
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        性质
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        量ml
        `,
        colspan: "1",
        rowspan: "1",
      },
    ]
  }
};
