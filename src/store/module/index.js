export default {
  state: {
    myDept: {},
    range: {},
    deptMap: [],
    dept: [],
    selectedTime: '',
  },
  mutations: {
    upMyDept(state, value) {
      state.myDept = value
    },
    upRange(state, value) {
      state.range = value
    },
    upDeptMap(state, value) {
      state.deptMap = value
    },
    upDept(state, value) {
      state.dept = value
    },
    upSelectedTime(state, value) {
      state.selectedTime = value
    }
  }
}
