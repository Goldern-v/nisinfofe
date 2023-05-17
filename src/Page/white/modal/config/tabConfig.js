import { multiDictInfo } from "@/api/common";
class Text {
  constructor(dataLabel, dataKey, width) {
    this.type = "text";
    this.width = width;
    this.dataKey = dataKey;
    this.dataLabel = dataLabel;
  }
}

class CheckBox extends Text {
  constructor(...p) {
    super(...p);
    this.ifHoldAll = p[3] || false
    this.type = "checkbox";
  }
}

class Input extends Text {
  constructor(...p) {
    super(...p);
    this.type = "input";
  }
}

class Select extends Text {
  constructor(...p) {
    super(...p);
    this.type = "select";
    this.dataList = p[3];
    this.multiple = p[4] || false;
  }
}

/** 医嘱类型 */
let white_board_order_type = [];
/** 白板排序 */
let white_board_sort_content = [];
/** 白板额外内容0 */
let white_board_add_expand = [];
/** 白板额外内容1 */
let white_board_orders_add_expand = [];

let ifChoseFlag

(async function getSelectData() {
  let selectList = [
    "white_board_order_type",
    "white_board_sort_content",
    "white_board_add_expand",
    "white_board_orders_add_expand"
  ];
  let nullSelect = {
    code: null,
    name: "无"
  };
  let res = await multiDictInfo(selectList);
  white_board_order_type.push(
    nullSelect,
    ...res.data.data.white_board_order_type
  );
  white_board_sort_content.push(
    nullSelect,
    ...res.data.data.white_board_sort_content
  );
  white_board_add_expand.push(
    nullSelect,
    ...res.data.data.white_board_add_expand
  );
  white_board_orders_add_expand.push(
    nullSelect,
    ...res.data.data.white_board_orders_add_expand
  );
})();

(async function initAll(){
  if(process.env.HOSPITAL_ID=='zhzxy') window.ifChoseFlag=true
})()

function addWidth(){
  if(process.env.HOSPITAL_ID=='zhzxy') return 20
  else return 0;
}
const hasMultiple = () => {
  return ['nfyksdyy'].includes(process.env.HOSPITAL_ID);
}
export default [
  {
    tabLabel: "患者流转",
    tabKey: "0",
    itemConfig: [
      new CheckBox("是否显示", "show", 70),
      new Text("项目名称", "configure", 150),
      new Input("大屏顺序", "sortValue", 70),
      new CheckBox("无数据隐藏", "showOrHide", 80 + addWidth(), window.ifChoseFlag && 'showOrHideAll'),
      new CheckBox("患者换行", "verticalShow", 70 + addWidth(),window.ifChoseFlag && "verticalShowAll"),
      new CheckBox("显示床号", "bedLabelShow", 70 + addWidth(),window.ifChoseFlag && "bedLabelShowAll"),
      new CheckBox("显示姓名", "nameShow", 70 + addWidth(), window.ifChoseFlag && "nameShowAll"),
      new Select("额外显示", "addExpand", 130, white_board_add_expand, hasMultiple()),
      new Select("内容排序", "sortContent", 100, white_board_add_expand)
    ]
  },
  {
    tabLabel: "医嘱项目",
    tabKey: "1",
    itemConfig: [
      new CheckBox("是否显示", "show", 70),
      new Text("项目名称", "configure", 150),
      new Input("大屏顺序", "sortValue", 70),
      new CheckBox("无数据隐藏", "showOrHide", 80 + addWidth(), window.ifChoseFlag && 'showOrHideAll'),
      new CheckBox("患者换行", "verticalShow", 70 + addWidth(), window.ifChoseFlag && "verticalShowAll"),
      new CheckBox("显示床号", "bedLabelShow", 70 + addWidth(), window.ifChoseFlag && "bedLabelShowAll"),
      new CheckBox("显示姓名", "nameShow", 70 + addWidth(), window.ifChoseFlag && "nameShowAll"),
      new Select("额外显示", "addExpand", 130, white_board_orders_add_expand, hasMultiple()),
      new Select("医嘱类型", "orderTypeShow", 80, white_board_order_type),
      new Select("内容排序", "sortContent", 100, white_board_sort_content)
    ]
  },
  {
    tabLabel: "自定义项目",
    tabKey: "2",
    itemConfig: [
      new CheckBox("是否显示", "show", 70),
      new CheckBox("无数据隐藏", "showOrHide", 100 , window.ifChoseFlag && 'showOrHideAll'),
      new Input("项目名称", "configure", 150+ addWidth()),
      new Input("大屏顺序", "sortValue", 70),
    ]
  }
];
export const choseAllParams = ['nameShowAll','bedLabelShowAll','verticalShowAll','showOrHideAll']
