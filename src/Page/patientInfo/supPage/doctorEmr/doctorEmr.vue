<template>
  <div class="content" :class="{'doctor-emr-hd':HOSPITAL_ID == 'huadu'}">
    <div class="left-part" v-if="HOSPITAL_ID != 'huadu'">
      <doctor-emr-tree></doctor-emr-tree>
    </div>
    <div class="right-part">
      <right-part></right-part>
    </div>
  </div>
</template>

<script>
import doctorEmrTree from "./components/tree/tree";
import rightPart from "./components/right-part/right-part";
export default {
  data() {
    return {};
  },
  components: {
    doctorEmrTree,
    rightPart
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.content {
  margin: 20px 20px 0;
  margin-bottom: 0;

  .left-part {
    float: left;
    width: 260px;
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px 2px 0 2px;
  }

  .right-part {
    margin-left: 260px;
  }
}
.doctor-emr-hd {
   .right-part {
    margin-left: 0;
  }
}
</style>
