
/*
  临邑 - 新生儿监护室监护记录
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
      width: "1820px"
    },
    th: {
        top:
         [
            {"name": "日期", "colspan": "1", "rowspan": "3"},
            {"name": "时间", "colspan": "1", "rowspan": "3"},
            {"name": '注射用药物',"colspan": "2","rowspan": "1",},
            {"name": '静脉液体管理（单位：ml）',"colspan": "9","rowspan": "1",},
            {"name": '胃肠道入量',"colspan": "5","rowspan": "1",},
            {"name": '总<br/>入<br/>量<br/>ml',"colspan": "1","rowspan": "3",},
            {"name": '出量',"colspan": "6","rowspan": "1",},
            {"name": '箱<br/>内<br/>或<br/>辐<br/>射<br/>台<br/>温<br/>度<br/>℃',"colspan": "1","rowspan": "3",},
            {"name": '生命体征',"colspan": "4","rowspan": "1",},
            {"name": '血<br/>氧<br/>饱<br/>和<br/>度<br/>%',"colspan": "1","rowspan": "3",},
            {"name": '氧疗',"colspan": "2","rowspan": "1",},
            {"name": '呼吸机管理',"colspan": "8","rowspan": "1",},
            {"name": '翻<br/>身<br/>记<br/>录',"colspan": "1","rowspan": "3",},
            {"name": '护理措施',"colspan": "1","rowspan": "3",},
            { "name": "病情观察及其他处理", "colspan": "1", "rowspan": "3", style: { minWidth: "135px",  maxWidth: "135px"}, },
            { "name": "签名", "colspan": "1", "rowspan": "3"},
         ]
        ,
        mid:
            [
                {"name": "药名及用法", "colspan": "1", "rowspan": "2"},
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "1", "colspan": "2", "rowspan": "1"},
                {"name": "2", "colspan": "2", "rowspan": "1"},
                {"name": "3", "colspan": "2", "rowspan": "1"},
                {"name": "4", "colspan": "2", "rowspan": "1"},
                {"name": "累<br/>计<br/>入<br/>量<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "奶", "colspan": "2", "rowspan": "1"},
                {"name": "口<br/>服<br/>药", "colspan": "1", "rowspan": "2"},
                {"name": "喂<br/>入<br/>方<br/>式", "colspan": "1", "rowspan": "2"},
                {"name": "累<br/>计<br/>入<br/>量<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "尿<br/>液<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "大<br/>便<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "呕<br/>吐<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "引<br/>流<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "痰<br/>液<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "总<br/>出<br/>量<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "T<br/>℃", "colspan": "1", "rowspan": "2"},
                {"name": "P<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "R<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "BP<br/>mmH<br/>g", "colspan": "1", "rowspan": "2"},
                {"name": "流<br/>量<br/>升/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "方<br/>式", "colspan": "1", "rowspan": "2"},
                {"name": "模<br/>式", "colspan": "1", "rowspan": "2"},
                {"name": "呼<br/>吸<br/>频<br/>率<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "VT<br/>ml", "colspan": "1", "rowspan": "2"},
                {"name": "Ti<br/>S", "colspan": "1", "rowspan": "2"},
                {"name": "MV<br/>L", "colspan": "1", "rowspan": "2"},
                {"name": "PEE<br/>P<br/>cmH<br/>2O", "colspan": "1", "rowspan": "2"},
                {"name": "PIP<br/>cmH<br/>2O", "colspan": "1", "rowspan": "2"},
                {"name": "氧<br/>浓<br/>度<br/>%", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            [
              {"name": "实<br/>入", "colspan": "1", "rowspan": "1"},
              {"name": "累<br/>计", "colspan": "1", "rowspan": "1"},
              {"name": "实<br/>入", "colspan": "1", "rowspan": "1"},
              {"name": "累<br/>计", "colspan": "1", "rowspan": "1"},
              {"name": "实<br/>入", "colspan": "1", "rowspan": "1"},
              {"name": "累<br/>计", "colspan": "1", "rowspan": "1"},
              {"name": "实<br/>入", "colspan": "1", "rowspan": "1"},
              {"name": "累<br/>计", "colspan": "1", "rowspan": "1"},
              {"name": "量<br/>ml", "colspan": "1", "rowspan": "1"},
              {"name": "种<br/>类", "colspan": "1", "rowspan": "1"},

            ]
        ,
    }
  }
