
import { listItem } from '@/api/record'
import { keyf1 } from '../keyEvent/f1.js'
import { multiDictInfo } from '../../../api/index'
import { event_date, event_time } from '../keyEvent/date'
import moment from 'moment'
let info = {
  sheetType: 'picc'
}
let bcList = ['A', 'P', 'N']
let dfkList = ['✓', 'X', '/']
let bList = ['①', '②', '③', '④', '⑤', '⑥', "⑦", '⑧', '⑨']
export default [
  {
    key: 'recordMonth', //日期
    value: '',
    event: event_date,
    click: (e, td) => {
      if (td.value == '') {
        td.value = moment().format('MM-DD')
      }
    }
  },
  {
    key: 'range', //标题1
    name: '班次',
    value: '',
    event: keyf1,
    autoComplete: {
      data: bcList
    },
  },
  {
    key: 'fieldOne', //是否可拔管
    name: '是否可拔管',
    value: '',
    event: keyf1,
    autoComplete: {
      data: dfkList
    },

  },
  {
    key: 'fieldTwo', //敷料是否完好
    name: '敷料是否完好',
    value: '',
    event: keyf1,
    autoComplete: {
      data: dfkList
    },

  },
  {
    key: 'fieldThree', //穿刺点及周围皮肤
    name: '穿刺点及周围皮肤',
    value: '',
    event: keyf1,
    autoComplete: {
      data: bList
    },
  },
  {
    key: 'fieldFour', //管路是否通畅
    name: '管路是否通畅',
    value: '',
    event: keyf1,
    autoComplete: {
      data: dfkList
    },
  },
  {
    key: 'fieldFive', //导管是否破损
    name: '导管是否破损',
    value: '',
    event: keyf1,
    autoComplete: {
      data: dfkList
    },
  },
  {
    key: 'fieldSix', //导管是否移位
    name: '导管是否移位',
    value: '',
    event: keyf1,
    autoComplete: {
      data: dfkList
    },
  },
  {
    key: 'fieldSeven', //外露长度cm
    name: '外露长度cm',
    value: '',
    event: keyf1,
  },
  {
    key: 'fieldEight', //臀围cm
    name: '臀围cm',
    value: '',
    event: keyf1,
  },
  {
    key: 'fieldNine', //更换敷料
    name: '更换敷料',
    value: '',
    event: keyf1,
    autoComplete: {
      data: dfkList
    },
  },
  {
    key: 'fieldTen', //更换接头
    name: '更换接头',
    value: '',
    event: keyf1,
    autoComplete: {
      data: dfkList
    },
  },
  {
    key: 'fieldEleven', // 冲封管
    name: ' 冲封管',
    value: '',
    event: keyf1,
    autoComplete: {
      data: dfkList
    },
  },
  {
    key: 'description', //特殊情况记录
    value: '',
    style: {
      textAlign: 'left'
    },
    // oninput: next
  },
  {
    key: 'sign',
    value: '',
  },
  {
    hidden: true,
    key: 'id',
    value: '',
  },
  {
    hidden: true,
    key: 'signerName',
    value: '',
  },
  {
    hidden: true,
    key: 'status',
    value: '',
  },
  {
    hidden: true,
    key: 'recordSource',
    value: '',
  },
  {
    hidden: true,
    key: 'recordYear',
    value: '',
  },
  {
    hidden: true,
    key: 'dataHash',
    value: '',
  },
  {
    hidden: true,
    key: 'recordDate',
    value: '',
  },
  {
    hidden: true,
    key: 'recordRange',
    value: '',
  },
  {
    hidden: false,
    key: 'signerNo',
    value: '',
  },
  {
    hidden: true,
    key: 'empNo',
    value: '',
  },
]


export function getListData() {
  let list = ['班次', '敷料固定情况', '穿刺点及周围皮肤', '外露刻度', '臂/腿围', '冲封管', '导管通畅', '导管完整', '更换敷料', '更换接头', '导管留置']
  multiDictInfo(list, info.sheetType).then(res => {
    let data = res.data.data
    // setList(list1, list[0], data)
    // setList(list2, list[1], data)
    // setList(list3, list[2], data)
    // setList(list4, list[3], data)
    // setList(list5, list[4], data)
    // setList(list6, list[5], data)
    // setList(list7, list[6], data)
    // setList(list8, list[7], data)
    // setList(list9, list[8], data)
    // setList(list10, list[9], data)
    // setList(list11, list[10], data)
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
