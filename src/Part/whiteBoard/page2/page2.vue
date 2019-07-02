<template>
  <div class="p2-contain">
    <div class="head-con" flex="cross:center">
      <span class="icon">📋</span>
      <span>今日任务</span>
    </div>
    <div class="box-con" flex="cross:stretch">
      <Box flex-box="1" style="width: 0" title="基础护理" :doneCount="nursingJob.doneCount" :totalCount="nursingJob.totalCount" bgColor="#14C4A5">
         <vue-seamless-scroll class="scroll-con" :data="nursingJob.list">
           <item1 v-for="item in (nursingJob.list || [])" :key="item.time" :data="item"></item1>
         </vue-seamless-scroll>
      </Box>
      <Box flex-box="1" style="width: 0" title="护理评估" :doneCount="nursingJob.doneCount" :totalCount="nursingJob.totalCount" bgColor="#5191D1">
         <vue-seamless-scroll class="scroll-con" :data="formJob.list">
          <item2 v-for="item in formJob.list" :data="item" :key="item.bedLabel"></item2>
         </vue-seamless-scroll>  
      </Box>
      <Box flex-box="1" style="width: 0;border-right: 1px solid #CBD5DD" title="巡视、宣教" :doneCount="deptVMJob.doneCount" :totalCount="deptVMJob.totalCount" bgColor="#F4C413">
         <vue-seamless-scroll class="scroll-con" :data="deptVMJob.list">
           <item1 v-for="item in (deptVMJob.list || [])" :key="item.time" :data="item"></item1>
         </vue-seamless-scroll>
      </Box>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../style/wb.styl';

.p2-contain {
  height: 100%;
  box-sizing: border-box;
  padding-top: tovw(37);
  position: relative;
  margin-right: tovw(20);

  .head-con {
    position: absolute;
    top: 0;
    height: tovw(37);
    width: 100%;
    background-image: linear-gradient(-180deg, #F4F4F4 0%, #DCDCDC 100%);
    border: 1px solid #CBD5DD;
    border-radius: 2px 2px 0 0;
    font-size: tovw(18);
    color: #333333;
    padding-left: tovw(18);
    box-sizing: border-box;
    font-weight: bold;

    .icon {
      margin-right: tovw(5);
    }
  }

  .box-con {
    height: 100%;
  }
}
.scroll-con
  height 100%
  overflow hidden
</style>
<script>
import Box from "./components/box";
import item1 from "./components/item-1";
import item2 from "./components/item-2";
import { deptJob, deptVMJob} from "@/api/whiteBoard";
export default {
  data() {
    return {
      nursingJob: {},
      formJob: {},
      deptVMJob: {},
      timer: ''
    };
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    }
  },
  methods: {
    getData() {
      if (this.deptCode) {
        deptJob(this.deptCode).then(res => {
          this.nursingJob = res.data.data.nursingJob
          this.formJob = res.data.data.formJob
        })
        deptVMJob(this.deptCode).then(res => {
          this.deptVMJob = {
            list: [...res.data.data.missionJob.list, ...res.data.data.visitJob.list],
            doneCount: res.data.data.missionJob.doneCount + res.data.data.visitJob.doneCount,
            totalCount: res.data.data.missionJob.totalCount + res.data.data.visitJob.totalCount,
          }
        })
      }
    }
  },
 created() {
    this.getData();
     this.timer = setInterval(() => {
        this.getData()
      }, 1000 * 60)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    deptCode() {
      this.getData();
    }
  },
  components: {
    Box,
    item1,
    item2,
    deptJob
  }
};
</script>
