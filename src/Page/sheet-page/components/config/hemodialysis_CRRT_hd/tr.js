import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date
  }, {
    key: "recordHour", //时间
    value: "",
    event: event_time
  }, {
    key: "bloodPressure", //血压
    value: "",
    event: keyf1,
    name: "血压",
    textarea: {
      width: 50
    }
  }, {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    textarea: {
      width: 50
    }
  }, {
    key: "fieldOne", //超滤率
    value: "",
    event: keyf1,
    name: "超滤率",
    textarea: {
      width: 50
    }
  }, {
    key: "fieldTwo", //血流速
    value: "",
    event: keyf1,
    name: "血流速",
    textarea: {
      width: 50
    }
  }, {
    key: "fieldThree", //动脉压
    value: "",
    event: keyf1,
    name: "动脉压",
    textarea: {
      width: 50
    }
  }, {
    key: "fieldFour", //静脉压
    value: "",
    event: keyf1,
    name: "静脉压",
    textarea: {
      width: 50
    }
  }, {
    key: "fieldFive", //跨膜压
    value: "",
    event: keyf1,
    name: "跨膜压",
    textarea: {
      width: 50
    }
  }, {
    key: "fieldSix", //超滤累计
    value: "",
    event: keyf1,
    name: "超滤累计",
    textarea: {
      width: 50
    }
  }, {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "180px",
      background: "transparent"
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
    // oninput: next
  },
  // {
  //   key: "sign", //护士签名
  //   style: {
  //     minWidth: '72px',
  //     maxWidth: '72px',
  //   },
  //   value: ""
  // },
  // {
  //   key: "audit",
  //   value: ""
  // },
  {
    hidden: true,
    key: "id",
    value: ""
  },
  {
    hidden: true,
    key: "signerName",
    value: ""
  },
  {
    hidden: true,
    key: "status",
    value: ""
  },
  {
    hidden: true,
    key: "recordSource",
    value: ""
  },
  {
    hidden: true,
    key: "recordYear",
    value: ""
  },
  {
    hidden: true,
    key: "dataHash",
    value: ""
  },
  {
    hidden: true,
    key: "recordDate",
    value: ""
  },
  {
    hidden: true,
    key: "monthHour",
    value: ""
  },
  {
    hidden: true,
    key: "signerNo",
    value: ""
  },
  {
    hidden: true,
    key: "auditorNo",
    value: ""
  },
  {
    hidden: true,
    key: "auditorName",
    value: ""
  },
  {
    hidden: true,
    key: "empNo",
    value: ""
  },
  {
    hidden: true,
    key: "multiSign",
    value: false
  }
];

export function getListData4() {

}

// getListData4();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}
