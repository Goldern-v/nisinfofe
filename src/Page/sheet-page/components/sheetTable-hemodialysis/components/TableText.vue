<template>
  <span :class="item.class||''">
    <span v-html="item.value"></span>
  </span>
</template>

<script>
import sheetInfo from "../../config/sheetInfo/index.js";
export default {
  data() {
    return {
      sheetInfo
    };
  },
  props: ["item"],
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    }
  },
   mounted(){
    //  住院号/ID号
    if(this.patientInfo.inpNo && this.item.name){
      this.item.value = this.patientInfo.inpNo;
    }
  },
  components: {},
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  padding: 5px 0;
  &::before,
  &::after {
    position: absolute;
    content: "";
    width: 150%;
    height: 1px;
    background-color: #000;
    left: -10px;
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
  }
}
.inpNo {
  width: 80px;
  border-bottom: 1px solid #000;
  text-align: center;
}
</style>


