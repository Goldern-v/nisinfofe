<template>
  <div class="patientModal">
  <SweetModal
    :ref="'modal'"
    title="患者ISBAR交班内容"
    :modal-width="760"
    @close="onPanelClose"
  >
    <div class="head">
      <label>
        <span>床号：</span>
        <ElInput
          type="text"
          style="width:60px;"
          ref="input"
          v-model="form.bedLabel"
          :disabled="bedLabelDisabled"
          @input="onBedLabelChange"
          @blur="onLoadPatient"
          @keyup.native.enter="onLoadPatient"
        />
      </label>
      <label>
        <span>姓名：</span>
        <ElInput type="text" ref="name" style="width:100px;" v-model="form.name" :disabled="!isSignedN"/>
      </label>
      <label>
        <span>年龄：</span>
        <ElInput type="text" style="width:50px;" v-model="form.age" :disabled="!isSignedN"/>
      </label>
      <label>
        <span>事件：</span>
        <ElInput type="text" style="width:100px;" v-model="form.patientStatus" :disabled="!isSignedN"/>
      </label>
      <a v-if="!isSignedN" class="action" @click="onPanelOpen">+ 模板</a>
    </div>
    <div class="content">
      <div class="buttonBox">
        <el-button
          v-if="showAdviceBtn"
          size="mini"
          type="primary"
          @click="openPISlide('testModal')"
        >
          检验报告
        </el-button>
        <el-button
          v-if="showAdviceBtn"
          type="primary"
          size="mini"
          @click="openPISlide('inspectModal')"
        >
          检查报告
        </el-button>
        <el-button
          v-if="showAdviceBtn"
          size="mini"
          @click="openModal('adviceModalRef')"
          >同步医嘱</el-button
        >
        <el-button
          v-if="(tab == '2' || tab == '4') && hasSyncRecord"
          type="primary"
          @click="onSyncRecord()"
          :disabled="isSignedN"
        >同步护记
        </el-button>
      </div>
      <ElTabs class="tabs" v-model="tab" type="card" @input="onTabChange">
        <ElTabPane label="S现状" name="1">
          <div class="label">主要症状</div>
          <ElInput type="textarea" ref="diagnosis" :rows="4" v-model="form.diagnosis" :disabled="isSignedN"/>
          <div class="label">主诉及现存主要问题</div>
          <ElInput type="textarea" ref="mainComplaint" :rows="4" v-model="form.mainComplaint" :disabled="isSignedN"/>
        </ElTabPane>
        <ElTabPane label="B背景" name="2">
          <div class="label">既往病史、治疗经过、护理评估情况、治疗效果跟踪</div>
          <ElInput type="textarea" ref="background" v-model="form.background" class="textarea" :disabled="isSignedN"/>
        </ElTabPane>
        <ElTabPane label="A评估" name="3">
          <template v-if="HOSPITAL_ID == 'ytll'">
            <div class="label">跌：<ElInput type="text" ref="fall" style="width:100px;" v-model="form.fall" :disabled="isSignedN"/></div>
            <div class="label">VTE：<ElInput type="text" ref="VTE" style="width:100px;" v-model="form.VTE" :disabled="isSignedN"/></div>
            <div class="label">压：<ElInput type="text" ref="ulcer" style="width:100px;" v-model="form.ulcer" :disabled="isSignedN"/></div>
            <div class="label">管：<ElInput type="text" ref="conduit" style="width:100px;" v-model="form.conduit" :disabled="isSignedN"/></div>
          </template>
          <template v-else>
            <div class="label">交班前最后一次护理评估情况</div>
            <ElInput type="textarea" ref="assessmentSituation" v-model="form.assessmentSituation" class="textarea" :disabled="isSignedN"/>
          </template>
          </ElTabPane>
        <ElTabPane label="R建议" name="4">
          <div class="label">交给下班需注意的</div>
          <ElInput type="textarea" ref="proposal" v-model="form.proposal" class="textarea" :disabled="isSignedN"/>
        </ElTabPane>
      </ElTabs>
    </div>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" type="primary" @click="onConfirm">保存</ElButton>
  </SweetModal>
  <advice-modal
    v-if="['nfyksdyy'].includes(HOSPITAL_ID)"
    ref="adviceModalRef"
    @handleOk="handleDiagnosis"
  />
  </div>
</template>

