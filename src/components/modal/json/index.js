

let form_pressure_risk = require('./Braden压疮风险护理单.json')
let form_caprini = require('./VTE风险评估量表(手术科室).json')
let form_padua = require('./VTE风险评估量表(非手术科室).json')
let form_swallowing = require('./吞咽评估单.json')
let form_selfcare = require('./自理评估护理单.json')
let form_fall = require('./跌倒护理单.json')
let form_fall_et = require('./跌倒护理单(儿童).json')


export let formJSONDocument = {
    form_pressure_risk : form_pressure_risk,
    form_caprini : form_caprini,
    form_padua: form_padua,
    form_swallowing: form_swallowing,
    form_selfcare: form_selfcare,
    form_fall: form_fall,
    form_fall_et: form_fall_et,
}

export default {formJSONDocument}
