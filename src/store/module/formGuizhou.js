export default {
    state: {
      measureGuizhou: "",
      targetGuizhou:"",
    },
    getters: {
    },
    mutations: {
      upMeasureGuizhou(state, value) {
        state.measureGuizhou = value.measure
        state.targetGuizhou = value.target
        console.log(state.targetGuizhou,state.measureGuizhou);
      },
      cleanMeasureGuizhouAll(state) {
        state.measureGuizhou = ""
      },
  }
}
