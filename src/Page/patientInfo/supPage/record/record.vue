<template>
  <div>
    <FormTags
      v-if="hasTagsView"
      :tagsList="tagsList"
      @closeTag="handleCloseTag"
      :currentTag="currentTag"
      @updateCurrentTag="updateCurrentTag"
    />
    <div class="content">
      <div class="left-part" id="left" :style="treeOpenLeft ? 'width: 0': 'width: 260px'">
        <tree-sdyy
        v-if="HOSPITAL_ID == 'nfyksdyy'"
          ref="tree"
          :filterObj="filterObj"
          :hasTagsView="hasTagsView"
          @openFormTag="onMountTag"
        ></tree-sdyy>
        <tree
        v-else
          ref="tree"
          :filterObj="filterObj"
          :hasTagsView="hasTagsView"
          @openFormTag="onMountTag"
        ></tree>
      </div>
      <div :style="treeOpenLeft ? 'margin-left: 0': 'margin-left: 260px'" :class="[HOSPITAL_ID=='wujing' ?'right-part-wujing' : 'right-part']" id="right" style="z-index:1">
        <rightPart :filterObj="filterObj" :hasTagsView="hasTagsView"></rightPart>
      </div>
    </div>
     <!-- 模板 -->
    <!-- <templateSlide v-if="HOSPITAL_ID !== 'foshanrenyi' && HOSPITAL_ID !== 'nfyksdyy'" ref="templateSlide" /> -->
    <!-- 一体化评估模板拿佛医的 -->
    <templateSlideFoshanshiyi  ref="templateSlideFoshanshiyi" />
    <!-- 诊断右侧弹窗 -->
    <diagnosisSlide ref="diagnosisSlide" :formObj="formObj"/>
    <!-- 诊断弹窗 -->
    <diagnosisModal ref="diagnosisModal" :formObj="formObj"/>
  </div>
</template>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content
  margin 10px 15px 0
  margin-bottom 0
  .left-part
    float left
    width 260px
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px 2px 0 2px;
    transition: all 0.4s cubic-bezier(0.55, 0, 0.07, 1.04) 0s;
    position: relative;
    z-index: 2;
  .right-part
    margin-left 260px
  #right
    transition: all 0.4s cubic-bezier(0.55, 0, 0.07, 1.04) 0s;
  .right-part-wujing
    margin-left 275px
</style>

