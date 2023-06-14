<template>
<sweet-modal
      ref="modal"
      :modalWidth="820"
      :title="title"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
    <div class="content-view">
      <el-select v-model="printSelect" filterable multiple placeholder="请选择">
        <el-option
            v-for="item in optionList"
            :key="item.patientId + item.bedLabel"
            :label="`${item.bedLabel}床`"
            :value="item.bedLabel">
        </el-option>
      </el-select>
    </div>
    <div class="modal-btn">
      <el-button  type="info" @click="post">确认</el-button>
      <el-button  @click="close">取消</el-button>
    </div>
    <!-- 无需展示，直接调打印 -->
    <div class="print-list"   v-if="category != 'wristStrap'" ref="bedSidePrint" v-show="isBedSide">
      <bedSide :printData="printData" :category="category" ref="bedSideNullPrint" ></bedSide>
    </div>
    <wristStrap :printData="printData" :category="category" ref="wristStrapPrint" v-else></wristStrap>
</sweet-modal>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal {
  >>>.sweet-content {
    padding-bottom: 20px;
    text-align: center;
  }
}
.content-view {
    width 500px
    min-height 250px
    margin 0 auto
    background-color #fff
    box-sizing border-box

    .m_title {
      line-height 50px
    }

    .el-select {
      margin-bottom: 50px

      >>> input {
        width 400px
      }

      >>> .el-select__tags {
        max-height 120px
        overflow auto
      }
    }
  }
    .modal-btn{
      margin-bottom 20px
    }

  .print-list{
    width: 1510px;
  }
</style>
<script>
import bedSide from  '../bed-print-batch/bedSide.vue'
import wristStrap from '../bed-print-batch/wristStrap.vue'
import print from './tool/batchPrint'
export default {
  props: {
    list: {
      type: Array,
      value: [],
      disabled: true
    }
  },
  data() {
    return {
      printSelect: [],
      optionList: [],
      category: 'bedside',
      printData: [],
      isBedSide: false,
      title: "请选择需要打印的患者",
    };
  },
  methods: {
    close() {
      this.printSelect = [];
      this.$refs.modal.close();
    },
    open(key) {
      this.category = key
      this.optionList = key == 'bedthNull' ? this.list.sort((a, b) => a.bedNo - b.bedNo) : this.list.filter(item => item.patientId).sort((a, b) => a.bedNo - b.bedNo)
      this.$refs.modal.open();
    },
    post() {
      this.printData = this.optionList.filter(item => this.printSelect.includes(item.bedLabel));
      if(this.category == 'wristStrap'){
        this.$refs.wristStrapPrint.onPrint()
      }else if(this.category == 'bedthNull'){
        this.$refs.bedSideNullPrint.onPrint()
      }else{
        this.onPrint()
      }
    },
     onPrint() {
      this.isBedSide = true;
      const printCare = document.querySelectorAll(".printCare");
      let arr = [];
      for (let i = 0; i < printCare.length; i++) {
        arr = printCare[i].className.split(" ");
        if (!arr.includes("active")) printCare[i].style.display = "none";
      }
      this.$nextTick(() => {
        print(
          this.$refs.bedSidePrint,
          (el) => { },
          this.category
        );
        for (let i = 0; i < printCare.length; i++) {
          printCare[i].style.display = "block";
        }
         this.isBedSide = false;
      });
    },
  },
  components: {bedSide,wristStrap}
};
</script>
