
<template>
  <el-dialog :title="title||''" :visible.sync="dialogFormVisible"
  :size="size || 'large'"
  :top="top || '5%'" custom-class="custom-class">

    <!-- 片段内容组件显示 -->
    <el-form v-if="formBox
    && (formBox.hasOwnProperty('children')!==-1
     || formBox && formBox.hasOwnProperty('html')!==-1)" :model="form">
        <!-- 页面正文 -->
        <div v-if="formBox.children||formBox.html" >
          <FormBody :obj="[formBox]" :formObj="formObj" />
        </div>
    </el-form>

    <!-- 表单整页内容显示 -->
    <el-form v-if="formBox && formBox.schemes" :model="formBox.schemes">
        <!-- 页面标题 -->
        <FormTitle v-if="formBox.formSetting" :obj="formBox.formSetting" :formObj="formObj" />

        <!-- 页面头部 -->
        <FormHeader v-if="formBox.header" :obj="formBox.header" :formObj="formObj" />

        <!-- 页面正文 -->
        <FormBody v-if="formBox.body" :obj="formBox.body" :formObj="formObj" />

        <!-- 页面尾部 -->
        <FormFooter v-if="formBox.footer" :obj="formBox.footer" :formObj="formObj" />

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button v-if="hasCancel" @click="dialogFormVisible = false">{{cancelText||'取消'}}</el-button>
      <el-button v-if="hasOK" type="primary" @click="dialogFormVisible = false">{{okText||'确认'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import vue from 'vue'
import uuid from 'node-uuid'
import FormBody from './FormBody'
import InputElements from './InputElements'
import FormTitle from './FormTitle'
import FormHeader from './FormHeader'
import FormFooter from './FormFooter'
// import FormGroupTitle from './FormGroupTitle'
// import FormGroupHR from './FormGroupHR'
// import FormGroupHorizontalBox from './FormGroupHorizontalBox'
// import FormGroupColBox from './FormGroupColBox'
// import draggable from 'vuedraggable'


export default {
  name:"Dialog",
  props: {
    obj: Object,
    formObj: Object,
  },
  components: {
    FormTitle,
    FormHeader,
    FormBody,
    FormFooter,
    InputElements,
    // FormGroupTitle,
    // FormGroupHR,
    // FormGroupHorizontalBox,
    // FormGroupColBox,
    // draggable,
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '220px',
      title: "",
      size: "",
      top: "",
      okText: "",
      cancelText: "",
      hasCancel: false,
      hasOK: true,
      type: "independent",
      formBox: null,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
      }
    }
  },
  computed:{
  },
  watch: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
    openBox(config, value=null){
      console.log('openBox',config, this.obj, this.formObj)
      this.title = config.title || ''
      this.size = config.size || ''
      this.top = config.top || ''
      this.okText = config.okText || ''
      this.cancelText = config.cancelText || ''
      this.hasCancel = config.hasCancel===false ? false : true
      this.hasOK = config.hasOK===false ? false : true
      this.type = config.type || 'independent'
      //
      if(config.parentName && this.formObj.model[config.parentName] && config.type==='dependent' ){
        config.title = this.formObj.model[config.parentName] || config.title
      }

      try {
          // this.formBox = this.formObj.dialogs.find(f=>  f.formSetting.formTitle.formName === config.title)
          this.formBox = this.formObj.dialogs[config.title]
        } catch (error) {
          // this.formBox = this.formObj.dialogs.find(f=> (f.title == config.title))
        }

      this.dialogFormVisible = true
      console.log('formBox',this.formBox,config.title)
      //
    },
    closeBox(){
      this.dialogFormVisible = false
    },
    getUUID(child=null){
      let uuid_ = uuid.v1()
      return uuid_
    }
  },
}
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.el-checkbox,
.is-bordered,
.el-checkbox--medium,
.el-input,
.el-input--medium,
.el-input-group,
.el-input-group--prepend
  margin: 5px 0px;


.el-dialog,.el-dialog--small,.custom-class
  width: 70%!important;

</style>
