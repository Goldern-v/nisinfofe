export default {
    /* 交班报告。解锁与锁定 */
    state: {
      isLock: false,//是否有其他护士在编辑
      shiftRecordID:'',//当前锁定的交班报告
      enterTime:'', //进入的时间
      setupTime:'' , //后台配置的默认解锁时间（min）
      lockTimeId:'', //锁定重新加载页面
    },
    // 懒得改了，传多个参数。写一个函数就可以
    mutations: {
      changeLockState(state,data) {
        state.isLock=data
      },
      changeShiftRecordID(state,data){
        state.shiftRecordID=data
      },
      changeEnterTime(state,data){
        state.enterTime=data
      },
      changeSetupTime(state,data){
        state.setupTime=data
      },
      changeLockTimeId(state,data){
        state.lockTimeId=data
      },
    }
  }
  