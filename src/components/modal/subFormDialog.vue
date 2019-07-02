<template>
<div>
  <sweet-modal ref="subFormModal" :size="subFormSize" :title="title" overlay-theme="" style="z-index: 10001">

    <el-form :label-position="'right'" label-width="120px">

      <div v-for="(item,index) in formData" :key="'f'+index" class="formdialog" v-if="rawData&&rawData.formData">
        <!-- <span v-if="item.children&&item.label">{{item.label}}</span> -->

        <!-- 子集表内容 subform -->
        <span v-for="(child,childIndex) in item.children" :key="'r'+childIndex"  v-if="item.children&&['checkbox','checkboxGroup','inputNumber','text','formText','formDateTime'].indexOf(child.type)>-1" @click="subformClicked($event,item,child)" :class=" ['text'].indexOf(child.type)>-1? 'inputGroup':''">

          <!-- 单选框 -->
          <!-- <el-checkbox-group size="mini"   v-if="rawData&&item.type==='radio'" v-model="rawData.formData[item.name]"> -->
            <el-checkbox v-if="rawData&&rawData.formData&&child.type==='checkbox'&&item.type==='radio'" v-model="rawData.formData[child.name]" :id="'CR'+child.label+childIndex" :name="child.name"  :label="child.label"  @change="radioChange($event,item,child)" ></el-checkbox>
          <!-- </el-checkbox-group> -->

          <div style="">
          <!-- 多选框 background:red; v-model="rawData.formData[child.name]"-->
          <el-checkbox-group :size="item.size||'large'"   v-if="rawData&&item.type==='checkboxGroup'" v-model="rawData.formData[item.name]">
            <el-checkbox v-for="(opt,optIndex) in child.options" :key="'CR'+child.label+childIndex+opt.label+optIndex" v-if="rawData&&rawData.formData&&child.type==='checkbox'"  :id="'CR'+child.label+childIndex+opt.label+optIndex" :name="opt.name"  :label="opt.label"  @change="radioChange($event,item,opt)" ></el-checkbox>
          </el-checkbox-group>
          </div>


        <!-- 输入文本 @change="inputNumberChange" -->
          <el-input-number autofocus v-if="rawData&&rawData.formData&&child.type==='inputNumber'" v-model="rawData.formData[child.name]" :min="child.min" :max="child.max"><template slot="prepend">{{child.showParentLabel&&item.label?child.label+item.label:(child.label||itemname)}}</template><template v-if="child.postText" slot="append">{{child.postText}}</template></el-input-number>


          <el-input autofocus v-if="rawData&&child.type==='text'&&!child.parentName" v-model="rawData.formData[child.name]"><template slot="prepend">{{child.showParentLabel&&item.label?child.label+item.label:(child.label||itemname)}}</template><template v-if="child.postText" slot="append">{{child.postText}}</template></el-input>




          <!-- 表单框架 -->

          <el-form-item v-if="rawData&&rawData.formData&&child.type==='checkbox'&&item.type==='formRadio'" :label="item.label">
            <el-radio-group :size="item.size||'large'"   v-model="rawData.formData[child.name]" :style="item.style" :class="item.class">
              <span v-for="(opt,optIndex) in child.options" :key="'CR'+child.label+childIndex+opt.label+optIndex" :id="'CR'+child.label+childIndex+opt.label+optIndex" @click="radioChange($event,item,opt)" :style="child.style" :class="child.class">
              <el-radio  :name="opt.name"  :label="opt.label"   ></el-radio>
              </span>
            </el-radio-group>
          </el-form-item>

          <!-- 多选框 background:red; v-model="rawData.formData[child.name]"-->
          <el-form-item v-if="rawData&&rawData.formData&&child.type==='checkbox'&&item.type==='formCheckboxGroup'" :label="item.label" :class="item.hidden?'hidden-form-item':''">
            <el-checkbox-group :size="item.size||'large'"    v-model="rawData.formData[child.name]" @change="checkboxChange($event,item,child)" >
              <el-checkbox v-for="(opt,optIndex) in child.options"
              :key="'CR'+child.label+childIndex+opt.label+optIndex"
              v-if="rawData&&rawData.formData&&child.type==='checkbox'"
              :id="'CR'+child.label+childIndex+opt.label+optIndex"
              :name="opt.name"
              :disabled="opt.disabled"
              :checked="opt.checked?true:false"
              :label="opt.label"  ></el-checkbox>
              <!-- {{rawData.formData[widFormCode+'_form_ids_callback']}},{{item.name}},{{rawData.formData[item.name]}},{{typeof(rawData.formData[item.name])}} -->
            </el-checkbox-group>
          </el-form-item>

          <el-form-item v-if="rawData&&rawData.formData&&child&&child.label&&child.type==='formText'&&!child.parentName" :label="child.label">
            <el-input autofocus  v-model="rawData.formData[child.name]">
            <!-- <template slot="prepend">{{child.showParentLabel&&item.label?child.label+item.label:(child.label||itemname)}}</template> -->
            <template v-if="child.postText" slot="append">{{child.postText}}</template>
            </el-input>
          </el-form-item>

          <!-- formDateTime -->
          <el-form-item v-if="rawData&&rawData.formData&&child&&child.label&&child.type==='formDateTime'&&!child.parentName" :label="child.label">
            <!-- <el-input  v-model="rawData.formData[child.name]">
            <template slot="prepend">{{child.showParentLabel&&item.label?child.label+item.label:(child.label||itemname)}}</template>
            <template v-if="child.postText" slot="append">{{child.postText}}</template>
            </el-input> -->
            <el-date-picker
              v-model="rawData.formData[child.name]"
              type="datetime"
              align="center"
              @change="dateTimeChange($event,child.name)"
              format="yyyy-MM-dd HH:mm"
              :placeholder="child.label">
            </el-date-picker>
          </el-form-item>


          <!-- 过敏反史组合 -->
          <el-form-item v-if="rawData&&rawData.formData&&child&&child.label&&child.type==='text'&&child.parentName&&rawData.formData[child.parentName]===child.label" :label="child.label+item.label" >
          <!-- {{child.parentName}}{{rawData.formData[child.parentName]}} -->
          <el-input autofocus v-model="rawData.formData[child.name]" @change="subformClicked($event,item,child)">
            <!-- <template slot="prepend">{{child.showParentLabel&&item.label?child.label+item.label:(child.label||itemname)}}</template> -->
            <template v-if="child.postText" slot="append">{{child.postText}}</template>
            </el-input>
          </el-form-item>
        </span>






        <!-- 下拉选项 @change="handleOption(rawData.formData[items[0].name],keys,items[0].name,items)"-->
        <el-form-item v-if="rawData&&rawData.formData&&item.type==='select'&&rawData.formData&&item.name" :label="item.label">
          <el-select  @change="selectChange(item,rawData.formData[item.name])"  clearable v-model="rawData.formData[item.name]" style="">
              <el-option
                v-for="(child,childIndex) in item.children" :key="'op'+childIndex"
                v-if="child.label&&child.type==='option'"
                :label="child.label"
                :value="child.label"
                >
              </el-option>
          </el-select>
        </el-form-item>




          <!-- 输入框 -->
          <span v-if="rawData&&rawData.formData&&item.type=='text'&&!item.children" class="inputGroup">
            <!-- {{item.label}} -->
            <!-- <el-form-item :label="item.label"> -->
            <el-input
              autofocus
              placeholder=""
              :name="item.name"
              v-model="rawData.formData[item.name]"
              ><template slot="prepend">{{['有'].indexOf(itemname)>-1?(item.label||title):itemname}}</template><template v-if="item.postText" slot="append">{{item.postText}}</template></el-input>
            <!-- </el-form-item> -->
          </span>



          <!-- <div v-if="rawData&&rawData.formData&&item.type=='textAuto'&&!item.children"> -->
          <!-- {{item.label}} -->
          <!-- textAuto -->
            <!-- <el-autocomplete
                  class="inline-input"
                  v-model="rawData.formData[item.name]"
                  :fetch-suggestions="(queryString, cb)=>{cb(item.options);}"
                ></el-autocomplete> -->
                <!-- {{child.label}},{{child.parentName}},{{rawData.formData[child.parentName]}},{{childIndex}} -->
          <!-- </div> -->



          <!-- selectGroup -->
          <el-form-item v-if="rawData&&rawData.formData&&item.type==='selectGroup'&&rawData.formData&&((item.name&&item.dictCode&&rawData.formData[item.name])||!item.dictCode)" :label="item.label">
              <div v-for="(child,childIndex) in item.children" :key="'selectGroup'+childIndex+child.label" v-if="(child.dictCode&&child.parentName&&rawData.formData[child.parentName]===child.label&&child.type==='select')||(!child.dictCode&&child.options&&child.type==='select')" >
                <!-- {{rawData.formData[child.name]}} -->
                <el-select @change="selectChange(child,rawData.formData[child.name])"  clearable v-model="rawData.formData[child.name]" remote :remote-method="remoteMethod(child)" style="" allow-create v-if="child.dictCode" >
                  <el-option
                    v-for="(kid,kidIndex) in child.options" :key="'op'+kidIndex+kid.label"
                    :label="kid.label"
                    :value="kid.label"
                    >
                  </el-option>
                </el-select>
                <el-select @change="selectChange(child,rawData.formData[child.name])"  clearable v-model="rawData.formData[child.name]" style="" v-if="!child.dictCode&&child.multiplechoice===false"  >
                  <el-option
                    v-for="(kid,kidIndex) in child.options" :key="'op'+kidIndex+kid.label"
                    :label="kid.label"
                    :value="kid.label"
                    >
                  </el-option>
                </el-select>
                <el-select @change="selectChange(child,rawData.formData[child.name])" clearable collapse-tags multiple v-model="rawData.formData[child.name]" style="" v-if="!child.dictCode&&child.multiplechoice===true" >
                  <el-option
                    v-for="(kid,kidIndex) in child.options" :key="'op'+kidIndex+kid.label"
                    :label="kid.label"
                    :value="kid.label"
                    >
                  </el-option>
                </el-select>

              </div>

              <!-- 自动填写下拉框 -->
              <div v-for="(child,childIndex) in item.children" :key="'autocompleteGroup'+childIndex+child.label" v-if="(child.dictCode&&child.parentName&&rawData.formData[child.parentName]===child.label&&child.type==='autocomplete')||(!child.dictCode&&child.options&&child.type==='autocomplete')" @click="subformClicked($event,item,child)">
                <el-autocomplete
                      class="inline-input"
                      v-model="rawData.formData[child.name]"
                      :fetch-suggestions="(queryString, cb)=>{getDictData(child).then(res=>{cb(res)});}"
                ></el-autocomplete>
              </div>

          </el-form-item>



          <!-- autocompleteGroup -->
          <el-form-item v-if="rawData&&rawData.formData&&item.type==='autocompleteGroup'&&rawData.formData&&((item.name&&item.dictCode&&rawData.formData[item.name])||!item.dictCode)" :label="item.label">
              <!-- 自动填写下拉框 -->
              <div v-for="(child,childIndex) in item.children" :key="'autocompleteGroup'+childIndex+child.label" v-if="(child.dictCode&&child.parentName&&rawData.formData[child.parentName]===child.label&&child.type==='autocomplete')||(!child.dictCode&&child.options&&child.type==='autocomplete')" >
                <el-autocomplete
                      class="inline-input"
                      v-model="rawData.formData[child.name]"
                      :fetch-suggestions="(queryString, cb)=>{getDictData(child).then(res=>{cb(res)});}"
                      @select="subformClicked($event,item)"
                ></el-autocomplete>
              </div>
           </el-form-item>


            <!-- 自定义HTML内容 -->
           <el-form-item v-if="rawData&&rawData.formData&&item.type==='formHTML'" :label="item.label">
              <!-- formHTML -->
              <!-- <div v-for="(child,childIndex) in item.children" :key="'formHTML'+childIndex+child.label"> -->
                <span v-if="(item.type=='formHTML')&&item.hasOwnProperty('formHTML')" v-html="item.formHTML"></span>
              <!-- </div> -->
           </el-form-item>




      </div>

    </el-form>


    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click.stop="close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click.stop="clickedOK()">确定</el-button>
      <!-- <el-button class="modal-btn" type="primary" @click.stop="toSign()">签名</el-button> -->
    </div>
  </sweet-modal>
