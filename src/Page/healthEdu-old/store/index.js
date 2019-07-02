let data = {
  selectedForm: {},
  formInfo: {
    formCode: ''
  }
}
data.clean = () => {
  data.selectedForm = {}
  data.formInfo = {formCode: ''}
}
export default data