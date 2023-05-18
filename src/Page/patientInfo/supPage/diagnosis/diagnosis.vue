<template>
  <div class="contain">
    <tool></tool>
    <tableCon v-if="model.selectedBlockId"></tableCon>
    <nullBg text="暂无数据～" v-else></nullBg>
    <slideCon ref="slideCon"></slideCon>
    <slideContant :is="isslideContant()" ref="slideContant"></slideContant>
    <slideConRight :is="slideConRight()" ref="slideConRight"></slideConRight>
    <!-- <slideConRightQHWY ref="slideConRightQHWY"></slideConRightQHWY> -->
    <!-- <slideConRightLiaoCheng ref="slideConRightLiaoCheng"></slideConRightLiaoCheng> -->
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>


</style>
<script>
import nullBg from "../../../../components/null/null-bg";
import BusFactory from "vue-happy-bus";
import tool from "./components/tool/tool";
import tableCon from "./components/tableCon/tableCon";
import slideCon from "./modal/slide/slideCon";
import slideConRightGuizhou from "./modal/slide/slideRightGuizhou.vue";
import slideConRightQHWY from "./modal/slide/slideRightQHWY.vue";
import slideConRightLiaoCheng from "./modal/slide/slideRightLiaoCheng.vue";
import slideContant from "./modal/slide/slideContant.vue"
import slideContantQHWY from "./modal/slide/slideContantQHWY.vue"
import { model } from "./diagnosisViewModel";
import { getPlanFormListByPV } from "./api";
import common from "@/common/mixin/common.mixin";
import moment from "moment";
export default {
  provide() {
    return {
      openSlideCon: item => {
        this.$refs.slideConRight.open(item)
      },
      openSlideContant: item => this.$refs.slideContant.open(item)
    };
  },
  mixins: [common],
  data() {
    return {
      model,
      list: [],
      bus: BusFactory(this),
      page: {
        pageIndex: 0,
        pageSize: 10
      },
      pageLoading: true
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    boxHeight() {
      return this.wih - 185 + "px";
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
      }else return slideContant
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
        if (currentBlock) {
          this.model.selectedBlock = currentBlock;
          this.model.selectedBlockId = currentBlock.id;
        }
      });
    }
  },
  created() {
    this.model.refreshBlock = this.refreshBlock;
  },
  mounted() {
    this.refreshBlock();
  },
  components: {
    nullBg,
    tool,
    slideCon,
    slideConRightGuizhou,
    slideConRightQHWY,
    slideConRightLiaoCheng,
    slideContant,
    slideContantQHWY,
    tableCon
  }
};
</script>