</div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>


>>>.el-input
    position: inherit;
    font-size: 14px;
    // display: inline-block;
    // width: 50%;
    height: 28px;
    top:-1px
    // border: 1px solid #c1c1c1;
    color black
    margin: 5px 5px 8px 0px
    vertical-align: middle;
    // left: 36px;
    left: 0%;
  &.is-disabled
    color black
    background: #f6f6f6;
  >>>.el-input.is-disabled .el-input__inner
    color black
    background-color: transparent!important;

.edit-page,.print-page
  >>>input[type='text']
    border: 1px solid #c1c1c1;
    height: 20px;

  >>>.el-input-group
      display: table;
      >>>&.el-input-group--append
            color black
      >>>&.el-input-group--prepend
            color black

.inputGroup
  width 100%!important

>>>.el-input,.el-input-group,.el-input-group--append,.el-input-group--prepend
        display: table!important;


>>>.el-input-group__prepend
      color black
      height: inherit;
>>>.el-input-group__append
      color black
      height: inherit;
>>>.el-input__inner
  // border: 1px solid #c1c1c1;
  color black
  // line-height: 0px!important
  // height: 28px!important
  // font-size: 13px !important;
  // padding: 0 5px;
  // vertical-align: text-bottom;
>>>.el-input__icon
  line-height 0px
