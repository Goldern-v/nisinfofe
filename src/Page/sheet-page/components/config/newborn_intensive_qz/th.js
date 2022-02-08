/*
南方中西医 - 急诊留观护理单
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
    top: [
      {
        name: `日期`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `时间`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: "生命体征",
        colspan: "5",
        rowspan: "1"
      },
      {
        name: `
        液量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "奶量",
        colspan: "2",
        rowspan: "1"
      },
      {
        name: "胃潴留",
        colspan: "2",
        rowspan: "1"
      },
      {
        name: "呕吐",
        colspan: "2",
        rowspan: "1"
      },
      {
        name: "大便",
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        尿量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        病情及治疗
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
    mid: [
      {
        name: "T<br/>(℃)",
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        P<br/>(次/<br/>分)
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        R<br/>(次/<br/>分)
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        BP<br/>(mmHg)
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        SPO<sub>2</sub><br/>(%)
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        口入<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        饲管<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        性状
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        性状
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        量<br/>
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        性状
        `,
        colspan: "1",
        rowspan: "2"
      },
      
    ],
    bottom: []
  }
};
