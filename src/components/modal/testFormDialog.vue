<template>

  <sweet-modal ref="testFormModal" :size="allData.formCode==='form_swallowing'?'medium':'big'" :title="title" width='50%' :overlay-theme="title"  style="z-index: 10002;" >
    <div  v-for="(item,index) in allData.documentItemDtos" :key="index" class="testdialog">

        <div class="right" v-if="index===1">
            <span  class="title-swallowing" style="font-weight:800" >{{item.documentName}}</span>
            <span class="title-swallowing">{{item.documentDescription}}</span>

            <span v-for='(tag,i) in item.documentItemLists' :key="'CR'+tag.name+i">
              <!-- 单选 -->
            <el-tooltip  v-if="(gettype(tag)==='radio'||tag.type=='text'||gettype(tag)==='checkbox')&&tag.type==='radio'" :content="tag.score+'分,'+tag.value" placement="top" style="width:auto;min-width: 105px;margin: 5px;" >
              <el-radio-group v-model="formData[tag.name]" @click.native="tagClicked($event,tag,tag.name,tag.type)">
                {{(tag.expand?(JSON.parse(tag.expand)).type:tag.type)}}
              <el-radio size="small" :name="tag.name" :label="tag.expand?(JSON.parse(tag.expand)).label:tag.value" :type="tag.type" :score="tag.score" :checked="tag.isSelected">{{tag.expand?(JSON.parse(tag.expand)).label:tag.value}}</el-radio>
              </el-radio-group>
            </el-tooltip>
              <!-- 多选 -->
            <el-checkbox-group  v-if="(gettype(tag)==='radio'||tag.type=='text'||gettype(tag)==='checkbox')&&tag.type==='checkbox'" v-model="formData[tag.name]">
              <el-checkbox size="small"  :label="tag.value" :name="tag.name" :type="tag.type" :score="tag.score" :checked=tag.isSelected  @change="tagClicked($event,tag,tag.name,tag.type)" style="width:300px">{{tag.value}}</el-checkbox>
            </el-checkbox-group>
              <!-- 文本 -->
            <div  v-if="(gettype(tag)=='text')" >
            <label>{{tag.value}}</label>
              <el-input  placeholder="请输入内容" class="tag_text" style="width:80%;margin-left:-90px"  v-model="formData[tag.name]"  @change="tagClicked($event,tag,tag.name,tag.type)"></el-input>
            </div>

            <!-- 下拉框 -->
            <!-- 下拉框单选 @change="tagClicked($event,tag,tag.name,'select')" -->
            <!-- <span v-if="tag.name&&gettype(tag)==='select'&&tag.type==='text'"  @click="selectClicked($event,tag)">
              <label>{{tag.value}}</label>
              <el-select  v-model="testform" clearable
                  placeholder="请选择"
                  size="medium"
                  class="select"
                  :class="formData[tag.name]==='+'?'tag_red':'select'"
                  @change="selectChange($event,tag,tag.name,'select')" >
                <el-option v-for='option in (JSON.parse(tag.expand)).tag'
                  :label="option"
                  :value="option"
                  :key="option"
                  :style="option==='+'?'color:red':'color:#000'"  >
                </el-option>
              </el-select>
              {{tag.name}},{{formData[tag.name]}},{{typeof(formData[tag.name])}},{{testform}},{{typeof(testform)}}
            </span> -->


            <!-- 下拉填写 -->
            <div v-if="tag.name&&gettype(tag)==='select'&&tag.type==='text'&&formData"  @click="selectClicked($event,tag)">
              <label>{{tag.value}}</label>
              <el-autocomplete
                    class="select"
                    v-model="testResultWater"
                    :fetch-suggestions="(queryString, cb)=>{cb(genArrayToListData((JSON.parse(tag.expand)).tag));}"
                    :style="tag.style"
              ></el-autocomplete>
            </div>



          </span>
        </div>




        <div class="left" v-if="index===2">
             <span  class="title-swallowing" style="font-weight:800" >{{item.documentName}}</span>
              <span class="title-swallowing">{{item.documentDescription}}</span>
              <span v-for='(tag,i) in item.documentItemLists' :key="i">
              <el-tooltip  v-if="(gettype(tag)==='radio'||tag.type=='text'||gettype(tag)==='checkbox')&&tag.type==='radio'" :content="tag.score+'分,'+tag.value" placement="top" style="width:auto;min-width: 105px;margin: 5px;" >
            <!-- 单选 -->
              <el-radio-group v-model="formData[tag.name]" @click.native="tagClicked($event,tag,tag.name,tag.type)">
                {{(tag.expand?(JSON.parse(tag.expand)).type:tag.type)}}
              <el-radio size="small" :name="tag.name" :label="tag.expand?(JSON.parse(tag.expand)).label:tag.value" :type="tag.type" :score="tag.score" :checked="tag.isSelected">{{tag.expand?(JSON.parse(tag.expand)).label:tag.value}}</el-radio>
              </el-radio-group>
            </el-tooltip>
              <!-- 多选 -->
            <!-- <span  v-if="(gettype(tag)==='radio'||tag.type=='text'||gettype(tag)==='checkbox')&&tag.type==='checkbox'">
            <el-checkbox size="small"  :label="tag.value" :name="tag.name" :type="tag.type"  v-model="formData[tag.name]" :score="tag.score" :checked=tag.isSelected  @change="tagClicked($event,tag,tag.name,tag.type)" style="width:300px">{{tag.value}}</el-checkbox>
            </span> -->
            <el-checkbox-group  v-if="(gettype(tag)==='radio'||tag.type=='text'||gettype(tag)==='checkbox')&&tag.type==='checkbox'" v-model="formData[tag.name]">
            <el-checkbox size="small"  :label="tag.value" :name="tag.name" :type="tag.type" :score="tag.score" :checked=tag.isSelected  @change="tagClicked($event,tag,tag.name,tag.type)" style="width:300px">{{tag.value}}</el-checkbox>
            </el-checkbox-group>
              <!-- 文本 -->
            <!-- <span  v-if="(gettype(tag)=='text')" >
            <label>{{tag.value}}</label>
            <el-input  placeholder="请输入内容" @change="tagClicked($event,tag,tag.name,tag.type)" v-model="formData[tag.name]" class="tag_text" style="width:80%;margin-left:-90px" ></el-input>{{tag.name}}
            </span> -->
            <span  v-if="(gettype(tag)=='text')" >
            <label>{{tag.value}}</label>
            <el-input  placeholder="请输入内容" class="tag_text" style="width:80%;margin-left:-90px"  v-model="formData[tag.name]"  @change="tagClicked($event,tag,tag.name,tag.type)"></el-input>
            </span>

                <!-- 下拉框 -->
            <!-- 下拉框单选 -->
            <!-- <span v-if="gettype(tag)==='select'" @click="selectClicked($event,tag)">
              <label>{{tag.value}}</label>

              <el-select  v-model="formData[tag.name]" clearable  placeholder="请选择"  size="medium" class="select" :class="formData[tag.name]==='+'?'tag_red':'select'" @change="tagClicked($event,tag,tag.name,'select')">
              <el-option v-for='option in (JSON.parse(tag.expand)).tag' :label="option" :value="option" :key="option" :style="option==='+'?'color:red':'color:#000'"  >
              </el-option>
            </el-select>
            {{tag.name}}
            </span> -->

            <!-- 下拉填写 -->
            <div v-if="tag.name&&gettype(tag)==='select'&&tag.type==='text'"  @click="selectClicked($event,tag)">
              <label>{{tag.value}}</label>
              <el-autocomplete
                    class="select"
                    v-model="testResultPaste"
                    :fetch-suggestions="(queryString, cb)=>{cb(genArrayToListData((JSON.parse(tag.expand)).tag));}"
                    :style="item.style"
              ></el-autocomplete>
            </div>


            <!-- <span v-if="gettype(tag)==='select'">
              <label>{{tag.value}}</label>
           <el-select  v-model="testform1" clearable  placeholder="请选择"  size="medium" class="select" :class="formData[tag.name]==='+'?'tag_red':'select'" >
              <el-option v-for='option in (JSON.parse(tag.expand)).tag' :label="option" :value="option" :key="option" :style="option==='+'?'color:red':'color:#000'" @click.native="tagClicked($event,option,tag.name,gettype(tag))">
              </el-option>
            </el-select> -->
              <!-- <el-select v-model="formData[tag.name]" clearable placeholder="请选择">
                <el-option
                  v-for="(option,i) in (JSON.parse(tag.expand)).tag"
                  :key="option"
                  :label="option"
                  :value="option">
                </el-option>
              </el-select> -->
            <!-- </span> -->
          </span>
        </div>




        <div v-if="index===3">
                 <div class="border-top" style="border-top:1px solid #EAEEF1;margin-top:50px;">
                  <span v-for='(tag,i) in item.documentItemLists' :key="i" style="width:55%">
                  <!-- 下拉框 -->
                  <!-- 下拉框单选 -->
                  <!-- <span v-if="gettype(tag)==='select'" style="width:100%">
                   <label>{{item.documentName}}</label>
                   <el-select v-model="formData[tag.name]" clearable  placeholder="请选择"  size="medium" class="select" @change="tagClicked($event,tag,tag.name,gettype(tag))">
                      <el-option v-for='(option,i) in (JSON.parse(tag.expand)).value' :label="option" :value="option" :key="'select'+option+i" >
                      </el-option>
                    </el-select>
                    {{tag.name}}
                  </span> -->


                  <!-- <el-select  v-model="formData[tag.name]" clearable  placeholder="请选择"  size="medium"  class="select" @click.native="tagClicked($event,tag,tag.name,gettype(tag))">
                    <el-option v-for='(option,i) in (JSON.parse(tag.expand)).value' :label="option" :value="option" :key="option">
                    </el-option>
                  </el-select> -->


                  <!-- 下拉填写 -->
                  <div v-if="tag.name&&gettype(tag)==='select'&&tag.type==='text'"  @click="selectClicked($event,tag)">
                    <label>{{item.documentName}}</label>
                    <el-autocomplete
                          class="select"
                          v-model="testResultAdvice"
                          :fetch-suggestions="(queryString, cb)=>{cb(genArrayToListData((JSON.parse(tag.expand)).value));}"
                          :style="tag.style"
                    ></el-autocomplete>
                  </div>





                  </span>
                   <span style="width:18%">评估人：{{nurse}}</span>
                    <span style="width:25%"><span style="display:inline-block">评估日期：</span><el-date-picker
                  v-model="evalDate"
                  type="datetime"
                  align="center"
                  format="yyyy-MM-dd HH:mm"
                  placeholder="输入签名时间"
                  class="date-picker"
                  >
                </el-date-picker></span>
                 </div>
        </div>
                 <div style="height: 20px"></div>

    </div>
           <div slot="button">
      <el-button class="modal-btn" @click.stop="$refs.testFormModal.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click.stop="saveJson()">保存</el-button>
      <!-- <el-button class="modal-btn" type="primary" @click.stop="toSign()">签名</el-button> -->
    </div>
        </sweet-modal>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.sweet-content
  min-height 100px!important
