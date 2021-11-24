export const FLOW_TYPE = [
  {
    label: '转科流转',
    key: 1,
    code: 'changeF'
  },
  {
    label: '手术流转',
    key: 2,
    code: 'operationF'
  },
  {
    label: '介入流转',
    key: 3,
    code: 'involvedF'
  },
  {
    label: '分娩流转',
    key: 4,
    code: 'laborF'
  },
]

export const FLOW_STATUS = [
  {
    label: '全部',
    key: 1,
    code: 'all'
  },
  {
    label: '流转中',
    color: '#52a8eb',
    key: 2
  },
  {
    label: '流转成功',
    color: '#99d585',
    key: 3
  },
  {
    label: '流转驳回',
    color: '#c72a29',
    key: 4
  }
]
export const searchKeyByCode = (arr, code) => {
 const item = arr.find(v => v.code === code)
 return item ? item.key : ''
}
