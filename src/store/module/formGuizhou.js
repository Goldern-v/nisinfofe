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
        console.log(state.targetGuizhou,state.measureGuizhou,state.factorStrGuizhou);
      },
      cleanMeasureGuizhouAll(state) {
        state.measureGuizhou = ""
      },
  }
}
