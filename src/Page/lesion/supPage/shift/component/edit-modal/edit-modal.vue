<template>
  <div class="modal-con">
    <sweet-modal ref="modal"
                 :modalWidth="760"
                 title="新建交班"
                 :enable-mobile-fullscreen="false"
                 overlay-theme="">
      <div class="modal-con"
       v-loading="modalLoading"
      element-loading-text="自动生成数据中...">          
      <div class="contain"
           ref="contain"
          >
        <div class="info"
             flex="cross:center">
          <span class="label">
            交班日期：
          </span>
          <div class="value-box"
               style="width: 120px">
            {{form.deliverDate}}
          </div>
          <span class="label">
            班次：
          </span>
          <div class="value-box"
               style="width: 60px">
            {{form.range}}
          </div>
          <span class="label">
            交班人：
          </span>
          <div class="value-box"
               style="width: 86px">
            {{form.delivererName}}
          </div>
          <span class="label">
            接班人：
          </span>
          <div class="value-box"
               style="width: 86px;margin-right:0">
            {{form.receiverName}}
          </div>
        </div>
        <div class="line"></div>
        <div>
          <span class="label">
            病房动态：
          </span>
        </div>
        <div class="form-line"
             flex="cross:center">
          <span class="form-label">
            病人数：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.patientTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            出<span style="opacity: 0">空</span>院：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.outHospitalTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            转<span style="opacity: 0">空</span>出：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.transOutTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            死<span style="opacity: 0">空</span>亡：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.deathTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        </div>
        <div class="form-line"
             flex="cross:center">
          <span class="form-label">
            入<span style="opacity: 0">空</span>院：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.inHospitalTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            转<span style="opacity: 0">空</span>入：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.transInTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            病<span style="opacity: 0">空</span>危：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.dangerTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            病<span style="opacity: 0">空</span>重：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.seriousTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        </div>
        <div class="form-line"
             flex="cross:center">
          <span class="form-label">
            特<span style="opacity: 0">空</span>级：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.specialGradeTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            手<span style="opacity: 0">空</span>术：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.operationTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            分<span style="opacity: 0">空</span>娩：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.parturitionTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
          <span class="form-label">
            预手术：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.preoperationTotal"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        </div>

        <div class="form-line"
             flex="cross:center">
          <span class="form-label">
            一<span style="opacity: 0">空</span>级：
          </span>
          <input type="number"
                 class="form-input"
                 v-model="form.nursingFirst"
                 onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                 onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
           <div>
        </div>
         </div>
          <span class="label">
            自动外出
          </span>
        <textarea class="text-con"
                  placeholder="请输入内容"
                  v-model="form.autoOutTotal"></textarea>
        <div>
          <span class="label">
            交班记录
          </span>
        </div>
        <textarea class="text-con"
                  placeholder="请输入内容"
                  v-model="form.note"
                  style="height: 315px"></textarea>
        <div class="footer-form">
          <div class="ff-title">
            护理安全质量指标
          </div>
          <div class="form-line"
               flex="cross:center">
            <span class="form-label">
              高危药物外渗的发生例次：
            </span>
            <input type="number"
                   class="form-input"
                   style="margin-right: 50px"
                   v-model="form.gwDrugNum">
            <span class="form-label">
              输液反应例次：
            </span>
            <input type="number"
                   class="form-input"
                   style="margin-right: 50px"
                   v-model="form.syReactionNum">
            <span class="form-label">
              输血反应例次：
            </span>
            <input type="number"
                   class="form-input"
                   style="margin-right: 0px"
                   v-model="form.sxReactionNum">
          </div>
          <footerForm ref="footerForm"
                      :form="form"></footerForm>
        </div>
      </div>
      </div>
      <div slot="button"
           style="text-align:center;">
        <el-button class="modal-btn"
                   @click="getRealTimeData"
                   :disabled="form.status != 0 && !this.isCreator">自动生成数据</el-button>
        <el-button class="modal-btn"
                   type="primary"
                   @click="save()"
                   :disabled="form.status != 0 && !this.isCreator">保&nbsp;&nbsp;存</el-button>
        <el-button class="modal-btn"
                   type="primary"
                   @click="d_sign"
                   :disabled="form.status != 0">交班人签名</el-button>
        <el-button class="modal-btn"
                   type="primary"
                   @click="r_sign"
                   :disabled="form.status != 1">接班人签名</el-button>
        <el-button class="modal-btn"
                   @click="print">打印预览</el-button>
      </div> 
    </sweet-modal>
    <signModal ref="signModal"
               title="交班提醒"
               label="确认要交班吗？交班后将无法修改，请谨慎操作"
               placeholder="输入登录密码以确认交班"
               overlayTheme="no-bg"></signModal>
    <signModal ref="signModal2"
               title="接班提醒"
               label="确认要接班吗？接班后将无法修改，请谨慎操作"
               placeholder="输入登录密码以确认接班"
               overlayTheme="no-bg"></signModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal-con
  height 100%
