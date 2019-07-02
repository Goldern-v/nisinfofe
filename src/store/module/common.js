import {unread} from '@/api/inBox'
export default {
  state: {
    wih: window.innerHeight,
    openLeft: true,
    mailUnread: 0,
    relogin: false,
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
    }
  },
  getters: {
    getWid: (state) => (value = 0) => {
      if(typeof value == 'number') {
        return `${window.innerHeight - value}px`
      }
      if(typeof value == 'string') {
        return `${window.innerHeight * Number(value) / 100}px`
      } 
    }
  },
  actions: {
    async getMailUnread (context) {
      let num = (await unread()).data.data
      context.commit('upMailUnread', num)
    }
  }
}
