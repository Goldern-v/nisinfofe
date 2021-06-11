let data = {
  style: {
    width: '1080'
  },
  title: "护理交班信息表",
  totalColNum: 6,
  columns: [
    {
      label: "床号",
      prop: "bedLabel",
      editable: true,
      align: "center",
      width: "45"
    },
    {
      label: "姓名",
      prop: "name",
      editable: true,
      align: "center",
      width: "80"
    },
    {
      label: "诊断",
      prop: "diagnosis",
      editable: true,
      width: "120"
    },
    {
      label: "白班交班内容",
      prop: "remark1",
      editable: true,
      colspan: 1,
      tabIndex: "1",
      type: 'inline-block',
      width: "265",
      tileColumns:  [
        {
          label: "出院",
          prop: "patientOutA",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top"
        },
        {
          label: "病危",
          prop: "patientBwA",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top"
        },
        {
          label: "转出",
          prop: "patientTransferOutA",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top border-right"
        },
        {
          label: "手术",
          prop: "patientOprationA",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "死亡",
          prop: "patientDeathA",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "备术",
          prop: "patientRemarkA",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        },
        {
          label: "新入",
          prop: "patientNewA",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "特护",
          prop: "patientSpecialA",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "转入",
          prop: "patientTransferInA",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        },
        {
          label: "一级",
          prop: "patientFirstA",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "病重",
          prop: "patientBzA",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "总数",
          prop: "patientTotalA",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        }
      ],
    },
    {
      label: "小夜交班内容",
      prop: "remark3",
      editable: true,
      colspan: 1,
      tabIndex: "2",
      type: 'inline-block',
      width: "265",
      tileColumns:  [
        {
          label: "出院",
          prop: "patientOutP",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top"
        },
        {
          label: "病危",
          prop: "patientBwP",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top"
        },
        {
          label: "转出",
          prop: "patientTransferOutP",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top border-right"
        },
        {
          label: "手术",
          prop: "patientOprationP",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "死亡",
          prop: "patientDeathP",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "备术",
          prop: "patientRemarkP",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        },
        {
          label: "新入",
          prop: "patientNewP",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "特护",
          prop: "patientSpecialP",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "转入",
          prop: "patientTransferInP",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        },
        {
          label: "一级",
          prop: "patientFirstP",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "病重",
          prop: "patientBzP",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "总数",
          prop: "patientTotalP",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        },
      ]
    },
    {
      label: "大夜交班内容",
      prop: "remark2",
      editable: true,
      colspan: 1,
      tabIndex: "3",
      type: 'inline-block',
      width: "265",
      tileColumns:  [
        {
          label: "出院",
          prop: "patientOutN",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top"
        },
        {
          label: "病危",
          prop: "patientBwN",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top"
        },
        {
          label: "转出",
          prop: "patientTransferOutN",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-top border-right"
        },
        {
          label: "手术",
          prop: "patientOprationN",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "死亡",
          prop: "patientDeathN",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "备术",
          prop: "patientRemarkN",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        },
        {
          label: "新入",
          prop: "patientNewN",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "特护",
          prop: "patientSpecialN",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "转入",
          prop: "patientTransferInN",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        },
        {
          label: "一级",
          prop: "patientFirstN",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "病重",
          prop: "patientBzN",
          editable: true,
          width: "40",
          suffix: "人",
        },
        {
          label: "总数",
          prop: "patientTotalN",
          editable: true,
          width: "40",
          suffix: "人",
          titleClass: "border-right"
        }
      ]
    }
  ],
  modalData: {
    title: "护理交班信息表",
    tabs: [
      {
        name: '白班',
        editContent: [
          {
            title: '诊断',
            prop: 'diagnosis'
          },
          {
            title: '白班交班内容',
            prop: 'remark1'
          }
        ]
      },
      {
        name: '中班',
        editContent: [
          {
            title: '诊断',
            prop: 'diagnosis'
          },
          {
            title: '中班交班内容',
            prop: 'remark3'
          }
        ]
      },
      {
        name: '夜班',
        editContent: [
          {
            title: '诊断',
            prop: 'diagnosis'
          },
          {
            title: '夜班交班内容',
            prop: 'remark2'
          }
        ]
      }
    ]
  },
  defaultPatient: {
    name: "",
    bedLabel: "",
    patientStatus: "",
    diagnosis: "",
    remark1: "",
    remark2: "",
    remark3: "",
  }
}

export default data;

