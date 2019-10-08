export default {
  state: {
    formData: [],
    hisDiags: [],
    // 诊断
    measure: [],
    select: [],
    //
    formFilledData:[],
    // 表单最早ID  { keyName:valueId }
    formLastId:[],
  },
  getters:{
    getFormLastId:(state)=>({patientId,visitId,formCode,formName})=>{
      return state.formLastId.find(form=> form.patientId == patientId && form.visitId == visitId && (form.formCode == formCode||form.formName == formName))
    }
  },
  mutations: {
    upFormLastId(state, value) {
      state.formLastId = [...state.formLastId, value]
    },
    upMyDept(state, value) {
      state.myDept = value
    },
    upRange(state, value) {
      state.range = value
    },
    upDeptMap(state, value) {
      state.deptMap = value
    },
    upDept(state, value) {
      state.dept = value
    },
    upSelect(state, value) {
      state.select = value
    },
    addSelect(state, value) {
      state.select.push(value)
      state.select = window.app.$_.uniq(state.select);
    },
    upFormData(state, value) {
      state.formData = value
      //this.$store.state.form.formData
    },
    upHisDiags(state, value) {
      state.hisDiags = value
    },
    upFormFilledData(state, value) {
      state.formFilledData = value
      //this.$store.state.form.formFilledData
    },
    upMeasure(state, value) {
      state.measure.unshift(value)
      let result = window.app.$_.unionBy(state.measure, 'code')
      state.measure = result
    },
    cleanMeasureAll(state) {
      state.formData = []
      state.hisDiags = []
      state.measure = []
      state.select = []
    },
    cleanFormLastId(state) {
      state.formLastId = []
    },
  }
}
