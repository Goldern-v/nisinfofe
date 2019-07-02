<template>
<div>
 <sweet-modal ref="testModal" :size="allData.formCode==='form_swallowing'?'medium':'big'" :title="title" width='50%' :overlay-theme="title"  style="z-index: 10002;" >
        <div class="Navigation">
            <div class="border-top">
             <span><span class="span-title"> 得分：</span><span class="span-box box1">{{score}}</span></span></span>
             <span><span class="span-title margin-left"> 评估人：</span><span class="span-box box2">{{nurse}}</span></span></span>
              <!-- <span>评估人：{{nurse}}</span> -->
              <span><span style="display:inline-block;margin-left:-87px">评估日期：</span>
              <el-date-picker
                v-model="evalDate"
                type="datetime"
                align="center"
                format="yyyy-MM-dd HH:mm"
                placeholder="输入签名时间"
                class="date-picker box3">
              </el-date-picker></span>
          </div>
          <!-- <div v-if="allData.formCode==='form_caprini'||allData.formCode==='form_padua'" >
              <el-radio slot="label" size="small" v-model="formCode" label="form_caprini"  @click.native="changetag('form_caprini')">VTE风险评估量表(手术科室)
              </el-radio>
              <el-radio slot="label" size="small" v-model="formCode" label="form_padua"  @click.native="changetag('form_padua')">VTE风险评估量表(非手术科室)
              </el-radio>form_capriniform_padua
          </div> -->
          <ul v-if="allData.formCode==='form_caprini'||allData.formCode==='form_padua'">
            <li id="form_caprini" :class="allData.formCode=='form_caprini'?'active':''" v-model="formCode" @click="changetag('form_caprini')">手术科室</li>
            <li id="form_padua" :class="allData.formCode=='form_padua'?'active':''" v-model="formCode" @click="changetag('form_padua')">非手术科室</li>
          </ul>
        </div>
        <div ref="message" :form-code="formCode" v-loading="formChangeLoading" style="min-height:400px" >
            <div  v-for="(item,index) in allData.documentItemDtos" :key="index" class="testdialog">
              <span class="title-score" :style="item.style" v-if="item.documentDescription =='5分/项'||item.documentDescription =='3分/项'||item.documentDescription =='1分/项'||item.documentDescription =='2分/项'">【{{item.documentDescription}}】</span>
              <span class="title-score" :style="item.style" v-else>{{item.documentDescription}}</span>
                <span v-for='(tag,i) in item.documentItemLists' :key="i">
                  <el-tooltip  :content="tag.score+'分,'+tag.value" placement="top" style="width:auto;min-width: 105px;margin: 5px;" >
                  <!-- 单选 -->
                    <el-radio-group v-if="(gettype(item.documentItemLists[0])==='radio'||item.documentItemLists[0].type=='text'||gettype(item.documentItemLists[0])==='checkbox')&&tag.type==='radio'" v-model="formData[item.documentItemLists[0].name]"  @click.native="tagClicked($event,tag,item.documentItemLists[0].name,tag.type)">
                      {{(tag.expand?(JSON.parse(tag.expand)).type:tag.type)}}
                    <el-radio size="small"
                    :name="tag.name"
                    :label="tag.expand?(JSON.parse(tag.expand)).label:tag.value"
                    :type="tag.type"
                    :score="tag.score"
                    :checked="tag.isSelected">{{tag.expand?(JSON.parse(tag.expand)).label:tag.value}}</el-radio>
                   <!-- {{NumData[item.documentItemLists[0].name]}} -->
                    </el-radio-group>
                  </el-tooltip>
                    <!-- 多选 -->
                  <el-checkbox-group  v-if="(gettype(item.documentItemLists[0])==='radio'||item.documentItemLists[0].type=='text'||gettype(item.documentItemLists[0])==='checkbox')&&tag.type==='checkbox'" v-model="formData[item.documentItemLists[0].name]">
                  <el-checkbox size="small"
                  :label="tag.value"
                  :name="tag.name"
                  :type="tag.type"
                  :score="tag.score"
                  :key="tag.value"
                  :checked="tag.isSelected"
                  @change="tagClicked($event,tag,item.documentItemLists[0].name,tag.type)" style="width:700px">{{tag.value}}</el-checkbox>
                  </el-checkbox-group>
                      <!-- 文本 -->
                    <el-input  v-if="(gettype(item.documentItemLists[0])==='radio'||item.documentItemLists[0].type=='text'||gettype(item.documentItemLists[0])==='checkbox')&&tag.type==='text'" v-model="formData[item.documentItemLists[0].name]" @input="tagClicked($event,tag,item.documentItemLists[0].name,tag.type)" placeholder="请输入内容" class="tag_text" style="width:80%;margin-left:-15px "></el-input>
                  </span>

                  <!-- 下拉框 -->
                  <!-- 下拉框单选 -->
                  <el-select v-if="gettype(item.documentItemLists[0])==='select'&&item.documentItemLists[0].type==='radio'" v-model="formData[item.documentItemLists[0].name]"
                  clearable
                  placeholder="请选择"
                  size="medium"
                  class="select" >
                        <el-option v-for='(option,i) in item.documentItemLists'
                        :key="option.value"
                        :label="option.value"
                        :value="option.value+','+option.score"  @click.native="tagClicked($event,option,item.documentItemLists[0].name,option.type)">
                        </el-option>
                  </el-select>
                  <!-- 下拉框多选 -->
                  <el-select v-if="gettype(item.documentItemLists[0])==='select'&&item.documentItemLists[0].type==='checkbox'"  v-model="test" multiple placeholder="请选择" size="medium" class="select">
                      <el-option v-for='(option,i) in item.documentItemLists'  :key="option.value+i" :label="option.label" :value="option.value+','+option.score"  @click.native="tagClicked($event,option,item.documentItemLists[0].name,option.expand?(JSON.parse(option.expand)).type:option.type)">
                        </el-option>
                  </el-select>
              </div>
      </div>

    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click.stop="$refs.testModal.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click.stop="saveJson()">保存</el-button>
      <!-- <el-button class="modal-btn" type="primary" @click.stop="toSign()">签名</el-button> -->


    </div>
