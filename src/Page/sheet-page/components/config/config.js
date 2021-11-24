
export const createTr = (multiDictInfo,keyf1,limitChange,event_date,event_time,click_date,click_time)=>{
let obj = {}
  obj.节点 = { key: 'nodeTime',event: keyf1,value: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.日期 = { key: "recordDate", value: "", hidden:true }
  obj.时间 = { key: "recordMonth", value: "", event: event_date, click: click_date }
  obj.年月 = { key: "recordHour", value: "", event: event_time}
  obj.体温 = { key: 'temperature',event: keyf1,value: '',name: '体温',next: '℃',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.措施 = { key: 'measure',event: keyf1,value: '',name: '措施',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.脉搏 = { key: 'pulse',event: keyf1,value: '',name: '脉搏',next: '次/分',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.呼吸 = { key: 'breath',event: keyf1,value: '',name: '呼吸',next: '次/分',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.血压 = { key: 'bloodPressure',event: keyf1,value: '',name: '血压',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.血压处理 = { key: 'pressure',event: keyf1,value: '',name: '血压处理',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.疼痛评分 = { key: 'painScore',event: keyf1,value: '',name: '疼痛评分',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.疼痛措施 = { key: 'painMeasures',event: keyf1,value: '',name: '疼痛措施',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.尿量 = { key: 'urine',event: keyf1,value: '',name: '尿量',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.动脉搏动 = { key: 'arterialPulsation',event: keyf1,value: '',name: '动脉搏动',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.皮温 = { key: 'piWin',event: keyf1,value: '',name: '皮温',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.末梢循环 = { key: 'peripheral',event: keyf1,value: '',name: '末梢循环',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.出血血肿 = { key: 'bleedingSwelling',event: keyf1,value: '',name: '出血血肿',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.肿胀 = { key: 'swelling',event: keyf1,value: '',name: '肿胀',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.敷料 = { key: 'dressing',event: keyf1,value: '',name: '敷料',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.并发症 = { key: 'complication',event: keyf1,value: '',name: '并发症',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)}
  obj.特殊情况 = {
    hidden:true,
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "150px",
      background: "transparent",
    },
    textarea: {
      width: 150
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
  }
  obj.签名1 = { key: "sign", value: "" }
  obj.ID = { hidden:true, key:'id', value:''}
  obj.签名1_名字 = { hidden:true, key:'signerName', value:''}
  obj.状态 = { hidden:true, key:'status', value:''}
  obj.唯一标识 = { hidden:true, key:'recordSource', value:''}
  obj.年份 = { hidden:true, key:'recordYear', value:''}
  obj.日期哈希 = { hidden:true, key:'dataHash', value:''}
  obj.月份小时 = { hidden:true, key:'monthHour', value:''}
  obj.签名1_工号 = { hidden:true, key:'signerNo', value:''}
  obj.签名2_工号 = { hidden:true, key:'signerNo2', value:''}
  obj.审核_工号 = { hidden:true, key:'auditorNo', value:''}
  obj.审核_名字 = { hidden:true, key:'auditorName', value:''}
  obj.工号 = { hidden:true, key:'empNo', value:''}
  obj.多签 = { hidden:true, key:'multiSign', value:''}

  return obj
}