>>>.el-input-number .el-input__inner
  padding-right: 0px;
  // width auto
>>>.el-input-number__decrease
    margin: 3px 0px;
    border 1px solid rgb(191, 217, 210)
    right: 93px;
    height: 35px;
>>>.el-input-number__increase
    margin: 3px 0px;
    border 1px solid rgb(191, 217, 210)
    // left: 200%;
    right: 56px;
    height: 35px;
// >>>.noborder
//   border: 0px;
//   >>>td,th
//     color red
//     border: 0px;



>>>.el-form-item
    margin-left 0px!important
    margin-bottom 0px!important
>>>.el-form-item__label
    color black!important
>>>.el-select__tags
    padding: 8px;
>>>.el-form-item__content
    margin-left 120px!important
    >>>.el-input
        left: 0!important

.hidden-form-item
  opacity 0


.formdialog
  width 100%!important
  .el-input-number
    width 100%!important
    left: 0%;
    >>>.el-input,.el-input-group,.el-input-group--append,.el-input-group--prepend
          left: 0%;
  .el-input
    display: table;
    >>>.el-input,.el-input-group,.el-input-group--append,.el-input-group--prepend
        left: 0%;
.formdialog span
  // display inline-block
  display flow-root!important
  position relative
span.title
  // padding-left: 50px;
  // padding-right: 120px;
  line-height: 40px;
  font-size: 14px;
  width 15%
 .border-top
  // border-top 1px solid #000000
  line-height 40px
