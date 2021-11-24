<template>
  <div class="patient-flow-msg" :style="{height:wih - 60 + 'px'}">
    <div class="patient-flow-msg__left">
      <div class="user-box">
        <div class="user-head">
          <img
            v-if="info.sex === '女'"
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
        <p class="name">{{ info.name }}</p>
        <div class="list-box">
          <p class="list-box__item">患者ID：{{ info.inpNo }}</p>
          <p class="list-box__item">{{ `${info.sex} ${info.age}` }}</p>
          <p class="list-box__item">所在科室：{{ info.deptName }}</p>
          <p class="list-box__item">床位：{{ info.bedLabel }}</p>
        </div>
      </div>
      <div class="list2-box">
        <p class="list2-box__title">转科信息</p>
        <p class="list2-box__item">转出科室：{{ info.a || "--" }}</p>
        <p class="list2-box__item">转出时间：{{ info.a || "--" }}</p>
        <p class="list2-box__item">转出责任护士：{{ info.a || "--" }}</p>
        <p class="list2-box__item">转入科室：{{ info.a || "--" }}</p>
        <p class="list2-box__item">转入时间：{{ info.a || "--" }}</p>
        <p class="list2-box__item">转入责任护士：{{ info.a || "--" }}</p>
      </div>
    </div>
    <div class="patient-flow-msg__right">
      <div class="content"></div>
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

    .user-box {
      overflow: hidden;
      width: 200px;
      height: 267px;
      background-image: url('../../common/images/patient/患者背景.png');
      box-sizing: cover;
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
      // margin-top: 18px;
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
      flex: 1;
      overflow-y: auto;

      .list2-box__title {
        font-size: 15px;
        f-font-weight: 500;
        margin-bottom: 10px;
        color: #687179;
      }

      .list2-box__item {
        margin-bottom: 7px;
        font-size: 13px;
        color: #687179;
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
import { getPatientInfo } from '@/api/common';

export default {
  mixins: [commonMixin],
  props: {},
  data() {
    return {
      info: {}
    };
  },
  mounted() {
    const { patientId = '0001028000', visitId = '2' } = this.$route.query
    getPatientInfo(patientId, visitId).then(res => {
      this.info = res.data.data
      console.log('test-this.info', this.info)
    }).catch(err => console.log(err))
  },
  methods: {
  },
  components: {}
};
</script>
