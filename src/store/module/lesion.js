export default {
  state: {
    deptList: [],
    deptCode: "",
    deptName: "",
    wardCode: "",
    wardName: "",
    updateDataTime: new Date(),
    taskType: "0",
    oldFormInfo:{},
    checkDeptName: ""
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
    upWardCode(state, value) {
      state.wardCode = value;
    },
    upWardName(state, value) {
      state.wardName = value;
    },
    upOldFormInfo(state, value) {
      state.oldFormInfo = value;
    },
    upTaskType(state, value) {
      state.taskType = value;
    },
    upCheckDeptName(state, value) {
      state.checkDeptName = value;
    },
    updateDataTime(state, val) {
      state.updateDataTime = new Date().Format("hh: mm");
    }
  },
  getters: {
    getOldFormInfo: (state) => () => {
      return state.oldFormInfo
    }
  }
};
