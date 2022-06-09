import { unread } from '@/api/inBox'
export default {
  namespaced: true,
  state: {
    wih: window.innerHeight,
    openLeft: true,
    mailUnread: 0,
    relogin: false,
    screenLock: localStorage.screenLock === "true" ? true : false, // 是否锁屏 从本地存储初始化
    user: JSON.parse(localStorage.getItem('user')) || {}
    // 用户信息
  },
  mutations: {
    upWih(state, value) {
      state.wih = window.innerHeight
    },
    upWihInPatient(state, value) {
      state.wih = window.innerHeight + 60
    },
    upOpenLeft(state) {
      state.openLeft = !state.openLeft
    },
    upMailUnread(state, num) {
      state.mailUnread = num
    },
    upRelogin(state, data) {
      state.relogin = data
    },
    setScreenLock(state, data) {
      // 锁屏状态本地存储
      localStorage.screenLock = data
      state.screenLock = data
    },
    setUser(state, data) {
      state.user = data
    }
  },
  getters: {
    getWid: (state) => (value = 0) => {
      if (typeof value == 'number') {
        return `${window.innerHeight - value}px`
      }
      if (typeof value == 'string') {
        return `${window.innerHeight * Number(value) / 100}px`
      }
    },
    // 护士长
    isHeadNurse(state) {
      if (!state.user) return false
      if (state.user.roleManageCode === 'QCR0004') return true
      if (state.user.roleManageCodeList && state.user.roleManageCodeList.find((code) => code === "QCR0004")) return true
      if (state.user.roleManage == "1") return true
      if (state.user.post == '护长') return true
      return false
    }
  },
  actions: {
    async getMailUnread(context) {
      let num = (await unread()).data.data
      context.commit('upMailUnread', num)
    }
  }
}
