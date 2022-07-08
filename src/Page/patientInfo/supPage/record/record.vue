<template>
  <div>
    <div class="content">
      <div class="left-part" id="left">
        <tree ref="tree" :filterObj="filterObj"></tree>
      </div>
      <div :class="[HOSPITAL_ID=='wujing' ?'right-part-wujing' : 'right-part']" id="right" style="z-index:1">
        <rightPart :filterObj="filterObj"></rightPart>
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
export default {
  props: {
    filterObj: Object
  },
  data() {
    return {
      lockHospitalList:['huadu']
    };
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
          min = +res.data.data/100
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
    }
  },
  created() {
    this.$store.commit("closeFullPageRecord");
  },
  components: {
    tree,
    rightPart
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