</sweet-modal>
</div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

.sweet-content
  min-height 100px!important
.name-title
  font-size 14px;
  margin 15px 0 10px
  font-weight bold
.span-title
  margin-left 20px
  margin-top 10px
.margin-left
  margin-left -45px
.span-box
  border 1px solid rgba(203, 213, 221, 1)
  width 40px
  height 37px
  background rgba(238,246,245,1)
  border-radius 3px;
  line-height 37px
  text-indent:1em
.box1
  position relative
  top -3px
  left -30px
.box2
  position relative
  top -3px
  left -15px
.box3
  position relative !important
  top -5px !important
  left -15px !important
.Navigation
  min-height 65px
  max-height 100px
  padding 0
  margin -20px -20px 0 -20px
  background rgba(247,250,250,1)
  border-bottom 1px solid rgba(203, 213, 221, 1)
  margin-bottom 10px
.Navigation ul
  list-style none
  height 40px
  margin-top 5px
.Navigation ul li
  float left
  width 130px
  color rgba(51, 51, 51, 1)
  border-radius 3px
  font-size 13px
  line-height 40px
  // border-right 1px solid rgba(203, 213, 221, 1)
  text-indent 2.6em
.Navigation ul li:hover
  // border-top 3px solid rgba(75, 176, 141, 1)
  cursor pointer
.active
  border-top 3px solid rgba(75, 176, 141, 1)
  background  #fff
  height 38px
  border-right 1px solid rgba(203, 213, 221, 1)
  border-left 1px solid rgba(203, 213, 221, 1)
.el-tabs__active-bar
  background-color none
.right
  width 48%
  border-right 1px solid #EAEEF1
  float left
.left
  width 48%
  padding-left 25px
  // border-left 1px solid #333333
  float left
>>>.el-input
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    min-height: 40px;
    height auto
    top:3px
    // border: 1px solid #c1c1c1;
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
  height: 28px !important
  font-size: 13px !important;
  padding: 0 5px;
  margin-left -30px !important
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
  margin: -5px 5px;
  height: auto;
.testdialog span
  display inline-block

span.title
  // padding-left: 50px;
  // padding-right: 100px;
  line-height: 35px;
  font-size: 13px;
  width 25%
  // min-width 20%
span.title-score
  // padding-left: 50px;
  // padding-right: 100px;
  line-height: 30px;
  font-size: 14px;
  width 25%
  margin-top 15px
  // min-width 20%
span.title_swallowing
  line-height: 35px;
  font-size: 13px;
  width 98%
 .border-top
  // border-top 1px solid #000000
  line-height 40px
  clear both
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
.el-radio-group
  width 80%
  label.el-radio
    min-width 100px
    padding 4px 4px
    // width 18%
    border-radius 0px
    // border #4bb08d 1px solid
    // border 1px dashed rgb(191, 217, 210)
    border none
    // border 1px solid rgb(191, 217, 210)
    // margin-bottom 8px
    // margin-right 8px
    font-size 12px
    &:hover
      outline 1px solid #4bb08d
    &:active
      outline 1px solid #4bb08d
  // .el-radio__input.is-checked .el-radio-group
  //   border #4bb08d 1px solid
  // .el-radio-group.is-checked
  //    border 1px solid red
  // .el-radio__inner
  //   border 1px solid rgb(191, 217, 210)
  span.el-checkbox__label
    font-size 12px
