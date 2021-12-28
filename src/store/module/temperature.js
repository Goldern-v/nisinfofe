export default {
  state: {
    isPain: false,
    rightPart: true,
    showBabyChat: false,
    dialogVisible: false
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

    }
  }
}
