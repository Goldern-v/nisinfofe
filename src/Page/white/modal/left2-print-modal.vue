
<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="700" title="检查预约打印">
      <div ref="printable">
        <div class="list-box head" flex="cross:stretch" style="-webkit-print-color-adjust: exact;">
          <span class="col-0">
            <el-checkbox v-model="allPrint" @change="checkAll"></el-checkbox>
          </span>
          <span class="col-1">床号/姓名</span>
          <span class="col-3">检查日期</span>
          <span class="col-2" flex-box="1">检查预约项目</span>
        </div>
        <div
          class="list-box"
          flex="cross:stretch"
          v-for="(item,index) in list"
          :key="index"
          :data-print-style="!item.isPrint && 'display: none;'"
        >
          <span class="col-0">
            <el-checkbox v-model="item.isPrint"></el-checkbox>
          </span>
          <span class="col-1">{{item.bedLabel}}床 {{item.name}}</span>
          <span class="col-3">
            <div v-for="(option, i) in item.data" :key="i">{{option.scheduleDate }}</div>
          </span>
          <span class="col-2" flex-box="1">
            <div v-for="(option, i) in item.data" :key="i">{{option.examItem}}</div>
          </span>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="onPrint">打印</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='stylus' scoped>
.list-box
  border-bottom 1px dashed #E3E7EA;
  font-size: 13px;
  color: #333333;
  .col-0, .col-1,.col-2,.col-3
    width 0
    min-height 37px
    box-sizing border-box
    padding 8px 10px
    line-height 22px
  .col-2
    // border-left 1px solid #E3E7EA;
    // border-right 1px solid #E3E7EA;
  .col-1
    width 100px
  .col-3
    width 130px
  .col-0
    width 60px
  &.head
    background: #ddd;
    font-size: 13px;
    color: #333;
    font-weight bold
    span
      display flex
      align-items center
</style>
<script>
import commom from "@/common/mixin/common.mixin";
import print from "printing";
export default {
  mixins: [commom],
  props: {
    list: Array
  },
  data() {
    return {
      allPrint: true
    };
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      this.close();
    },
    checkAll(check) {
      this.list.forEach(item => {
        item.isPrint = this.allPrint;
      });
    },
    onPrint() {
      print(this.$refs.printable, {
        beforePrint: null,
        // direction: "horizontal",
        injectGlobalCss: true,
        scanStyles: false,
        css: `
       .col-0 {
         display: none !important;
       }
       body {
         background: #fff !important;
       }
        `
      });
    }
  },
  components: {}
};
</script>
