
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
      width: "1540px"
    },
    th: {
        top:
            [
                {"name": '', style: {}, "colspan": "2", "rowspan": "1", key:'recordYear'},
                {"name": "病情评估", "colspan": "19", "rowspan": "1"},
                {"name": "呼吸机工作条件", "colspan": "5", "rowspan": "1"},
                {"name": "入量", "colspan": "3", "rowspan": "1"},
                {"name": "出量", "colspan": "3", "rowspan": "1"},
                {"name": "约束", "colspan": "1", "rowspan": "3"},
                {"name": "卧位", "colspan": "1", "rowspan": "3"},
                {"name": "护理措施", "colspan": "1", "rowspan": "3"},
                {"name": "多重耐药", "colspan": "1", "rowspan": "3"},
                { "name": "其他护理观察记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, },
                { "name": "签 名", "colspan": "1", "rowspan": "3", style: { minWidth: "50px",  maxWidth: "50px"},},
            ]
        ,
        mid:
            [
                { "name": "日期", "colspan": "1", "rowspan": "2"},
                { "name": "时间", "colspan": "1", "rowspan": "2"},
                {"name": "体温℃", "colspan": "1", "rowspan": "2"},
                {"name": "心率/脉搏<br>次/分", "colspan": "1", "rowspan": "2"},
                {"name": "示波心律", "colspan": "1", "rowspan": "2"},
                {"name": "呼吸<br>次/分", "colspan": "1", "rowspan": "2"},
                {"name": "血压<br>mmHg", "colspan": "1", "rowspan": "2"},
                {"name": "SPO2%", "colspan": "1", "rowspan": "2"},
                {"name": "CVP<br>mmHg", "colspan": "1", "rowspan": "2"},
                {"name": "FIO2%", "colspan": "1", "rowspan": "2"},
                {"name": "意识", "colspan": "1", "rowspan": "2"},
                {"name": "疼痛评分", "colspan": "1", "rowspan": "2"},
                {"name": "皮肤", "colspan": "1", "rowspan": "2"},
                {"name": "镇静评分", "colspan": "1", "rowspan": "2"},
                {"name": "输液通路", "colspan": "2", "rowspan": "1"},
                {"name": "GCS", "colspan": "1", "rowspan": "2"},
                {"name": "瞳孔mm/<br>对光反应", "colspan": "4", "rowspan": "1"},
                {"name": "模式", "colspan": "1", "rowspan": "2"},
                {"name": "频率次/分", "colspan": "1", "rowspan": "2"},
                {"name": "SVT/VT(ml)", "colspan": "1", "rowspan": "2"},
                {"name": "PS/PEEP<br>(cmH2O)", "colspan": "1", "rowspan": "2"},
                {"name": "气道压力<br>(cmH2O)", "colspan": "1", "rowspan": "2"},
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "途径", "colspan": "1", "rowspan": "2"},
                {"name": "入量ml", "colspan": "1", "rowspan": "2"},
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "出量ml", "colspan": "1", "rowspan": "2"},
                {"name": "颜色性状", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
        [
                {"name": "类别", "colspan": "1", "rowspan": "1"},
                {"name": "畅否", "colspan": "1", "rowspan": "1"},
                {"name": "左", "colspan": "2", "rowspan": "1"},
                {"name": "右", "colspan": "2", "rowspan": "1"},
            ]
        ,
    }
}