.contain
  font-size 14px
  color #333333
  overflow auto
  height 70vh
  padding 10px
  box-sizing border-box

.label
  font-size 14px
  color #333333

.value-box
  background #EEEEEE
  border 1px solid #CBD5DD
  border-radius 2px
  height 32px
  padding-left 14px
  line-height 32px
  font-size 14px
  color #333333
  margin-right 13px

.line
  height 1px
  background #EAEEF1
  margin 20px 0 10px

.contain .form-line
  margin-bottom 10px

  &:first-child
    margin-top 5px

  .form-input
    background #FFFFFF
    border 1px solid #CBD5DD
    border-radius 2px
    height 32px
    width 70px
    margin-right 56px
    margin-left 2px
    padding-left 10px
    box-sizing border-box
    outline none

    &:last-child
      margin-right 0

    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button
      -webkit-appearance none !important
      margin 0

.text-con
  background #FFFFFF
  border 1px solid #CBD5DD
  border-radius 2px
  height 65px
  padding 8px 15px
  box-sizing border-box
  width 100%
  resize none
  outline none
  margin 10px 0

.footer-form
  border-top 1px dashed #333333
  margin-top 10px

  .ff-title
    font-size 18px
    color #333333
    text-align center
    margin-top 30px
    margin-bottom 15px

.modal-btn
  width 116px

.modal-con
  >>>.sweet-buttons
    background #F7FAFA
    box-sizing border-box

  >>>.sweet-content
    border-bottom 1px solid #EAEEF1
</style>

