<template>
  <div class="patientModal">
  <SweetModal
    :ref="'modal'"
    title="患者ISBAR交班内容"
    :showTitleSideBtn="['nfyksdyy'].includes(HOSPITAL_ID)?'患者病历':''"
    :titleSideBtnCallback="['nfyksdyy'].includes(HOSPITAL_ID)?openDoctorEmrModal:()=>{}"
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
          <div class="label">{{HOSPITAL_ID == 'ytll'?'主诉':'主诉及现存主要问题'}}</div>
          <ElInput type="textarea" ref="mainComplaint" :rows="4" v-model="form.mainComplaint" :disabled="isSignedN"/>
        </ElTabPane>
        <ElTabPane label="B背景" name="2">
          <div class="label">{{HOSPITAL_ID == 'ytll'?'各班次护理诊断、护理措施、效果追踪评价':'既往病史、治疗经过、护理评估情况、治疗效果跟踪'}}</div>
          <ElInput type="textarea" ref="background" v-model="form.background" class="textarea" :disabled="isSignedN"/>
        </ElTabPane>
        <ElTabPane label="A评估" name="3">
          <template v-if="HOSPITAL_ID == 'ytll'">
            <div class="label">跌：<ElInput type="text" ref="fall" style="width:100px;" v-model="form.fall" :disabled="isSignedN"/></div>
            <div class="label">VTE：<ElInput type="text" ref="VTE" style="width:100px;" v-model="form.vte" :disabled="isSignedN"/></div>
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
    <ElButton slot="button" @click="tbYesterday" v-if="['nfyksdyy'].includes(this.HOSPITAL_ID)">同步昨日交班</ElButton>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" type="primary" @click="onConfirm">保存</ElButton>
    <template v-if="showAPN">
      <ElButton slot="button" @click="setString('【A】')" :disabled="isSignedN">A</ElButton>
      <ElButton slot="button" @click="setString('【P】')" :disabled="isSignedN">P</ElButton>
      <ElButton slot="button" @click="setString('【N】')" :disabled="isSignedN">N</ElButton>
    </template>
  </SweetModal>
  <advice-modal
    v-if="['nfyksdyy'].includes(HOSPITAL_ID)"
    ref="adviceModalRef"
    @handleOk="handleDiagnosis"
  />
  <div
      v-if="show && ['nfyksdyy'].includes(HOSPITAL_ID)"
      v-loading="pageLoading"
      class="doctor-emr-content dragNode2"
    >
      <div class="content_title" v-drag="{ target: 'dragNode2' }">
        <div class="close-button" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="iframeDom" style="height: 100%;">
        <iframe :src="fileUrl"></iframe>
      </div>
      <div class="se-resize" v-seResize="{ target: 'dragNode2' }"></div>
      <div class="e-resize" v-eResize="{ target: 'dragNode2' }"></div>
      <div class="s-resize" v-sResize="{ target: 'dragNode2' }"></div>
    </div>
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
      show:false,
      fileUrl:"",
      pageLoading: false,
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
      showAPN() {
        return ['nfyksdyy'].includes(this.HOSPITAL_ID) && ['2', '3'].includes(this.tab);
      }
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
      tbYesterday(){
        function xie(doc,str) {
          if (doc) {
            doc += "\n" + str;
          } else {
            doc = str;
          }
          return doc
        }
        let { patientId,visitId } = this.form , id = this.$route.params.id;
        apis.getPreviousPatient({patientId,visitId,id}).then(res=>{
          let arr = ["proposal","assessmentSituation","background"];
          let {data:{data}}= res
          arr.forEach(code=>{
            let str = data[code] || ""
            this.form[code] = xie(this.form[code],str)
          })
        })
      },
      setString(value) {
        value = value || '';
        const tabMap = {
          '2': () => {
            this.form.background = (this.form.background || '') + value;
            this.$refs.background.$refs.textarea.focus();
          },
          '3': () => {
            this.form.assessmentSituation = (this.form.assessmentSituation || '') + value;
            this.$refs.assessmentSituation.$refs.textarea.focus();
          }
        }
        tabMap[this.tab] && tabMap[this.tab]();
      },
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
        const modalData = ['nfyksdyy'].includes(this.HOSPITAL_ID) && {
          modalTitle: `
          同步医嘱 <span style="margin-left: 12px">
            ${this.form.name}&nbsp;${this.form.age}&nbsp;${this.form.inpNo || ''}
          </span>
          `
        }
        this.$refs[key] && this.$refs[key].open(modalData);
      },
      openPISlide(type) {
        // 四个参数 type打开哪个类型,close是否关闭弹窗,feature是否有回填护记特殊情况功能 第四个参数患者基本信息（交班志基本信息  从交班志打开【检查报告】没有拿到基本信息）
        this.bus.$emit("openclosePatientInfo", type, false, true, this.form);
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
        if(['nfyksdyy'].includes(this.HOSPITAL_ID)){
          // 关闭医嘱同步弹窗时电子病历也关闭
          this.show = false
        }
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
      },
      openDoctorEmrModal(){
        this.show=true
        switch (this.HOSPITAL_ID) {
          case 'nfyksdyy':
           this.fileUrl = `http://192.168.8.174:8000/Content/GetSingleContentData?a=1&mdt=H&ordinal=HMedical&ids=${this.form.inpNo}`
          break;
          default:
            this.fileUrl = `http://172.16.4.53/EmrView/Index.aspx?hospital_no=45539427X44011411A1001&patient_id=${this.form.inpNo}`;
          break;
      }
      },
      close() {
        this.show = false;
      },
    },
    components: {
      Button,
      AdviceModal
    },
    directives: {
    // 添加窗口移动指令
    drag: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "move";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拖动目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX - dragNode.offsetLeft;
          const disY = ev.clientY - dragNode.offsetTop;
          // 顶部距离最小值(由于dragNode使用了transform，0.4是 translateY的值);
          const limitTop = dragNode.offsetHeight * 0.4;
          const [iframeDom] = document.getElementsByClassName("iframeDom");
          iframeDom.style['pointer-events'] = 'none'
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const l = ev.clientX - disX;
              let t = ev.clientY - disY;
              if (t <= limitTop && ['nfyksdyy'].includes(process.env.HOSPITAL_ID)) {
                t = limitTop;
              }
              dragNode.style.left = l + "px";
              dragNode.style.top = t + "px";
            };
            document.onmouseup = (ev) => {
              document.onmousemove = null;
              document.onmouseup = null;
              iframeDom.style['pointer-events'] = 'auto'
            };
          }
        };
      },
    },
    // 右下方拉伸
    seResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "se-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          const [iframeDom] = document.getElementsByClassName("iframeDom");
          iframeDom.style['pointer-events'] = 'none'
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              dragNode.style.width = oWidth + w + "px";
              dragNode.style.height = oHeight + h + "px";
              document.body.style.cursor = "se-resize";
            };
            document.onmouseup = (ev) => {
              iframeDom.style['pointer-events'] = 'auto'
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
    // 下方拉伸
    sResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "s-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          const [iframeDom] = document.getElementsByClassName("iframeDom");
          iframeDom.style['pointer-events'] = 'none'
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              dragNode.style.height = oHeight + h + "px";
              document.body.style.cursor = "s-resize";
            };
            document.onmouseup = (ev) => {
              iframeDom.style['pointer-events'] = 'auto'
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
    // 右方拉伸
    eResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "e-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          const [iframeDom] = document.getElementsByClassName("iframeDom");
          iframeDom.style['pointer-events'] = 'none'
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              document.body.style.cursor = "e-resize";
              dragNode.style.width = oWidth + w + "px";
            };
            document.onmouseup = (ev) => {
              iframeDom.style['pointer-events'] = 'auto'
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
  },
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

  .doctor-emr-content {
    position: fixed;
    // top: 500px;
    // left: 100px;
    transform: translate(-50%, -40%);
    -webkit-transform: translate(-50%, -40%);
    -ms-transform: translate(-50%, -40%);
    -moz-transform: translate(-50%, -40%);
    position: fixed;
    top: 50%;
    left: 56%;
    z-index: 20000;
    width: 1200px;
    height: 650px;
    background: #ffffff;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);

    .content_title {
      height: 20px;
      position: relative;
      cursor: move;

      .close-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        border: none;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        font-size: 10px;
        cursor: pointer;
      }
    }

    iframe {
      width: 100%;
      height: calc(100% - 20px);
    }
  }  
</style>