.name-title
  font-size 14px;
  margin 15px 0 10px
  font-weight bold
.el-tabs__active-bar
  background-color none
.right
  width 48%
  border-right 1px solid #EAEEF1
  float left
.left
  width 48%
  padding-left 25px
  margin-top -20px
  float left
>>>.el-input
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    min-height: 40px;
    height auto
    top:3px
    color black
    margin: 5px 8px;
    vertical-align: middle;
    left: 0px;
  &.is-disabled
    color black
    background: #f6f6f6;
  >>>.el-input.is-disabled .el-input__inner
    color black
    background-color: transparent!important;
.edit-page,.print-page
  >>>input[type='text']
    border: 1px solid #c1c1c1;
    height: 18px;

>>>input .el-input__inner
  border: 1px solid #c1c1c1;
  color black
  height: 28px!important
  font-size: 13px !important;
  padding: 0 5px;
  margin-left -40px !important
  vertical-align: text-bottom;
  margin-bottom 10px !important
>>>.el-input__icon
  line-height 0px
>>>.el-input-number .el-input__inner
  padding-right: 0px;
>>>.noborder
  border: 0px;
  >>>td,th
    color red
    border: 0px;

.testdialog
  width 100%
.testdialog span
  display inline-block

span.title
  line-height: 35px;
  font-size: 13px;
  width 25%
