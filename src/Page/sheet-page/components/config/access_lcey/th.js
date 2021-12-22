import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  // style: {
  //   width: "1200px"
  // },
  th: {
    top: [
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: "入量(ml)",
        colspan: "5",
        rowspan: "1"
      },
      {
        name: "余液",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "出量(ml)",
        style: {
          width: "30px"
        },
        colspan: "8",
        rowspan: "1"
      },
      {
        name: "平衡",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
        colspan: "1",
        rowspan: "3"
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
        静脉
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        入量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        胃肠
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        入量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        总入量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        尿量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        大便量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        呕吐量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        痰液量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      },
      {
        name: `
        标题1
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
        canSet: true,
        key: "customTitle1",
      },
      {
        name: `
        标题2
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
        canSet: true,
        key: "customTitle2",
      },
      {
        name: `
        标题3
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
        canSet: true,
        key: "customTitle3",
      },
      {
        name: `
        出量
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
      }
    ],
    bottom: []
  }
};