.border-top span
  display inline-block
  width 32%
// .radio-input
//   position relative
//   top 2px
//   left 0
span.radio
  width: 20%
  font-size: 12px
  // line-height: 40px;
  // padding: 10px 20px;

>>>.el-checkbox
  margin: 0px 5px!important;
  width: 80px!important;

>>>.el-checkbox-group
    width 100%
    >>>label.el-radio
        min-width 100px
        padding 2px 4px!important
        // width 18%
        border-radius 0px!important
        // border #4bb08d 1px solid
        // border 1px dashed rgb(191, 217, 210)
        border 1px solid rgb(191, 217, 210)
        // margin-bottom 8px
        // margin-right 8px
        font-size 12px
        &:hover
          border 1px solid #4bb08d
        &:active
          border 1px solid #4bb08d
    // .el-radio__input.is-checked .el-checkbox-group
    //   border #4bb08d 1px solid
    // .el-checkbox-group.is-checked
    //    border 1px solid red
    // .el-radio__inner
    //   border 1px solid rgb(191, 217, 210)
    span.el-checkbox__label
      font-size 14px

.date-input
  width 100%
  // height 100%
  // position relative
  // left 0
  // top 20px
  margin-bottom -30px
  line-height: 20px;
  outline none
  text-align center

.el-date-editor,.el-input
  width: 100%!important
.formdialog .el-input,
  display table !important
  position relative
  width: 100%!important
.el-select
  // display flow-root!important
  display block!important
  position relative
  width auto!important
.el-autocomplete
  width: 100%!important

.el-radio-group
  // display inline-flex!important
  display: inline-block!important
  >>>label
      .el-radio
        padding 0px 10px 0 0
        border-radius 0px!important




</style>
<script>
import dayjs from 'dayjs'
import {
  get_form_pressure_risk,
  findAllRecord_form_pressure_risk
} from "@/api/form_hj"

// 获取字典项
import {listItem} from "@/api/record.js"

import {formJSONDocument} from "./json/index.js"

