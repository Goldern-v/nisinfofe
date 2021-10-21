/*
江门妇幼-NICU监护单
 */
export default {
  // 科室的名称
  style: {
    width: '1350px'
  },
  deptType: '',
  th: {
    top: [
      {
        name: '日期',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        台<br/>温<br/>度<br/>℃
        `,
        canSet: true,
        key: "boxTemperature",
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
      },
      {
        name: `
        台<br/>编<br/>号
        `,
        canSet: true,
        key: "boxCode",
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        生命体征
        `,
        style: {},
        colspan: '4',
        rowspan: '1'
      },
      {
        name: `
        观察项目
        `,
        style: {},
        colspan: '8',
        rowspan: '1'
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: '4',
        rowspan: '1'
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: '6',
        rowspan: '1'
      },
      {
        name: `
        治疗、护理项目
        `,
        colspan: '8',
        rowspan: '1'
      },
      {
        name: ``,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: "CustomField1",
      },
      {
        name: ``,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: "CustomField2",
      },
      {
        name: ``,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: "CustomField3",
      },
      {
        name: `
        护士<br/>签名
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '3'
      },
    ],
    mid: [
      {
        name: `
        体<br/>温<br/>℃
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        心<br/>率<br/>次/分
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        呼<br/>吸<br/>次/分
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        NBP<br/>/<br/>ABP<br/>mmHg
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        Spo2<br/>%
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        反<br/>应
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        哭<br/>声
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        肤<br/>色
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        肌<br/>张<br/>力
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        皮<br/>测<br/>Umol/L
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        血<br/>糖<br/>mmol/L
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        吸<br/>吮<br/>力
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        奶<br/>/<br/>口<br/>服<br/>药<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        输<br/>液<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        静<br/>脉<br/>营<br/>养<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        血<br/>制<br/>品<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        尿<br/>量<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        大<br/>便<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        引<br/>流<br/>量<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        呕<br/>吐<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: ``,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: "intCustomField1",
      },
      {
        name: ``,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: "intCustomField2",
      },
      {
        name: `
        光<br/>疗
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        雾<br/>化
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        吸<br/>痰
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        体<br/>位
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        皮<br/>肤<br/>护<br/>理
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        口<br/>腔<br/>护<br/>理
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        会<br/>阴<br/>护<br/>理
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        口<br/>腔<br/>免<br/>疫
        `,
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: [],
  }
}
