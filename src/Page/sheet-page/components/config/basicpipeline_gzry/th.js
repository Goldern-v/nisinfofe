import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1400px"
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
        基础护理
        `,
        style: {},
        colspan: "18",
        rowspan: "1",
      },
      {
        name: `
        管道护理
        `,
        style: {},
        colspan: "8",
        rowspan: "1",
      },
      {
        name: `
        更换管道/袋
        `,
        style: {},
        colspan: "4",
        rowspan: "1",
      },
      {
        name: `
        护士签名
        `,
        colspan: "1",
        rowspan: "3"
      },
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
        name: "晨、晚间护理",
        colspan: "6",
        rowspan: "1",

      },
      {
        name: "对<br/>非<br/>禁<br/>食<br/>患<br/>者<br/>协<br/>助<br/>进<br/>食<br/>、<br/>水",
        colspan: "1",
        rowspan: "2",
      },
      {
        name: "卧床护理",
        colspan: "3",
        rowspan: "1"
      },
      {
        name: "排泄护理",
        colspan: "3",
        rowspan: "1"
      },
      {
        name: "床<br/>上<br/>温<br/>水<br/>擦<br/>浴",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "其他护理",
        colspan: "3",
        rowspan: "1"
      },
      {
        name: "患<br/>者<br/>安<br/>全<br/>管<br/>理",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "气<br/>管<br/>切<br/>开",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "气<br/>管<br/>插<br/>管",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "呼<br/>吸<br/>机<br/>管<br/>道",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "静<br/>脉<br/>导<br/>管",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "动<br/>脉<br/>导<br/>管",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "鼻<br/>胃<br/>管<br/>/<br/>鼻<br/>肠<br/>管",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "引<br/>流<br/>管",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "鼻<br/>饲",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "松<br/>紧<br/>约<br/>束",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "肢<br/>端<br/>血<br/>运",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "尿<br/>袋<br/>/<br/>尿<br/>管",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "胃<br/>管",
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [
      {
        name: "整<br/>理<br/>床<br/>单<br/>位",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "梳<br/>头",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "口<br/>腔<br/>护<br/>理",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "面<br/>部<br/>清<br/>洁",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "会<br/>阴<br/>护<br/>理",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "足<br/>部<br/>清<br/>洁",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "协<br/>助<br/>患<br/>者<br/>翻<br/>身<br/>记<br/>有<br/>效<br/>咳<br/>嗽",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "床<br/>头<br/>抬<br/>高<br/>&nbsp30<sup>。</sup><br/><br/>~<br/>&nbsp45<sup>。</sup>",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "压<br/>疮<br/>预<br/>防<br/>及<br/>护<br/>理",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "失<br/>禁<br/>护<br/>理",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "床<br/>上<br/>使<br/>用<br/>便<br/>器",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "留<br/>置<br/>导<br/>尿<br/>护<br/>理",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "功<br/>能<br/>锻<br/>炼",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "床<br/>上<br/>洗<br/>头",
        colspan: "1",
        rowspan: "1"
      },
      {
        name: "指<br/>/<br/>趾<br/>甲<br/>天<br/>护<br/>理",
        colspan: "1",
        rowspan: "1"
      },

    ]
  }
};
