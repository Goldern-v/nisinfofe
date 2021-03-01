import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1300px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          width: "40px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: `
        生命体征
        `,
        colspan: '6',
        rowspan: '1',
      },
      {
        name: `
        氧疗 升/分
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        血氧饱和度%
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        手术
        `,
        colspan: '8',
        rowspan: '1',
      },
      {
        name: `
        刀(伤)口敷料
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        疼痛护理
        `,
        colspan: '3',
        rowspan: '1',
      },
      {
        name: `
        腹部症状
        `,
        colspan: '4',
        rowspan: '1',
      },
      {
        name: `
        呼吸道管理
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        睡眠
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        其他评估
        `,
        colspan: '4',
        rowspan: '1',
      },
      {
        name: `
        病情观察及处理
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '150px'
        },
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [{
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
        name: `
        体温
        `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        心率<br/>次/<br>分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px'
        }
      },
      {
        name: `
        呼吸<br/>次/<br>分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px'
        }
      },
      {
        name: `
        血压(mmHg)
        `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        术前
        `,
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        感染指标送检
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        麻醉方式
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        离开病房
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        返回病房
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        术后
        `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        评分
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        措施
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        处理后评分
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        腹胀
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        便秘
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        措施
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        处理后效果
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        患者依从性
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        自理能力
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        教育需求
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        心理状态
        `,
        colspan: '1',
        rowspan: '2',
      },
    ],
    bottom: [{
        name: `
        体温<br>℃
        `,
        colspan: '1',
        rowspan: '1',
      },
      {
        name: `
        措施
        `,
        colspan: '1',
        rowspan: '1',
      },
      {
        name: `
        数值
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          width: '50px'
        },
      },
      {
        name: `
        异常处理
        `,
        colspan: '1',
        rowspan: '1',
      },
      {
        name: `
        准备
        `,
        colspan: '1',
        rowspan: '1',
      },
      {
        name: `
        宣教
        `,
        colspan: '1',
        rowspan: '1',
      },
      {
        name: `
        护理
        `,
        colspan: '1',
        rowspan: '1',
      },
      {
        name: `
        宣教
        `,
        colspan: '1',
        rowspan: '1',
      },
    ]
  }
}