<script>
import tree from "./component/tree";
import rightPart from "./component/right-part/right-part.vue";
import {unLock,unLockTime} from "@/Page/sheet-hospital-eval/api/index.js"
import bus from "vue-happy-bus";
import FormTags from './component/form-tags/index.vue';
import templateSlide from "@/Page/sheet-hospital-admission/components/Render/modal/template-slide/template-slide.vue";
import templateSlideFoshanshiyi from '@/Page/sheet-hospital-admission/components/Render/modal/template-slide/template-slide_foshanshiyi.vue'
import diagnosisSlide from "@/Page/sheet-hospital-eval/components/Render/modal/diagnosisSlide.vue";
import diagnosisModal from "@/Page/sheet-hospital-admission/components/Render/modal/diagnosis-modal.vue";
import TreeSdyy from './component/tree-sdyy.vue';
export default {
  props: {
    filterObj: Object
  },
  data() {
    return {
      lockHospitalList:['huadu','nfyksdyy'],//配置了表单锁定的医院
      bus: bus(this),
      tagsList: [],
      currentTag: null,
      formObj:{},
      types: ["bloodSugar", 'temperature', "diagnosis"]
    };
  },
  computed: {
    hasTagsView() {
      // return ['nfyksdyy'].includes(this.HOSPITAL_ID) && !!this.tagsList.length;
      return !!this.tagsList.length;
    },
    // 标签高度
    tagsViewHeight() {
      return this.hasTagsView ? 35 : 0
    },
    patientInfo() {
      return this.$store.state.patient.currentPatient;
    },
    treeOpenLeft() {
      return this.$store.state.sheet.openWritTreeLeft;
    },
  },
  mounted(){
    //挂载。让嵌套的iframe可以调用
    this.bus.$on("handleBatchAudit",(e,formCode)=>this.$refs.tree.handleBatchAudit(e,formCode))
  },

  beforeDestroy () {
    this.bus.$off("handleBatchAudit");
    this.bus.$off("openTemplateModal");
    this.bus.$off("openDiagnosisModal");
    this.bus.$off("openDiagnosisSlide");
    this.bus.$off("closeDiagnosisSlide");
  },
  watch: {
    patientInfo: {
      handler(val) {
        this.onClearTagsList()
      }, deep: true
    },
  },
  methods:{
    async destroyUnlock(){
     const lockForm=localStorage.getItem("lockForm")?JSON.parse(localStorage.getItem("lockForm")) :localStorage.getItem("lockForm")
     /* 判断是否已经自动解锁 */
     if(lockForm && lockForm.initTime){
        /* 默认是10分钟后自己解锁 ,后期可根据医院修改*/
        let min=10
        const res=await unLockTime()
        if(res.data.code=="200" && res.data.data!="his_form_data_lock_timeout"){
          min = +res.data.data
        }
        /* 评估单初始化时间 乘于多少分钟  1分钟=60000 */
        const afterInitTime= +lockForm.initTime + 60000 * min
        const nowTime=Date.now()
        if(nowTime > afterInitTime ){
          /* 超时间 */
          localStorage.setItem('lockForm','')
          return
        }
     }
     if(lockForm && lockForm.formId && this.lockHospitalList.includes(this.HOSPITAL_ID)){
        unLock(lockForm.type,lockForm.formId).then(res=>{
          localStorage.setItem('lockForm','')
        })
     }
    },
    // 添加表单标签
    onMountTag(form) {
      this.currentTag = form
      const tagIndex = this.tagsList.findIndex(tag => this.types.includes(form.type) ? tag.label === form.label : tag.id === form.id);
      if (tagIndex === -1) {
        this.tagsList.push(form);
      }
    },
    updateCurrentTag(tag) {
      if (!this.currentTag || (tag && (this.types.includes(this.currentTag.type) ? tag => tag.label !== this.currentTag.label : tag.id !== this.currentTag.id))) {
        this.currentTag = tag;
      }
    },
    // 删除
    delCurrentTag(id) {
      const tagIndex = this.tagsList.findIndex(t => t.id == id);
      if (tagIndex !== -1) {
        this.tagsList.splice(tagIndex, 1);
      }
    },
    handleCloseTag(tag, reopen) {
      if (!this.tagsList.length || !this.hasTagsView) return;
      const tagIndex = this.tagsList.findIndex(t => t.id == tag.id);
      if (tagIndex !== -1) {
        this.tagsList.splice(tagIndex, 1);
      }
      const lastTag = this.tagsList[this.tagsList.length - 1]
      // 打开最后一张表单
      if (reopen && lastTag) {
        if (!tag.type) {
          this.bus.$emit("openAssessmentBox", lastTag);
        } else {
          this.bus.$emit('openOtherPage', lastTag, true);
        }
      }
      if (!lastTag && !tag.type) {
        // 关闭评估单
        this.bus.$emit('closeAssessment')
        // 取消高亮
        this.bus.$emit('highlightTreeNode', null);
      }
      this.currentTag = lastTag || null;
    },
    onClearTagsList() {
      // console.log('onClearTagsList')
      this.tagsList = [];
    },
    openTemplateModal(field,cb) {
      // if (this.HOSPITAL_ID === 'foshanrenyi'||this.HOSPITAL_ID === 'nfyksdyy')
      // {
      //   this.$refs.templateSlideFoshanshiyi.open(field,true,true,cb);
      // } else {
      //   this.$refs.templateSlide.open(field,true,true,cb);
      // }
      // 暂时全部使用佛医的模板
      this.$refs.templateSlideFoshanshiyi.open(field,true,true,cb);
    },
    openDiagnosisModal(res){
      let {
        data: {
          data: { diags: diags },
        },
      } = res;
      if (diags && diags.length>0) {
        let diagsArray = diags.map((d) => {
          return d;
        });
        this.$refs.diagnosisModal.open(diagsArray,true);
      }
    },
  },
  created() {
    this.$store.commit("closeFullPageRecord");
    this.bus.$on('formTagClose', this.handleCloseTag);
    this.bus.$on("openTemplateModal", (field,cb) => {
      this.openTemplateModal(field,cb);
    });
    this.bus.$on("openDiagnosisModal", (resData) => {
      this.openDiagnosisModal(resData);
    });
    this.bus.$on("openDiagnosisSlide", (item,obj) => {
      this.$refs.diagnosisSlide.open(item, obj)
    });
    this.bus.$on("closeDiagnosisSlide", () => {
      this.$refs.diagnosisSlide.close()
    });
    this.bus.$on('mountTag', this.onMountTag);
    this.bus.$on('delCurrentTag', (id) => {this.delCurrentTag(id)} )
  },
  components: {
    tree,
    rightPart,
    FormTags,
    templateSlide,
    templateSlideFoshanshiyi,
    diagnosisSlide,
    diagnosisModal,
    TreeSdyy
  },
  beforeRouteLeave(to,from,next){
     if(!this.$store.state.admittingSave.admittingSave){
      return this.$confirm('护理文书还未保存，是否需要离开页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$store.commit("upAdmittingSave", true);
           return next()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          return next(false)
        });
    }else{
      next()
    }
  },
  beforeDestroy(){
    this.destroyUnlock()
  }
};
</script>
