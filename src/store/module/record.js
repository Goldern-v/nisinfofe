export default {
  state: {
    fullPageRecord: false,
    ThreeTestSheet: false,
    EvaluationRecords: false,
    NursingCarePlan: false,
    // 科室code
    RDeptCode: '',
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
    },
    upRDeptCode(state, value) {
      state.RDeptCode = value
    }
  }
}
