/*
佛山市一 - 心内科通用护理记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1150px"
  },
  th: {
    top: [
      { name: '', colspan: "2", rowspan: "1", key:'recordYear'},
      { name: '生命体征', colspan: '7', rowspan: '1' },
      { name: '入量', colspan: '2', rowspan: '1' },
      { name: '出量', colspan: '2', rowspan: '1' },
      { name: '胸闷<br/>/胸痛', colspan: '1', rowspan: '3' },
      { name: '头晕<br/>/头麻', colspan: '1', rowspan: '3' },
      { name: '皮肤<br/>黏膜<br/>出血', colspan: '1', rowspan: '3' },
      { name: '右桡<br/>动脉<br/>穿刺<br/>口渗<br/>血', colspan: '1', rowspan: '3' },
      { name: '右桡<br/>动脉<br/>搏动', colspan: '1', rowspan: '3' },
      { name: '右上<br/>肢皮<br/>温', colspan: '1', rowspan: '3' },
      { name: '标题1', colspan: '1', rowspan: '3', canSet: true, key: 'armValue1' },
      { name: '标题2', colspan: '1', rowspan: '3', canSet: true, key: 'armValue2'  },
      { name: '特殊情况记录', colspan: '1', rowspan: '3', style: { minWidth: "163px", maxWidth: "163px"} },
      { name: '护士签名', colspan: '1', rowspan: '3', style:{minWidth: "80px", maxWidth: "80px"} },
      { name: '质控护士签名', colspan: '1', rowspan: '3', style:{minWidth: "50px", maxWidth: "50px"} },
    ],
    mid: [
      { name: `日期`, colspan: "1", rowspan: "2" },
      { name: `时间`, colspan: "1", rowspan: "2" },
      { name: '体温<br/>℃', colspan: '1', rowspan: '2' },
      { name: '心率<br/>次/分', colspan: '1', rowspan: '2' },
      { name: '呼吸<br/>次/分', colspan: '1', rowspan: '2' },
      { name: '血压<br/>mmHg', colspan: '1', rowspan: '2' },
      { name: '标题3', colspan: '1', rowspan: '2', canSet: true, key: 'customValue1'  },
      { name: '标题4', colspan: '1', rowspan: '2', canSet: true, key: 'customValue2'  },
      { name: '标题5', colspan: '1', rowspan: '2', canSet: true, key: 'customValue3'  },
      { name: '内容', colspan: '1', rowspan: '2' },
      { name: '量ml', colspan: '1', rowspan: '2' },
      { name: '内容', colspan: '1', rowspan: '2' },
      { name: '量ml', colspan: '1', rowspan: '2' }
    ],
    bottom: []
  }
};
