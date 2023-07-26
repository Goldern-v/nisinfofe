export default {
  state: {
    patientInfo: {},
    sheetPageIndex: '',
    fullpage: false,
    openSheetLeft: true, //护记侧边栏
    preRouter:'',//(护记正式环境)打印的时候不打开新窗口,返回的上一级路径,
    makePatient:'', // 贵州护理巡视根据患者查询护理巡视
    // 是否从特殊记录弹窗进入评估/执行单同步弹窗
    openModalFromSpecial: false,
    // 评估/执行单同步确认返回的数据
    evalData: '',
    // 选中的患者
    curSheetPatient: {},
    isAddPageModal:false,
    sheetPageArea:{
      //护记页码起始页,
      startPageIndex:null,
      endPageIndex:null
    },
    pageIndexs:1,
    openWritTreeLeft: false, //评估单-护理文书tree-侧边栏
    sheetTagInfo: null, // 护记信息-从评估单模块第一次打开护记时，打开选中的护记，而不是最后一张
  },
  mutations: {
    upPatientInfo(state, val) {
      state.patientInfo = val
    },
    upSheetPageIndex(state, val) {
      state.sheetPageIndex = val
    },
    upSheetPageFullpage(state, val) {
      state.fullpage = val
    },
    upOpenSheetLeft(state) {
      state.openSheetLeft = !state.openSheetLeft
    },
    upWritTreeLeft(state) {
      state.openWritTreeLeft = !state.openWritTreeLeft
    },
    upOpenFormTree(state, value) {
      state.openWritTreeLeft = value
    },
    upSheetPageFullpage(state, val) {
      state.fullpage = val
    },
    upPreRouter(state,val){
      state.preRouter=val
    },
    upMakePatient(state,val){
      state.makePatient=val
    },
    upOpenModalFromSpecial(state,val) {
      state.openModalFromSpecial = val
    },
    upEvalData(state,val) {
      state.evalData = val
    },
    upCurSheetPatient(state,val) {
      state.curSheetPatient = val
    },
    upSheetPageArea(state, val) {
      state.sheetPageArea = val
    },
    upAddPageModal(state, val) {
      state.isAddPageModal = val
    },
    upPageIndexs(state, val) {
      state.pageIndexs = val
    },
    upSheetTagInfo(state, val) {
      state.sheetTagInfo = val
    }
  }
}
