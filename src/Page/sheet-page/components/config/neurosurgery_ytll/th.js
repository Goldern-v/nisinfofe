
/*
  烟台玲珑 - 出入量记录单
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"

*/

export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "1350px"
    },
    th: {
        top:
            [
                {"name": '', style: {}, "colspan": "2", "rowspan": "1", key:'recordYear'},
                {"name": "入量", "colspan": "3", "rowspan": "1"},
                {"name": "出量", "colspan": "3", "rowspan": "1"},
                {"name": "病情评估", "colspan": "25", "rowspan": "1"},
                { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "120px",  maxWidth: "120px"}, },
                { "name": "签 名", "colspan": "1", "rowspan": "3", style: { minWidth: "50px",  maxWidth: "50px"},},
            ]
        ,
        mid:
            [
                { "name": "日期", "colspan": "1", "rowspan": "2"},
                { "name": "时间", "colspan": "1", "rowspan": "2"},
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "途径", "colspan": "1", "rowspan": "2"},
                {"name": "实入量ml", "colspan": "1", "rowspan": "2"},
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "出量ml", "colspan": "1", "rowspan": "2"},
                {"name": "颜色性状", "colspan": "1", "rowspan": "2"},
                {"name": "体温℃", "colspan": "1", "rowspan": "2"},
                {"name": "心率/脉搏<br>次/分", "colspan": "1", "rowspan": "2"},
                {"name": "呼吸<br>次/分", "colspan": "1", "rowspan": "2"},
                {"name": "血压<br>mmHg", "colspan": "1", "rowspan": "2"},
                {"name": "血氧饱和度%", "colspan": "1", "rowspan": "2"},
                {"name": "示波心律", "colspan": "1", "rowspan": "2"},
                {"name": "氧疗/流量L/min", "colspan": "3", "rowspan": "1"},
                {"name": "意识", "colspan": "1", "rowspan": "2"},
                {"name": "疼痛评分", "colspan": "1", "rowspan": "2"},
                {"name": "皮肤", "colspan": "1", "rowspan": "2"},
                {"name": "镇静评分", "colspan": "1", "rowspan": "2"},
                {"name": "输液通路", "colspan": "2", "rowspan": "1"},
                {"name": "瞳孔mm/对光反应", "colspan": "4", "rowspan": "1"},
                {"name": "GCS", "colspan": "1", "rowspan": "2"},
                {"name": "多重耐药", "colspan": "1", "rowspan": "2"},
                {"name": "约束", "colspan": "1", "rowspan": "2"},
                {"name": "卧位", "colspan": "1", "rowspan": "2"},
                {"name": "护理措施", "colspan": "1", "rowspan": "2"},
                {"name": "心理状态", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            [
                {"name": "鼻导管", "colspan": "1", "rowspan": "1"},
                {"name": "面罩", "colspan": "1", "rowspan": "1"},
                {"name": "", "colspan": "1", "rowspan": "1"},
                {"name": "类别", "colspan": "1", "rowspan": "1"},
                {"name": "畅否", "colspan": "1", "rowspan": "1"},
                {"name": "左", "colspan": "2", "rowspan": "1"},
                {"name": "右", "colspan": "2", "rowspan": "1"},
            ]
        ,
    }
}
