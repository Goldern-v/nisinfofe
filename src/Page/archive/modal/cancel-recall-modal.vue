<template>
  <sweet-modal
    ref="modal"
    modalWidth="400"
    title="撤销召回申请"
    :enable-mobile-fullscreen="false">
    <p>确定要撤销这条患者病历召回申请吗？</p>
    <div slot="button">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped></style>
<script>
import { recallCancel } from '../api';
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
return {};
},
methods: {
  handleCancel() {
    this.$refs.modal.close()
  },
  open() {
    this.$refs.modal.open()
  },
  async handleSubmit() {
    await this.recallCancel()
  },
  async recallCancel() {
    try {
      const { patientId, visitId } = this.item
      this.$emit('update:loading', true)
      const res = await recallCancel({
        patientId,
        visitId
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
  }
},
components: {}
};
</script>
