<template>
  <sweet-modal ref="modalName" title="同步医嘱" class="modal-con">
    <advice ref="advice" :isMulti="true" @handleCheckbox="handleCheckbox" />
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()"
        >取消</el-button
      >
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang="stylus" scoped>
.modal-con
  >>>.sweet-content
    max-height 100vh
  >>>.content
    overflow hidden
    margin: 0 0 10px
  >>>.sweet-content
    background #F0f0f0
</style>
<script>
import advice from "@/Page/patientInfo/supPage/advice/advice";
export default {
  props: {},
  data() {
    return {
      selected: []
    };
  },
  methods: {
    open() {
      this.selected = []
      this.$refs.modalName.open();
      this.$refs.advice.getData()
    },
    post() {
      if (this.selected.length == 0) return this.$message.warning('请选择一条数据')
      this.$emit('handleOk',{ item: this.selected.map(v => ({val: [v.orderText, v.dosage + v.dosageUnits, v.administration].filter(v=>v).join('-')})), key: 'val' })
      this.$refs.modalName.close()
    },
    handleCheckbox(e) {
      // console.log('test-e', e)
      this.selected = e
    }
  },
  components: {
    advice
  }
};
</script>
