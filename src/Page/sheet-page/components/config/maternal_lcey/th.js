export default {
  // 产妇产后观察记录单
  deptType: '',
  style: {
    width: "1200px"
  },
  th: {
    top: [
      {
        name: '日期',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '产妇',
        colspan: '6',
        rowspan: '1'
      },
      {
        name: '新生儿',
        colspan: '8',
        rowspan: '1'
      },
      {
        name: `
        护理措施
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '180px'
        },
      },
      {
        name: `
        签名
        `,
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: '血压<br/>mmHg',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '脉搏<br/>次/分',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '阴道<br/>出血量ml',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '宫缩',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '宫底高度',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '膀胱充盈情况',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '呼吸<br/>次/分',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '心率<br/>次/分',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '血糖<br/>mmol/L',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '面色',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '吸吮反射',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '脐部',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '大便次数',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '小便次数',
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: [
    ]
  }
}
