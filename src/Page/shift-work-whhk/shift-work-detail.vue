<template>
  <div class="shift-work-detail">
    <component :is="shiftWorkDetail"></component>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import shiftWorkContent from "./shift-work-content";
import shiftWorkContentICU from "./shift-work-content-icu";
export default {
  mixins: [common],
  async beforeRouteLeave(to, from, next) {
    if (this.modified) {
      await this.$confirm("交班志还未保存，离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning",
      });
    }
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    if (this.modified && from.params.id && from.params.id !== to.params.id) {
      await this.$confirm("交班志还未保存，离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning",
      });

      this.$refs.table.selectRow(-1);
    }

    next();
  },
  data() {
    return {};
  },
  computed: {
    shiftWorkDetail() {
      if (this.deptCode == "0256H" || this.deptCode == "0257H") {
        return shiftWorkContentICU;
      } else {
        return shiftWorkContent;
      }
    },
  },
  watch: {
    modified(value, oldValue) {
      if (value !== oldValue) {
        window.onbeforeunload = value ? () => true : null;
      }
    },
  },
  mounted() {},
  methods: {},
  components: {
    shiftWorkContent,
    shiftWorkContentICU,
  },
};
</script>

<style lang="stylus" scoped>
.shift-work-detail {
  height: 100%;
}
</style>
