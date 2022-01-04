
/*
  佛山市一 - 护理记录单(通用护理记录单)
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    2、特殊情况默认 { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, }, 
*/

export default {
    // 科室的名称
    deptType: "",
    // style: {
    //   width: "1300px"
    // },
    th: {
        top: 
            [
                { "name": "日期", "colspan": "1", "rowspan": "3"}, 
                { "name": "时间", "colspan": "1", "rowspan": "3"}, 
                { "name": "生命体征", "colspan": "7", "rowspan": "1"}, 
                { "name": "入量", "colspan": "2", "rowspan": "1"}, 
                { "name": "出量", "colspan": "2", "rowspan": "1"}, 
                { "name": "标题4", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue4"}, 
                { "name": "标题5", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue5"}, 
                { "name": "标题6", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue6"}, 
                { "name": "标题7", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue7"}, 
                { "name": "标题8", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue8"}, 
                { "name": "标题9", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue9"}, 
                { "name": "标题10", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue10"}, 
                { "name": "标题11", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue11"}, 
                { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, }, 
                { "name": "护士签名", "colspan": "1", "rowspan": "3"}, 
                { "name": "质控护士", "colspan": "1", "rowspan": "3"}
            ]
        , 
        mid:  
            [
                {"name": "体温<br/>℃", "colspan": "1", "rowspan": "2"}, 
                {"name": "脉搏<br/>次/<br/>分", "colspan": "1", "rowspan": "2"}, 
                {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"}, 
                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2"}, 
                {"name": "标题1", "colspan": "1", "rowspan": "2", canSet: true, key: "armValue1"}, 
                {"name": "标题2", "colspan": "1", "rowspan": "2", canSet: true, key: "armValue2"}, 
                {"name": "标题3", "colspan": "1", "rowspan": "2", canSet: true, key: "armValue3"}, 
                {"name": "内容", "colspan": "1", "rowspan": "2"}, 
                {"name": "量ml", "colspan": "1", "rowspan": "2"}, 
                {"name": "内容", "colspan": "1", "rowspan": "2"}, 
                {"name": "量ml", "colspan": "1", "rowspan": "2"}
            ]
        , 
        bottom: 
            []
        , 
    }
}  
