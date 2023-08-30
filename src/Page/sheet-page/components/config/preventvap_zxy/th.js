/*
南方中西医 - 预防VAP评估单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  // style: {
  //     width: "1200px"
  //   },
  th: {
    top: [{
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: '使用呼吸机天数',
        colspan: "1",
        rowspan: "3"
      },
      {
        name: '体位#',
        colspan: "1",
        rowspan: "1"
      },
      {
        name: '呼吸道管理#',
        colspan: "1",
        rowspan: "1"
      },
      {
        name: '口腔护理#',
        colspan: "1",
        rowspan: "1"
      },
      {
        name: '声门下吸引#',
        colspan: "1",
        rowspan: "1"
      },
      {
        name: '更换呼吸机管路#',
        colspan: "1",
        rowspan: "1"
      },
      {
        name: '倾倒冷水凝#',
        colspan: "1",
        rowspan: "1"
      },
      {
        name: '护士签名',
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
        colspan: "1",
        rowspan: "3",
      },
      {
        name: '撤机评估(医生)',
        colspan: "1",
        rowspan: "1"
      },
      {
        name: '签名',
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
        colspan: "1",
        rowspan: "3",
      },
    ],
    mid: [{
        name: '日期',
        colspan: "1",
        rowspan: "2",
      },
      {
        name: '时间',
        colspan: "1",
        rowspan: "2",
      },
      {
        name: '床头抬高30-45°',
        colspan: "1",
        rowspan: "2",
      },
      {
        name: '管路固定好并通畅*',
        colspan: "1",
        rowspan: "2",
      },
      {
        name: '口腔护理每日次数*',
        colspan: "1",
        rowspan: "2",
      },
      {
        name: '声门下分泌物引流*',
        colspan: "1",
        rowspan: "2",
      },
      {
        name: '更换呼吸机管路*',
        colspan: "1",
        rowspan: "2",
      },
      {
        name: '倾倒冷水凝*',
        colspan: "1",
        rowspan: "2",
      },
      {
        name: '撤机评估*',
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
