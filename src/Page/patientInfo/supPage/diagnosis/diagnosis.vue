<template>
  <div class="contain">
    <tool></tool>
    <tableCon v-if="model.selectedBlockId"></tableCon>
    <nullBg text="暂无数据～" v-else></nullBg>
    <slideCon ref="slideCon"></slideCon>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>


</style>
<script>
import nullBg from "../../../../components/null/null-bg";
import { patient } from "@/api/home";
import BusFactory from "vue-happy-bus";
import tool from "./components/tool/tool";
import tableCon from "./components/tableCon/tableCon";
import slideCon from "./modal/slide/slideCon";
import { model } from "./diagnosisViewModel";
import { getPlanFormListByPV } from "./api";
import common from "@/common/mixin/common.mixin";
import moment from "moment";
export default {
  provide() {
    return {
      openSlideCon: item => this.$refs.slideCon.open(item)
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
    tableCon
  }
};
</script>
