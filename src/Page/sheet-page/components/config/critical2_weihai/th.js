import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1800px"
  },
  th: {
    top: [
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: '生命体征',
        style: {
          
        },
        colspan: '7',
        rowspan: '1'
      },
      {
        name: '意识',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: 'GCS',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
         name: `
        瞳孔（mm）/<br/>对光反应
        `,
        colspan: '4',
        rowspan: '2',
      },
      {
         name: `
        入量
        `,
        style: {
          minWidth: '200px',
          maxWidth: '200px',
        },
        colspan: '2',
        rowspan: '1',
      },
      {
         name: `
        出量
        `,
        style: {
          minWidth: '120px',
          maxWidth: '120px',
        },
        colspan: '3',
        rowspan: '1',
      },
      {
         name: `
        检测项目
        `,
        style: {
         
        },
        colspan: '12',
        rowspan: '1',
      },
      {
         name: `
        床头抬高
        `,
        style: {
          minWidth: "20px",
          maxWidth: '20px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
         name: `
        卧位
        `,
        style: {
          minWidth: "25px",
          maxWidth: '25px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        护理措施
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: "90px",
          maxWidth: '90px',
        },
      },
      {
        name: `
        特殊情况记录
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: "250px",
          maxWidth: '250px',
        },
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '55px',
          maxWidth: '55px',
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   医师签名
      //   `,
      //   style: {
      //     minWidth: '55px',
      //     maxWidth: '55px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px"
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px"
        },
      },
    //   {
    //     name: `
    //    名称
    //    `,
    //    style: {
    //       minWidth: '40px',
    //       maxWidth: '55px',
    //    },
    //    colspan: '1',
    //    rowspan: '2',
    //  },
    //   {
    //     name: `
    //    量<br/>ml
    //    `,
    //    style: {
        
    //    },
    //    colspan: '1',
    //    rowspan: '2',
    //  },
     {
      name: "体温<br/>℃",
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "30px"
      },
    },
    {
      name: `
      心率/脉搏<br/>次/分
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "50px"
      },
    },
    {
      name: '心律',
      style: {
        minWidth: '40px',
        maxWidth: '40px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
      呼吸<br/>次/分
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "50px",
        maxWidth: '50px',
      },
    },
    {
      name: `
      血压<br/>mmHg
      `,
      style: {
        minWidth: "50px",
        maxWidth: '50px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      SPO<sub>2</sub><br>(%)
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
    },
    {
      name: `
      CVP<br/>mm<br/>Hg
      `,
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      项目
      `,
      style: {
        minWidth: "160px",
        maxWidth: '160px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      量(ml)
      `,
      style: {
        minWidth: "40px",
        maxWidth: '40px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      项目
      `,
      style: {
        minWidth: "50px",
        maxWidth: '50px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      量(ml)
      `,
      style: {
        minWidth: "40px",
        maxWidth: '40px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
        颜色
      `,
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
        通气方式
      `,
      style: {
        minWidth: "50px",
        maxWidth: '50px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
        FiO2
      `,
      style: {
        minWidth: "40px",
        maxWidth: '40px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
        Vti/<br/>Vte(ml)
      `,
      style: {
        minWidth: "45px",
        maxWidth: '45px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      P+PEEP/<br/>Ppeak(cmH2<br/>O)
      `,
      style: {
        minWidth: "40px",
        maxWidth: '40px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      气管插<br/>管深度<br/>(cm)
      `,
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      气囊<br/>压力<br/>(cmH2)
      `,
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      呼吸音
      `,
      style: {
      },
      colspan: "2",
      rowspan: "1"
    },
    {
      name: `
      RASS/NEWS
      `,
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      CPOT/NRS
      `,
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      Braden<br/>/UEX
      `,
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
      colspan: "1",
      rowspan: "2"
    },
    {
      name: `
      Caprini
      `,
      style: {
        minWidth: "30px",
        maxWidth: '30px',
      },
      colspan: "1",
      rowspan: "2"
    },
    ],
    bottom: [
      {
        name: `
          左
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
          右
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
          左
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
          右
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: "1",
        rowspan: "1"
      },
    ]
  }
}
