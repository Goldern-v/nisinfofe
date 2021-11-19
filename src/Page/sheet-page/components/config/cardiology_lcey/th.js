/*
聊城二院 - 心内科介入患者观察记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  th: {
    top: [
      { name: '节点', colspan: "1", rowspan: "3" },
      { name: '', colspan: "2", rowspan: "1", key:'recordYear'},
      { name: '体温<br/>℃', colspan: '1', rowspan: '3' },
      { name: '措施', colspan: '1', rowspan: '3' },
      { name: '脉搏<br/>(次/分)', colspan: '1', rowspan: '3' },
      { name: '呼吸<br/>(次/分)', colspan: '1', rowspan: '3' },
      { name: '血压', colspan: '2', rowspan: '1' },
      { name: '疼痛', colspan: '2', rowspan: '1' },
      { name: '尿量', colspan: '1', rowspan: '3' },
      { name: '动脉<br/>搏动', colspan: '1', rowspan: '3' },
      { name: '皮温', colspan: '1', rowspan: '3' },
      { name: '末梢<br/>循环', colspan: '1', rowspan: '3' },
      { name: '出血<br/>血肿', colspan: '1', rowspan: '3' },
      { name: '肿胀', colspan: '1', rowspan: '3' },
      { name: '辅料', colspan: '1', rowspan: '3' },
      { name: '并发症', colspan: '1', rowspan: '3' },
      { name: `护士<br/>签名`, colspan: "1", rowspan: "3", style:{minWidth: "50px", maxWidth: "50px"}},
    ],
    mid: [
      { name: `日期`, colspan: "1", rowspan: "2", style:{minWidth: "50px", maxWidth: "50px"}},
      { name: `时间`, colspan: "1", rowspan: "2", style:{minWidth: "50px", maxWidth: "50px"}},
      { name: '数值', colspan: '1', rowspan: '2' },
      { name: '处理', colspan: '1', rowspan: '2' },
      { name: '评分', colspan: '1', rowspan: '2' },
      { name: '措施', colspan: '1', rowspan: '2' }
    ],
    bottom: []
  }
};
