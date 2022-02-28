export default {
    // 胎心记录单
    deptType: '',
    style: {
      width: "800px"
    },
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
          name: '宫缩',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '胎心<br/>次/分',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '胎动<br/>次/小时',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          备注
          `,
          colspan: '1',
          rowspan: '3',
          style: { 
           maxWidth: '240px',
           minWidth: '240px'
          },
        },
        {
          name: `
          护士签名
          `,
          style: { 
            maxWidth: '80px',
            minWidth: '80px'
           },
          colspan: '1',
          rowspan: '3'
        }
      ],
      mid: [
        
      ],
      bottom: [
      ]
    }
  }
  