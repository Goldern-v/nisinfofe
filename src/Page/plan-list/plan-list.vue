<template>
  <div class="contain" :class="{ fullpage }" element-loading-text="正在保存">
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <div class="head-con" flex>
        <div class="dept-select-con" v-show="openLeft"></div>
        <div class="tool-con" flex-box="1">
          <tool></tool>
        </div>
      </div>
      <div class="left-part">
        <patientList
          :data="data.bedList"
          v-loading="patientListLoading"
          :isSelectPatient="isSelectPatient"
        ></patientList>
      </div>
      <div
        class="right-part"
        v-loading="tableLoading"
        :class="openLeft ? 'isLeft' : 'isRight'"
      >
        <div class="sheetTable-contain">
          <tableCon v-if="model.selectedBlockId"></tableCon>
          <nullBg v-else text="暂无数据～"></nullBg>
          <slideCon ref="slideCon"></slideCon>
          <!-- <slideConRight ref="slideConRight"></slideConRight> -->
          <slideContant :is="isslideContant()" ref="slideContant"></slideContant>
          <!-- <slideConRightGuizhou ref="slideConRightGuizhou"></slideConRightGuizhou> -->
          <slideConRight :is="slideConRight()" ref="slideConRight"></slideConRight>
          <!-- <slideConRightLiaoCheng ref="slideConRightLiaoCheng"></slideConRightLiaoCheng> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 0;
  background: #fff;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  &.fullpage {
    position: fixed !important;
    z-index: 10000;
    left: 0;
    top: 60px;
    bottom: 0;
    right: 0;
    margin: 0;
  }

  .head-con {
    height: 41px;
  }

  .body-con {
    position: relative;

    .left-part {
      width: 199px;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      padding-top: 60px;
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      .sheetTable-contain {
        overflow: hidden;
      }
    }
    .isRight{
      margin-left: 0px;
    }
  }
}

.dept-select-con {
  box-sizing: border-box;
  width: 199px;
  height: 41px;
  background: #F7FAFA;
  border-right: 1px solid #CBD5DD;
  border-bottom: 1px solid #EAEEF1;
  border-radius: 2px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  >>>.el-input__inner {
    width: 172px;
    height: 28px;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
    font-size: 12px;
  }
}

.sheetTable-contain {
  height: 100%;
  background: #DFDFDF;
  overflow: auto;
  padding: 15px 5px 15px;
  box-sizing: border-box;
  margin: 0 auto 20px;
  position: relative;
}
</style>
<script>
import nullBg from "@/components/null/null-bg.vue";
import { patient } from "@/api/home";
import patientList from "@/components/patient-list/patient-list.vue";
import BusFactory from "vue-happy-bus";
import tool from "@/Page/patientInfo/supPage/diagnosis/components/tool/tool";
import tableCon from "@/Page/patientInfo/supPage/diagnosis/components/tableCon/tableCon";
import slideCon from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideCon";
// import slideConRight from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideConRight";
import slideContant from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideContant.vue"
import slideContantQHWY from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideContantQHWY.vue"
import slideContantBHRY from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideContantBHRY.vue"

import slideConRightGuizhou from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideRightGuizhou.vue";
import slideConRightQHWY from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideRightQHWY.vue";
import slideConRightLiaoCheng from "@/Page/patientInfo/supPage/diagnosis/modal/slide/slideRightLiaoCheng.vue";
import { model } from "@/Page/patientInfo/supPage/diagnosis/diagnosisViewModel";

import { getPlanFormListByPV } from "@/Page/patientInfo/supPage/diagnosis/api";
import common from "@/common/mixin/common.mixin";
import moment from "moment";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
export default {
  provide() {
    return {
      openSlideCon: item => {
          this.$refs.slideConRight.open(item)
      },
      // openSlideConRight: item => this.$refs.slideConRight.open(item),
      openSlideContant: item => this.$refs.slideContant.open(item)
    };
  },
  mixins: [common],
  data() {
    return {
      model,
      list: [],
      data: {
        bedList: []
      },
      bus: BusFactory(this),
      page: {
        pageIndex: 0,
        pageSize: 10
      },
      tableLoading: false,
      patientListLoading: true
    };
  },
  computed: {
    containHeight() {
      if (this.fullpage) {
        return this.wih - 44 + "px";
      } else {
        return this.wih - 104 + "px";
      }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    boxHeight() {
      return this.wih - 185 + "px";
    },
    // 接收左侧患者栏子组件传来的是否左靠的值
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    }
  },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
      }
    },
    $route: {
      handler(val, oldval) {
        let newParams = val.query.patientId;
        let oldParams = oldval.query.patientId;
        if (!newParams) {
          this.model.selectedBlockId = "";
        }
      }
    }
  },
  methods: {
    slideConRight(){
      if(['liaocheng'].includes(this.HOSPITAL_ID)){
        return slideConRightLiaoCheng
      }else if(['qhwy'].includes(this.HOSPITAL_ID)){
        return slideConRightQHWY
      }else{
        return slideConRightGuizhou
      }
    },
    isslideContant(){
      if(['qhwy'].includes(this.HOSPITAL_ID)){
        return slideContantQHWY
      }
      else if(['beihairenyi'].includes(this.HOSPITAL_ID)){
        return slideContantBHRY
      }else return slideContant
    },
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode).then(res => {
          this.data.bedList = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    },

    isSelectPatient(item) {
      this.$router.replace({
        path: "/planList",
        query: item
      });
      this.refreshBlock();
    },
    refreshBlock() {
      getPlanFormListByPV(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then(res => {
        this.model.blockList = res.data.data.map(item => {
          return {
            ...item,
            label: `${item.wardName} ${moment(item.createDate).format(
              "MM-DD"
            )}建`
          };
        });
        let currentBlock = res.data.data.find(
          item => item.wardCode == this.deptCode
        );
        // 若存在则 当前模块赋值
        if (currentBlock) {
          this.model.selectedBlock = currentBlock;
          this.model.selectedBlockId = currentBlock.id;
        }
        // 否则 当前模块值为空，显示“暂无数据”
        else {
          this.model.selectedBlock = {};
          this.model.selectedBlockId = "";
        }
      });
    }
  },
  created() {
    this.$store.commit("upPatientInfo", {});
    // 初始化
    if (this.deptCode) {
      this.getDate();
    }
    this.model.refreshBlock = this.refreshBlock;
  },
  mounted() {
    this.refreshBlock();
  },
  components: {
    nullBg,
    tool,
    slideCon,
    // slideConRight,
    tableCon,
    patientList,
    slideConRightGuizhou,
    slideConRightQHWY,
    slideConRightLiaoCheng,
    slideContant,
    slideContantQHWY,
    slideContantBHRY,
  }
};
</script>