<script>
import {
  operate,
  realTimeData
} from '@/api/shift'
import signModal from '../../../../../../components/modal/sign'
import footerForm from './footer-form'
export default {
  data () {
    return {
      modalLoading: false,
      form: {
        delivererName: '',
        receiverName: '',
        deliverDate: '',
        range: '',
        patientTotal: '',
        seriousTotal: '',
        inHospitalTotal: '',
        outHospitalTotal: '',
        transInTotal: '',
        transOutTotal: '',
        parturitionTotal: '',
        operationTotal: '',
        deathTotal: '',
        preoperationTotal: '',
        nursingFirst: '',
        autoOutTotal: '',
        specialGradeTotal: '',
        dangerTotal: '',
        note: '',
        id: '',
        status: 0,
        "gwDrugNum": '',
        "syReactionNum": '',
        "sxReactionNum": '',
        "wgYyzgBed": null,
        "wgXzzgBed": null,
        "wgUEBed": null,
        "ngYyzgBed": null,
        "ngXzzgBed": null,
        "ngUEBed": null,
        "qgdgYyzgBed": null,
        "qgdgXzzgBed": null,
        "qgdgUEBed": null,
        "szmdgYyzgBed": null,
        "szmdgXzzgBed": null,
        "szmdgUEBed": null,
        "ylgName": null,
        "ryrsNum": null,
        "ryrsBed": null,
        "ryycNum": null,
        "ryycBed": null,
        "ryycgwNum": null,
        "ryycgwBed": null,
        "ycgwNum": null,
        "ycgwBed": null,
        "gwycNum": null,
        "gwycBed": null,
        "zyycNum": null,
        "zyycBed": null,
        "sjhzNum": null,
        "sjhzBed": null,
        "sjpyNum": null,
        "sjpyBed": null,
        "zxcNum": null,
        "zxcBed": null,
        "zyysNum": null,
        "zyysBed": null,
        "wxgfxNum": null,
        "wxgfxBed": null,
        "zywxNum": null,
        "zywxBed": null,
        "zsgfxNum": null,
        "zsgfxBed": null,
        "zyzsNum": null,
        "zyzsBed": null,
        "jmcwNum": null,
        "jmcwBed": null,
        "ryddNum": null,
        "ryddBed": null,
        "ddNum": null,
        "ddBed": null,
        "gfxddNum": null,
        "gfxddBed": null,
        "zyddNum": null,
        "zyddBed": null,
        ylgYyzgBed: null,
        ylgXzzgBed: null,
        ylgUEBed: null
      },
      password: ''
    }
  },
  computed: {
    deptCode () {
      return this.$store.state.lesion.deptCode
    },
    isCreator() {
      return (this.form.creator == JSON.parse(localStorage.user).empNo) || (this.form.receiver == JSON.parse(localStorage.user).empNo) || JSON.parse(localStorage.user).auditor
    }
  },
  methods: {
    init () {
      this.form = {
        delivererName: '',
        receiverName: '',
        deliverDate: '',
        range: '',
        patientTotal: '',
        seriousTotal: '',
        inHospitalTotal: '',
        outHospitalTotal: '',
        transInTotal: '',
        transOutTotal: '',
        parturitionTotal: '',
        operationTotal: '',
        deathTotal: '',
        preoperationTotal: '',
        nursingFirst: '',
        autoOutTotal: '',
        specialGradeTotal: '',
        dangerTotal: '',
        note: '',
        id: '',
        status: 0,
        "wgYyzgBed": null,
        "wgXzzgBed": null,
        "wgUEBed": null,
        "ngYyzgBed": null,
        "ngXzzgBed": null,
        "ngUEBed": null,
        "qgdgYyzgBed": null,
        "qgdgXzzgBed": null,
        "qgdgUEBed": null,
        "szmdgYyzgBed": null,
        "szmdgXzzgBed": null,
        "szmdgUEBed": null,
        "ylgName": null,
        "ryrsNum": null,
        "ryrsBed": null,
        "ryycNum": null,
        "ryycBed": null,
        "ryycgwNum": null,
        "ryycgwBed": null,
        "ycgwNum": null,
        "ycgwBed": null,
        "gwycNum": null,
        "gwycBed": null,
        "zyycNum": null,
        "zyycBed": null,
        "sjhzNum": null,
        "sjhzBed": null,
        "sjpyNum": null,
        "sjpyBed": null,
        "zxcNum": null,
        "zxcBed": null,
        "zyysNum": null,
        "zyysBed": null,
        "wxgfxNum": null,
        "wxgfxBed": null,
        "zywxNum": null,
        "zywxBed": null,
        "zsgfxNum": null,
        "zsgfxBed": null,
        "zyzsNum": null,
        "zyzsBed": null,
        "jmcwNum": null,
        "jmcwBed": null,
        "ryddNum": null,
        "ryddBed": null,
        "ddNum": null,
        "ddBed": null,
        "gfxddNum": null,
        "gfxddBed": null,
        "zyddNum": null,
        "zyddBed": null,
        ylgYyzgBed: null,
        ylgXzzgBed: null,
        ylgUEBed: null
      }
      this.password = ''
      this.modalLoading = false
    },
    open (data) {
      console.log(data)
      this.init()
      this.from = Object.assign(this.form, data)
      this.$refs.modal.open()
      if (data.status && data.status != 0 && !this.isCreator) {
        this.$refs.contain.querySelectorAll('input').forEach(item => {
          item.readOnly = true
        })
        this.$refs.contain.querySelectorAll('textarea').forEach(item => {
          item.readOnly = true
        })
      } else {
        this.$refs.contain.querySelectorAll('input').forEach(item => {
          item.readOnly = false
        })
        this.$refs.contain.querySelectorAll('textarea').forEach(item => {
          item.readOnly = false
        })
      }
    },
    close () {
      this.$refs.modal.close()
    },
    save () {
      for (let index in this.form) {
        try {
          if (this.form[index] && !isNaN(Number(this.form[index]))) {
            this.form[index] = Math.abs(this.form[index])
          }
        }
        catch (e) { }
      }
      operate(Object.assign({
        operateType: 0,
        deptCode: this.deptCode
      }, this.form))
        .then(res => {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.close()
          this.$parent.getData()
        })
    },
    d_sign () {
      this.$refs.signModal.open((password, username) => {
        this.password = password
        operate(Object.assign({
          operateType: 1,
          deptCode: this.deptCode,
          empNo: username,
          password: this.password
        }, this.form))
          .then(res => {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            this.close()
            this.$parent.getData()
          })
      })
    },
    r_sign () {
      this.$refs.signModal2.open((password, username) => {
        this.password = password
        operate(Object.assign({
          operateType: 2,
          deptCode: this.deptCode,
          empNo: username,
          password: this.password
        }, this.form))
          .then(res => {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            this.close()
            this.$parent.getData()
          })
      })
    },
    print (row) {
      let date = this.form.deliverDate
      let data = this.$parent.tableData.filter(item => item.deliverDate == date)
      let print_wid = window.open(`/crNursing/print/shift`)
      print_wid.onload = () => {
        let deptName = this.$store.state.lesion.deptName
        print_wid.getShiftData(data, date, deptName)
      }
    },
    getRealTimeData () {
      this.modalLoading = true
      realTimeData(this.$store.state.lesion.deptCode, this.form.range, this.form.deliverDate).then(res => {
        this.modalLoading = false
        let autoData = res.data.data
        this.form = Object.assign(this.meagerObj(autoData, this.form), {
          deptCode: this.deptCode
        })
      })
    },
    meagerObj(newObj, oldObj) {
      let result = {}
      for(let key in newObj){
        result[key] = (newObj[key] == null) ? oldObj[key] : newObj[key]
      }
      return result
    }
  },
  mounted () { },
  components: {
    signModal,
    footerForm
  }
}
</script>
