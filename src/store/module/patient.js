export default {
  state: {
    currentPatient: {},
    patientList: [],
    slideModal: '',
  },
  mutations: {
    upCurrentPatientObj(state, value) {
      state.currentPatient = JSON.parse(JSON.stringify(value))
    },
    upPatientListObj(state, value) {
      state.patientList = JSON.parse(JSON.stringify(value))
    },
    setSlideModal(state, value) {
      state.slideModal = value;
    }
  },
  getters: {
    getPatient: (state) => ({ patientId, visitId }) => {
      return state.patientList.find(p => p.patientId == patientId && p.visitId == visitId)
    },
    getCurrentPatient: (state) => () => {
      return state.currentPatient
    },
    getPatientList: (state) => () => {
      return state.patientList
    },
    getAgeLevel: (state) => () => {
      let age = (state.currentPatient.age || "0") + ""
      // 新生儿 儿童 成人
      let cond = [
        { min: 1, max: 12, key: "月", value: "婴儿" },
        { min: 1, max: 28, key: "天", value: "新生儿" },
        { min: 1, max: 3, value: "幼儿" },
        { min: 3, max: 6, value: "学龄前" },
        { min: 6, max: 12, value: "学龄期" },
        { min: 1, max: 13, value: "儿童" },
        { min: 13, max: 17, value: "儿童" },
        { min: 17, max: Infinity, value: "成人" }
      ]
      // "新生儿","婴儿","幼儿","学龄前","学龄期","儿童","成人"
      let ageLevel = ""
      // let months = age.includes("月")?"":""
      // let days = age.includes("天")?"":""
      let ageStr = (~~(age).replace(/[^0-9]/g, ''))
      let pattern = new RegExp('\\w+');
      let findIndex = cond.find(ret => {
        if (ret.key && age.indexOf(ret.key) > -1) {
          pattern = new RegExp('\\d*' + ret.key, 'g'); // /\d*月/g
          ageStr = ~~(age.replace(age.replace(pattern, ''), '').replace(/[^0-9]/g, ''))
        }
        if (
          ret.min
          && ret.max
          && ageStr >= ret.min
          && ageStr <= ret.max
          && ((ret.key && age.includes(ret.key)) || !ret.key)
        ) {
          ageLevel = ret.value
          return ret
        }
      })
      return ageLevel
    },
  }
}
