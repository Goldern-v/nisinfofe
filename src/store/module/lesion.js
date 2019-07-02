export default {
  state: {
    deptList: [],
    deptCode: "",
    deptName: "",
    updateDataTime: new Date().Format("hh: mm"),
    taskType: "0"
  },
  mutations: {
    upDeptList(state, value) {
      state.deptList = value;
    },
    upDeptCode(state, value) {
      state.deptCode = value;
    },
    upDeptName(state, value) {
      state.deptName = value;
    },
    upTaskType(state, value) {
      state.taskType = value;
    },
    updateDataTime(state, val) {
      state.updateDataTime = new Date().Format("hh: mm");
    }
  }
};
