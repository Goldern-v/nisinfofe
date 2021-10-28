/*
江门妇幼-PICU监护单
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
        台温度℃
        `,
        canSet: true,
        key: "boxTemperature",
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        生命体征
        `,
        style: {},
        colspan: '10',
        rowspan: '1'
      },
      {
        name: `
        机械通气
        `,
        style: {},
        colspan: '6',
        rowspan: '1'
      },
      {
        name: `
        入液量
        `,
        style: {},
        colspan: '7',
        rowspan: '1'
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `
        
        `,
        style: {},
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        治疗、护理项目
        `,
        colspan: '6',
        rowspan: '1'
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
        NBP<br/>mmHg
        `,
        canSet: true,
        key: "nbp",
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
        CVP<br/>mmHg
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        神<br/>志
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
        体<br/>位
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: ``,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: "customField",
      },
      {
        name: `
        通<br/>气<br/>模<br/>式
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        Fio2<br/>%<br/>/<br/>Ti
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        VTE<br/>/<br/>呼<br/>吸<br/>频<br/>率
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        PEEP<br/>/<br/>PIP
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        Pmean
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        △P<br/>/<br/>振<br/>幅
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        A<br/>口<br/>服<br/>类<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        B<br/>抗<br/>生<br/>素<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        C<br/><br/>补<br/>液<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        D<br/>血<br/>制<br/>品<br/>ml
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
        入<br/>量<br/>累<br/>计<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        尿<br/>/<br/>便<br/>ml
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
        出<br/>量<br/>累<br/>计<br/>ml
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        平<br/>衡<br/>量<br/>ml
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
        name: ``,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: "careCustomField",
      },
    
    ],
    bottom: [],
  }
}
