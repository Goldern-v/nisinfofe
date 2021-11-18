export default {
  // 科室的名称
  deptType: "",
  // style: {
  //   width: "1114px"
  // },
  th: {
    top: [{
      name: `
        日期
        `,
      style: {
        minWidth: "40px",
        maxWidth: "40px"
      },
      colspan: "1",
      rowspan: "3"
    },
    {
      name: `
        时间
        `,
      style: {
        minWidth: "40px",
        maxWidth: "40px"
      },
      colspan: "1",
      rowspan: "3"
    },
    {
      name: `
        生命体征
        `,
      style: {
        minWidth: "640px",
        maxWidth: "640px"
      },
      colspan: "15",
      rowspan: "1",
    },
    {
      name: `
        出入量
        `,
      style: {
        minWidth: "153px",
        maxWidth: "153px"
      },
      colspan: "4",
      rowspan: "1",
    },
    {
      name: `
        自定义项目
        `,
      colspan: "4",
      rowspan: "1",
      style: {
        minWidth: "174px",
        maxWidth: "174px"
      }
    },
    // {
    //   name: `
    //   特殊情况记录
    //   `,
    //   style: {
    //     minWidth: "153px",
    //     maxWidth: "153px"
    //   },
    //   colspan: "1",
    //   rowspan: "3"
    // },
    {
      name: `
       记录人
        `,
      colspan: "1",
      rowspan: "3",
      style: {
        minWidth: "52px",
        maxWidth: "52px"
      },
    },
    // {
    //   name: `
    //      签名
    //       `,
    //   colspan: "1",
    //   rowspan: "3",
    //   style: {
    //     minWidth: "52px",
    //   },
    // }
    ],
    mid: [{
      name: "体温",
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    },
    {
      name: `
        脉搏
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, {
      name: `
        呼吸
        `,
      style: {},
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, {
      name: `
        血压
        `,
      style: {
        minWidth: "60px",
        maxWidth: "60px"
      },
      colspan: "1",
      rowspan: "2",
    },
    {
      name: `
        心率
        `,
      style: {
        minWidth: "45px",
        maxWidth: "45px"
      },
      colspan: "1",
      rowspan: "2",
    },
    {
      name: `
        物理<br/>降温
        `,
      style: {
        minWidth: "45px",
        maxWidth: "45px"
      },
      colspan: "1",
      rowspan: "2",
    },
    {
      name: `
        体重
        `,
      style: {
        minWidth: "45px",
        maxWidth: "45px"
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
        肛温
        `,
      style: {
        minWidth: "45px",
        maxWidth: "45px"
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
        口温
        `,
      style: {
        minWidth: "45px",
        maxWidth: "45px"
      },
      colspan: "1",
      rowspan: "2"
    },
    // {
    //   name: `
    //   科室
    //   `,
    //   colspan: "1",
    //   rowspan: "2"
    // },
    // {
    //   name: `
    //   床号
    //   `,
    //   colspan: "1",
    //   rowspan: "2"
    // },
    {
      name: `
        发热<br/>体温
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, {
      name: `
        线上<br/>降温
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, {
      name: `
        呼吸机R
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, {
      name: `
        护理<br/>事件
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, {
      name: `
        表底<br/>注释
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    },
    {
      name: `
        表顶<br/>注释
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    },
    // {
    //   name: `
    //   身高
    //   `,
    //   colspan: "1",
    //   rowspan: "2",
    //   style: {
    //     minWidth: "20px",
    //     maxWidth: "20px"
    //   },
    // },
    {
      name: `
        大便<br/>次数
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, 
    {
      name: `
        尿量
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, {
      name: `
        出量
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    }, 
    {
      name: `
        入量
        `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      },
    },
    {
      name: `标题1`,
      colspan: "1",
      rowspan: "2",
      canSet: true,
      key: "fieldFour",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      }
    },
    {
      name: `标题2`,
      colspan: "1",
      rowspan: "2",
      canSet: true,
      key: "fieldFive",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      }
    },
    {
      name: `标题3`,
      colspan: "1",
      rowspan: "2",
      canSet: true,
      key: "fieldSix",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      }
    },
    {
      name: `标题4`,
      colspan: "1",
      rowspan: "2",
      canSet: true,
      key: "fieldSeven",
      style: {
        minWidth: "36px",
        maxWidth: "36px"
      }
    }
    ],
    bottom: []
  }
};
