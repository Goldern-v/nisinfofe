import Vue from 'vue'
import vuex from 'vuex'
import user from './module/user'
import index from './module/index'
import lesion from './module/lesion'
import form from './module/form'
import formGuizhou from './module/formGuizhou'
import common from './module/common'
import inBox from './module/inBox'
import record from './module/record'
import sheet from './module/sheet'
import patient from './module/patient'
import hospitalEval from './module/hospitalEval'
import temperature from './module/temperature'
import admittingSave from './module/admittingSave'
import form_masterInfo from "./module/form_masterInfo"
import shiftRecords from "./module/shiftRecords"
Vue.use(vuex)
let store = new vuex.Store({
  modules: {
    user,
    index,
    lesion,
    form,
    formGuizhou,
    common,
    inBox,
    record,
    sheet,
    patient,
    hospitalEval,
    temperature,
    admittingSave,
    form_masterInfo,
    shiftRecords
  }
})

export default store
