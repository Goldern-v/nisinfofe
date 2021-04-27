
import { listItem } from '@/api/record'
import { keyf1 } from '../keyEvent/f1.js'
import { multiDictInfo } from '../../../api/index'
import { event_date, event_time } from '../keyEvent/date'
import moment from 'moment'
let info = {
  sheetType: 'catheter'
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
let list11 = []
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
    name: '时间',
    value: '',
    event: event_time,
    // autoComplete: {
    //   data: list1
    // },
  },
  {
    key: 'extubation', //标题2
    name: '是否可拔管',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list2
    },
  },
  {
    key: 'catheterUnobstructe', //标题3
    name: '管路是否通畅',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list3
    }
  },
  {
    key: 'catheterClose', //标题4
    name: '管路是否密闭',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list4
    }
  },
  {
    key: 'catheterUsable', //标题5
    name: '固定是否妥善',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list5
    }
  },
  {
    key: 'urineBagLowBladder', //标题6
    name: '尿袋是否低于膀胱',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list6
    }
  },
  {
    key: 'drainageTubeClose', //标题7
    name: '搬运时是否夹闭引流管',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list7
    },
  },
  {
    key: 'urinaryTractNursing', //标题8
    name: '尿道口管理',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list8
    },
  },
  {
    key: 'waterManage', //标题9
    name: '饮水管理',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list9
    },
  },
  {
    key: 'urineBagReplace', //标题10
    name: '更换尿袋',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list10
    },
  },
  {
    key: 'catheterReplace', //标题11
    name: '更换尿管',
    value: '',
    event: keyf1,
    autoComplete: {
      data: list11
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
  let list = ['班次', '是否可拔管', '管路是否通畅', '管路是否密闭', '固定是否妥善', '尿袋是否低于膀胱', '搬运时是否夹闭引流管', '尿道口管理', '饮水管理', '更换尿袋', '更换尿管']
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
