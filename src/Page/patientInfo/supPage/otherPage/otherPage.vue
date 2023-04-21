<template>
  <div class="content" :class="{'doctor-emr-hd':getOther(), 'content-4-whhk': HOSPITAL_ID === 'whhk'}">
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
      return ["nanfangzhongxiyi","huadu","fuyou"].includes(this.HOSPITAL_ID)
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
.content-4-whhk {
  margin: 20px 0px 0px 20px;
  .right-part {
    margin-left: 0;
  }
}
</style>
