const numTableConfig = [
  {
    type: 'index',
    label: '序号',
    width: '100',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'docNum',
    label: '完成数量',
  }
]

const timeTableConfig = [
  {
    type: 'index',
    label: '序号',
    width: '100',
  },
  {
    prop: 'creatorName',
    label: '书写人',
  },
  {
    prop: 'createTime',
    label: '病历书写时间',
  },
  {
    prop: 'patientName',
    label: '患者姓名',
  },
  {
    prop: 'updateTime',
    label: '病历书写完成时间',
  },
  {
    prop: 'consumeTime',
    label: '耗时统计(/分)',
  }
]

export default {
  numTableConfig,
  timeTableConfig
}
