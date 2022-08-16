export default {
    state: {
      measureGuizhou: "",
      targetGuizhou:"",
      factorStrGuizhou:"",
    },
    getters: {
    },
    mutations: {
      upMeasureGuizhou(state, value) {
        state.measureGuizhou = value.measure
        state.targetGuizhou = value.target
        state.factorStrGuizhou = value.factor
      },
      cleanMeasureGuizhouAll(state) {
        state.measureGuizhou = ""
        state.targetGuizhou=""
        state.factorStrGuizhou=""
      },
  }
}
