import _ from 'lodash'
export default {
  state: {
    selectList: [],
    allList: [],
    inAllstate: false
  },
  mutations: {
    initSelectList(state) {
      state.selectList = []
      state.allList = []
      state.inAllstate = false 
    },
    selectListAll(state) {
      state.inAllstate = true 
      state.selectList = state.allList 
    },
    noSelectListAll(state) {
      state.selectList = []
      state.inAllstate = false 
    },
    upSelectList(state, id) {
      state.selectList = value
    },
    addSelectList(state, id) {
      state.selectList.push(id)
      state.selectList = _.uniq(state.selectList)
    },
    delSelectList(state, id) {
      state.selectList = _.remove(state.selectList, (n) => {
        return n != id
      })
    },
    addAllList(state, id) {
      state.allList.push(id)
      state.allList = _.uniq(state.allList)
    },
    delAllList(state, id) {
      state.allList = _.remove(state.allList, (n) => {
        return n != id
      })
    },
  }
}
