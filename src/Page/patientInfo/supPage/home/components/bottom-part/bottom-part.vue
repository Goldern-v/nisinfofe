<template>
  <div flex>
    <div class="left-part">
      <box title="护理评估" :titleTip="titleTip">
        <div slot="body">
          <bottomLeft></bottomLeft>
        </div>
      </box>
    </div>
    <div class="right-part">
      <bottomRight></bottomRight>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.left-part
  width 67%
  margin-right 16px
.right-part
  width 33%

@media screen and (max-width: 1100px) {
  /deep/.left-part {
    margin-right: 4px!important;
  }
}
</style>
<script>
import box from "../box/box";
import bottomLeft from "../bottom-left/bottom-left";
import bottomRight from "../bottom-right/bottom-right";
import { getNursingDocStatistics } from "@/api/home";
export default {
  data() {
    return {
      titleTip: ""
    };
  },
  components: {
    box,
    bottomLeft,
    bottomRight
  },
  created() {
    if(this.HOSPITAL_ID == "zhongshanqi") this.getNurStatistics();
  },
  methods: {
    getNurStatistics(){
      getNursingDocStatistics(this.$route.query.patientId,this.$route.query.visitId).then(res=>{
        this.titleTip = `完成率（${res.data.data.completeRate}）`;
      })
    }
  }
};
</script>
