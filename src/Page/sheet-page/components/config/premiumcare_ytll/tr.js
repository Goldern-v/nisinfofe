// 护理记录单（统一护理记录单）
import {
    multiDictInfo
  } from "../../../api/index";
  import {
    keyf1
  } from "../keyEvent/f1.js";
  import {
    event_date,
    event_time,
    click_date,
    click_time
  } from "../keyEvent/date";
  // let 静脉性质 = [];
  // let 饮食性质 = [];
  // let 出量名称 = {};
  // let 出量性质 = 出量名称;
  // let 意识 = [];
  // let 吸氧方式 = [];

  let 意识 =['清醒','嗜睡','昏睡','浅昏迷','中昏迷','深昏迷','意识模糊','谵妄', '镇静']

  export default [
    { hidden: true, key: 'recordDate', value: '' },
    {
      key: "recordMonth", //日期
      value: "",
      event: event_date,
      click: click_date
    },
    {
      key: "recordHour", //时间
      value: "",
      event: event_time,
      click: click_time,
    },
    {
      key: "food", //入量- 名称
      value: "",
      event: keyf1,
      // autoComplete: {
      //   data: 疼痛部位
      // },
      textarea: {
        width: 120
      },
      name: "入量-名称"
    },
    {
      key: "way", //入量- 途径
      value: "",
      event: keyf1,
      textarea: {
        width: 45
      },
      name: "入量-途径"
    },
    {
      key: "foodSize", // 入量 - 实出量ml
      value: "",
      event: keyf1,
      textarea: {
        width: 40
      },
      // autoComplete: {
      //   data: 疼痛评分
      // },
      name: "入量-实出量ml",
      statBottomLine: true
    },
    {
      key: "discharge", //出量 - 名称 
      value: "",
      event: keyf1,
      // autoComplete: {
      //   data: 静脉性质
      // },
      textarea: {
        width: 60
      },
      name: "出量-名称 "
    },
    {
      key: "dischargeSize", //出量 - 出量ml
      value: "",
      event: keyf1,
      name: "出量ml",
      textarea: {
        width: 40
      },
      // autoComplete: {
      //   data: 静脉量
      // },
      statBottomLine: true
    },
    {
      key: "colorProperties", //出量 - 颜色性状
      value: "",
      event: keyf1,
      textarea: {
        width: 40
      },
      // autoComplete: {
      //   data: 饮食性质
      // },
      name: "出量-颜色性状",
    },
    {
      key: "consciousness", // 意识
      value: "",
      event: keyf1,
      name: "意识",
      autoComplete: {
        data: 意识
      },
      textarea: {
        width: 25
      },
    },
  
    {
      key: "leftReflex", // 瞳孔mm/对光反应 左1
      value: "",
      event: keyf1,
      name: "瞳孔mm/对光反应-左1",
      textarea: {
        width: 20
      },
    },
    {
      key: "filed1", // 瞳孔mm/对光反应 左2
      value: "",
      event: keyf1,
      autoComplete: {
        data: ['+', '±', '－']
      },
      textarea: {
        width: 20
      },
      name: "瞳孔mm/对光反应 左2",
    },
    {
      key: "rightReflex", // 瞳孔mm/对光反应 右1
      value: "",
      event: keyf1,
      name: "出量",
      textarea: {
        width: 20
      },
      name: "瞳孔mm/对光反应 右1",
    },
    {
      key: "filed2", //瞳孔mm/对光反应 右2
      value: "",
      event: keyf1,
      autoComplete: {
        data: ['+', '±', '－']
      },
      textarea: {
        width: 20
      },
      name: "意识",
      name: "瞳孔mm/对光反应 右2",
    },
    {
      key: "muscleRA", //RA
      value: "",
      event: keyf1,
      name: "RA",
      textarea: {
        width: 20
      },
      autoComplete: {
        data: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']
      }
    },
    {
      key: "muscleLA", //LA
      value: "",
      event: keyf1,
      name: "LA",
      textarea: {
        width: 20
      },
      autoComplete: {
        data: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']
      }
    },
    {
      key: "muscleRL", //RL
      value: "",
      event: keyf1,
      name: "RL",
      textarea: {
        width: 20
      },
      autoComplete: {
        data: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']
      }
    },
    {
      key: "muscleLL", //LL
      value: "",
      event: keyf1,
      name: "LL",
      textarea: {
        width: 20
      },
      autoComplete: {
        data: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ']
      }
    },
    {
      key: "temperature", //体温
      value: "",
      event: keyf1,
      name: "体温",
      textarea: {
        width: 30
      }
    },
    {
      key: "pulse", //心率脉搏
      value: "",
      event: keyf1,
      name: "心率脉搏",
      textarea: {
        width: 45
      }
    },
    {
      key: "breath", //呼吸次分
      value: "",
      event: keyf1,
      name: "呼吸",
      textarea: {
        width: 35
      }
    },
    {
      key: "bloodPressure", //血压
      value: "",
      event: keyf1,
      name: "血压",
      textarea: {
        width: 45
      }
    },
    {
      key: "bloodOxygen", //血氧
      value: "",
      event: keyf1,
      name: "血氧",
      textarea: {
        width: 35
      }
    },
    {
      key: "pain", //疼痛评分
      value: "",
      event: keyf1,
      name: "疼痛评分",
      next:"次/分",
      textarea: {
        width: 30
      }
    },
    {
      key: "nasalCannula", //鼻导管
      value: "",
      event: keyf1,
      name: "鼻导管",
      textarea: {
        width: 40
      }
    },
    {
      key: "faceMask", //面罩
      value: "",
      event: keyf1,
      textarea: {
        width: 40
      },
      name: "面罩",
    },
    {
      key: "customize", //标题1
      value: "",
      event: keyf1,
      textarea: {
        width: 40
      }
    },
    {
      key: "multidrug", //多重耐药
      value: "",
      event: keyf1,
      name: "多重耐药",
      textarea: {
        width: 40
      }
    },
    {
      key: "nursingMeasures", //护理措施
      value: "",
      event: keyf1,
      textarea: {
        width: 40
      },
      name: '护理措施'
    },
    {
      key: "bodyPosition", //体位
      value: "",
      event: keyf1,
      textarea: {
        width: 30
      },
      name: '体位',
      autoComplete: {
        data: ['左', '右', '平', '半', '端', '自']
      }
    },
    {
      key: "constraint", //约束
      value: "",
      event: keyf1,
      textarea: {
        width: 30
      },
      name: '约束',
      autoComplete: {
        data: ['是', '否']
      }
    },
    {
      key: "skin", //皮肤
      value: "",
      event: keyf1,
      textarea: {
        width: 35
      },
      name: '皮肤',
      autoComplete: {
        data: ['完好', '异常']
      }
    },
    {
      key: "mentalState", //心理状态
      value: "",
      event: keyf1,
      textarea: {
        width: 45
      },
      name: '心理状态',
      autoComplete: {
        data: ['好', '差', '无法评估']
      }
    },
    // {
    //   key: "nutritional", //营养状况
    //   value: "",
    //   event: keyf1,
    //   textarea: {
    //     width: 35
    //   },
    //   name: '营养状况',
    //   autoComplete: {
    //     data: ['良好', '一般', '差']
    //   }
    // },
    {
      key: "description", //特殊处理及病情观察
      value: "",
      style: {
        textAlign: "left",
        position: "absolute",
        top: "1px",
        bottom: "1px",
        left: "1px",
        width: "220px",
        background: "transparent"
      },
      event: function (e, td) {
        console.log(e.keyCode);
        if (e.keyCode == 9) {
          td.value = "    " + td.value;
          e.preventDefault();
        }
        keyf1(e, td);
      }
      // oninput: next
    },
    {
      key: "sign",
      value: ""
    },
    {
      hidden: true,
      key: "id",
      value: ""
    },
    {
      hidden: true,
      key: "signerName",
      value: ""
    },
    {
      hidden: true,
      key: "status",
      value: ""
    },
    {
      hidden: true,
      key: "recordSource",
      value: ""
    },
    {
      hidden: true,
      key: "recordYear",
      value: ""
    },
    {
      hidden: true,
      key: "dataHash",
      value: ""
    },
    {
      hidden: true,
      key: "recordDate",
      value: ""
    },
    {
      hidden: true,
      key: "monthHour",
      value: ""
    },
    {
      hidden: false,
      key: "signerNo",
      value: ""
    },
    {
      hidden: false,
      key: "auditorNo",
      value: ""
    },
    {
      hidden: true,
      key: "auditorName",
      value: ""
    },
    {
      hidden: true,
      key: "empNo",
      value: ""
    },
    {
      hidden: true,
      key: "multiSign",
      value: false
    }
  ];
  
  let filterKey = '威县' + ':';
  let filterKey2 = '统一护理记录单' + ':';
  
  // export function getListData4() {
  //   let list = [
  //     "意识",
  //     "饮食性质",
  //     "静脉性质",
  //     "出量名称",
  //     "尿液性质",
  //     "呕吐物性质",
  //     "引流量性质",
  //     "吸氧方式",
  //     "阴道出血性质"
  //   ];
  //   list = list.map(key => {
  //     return key.includes('出量名称') ? filterKey + filterKey2 + key : filterKey + key;
  //   });
  //   multiDictInfo(list).then(res => {
  //     let data = res.data.data;
  //     setList(意识, "意识", data);
  //     setList(静脉性质, "静脉性质", data);
  //     setList(饮食性质, "饮食性质", data);
  //     setList(出量名称, "出量名称", data, true);
  //     setList(吸氧方式, "吸氧方式", data);
  //   });
  // }
  
  // getListData4();
  // /**
  //  *
  //  * @param {*} list 原数组
  //  * @param {*} key 对应的key
  //  * @param {*} data 数据源
  //  * @param {*} isChildOptions2 是否有子下拉选项（依赖于前一个td选择）
  //  */
  // function setList(list, key, data, isChildOptions2) {
  //   key = key.includes('出量名称') ? filterKey + filterKey2 + key : filterKey + key;
  //   if (isChildOptions2) {
  //     for (let item of data[key]) {
  //       let arr = data[filterKey + item.name + '性质'];
  //       if (arr && arr.constructor == Array) {
  //         arr = arr.map(function (child, index) {
  //           return child.name;
  //         })
  //         list[item.name] = arr;
  //       } else {
  //         list[item.name] = '';
  //       }
  //     }
  //   } else {
  //     list.splice(0, list.length);
  //     for (let item of data[key]) {
  //       list.push(item.name);
  //     }
  //   }
  // }
  