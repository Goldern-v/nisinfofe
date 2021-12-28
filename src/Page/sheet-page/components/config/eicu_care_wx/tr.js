/*
威县-重症护理记录单
*/
import { multiDictInfo } from "../../../api/index";
  import {
    keyf1,
    limitChange
  } from "../keyEvent/f1.js";
  import {
    event_date,
    event_time,
    click_date,
    click_time
  } from "../keyEvent/date";
  let 静脉性质=[]
  let 饮食性质=[]
  let 出量名称={}
  let 出量性质=出量名称
  export default [{
      key: "recordMonth", //日期
      value: "",
      event: event_date,
      click: click_date
    },
    {
      key: "recordHour", //时间
      value: "",
      event: event_time,
      click: click_time
    },
    {
      key: "veinNature", // 静脉性质
      value: "",
      event: keyf1,
      name: "静脉性质",
      change: (e, td) => limitChange(e, td, 12),
      textarea: {
        width: 90
      },
      // autoComplete: {
      //   data: ["5%葡萄糖","10%葡萄糖","生理盐水","甘露醇","白蛋白","血液制品","其他"]
      // }
      autoComplete: {
        data: 静脉性质
      }
    },
    {
      key: "veinQuantity", //veinQuantity 静脉量
      value: "",
      event: keyf1,
      name: "静脉量",
      change: (e, td) => limitChange(e, td, 12),
      textarea: {
        width: 90
      },
    },
    {
      key: "dietNature", // 饮食性质
      value: "",
      event: keyf1,
      name: "饮食性质",
      change: (e, td) => limitChange(e, td, 12),
      textarea: {
        width: 90
      },
      // autoComplete: {
      //   data: ["水","流质","冷流","半流质","普食","鼻饲","禁食","低脂低盐饮食","糖尿病饮食"]
      // }
      autoComplete: {
        data: 饮食性质
      }
    },
    {
      key: "dietQuantity", //饮食量
      value: "",
      event: keyf1,
      name: "饮食量",
      change: (e, td) => limitChange(e, td, 12),
      textarea: {
        width: 90
      },
    },
    {
      key: "discharge", // 出量名称
      value: "",
      event: keyf1,
      textarea: {
        width: 90
      },
      change: (e, td) => limitChange(e, td, 12),
      autoComplete: {
        data: 出量名称
      },
      name: "出量名称",
      childKey: "出量性质"
    },
    {
      key: "outputNature", //出量性质
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td, 12),
      textarea: {
        width: 90
      },
      autoComplete: {
        data: 出量性质
      },
      name: "出量性质",
      parentKey: "出量名称"
    },
    {
      key: "dischargeSize", //dischargeSize 出量
      value: "",
      event: keyf1,
      name: "出量",
      change: (e, td) => limitChange(e, td, 12),
      textarea: {
        width: 90
      },
    },
    {
      key: "description", //特殊情况记录
      value: "",
      style: {
        textAlign: "left",
        position: "absolute",
        top: "1px",
        bottom: "1px",
        left: "1px",
        width: "240px",
        background: "transparent",
      }
    },
    {
      key: "sign",
      value: ""
    },
    // {
    //   key: "audit",
    //   value: ""
    // },
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
      key: "signerName2",
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
      hidden: true,
      key: "signerNo2",
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
      value: true,
    },
  ];
  
  let filterKey2 = '重症护理护记' + ':';
  export function getListData4() {
    // let list = [
    //   "静脉性质",
    //   "饮食性质",
    //   "出量名称",
    //   "重护护记尿液性质",
    //   "重护护记呕吐物性质",
    //   "重护护记引流量性质",
    //   "重护护记大便性质",
    //   "重护护记阴道出血性质",
    //   "重护护记脱水量性质",
    //   '威县人医:重症护理记录单:静脉性质下拉选项',
    // ];
    // list = list.map(key => {
    //   return key.includes('出量名称') ? filterKey2 + key : key;
    // });
    let data={}
    let str='重症护理护记:出量名称'
    data.静脉性质=[{code: "5%葡萄糖", name: "5%葡萄糖"}, {code: "10%葡萄糖", name: "10%葡萄糖"}, {code: "生理盐水", name: "生理盐水"},{code: "甘露醇", name: "甘露醇"},{code: "白蛋白", name: "白蛋白"},{code: "血液制品", name: "血液制品"},{code: "其他", name: "其他"}]
    data.饮食性质=[{code: "水", name: "水"}, {code: "流质", name: "流质"}, {code: "冷流", name: "冷流"},{code: "半流质", name: "半流质"},{code: "普食", name: "普食"},{code: "鼻饲", name: "鼻饲"},{code: "禁食", name: "禁食"},{code: "低脂低盐饮食", name: "低脂低盐饮食"},{code: "糖尿病饮食", name: "糖尿病饮食"}]
    data.重护护记尿液性质= [{code: "淡黄", name: "淡黄"}, {code: "浓茶色", name: "浓茶色"}, {code: "血尿", name: "血尿"}, {code: "混浊", name: "混浊"}, {code: "其他", name: "其他"}]
    data.重护护记呕吐物性质=[{code: "草绿色", name: "草绿色"}, {code: "淡黄色", name: "淡黄色"}, {code: "咖啡色", name: "咖啡色"}, {code: "深褐色", name: "深褐色"}, {code: "褐色", name: "褐色"}, {code: "浅褐色", name: "浅褐色"}, {code: "灰白色", name: "灰白色"}, {code: "暗红色", name: "暗红色"}, {code: "鲜红色", name: "鲜红色"}, {code: "其他", name: "其他"}]
    data.重护护记引流量性质=[{code: "淡黄色", name: "淡黄色"}, {code: "淡红色", name: "淡红色"}, {code: "黄白混浊色", name: "黄白混浊色"}, {code: "墨绿色", name: "墨绿色"}, {code: "鲜红色", name: "鲜红色"}, {code: "暗红色", name: "暗红色"}, {code: "黄绿色", name: "黄绿色"}]
    data.重护护记阴道出血性质= [{code: "鲜红色", name: "鲜红色"}, {code: "暗红色", name: "暗红色"}, {code: "淡红色", name: "淡红色"}]
    data.重护护记大便性质= [{code: "黄软", name: "黄软"}, {code: "柏油样变", name: "柏油样变"}, {code: "血便", name: "血便"}, {code: "稀水样便", name: "稀水样便"}, {code: "米甘样便", name: "米甘样便"}, {code: "白陶士样便", name: "白陶士样便"}]
    data[str]=[{code: "尿液", name: "尿液"}, {code: "呕吐物", name: "呕吐物"}, {code: "引流量", name: "引流量"},{code: "大便", name: "大便"},{code: "阴道出血", name: "阴道出血"},{code: "脱水量", name: "脱水量"}]
    setList(静脉性质, "静脉性质", data);
    setList(饮食性质, "饮食性质", data);
    setList(出量名称, "出量名称", data,true);
//     multiDictInfo(list).then(res => {
//       console.log(243,res)
//       let data = res.data.data;
//       console.log(241,data)
//      let str='重症护理护记:出量名称'
// data.静脉性质=[{code: "5%葡萄糖", name: "5%葡萄糖"}, {code: "10%葡萄糖", name: "10%葡萄糖"}, {code: "生理盐水", name: "生理盐水"},{code: "甘露醇", name: "甘露醇"},{code: "白蛋白", name: "白蛋白"},{code: "血液制品", name: "血液制品"},{code: "其他", name: "其他"}]
// data.饮食性质=[{code: "水", name: "水"}, {code: "流质", name: "流质"}, {code: "冷流", name: "冷流"},{code: "半流质", name: "半流质"},{code: "普食", name: "普食"},{code: "鼻饲", name: "鼻饲"},{code: "禁食", name: "禁食"},{code: "低脂低盐饮食", name: "低脂低盐饮食"},{code: "糖尿病饮食", name: "糖尿病饮食"}]
// data.重护护记尿液性质= [{code: "淡黄", name: "淡黄"}, {code: "浓茶色", name: "浓茶色"}, {code: "血尿", name: "血尿"}, {code: "混浊", name: "混浊"}, {code: "其他", name: "其他"}]
// data.重护护记呕吐物性质=[{code: "草绿色", name: "草绿色"}, {code: "淡黄色", name: "淡黄色"}, {code: "咖啡色", name: "咖啡色"}, {code: "深褐色", name: "深褐色"}, {code: "褐色", name: "褐色"}, {code: "浅褐色", name: "浅褐色"}, {code: "灰白色", name: "灰白色"}, {code: "暗红色", name: "暗红色"}, {code: "鲜红色", name: "鲜红色"}, {code: "其他", name: "其他"}]
// data.重护护记引流量性质=[{code: "淡黄色", name: "淡黄色"}, {code: "淡红色", name: "淡红色"}, {code: "黄白混浊色", name: "黄白混浊色"}, {code: "墨绿色", name: "墨绿色"}, {code: "鲜红色", name: "鲜红色"}, {code: "暗红色", name: "暗红色"}, {code: "黄绿色", name: "黄绿色"}]
// data.重护护记阴道出血性质= [{code: "鲜红色", name: "鲜红色"}, {code: "暗红色", name: "暗红色"}, {code: "淡红色", name: "淡红色"}]
// data[str]=[{code: "尿液", name: "尿液"}, {code: "呕吐物", name: "呕吐物"}, {code: "引流量", name: "引流量"},{code: "大便", name: "大便"},{code: "阴道出血", name: "阴道出血"},{code: "脱水量", name: "脱水量"}]
// console.log(241,data)
//       setList(静脉性质, "静脉性质", data);
//       console.log(251,静脉性质)
//       setList(饮食性质, "饮食性质", data);
//       setList(出量名称, "出量名称", data,true);
//       console.log(253,出量名称)
    // });
  }
  getListData4();

  /**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 * @param {*} isChildOptions2 是否有子下拉选项（依赖于前一个td选择）
 */
 function setList(list, key, data, isChildOptions2) {
  key = key.includes('出量名称') ?  filterKey2 + key : key;
  if (isChildOptions2) {
    for (let item of data[key]) {
      let arr = data[ '重护护记' + item.name + '性质'];
      if (arr && arr.constructor == Array) {
        arr = arr.map(function (child, index) {
          return child.name;
        })
        list[item.name] = arr;
      } else {
        list[item.name] = '';
      }
    }
  } else {
    list.splice(0, list.length);
    for (let item of data[key]) {
      list.push(item.name);
    }
  }
}