span.title-swallowing
  line-height: 35px;
  font-size: 13px;
  width 98%
 .border-top
  line-height 40px
  clear both
.border-top span
  display inline-block
  width 32%
span.radio
  width: 20%
  font-size: 12px
.el-radio-group
  width 80%
  label.el-radio
    min-width 100px
    padding 8px
    border-radius 5px
    border 1px solid rgb(191, 217, 210)
    font-size 12px
    &:hover
      border 1px solid #4bb08d
    &:active
      border 1px solid #4bb08d
  span.el-checkbox__label
    font-size 12px
.el-checkbox-group
  width 100%
.date-input
  width 100%
  margin-bottom -30px
  line-height: 20px;
  outline none
  text-align center
.select
  width 250px !important
.tag_text
  width 250px !important
  margin-left 8px !important
.tag_red
  color red
  width 250px !important
>>>div .el-select__tags
  margin-left 5px
  min-width 210px
  width auto
  height auto
.el-select-dropdown
  margin-left 10px !important
.date-picker
  width 120px !important
// .el-select .el-input__inner
//   background red   !important
</style>
<script>
import {changePassword} from '@/api/index.js'
import dayjs from 'dayjs'
import common from '@/common/mixin/common.mixin.js'
import bus from 'vue-happy-bus'
import {
  findAllRecord_form,//获取表单数据
  Formsave,//保存
  evalDetail_form//获取表单回填数据
} from "@/api/form_hj"

