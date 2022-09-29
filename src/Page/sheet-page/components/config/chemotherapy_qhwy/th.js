
/*
 青海五院 - 化疗观察记录单
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    2、特殊情况默认 { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, },
*/
export default {
    // 科室的名称
    deptType: '',
    style: {
      width: "1200px"
    },
    th: {
      top: [
        { name: '',
         colspan: "2", 
         rowspan: "1", 
         key:'recordYear'
        },
        {
          name: '化疗药物',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '静脉通路',
          colspan: '3',
          rowspan: '1'
        },
        {
          name: '局部情况',
          colspan: '4',
          rowspan: '1'
        },
        {
          name: '化学反应',
          colspan: '5',
          rowspan: '1'
        },
        {
          name: '宣教',
          colspan: '5',
          rowspan: '1'
        },
        {
          name: `
          病情观察及措施
          `,
          style: {
            minWidth: '240px',
            maxWidth: '240px',
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          签字
          `,
          colspan: '1',
          rowspan: '3',
          style: {
            minWidth: '65px',
            maxWidth: '65px',
          },
        },
      ],
      mid: [
        { 
          name: `日期`, 
          colspan: "1",
          rowspan: "2" 
        },
        { 
          name: `时间`,
          colspan: "1", 
          rowspan: "2" 
        },
        {
          name: '穿刺<br/>部位',
          colspan: '1',
          rowspan: '2'
        },           
        {
          name: '通畅',
          colspan: '1',
          rowspan: '2'
        },           
        {
          name: '回血',
          colspan: '1',
          rowspan: '2'
        },   
        {
          name: '无红肿',
          colspan: '1',
          rowspan: '2'
        },                  
        {
          name: '无外渗',
          colspan: '1',
          rowspan: '2'
        },        
        {
          name: '无静<br/>脉炎',
          colspan: '1',
          rowspan: '2'
        },       
        {
          name: '皮肤<br/>完整',
          colspan: '1',
          rowspan: '2'
        },      
        {
          name: '恶心',
          colspan: '1',
          rowspan: '2'
        }, 
        {
          name: '呕吐',
          colspan: '1',
          rowspan: '2'
        },            
        {
          name: '厌食',
          colspan: '1',
          rowspan: '2'
        },   
        {
          name: '腹泻',
          colspan: '1',
          rowspan: '2'
        },   
        {
          name: '便秘',
          colspan: '1',
          rowspan: '2'
        },         
        {
          name: '口腔<br/>黏膜炎',
          colspan: '1',
          rowspan: '2'
        },        
        {
          name: '病人<br/>安全',
          colspan: '1',
          rowspan: '2'
        },                 
        {
          name: '相关<br/>知识',
          colspan: '1',
          rowspan: '2'
        },  
        {
          name: '管路<br/>护理',
          colspan: '1',
          rowspan: '2'
        },       
        {
          name: '饮食<br/>护理',
          colspan: '1',
          rowspan: '2'
        },                                                             
      ],
      bottom: [
      ]
    }
  }
  