// import { queryInfo } from '@/common/tool.js'
import common from '@/common/mixin/common.mixin.js'
// import SweetModal from "@/components/sweet-modal/components/SweetModal";
// import sweetModal from '@/components/sweet-modal/index.js'

import bus from 'vue-happy-bus'

  export default {
    mixins: [common],
    props:{
      // rawData:{
      //   type: Object,
      //   default: new Object()
      // },
      // label: {
      //   type: String,
      //   default: "请输入登录密码"
      // },
      // placeholder: {
      //   type: String,
      //   default: "请输入密码"
      // },
      // overlayTheme: {
      //   type: String,
      //   default: ""
      // },
      // showUserName: {
      //   type: Boolean,
      //   default: true
      // }
    },
    data() {
      return {
        bus: bus(this),
        // queryInfo,
        testData:{aaa:[]},
        test:[{label:"1111",data:"aaa"},{label:"222",data:"aaa"}],
        diagnosis:'',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        subFormSize:"small",
        formLabelWidth: '120px',
        formData:[],
        formScoreData:{},
        allData:[],
        rawData:new Object(),
        paramRawData:{},
        title:"默认",
        itemname:"",
        wid:null,
        keyname:"",
        top: "0",//window.document.querySelector('.form-contain').scrollTop+""||""
        // radio1: '',
        score:0,
        nurse:"",
        evalDate:dayjs().format('YYYY-MM-DD HH:mm')||"",
        formCode:"form_pressure_risk",
        widFormCode: "",
        // scoreList:[]
        // patientId:$route.query.patientId,
        // visitId:$route.query.visitId,
      }
    },
    computed: {

      },
    methods:{
      initSubForm(){
        // this.formData = []
        this.rawData = {}

        // this.title = ""
        // this.itemname = ""


        // let subFormModal = this.$refs.subFormModal

        // while(subFormModal.$children && subFormModal.$children.length>0){
        //   // autofocus
        //   subFormModal = subFormModal.$children[0]
        //   if(subFormModal && subFormModal.hasOwnProperty('autofocus')){
        //     subFormModal.autofocus = true
        //   }
        // }


      },
      // 全局去掉标签中个别字符
      getKeyIdString(id){
        return id.replace(/["?/]/g,'')
      },
      dateTimeChange(val,name){
        console.log('-----datetime',val,name)//,this.rawData.formData[child.name])
        this.rawData.formData[name] = dayjs(val).format('YYYY-MM-DD HH:mm')||""
      },
      subformClicked(e,item,child=null){
        let formCode = this.wid.formInfo.formCode
        let nameList = item.nameList||[]
        let name = child?child.name:item.name
        console.log('subformClicked()',e,item,child,this.wid.rawData,this.wid.formInfo,nameList,name,typeof(this.rawData.formData[name]),e.target.checked)

        if(e.target.checked!=undefined ){
          item.isChecked = e.target.checked
          // return
        }

        if((typeof(this.rawData.formData[name])==='object'&&!this.rawData.formData[name].length===0)||
        (typeof(this.rawData.formData[name])==='string'&&this.rawData.formData[name]==="")){
          nameList.map(n=>{
            let nname = formCode+"_"+n
            if(nname===name){ console.log("当前字段",name,nname) ;return}
            if(typeof(this.rawData.formData[nname])==='string'){
              this.rawData.formData[nname] = ""
            }else{
              this.rawData.formData[nname] = []
            }
          })
        }

      },
      clickedOK(){
        // parent.app.bus.$emit('assessmentLoaded')
        this.bus.$emit('assessmentLoaded')
        // this.paramRawData.formData= Object.assign(this.paramRawData.formData, this.rawData.formData)
        console.log('clickedOK',this.wid.rawData.formData,this.rawData.formData)
        if(this.wid){
          this.wid.rawData.formData = Object.assign(this.wid.rawData.formData, this.rawData.formData)
        }
        console.log('--clickedOK',this.wid.rawData.formData,this.rawData.formData)
        this.close()
      },
      async getDictData(val){
        console.log('getDictData',val)
        let dict = []
        let res = []

        if(val&&typeof(val)==='object'&&val.options&&val.options.length>0){
          return val.options
        }

        if(val&&val.dictCode){
          dict = await listItem(val.dictCode)
          console.log('--await-getDictData',dict)
          res = dict.data.data.map(item => {
            return { value: item.code, label: item.code };
          });
          console.log('--res-getDictData',res)
          val.options = JSON.parse(JSON.stringify(res))
          val.options.push({ value: "", label: "" })
          return res
        }
        return res
      },
      querySearch(queryString, cb,val) {
        console.log('querySearch',queryString, cb,val)
        var links = this.remoteMethod(val);
        var results = queryString&&links ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
      },
      remoteMethod(val) {
        console.log('remoteMethod',val)
        this.getDictData(val)
      },
      open(params){
        this.initSubForm();
        // form
        // data=[],title,itemname,keyname,allData=[],rawData={},callback=null
        console.log('open',params,this.$refs)
        this.title = ""||params.title
        this.itemname = (params.item||"").toString()||""
        this.keyname = params.keyname||""
        this.dialogFormVisible = true
        this.score = 0
        this.evalDate = dayjs().format('YYYY-MM-DD HH:mm')||""



        this.formData = params.data||[]
        // this.paramRawData = params.rawData||[]
        this.wid = params.wid||null
        this.rawData = JSON.parse(JSON.stringify(params.rawData))// params.rawData||{}



        if(params.subFormSize){
          this.subFormSize = params.subFormSize
        }else{
          this.subFormSize = "small"
        }

        this.widFormCode = this.wid.formInfo.formCode

        console.log("打开弹框",params,this.title,this.itemname,this.formData,this.rawData,this.wid,this.subFormSize,this.widFormCode,this.$refs)


        this.$refs.subFormModal.open();

        this.bus.$emit('assessmentLoaded');



        // this.getData()
        // this.$nextTick(function () {
          // this.allData = params.items||[]
          // let scrollTop = window.document.querySelector('.form-contain')
        // let offsetHeight = scrollTop.offsetHeight*0.1
        // this.top = scrollTop.scrollTop+offsetHeight+""||""
        // console.log('top',top,scrollTop,offsetHeight)
        // });
      },
      close(){
        this.initSubForm();
        this.dialogFormVisible = false
        this.$refs.subFormModal.close();
      },
      show(){
        this.dialogFormVisible = true
      },
      checkboxChange(val,item,child){
        console.log('---checkboxChange:',val,item,child)

        if(!item.isChecked){
          return
        }

        // if(child.isChecked){
        //   child.isChecked = !child.isChecked
        // }
        let idd = this.rawData.formData[this.widFormCode+'_form_ids_callback']?this.rawData.formData[this.widFormCode+'_form_ids_callback'].find(id=>{return id.indexOf(item.formCode)>-1}):""
        let formId = ""
        console.log("idd:",idd)
        if(idd){
          formId = idd.split(':')[1]||""
        }
        // return
        if(typeof(val)==='boolean'&&val){
          val = this.title
          this.rawData.formData[item.name] = val.toString()
        }

        // setTimeout(() => {
          if(val&&item.formCode){
            // val = val.toString()
            // this.rawData.formData[item.name] = val.toString()

            if(["form_swallowing"].indexOf(item.formCode)>-1){
              window.openTestFormDiagnosisModal({
                data:val,
                keysMap:item.keysMap,
                formCode:item.formCode,
                title:item.label,
                item:item,
                name:name,
                items:[],
                rawData:window.wid.rawData,
                widFormCode: this.widFormCode,
                wid:window,
                id:formId,
                subFormSize:"large"
                })
            }else{
              window.openTestDiagnosisModal({
                data:val,
                keysMap:item.keysMap,
                formCode:item.formCode,
                title:item.label,
                item:item,
                name:name,
                items:[],
                rawData:window.wid.rawData,
                widFormCode: this.widFormCode,
                wid:window,
                id:formId,
                subFormSize:"large"
                })
            }
            this.clickedOK()
            // this.close()
          }
        // }, 1000);
        //

      },
      radioChange(val,item,child){
        let indexItem = -2
        if(child.type==="checkbox"){
          try {
              indexItem = this.rawData.formData[child.name].indexOf(child.label)||-2
            } catch (error) {
              indexItem = -2
            }
          // 清空非选中项的子项

          // 单选  ,val.target.checked
          if(child.multiplechoice===false){
            console.log("==单选=radioChange",indexItem,this.rawData.formData[child.name],child.label)

            console.log("===indexItem",indexItem)
            if(child.isChecked&&indexItem==-1){
              this.rawData.formData[child.name] = []
              child.isChecked = false
            }else{
              this.rawData.formData[child.name] = []
              this.rawData.formData[child.name].push(child.label)
              child.isChecked = true
            }
          }
          // 多选
          // todo
          if(child.multiplechoice===true){
            console.log("==多选=radioChange",indexItem,child.name,this.rawData.formData[child.name],child.label)
            // if(child.isChecked===false||!this.rawData.formData[child.name]){
            //   this.rawData.formData[child.name] = []
            // }
            if(this.rawData.formData[child.name]&&this.rawData.formData[child.name].indexOf(child.label)===-1&&child.isChecked===false){
              this.rawData.formData[child.name].push(child.label)
              child.isChecked = true
            }else if(this.rawData.formData[child.name].indexOf(child.label)>-1&&indexItem>-1&&child.isChecked===true){
              this.rawData.formData[child.name].splice(indexItem,1)
              child.isChecked = false
            }else{
              child.isChecked = !child.isChecked
            }

          }

          // 赋值
          // this.paramRawData.formData= Object.assign(this.paramRawData.formData, this.rawData.formData, {})
          console.log('radioChange',indexItem,val,item,child,this.rawData,this.rawData.formData[child.name],this.paramRawData.formData)
        }
      },
      inputNumberChange(e){
        console.log('inputNumberChange',e)
      },
      selectChange(e,val){
        console.log('selectChange',e,val,e.name,this.rawData.formData)
      },
      // dateChange(val,name){
      //   this.rawData.formData[name]=val?dayjs(val).format('YYYY-MM-DD'):dayjs().format('YYYY-MM-DD')
      //   console.log(dayjs(val).format('YYYY-MM-DD'),name)
      //   // console.log(this.formData)
      // },
      // tagClicked(e,tag,name){
      //   console.log('tagClicked',e,tag,name,this.formData,this.formScoreData,e.target.checked)
      //   this.formScoreData[name]=tag.score
      //   if(this.formData&&this.formData[name]===tag.value){
      //     e.target.checked = e.target.checked?false:true;
      //     if(!e.target.checked){
      //       this.formData[name]=""
      //       this.formScoreData[name]=0
      //     }
      //   }else if(this.formData&&this.formData[name]===""){
      //     // this.formData[name]=tag.value
      //     this.formScoreData[name]=tag.score
      //   }

      //   console.log('--formScoreData',this.formScoreData,e.target.checked)

      //   this.sumScore(this.formScoreData)

      //   // setTimeout(() => {}, 100);

      // },
      // tagChange(e,tag,name){
      //   // formData[item.documentName]
      // },
      // sumScore(scoreData=this.formScoreData){
      //   console.log('computed-score',scoreData)
      //   this.score = 0
      //   for (const key in scoreData) {
      //     if (scoreData.hasOwnProperty(key)) {
      //       const element = scoreData[key];
      //       this.score += element
      //     }
      //   }
      // },
      // getData(){

          // 获取 表单存储数据元 回填数据入表中
          // findAllRecord_form_pressure_risk(
          //   // formCode
          //   this.formCode,
          //   this.$route.query.patientId,
          //   this.$route.query.visitId
          // ).then(res => {
          //   console.log("!!!!!get_form_pressure_risk", res);
          //   this.allData=res.data.data
          //   console.log("this.allData", this.allData);
          //   this.title=this.allData.documentName

          // });

    //  },

    },

    watch: {
      // 'rawData.formData':{
      //   handler: function (newVal,oldVal) {
      //         console.log("Subformdata",newVal,oldVal)
      //         // if(this.wid){
      //         //   this.wid.rawData.formData = Object.assign(this.wid.rawData.formData, this.rawData.formData)
      //         //   console.log("=##formdata",this.paramRawData.formData, this.rawData.formData,this.wid,this.wid.rawData.formData)
      //         // }else{
      //         //   console.log("===formdata",this.paramRawData.formData, this.rawData.formData,this.wid)
      //         // }
      //     },
      //   deep: true    //深度监听
      //  },
      },
    mounted() {
      // this.initSubForm()
      // this.focus()
      // allInputs = allInputs.filter(input=> {return (input.id.indexOf('CR-X-')===-1 && input.readonly!==true && input.disabled!==true )})
    },
    components: {
      // SweetModal
    }
  }
</script>
