import {
  listItem
} from '@/api/record'
import {
  keyf1
} from '../keyEvent/f1.js'
import {
  multiDictInfo
} from '../../../api/index'
import {
  event_date,
  event_time,
  click_date
} from '../keyEvent/date'
import moment from 'moment'
let info = {
  sheetType: 'picc'
}
let list1 = []
let list2 = []
let list3 = []
let list4 = []
let list5 = []
let list6 = []
let list7 = []
let list8 = []
let list9 = []
let list10 = []

let bcList = ['A', 'P', 'N']
let dfkList = ['✓', '否', '/']

let aList = ['①', '②', '③', '④', '⑤', '⑥', '/']
let bList = ['①', '②', '③', '④', '⑤', '⑥', "⑦", '⑧', '⑨', '⑩', '/']
let cList = ['①', '②', '③', '④', '⑤', '⑥', "⑦", '/']

let tkfs = ['+', '-', '±']

let list11 = []
export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
  },
  {
    key: 'temperature', //体温
    name: '体温',
    value: '',
    event: keyf1,
  },
  {
    key: 'pulse', //脉搏
    name: '脉搏',
    value: '',
    event: keyf1,
  },
  {
    key: 'breath', //呼吸
    name: '呼吸',
    value: '',
    event: keyf1,
  },
  {
    key: 'bloodPressure', //血压
    name: '血压',
    value: '',
    event: keyf1,
  },
  {
    key: 'spo2', //血氧饱和度
    name: '血氧饱和度',
    value: '',
    event: keyf1,
  },
  {
    key: 'consciousness', //意识
    name: '意识',
    value: '',
    event: keyf1,
    // autoComplete: {
    //   data: ["清醒", "嗜睡", "意识模糊", "昏迷", "浅昏迷"]
    // }
  },
  {
    key: 'pupilSizeLeft', //瞳孔大小左
    name: '瞳孔大小左',
    value: '',
    event: keyf1,
  },
  {
    key: 'pupilSizeRight', //瞳孔大小右
    name: '瞳孔大小右',
    value: '',
    event: keyf1,

  },
  {
    key: 'pupilReflexLeft', //瞳孔反射左
    name: '瞳孔反射左',
    value: '',
    event: keyf1,
  },
  {
    key: 'pupilReflexRight', //瞳孔反射右
    name: '瞳孔反射右',
    value: '',
    event: keyf1,
  },
  {
    key: "food", //入
    value: "",
    event: keyf1,
    textarea: {
      width: 68
    }
  },
  {
    key: "foodSize", //入量
    value: "",
    event: keyf1
  },
  {
    key: "discharge", //出
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "dischargeSize", //出量
    value: "",
    event: keyf1
  },
  {
    key: 'drugName', //药物名称
    name: '药物名称',
    value: '',
    event: keyf1,
  },
  {
    key: 'drugPotion', //药物剂量
    name: '药物剂量',
    value: '',
    event: keyf1,

  },
  {
    key: 'drugUsage', //药物用法
    name: '药物用法',
    value: '',
    event: keyf1,
  },
  {
    key: 'fieldOne', //吸痰
    name: '吸痰',
    value: '',
    event: keyf1,
  },
  {
    key: 'fieldTwo', //指尖血糖
    name: '指尖血糖',
    value: '',
    event: keyf1,
  },
  {
    key: 'fieldThree', // 吸氧方式
    name: '吸氧方式',
    value: '',
    event: keyf1,
  },
  {
    key: 'fieldFour', //吸氧流量
    name: '吸氧流量',
    value: '',
    event: keyf1,
  },
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "153px",
      background: "transparent"
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
    // oninput: next
  },
  {
    key: 'sign',
    value: '',
  },
  {
    hidden: true,
    key: "id",
    value: ""
  },
  {
    hidden: true,
    key: "signerName",
    value: ""
  },
  {
    hidden: true,
    key: "status",
    value: ""
  },
  {
    hidden: true,
    key: "recordSource",
    value: ""
  },
  {
    hidden: true,
    key: "recordYear",
    value: ""
  },
  {
    hidden: true,
    key: "dataHash",
    value: ""
  },
  {
    hidden: true,
    key: "recordDate",
    value: ""
  },
  {
    hidden: true,
    key: "monthHour",
    value: ""
  },
  {
    hidden: true,
    key: "signerNo",
    value: ""
  },
  {
    hidden: true,
    key: "auditorNo",
    value: ""
  },
  {
    hidden: true,
    key: "auditorName",
    value: ""
  },
  {
    hidden: true,
    key: "empNo",
    value: ""
  },
  {
    hidden: true,
    key: "multiSign",
    value: false
  }
]


export function getListData() {
  let list = ['班次', '敷料固定情况', '穿刺点及周围皮肤', '外露刻度', '臂/腿围', '冲封管', '导管通畅', '导管完整', '更换敷料', '更换接头', '导管留置']
  multiDictInfo(list, info.sheetType).then(res => {
    let data = res.data.data
    setList(list1, list[0], data)
    setList(list2, list[1], data)
    setList(list3, list[2], data)
    setList(list4, list[3], data)
    setList(list5, list[4], data)
    setList(list6, list[5], data)
    setList(list7, list[6], data)
    setList(list8, list[7], data)
    setList(list9, list[8], data)
    setList(list10, list[9], data)
    setList(list11, list[10], data)
  })
}

getListData()
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
function setList(list, key, data) {
  list.splice(0, list.length)
  for (let item of data[key]) {
    list.push(item.name)
  }
}
