<template>
<sweet-modal
      ref="modal"
      :modalWidth="820"
      :title="title"
      :enable-mobile-fullscreen="false"
      class="modal"
      @close="()=>{this.printSelect = []}"
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
import { batchGetEntity } from "@/Page/patientInfo/supComponts/modal/api/index.js";
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
      // 床号排序
      this.optionList = key == 'bedthNull' ? this.list.sort((a, b) => a.bedNo - b.bedNo) : this.list.filter(item => item.patientId).sort((a, b) => a.bedNo - b.bedNo)
      this.$refs.modal.open();
    },
    async post() {
      if(!this.printSelect.length) return  this.$message({
          type: "warning",
          message: "请选择打印床号！",
        });
      if(['whhk'].includes(this.HOSPITAL_ID)){
          const printArr=[]
          this.optionList.map(item => {
            if(this.printSelect.includes(item.bedLabel)){
              printArr.push(
                {
                  patientId:item.patientId,
                  visitId:item.visitId,
                  nursingClass:item.nursingClass,
                  patientCondition:item.patientCondition,
                })
            }
          })
          const res = await batchGetEntity(printArr)
          this.printData=res.data.data
          this.printData=this.printData.map(item => {
            if(!item.registCare){
              // 空的字段，去拿原来的护理级别、病情等级去做默认值
              printArr.map(patientItem=>{
                if(patientItem.patientId==item.patientId){
                   // 护理级别
                  if (patientItem.nursingClass == "特级护理") {
                     item.registCare=item.registCare?`${item.registCare},'特'`:`特`
                  }
                  if (patientItem.nursingClass == "一级护理") {
                     item.registCare=item.registCare?`${item.registCare},'一'`:`一`
                  }
                  if (patientItem.nursingClass == "二级护理") {
                     item.registCare=item.registCare?`${item.registCare},'二'`:`二`
                  }
                  if (patientItem.nursingClass == "三级护理") {
                     item.registCare=item.registCare?`${item.registCare},'三'`:`三`
                  }
                  // 病情等级
                  if (patientItem.patientCondition.includes("普通")) {
                     item.registCare=item.registCare?`${item.registCare},'普'`:`普`
                  }
                  if (patientItem.patientCondition.includes("病危")) {
                     item.registCare=item.registCare?`${item.registCare},'危'`:`危`
                  }
                  if (patientItem.patientCondition.includes("病重")) {
                     item.registCare=item.registCare?`${item.registCare},'重'`:`重`
                  } 
                }
              })
            }
            return item
          })
      }else{
         this.printData = this.optionList.filter(item => this.printSelect.includes(item.bedLabel))
      }
      if(this.category == 'wristStrap'){
        this.$refs.wristStrapPrint.onPrint()
      }else if(this.category == 'bedthNull'){
        this.$refs.bedSideNullPrint.onPrint()
      }else{
        if(['whhk'].includes(this.HOSPITAL_ID)){
          this.$refs.bedSideNullPrint.onPrintWhhk()
        }else{
          this.onPrint()
        }
      }
    },
     onPrint() {
      this.isBedSide = true;
        this.$nextTick(() => {
          print(
            this.$refs.bedSidePrint,
            (el) => { },
            this.category
          );
           this.isBedSide = false;
        });
    },
  },
  components: {bedSide,wristStrap}
};
</script>
