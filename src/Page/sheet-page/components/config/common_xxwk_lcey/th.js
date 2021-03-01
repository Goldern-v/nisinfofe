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
        呼吸机
        `,
        colspan: '11',
        rowspan: '1',
      },
      {
        name: `
        意识
        `,
        colspan: '1',
        rowspan: '3',
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
        活动
        `,
        colspan: '1',
        rowspan: '1',
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
        泵入药物
        `,
        colspan: '2',
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
        呼吸机型号/气管插管内置
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        辅助方式
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        潮气量
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        呼吸频率
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        I:E
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        氧浓度%
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        PS<br>/PE<br>EP
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        气囊压力
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        痰色/痰量
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        拔除气管插管
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        呼吸音
        `,
        colspan: '1',
        rowspan: '2',
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
        床上/下床
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        药物名称
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        泵速
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
    ]
  }
}
