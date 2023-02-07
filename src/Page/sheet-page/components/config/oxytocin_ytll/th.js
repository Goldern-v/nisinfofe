export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1300px"
  },
  th: {
    top: [{name: '用  药  后', colspan: 14, rowspan: 1}],
    mid: [
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: '剂量',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '滴数',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '血压',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '衔接',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '胎  心',
        // style: {
        //   minWidth: '60px',
        //   maxWidth: '60px',
        // },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '宫缩',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '胎膜',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '宫口<br />扩张',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '检查<br />方式',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '备注',
        style: {
          minWidth: '366px',
          maxWidth: '366px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        检查者
        `,
        // style: {
        //   width: '50px'
        // },
        colspan: '1',
        rowspan: '2'
      }
    ],
    bottom: [
      {
        name: '日期',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: '时间',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: '位置',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: '速率',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '1'
      },
      
    ]
  }
}
