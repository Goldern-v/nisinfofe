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

          <el-tab-pane label="固定项目"
                       name="1">
            <div class="input-row"
                 flex="main:justify">
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">体温：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.temperature">
                <div class="uniq">℃</div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">脉搏：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.pulse">
                <div class="uniq">次/分</div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">呼吸：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.breathing">
                <div class="uniq">次/分</div>
              </div>
            </div>
            <div class="input-row"
                 flex="main:justify">
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">血压：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.bloodPressure"
                       @keydown="spaceToKey($event,staticObj, 'bloodPressure')">
                <div class="uniq">mmHg</div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">意识：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.consciousness"
                       v-autoComplete="{dataList: dictionary.consciousness, obj:staticObj, key: 'consciousness'}">
                <div class="uniq"></div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">SPO2：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.saturationOfBloodOxygen"
                       >
                <div class="uniq">%</div>
              </div>
            </div>
            <div flex-box="1"></div>
            <div class="input-row"
                 flex="main:justify">
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">瞳孔(大小)</div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="2">
                <div class="label">左：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.leftPupilSize">
                <div class="uniq">mm</div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="2">
                <div class="label">右：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.rightPupilSize">
                <div class="uniq">mm</div>
              </div>
              <div flex-box="2"></div>
            </div>
            <div class="input-row"
                 flex="main:justify">
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">瞳孔(反射)</div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="2">
                <div class="label">左：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.leftPupilReflex"
                       v-autoComplete="{dataList: ['+', '-', '±', ''], obj:staticObj, key: 'leftPupilReflex'}">
                <div class="uniq"></div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="2">
                <div class="label">右：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.rightPupilReflex"
                       v-autoComplete="{dataList: ['+', '-', '±', ''], obj:staticObj, key: 'rightPupilReflex'}">
                <div class="uniq"></div>
              </div>
              <div flex-box="2"></div>
            </div>

            <div class="input-row"
                 flex="main:justify">
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">CPR:</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.rescueMeasuresCpr"
                       v-autoComplete="{dataList: ['√', ''], obj:staticObj, key: 'rescueMeasuresCpr'}">
                <div class="uniq"></div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">肾上腺素:</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.rescueMeasuresAdrenaline"
                       v-autoComplete="{dataList: ['√', ''], obj:staticObj, key: 'rescueMeasuresAdrenaline'}">
                <div class="uniq">mg</div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   flex-box="1">
                <div class="label">阿托品:</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.rescueMeasuresAtropine"
                       v-autoComplete="{dataList: ['√', ''], obj:staticObj, key: 'rescueMeasuresAtropine'}"
                       >
                <div class="uniq">mg</div>
              </div>
            </div>


            <!-- <div class="input-row"
                 flex="main:left">
              <div class="input-cell"
                   flex="cross:center">
                <div class="label">入量名称：</div>
                <input type="text"
                       :readonly="isRead"
                       style="width: 195px"
                       v-model="staticObj.food">
                <div class="uniq"></div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   style="margin-left: 4px">
                <div class="label">量：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.foodSize">
                <div class="uniq">ml</div>
              </div>
              <div flex-box="1"></div>
            </div>
            <div class="input-row"
                 flex="main:left">
              <div class="input-cell"
                   flex="cross:center">
                <div class="label">出量名称：</div>
                <input type="text"
                       :readonly="isRead"
                       style="width: 195px"
                       v-model="staticObj.discharge">
                <div class="uniq"></div>
              </div>
              <div class="input-cell"
                   flex="cross:center"
                   style="margin-left: 4px">
                <div class="label">量：</div>
                <input type="text"
                       :readonly="isRead"
                       v-model="staticObj.dischargeSize">
                <div class="uniq">ml</div>
              </div>
              <div flex-box="1"></div>
            </div> -->
          </el-tab-pane>
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
          <el-tab-pane label="特殊情况记录"
                       name="3">
            <div class="title"
                 flex="cross:center main:justify">
              <span>病情、药物治疗、护理措施、效果</span>
              <span style="color: #284FC2;cursor: pointer"
                    @click="openTemplateSlider">+模板</span>
            </div>
            <el-input type="textarea"
                      class="text-con"
                      :readonly="isRead"
                      v-model="doc"></el-input>
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
      this.formCode = config.formInfo.formCode
      this.sheetInfo.sheetType = config.formInfo.formCode
      sheetInfo.sheetType = config.formInfo.formCode
      console.log('customTitle',this.customTitle, sheetInfo)

      if(record){
        // 判断是否能编辑
        let tr = record //record[record.length - 1]
          // let isRead
          let status = tr.signerName || ''//tr.find(item => item.key == "signerName").value;
          let empNo = tr.signerNo || ''//tr.find(item => item.key == "signerNo").value;
          // if (status >= 1) {
            if (empNo == JSON.parse(localStorage.user).empNo) {
              this.isRead = true;
            } else {
              this.isRead = false;
            }
          // } else {
          //   isRead = false;
          // }
        // this.isRead = isRead
        this.table = config.table
        let decodeData = config.record //decoder_record(config.record)
        this.staticObj = decodeData.data
        this.dictionary = config.dictionary
        // 特殊记录组合
        // let doc = ''
        if(record){
          // for (let i = 0; i < record.length; i++) {
            // doc += record.data[this.recordKeyName] || '' //(record[i].find((item) => item.key == this.recordKeyName).value || '')
          // }
          this.dateStr = record.dateStr ||'' //record[0].find((item) => item.key == 'dateStr').value || ''
        }

        // if (sheetInfo.sheetType == 'jointnew' || sheetInfo.sheetType == 'endocrinologynew' || sheetInfo.sheetType == 'neurology') {
          // var reg = new RegExp(" ", "g");
          // doc = doc.replace(reg, "");
        // }


      sheetInfo.sheetType = config.formInfo.formCode
      this.sheetInfo.sheetType = config.formInfo.formCode

        // this.doc = doc
        this.doc = record.data[this.recordKeyName]
        // for (let j = 0; j < sheetModel.length; j++) {
        //   for (let k = 0; k < sheetModel[j].bodyModel.length; k++) {
        //     if (sheetModel[j].bodyModel[k] === this.record[this.record.length - 1]) {
        //       this.lastZ = j
        //       this.lastY = k
        //     }
        //   }
        // }

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
      // var GetLength = function (str) {
      //   var realLength = 0, len = str.length, charCode = -1;
      //   for (var i = 0; i < len; i++) {
      //     charCode = str.charCodeAt(i);
      //     if (charCode >= 0 && charCode <= 128) realLength += 1;
      //     else realLength += 2;
      //   }
      //   return realLength;
      // }
      // let result = []
      // let text = ''
      // let allDoc = this.doc
      // if (sheetInfo.sheetType == 'jointnew' || sheetInfo.sheetType == 'endocrinologynew' || sheetInfo.sheetType == 'neurology') {
      //   allDoc = '    ' + this.doc
      // }
      // for (let i = 0; i < allDoc.length; i++) {
      //   let charCode = allDoc.charCodeAt(i);
      //   if (charCode == '65292' || charCode == '12290' || charCode == '65307' || charCode == '44' || charCode == '46' || charCode == '65306' || charCode == '58') {
      //     text += allDoc[i]
      //   } else {
      //     if (GetLength(text) > 23) {
      //       result.push(text)
      //       text = allDoc[i]
      //     } else {
      //       text += allDoc[i]
      //     }
      //   }
      // }
      // if (text) {
      //   result.push(text)
      // }
      // if (result.length == 0) {
      //   result.push('')
      // }
      // for (let i = 0; i < this.record.length; i++) {
      //   this.record[i].find((item) => item.key == this.recordKeyName).value = ''
      // }
      // for (let i = 0; i < result.length; i++) {
      //   if (i == 0) {
      //     mergeTr(this.record[0], this.staticObj)
      //   }
      //   if (this.record[i]) {
      //     this.record[i].find((item) => item.key == this.recordKeyName).value = result[i]
      //   } else {
      //     let currRow = JSON.parse(JSON.stringify(this.record[0]))
      //     let nullRowArr = nullRow()

      //     nullRowArr.find(item => item.key == 'recordSource').value = currRow.find(item => item.key == 'recordSource').value
      //     nullRowArr.find(item => item.key == 'dateStr').value = currRow.find(item => item.key == 'dateStr').value

      //     sheetModel[this.lastZ].bodyModel.splice(this.lastY + 1, 0, nullRowArr)
      //     this.lastY++
      //     sheetModel[this.lastZ].bodyModel[this.lastY].find((item) => item.key == this.recordKeyName).value = result[i]
      //   }
      // }
      this.bus.$emit('saveSheetPage')
      this.close()
    },
    openTemplateSlider() {
      // this.$message.warning('正在开发中'+this.formCode)
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
    // 获取字典项
    // listItem('意识', 'neurology').then(res => {
    //   this.dictionary.consciousness = res.data.data.map((item) => {
    //     return item.code
    //   })
    // })
    // listItem('入量名称', 'neurology').then(res => {
    //   this.dictionary.food = res.data.data.map((item) => {
    //     return item.code
    //   })
    // })
    // listItem('出量名称', 'neurology').then(res => {
    //   this.dictionary.discharge = res.data.data.map((item) => {
    //     return item.code
    //   })
    // })
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
