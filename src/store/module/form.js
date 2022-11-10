export default {
  state: {
    formData: [],
    hisDiags: [],
    // 诊断
    measure: [],
    select: [],
    //
    formFilledData: [],
    // 表单最早ID  { keyName:valueId }
    formLastId: [],
    formTree: [],
  },
  getters: {
    getFormLastId: (state) => ({ patientId, visitId, formCode, formName }) => {
      return state.formLastId.find(form => form.patientId == patientId && form.visitId == visitId && (form.formCode == formCode || form.formName == formName))
    },
    getFormList: (state) => (formCode) => {
      return state.formTree.find(form => (form.formCode == formCode))
    },
    getPreFormId: (state) => (formCode, formId, pageIndex) => {
      let formList = state.formTree.find(form => (form.formCode == formCode))
      if (formId && formList && formList.children && formList.children.length > 0) {
        // formList = formList.children.filter(form => { return form.form_id != formId && form.evalScore })
        formList = formList.children.filter(form => {
          return form.form_id != formId && (isNaN(pageIndex) ? true : form.pageIndex < pageIndex) }
        )
        if (formList && formList.length > 0) {
          return formList[0]
        }
      }
      return null
    },
    getFormTree: (state) => () => {
      return state.formTree
    }
  },
  mutations: {
    upFormLastId(state, value) {
      state.formLastId = [...state.formLastId, value]
    },
    upFormTree(state, value) {
      state.formTree = [...value]
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
