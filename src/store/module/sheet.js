import { unread } from '@/api/inBox'
export default {
  state: {
    patientInfo: {},
    sheetPageIndex: '',
    fullpage: false,
    openSheetLeft: true, //护记侧边栏
    preRouter:'',//(护记正式环境)打印的时候不打开新窗口,返回的上一级路径,
    makePatient:'', // 贵州护理巡视根据患者查询护理巡视
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
    upSheetPageFullpage(state, val) {
      state.fullpage = val
    },
    upPreRouter(state,val){
      state.preRouter=val
    },
    upMakePatient(state,val){
      state.makePatient=val
    },
  }
}
