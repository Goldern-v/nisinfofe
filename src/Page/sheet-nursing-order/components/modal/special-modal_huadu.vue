<template>
  <div ref="textArea">
    <sweet-modal ref="modal"
                 @close="breforeClose"
                 :modalWidth="720"
                 :title="title"
                 :enable-mobile-fullscreen="false">
      <div id="specialForm">
        <div flex="cross:center"
             class="special-date-con">
          <div class="label">日期：</div>
          <input type="text"
                 :placeholder="autoDate"
                 :disabled="dateStr != ''"
                 v-model="staticObj.dateStr"
                 @keydown="dateKey($event, staticObj, 'dateStr')">
          <div style="width: 30px"></div>
          <div class="label">时间：</div>
          <input type="text"
                 :disabled="dateStr != ''"
                 v-model="staticObj.timeStr"
                 @keydown="timeKey($event, staticObj, 'timeStr')">
        </div>
        <el-tabs v-model="activeTab"
                 class="tab-content"
                 type="card">
          <el-tab-pane label="自定义项目"
                       name="2">
            <div class="custom-cell"
                 v-for="(item, index) in customTitle"
                 :key="item.key">
              <div class="custom-box"
                   flex="cross:center">
                <div class="label">{{item.label}}</div>
                <input type="text"
                       @keydown="f1Key($event,staticObj, item.name)"
                       v-model="staticObj[item.name]"
                       :readonly="check[index] || isRead"
                       v-autoComplete="{dataList: dictionary[item.label], obj:staticObj, key: item.name}"
                      >
                <div class="button">
                  <el-checkbox v-model="check[index]" :disabled="isRead"></el-checkbox>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="button">
        <el-button class="modal-btn"
                   @click="close">取消</el-button>
        <el-button class="modal-btn"
                   type="primary"
                   @click="post"
                   v-show="!isRead">保存</el-button>
        <el-button class="modal-btn"
                   type="primary"
                   @click="post"
                   v-show="!isRead">签名</el-button>
      </div>
    </sweet-modal>
    <templateSlide :formCode='formCode' ref="templateSlide"></templateSlide>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title
  font-size 14px
  color #333333
.text-con
  margin-top 20px
  margin-bottom 20px
  >>>textarea
    height 200px
.special-date-con
  margin 0 0 18px 0
  .label
    font-size 14px
    color #333333
  input
    background #FFFFFF
    border 1px solid #CBD5DD
    border-radius 2px
    height 30px
    width 60px
    outline none
    text-align center
.tab-content
  >>>.el-tabs__header
    margin-left -20px
    margin-right -20px
    background #F7FAFA
  >>>.el-tabs__item
    height 37px
    border-radius 0
    border-top 3px solid transparent
    border-bottom 3px solid transparent
    &.is-active
      background #fff
      border-radius 0
      border-top 3px solid #4BB08D
      border-bottom 3px solid transparent
      box-sizing border-box
      font-weight bold
      line-height 33px
      color #333
  >>>.el-tabs__item
    line-height 37px
>>>
  .el-tabs
    min-height 340px
.input-row
  margin-bottom 12px
.input-cell
  &[flex-box]
    width 0
  .label
    font-size 14px
    color #333333
  input
    background #FFFFFF
    border 1px solid #CBD5DD
    border-radius 2px
    height 32px
    width 107px
    outline none
    text-align center
    margin-left 5px
    margin-right 12px
.tab-content
  .custom-cell
    &:nth-of-type(2n) .custom-box
      padding-left 15px
.custom-cell
  float left
  width 50%
  margin-bottom 10px
  .custom-box
    box-sizing border-box
    .label
      background #EEF6F5
      height 34px
      font-size 14px
      color #333333
      box-sizing border-box
      padding-left 13px
      border 1px solid #CBD5DD
      width 100px
      border-radius 2px 0 0 2px
      display flex
      align-items center
    input
      width 190px
      height 34px
      font-size 14px
      padding-left 13px
      box-sizing border-box
      border 1px solid #CBD5DD
      border-left 0
      border-radius 0 2px 2px 0
      outline none
    .button
      margin-left 9px
