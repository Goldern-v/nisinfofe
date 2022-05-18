<template>
  <div class="content" :class="{'doctor-emr-hd':getOther()}">
    <div class="right-part">
      <right-part></right-part>
    </div>
  </div>
</template>

<script>
import rightPart from "./components/right-part/right-part";
export default {
  data() {
    return {};
  },
  components: {
    rightPart
  },
  methods:{
    //360患者特殊样式
    getOther(){
      return ["nanfangzhongxiyi","huadu","fuyou","foshanrenyi"].includes(this.HOSPITAL_ID)
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.content {
  margin: 20px 20px 0;
  margin-bottom: 0;

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
