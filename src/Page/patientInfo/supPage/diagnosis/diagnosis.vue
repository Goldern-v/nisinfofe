<template>
  <div class="contain">
    <tool></tool>
    <tableCon v-if="model.selectedBlockId"></tableCon>
    <nullBg text="暂无数据～" v-else></nullBg>
    <slideCon ref="slideCon"></slideCon>
    <slideContant ref="slideContant"></slideContant>
    <slideConRightGuizhou ref="slideConRightGuizhou"></slideConRightGuizhou>
    <slideConRightLiaoCheng ref="slideConRightLiaoCheng"></slideConRightLiaoCheng>
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
import slideConRightLiaoCheng from "./modal/slide/slideRightLiaoCheng.vue";
import slideContant from "./modal/slide/slideContant.vue"
import { model } from "./diagnosisViewModel";
import { getPlanFormListByPV } from "./api";
import common from "@/common/mixin/common.mixin";
import moment from "moment";
export default {
  provide() {
    return {
      openSlideCon: item => {
        if(['liaocheng'].includes(this.HOSPITAL_ID)){
          this.$refs.slideConRightLiaoCheng.open(item)
        }else{
          this.$refs.slideConRightGuizhou.open(item)
        }
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
    slideConRightLiaoCheng,
    slideContant,
    tableCon
  }
};
</script>
