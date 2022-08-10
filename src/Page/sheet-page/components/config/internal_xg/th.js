/*
东莞谢岗 - 护理记录单(内科)
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1200px"
  },
  th: {
    top: [
      { name: '', colspan: "2", rowspan: "1", key:'recordYear'},
      { name: '体温<br/>℃', colspan: '1', rowspan: '3' },
      { name: '脉搏/<br/>心率<br/>(次/分)', colspan: '1', rowspan: '3' },
      { name: '呼吸<br/>(次/分)', colspan: '1', rowspan: '3' },
      { name: '血压<br/>(mmHg)', colspan: '1', rowspan: '3' },
      { name: 'SPO2<br/>(%)', colspan: '1', rowspan: '3' },
      { name: '意识', colspan: '1', rowspan: '3' },
      { name: '瞳孔左/右', colspan: '2', rowspan: '1' },
      { name: '入量', colspan: '2', rowspan: '1' },
      { name: '出量', colspan: '2', rowspan: '1' },
      { name: '健康宣教', colspan: '1', rowspan: '3' },
      { name: '标题1', colspan: '1', rowspan: '3', canSet: true, key: 'custom1' },
      { name: '标题2', colspan: '1', rowspan: '3', canSet: true, key: 'custom2'  },
      { name: '标题3', colspan: '1', rowspan: '3', canSet: true, key: 'custom3'  },
      { name: '标题4', colspan: '1', rowspan: '3', canSet: true, key: 'custom4'  },
      { name: '标题5', colspan: '1', rowspan: '3', canSet: true, key: 'custom5'  },
      { name: '特殊情况记录', colspan: '1', rowspan: '3', style: { minWidth: "215px", maxWidth: "215px"} },
      { name: '记录者<br/>签名', colspan: '1', rowspan: '3', style:{minWidth: "50px", maxWidth: "50px"} },
      { name: '审核人<br/>签名', colspan: '1', rowspan: '3', style:{minWidth: "50px", maxWidth: "50px"} },
    ],
    mid: [
      { name: `日期`, colspan: "1", rowspan: "2" },
      { name: `时间`, colspan: "1", rowspan: "2" },
      { name: `大小<br/>(mm)`, colspan: "1", rowspan: "2" },
      { name: `对光<br/>反射`, colspan: "1", rowspan: "2" },
      { name: '名称', colspan: '1', rowspan: '2' },
      { name: '量<br/>(ml/g)', colspan: '1', rowspan: '2' },
      { name: '名称', colspan: '1', rowspan: '2' },
      { name: '量<br/>(ml/g)', colspan: '1', rowspan: '2' }
    ],
    bottom: []
  }
};
