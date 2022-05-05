export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1300px"
  },
  th: {
    top: [{
      name: '日期',
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: '时间',
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        生命体征项目
        `,
      style: {},
      colspan: '6',
      rowspan: '1',
    },
    {
      name: `
        入量
        `,
      colspan: "2",
      rowspan: "1",
      canSet: false
    },
    {
      name: `
        出量
        `,
      colspan: "3",
      rowspan: "1",
      canSet: false
    },
    {
      name: `
        基础护理
        `,
      style: {
        minWidth: '55px',
        maxWidth: '55px',
      },
      colspan: '5',
      rowspan: '1',
    },
    {
      name: `
        特殊情况记录
        `,
      style: {
        minWidth: '305px',
        maxWidth: '305px',
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        护士<br/>签名
        `,
      style: {
        minWidth: '55px',
        maxWidth: '55px',
      },
      colspan: '1',
      rowspan: '3'
    }
    ],
    mid: [{
      name: `
        体温<br/>℃
        `,
      style: {
        minWidth: '30px',
        maxWidth: '30px',
      },
      colspan: '1',
      rowspan: '2',
    },
    {
      name: `
        脉搏<br/>次/分
        `,
      style: {
        minWidth: '30px',
        maxWidth: '30px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        呼吸<br/>次/分
        `,
      style: {
        minWidth: '30px',
        maxWidth: '30px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        血压<br/>mmHg
        `,
      style: {
        minWidth: '55px',
        maxWidth: '55px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        氧饱<br/>和度<br/>%
        `,
      style: {
        minWidth: '30px',
        maxWidth: '30px'
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        神志
        `,
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      },
      colspan: '1',
      rowspan: '2'
    },

    {
      name: `名称`,
      style: {
        minWidth: '65px',
        maxWidth: '65px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `ml`,
      style: {
        minWidth: '45px',
        maxWidth: '45px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `名称`,
      style: {
        minWidth: '65px',
        maxWidth: '65px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `ml`,
      style: {
        minWidth: '45px',
        maxWidth: '45px'
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `颜色<br/>性状`,
      style: {
        minWidth: '45px',
        maxWidth: '45px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `皮肤<br/>情况`,
      style: {
        minWidth: '55px',
        maxWidth: '55px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `管道<br/>护理`,
      style: {
        minWidth: '55px',
        maxWidth: '55px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `气道<br/>护理`,
      style: {
        minWidth: '55px',
        maxWidth: '55px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `痰液<br/>性状`,
      style: {
        minWidth: '55px',
        maxWidth: '55px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `其他`,
      style: {
        minWidth: '55px',
        maxWidth: '55px',
      },
      colspan: '1',
      rowspan: '2'
    }
    ],
    bottom: []
  }
}
