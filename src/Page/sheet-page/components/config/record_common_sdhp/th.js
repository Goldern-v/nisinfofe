/*
  佛山同江 - 护理记录单（全院通用）
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    2、表格头部年份显示 {"name":'',"style":{},"colspan":"2","rowspan":"1","key":'recordYear'},
    3、特殊情况默认 { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, },
*/

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1340px"
  },
  th: {
    top: [
      { "name": "年", "colspan": "2", "rowspan": "1", "key": "recordYear" },
      {
        "name": "T<br/>℃",
        "colspan": "1",
        "rowspan": "3"
      },
      {
        "name": "P/HR<br/>次/分",
        "colspan": "1",
        "rowspan": "3"
      },
      {
        "name": "R<br/>次/分",
        "colspan": "1",
        "rowspan": "3"
      },
      {
        "name": "BP<br/>mmHg",
        "colspan": "1",
        "rowspan": "3"
      },
      {
        "name": "SPO₂<br/>%",
        "colspan": "1",
        "rowspan": "3"
      },
      {
        "name": "意识",
        "colspan": "1",
        "rowspan": "3"
      },
      // {
      //   "name": "疼痛<br>评分",
      //   "colspan": "1",
      //   "rowspan": "3"
      // },
      {
        "name": "",
        "canSet": true,
        "key": "painScore",
        "colspan": "1",
        "rowspan": "1"
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue1",
        "colspan": "2",
        "rowspan": "1"
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue2",
        "colspan": "2",
        "rowspan": "1"
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue3",
        "colspan": "2",
        "rowspan": "1"
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue4",
        "colspan": "2",
        "rowspan": "1"
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue5",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "45px",
          "maxWidth": "45px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue6",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "45px",
          "maxWidth": "45px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue7",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "45px",
          "maxWidth": "45px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue8",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "45px",
          "maxWidth": "45px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue9",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "45px",
          "maxWidth": "45px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue10",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "45px",
          "maxWidth": "45px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue11",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "45px",
          "maxWidth": "45px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue12",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "45px",
          "maxWidth": "45px"
        }
      },
      {
        "name": "特殊情况记录",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "190px",
          "maxWidth": "190px"
        }
      },
      {
        "name": "签 名",
        "colspan": "1",
        "rowspan": "3",
        "style": {
          "minWidth": "50px",
          "maxWidth": "50px"
        }
      },
    ],
    mid: [
      {
        "name": "日期",
        "colspan": "1",
        "rowspan": "2",
      },
      {
        "name": "时间",
        "colspan": "1",
        "rowspan": "2",
      },
      {
        "name": "疼痛<br>评分",
        "colspan": "1",
        "rowspan": "2"
      },

      {
        "name": "伤口敷料",
        "colspan": "2",
        "rowspan": "1"
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue13",
        "colspan": "1",
        "rowspan": "1",
        "style": {
          "minWidth": "41px",
          "maxWidth": "41px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue14",
        "colspan": "1",
        "rowspan": "1",
        "style": {
          "minWidth": "41px",
          "maxWidth": "41px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue15",
        "colspan": "1",
        "rowspan": "2",
        "style": {
          "minWidth": "41px",
          "maxWidth": "41px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue16",
        "colspan": "1",
        "rowspan": "2",
        "style": {
          "minWidth": "41px",
          "maxWidth": "41px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue17",
        "colspan": "1",
        "rowspan": "2",
        "style": {
          "minWidth": "41px",
          "maxWidth": "41px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue18",
        "colspan": "1",
        "rowspan": "2",
        "style": {
          "minWidth": "41px",
          "maxWidth": "41px"
        }
      },
    ],
    bottom: [{
        "name": "干洁",
        "colspan": "1",
        "rowspan": "1"
      },
      {
        "name": "渗血",
        "colspan": "1",
        "rowspan": "1"
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue19",
        "colspan": "1",
        "rowspan": "1",
        "style": {
          "minWidth": "41px",
          "maxWidth": "41px"
        }
      },
      {
        "name": "",
        "canSet": true,
        "key": "armValue20",
        "colspan": "1",
        "rowspan": "1",
        "style": {
          "minWidth": "41px",
          "maxWidth": "41px"
        }
      },
    ],
  }
}
