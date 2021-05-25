export default {
  // 科室的名称
  deptType: '',
  style: {
    width: '1100px'
  },
  th: {
    top: [{
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
        name: 'T<br>(°C)',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: 'P/HR',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: 'R',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: 'BP<br>(mmHg)',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: 'SpO<sub>2</sub><br>(%)',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '意识',
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
      },
      {
        name: '瞳孔',
        colspan: '4',
        rowspan: '1'
      },
      {
        name: '入',
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '出',
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '药物',
        colspan: '3',
        rowspan: '1'
      },
      {
        name: '吸痰',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '指尖血糖',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '吸氧',
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        病情观察及措施、特殊情况记录
    `,
        style: {
          minWidth: '154px',
          maxWidth: '154px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
    护士<br/>签名
    `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },

    ],
    mid: [{
        name: '直径<br/>(mm)',
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '反应',
        colspan: '2',
        rowspan: '1'
      },
      {
        name: '内容',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '量<br/>ml',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '内容',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '量<br/>ml',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '药名',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '剂量',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '用法',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '方式',
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '流量',
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: [{
        name: '左',
        colspan: '1',
        rowspan: '1'
      },
      {
        name: '右',
        colspan: '1',
        rowspan: '1'
      },
      {
        name: '左',
        colspan: '1',
        rowspan: '1'
      },
      {
        name: '右',
        colspan: '1',
        rowspan: '1'
      },
    ]
  }
}
