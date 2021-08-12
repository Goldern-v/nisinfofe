import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1450px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "62px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: `
        T <br/>（℃）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        HR
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        R
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        NBP
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        ABP
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        心<br/>率
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        CVP<br/>cmH<sub>2</sub>O
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        SpO<sub>2</sub><br/>%
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        呼吸支持
        `,
        colspan: "9",
        rowspan: "1"
      },
      {
        name: `
        GCS
        `,
        style: {},
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        瞳孔
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `光反射`,
        style: {},
        colspan: "2",
        rowspan: "2",
      },
      {
        name: `
        镇<br/>静<br/>评<br/>分
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护理记录
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '150px',
          maxWidth: '150px',
        },
      },
      {
        name: `签名
        `,
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [
      {
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '次/<br/>min',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '次/<br/>min',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      },
      
      {
        name: "模<br/>式",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "频率<br/>次/min",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "VT<br/>ml",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "IPAP<br/>cmH<sub>2</sub>O",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "EPAP<br/>cmH<sub>2</sub>O",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "PEEP<br/>cmH<sub>2</sub>O",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "插<br/>管<br/>深<br/>度<br/>（cm）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "FiO<sub>2</sub><br/>%",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "意<br/>识",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "E",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "M",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "V",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "左",
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "右",
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
    ],
    bottom: [
    {
      name: "mmHg",
      colspan: "2",
      rowspan: "1",
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
    },
    {
      name: "mm",
      colspan: "2",
      rowspan: "1",
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
    },
    {
      name: "左",
      colspan: "1",
      rowspan: "1",
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
    },
    {
      name: "右",
      colspan: "1",
      rowspan: "1",
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
    },
    ]
  }
};
