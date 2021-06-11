
import { listItem } from '@/api/record'
import { keyf1 } from '../keyEvent/f1.js'
import { multiDictInfo } from '../../../api/index'
import { event_date, event_time } from '../keyEvent/date'
let info = {
  sheetType: 'jointnew'
}
let ysList = []
let list1 = []
let list2 = []
let list3 = []
let list4 = []
let list5 = []
let list6 = []
let list7 = []
let list8 = []
export default [
  {
    key: 'recordMonth', //日期
    value: '',
    event: event_date
  },
  {
    key: 'recordHour', //时间
    value: '',
    event: event_time
  },
  {
    key: 'temperature', //体温
    value: '',
    event: keyf1
  },
  {
    key: 'pulse', //脉搏
    value: '',
    event: keyf1
  },
  {
    key: 'breath', //呼吸
    value: '',
    event: keyf1
  },
  {
    key: 'bloodPressure', //血压
    value: '',
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/"
        e.preventDefault();
      }
      keyf1(e, td)
    }
  },
  {
    key: 'fieldTen', //血氧饱和度
    value: '',
    event: keyf1
  },
  {
    key: 'consciousness', //意识
    value: '',
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    textarea: {
      width: 48
    }
  },
  {
    key: 'food', //入
    value: '',
    event: keyf1,
    // style: {
    //   position: 'absolute',
    //   top: '1px',
    //   bottom: '1px',
    //   left: '1px',
    //   width: '90px'
    // },
    autoComplete: {
      data: list7
    }
  },
  {
    key: 'foodSize', //入量
    value: '',
    event: keyf1
  },
  {
    key: 'discharge', //出
    value: '',
    event: keyf1,
    autoComplete: {
      data: list8
    }
  },
  {
    key: 'dischargeSize', //出量
    value: '',
    event: keyf1
  },
  {
    key: 'fieldOne', //标题1
    value: '',
    event: keyf1,
    autoComplete: {
      data: list1
    }
  },
  {
    key: 'fieldTwo', //标题2
    value: '',
    event: keyf1,
    autoComplete: {
      data: list2
    }
  },
  {
    key: 'fieldThree', //标题3
    value: '',
    event: keyf1,
    autoComplete: {
      data: list3
    }
  },
  {
    key: 'fieldFour', //标题4
    value: '',
    event: keyf1,
    autoComplete: {
      data: list4
    }
  },
  {
    key: 'fieldFive', //标题5
    value: '',
    event: keyf1,
    autoComplete: {
      data: list5
    }
  },
  {
    key: 'fieldSix', //标题6
    value: '',
    event: keyf1,
    autoComplete: {
      data: list6
    }
  },
  {
    key: 'fieldSeven', //标题7
    value: '',
    event: keyf1,
  },
  {
    key: 'fieldEight', //标题8
    value: '',
    event: keyf1,
  },
  {
    key: 'fieldNine', //标题9
    value: '',
    event: keyf1,
  },
  {
    key: 'description', //特殊情况记录
    value: '',
    style: {
      textAlign: 'left',
      position: 'absolute',
      top: '1px',
      bottom: '1px',
      left: '1px',
      width: '180px',
      background: 'transparent'
    },
    event: function (e, td) {
      if (e.keyCode == 9) {
        td.value = "    " + td.value
        e.preventDefault();
      }
      keyf1(e, td)
    }
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
    key: 'monthHour',
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
  listItem('入量名称', info.sheetType).then(res => {
    list7.splice(0, list7.length)
    for (let item in res.data.data) {
      list7.push(res.data.data[item].name)
    }
  })
  listItem('出量名称', info.sheetType).then(res => {
    list8.splice(0, list8.length)
    for (let item in res.data.data) {
      list8.push(res.data.data[item].name)
    }
  })
  let list = ['意识', '伤口疼痛', '伤口敷料', '患肢皮温', '患肢颜色', '患肢感觉', '患肢肿胀']
  multiDictInfo(list).then(res => {
    let data = res.data.data
    setList(ysList, '意识', data)
    setList(list1, '伤口疼痛', data)
    setList(list2, '伤口敷料', data)
    setList(list3, '患肢皮温', data)
    setList(list4, '患肢颜色', data)
    setList(list5, '患肢感觉', data)
    setList(list6, '患肢肿胀', data)
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