export default {
  state: {
    fullPageRecord: false,
    ThreeTestSheet: false,
    EvaluationRecords: false,
    NursingCarePlan: false,
  },
  mutations: {
    openFullPageRecord(state) {
      state.fullPageRecord = true
    },
    closeFullPageRecord(state) {
      state.fullPageRecord = false
    },
    changeRecordValue(state, {key, value}) {
      state[key] = value
    }
  }
}
