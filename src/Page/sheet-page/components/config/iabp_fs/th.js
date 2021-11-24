/*
聊城二院 - IABP护理记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: '900px'
  },
  th: {
    top: [
      { name: '', colspan: "2", rowspan: "1", key:'recordYear'},
      { name: 'ASSISTRATIO', colspan: '1', rowspan: '3' },
      { name: '心率<br/>次/分', colspan: '1', rowspan: '3' },
      { name: 'PSP<br/>mmHg', colspan: '1', rowspan: '3' },
      { name: 'PDP<br/>mmHg', colspan: '1', rowspan: '3' },
      { name: 'EDP<br/>mmHg', colspan: '1', rowspan: '3' },
      { name: 'MAP<br/>mmHg', colspan: '1', rowspan: '3' },
      { name: '病情及处理记录摘要', colspan: '1', rowspan: '3', style: { minWidth: "353px", maxWidth: "353px"} },
      { name: '记录者', colspan: '1', rowspan: '3', style:{minWidth: "60px", maxWidth: "60px"} }
    ],
    mid: [
      { name: `日期`, colspan: "1", rowspan: "2" },
      { name: `时间`, colspan: "1", rowspan: "2" },
    ],
    bottom: []
  }
};
