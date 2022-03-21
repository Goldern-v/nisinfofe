<template>
  <sweet-modal
    class="audit-modal"
    ref="modal"
    :modalWidth="400"
    title="档案申请召回审核"
    :enable-mobile-fullscreen="false">
    <div>
      <div class="content-form__item">
        <p>审核意见：</p>
        <el-radio v-model="optionType" :label="true" size="small">通过</el-radio>
        <el-radio v-model="optionType" :label="false" size="small">驳回</el-radio>
      </div>
      <div class="content-form__item">
        <p>提  交  人：{{user.empName}}</p>
      </div>
      <div class="content-form__item">
        <p>提交时间：{{ curDate }}</p>

      </div>
      <div class="content-form__item">
        <p>审核意见：</p>
        <el-input type="textarea" :rows="Number(4)" resize="none" v-model="resultText"/>
      </div>
    </div>
    <div slot="button">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='stylus'>
.audit-modal {
  .content-form__item {
    display: flex;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
    p {
      white-space: nowrap;
    }
  }
}
</style>
<script>
import moment from 'moment';
import { recallAudit } from '../api';
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
  optionType: true,
  resultText: '',
  user: JSON.parse(localStorage.user),
  curDate: moment().format('YYYY-MM-DD HH:mm:ss')
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
  async recallAudit() {
    try {
      const { patientId, visitId } = this.item
      this.$emit('update:loading', true)
      const res = await recallAudit({
        patientId,
        visitId,
        handleResult: this.optionType,
        handleContent: this.resultText,
        handlerNo: this.user.empNo,
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
    await this.recallAudit()
  }
},
components: {}
};
</script>
