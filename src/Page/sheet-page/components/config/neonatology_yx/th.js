
/*
    武汉亚心 - 新生儿科护理记录单

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
      width: "1450px"
    },
    th: {
        top:
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "生命体征", "colspan": "4", "rowspan": "1"},
            { "name": "Sp02<br/>%", "colspan": "1", "rowspan": "3"},
            { "name": "心电<br/>监护", "colspan": "1", "rowspan": "3"},
            { "name": "卧位", "colspan": "1", "rowspan": "3"},
            { "name": "箱温<br/>/暖床<br/>℃", "colspan": "1", "rowspan": "3"},
            { "name": "呼吸支持及氧疗", "colspan": "5", "rowspan": "1"},
            { "name": "静脉置管", "colspan": "2", "rowspan": "1"},
            { "name": "导管及引流管", "colspan": "6", "rowspan": "1"},
            { "name": "入量ml", "colspan": "4", "rowspan": "1"},
            { "name": "出量ml", "colspan": "2", "rowspan": "1"},
            { "name": "护理措施", "colspan": "1", "rowspan": "3"},
            { "name": "其他", "colspan": "1", "rowspan": "3", style: { minWidth: "180px",  maxWidth: "180px"}, },
            { "name": "签名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px", maxWidth: "60px" }, },
            { "name": "审核签名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px", maxWidth: "60px" }, }
         ]
        ,
        mid:
            [
                {"name": "日期", "colspan": "1", "rowspan": "2"},
                {"name": "时间", "colspan": "1", "rowspan": "2"},
                // 生命体征
                {"name": "T<br/>℃", "colspan": "1", "rowspan": "2"},
                {"name": "HR<br/>次/分", "colspan": "1", "rowspan": "2"},
                {"name": "R<br/>次/分", "colspan": "1", "rowspan": "2"},
                {"name": "BP<br/>mmHg", "colspan": "1", "rowspan": "2"},
                // 呼吸支持及氧疗
                {"name": "呼吸机<br/>模式", "colspan": "1", "rowspan": "2"},
                {"name": "频率<br/>次/分", "colspan": "1", "rowspan": "2"},
                {"name": "氧浓度%", "colspan": "1", "rowspan": "2"},
                {"name": "插管<br/>深度<br/>cm", "colspan": "1", "rowspan": "2"},
                {"name": "吸氧<br/>L/min", "colspan": "1", "rowspan": "2"},
                // 静脉置管
                {"name": "留置针", "colspan": "1", "rowspan": "2"},
                {"name": "深静脉", "colspan": "1", "rowspan": "2"},
                // 导管及引流管
                {"name": "项目", "colspan": "1", "rowspan": "2"},
                {"name": "部位", "colspan": "1", "rowspan": "2"},
                {"name": "状态", "colspan": "1", "rowspan": "2"},
                {"name": "深度<br/>cm", "colspan": "1", "rowspan": "2"},
                {"name": "颜色", "colspan": "1", "rowspan": "2"},
                {"name": "性状", "colspan": "1", "rowspan": "2"},
                // 入量
                {"name": "药物", "colspan": "2", "rowspan": "1"},
                {"name": "饮食", "colspan": "2", "rowspan": "1"},
                // 出量
                {"name": "项目", "colspan": "1", "rowspan": "2"},
                {"name": "量", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            [
                {"name": "项目", "colspan": "1", "rowspan": "1"},
                {"name": "量", "colspan": "1", "rowspan": "1"},
                {"name": "项目", "colspan": "1", "rowspan": "1"},
                {"name": "量", "colspan": "1", "rowspan": "1"},
            ]
        ,
    }
  }
