import { unread } from '@/api/inBox'
export default {
  state: {
    patientInfo: {},
    sheetPageIndex: '',
    fullpage: false,
    openSheetLeft: true, //护记侧边栏
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
    }
  }
}
