
 let data={
  sheetType: "",
  isSave: true,
  sheetStartPage: 1,
  sheetMaxPage: 1,
  startPage: 0,
  endPage: 0,
  downControl: false,
  selectRow: [],
  selectBlock: {},
  masterInfo: {},
  copyRow: "",
  clickRow: null, //威县点击后行持续高亮
  model: "", //填写模型  print  edit
  relObj: {
    deliveryMode:[],
  },
  /** 护记额外信息 */
  bedList: [], //病人列表
  auditorMap: {}, //审核人签名
  findBlockContext:{},//首页护记定位信息
  extraData:{},//护记做了根据页码来分割数据，增量保存的时候把上下页码的最后一条记录查询出来传给后端做处理
};
export default data
