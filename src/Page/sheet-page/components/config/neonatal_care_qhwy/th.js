export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "740px"
  },
  th: {
    top: [
      {
        name: '日期',
        style: {
          minWidth: '15px',
          maxWidth: '15px',
          // display: 'none',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '15px',
          maxWidth: '15px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `体<br>温<br>℃`,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `呼<br>吸<br>次<br>/分`,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `心<br>率<br>次<br>/分`,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `皮<br>肤<br>情<br>况`,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `脐<br>带<br>情<br>况`,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `喂养`,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '2',
        rowspan: '1'
      },{
        name: `大便`,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `小便`,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `病 情 记 录 `,
        style: {
          minWidth: '240px',
          maxWidth: '240px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        style: {
          minWidth: '50px',
          // maxWidth: '72px',
        },
        colspan: '1',
        rowspan: '3'
      },
   
    ],
    mid: [
      {
        name: `
        母乳
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        其他
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        有无
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        性质
        `,
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: [
    ]
  }
}