</style>
<script>
import bus from 'vue-happy-bus'
import { nullRow } from '@/Page/sheet-page/components/render/Body.js'
import sheetModel from '@/Page/sheet-page/sheet.js'
import templateSlide from './template-slide.vue'
import sheetInfo from '../config/sheetInfo'
import { decoder_title, decoder_record } from './render/decode.js'
import { mergeTr } from './render/render.js'
import { dateKey, timeKey } from '../config/keyEvent/date.js'
import { offset } from '../sheetTable/components/excel/tool.js'
import { listItem } from '../../api/recordDesc.js'
import { FormToEnter } from '@/plugin/tool/FormToTab.js'
import $ from 'jquery'
import { EINPROGRESS } from 'constants';
export default {
  directives: {
    autoComplete: {
      update(el, bind) {
        let dataList = bind.value.dataList
        let obj = bind.value.obj
        let key = bind.value.key
        if (dataList) {
          el.onfocus = (e) => {
            if(el.readOnly) return
            // let scrollTop = document.querySelector('.sheetTable-contain').scrollTop||0
            // let scrollLeft = document.querySelector('.sheetTable-contain').scrollLeft||0
            let xy = e.target.getBoundingClientRect()
            console.log('autoComplete',e.target,e,e.target.clientWidth)
            setTimeout(() => {
              window.openAutoComplete({
                style: {
                  top: `${xy.top + 34}px`,
                  left: `${xy.left}px`,
                  width: e.target.clientWidth+2+'px',
                  minWidth: 'auto'
                },
                data: dataList,
                callback: function (data) {
                  // console.log(obj, key)
                  if (data) {
                    obj[key] = data
                  }
                },
                id: key
              })
            })
          }
          el.onblur = (e) => {
            setTimeout(() => {
              window.closeAutoComplete(key)
            }, 400)
          }
        }
      }
    }
  },
  data() {
    return {
      bus: bus(this),
      doc: '',
      dateStr: '',
      recordKeyName: 'exceptionalCase',
      record: [],
      table: [],
      lastZ: 0,
      lastY: 0,
      activeTab: '1',
      customTitle: [],
      staticObj: {},
      sheetInfo,
      formCode:"",
      isRead: false,
      isSave: false,
      config: {},
      dictionary: {
        consciousness: [],
        discharge: [],
        food: [],
      },
      check: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    }
  },
  computed: {
    title() {
      if(this.dateStr) {
        if(this.isRead) {
          return '已签名，不可以编辑&nbsp;&nbsp;&nbsp;&nbsp;' + this.dateStr
        } else {
          return '编辑护理记录&nbsp;&nbsp;&nbsp;&nbsp;' + this.dateStr
        }
      } else {
        return '新建护理记录'
      }
    },
    autoDate() {
      if(this.dateStr) {
        return new Date(this.dateStr).Format('MM-dd')
      } else {
        return ''
      }
    },
    // 神经内科
    isNeurology() {
      return this.sheetInfo.sheetType == 'neurology'
    },
  },
  methods: {
    open(config) {
      console.log(config);
      this.config = config
      console.log('config',config)
      setTimeout(() => {
        window.closeAutoCompleteNoId()
      }, 300)
      let record = config.record
      this.record = record
      this.customTitle = decoder_title(config.thead)
      let tab = config.tab || '1'
      // formInfo
      
      config.formInfo = {formCode:config.sheetInfo.sheetType}
      this.formCode = config.formInfo.formCode
      this.sheetInfo.sheetType = config.formInfo.formCode
      sheetInfo.sheetType = config.formInfo.formCode
      console.log('customTitle',this.customTitle, sheetInfo)

      if(record){
        // 判断是否能编辑
        let tr = record 
          let status = tr.signerName || ''
          let empNo = tr.signerNo || ''
            if (empNo == JSON.parse(localStorage.user).empNo) {
              this.isRead = true;
            } else {
              this.isRead = false;
            }
          
        this.table = config.table
        let decodeData = config.record 
        this.staticObj = decodeData.data
        this.dictionary = config.dictionary
        // 特殊记录组合
        if(record){
          this.dateStr = record.dateStr ||'' //record[0].find((item) => item.key == 'dateStr').value || ''
        }
      sheetInfo.sheetType = config.formInfo.formCode
      this.sheetInfo.sheetType = config.formInfo.formCode

        // this.doc = doc
        this.doc = record.data[this.recordKeyName]
        if(record.id){
          this.dateStr = record.data.dateStr
        }else{
          this.dateStr = ''
        }
      }


      this.$refs.modal.open()
      this.check = [false, false, false, false, false, false, false, false, false, false]

      console.log('open-',this.isRead,this.dateStr,this.formCode,record)

        this.activeTab = tab || '1'
        if(tab == '1') {
          setTimeout(() => {$('#specialForm input')[2].focus()}, 100)
        } else if(tab == '2') {
          setTimeout(() => {$('#specialForm .custom-box input')[0].focus()}, 100)
        } else if(tab == '3') {
          setTimeout(() => {this.$refs.textArea.querySelector('.text-con textarea').focus()}, 100)
        }

      setTimeout(() => {
        let elelist = $('#specialForm input[type="text"]')
        FormToEnter(elelist)
      }, 100)
    },
    close() {
      this.isSave = false
      this.$refs.modal.close()
    },
    post() {
      this.isSave = true
      sheetInfo.sheetType = this.sheetInfo.sheetType

      this.staticObj[this.recordKeyName] = this.doc

      let wid = document.querySelector('.assessment-iframe').contentWindow
      if(wid){
        wid.saveForm()
      }
      this.bus.$emit('saveSheetPage')
      this.close()
    },
    openTemplateSlider() {
      this.$refs.templateSlide.open(this.formCode)
    },
    breforeClose() {
      if(!this.isSave){
        console.log('breforeClose:',this.config)
        if(this.config.callback&&this.config.record){
          this.config.callback(this.config.record.id||'',this.config)
        }
      }

      this.$refs.templateSlide.close()
    },
    dateKey,
    timeKey,
    spaceToKey(e, obj, key) {
      if(e.keyCode == 32) {
        obj[key] += "/"
        e.preventDefault();
      }
    },
    f1Key(e, obj, key) {
      if(e.keyCode == 192) {
        obj[key] += "✓"
        e.preventDefault();
      }
    }
  },
  mounted() {
    this.formCode = ""
    // 打开特殊情况
    window.openSpecialModalOrder = (config) => {
      this.open(config)
    }
  },
  created() {
    this.bus.$on('addTemplateAtDoc', (val) => {
      this.doc = this.doc + val
    })
    
  },
  watch: {
    check: {
      deep: true,
      handler() {
        for(let i = 0; i < this.customTitle.length; i++) {
          if(this.check[i]) {
            this.staticObj[this.customTitle[i].key] = '✓'
          }
        }
      }
    }
  },
  components: {
    templateSlide
  }
}
</script>
