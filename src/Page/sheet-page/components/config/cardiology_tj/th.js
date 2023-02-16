
/*
  广东同江 - 介入、导管治疗术后首次护理记录单
*/

/**
 * @description: 开发注意事项:
 1、自定义表头 canSet: true, key: "armValue4"

 */

export default {
  // 科室的名称
  deptType: '',
  th: {
    top: [
      // {
      //   name: '',
      //   style: {},
      //   colspan: "2",
      //   rowspan: "1",
      //   key:'recordYear'
      // },
      {
        name: '日期',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `体温℃`,
        style: {
          minWidth: '46px',
          maxWidth: '46px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `脉搏次/分`,
        style: {
          minWidth: '46px',
          maxWidth: '46px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `呼吸次/分`,
        style: {
          minWidth: '46px',
          maxWidth: '46px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        血压mmHg
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        SPO2﹪
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `敷料描述`,
        style: {
          minWidth: '76px',
          maxWidth: '76px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        沙袋压迫描述
        `,
        style: {
          minWidth: '82px',
          maxWidth: '82px'
        },
        // 标题
        checkbox: '沙袋压迫描述',
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        留置管描述
        `,
        style: {
          minWidth: '72px',
          maxWidth: '72px'
        },
        // 标题
        checkbox: '留置管描述',
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        经皮引流<br />
        `,
        style: {
          minWidth: '90px',
          maxWidth: '90px'
        },
        // 标题
        checkbox: '经皮引流',
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `用药名称及剂量`,
        style: {
          minWidth: '76px',
          maxWidth: '76px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `方法`,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '200px',
          maxWidth: '200px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        style: {
          minWidth: '66px',
          maxWidth: '66px',
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: `
        引流液性状
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量ml
        `,
        colspan: '1',
        rowspan: '2'
      }
    ],
    bottom: []
  }
}
