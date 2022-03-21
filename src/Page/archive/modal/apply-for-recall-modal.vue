<template>
  <sweet-modal
    class="apply-for-recall-modal"
    ref="modal"
    :modalWidth="400"
    title="档案召回修改申请"
    :enable-mobile-fullscreen="false">
    <div>
      <p>请填写档案修改理由：</p>
      <el-input type="textarea" :rows="Number(4)" resize="none" v-model="resultText"/>
    </div>
    <div slot="button">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='stylus'>
.apply-for-recall-modal {
  /deep/.sweet-modal .sweet-content {
    min-height: 120px !important;
    height: 120px;
  }
}
</style>
<script>
import { recallApply } from '../api';
export default {
props: {
  item: {
    type: Object,
    default: () =>({})
  },
  loading: {
    type: Boolean,
    default: false,
  },
},
data() {
return {
  resultText: '',
};
},
methods: {
  handleCancel() {
    this.$refs.modal.close()
  },
  open() {
    this.resultText = ''
    this.$refs.modal.open()
  },
  async recallApply() {
    try {
      const { patientId, visitId } = this.item
      this.$emit('update:loading', true)
      const res = await recallApply({
        patientId,
        visitId,
        handleContent: this.resultText
      })
      if (res.data && res.data.code == 200) {
        this.$emit('update:loading', false)
        this.$emit('refresh', res.data.data)
        this.$message.success(res.data.desc);
        this.handleCancel()
      }
    } catch (e) {
      this.$emit('update:loading', false)
    }
  },
  async handleSubmit() {
    await this.recallApply()
  }
},
components: {}
};
</script>
