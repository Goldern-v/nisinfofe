export default {
  state: {
    isPain:false,
    rightPart:true,
  },
  mutations: {
    //改变体温单的显示版本，false默认不带疼痛版本，true疼痛版本
    changeModel(state, value) {
      state.isPain = value

    },
    //是否显示录入界面，默认显示
    showRightPart(state, value) {
      state.rightPart = value

    }
  }
}