.el-checkbox-group
  width 100%
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
.select
  width 50% !important
  >>>.el-input__inner
       width 100%!important
.tag_text
  width 250px !important
  margin-left 10px !important
  height 42px
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
  width 160px !important
  height 39px !important
.el-input--medium
  margin-left -5px

</style>
<script>
import {changePassword} from '@/api/index.js'
import dayjs from 'dayjs'
import common from '@/common/mixin/common.mixin.js'
import bus from 'vue-happy-bus'
import {
  findAllRecord_form,//获取表单数据
  Formsave,//保存
  Formsave_VTE,//保存VTE
  evalDetail_form//获取表单回填数据
} from "@/api/form_hj"

import {formJSONDocument} from "./json/index.js"

// import testFormDialog from './testFormDialog.vue'
// import { queryInfo } from '@/common/tool.js'
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
        top: "0",//window.document.querySelector('.form-contain').scrollTop+""||""
        NumData:{},
        // {
        //     [this.formCode + '_eval_date']: dayjs().format('YYYY-MM-DD HH:mm')||"",
        //     [this.formCode + '_eval_score']: this.score,
        //   },
        formScoreData:{},
        checkboxsum:[],
        selboxsum:{},
        allData:{},
        rawData:{},
        test:[],
        formname:"",
        idsCallback:"",
        title:"默认",
        formChangeLoading:false,
        formData:{},
        evalDate:dayjs().format('YYYY-MM-DD HH:mm')||"",
        score:0,
        nurse:localStorage && localStorage.user? JSON.parse(localStorage.user).empName: "",
        formId:"",
        formCode:"",
        widFormCode:"",
        wid:null,
        //VTE风险评估量表(手术科室):form_caprini;Braden压疮风险护理单:form_pressure_risk;VTE风险评估量表(非手术科室):form_padua;自理能力评估单:form_selfcare; 跌倒评估护理单:form_fall;吞咽评估单:form_swallowing
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
        this.formData = {}
        this.allData = params.items||{}
        this.formCode=params.formCode
        this.widFormCode = params.widFormCode||""
        this.wid = params.wid||null
        this.formId=  params.id||""
        this.rawData = params.rawData||{}
        if(!this.formCode){
          console.log('error: the formCode cannot be found',this.formCode)
          return
        }

        if(this.rawData){
          this.idsCallback = this.rawData.formData['form_all_first_form_ids_callback']
        }


        this.$refs.testModal.open()
        this.allData={}
        this.getFormTemplage(this.formCode)


        // this.getData()
        // this.evalDetail_form(2912)
        this.$nextTick(function () {
          setTimeout(() => {
            this.initial()
          }, 100);
        });
      },
      cleardata(){
        this.NumData={}
        // {
        //             [this.formCode + '_eval_date']: dayjs().format('YYYY-MM-DD HH:mm')||"",
        //             [this.formCode + '_eval_score']: this.score,
        //           }
        this.formData={}
        this.formScoreData={}
        this.checkboxsum=[]
        this.selboxsum={}
        this.allData={}
        // this.rawData={}
        this.test=[]
        this.score=0
        this.nurse=localStorage && localStorage.user? JSON.parse(localStorage.user).empName: ""
        // this.widFormCode=""
      },
      close(){
        this.dialogFormVisible = false
        this.$refs.testModal.close();
      },
      show(){
        this.dialogFormVisible = true
      },
      changetag(formCode){
        this.formCode = formCode
        this.allData.formCode = formCode
        this.cleardata()
        this.allData={}
        this.getFormTemplage(this.formCode)
        // this.initial()
        this.formId = ""
        if(this.idsCallback){
          // this.idsCallback.find()
          let result =this.idsCallback.find((item)=>{
              let name = item.split(':')[0];
              let id =  item.split(':')[1];
              console.log(name,id)
              if(name===formCode){
                return id
              }
            })
          if(result){
            this.formId = result.split(':')[1]
          }
        }
        console.log('====changetag',this.idsCallback,this.formCode,this.formId)
        setTimeout(() => {
            this.initial()
          }, 100);
      },
      getsize(formCode){
       return formCode==='form_swallowing'?'medium':'big'
      },
       gettype(tag){
           if(tag)
        {
          if(tag.expand){
          return (JSON.parse(tag.expand).type)?JSON.parse(tag.expand).type:tag.type
        }
        else  {
          return tag.type
          }
        }
       },
      saveJson(){
        console.log("保存",this.formCode)
        this.getJsonFormData(this.NumData)

        // score
        this.formData[this.formCode+'_eval_score'] = this.score||-1
        this.NumData[this.formCode+'_eval_score'] = this.score||-1
        this.formData[this.formCode+'_eval_date']= dayjs().format('YYYY-MM-DD HH:mm')||""
        this.NumData[this.formCode+'_eval_date']= dayjs().format('YYYY-MM-DD HH:mm')||""

        this.keysMapping()

        console.log(this.formCode,this.NumData,this.sendData,"***")
        if(this.formCode=="form_caprini"||this.formCode=="form_padua"){

        this.sendData['paramMap'][this.formCode+'_eval_score'] = ""+this.score||-1
        this.sendData['paramMap'][this.formCode+'_eval_date']= dayjs().format('YYYY-MM-DD HH:mm')||""
            //保存
          Formsave_VTE(
            this.sendData
          ).then(res => {
            this.bus.$emit('refreshTree')
            if(this.wid.wid&&this.wid.wid.messageBox){this.wid.wid.messageBox.show(this.title+'保存成功','success',3000)}
           console.log(this.wid,res,"保存成功")
            let ids = ""
            if(res){
              this.widFormCode = this.allData.formCode +''
              ids = `${res.data.data.formCode}:${res.data.data.id}`
              console.log("saveJson:formData",this.widFormCode,this.rawData.formData)

              console.log("saveJson:_form_ids_callback",this.rawData.formData['form_all_first_form_ids_callback'])

              let idd = this.rawData.formData['form_all_first_form_ids_callback']?this.rawData.formData['form_all_first_form_ids_callback'].find(id=>{return id.indexOf(this.formCode)>-1}):""
              // let obj = JSON.parse(JSON.stringify(this.rawData.formData['form_all_first_form_ids_callback']))
              if(!idd||idd===""){
                this.rawData.formData['form_all_first_form_ids_callback'].push(ids)
              }
              console.log("saveJson:idd",idd,this.rawData.formData['form_all_first_form_ids_callback'])
            }
           this.close()
          });
        }else{

          this.sendData[this.formCode+'_eval_score'] = this.score||-1
          this.sendData[this.formCode+'_eval_date']= dayjs().format('YYYY-MM-DD HH:mm')||""
          console.log( this.sendData)
          //保存
          Formsave(
            this.sendData
          ).then(res => {
            this.bus.$emit('refreshTree')
            if(this.wid.wid&&this.wid.wid.messageBox){this.wid.wid.messageBox.show(this.title+'保存成功','success',3000)}
           console.log(this.wid,res,"保存成功")
           let ids = ""
            if(res){
              this.widFormCode = this.allData.formCode +''
              ids = `${res.data.data.formCode}:${res.data.data.id}`
              console.log("saveJson:formData",this.widFormCode,this.rawData.formData,this.rawData.formData['form_all_first_form_ids_callback'])
              let idd = this.rawData.formData['form_all_first_form_ids_callback']?this.rawData.formData['form_all_first_form_ids_callback'].find(id=>{return id.indexOf(this.formCode)>-1}):""
              // let obj = JSON.parse(JSON.stringify(this.rawData.formData['form_all_first_form_ids_callback']))
              if(!idd||idd===""){
                this.rawData.formData['form_all_first_form_ids_callback'].push(ids)
              }
              console.log("saveJson:idd",idd,this.rawData.formData['form_all_first_form_ids_callback'])
            }
            this.close()
          });
        }
      },
       tagClicked(e,tag,name,type){
        console.log('tagClicked',e,tag,"name",name,this.formScoreData[name])
        this.formname=name
        if(type==="radio"||type==="select"&&tag.type==="radio"){
           this.formScoreData[name]=tag.score
          if(this.formData&&this.formData[name]===tag.value){
            e.target.checked = e.target.checked?false:true;
            if(!e.target.checked){
              this.formData[name]=""
              this.NumData[name]=""
              this.formScoreData[name]=0
            }
          }else if(this.formData){ //&&this.formData[name]===""
            // this.formData[name]=tag.value
            this.formScoreData[name]=tag.score
            this.NumData[name]=tag.saveValue
          }
          this.sumScore(this.formScoreData)
        }else if(type==="checkbox"||type==="select"&&tag.type==="checkbox"){
          console.log("checkbox",name)
           tag.isSelected=!tag.isSelected
           let sum=0
          if(!this.selboxsum[name]){
            this.selboxsum[name]=[]
            this.NumData[name]=[]
            this.selboxsum[name].push(tag.score)
            this.NumData[name].push(tag.saveValue)
            // console.log("**-----",this.NumData[name],this.NumData)
            this.selboxsum[name].map(item=>{
               sum += item
             })
             this.formScoreData[name]=sum
              console.log( "空",this.NumData,this.selboxsum[name]," this.NumData[name]")
              this.sumScore(this.formScoreData)
          }else{
           if(tag.isSelected){
              this.selboxsum[name].push(tag.score)
              this.NumData[name].push(tag.saveValue)
              console.log("加",this.NumData[name], this.selboxsum[name])
              this.selboxsum[name].map(item=>{
               sum += item
             })
             this.formScoreData[name]=sum
             this.sumScore(this.formScoreData,this.selboxsum[name])
           }else if(tag.isSelected===false){
             this.selboxsum[name].splice(this.selboxsum[name].indexOf(tag.score),1)
             this.NumData[name].splice(this.NumData[name].indexOf(tag.saveValue),1)
              console.log("减",this.NumData[name],this.selboxsum[name])
              this.selboxsum[name].map(item=>{
               sum += item
             })
              this.formScoreData[name]=sum
              this.sumScore(this.formScoreData)
            }
          }
        }else{
          this.NumData[name]=e
        }
        //  else if(type==="select"){
        //   console.log("select")
        //   tag.isSelected=!tag.isSelected
        //   console.log(e.target.checked,"e.target.checked**",tag.isSelected,"tag.isSelected")
        //     let sum=0
        //    if(tag.isSelected){
        //      console.log("加",this.checkboxsum[name],tag.score)
        //       this.checkboxsum.push(tag.score)
        //       this.NumData[name].push(tag.sortValue)
        //     //  this.formScoreData[name]=this.checkboxsum[name]
        //      console.log("加++",this.checkboxsum, this.NumData[name])
        //      this.checkboxsum.map(item=>{
        //        sum += item
        //      })
        //       this.formScoreData[name]=sum
        //        this.sumScore(this.formScoreData)
        //     //  return this.formScoreData[name]
        //    }
        //   else if(!tag.isSelected){
        //    console.log("减",this.checkboxsum,tag.score)
        //     this.checkboxsum.splice(tag.score,1)
        //     this.NumData[name].splice(tag.sortValue,1)
        //      this.checkboxsum.map(item=>{
        //        sum += item
        //      })
        //       this.formScoreData[name]=sum
        //      console.log("减--",this.checkboxsum, this.NumData[name])
        //     //  return this.formScoreData[name]
        //     }
        //   //  }
        //     this.sumScore(this.formScoreData)
        // }
        // let Data={
        //   FormData:this.FormData
        //   }
      },
      sumScore(scoreData=this.formScoreData){
        console.log('computed-score',scoreData)
        this.score = 0
        for (const key in scoreData) {
          if (scoreData.hasOwnProperty(key)) {
            const element = scoreData[key];
            this.score += element
          }
        }
      },
      getJsonFormData(data){
        console.log("获取NumData",data,this.formCode)
            let info = {
              "id":  this.formId,
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
            }
            let Sendformdata={}
            console.log('----this.formCode',this.formCode, this.NumData,data)
           if(this.formCode==='form_caprini'||this.formCode==='form_padua'){
           Object.keys(data).forEach(key=>{
             if(key.indexOf(this.formCode)===-1){return}
              //  Sendformdata[key]=data[key].toString()
              if(data[key].constructor===Array){
                Sendformdata[key]=data[key].toString()
              }else{
                Sendformdata[key]=data[key]
              }

          });
          console.log(Sendformdata,"Sendformdata",this.formCode)
          info['paramMap']=Sendformdata;

        }else{
          Object.assign(info, this.NumData)
          console.log('----getJsonFormData',info, this.NumData)
          Object.keys(info).forEach(function(key){
            // if(info[key].constructor===Array){
            //   info[key]=info[key].toString()
            // }
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
        //
        this.sendData=info
        return this.sendData
      },
      keysMapping(){
        for (let key in this.keysMap) {
          if (this.keysMap.hasOwnProperty(key)&&this.rawData&&this.rawData.formData) {
            let formKey = this.keysMap[key].key;
            if(formKey.indexOf(this.formCode)===-1){formKey=this.formCode+'_'+formKey}
            let retKey = this.keysMap[key].value(this.formData[formKey])
            console.log('!!!!keysMapping',key,formKey,retKey,this.$route.query[formKey])
            if( typeof(this.rawData.formData[key])==='object'){
              this.rawData.formData[key] = retKey||this.formData[formKey]||this.$route.query[formKey]||[]
            }else{
              this.rawData.formData[key] = retKey||this.formData[formKey]||this.$route.query[formKey]||""
            }
          }
        }
      },
    //  getData(){
    //       //加载动画
    //       this.formChangeLoading = true
    //       // this.formCode=formCode
    //       // this.cleardata()
    //       // 获取 表单存储数据元 回填数据入表中
    //       findAllRecord_form(
    //         this.formCode,
    //         this.$route.query.patientId,
    //         this.$route.query.visitId
    //       ).then(res => {
    //         this.allData={}
    //         this.allData=res.data.data
    //         console.log("this.allData", this.allData);
    //         this.title=this.allData.documentName
    //         for (let key in this.allData.documentItemDtos) {
    //           if (this.allData.documentItemDtos.hasOwnProperty(key)) {
    //             if(this.allData.documentItemDtos[key].documentItemLists.length>0){
    //               //  console.log(this.allData.documentItemDtos[key].documentItemLists[0],"key")
    //             // if(!this.NumData){
    //              if(this.allData.documentItemDtos[key].documentItemLists[0].type==='checkbox'){
    //               //  console.log(this.allData.documentItemDtos[key].documentItemLists[0].name)
    //               this.formData[this.allData.documentItemDtos[key].documentItemLists[0].name]=[]
    //               // this.NumData[this.allData.documentItemDtos[key].documentItemLists[0].name]=[]
    //             }
    //             else if(!(this.allData.documentItemDtos[key].documentName==="诊断")||!(this.allData.documentItemDtos[key].documentItemLists[0].type==='checkbox')){
    //                 this.formData[this.allData.documentItemDtos[key].documentItemLists[0].name]=""
    //                 // this.NumData[this.allData.documentItemDtos[key].documentItemLists[0].name]=""
    //             }
    //             // }
    //             // else{
    //               for (const tag in this.allData.documentItemDtos[key].documentItemLists) {
    //                 if (this.allData.documentItemDtos[key].documentItemLists.hasOwnProperty(tag)) {
    //                   const elt = this.allData.documentItemDtos[key].documentItemLists[tag];
    //                   let tempData=this.upperJSONKey(this.NumData)
    //                   console.log(elt,"eltm",elt.name,tempData,tempData[elt.name],typeof (tempData[elt.name]),elt.sortValue)
    //                   // let type=tempData[elt.name].constructortempData[elt.name].constructor==Array
    //                 if(typeof (tempData[elt.name]) === "object")
    //                 {
    //                   if(tempData[elt.name].indexOf(elt.sortValue)>-1)
    //                     {
    //                        console.log(tempData[elt.name].indexOf(elt.sortValue),this.formData[elt.name],"this.formData[elt.name]888")
    //                       this.formData[elt.name].push(elt.value)
    //                       console.log(tempData[elt.name].indexOf(elt.sortValue),this.formData[elt.name],"this.formData[elt.name]wwwww")
    //                     }
    //                  }
    //                  else{
    //                     console.log(tempData[elt.name],this.formData[elt.name],elt.sortValue,"this.formData[elt.name]111")
    //                   //  this.formData[elt.name]=tempData[elt.name]
    //                    console.log(this.formData[elt.name],"this.formData[elt.name]")
    //                  }
    //                 }
    //               }
    //             // }
    //            }
    //           }
    //         }
    //       this.formChangeLoading = false
    //       console.log(this.formData,this.NumData,"**")
    //       });
    //  },
      upperJSONKey(jsonObj){
        let newObj = {}
       for (const key in jsonObj) {
         if (jsonObj.hasOwnProperty(key)) {
           const element = jsonObj[key];
           newObj[key.toLowerCase()] = element;
         }
       }
      console.log('upperJSONKey',newObj)
      for (var key in this.formData){
          if(typeof(this.formData[key])==='object'){
            this.formData[key] = Object.assign(this.formData[key],newObj[key.toLowerCase()])
          }else{
            this.formData[key] = newObj[key.toLowerCase()]
          }
      }
    console.log('--upperJSONKey',this.formData)
    return this.formData;
      },
    evalDetail_form(id){
         this.cleardata()
        //  let id=this.$route.query.id||""
        console.log(id,"id")
          evalDetail_form(
            id
          ).then(res => {
             console.log(res.data.data.pageMap,"*/*/")
             let data=res.data.data.pageMap
            //  let data=this.upperJSONKey(a)
             console.log("---this.formData",this.formData,data)
             for (const key in this.formData) {
                for (const item in data){
               if (this.formData.hasOwnProperty(key)) {
                 console.log(data[item],"key",this.formData[key].constructor,"**************")
                 if(this.formData[key].constructor===Array )
                 {
                   this.NumData[item]=data[item].split(",")
                 }
                 else{
                   this.NumData[item]=data[item].toString()
                 }
                 console.log("========",this.NumData[item],typeof(this.NumData[item]),item,"this.formData")
               }
              }
             }
          });
     },
     // 获取表单模版
      getFormTemplage(formCode){
        this.allData= JSON.parse(JSON.stringify(formJSONDocument[formCode])) //res[1].data.data

        // console.log('表单内容:',this.allData,JSON.stringify(this.allData,null,4))

        let FormDocData=this.allData.documentItemDtos
        this.title=this.allData.documentName
        for (let key in FormDocData) {
          if (FormDocData.hasOwnProperty(key)) {
            if(FormDocData[key].documentItemLists.length>0){
            let List=FormDocData[key].documentItemLists
              for (let tag in List) {
                if (List.hasOwnProperty(tag)) {
                  let element = List[tag];
                  if(element.type==='checkbox'){
                    this.formData[element.name]=[]
                    this.selboxsum[element.name]=[]
                    this.NumData[element.name]=[]
                  }
                  else if(!(FormDocData[key].documentName==="诊断")||(!element.type==='checkbox')){
                    this.formData[element.name]=""
                    this.selboxsum[element.name]=""
                    this.NumData[element.name]=""}
                }
              }
            }
          }
        }
        console.log('获取表单模版',this.formData,this.NumData,FormDocData)

        return FormDocData
      },
     initial(){
         //加载动画
          this.formChangeLoading = true

       try {
          // Promise.all([
          //   evalDetail_form(this.formId),
          //   findAllRecord_form(this.formCode,this.$route.query.patientId,this.$route.query.visitId)
          //   ]).then(res => {


          Promise.all([
            evalDetail_form(this.formId)
            ]).then(res => {
            console.log('this.formId',this.formId,res[0],"res[0]")


            //   this.allData=res[1].data.data

            // console.log('表单内容:',this.allData,JSON.stringify(this.allData,null,4))

            //    let Data=this.allData.documentItemDtos
            //  this.title=res[1].data.data.documentName
            // for (let key in Data) {
            //   if (Data.hasOwnProperty(key)) {
            //     if(Data[key].documentItemLists.length>0){
            //     let List=Data[key].documentItemLists
            //       for (const tag in List) {
            //         if (List.hasOwnProperty(tag)) {
            //           const element = List[tag];
            //           if(element.type==='checkbox'){
            //             this.formData[element.name]=[]
            //             this.selboxsum[element.name]=[]
            //             this.NumData[element.name]=[]
            //           }
            //           else if(!(Data[key].documentName==="诊断")||(!element.type==='checkbox')){
            //             this.formData[element.name]=""
            //             this.selboxsum[element.name]=""
            //             this.NumData[element.name]=""}
            //         }
            //       }
            //    }
            //   }
            // }


            //
            console.log(this.formData,"初始化this.formData",this.formCode)
            this.evalDate=dayjs().format('YYYY-MM-DD HH:mm')||""
            this.formData[this.formCode + '_eval_date']=this.evalDate



            //
             if(this.formId)
             {
               let data=JSON.parse(JSON.stringify(res[0].data.data.pageMap))

               console.log('获取回填数据',data,this.formData)
              this.NumData = {}


             //处理字段大小写
             for (let key in data) {
                // let element = this.formData[key]
               if(this.formData.hasOwnProperty(key.toLowerCase()) && this.formData[key.toLowerCase()].constructor===Array)
                {
                  if(data.hasOwnProperty(key.toUpperCase())){
                    this.NumData[key.toLowerCase()]=data[key.toUpperCase()].split(",")
                  }else{
                    this.NumData[key.toLowerCase()]=data[key]?data[key].split(","):''
                  }

                }else{
                  if(data.hasOwnProperty(key.toUpperCase())){
                  this.NumData[key.toLowerCase()]=data[key.toUpperCase()]
                  }else{
                  this.NumData[key.toLowerCase()]=data[key]?data[key]:''
                  }
                }

                if(this.NumData[key.toLowerCase()].constructor===Array){
                  this.formData[key.toLowerCase()] = [...data[key]]
                }else{
                  this.formData[key.toLowerCase()] = data[key] + ''
                }

             }
             console.log("*******************",this.NumData,data,this.formData,"this.NumData")


             let FormDocData=this.allData.documentItemDtos
             //res[1]
            for (let key in FormDocData) {
              if (FormDocData.hasOwnProperty(key)) {
                if(FormDocData[key].documentItemLists.length>0){
                  for (const tag in FormDocData[key].documentItemLists) {
                    if (FormDocData[key].documentItemLists.hasOwnProperty(tag)) {
                      const elt = FormDocData[key].documentItemLists[tag];
                      console.log(elt
                      ,"eltm"
                      ,elt.name
                      ,this.NumData
                      ,this.NumData[elt.name]
                      ,typeof (this.NumData[elt.name])
                      ,elt.saveValue)
                    // if(typeof (this.NumData[elt.name])){
                     if(typeof (this.NumData[elt.name]) === "object")
                     {
                          let sum=0
                          if(this.NumData[elt.name].indexOf(elt.sortValue)>-1){
                             this.formData[elt.name].push(elt.value)
                            //  elt['isSelected'] = true
                          }
                          else{
                             this.test=this.NumData[elt.name]
                          }
                          if(this.NumData[elt.name].indexOf(elt.saveValue)>-1){
                           this.selboxsum[elt.name].push(elt.score)
                           }
                           this.selboxsum[elt.name].map(item=>{
                             sum += item
                           })
                          this.formScoreData[elt.name]=sum
                      // if(this.NumData[elt.name].indexOf(elt.sortValue)>-1)
                      //   {
                      //     this.formData[elt.name].push(elt.value)
                      //     this.selboxsum[elt.name].push(elt.score)
                      //     this.selboxsum[elt.name].map(item=>{
                      //        sum += item
                      //      })
                      //     this.formScoreData[elt.name]=sum
                      //   }
                      //   else{
                      //     this.test=this.NumData[elt.name]
                      //      let sum=0
                      //      if(this.NumData[elt.name].indexOf(elt.saveValue)>-1){
                      //      this.selboxsum[elt.name].push(elt.score)
                      //      }
                      //      this.selboxsum[elt.name].map(item=>{
                      //        sum += item
                      //      })
                      //     this.formScoreData[elt.name]=sum
                      //   }
                     }
                     else{
                       if(this.NumData[elt.name]==elt.saveValue){
                        this.formData[elt.name]=elt.expand?JSON.parse(elt.expand).label?(JSON.parse(elt.expand)).label:elt.value:elt.value
                        this.formScoreData[elt.name]=elt.score
                      }
                       else if(elt.type==="text"){
                        //  console.log("text")
                         this.formData[elt.name]=this.NumData[elt.name]
                       }
                     }
                    // }
                    }
                  }
                }
              }
            }
              this.sumScore(this.formScoreData)
              this.evalDate=this.NumData[this.formCode +"_eval_date"]
              console.log(this.formData,this.NumData,"回填数据",this.formCode +"_eval_date",this.NumData[this.formCode +"_eval_date"],this.evalDate)

          }
           this.formChangeLoading = false
           this.$forceUpdate();
          });






       }
        catch (error) {
         console.log("getData:", error);
       }
     }
    },
    watch: {
      formData:{
        handler: function (newVal,oldVal){
            //  this.allData=newVal;
               console.log("formdata",newVal,oldVal)
              //  for (const key in newVal) {
              //    if (newVal.hasOwnProperty(key)) {
              //   const element = newVal[key];
              //   if(!newVal[key]){
              //     console.log("////***")
              //     this.formScoreData[key]=0
              //     console.log(this.formScoreData[key],"this.formScoreData[key]",key)
              //    }
              //   }
              // }
              // console.log(this.formScoreData,"this.formScoreData**")
              // this.sumScore(this.formScoreData)
            },
        deep: true    //深度监听
       },
      // formCode:{
      //   handler: function (newVal,oldVal){
      //         var a=document.getElementById(this.formCode)
      //         console.log(a)
      //         a.classList.add("active")
      //         if(this.formCode=='form_caprini')
      //         {
      //           document.getElementById("form_caprini").classList.add("active")
      //           document.getElementById("form_padua").classList.remove("active")
      //         }else{
      //           document.getElementById("form_padua").classList.add("active")
      //           document.getElementById("form_caprini").classList.remove("active")
      //         }
      //       },
      //   deep: true    //深度监听
      //  },
      },
    components: {
        // testFormDialog
    }
  }

</script>
