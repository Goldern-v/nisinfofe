<template>
  <div class="tool-contain" flex="cross:center">
    <div class="item-box" flex="cross:center main:center" v-if="showToolBar">
      <div class="text-con" @click="addPatient">添加患者</div>
    </div>
    <addSweetModal ref="addSweetModal"></addSweetModal>

  </div>
</template>

<script>
import addSweetModal from "../modal/add-sweet-modal";
export default {
    props: {
        showToolBar: Boolean
    },

  components: {
    addSweetModal
    },
  data() {
    return {};
  },
  methods: {
      addPatient(){
          this.$refs.addSweetModal.open();
      }
  }
};
</script>

<style lang="stylus" scoped>
.tool-contain {
  background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
  border-bottom: 1px solid #CBD5DD;
  height: 40px;
  z-index: 4;
  position: absolute;
  width: 100%;
  left: 200px;
  overflow: visible;

  .item-box:first-child {
    margin-left: 5px;
  }

  .item-box {
    font-size: 12px;
    color: #333333;
    border-right: 1px solid #d4d4d4;
    cursor: pointer;
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px;
    width: 66px;
    height: 26px;
    margin-left: 5px;

    &.disabled {
      color: #999 !important;
      pointer-events: none;

      i {
        color: #999 !important;
      }
    }

    &:hover {
      font-weight: bold;

      .icon-box {
        background: #fafafa;
      }
    }
  }
}
</style>
