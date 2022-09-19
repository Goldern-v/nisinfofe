
/*
 青海五院 - 耳鼻喉科护理记录单
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
      width: "1350px"
    },
    th: {
      top: [
        { name: '',
         colspan: "2", 
         rowspan: "1", 
         key:'recordYear'
        },
        {
          name: '生命体征',
          colspan: '4',
          rowspan: '1'
        },
        {
          name: 'SPO2<br/>%',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '心率',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '意识',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '氧疗<br/>L/分',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '张口',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '面颈部',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '声音<br/>嘶哑',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '饮水<br/>呛咳',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '体位',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '翻身',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '皮肤<br/>护理',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '伤口<br/>情况',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '伤口<br/>敷料',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '口腔<br/>护理',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '分泌物',
          colspan: '2',
          rowspan: '1'
        },
        {
          name: '管路<br/>护理',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '安全<br/>护理',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '入量',
          colspan: '3',
          rowspan: '1'
        },
        {
          name: '出量',
          colspan: '4',
          rowspan: '1'
        },
        {
          name: `
          病情观察及措施
          `,
          style: {
            minWidth: '160px',
            maxWidth: '160px',
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
          name: '体温<br/>℃',
          colspan: '1',
          rowspan: '2'
        },           
        {
          name: '脉搏<br/>次/分',
          colspan: '1',
          rowspan: '2'
        },     
        {
          name: '呼吸<br/>次/分',
          colspan: '1',
          rowspan: '2'
        },     
        {
          name: '血压<br/>mmHg',
          colspan: '1',
          rowspan: '2'
        },    
        {
          name: '颜色',
          colspan: '1',
          rowspan: '2'
        },     
        {
          name: '形状',
          colspan: '1',
          rowspan: '2'
        },    
        {
          name: '名称',
          colspan: '1',
          rowspan: '2'
        },     
        {
          name: '类别',
          colspan: '1',
          rowspan: '2'
        }, 
        {
          name: '量<br/>(ml)',
          colspan: '1',
          rowspan: '2'
        },  
        {
          name: '名称',
          colspan: '1',
          rowspan: '2'
        },     
        {
          name: '量<br/>(ml)',
          colspan: '1',
          rowspan: '2'
        },   
        {
          name: '颜色',
          colspan: '1',
          rowspan: '2'
        },  
        {
          name: '性状',
          colspan: '1',
          rowspan: '2'
        },        
      ],
      bottom: [
      ]
    }
  }
  