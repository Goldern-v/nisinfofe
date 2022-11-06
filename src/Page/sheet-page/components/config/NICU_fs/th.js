
/*
  佛山市一 - 护理记录单(上肢骨折术后)
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    
*/

import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
    // 科室的名称
    deptType: "", 
    style: {
      width: "1350px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "生命体征", "colspan": "8", "rowspan": "1"}, 
            { "name": "专科观察项目", "colspan": "8", "rowspan": "1"},
            { "name": "入量", "colspan": "3", "rowspan": "1"}, 
            { "name": "出量", "colspan": "3", "rowspan": "1"}, 
            { "name": "专科护理", "colspan": "4", "rowspan": "1"}, 
            // { "name": "患肢<br/>各趾<br/>感觉", "colspan": "1", "rowspan": "3"}, 
            // { "name": "患肢<br/>各趾<br/>活动", "colspan": "1", "rowspan": "3"}, 
            // { "name": "患肢<br/>各趾<br/>皮温", "colspan": "1", "rowspan": "3"}, 
            // { "name": "患肢<br/>各趾<br/>甲床", "colspan": "1", "rowspan": "3"}, 
            // { "name": "患肢<br/>疼痛<br/>评分(分)", "colspan": "1", "rowspan": "3"},
            // { "name": "患肢<br/>抬高", "colspan": "1", "rowspan": "3"}, 
            // { "name": "石膏<br/>固定", "colspan": "1", "rowspan": "3"}, 
            // { "name": "患肢<br/>肿胀<br/>(°)", "colspan": "1", "rowspan": "3"}, 
            // { "name": "伤口<br/>外敷料", "colspan": "1", "rowspan": "3"}, 
            // { "name": "握力<br/>球训练", "colspan": "1", "rowspan": "3"}, 
            // { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue"}, 
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "163px",  maxWidth: "163px"}, }, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3", style: { minWidth: "50px",  maxWidth: "50px"},}, 
            { "name": "质控护士", "colspan": "1", "rowspan": "3"}
         ]
            
        , 
        mid:  
            [
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                {"name": "体温<br/>℃", "colspan": "1", "rowspan": "2"}, 
                {"name": "心率<br/>次/<br/>分", "colspan": "1", "rowspan": "2"}, 
                {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"}, 
                {"name": "血氧饱<br/>和度%", "colspan": "1", "rowspan": "2"}, 
                // {"name": "箱温℃<br/>/箱温℃<br/>(2选1)", "colspan": "1", "rowspan": "2"}, 
                { "name": "箱温℃", "colspan": "1", "rowspan": "2",canSet:true,key:"customValue1"},

                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2"}, 
                {"name": "平均压<br/>mmHg", "colspan": "1", "rowspan": "2",}, 
                {"name": "血糖<br/>mmol/L", "colspan": "1", "rowspan": "2",}, 
                {"name": "反应", "colspan": "1", "rowspan": "2"}, 
                {"name": "哭声", "colspan": "1", "rowspan": "2"}, 
                {"name": "吸吮力", "colspan": "1", "rowspan": "2"}, 
                {"name": "皮肤<br/>颜色", "colspan": "1", "rowspan": "2"},
                {"name": "意识<br/>状态", "colspan": "1", "rowspan": "2"}, 
                {"name": "三凹征", "colspan": "1", "rowspan": "2",canSet:true,key:"customValue2"},
                // {"name": "三凹征/<br/>胸廓隆起/<br/>前囟（2选1)", "colspan": "1", "rowspan": "2"}, 
                {"name": "CRT(S)", "colspan": "1", "rowspan": "2"}, 
                {"name": "心电监护", "colspan": "1", "rowspan": "2",canSet:true,key:"customValue3"},
                // {"name": "心电监护/<br/>肌张力<br/>（2选1）", "colspan": "1", "rowspan": "2"},
                {"name": "配方<br/>奶(ml)", "colspan": "1", "rowspan": "2"}, 
                {"name": "名称", "colspan": "1", "rowspan": "2"}, 
                {"name": "入量（ml）", "colspan": "1", "rowspan": "2"}, 
                {"name": "胃管抽<br/>出残余奶<br/>(ml)", "colspan": "1", "rowspan": "2"},
                {"name": "名称", "colspan": "1", "rowspan": "2"}, 
                {"name": "出量（ml）", "colspan": "1", "rowspan": "2"}, 
                {"name": "留置针", "colspan": "1", "rowspan": "2",canSet:true,key:"customValue4"},
                {"name": "输液", "colspan": "1", "rowspan": "2",canSet:true,key:"customValue5"},
                {"name": "光疗", "colspan": "1", "rowspan": "2",canSet:true,key:"customValue6"},
                {"name": "体位（选项）", "colspan": "1", "rowspan": "2",canSet:true,key:"customValue7"},

                // {"name": "留置针<br/>部位", "colspan": "1", "rowspan": "2"}, 
                // {"name": "输液", "colspan": "1", "rowspan": "2"},
                // {"name": "光疗", "colspan": "1", "rowspan": "2"},
                // {"name": "体位（选项）", "colspan": "1", "rowspan": "2"},
            ]
        , 
        bottom: 
            []
        , 
    }
  }  
  