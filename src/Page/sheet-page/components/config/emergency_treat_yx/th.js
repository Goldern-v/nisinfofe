
/*
    武汉亚心 - 急诊留观记录单

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
      width: "1260px"
    },
    th: {
        top:
         [
            { "name": '', "colspan": "2", "rowspan": "1", "key": 'recordYear' },
            { "name": "T/℃", "colspan": "1", "rowspan": "3"},
            { "name": "HR/bpm", "colspan": "1", "rowspan": "3"},
            { "name": "R/bpm", "colspan": "1", "rowspan": "3"},
            { "name": "BP/mmHg", "colspan": "1", "rowspan": "3"},
            { "name": "SPO²<br/>%", "colspan": "1", "rowspan": "3"},
            { "name": "尿量/ml", "colspan": "1", "rowspan": "3"},
            { "name": "输液通畅", "colspan": "1", "rowspan": "3"},
            { "name": "心电监护", "colspan": "1", "rowspan": "3"},
            { "name": "吸氧方式<br/>(L/min)", "colspan": "1", "rowspan": "3"},
            { "name": "跌倒评估", "colspan": "1", "rowspan": "3"},
            { "name": "护理观察及记录", "colspan": "1", "rowspan": "3", style: { minWidth: "280px",  maxWidth: "240px"}, },
            { "name": "签名 ", "colspan": "1", "rowspan": "3",style: { minWidth: "60px",  maxWidth: "60px"},},
            { "name": "审核签名", "colspan": "1", "rowspan": "3", "style": { "minWidth": "50px", "maxWidth": "60px" },  },

         ]
        ,
        mid:
            [
                { "name": "日期", "colspan": "1", "rowspan": "1" },
                { "name": "时间", "colspan": "1", "rowspan": "1" },
            ]
        ,
        bottom:
            [
            ]
        ,
    }
  }
