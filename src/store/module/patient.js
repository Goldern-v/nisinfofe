export default {
  state: {
    currentPatient: {},
    patientList:[],
  },
  mutations: {
    upCurrentPatientObj(state, value) {
      state.currentPatient = value
    },
    upPatientListObj(state, value) {
      state.patientList = value
    }
  },
  getters:{
    getPatient:(state)=>({patientId,visitId})=>{
      return state.patientList.find(p=> p.patientId == patientId && p.visitId == visitId)
    },
    getCurrentPatient:(state)=>()=>{
      return state.currentPatient
    }
  }
}
