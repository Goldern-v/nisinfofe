
export const column =  
[
  {
    prop: "id",
    label: "设备编码",
    minWidth: "80",
    align: "center",
    fixed: true,
  },
  {
    prop: "name",
    label: "设备名称",
    minWidth: "100",
    align: "center",
    fixed: true,
  },
  {
    prop: "result",
    label: "设备登记码",
    minWidth: "100",
    align: "center"
  },
  {
    prop: "reference",
    label: "设备类别",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "patientName",
    label: "使用关联患者",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "patientId",
    label: "购入时间",
    minWidth: "160",
    align: "center"
  },
  {
    prop: "reportTime",
    label: "开始时间",
    minWidth: "120",
    align: "center"
  },
  // {
  //   prop: "stateId",
  //   label: "状态标识",
  //   minWidth: "80",
  //   align: "center",
  //   render: (h, { row }) => {
  //     let color = row.stateId === '正常运行' ? '#4bb08d' : 'red'
  //     return <span style={{ color }}>{row.stateId}1111111</span>
  //   }
  // },
  // {
  //   prop: "reportTime",
  //   label: "设备状态",
  //   minWidth: "80",
  //   align: "center"
  // },
]

export const column2 = [{
    prop: "reportTime",
    label: "放置位置",
    minWidth: "160",
    align: "center"
  },
  {
    prop: "size",
    label: "二维码规格",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "reportTime",
    label: "状态标识规格",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "reportTime",
    label: "登记人",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "最新记录时间",
    label: "登记人",
    minWidth: "180",
    align: "center"
  }
]