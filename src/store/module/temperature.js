export default {
  state: {
    isPain: false,
    rightPart: true,
    showBabyChat: false,
    dialogVisible: false,
    patientInfo: {},
    isMobile:false,//同江医院是否是移动设备（没有内网）  不是的话 体温单切换内网地址 是切换外网
  },
  mutations: {
    //改变体温单的显示版本，false默认不带疼痛版本，true疼痛版本
    changeModel(state, value) {
      state.isPain = value

    },
    //是否显示录入界面，默认显示
    showRightPart(state, value) {
      state.rightPart = value

    },
    //是否显示婴儿体温单的曲线，默认不显示
    showBabyChat(state, value) {
      state.showBabyChat = value

    },
    //是否显示可以移动的窗口
    newDialogVisible(state, value) {
      state.dialogVisible = value

    },
    //存储患者信息
    updatePatientInfo(state, val) {
      state.patientInfo = val
    },
    //存是否是移动设备标识信息
    updateIsMobile(state, val) {
      state.isMobile = val
    },
  }
}