<script>
  import common from '@/common/mixin/common.mixin.js'
  import AdviceModal from "@/Page/sheet-page/components/modal/advice-modal";

  import * as apis from '../apis'
  import Button from './button'
  import bus from "vue-happy-bus";

  const defaultForm = {
    name:'',
    bedLabel:'',
    age:'',
    patientStatus:'',
    diagnosis: '',
    mainComplaint: '',
    background: '',
    assessmentSituation: '',
    proposal: ''
  }

  export default {
    mixins: [common],
    props: {
      date: String,
      syncRecord: Object,
    },
  data() {
    return {
      tab: '',
      bedLabelDisabled: false,
      isSignedN: false,
      form: {...defaultForm},
      bus: bus(this),
      }
    },
    created(){
      this.bus.$on("syncReportFSSY", (str) => {
        switch (this.tab) {
          case "2":
            this.form.background = xie(this.form.background)
            break;
          case "3":
            this.form.assessmentSituation = xie(this.form.assessmentSituation)
            break;
          case "4":
            this.form.proposal = xie(this.form.proposal)
            break;
          default:
            break;
        }
        function xie(doc) {
          if (doc) {
            doc += "\n" + str;
          } else {
            doc += str;
          }
          return doc
        }
      });
    },
    computed: {
      hasSyncRecord() {
        return ['nfyksdyy'].includes(this.HOSPITAL_ID);
      },
      showAdviceBtn() {
        switch (process.env.HOSPITAL_ID) {
          case "nfyksdyy":
            return ['2','3','4'].includes(this.tab);
          default:
            return false;
        }
      },
    },
    watch: {
      syncRecord: {
        handler(val) {
          if (val.background) {
            this.form.background = this.form.background + val.background;
          }
          if (val.proposal) {
            this.form.proposal = this.form.proposal + val.proposal;
          }
        }, deep: true
      }
    },
    methods: {
      handleDiagnosis({ item, key }) {
        switch (this.tab) {
          case "2":
            this.form.background = xie(this.form.background)
            break;
          case "3":
            this.form.assessmentSituation = xie(this.form.assessmentSituation)
            break;
          case "4":
            this.form.proposal = xie(this.form.proposal)
            break;
          default:
            break;
        }
        function xie(doc) {
           item.forEach((v) => {
            if (doc && v[key]) {
              doc += "\n";
            }
            doc += v[key];
          });
          return doc
        }

      },
      openModal(key) {
        this.$refs[key] && this.$refs[key].open();
      },
      openPISlide(type) {
        // 三个参数 type打开哪个类型,close是否关闭弹窗,feature是否有回填护记特殊情况功能
        this.bus.$emit("openclosePatientInfo", type, false, true);
      },
      async open (tab, form, autoFocus, isSignedN) {
        const id = this.$route.params.id;
        const {data: {data}} = await apis.shiftgetPatient(id, form.patientId, form.visitId)
        this.tab = tab || '1'
        this.form = {...defaultForm, ...data[0]}
        this.bedLabelDisabled = !!form
        this.isSignedN = !!isSignedN
        this.$refs.modal.open()

        if (!autoFocus || autoFocus === 'bedLabel') {
          this.$nextTick(() => this.$refs.input.$refs.input.focus())
        } else if (autoFocus === 'name') {
          this.$nextTick(() => this.$refs.input.$refs.input.focus())
          // this.$nextTick(() => this.$refs[autoFocus].$refs.input.focus())
        } else if(autoFocus && this.$refs[autoFocus]) {
          this.$nextTick(() => this.$refs[autoFocus].$refs.textarea.focus())
        }
      },
      close () {
        this.$refs.modal.close()
      },
      changeTab (tab = '1') {
        this.tab = tab
        this.$emit('onTab', tab);
      },
      applyTemplate (tab, item) {
        if (tab === '1') {
          this.form.mainComplaint = (this.form.mainComplaint || '') + item.content
        } else if (tab === '2') {
          this.form.background = (this.form.background || '') + item.content
        } else if (tab === '3') {
          this.form.assessmentSituation = (this.form.assessmentSituation || '') + item.content
        } else if (tab === '4') {
          this.form.proposal = (this.form.proposal || '') + item.content
        }
      },
      onClose () {
        this.close()
      },
      onConfirm () {
        this.$emit('confirm', this.form)
      },
      onPanelOpen () {
        this.$emit('panel-open')
      },
      onPanelClose () {
        this.$emit('panel-close')
      },
      onTabChange (tab) {
        this.$emit('tab-change', tab)
      },
      onBedLabelChange () {
        this.form = {...this.form, name:'', age:'', patientStatus:'',}
      },
      async onLoadPatient () {
        const bedLabel = this.form.bedLabel
        if (!bedLabel) return

        const params = this.$route.params
        const {data: {data}} = await apis.getPatient(params.code, bedLabel, this.date)

        if (data) {
          const {testResult, examResult} = data
          data.background = [testResult, examResult].filter(Boolean).join('\n')
          data.mainComplaint = data.complaint || ''

          this.form = {...this.form, ...data}
        } else {
          this.$message.error('找不到该患者')
        }
      },
      onSyncRecord() {
        this.$emit('sync-open', this.form);
      }
    },
    components: {
      Button,
      AdviceModal
    }
  }
</script>

<style lang="stylus" scoped>
  .head
    position relative
    margin-left -10px
    padding-right 60px
    display flex
    justify-content space-around
    line-height 32px

    label
      white-space nowrap

    .action
      position absolute
      top 0
      right 0
      color rgb(40, 79, 194)
      cursor pointer

  .tabs
    margin-top 20px

    >>>.el-tabs__header
      margin-left -20px
      margin-right -20px
      background #F7FAFA
      height 36px

    >>>.el-tabs__item
      height 38px
      border-radius 0
      border-top 3px solid transparent
      border-bottom 3px solid transparent

      &.is-active
        margin-bottom -1px
        background #fff
        border-radius 0
        border-top 3px solid #4BB08D
        border-bottom 3px solid transparent
        box-sizing border-box
        color #333
        font-weight 700

    >>>.el-tabs__item
      line-height 38px

  .content
    height 325px
    position relative

    >>>.buttonBox
      position absolute
      right 0px
      top 3px
      z-index 1
    .label
      margin 10px 0

    .textarea
      >>>.el-textarea__inner
        height:232px
</style>