import {formJSONDocument} from "./json/index.js"

// import testIndex from './testIndex.vue'
  export default {
     mixins: [common],
     props:{
      overlayTheme: {
        type: String,
        default: ""
      },
      showUserName: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        bus: bus(this),
        // diagnosis:'',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        title:"默认",
        itemname:"",
        keyname:"",
        top: "0",
        NumData:{},
        formScoreData:{},
        checkboxsum:[],
        selboxsum:{},
        allData:{},
        rawData:{},
        test:[],
        formname:"",
        title:"默认",
        formChangeLoading:false,
        formData:{},
        formPostData:{},
        evalDate:dayjs().format('YYYY-MM-DD HH:mm')||"",
        score:0,
        nurse:'',
        testResultWater:"",
        testResultPaste:"",
        testResultAdvice:"",
        testform:'',
        testform1:'',
        testform2:'',
        formId:"",
        formCode:"form_swallowing",
        widFormCode:"",
        wid:null,
        //吞咽评估单:form_swallowing
        keysMap:{},
      }
    },
    methods: {
      open(params){
        console.log('open',params,this.$refs,this.formCode,this.userInfo)
        this.cleardata()
        this.nurse = this.userInfo.empName
        this.title = ""||params.title
        this.itemname = params.item||""
        this.keyname = params.keyname||""
        this.keysMap = params.keysMap||{}
        this.dialogFormVisible = true
        this.evalDate = dayjs().format('YYYY-MM-DD HH:mm')||""
        // this.formData = {
        //   [this.formCode + '_eval_date']: "",
        // }
        this.formCode=params.formCode||"form_swallowing"
        this.formId=  params.id||""//||"2920"
        this.wid = params.wid||null
        this.allData = params.items||{}
        this.rawData = params.rawData||{}
        this.widFormCode = params.widFormCode||""
        console.log('open:TESTrawData',this.rawData,this.widFormCode,this.formId)

        if(this.formCode===""||this.formCode===undefined){
          console.log('error: the formCode cannot be found',this.formCode)
          return
        }

        this.$refs.testFormModal.open()
        this.$nextTick(function () {
          this.initial()
        });
      },
      cleardata(){
        this.NumData={}
        this.formData={}
        this.formPostData = {}
        this.formScoreData={}
        this.checkboxsum=[]
        this.selboxsum={}
        this.allData={}
        this.rawData={}
        this.test=[]
        this.score=0
        // this.nurse=""
        // this.wid = null
        this.formId=""
        this.widFormCode=""
        this.testResultWater=""
        this.testResultPaste=""
        this.testResultAdvice=""
        this.testform=''
        this.testform1=''
        this.testform2=''
      },
      close(){
        this.dialogFormVisible = false
        this.$refs.testFormModal.close();
      },
      show(){
        this.dialogFormVisible = true
      },
      getsize(formCode){
       return formCode==='form_swallowing'?'medium':'big'
      },
      gettype(tag){
          if(tag&&tag.expand&&JSON.parse(tag.expand).type){
            return JSON.parse(tag.expand).type
          }else{
            return tag.type
          }
        },
      // changtag(e){
      //   console.log(e,"e")
      //   this.getData(this.formCode)
      // },
      selectClicked(e,tag){
        console.log(e,tag,this.formData,this.NumData,"selectClicked")
      },
      genArrayToListData(arr){
        let ret = []
        arr.map(item=>{
          ret.push({label:item,value:item})
        })
        return ret
      },
       saveJson(){
        console.log("保存",this.NumData)
        this.getJsonFormData(this.NumData)


        // this.formData[this.formCode + '_eval_date']=this.evalDate

        if(!this.sendData[this.formCode + '_eval_date']){
          this.sendData[this.formCode + '_eval_date']=this.evalDate
        }

        console.log(this.NumData,this.sendData,"this.sendData")
          //保存
          Formsave(
            this.sendData
          ).then(res => {
            this.bus.$emit('refreshTree')
            console.log(res,"保存成功")
           let ids = ""
           if(res){
             ids = `${res.data.data.formCode}:${res.data.data.id}`
             console.log("saveJson:formData",this.widFormCode,this.rawData.formData,this.rawData.formData['form_all_first_form_ids_callback'])
             let idd = this.rawData.formData['form_all_first_form_ids_callback']?this.rawData.formData['form_all_first_form_ids_callback'].find(id=>{return id.indexOf(this.formCode)>-1}):""
            // let obj = JSON.parse(JSON.stringify(this.rawData.formData['form_all_first_form_ids_callback']))
             if(!idd||idd===""){
              this.rawData.formData['form_all_first_form_ids_callback'].push(ids)
             }
             console.log("saveJson:idd",idd,this.rawData.formData['form_all_first_form_ids_callback'])
           }
           // this.cleardata()
           // rawData.formData[widFormCode+'_form_ids_callback']
            this.close()
          });
      },
      selectChange(e,tag,name,type){
        console.log('selectChange',e,tag,"name",name)
      },
      tagClicked(e,tag,name,type){
        console.log('tagClicked',e,tag,"name",name)

        this.formname=name
        if(type==="radio"){
        if(this.formData&&this.formData[name]===tag.value){
          e.target.checked = e.target.checked?false:true;
          if(!e.target.checked){
            this.formData[name]=""
            this.NumData[name]=""
          }
        }else if(this.formData&&this.formData[name]===""){
          this.NumData[name]=tag.sortValue
        }
        // this.sumScore(this.formScoreData)
        }else if(type==="checkbox"){

           tag.isSelected=!tag.isSelected
           console.log("checkbox",name,tag.isSelected)
           this.NumData[name]=tag.isSelected
          //  if(tag.isSelected)
          //  {
          //     this.NumData[name].push("on,")
          //  }
          // else if(tag.isSelected===false){
          //   //  this.NumData[name]=[]
          //   this.NumData[name]=[]
          //   }
          console.log(this.NumData,this.formData,"miao")
          this.NumData[name] = this.formData[name]
        }else if(type==="select"){

          //  tag.isSelected=!tag.isSelected
           console.log("select",name,tag)
           return
           if(!this.NumData[name]) {
              this.NumData[name]=tag
              this.formData[name] = this.NumData[name]||""
              console.log(this.NumData[name],this.formData[name],"this.NumData[name]")
           }else{
            this.NumData[name]=""
            this.formData[name] = this.NumData[name]||""
            console.log(this.NumData[name],this.formData[name],"this.NumData[name]")
            }
            // if(tag==='+'){
            //   document.getElementsByClassName("input el-input__inner").style.background= "red"
            // }
          console.log(this.NumData,this.formData,"this.NumData")
        }else{
           this.NumData[name]=e
            console.log(this.NumData,this.formData,"this.NumData")
            this.formData[name] = this.NumData[name]||""
        }
      },
      sumScore(scoreData=this.formScoreData){
        console.log('computed-score',scoreData)
        this.score = 0
        for (let key in scoreData) {
          if (scoreData.hasOwnProperty(key)) {
            let element = scoreData[key];
            this.score += element
          }
        }
      },
        getJsonFormData(data){
        console.log("获取NumData",data)
            let info = {
              // "id":  this.$route.query.id||"",
              "id":  this.formId||"",
              "diags": this.$route.query.diags||"",
              "formCode": this.formCode,
              "patientId": this.$route.query.patientId,
              "visitId": this.$route.query.visitId,
              "name": this.$route.query.name,
              "sex": this.$route.query.sex,
              "age": this.$route.query.age,
              "deptCode": this.$route.query.deptCode,
              "deptName": this.$route.query.deptName,
              "bedLabel": this.$route.query.bedLabel,
              "inpNo": this.$route.query.inpNo,
              "wardCode": this.$route.query.wardCode,
              "wardName": this.$route.query.wardName,
              "diags": this.$route.query.diags,
              // paramMap:Sendformdata,
            }
            let Sendformdata={}
           if(this.formCode==='form_caprini'||this.formCode==='form_padua'){
           Object.keys(data).forEach(function(key){
            if(data[key].constructor===Array){
              Sendformdata[key]=data[key].toString()||""
            }
            else{
              Sendformdata[key]=data[key]||""
            }
          });
          info[paramMap]=Sendformdata;
        }
        else{
          Object.assign(info, this.NumData)
          Object.keys(info).forEach(function(key){
            if( typeof(info[key])==='object'||typeof(info[key])==='boolean'){
              info[key]=info[key].toString()||""
            }else{
              info[key]=info[key]||""
            }
          });
        }


        //
        this.keysMapping()


        console.log('!!!this.rawData',this.rawData, Sendformdata,this.formData)


        this.sendData=info
      },
      keysMapping(){
        for (let key in this.keysMap) {
          if (this.keysMap.hasOwnProperty(key)&&this.rawData&&this.rawData.formData) {
            let formKey = this.keysMap[key].key;
            let retKey = this.keysMap[key].value(this.formData[formKey])
            console.log('!!!!keysMapping',key,formKey,retKey)
            if( typeof(this.rawData.formData[key])==='object'){
              this.rawData.formData[key] = retKey||this.formData[formKey]||[]
            }else{
              this.rawData.formData[key] = retKey||this.formData[formKey]||""
            }
          }
        }
      },
    //  getData(){
    //       //加载动画
    //       this.formChangeLoading = true
    //       // this.formCode=formCode
    //       this.cleardata()
    //       // 获取 表单存储数据元 回填数据入表中
    //       findAllRecord_form(
    //         this.formCode,
    //         this.$route.query.patientId,
    //         this.$route.query.visitId
    //       ).then(res => {
    //         this.allData=res.data.data
    //         console.log("this.allData", this.allData);
    //         this.title=this.allData.documentName
    //         for (let key in this.allData.documentItemDtos) {
    //           if (this.allData.documentItemDtos.hasOwnProperty(key)) {
    //             if(this.allData.documentItemDtos[key].documentItemLists.length>0){
    //              let alldata= this.allData.documentItemDtos[key].documentItemLists
    //               for (let key in alldata) {
    //                 if (alldata.hasOwnProperty(key)) {
    //                   let element = this.gettype(alldata[key]);
    //                   let ele=alldata[key]
    //                   this.formData[ele.name]=""
    //                   this.NumData[ele.name]=""
    //                   }
    //               }
    //            }
    //           }
    //         }
    //        this.evalDetail_form(this.formId)
    //         console.log(this.formData,this.NumData)
    //         // this.formChangeLoading = false
    //       });
    //  },
    //    evalDetail_form(id){
    //     console.log(id,"id")
    //       evalDetail_form(
    //         id
    //       ).then(res => {
    //         console.log(res,"*/*/")
    //         this.NumData=res.data.data.pageMap
    //           let data=this.NumData
    //           // let info=this.formData
    //           let cdata={}
    //           Object.keys(data).forEach(function(key){
    //             // console.log(data[key],key,"data[key]")
    //           if(data[key]){
    //             if(data[key]==='true'){
    //             console.log(data[key],"data[key]")
    //             // info[key]=true
    //             // console.log(key,cdata[key])
    //             cdata[key]=true
    //             console.log(cdata[key],"cdata[key]")
    //             // this.formData[name].isSelected=true
    //           }
    //           else{
    //             cdata[key]=data[key]
    //             }
    //           }
    //         });
    //         this.formData=cdata
    //         console.log(this.formData,"this.formData000")
    //         this.formChangeLoading = false
    //       });
    //  },
      initial(){

      let Data=null

       try {
          this.formChangeLoading = true //加载动画
          // this.cleardata()

          this.allData={}




          // if(!this.formId){
          //   return;
          // }

          // 获取表单模版
          let getFormTemplage = (formCode) =>{
            this.allData= JSON.parse(JSON.stringify(formJSONDocument[formCode]))  //formJSONDocument[formCode]  //res[1].data.data

            // console.log('表单内容:',this.allData,JSON.stringify(this.allData,null,4))

            Data=this.allData.documentItemDtos
            this.title=this.allData.documentName
            this.evalDate=dayjs().format('YYYY-MM-DD HH:mm')||""

            console.log(this.allData,Data,this.formData,"初始化this.formData")

            for (let key in Data) {
              if (Data.hasOwnProperty(key)) {
                if(Data[key].documentItemLists.length>0){
                let List=Data[key].documentItemLists
                  for (let tag in List) {
                    if (List.hasOwnProperty(tag)) {
                      let element = List[tag];
                      // if(element&&this.gettype(element)==='select'){
                      //   this.formData[element.name]=""
                      // }else{
                        if(element&&element.name){
                          this.formData[element.name]=""
                          this.NumData[element.name]=""
                          this.formPostData[element.name]=""
                        }
                      // }
                    }
                  }
               }
              }
            }
            this.formData[this.formCode + '_eval_date']=this.evalDate
            console.log(this.formData,"---初始化this.formData")
          }

          getFormTemplage(this.formCode)

          // formJSONDocument

          // Promise.all(
          //   [
          //     evalDetail_form(this.formId),
          //     findAllRecord_form(this.formCode,this.$route.query.patientId,this.$route.query.visitId)
          // ]).then(res => {

          Promise.all(
            [
              evalDetail_form(this.formId)
          ]).then(res => {
            console.log(res,res[0],"res[0]")
            // 处理获取
            this.formData = {}
            this.testform=''
            this.testform1=''
            this.testform2=''

            // this.allData=res[1].data.data

            // console.log('表单内容:',this.allData,JSON.stringify(this.allData,null,4))


            // let Data=this.allData.documentItemDtos
            // this.title=res[1].data.data.documentName
            // this.evalDate=dayjs().format('YYYY-MM-DD HH:mm')||""

            // console.log(this.allData,Data,this.formData,"初始化this.formData")

            // for (let key in Data) {
            //   if (Data.hasOwnProperty(key)) {
            //     if(Data[key].documentItemLists.length>0){
            //     let List=Data[key].documentItemLists
            //       for (let tag in List) {
            //         if (List.hasOwnProperty(tag)) {
            //           let element = List[tag];
            //           // if(element&&this.gettype(element)==='select'){
            //           //   this.formData[element.name]=""
            //           // }else{
            //             if(element&&element.name){
            //               this.formData[element.name]=""
            //               this.NumData[element.name]=""
            //               this.formPostData[element.name]=""
            //             }
            //           // }
            //         }
            //       }
            //    }
            //   }
            // }
            // this.formData[this.formCode + '_eval_date']=this.evalDate
            // console.log(this.formData,"---初始化this.formData")





            // 获取回填数据
           if(this.formId){

              let data=JSON.parse(JSON.stringify(res[0].data.data.pageMap))

              console.log('获取回填数据',data,this.formData)
              this.NumData = {}

              for (let key in data) {
                  this.NumData[key.toLowerCase()] = data[key] || ''
              }

              // for (let key in this.formData) {
              //   let element = this.formData[key]

              //     if(data[key.toUpperCase()]){
              //     this.NumData[key]=data[key.toUpperCase()]
              //     // console.log("string大写",this.NumData[key])
              //     }else{
              //       this.NumData[key]=data[key]
              //     // console.log("string小写",this.NumData[key])
              //     }
              // }
              console.log(this.NumData,"this.NumData")

            Data=this.allData.documentItemDtos
             //res[1]
            for (let key in Data) {
              if (Data.hasOwnProperty(key)) {
                if(Data[key].documentItemLists.length>0){
                  for (let tag in Data[key].documentItemLists) {
                    if (Data[key].documentItemLists.hasOwnProperty(tag)) {
                      let elt = Data[key].documentItemLists[tag];
                      if(this.NumData[elt.name]){
                        elt.saveValue=this.NumData[elt.name]
                      }
                      console.log('=====elemnt=====',elt,"eltm",elt.name,this.NumData,this.NumData[elt.name],elt.saveValue,typeof (this.NumData[elt.name]))
                      if(typeof (this.NumData[elt.name])){
                        if(elt.type==="checkbox"){
                          console.log(this.NumData[elt.name],"this.NumData[elt.name]")
                          if(this.NumData[elt.name]&&this.NumData[elt.name]=='true'){
                            this.formData[elt.name]=true
                          }
                          else{
                            this.formData[elt.name]=false
                          }
                        } else if(elt.type==="text"){
                          console.log("text",elt)
                          this.formData[elt.name]=this.NumData[elt.name]||""

                          // if(elt.name==='form_swallowing_swallow_water_result')
                          //   this.testform=this.formData[elt.name]||""
                          // else if(elt.name==='form_swallowing_swallow_paste_result')
                          //   this.testform1=this.formData[elt.name]||""
                          // else if(elt.name==='form_swallowing_advice_jstype_or_jsway')
                          //     this.testform2=this.formData[elt.name]||""
                        }
                      }else{
                        this.formData[elt.name]=""
                      }




                    }
                  }
                }
              }
            }
              this.testResultPaste = this.formData[this.formCode + '_swallow_paste_result']||this.NumData[this.formCode + '_swallow_paste_result']||""
              this.testResultWater = this.formData[this.formCode + '_swallow_water_result']||this.NumData[this.formCode + '_swallow_water_result']||""
              this.testResultAdvice =  this.formData[this.formCode + '_advice_jstype_or_jsway']||this.NumData[this.formCode + '_advice_jstype_or_jsway']||""
              this.evalDate=this.NumData[this.formCode +"_eval_date"]
              console.log(this.formData,this.NumData,"回填数据",this.formCode +"_eval_date",this.NumData[this.formCode +"_eval_date"],this.evalDate)
           }
            this.formChangeLoading = false
          });
       }
        catch (error) {
         console.log("getData:", error);
       }
     }
    },
    watch: {
      // formData:{
      //   handler: function (newVal,oldVal){
      //          console.log("!!!!formdata",newVal)
      //         this.keysMapping()
      //       },
      //   deep: true    //深度监听
      //  },
      //  testform:{
      //    handler: function (newVal) {
      //         let element=this.formname
      //         this.formData[element]=this.testform
      //     },
      //   deep: true    //深度监听
      //  },
      //  testform1:{
      //    handler: function (newVal) {
      //         let element=this.formname
      //         this.formData[element]=this.testform1
      //     },
      //   deep: true    //深度监听
      //  },
      //  testform2:{
      //    handler: function (newVal) {
      //         let element=this.formname
      //         this.formData[element]=this.testform2
      //     },
      //   deep: true    //深度监听
      //  }
        testResultPaste(val){
          console.log('newTestResultPaste:',val)
          this.formData[this.formCode + '_swallow_paste_result'] = val
          this.NumData[this.formCode + '_swallow_paste_result'] = val
        },
        testResultWater(val){
          console.log('newTestResultWater:',val)
          this.formData[this.formCode + '_swallow_water_result'] = val
          this.NumData[this.formCode + '_swallow_water_result'] = val
        },
        testResultAdvice(val){
          console.log('newTestResultAdvice:',val)
          this.formData[this.formCode + '_advice_jstype_or_jsway'] = val
          this.NumData[this.formCode + '_advice_jstype_or_jsway'] = val
        },
        evalDate(val){
          console.log('newEvalDate:',val)
          this.formData[this.formCode + '_eval_date'] = dayjs(val).format('YYYY-MM-DD HH:mm')
          this.NumData[this.formCode + '_eval_date'] = dayjs(val).format('YYYY-MM-DD HH:mm')
        },
      },
    created() {
    },
    components: {
    }
  }

</script>
