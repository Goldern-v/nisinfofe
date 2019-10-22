import dayjs from "dayjs";

// 头部标题一
export let 头部标题一 = [
  {
    // 单组标题
    "": [
      // 选项列表数组
      {
        label: "一、新生儿入室首次护理记录",
        name: "头部标题一",
        type: "label",
        contenteditable: false,
        class: "border-bottom border-none",
        style: "text-align:left"
      },
      { html: "<br>" }
    ]
  }
];

// 孕周:    ；分娩方式: □顺产 □剖宫产  □吸引产   □产钳助产   □臀牵引
// 羊水:□清  □Ⅰ  □Ⅱ  □Ⅲ；Apgar评分：1分钟   分，5分钟   分，10分钟   分；
// 体重：   kg; 身长：   cm;头围：  cm;皮肤：□红润  □苍白  □紫绀
// 头部：□正常   □产瘤           □血肿            □畸形
// 胸部：□正常  □畸形           腹部：□正常  □畸形
// 外阴部：外生殖器：□正常  □畸形            ；肛门：□通常   □闭锁
// 四肢：活动 ：□正常  □受限 ：  畸形：□无   □有

// 记录时间：     年     月     日    时    分     责任护士签字：

// 孕周:    ；分娩方式: □顺产 □剖宫产  □吸引产   □产钳助产   □臀牵引
export let 孕周信息 = [
  {
    // 单组标题
    孕周: [
      {
        label: "",
        name: "孕周",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: "text-align:left"
      },
      { html: "<br>" }
    ]
  },
  {
    分娩方式: [
      {
        label: "顺产",
        name: "分娩方式",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "剖宫产",
        name: "分娩方式",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "吸引产",
        name: "分娩方式",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "产钳助产",
        name: "分娩方式",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "臀牵引",
        name: "分娩方式",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      { html: "<br>" }
    ]
  }
];

// 羊水:□清  □Ⅰ  □Ⅱ  □Ⅲ；Apgar评分：1分钟   分，5分钟   分，10分钟   分；
export let 羊水信息 = [
  {
    羊水: [
      {
        label: "清",
        name: "羊水",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "Ⅰ",
        name: "羊水",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "Ⅱ",
        name: "羊水",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "Ⅲ",
        name: "羊水",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      // {
      //   label: "其他",
      //   name: "羊水",
      //   type: "checkbox",
      //   multiplechoice: false,
      //   class: ""
      // },
      {
        label: "其他",
        name: "告知其他",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: {
          display: "inline-block",
          minWidth: "50px",
          outline: "none",
          padding: "0"
        }
      },
      // { html: ";" },
      { html: "<br>" }
    ]
  },
  {
    // 单组标题
    Apgar评分: [
      {
        label: "1分钟",
        name: "1分钟Apgar评分",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: "text-align:center;min-width: 20px !important; padding: 0px;",
        postText: "分，"
      },
      {
        label: "5分钟",
        name: "5分钟Apgar评分",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: "text-align:center;min-width: 20px !important; padding: 0px;",
        postText: "分，"
      },
      {
        label: "10分钟",
        name: "10分钟Apgar评分",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: "text-align:center;min-width: 20px !important; padding: 0px;",
        postText: "分;"
      },
      { html: "<br>" }
    ]
  }
];

// 体重：   kg; 身长：   cm;头围：  cm;皮肤：□红润  □苍白  □紫绀
export let 体重信息 = [
  {
    // 单组标题
    "": [
      {
        label: "体重:",
        name: "体重",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: "text-align:center",
        postText: "kg;"
      },
      {
        label: "身长",
        name: "身长",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: "text-align:center",
        postText: "cm;"
      },
      {
        label: "头围",
        name: "头围",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: "text-align:center",
        postText: "cm;"
      },
      { html: " 皮肤:" },
      //   ],
      // },
      // {
      //   "皮肤":[
      {
        label: "红润",
        name: "皮肤",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "苍白",
        name: "皮肤",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "紫绀",
        name: "皮肤",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      { html: "<br>" }
    ]
  }
];

// 头部：□正常   □产瘤           □血肿            □畸形
export let 头部信息 = [
  {
    头部: [
      {
        label: "正常",
        name: "头部",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "产瘤",
        name: "头部",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "",
        name: "头部_产瘤",
        type: "text",
        contenteditable: true,
        class: "border-bottom",
        style: "text-align:center",
        postText: ""
      },
      {
        label: "血肿",
        name: "头部",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "",
        name: "头部_血肿",
        type: "text",
        contenteditable: true,
        class: "border-bottom",
        style: "text-align:center",
        postText: ""
      },
      {
        label: "畸形",
        name: "头部",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "",
        name: "头部_畸形",
        type: "text",
        contenteditable: true,
        class: "border-bottom",
        style: "text-align:center",
        postText: ""
      },
      { html: "<br>" }
    ]
  }
];

// 胸部：□正常  □畸形           腹部：□正常  □畸形
export let 胸部信息 = [
  {
    胸部: [
      {
        label: "正常",
        name: "胸部",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "畸形",
        name: "胸部",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "",
        name: "胸部_畸形",
        type: "text",
        contenteditable: true,
        class: "border-bottom",
        style: "text-align:center",
        postText: ""
      },
      { html: "； 腹部：" },
      {
        label: "正常",
        name: "腹部",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      // { label: "", name: "腹部正常", type: "text", contenteditable: true, class: "border-bottom", style:"text-align:center", postText:"" },
      {
        label: "畸形",
        name: "腹部",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "",
        name: "腹部_畸形",
        type: "text",
        contenteditable: true,
        class: "border-bottom",
        style: "text-align:center",
        postText: ""
      },
      { html: "<br>" }
    ]
  }
];

// 外阴部：外生殖器：□正常  □畸形            ；肛门：□通常   □闭锁
export let 外阴部信息 = [
  {
    外阴部: [
      { html: "外生殖器：" },
      {
        label: "正常",
        name: "外生殖器",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "畸形",
        name: "外生殖器",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "",
        name: "外生殖器畸形",
        type: "text",
        contenteditable: true,
        class: "border-bottom",
        style: "text-align:center",
        postText: ""
      },
      { html: "； 肛门：" },
      {
        label: "通畅",
        name: "肛门",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      // { label: "", name: "肛门通常", type: "text", contenteditable: true, class: "border-bottom", style:"text-align:center", postText:"" },
      {
        label: "闭锁",
        name: "肛门",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      // { label: "", name: "肛门闭锁", type: "text", contenteditable: true, class: "border-bottom", style:"text-align:center", postText:"" },
      { html: "<br>" }
    ]
  }
];

// 四肢：活动 ：□正常  □受限 ：  畸形：□无   □有
export let 四肢 = [
  {
    // 单组标题
    四肢: [
      // 选项列表数组
      { html: "活动：" },
      {
        label: "正常",
        name: "四肢活动",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "受限",
        name: "四肢活动",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      { html: "； 畸形：" },
      {
        label: "无",
        name: "四肢畸形",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      },
      {
        label: "有",
        name: "四肢畸形",
        type: "checkbox",
        multiplechoice: false,
        class: ""
      }
    ]
  }
];

// 告知：
// □ 婴儿由产妇及家属看管，任何时候不能让婴儿单独离开你们。
// □婴儿取平卧位、头偏一侧、抬高床头、沐浴前2小时不宜进食。
// □ 婴儿喂养注意事项
// □ 头部产瘤/血肿无勿按压
// □
// 输血前的药物医嘱： □无   □有      药物名称：
export let 告知 = [
  {
    // 单组标题
    告知: [
      {
        label: "婴儿由产妇及家属看管，任何时候不能让婴儿单独离开你们。",
        name: "告知",
        type: "checkbox",
        multiplechoice: true,
        class: ""
      },
      { html: "<br>" },
      {
        label: "婴儿取平卧位、头偏一侧、抬高床位、沐浴前2小时不宜进食。",
        name: "告知",
        type: "checkbox",
        multiplechoice: true,
        class: "",
        style: "margin-left: 46px;"
      },
      { html: "<br>" },
      {
        label: "婴儿喂养注意事项。",
        name: "告知",
        type: "checkbox",
        multiplechoice: true,
        class: "",
        style: "margin-left: 46px;"
      },
      { html: "<br>" },
      {
        label: "头部产瘤/血肿勿按压。",
        name: "告知",
        type: "checkbox",
        multiplechoice: true,
        class: "",
        style: "margin-left: 46px;"
      },
      { html: "<br>" },
      {
        label: "",
        name: "告知",
        type: "checkbox",
        multiplechoice: true,
        class: "",
        style: "margin-left: 46px;"
      },
      {
        label: "",
        name: "告知其他",
        type: "text",
        contenteditable: true,
        class: "border-bottom border-none",
        style: {
          display: "inline-block",
          minWidth: "100px",
          outline: "none",
          padding: "0"
        }
      }
    ]
  }
];

export let 护士签字 = [
  {
    // 单组标题
    记录时间: [
      // 选项列表数组
      {
        label: "",
        name: "记录时间",
        type: "text",
        bind: "datetime",
        value: dayjs().format("YYYY年MM月DD日 HH时mm分"),
        contenteditable: false,
        class: "border-bottom border-none",
        style: "text-align:left;width:170px"
      },
      { html: "<br>" }
    ]
  },
  {
    // 单组标题
    责任护士签字: [
      // 选项列表数组
      {
        label: "",
        name: "责任护士签字",
        type: "signBox",
        contenteditable: true,
        class: "border-bottom border-none",
        style: "text-align:left"
      },
      { html: "<br>" }
    ]
  }
];

/**
 *  表格元素数据结构
 * */
export let 头部表格 = [
  // table 1
  {
    // tr
    tr: [
      // td

      {
        td: 头部标题一,
        class: "border-none table-padding-none",
        style: "",
        colspan: [3],
        rowspan: [1]
      },
      {
        td: 孕周信息,
        class: "border-none table-padding-none",
        style: "",
        colspan: [1, 2],
        rowspan: [1]
      },
      {
        td: 羊水信息,
        class: "border-none table-padding-none",
        style: "",
        colspan: [2, 1],
        rowspan: [1]
      },
      {
        td: 体重信息,
        class: "border-none table-padding-none",
        style: "",
        colspan: [3],
        rowspan: [1]
      },
      {
        td: 头部信息,
        class: "border-none table-padding-none",
        style: "",
        colspan: [3],
        rowspan: [1]
      },
      {
        td: 胸部信息,
        class: "border-none table-padding-none",
        style: "",
        colspan: [3],
        rowspan: [1]
      },
      {
        td: 外阴部信息,
        class: "border-none table-padding-none",
        style: "",
        colspan: [3],
        rowspan: [1]
      },
      {
        td: 四肢,
        class: "border-none table-padding-none",
        style: "",
        colspan: [3],
        rowspan: [1]
      },
      {
        td: 告知,
        class: "border-none table-padding-none",
        style: "",
        colspan: [3],
        rowspan: [1]
      }
      // {
      //   td: 护士签字,
      //   class: "border-none table-padding-none",
      //   style: "",
      //   colspan: [1, 1],
      //   rowspan: [1]
      // }
    ],
    class: "table-border-none table-padding-none",
    style: "",
    colspan: [1],
    rowspan: [1],
    width: []
  }
];

export default { 头部表格 };
