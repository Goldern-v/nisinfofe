/*
南方中西医 - 重症监护病房护理记录单(表三)
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
    top: [{
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: `
        基础护理
        `,
        colspan: "16",
        rowspan: "1"
      },
      {
        name: `
        管道护理
        `,
        colspan: "7",
        rowspan: "1"
      },
      {
        name: `
        其他
        `,
        colspan: "9",
        rowspan: "1"
      },
      {
        name: `
        更换管道/引流
        `,
        colspan: "5",
        rowspan: "1"
      },
      {
        name: `
        体位
        `,
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        皮肤情况
        `,
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        健康<br/>教育
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        管道<br/>情况
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        特殊记录<br/>（备注）
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "1",
        rowspan: "3",
      },
    ],
    mid: [{
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        吸<br/>痰
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        雾<br/>化<br/>吸
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        口<br/>腔<br/>护
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        会<br/>阴<br/>抹
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        床<br/>上<br/>擦
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        床<br/>上<br/>洗<br/>头
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        胃<br/>肠<br/>减<br/>压
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        灌<br/>肠
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        导<br/>尿
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        膀<br/>胱<br/>冲<br/>洗
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        协<br/>助<br/>进<br/>食
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        鼻<br/>饲
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        热<br/>疗
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        冷疗
        `,
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        气<br/>管<br/>切<br/>开<br/>套<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        气<br/>管<br/>插<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        呼<br/>吸<br/>机<br/>管<br/>道
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        动<br/>脉<br/>导<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        静<br/>脉<br/>导<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        鼻<br/>胃<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        鼻<br/>肠<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        伤<br/>口<br/>换<br/>药
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        痰<br/>液<br/>性<br/>质
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        痰<br/>液<br/>量
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        胃<br/>液<br/>通<br/>畅
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        胃<br/>液<br/>性<br/>质
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        尿<br/>液<br/>通<br/>畅
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        尿<br/>液<br/>性<br/>质
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        引<br/>流<br/>液<br/>通<br/>畅
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        引<br/>流<br/>液<br/>性<br/>质
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        动<br/>脉<br/>监<br/>测<br/>套<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        静<br/>脉<br/>监<br/>测<br/>套<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        喂<br/>养<br/>泵<br/>管
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        引<br/>流<br/>袋
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        水<br/>封<br/>瓶
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        中
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        完<br/>整
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        异<br/>常
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        气<br/>垫<br/>床
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [
      {
        name: `
        冰<br/>袋
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        冰<br/>帽
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        降<br/>温<br/>机
        `,
        colspan: "1",
        rowspan: "1",
      },
    ]
  }
};
