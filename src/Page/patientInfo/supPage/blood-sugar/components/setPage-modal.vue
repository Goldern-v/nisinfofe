<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="420" title="设置起始页码" :enable-mobile-fullscreen="false">
      <div flex="main:center cross:center" style="margin-bottom: 20px">
        <p style="margin-right: 10px">起始页码修改：</p>
        <el-input-number size="large" v-model="startPage" @change="handleChange" :min="1"></el-input-number>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">保存</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>
<script>
import bus from "vue-happy-bus";
import { getPvHomePage, savePvHomePage } from "../api/index";
export default {
  data() {
    return {
      pageLength: 1,
      startPage: 1,
      bus: bus(this)
    };
  },
  methods: {
    open(length) {
      this.pageLength = length
      this.$refs.modal.open();
      getPvHomePage(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then(res => {
        if (res.data.data) {
          this.startPage = res.data.data.indexNo;
        } else {
          this.startPage = 1;
        }
      });
    },
    close() {
      this.$refs.modal.close();
    },
    handleChange(value){
      if(['whsl'].includes(this.HOSPITAL_ID)){
        if(value>this.pageLength){
          this.$message.error(`当前页数为${this.pageLength},设置调整已超过范围！`)
          return
        }
        this.startPage = value;
      }
    },
    post() {
      if(this.startPage>this.pageLength){
        this.$message.warning("请输入正确的页数！")
        return
      }
      savePvHomePage(
        this.$route.query.patientId,
        this.$route.query.visitId,
        this.startPage
      ).then(res => {
        this.$parent.startPage = this.startPage;
        this.$message.success("保存成功");
        this.close();
      });
      // saveHomePage(this.$parent.patientInfo.patientId, this.$parent.patientInfo.visitId, this.startPage).then(res => {
      //   this.$message.success(`起始页设置为 ${ this.startPage } 成功`)
      //   this.bus.$emit('refrehSheetStartPage')
      //   setTimeout(() => this.bus.$emit('initSheetPageSize'), 1000)
      //   setTimeout(() => {
      //     if(document.querySelectorAll('.sheet-table').length == 0) {
      //       this.bus.$emit('initSheetPageSize')
      //     }
      //   }, 1000)
      //   this.close()
      // })
    }
  },
  components: {}
};
</script>
