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
          <p class="list-box__item">患者ID：{{ info.patientId }}</p>
          <p class="list-box__item">{{ `${info.sex} ${info.age }` }}</p>
          <p class="list-box__item">所在科室：{{ info.deptName }}</p>
          <p class="list-box__item">床位：{{ info.bedLabel }}</p>
        </div>
      </div>
      <div class="list2-box">
        <p class="list2-box__title">转科信息</p>
        <p class="list2-box__item">转出科室：{{ getDeptName(info.transferFrom) || "--" }}</p>
        <p class="list2-box__item">转出时间：{{ info.outDateTime || "--" }}</p>
        <p class="list2-box__item">转出责任护士：{{ info.nurseOut || "--" }}</p>
        <p class="list2-box__item">转入科室：{{ getDeptName(info.transferTo) || "--" }}</p>
        <p class="list2-box__item">转入时间：{{ info.inDateTime || "--" }}</p>
        <p class="list2-box__item">转入责任护士：{{ info.nurseIn || "--" }}</p>
      </div>
      <!-- <div class="patient-flow-msg__left__tree">
        <el-tree
        node-key="id"
        :data="formList"
        empty-text="暂无表单列表数据"
        @node-click="opendetail">
          <span class="custom-tree-node" slot-scope="{ node }">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </div> -->
    </div>
    <div class="patient-flow-msg__right">
      <form-detail :info="info" :detail="formModel"></form-detail>
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
    .patient-flow-msg__left__tree {
      width: 100%;
      .el-tree {
        border: none;
        background: transparent;
        color: #687179;
      }
      /deep/ .el-tree-node__content {
        overflow: hidden;
        display: flex;
        align-items: center;
        .el-tree-node__label {
          font-size: 13px
        }
      }
      /deep/ .el-tree-node__label {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 15px;
      }
      /deep/ .el-tree__empty-block {
        font-size: 15px;
        white-space: nowrap;
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
import { nursingUnit } from '@/api/lesion';

export default {
  mixins: [commonMixin],
  props: {},
  data() {
    return {
      info: {},
      // itemDataMap: {},
      formList: [],
      deptList: [],
      formModel: {},
      // 具体表单id
      currentId: ''
    };
  },
  async mounted() {
    try {
      const { id, age } = this.$route.query
      const res = await nursingUnit()
      this.deptList = res.data.data && res.data.data.deptList || []

      const res1 = await getPatientFlowDetail(id)
      this.info = res1.data.data && res1.data.data.master || {}
      this.info = { ...this.info, age }
      // this.itemDataMap = res1.data.data && res1.data.data.itemDataMap || {}

      if (!this.info.formCode) return
      let { patientId, visitId, formCode } = this.info;
      const res2 = await getFlowForm({ formCode, patientId, visitId })
      // const res3 = await getFormList({ formCode, patientId, visitId })

      this.formModel = res2 && res2.data.data || {}
    } catch (err) {}
  },
  methods: {
    getDeptName(code) {
      if (!code) return ''
      const item = this.deptList.find(v => v.code === code)
      return item ? item.name : ''
    },
    opendetail(item) {
      if (item.children) return
      this.currentId = item.id
    }
  },
  components: {
    formDetail
  }
};
</script>
