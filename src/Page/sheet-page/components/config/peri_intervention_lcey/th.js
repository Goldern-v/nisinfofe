export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1000px"
  },
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脉搏<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        桡动脉   股动脉
        `,
        colspan: '6',
        rowspan: '1',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        伤口情况
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        疼痛评分
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        尿量<br>(ml)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        备注
        `,
        style: {
          minWidth: '153px',
          maxWidth: '153px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        签字
        `,
        style: {
          minWidth: '38px',
        },
        colspan: '1',
        rowspan: '3'
      },
    ],
    mid: [{
      name: `
        左
        `,
      colspan: '3',
      rowspan: '1'
    }, {
      name: `
        右
        `,
      colspan: '3',
      rowspan: '1'
    }, {
      name: `
        左
        `,
      colspan: '1',
      rowspan: '2'
    }, {
      name: `
        右
        `,
      colspan: '1',
      rowspan: '2'
    }, ],
    bottom: [{
        name: `
        搏动
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
        },
      },
      {
        name: `
        皮肤温度
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
        },
      },
      {
        name: `
        皮肤颜色
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
        },
      },
      {
        name: `
        搏动
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
        },
      },
      {
        name: `
        皮肤温度
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
        },
      },
      {
        name: `
        皮肤颜色
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
        },
      },
    ]
  }
}
