
/*
  925医院 - 一般患者护理记录单
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
      width: "1220px"
    },
    th: {
      top: [
        {
          name: `月/日`,
          colspan: "1",
          rowspan: "3"
        },
        {
          name: `时间`,
          colspan: "1",
          rowspan: "3"
        },

        {
          name: '体温<br/>℃',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '脉搏<br/>次/分',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '呼吸<br/>次/分',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '血压<br/>mmHg',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '心率<br/>次/分',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '心律',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '血氧<br/>饱和度<br/>%',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '意识',
          colspan: '1',
          rowspan: '3'
        },
        {
          name: '瞳孔',
          colspan: '4',
          rowspan: '1'
        },
        {
          name: '氧疗',
          colspan: '2',
          rowspan: '1'
        },
        {
          name: '入量',
          colspan: '2',
          rowspan: '1'
        },
        {
          name: '出量',
          colspan: '2',
          rowspan: '1'
        },
        {
          name: '其他护理措施',
          colspan: '4',
          rowspan: '1'
        },
        {
          name: `
          护理措施和病情记录
          `,
          style: {
            minWidth: '230px',
            maxWidth: '230px',
          },
          colspan: '1',
          rowspan: '3'
        },
        {
          name: `
          护士签字
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
          name: '大小',
          colspan: '2',
          rowspan: '1'
        },
        {
          name: '反射',
          colspan: '2',
          rowspan: '1'
        },
        {
          name: '方式',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: 'L/min',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: '名称或用法',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: '量',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: '名称',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: '量',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: '体位',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: '病情<br/>巡视',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: '护理<br/>操作',
          colspan: '1',
          rowspan: '2'
        },
        {
          name: '',
          colspan: '1',
          rowspan: '2',
          canSet:true,
          key:"custom"
        },
      ],
      bottom: [
        {
          name: '左',
          colspan: '1',
          rowspan: '1'
        },
        {
          name: '右',
          colspan: '1',
          rowspan: '1'
        },
        {
          name: '左',
          colspan: '1',
          rowspan: '1'
        },
        {
          name: '右',
          colspan: '1',
          rowspan: '1'
        }
      ]
    }
  }
