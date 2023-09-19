export default {
    state: {
      measureGuizhou: "",
      targetGuizhou:"",
      factorStrGuizhou:"",
      measureList: []
    },
    getters: {
    },
    mutations: {
      upMeasureGuizhou(state, value) {
        state.measureGuizhou = value.measure
        state.targetGuizhou = value.target
        state.factorStrGuizhou = value.factor
        state.measureList = value.measureList
      },
      cleanMeasureGuizhouAll(state) {
        state.measureGuizhou = ""
        state.targetGuizhou=""
        state.factorStrGuizhou=""
        state.measureList = []
      },
  }
}
