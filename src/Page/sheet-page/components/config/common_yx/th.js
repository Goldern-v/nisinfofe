
/*
    武汉亚心 - 护理记录单

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
      width: "1460px"
    },
    th: {
        top:
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "意识", "colspan": "1", "rowspan": "3"},
            { "name": "生命体征", "colspan": "4", "rowspan": "1"},
            { "name": "Sp02<br/>%", "colspan": "1", "rowspan": "3"},
            { "name": "CVP<br/>mmHg", "colspan": "1", "rowspan": "3"},
            { "name": "心电<br/>监测", "colspan": "1", "rowspan": "3"},
            { "name": "切口<br/>敷料", "colspan": "1", "rowspan": "3"},
            { "name": "吸氧<br/>方式<br/>L/Min", "colspan": "1", "rowspan": "3"},
            { "name": "静脉置管", "colspan": "2", "rowspan": "1"},
            { "name": "", "colspan": "1", "rowspan": "3","key":"customItem1","canSet":"true"},
            // { "name": "", "colspan": "1", "rowspan": "3","key":"customItem2","canSet":"true"},
            { "name": "导管及引流管", "colspan": "6", "rowspan": "1"},
            { "name": "卧位", "colspan": "1", "rowspan": "3"},
            { "name": "受压<br/>皮肤", "colspan": "1", "rowspan": "3"},
            { "name": "入量(ml)", "colspan": "2", "rowspan": "1"},
            { "name": "出量", "colspan": "2", "rowspan": "1"},
            { "name": "护理措施", "colspan": "1", "rowspan": "3"},
            { "name": "其他", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, },
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
                //静脉置管
                { "name": "留置针", "colspan": "1", "rowspan": "2" },
                { "name": "深静脉", "colspan": "1", "rowspan": "2" },
                // 导管及引流管
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "部位", "colspan": "1", "rowspan": "2"},
                {"name": "状态", "colspan": "1", "rowspan": "2"},
                {"name": "深度<br/>cm", "colspan": "1", "rowspan": "2"},
                {"name": "颜色", "colspan": "1", "rowspan": "2"},
                {"name": "性状", "colspan": "1", "rowspan": "2"},
                // 入量
                {"name": "项目<br/>备用量", "colspan": "1", "rowspan": "2"},
                {"name": "实用量", "colspan": "1", "rowspan": "2"},
                // 出量
                {"name": "项目", "colspan": "1", "rowspan": "2"},
                {"name": "ml", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            [
            ]
        ,
    }
  }
