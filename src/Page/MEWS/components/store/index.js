function renderCurrDataObj() {
  return {
    bedLabel: "",
    iconText: "",
    iconTextRgb: "",
    instanceVitalDtos: [],
    mewsInstancePlanDto: '',
    name: "",
    patientId: "",
    score: '',
    visitId: ''
  }
}

let currDataObj = renderCurrDataObj()
export default currDataObj

export function initCurrDataObj() {
  Object.assign(currDataObj, renderCurrDataObj())
}