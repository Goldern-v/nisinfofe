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
      <div class="left-part" id="left">
        <tree
          ref="tree"
          :filterObj="filterObj"
          :hasTagsView="hasTagsView"
          @openFormTag="onMountTag"
        ></tree>
      </div>
      <div :class="[HOSPITAL_ID=='wujing' ?'right-part-wujing' : 'right-part']" id="right" style="z-index:1">
        <rightPart :filterObj="filterObj" :hasTagsView="hasTagsView"></rightPart>
      </div>
    </div>
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
export default {
  props: {
    filterObj: Object
  },
  data() {
    return {
      lockHospitalList:['huadu'],//配置了表单锁定的医院
      bus: bus(this),
      tagsList: [],
      currentTag: null,
    };
  },
  computed: {
    hasTagsView() {
      // return ['nfyksdyy'].includes(this.HOSPITAL_ID) && !!this.tagsList.length;
      // return !!this.tagsList.length;
      return false;
    },
    // 标签高度
    tagsViewHeight() {
      return this.hasTagsView ? 35 : 0
    },
    patientInfo() {
      return this.$store.state.patient.currentPatient;
    },
  },
  mounted(){
    //挂载。让嵌套的iframe可以调用
    this.bus.$on("handleBatchAudit",(e,formCode)=>this.$refs.tree.handleBatchAudit(e,formCode))
  },
  beforeDestroy () {
    this.bus.$off("handleBatchAudit");
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
      const tagIndex = this.tagsList.findIndex(tag => tag.id === form.id);
      if (tagIndex === -1) {
        this.tagsList.push(form);
      }
    },
    updateCurrentTag(tag) {
      if (!this.currentTag || (tag && tag.id !== this.currentTag.id)) {
        this.currentTag = tag;
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
        this.bus.$emit("openAssessmentBox", lastTag);
      }
      if (!lastTag) {
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
    }
  },
  created() {
    this.$store.commit("closeFullPageRecord");
    this.bus.$on('formTagClose', this.handleCloseTag);
  },
  components: {
    tree,
    rightPart,
    FormTags
  },
  // beforeRouteLeave: (to, from, next) => {
  //   const isSave = localStorage.getItem('isSave')
  //   if (!JSON.parse(isSave) && isSave != null) {
  //     window.app
  //       .$confirm("评估单还未保存，离开将会丢失数据", "提示", {
  //         confirmButtonText: "离开",
  //         cancelButtonText: "取消",
  //         type: "warning"
  //       })
  //       .then(res => {
  //         next();
  //       });
  //   } else {
  //     next();
  //   }
  // },
  beforeDestroy(){
    this.destroyUnlock()
  }
};
</script>
