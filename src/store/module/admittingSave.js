export default {
    state: {
        admittingSave:true,
        isLeaveTip: true,
    },

    mutations: {
      upAdmittingSave(state,value) {
        state.admittingSave = value
      },
      upIsLeaveTip(state,value) {
        state.isLeaveTip = value
      },
    }
  }
