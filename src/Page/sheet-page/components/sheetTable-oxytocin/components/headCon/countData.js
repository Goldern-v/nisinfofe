export let countData = {
  thead: [
    {
      type: "text",
      value: ""
    },
    {
      type: "text",
      value: "0",
      colspan: 2,
    },
    {
      type: "text",
      value: "1",
      colspan: 2,
    },
    {
      type: "text",
      value: "2",
      colspan: 2,
    },
    {
      type: "text",
      value: "3",
      colspan: 2,
    },
  ],
  tbody: [
    [
      {
        type: "text",
        text: "宫颈扩张（CM）"
      },
      {
        type: "text",
        text: "未开"
      },
      {
        value: "0",
        isChecked: true,
        name: "cervix1"
      },
      {
        type: "text",
        text: "1-2"
      },
      {
        value: "1",
        isChecked: true,
        name: "cervix1"
      },
      {
        type: "text",
        text: "3-4"
      },
      {
        value: "2",
        isChecked: true,
        name: "cervix1"
      },
      {
        type: "text",
        text: ">=5"
      },
      {
        value: "3",
        isChecked: true,
        name: "cervix1"
      }
    ],
    [
      {
        type: "text",
        text: "宫颈退缩（%）"
      },
      {
        type: "text",
        text: "0-30"
      },
      {
        value: "0",
        isChecked: true,
        name: "cervix2"
      },
      {
        type: "text",
        text: "40-50"
      },
      {
        value: "1",
        isChecked: true,
        name: "cervix2"
      },
      {
        type: "text",
        text: "60-70"
      },
      {
        value: "2",
        isChecked: true,
        name: "cervix2"
      },
      {
        type: "text",
        text: ">=80"
      },
      {
        value: "3",
        isChecked: true,
        name: "cervix2"
      }
    ],
    [
      {
        type: "text",
        text: "先露高低（CM）"
      },
      {
        type: "text",
        text: "-3"
      },
      {
        value: "0",
        isChecked: true,
        name: "cervix3"
      },
      {
        type: "text",
        text: "-2"
      },
      {
        value: "1",
        isChecked: true,
        name: "cervix3"
      },
      {
        type: "text",
        text: "-1或0"
      },
      {
        value: "2",
        isChecked: true,
        name: "cervix3"
      },
      {
        type: "text",
        text: "+1或+2"
      },
      {
        value: "3",
        isChecked: true,
        name: "cervix3"
      }
    ],
    [
      {
        type: "text",
        text: "宫颈硬度"
      },
      {
        type: "text",
        text: "硬"
      },
      {
        value: "0",
        isChecked: true,
        name: "cervix4"
      },
      {
        type: "text",
        text: "中等"
      },
      {
        value: "1",
        isChecked: true,
        name: "cervix4"
      },
      {
        type: "text",
        text: "软"
      },
      {
        value: "2",
        isChecked: true,
        name: "cervix4"
      },
      {
        type: "text",
        text: ""
      },
      {
        type: "text",
        text: ""
      }
    ],
    [
      {
        type: "text",
        text: "宫颈位置"
      },
      {
        type: "text",
        text: "后位"
      },
      {
        value: "0",
        isChecked: true,
        name: "cervix5"
      },
      {
        type: "text",
        text: "中位"
      },
      {
        value: "1",
        isChecked: true,
        name: "cervix5"
      },
      {
        type: "text",
        text: "前位"
      },
      {
        value: "2",
        isChecked: true,
        name: "cervix5"
      },
      {
        type: "text",
        text: ""
      },
      {
        type: "text",
        text: ""
      }
    ],
    [
      {
        type: "text",
        text: "将检查结果在相应栏内够“√”累计宫颈评分。",
        colspan: 5,
        style: "border-right: none"
      },
      {
        prev: "医生签名:",
        value: "",
        colspan: 4,
        class: "sign",
        sign: true
      },
    ]
  ]
}