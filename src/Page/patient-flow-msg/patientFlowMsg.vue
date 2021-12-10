<template>
  <div class="patient-flow-msg" :style="{height:wih - 60 + 'px'}">
    <div class="patient-flow-msg__left">
      <div class="user-box">
        <div class="user-head">
          <img
            v-if="master.sex === '女'"
            src="@/Page/lesion/supPage/bed/component/bed-item-lcey/images/女.png"
            height="72"
            width="72"
          />
          <img
            v-else
            src="@/Page/lesion/supPage/bed/component/bed-item-lcey/images/男.png"
            height="72"
            width="72"
          />
        </div>
        <p class="name">{{ master.name }}</p>
        <div class="list-box">
          <p class="list-box__item">患者ID：{{ master.patientId }}</p>
          <p class="list-box__item">{{ `${master.sex} ${master.age }` }}</p>
          <p class="list-box__item">所在科室：{{ master.deptName }}</p>
          <p class="list-box__item">床位：{{ master.bedLabel }}</p>
        </div>
      </div>
      <div class="list2-box">
        <p class="list2-box__title">转科信息</p>
        <p class="list2-box__item">转出科室：{{ master.transferFromName || "--" }}</p>
        <p class="list2-box__item">转出时间：{{ master.outDateTime || "--" }}</p>
        <p class="list2-box__item">转出责任护士：{{ master.nurseOut || "--" }}</p>
        <p class="list2-box__item">转入科室：{{ master.transferToName || "--" }}</p>
        <p class="list2-box__item">转入时间：{{ master.inDateTime || "--" }}</p>
        <p class="list2-box__item">转入责任护士：{{ master.nurseIn || "--" }}</p>
      </div>
    </div>
    <div class="patient-flow-msg__right">
      <form-detail ref="formDetail" :master="master" :itemDataMap="itemDataMap" :detail="formModel"></form-detail>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.patient-flow-msg {
  display: flex;
  .patient-flow-msg__left {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 200px;
    background: #f8f8f8;
    overflow-y: auto

    .user-box {
      overflow: hidden;
      width: 200px;
      height: 267px;
      background-image: url('../../common/images/patient/患者背景.png');
    }

    .user-head {
      width: 62px;
      height: 62px;
      margin: 22px auto 12px;
      border-radius: 50%;
      border: 1px solid #FCFCFC;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .name {
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
    }
    .list-box {
      margin: 18px 10px;

      .list-box__item {
        margin-bottom: 7px;
        font-size: 13px;
        color: #FFFFFF;
        font-weight: lighter;
        line-height: 16px;
      }
    }
    .list2-box {
      margin: 14px 10px;
      color: #687179;

      .list2-box__title {
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 10px;
        line-height: 20px;
      }

      .list2-box__item {
        margin-bottom: 7px;
        font-size: 13px;
        line-height: 20px;
        word-break: break-all;
      }
    }
  }
  .patient-flow-msg__right {
    flex: 1;
    display: flex;
    justify-content: center;
    .content {
      width: 60%;
      height:  calc(100% - 30px);
      overflow-y: auto;
      background: #fff;
      padding: 0 20px;
      margin-top: 30px;
    }
  }
}
</style>
<script>
import commonMixin from '@/common/mixin/common.mixin';
import { getPatientFlowDetail, getFlowForm } from '@/api/patient-flow';
import formDetail from './components/form-detail.vue'

export default {
  mixins: [commonMixin],
  props: {},
  data() {
    return {
      master: {},
      formModel: {},
      itemDataMap: {}
    };
  },
  async mounted() {
    try {
      const { id, age } = this.$route.query

      const res1 = await getPatientFlowDetail(id)
      this.master = res1.data.data && res1.data.data.master || {}
      this.master = { ...this.master, age }
      this.itemDataMap = res1.data.data && res1.data.data.itemDataMap || {}
      if (!this.master.formCode) return
      let { patientId, visitId, formCode } = this.master;
      const res2 = await getFlowForm({ formCode, patientId, visitId })

      this.formModel = res2 && res2.data.data || {}
    } catch (err) {
      this.$message({
        showClose: true,
        message: '服务器开小差了',
        type: 'error'
      })
      this.$refs.formDetail.pageLoading = false
    }
  },
  components: {
    formDetail
  }
};
</script>
