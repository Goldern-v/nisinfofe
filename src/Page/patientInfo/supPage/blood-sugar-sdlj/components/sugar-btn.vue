<template>
  <div
    class="containBtn"
  >
    <div ref="Contain" @mousewheel="(e) => onScroll(e)">
      <nullBg ></nullBg>
      <div class="addBtn">
        <whiteButton text="添加血糖记录" @click="onAddTable"/>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.containBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    height:100%;
    text-align: center;
    .addBtn{
      margin-top: 10px;
    }
}
</style>


<script>
import whiteButton from "@/components/button/white-button.vue";
import nullBg from "@/components/null/null-bg.vue";

export default {
  data() {
    return {

    };
  },
  methods: {
    onAddTable() {
      if (this.$route.query.patientId)
        this.$emit('onAddTableModal');
      else
        this.$message.warning("请先选择一名患者");
    }
  },
  components: {
    whiteButton,
    nullBg
  },
};
</script>
