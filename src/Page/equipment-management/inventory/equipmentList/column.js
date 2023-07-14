
export const column =  
[
  {
    prop: "code",
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
    prop: "registrationCode",
    label: "设备登记码",
    minWidth: "150",
    align: "center",
    fixed: true,
  },
  {
    prop: "type",
    label: "设备类别",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "isRelated",
    label: "使用关联患者",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "buyTime",
    label: "购入时间",
    minWidth: "160",
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
    prop: "wardName",
    label: "放置位置",
    minWidth: "160",
    align: "center"
  },
  {
    prop: "qrCodeSize",
    label: "二维码规格",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "statusFlagSize",
    label: "状态标识规格",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "empName",
    label: "登记人",
    minWidth: "80",
    align: "center"
  },
  {
    prop: "latestRecord",
    label: "最新记录时间",
    minWidth: "180",
    align: "center"
  }
]