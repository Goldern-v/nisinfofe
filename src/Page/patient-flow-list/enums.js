export const FLOW_TYPE = [
  {
    label: '转科流转',
    key: 'transfer',
    code: 'changeF'
  },
  {
    label: '手术流转',
    key: 'operation',
    code: 'operationF'
  },
  {
    label: '介入流转',
    key: 'intervention',
    code: 'involvedF'
  },
  {
    label: '分娩流转',
    key: 'delivery',
    code: 'laborF'
  },
]
export const FLOW_CHART_TYPE = [
  {
    label: '转科',
    key: 'transfer',
    code: 'changeF'
  },
  {
    label: '手术',
    key: 'operation',
    code: 'operationF'
  },
  {
    label: '介入',
    key: 'intervention',
    code: 'involvedF'
  },
  {
    label: '分娩',
    key: 'delivery',
    code: 'laborF'
  },
]

export const FLOW_STATUS = [
  {
    label: '全部',
    key: '',
    code: 'all'
  },
  {
    label: '流转中',
    color: '#52a8eb',
    key: 1
  },
  {
    label: '流转成功',
    color: '#99d585',
    key: 3
  },
  {
    label: '流转驳回',
    color: '#c72a29',
    key: 2
  }
]
export const searchItem = (arr, value, key) => {
  return arr.find(v => v[key] == value)
}
export const searchKeyByCode = (arr, code) => {
 const item = searchItem(arr, code, 'code')
 return item ? item.key : ''
}
