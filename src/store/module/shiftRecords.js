export default {
    /* 交班报告。解锁与锁定 */
    state: {
      isLock: false,//是否有其他护士在编辑
      shiftRecordID:'',//当前锁定的交班报告
      enterTime:''//进入的时间
    },
    mutations: {
      changeLockState(state,data) {
        state.isLock=data
      },
      changeShiftRecordID(state,data){
        state.shiftRecordID=data
      },
      changeEnterTime(state,data){
        state.enterTime=data
      }
    }
  }
  