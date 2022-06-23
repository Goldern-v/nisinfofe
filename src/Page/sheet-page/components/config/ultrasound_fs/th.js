/*
  江门妇幼-儿科护理记录单
*/
// 添加的
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  style: {
    width: '1240px'
  },
  deptType: '',
  th: {
    top: [
      // {
      //   name: currYear(),
      //   style: {},
      //   colspan: "2",
      //   rowspan: "1",
      //   key:'recordYear'
      // },
      {
        name: '日期',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `体征`,
        style: {},
        colspan: '4',
        rowspan: '1',
      },
      {
        name: `静脉输液情况`,
        style: {},
        colspan: '4',
        rowspan: '1',
      },
      {
        name: `体位`,
        style: {},
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `皮肤情况`,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `肢体情况`,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `管道`,
        style: {},
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `特殊情况记录`,
        style: {
          minWidth: '200px',
          maxWidth: '200px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `签名`,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
    ],
    mid: [
      {
        name: `脉搏<br>次/分`,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `血氧饱和度<br>%`,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `呼吸<br>次/分`,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `血压<br>mmHg`,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `药名`,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `用法`,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `滴速<br>滴/分`,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `是否通畅`,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `肢体循环`,
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `疼痛`,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `类型`,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `引流情况`,
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: []
  }
}
