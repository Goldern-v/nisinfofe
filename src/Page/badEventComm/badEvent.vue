
<template>
  <!-- 不良事件 -->

  <div
    class="bad-event"
    :style="'height:' + (wih - 60) + 'px!important;overflow: hidden;'"
  >
    <Search v-if="!params.id"></Search>
    <router-view v-if="params.id"></router-view>
  </div>
</template>

<style lang="stylus"   rel="stylesheet/stylus" type="text/stylus" scoped>
.bad-event {
  display: flex;
  flex-direction: column;

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 41px;
    padding: 0 18px;
    background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
    border: 1px solid #CBD5DD;
    overflow: hidden;
    font-size: 14px;

    &-left {
      flex: 1;
    }

    &-left, .el-input, .el-input__inner {
      width: 150px !important;
      display: inline-block !important;
    }

    &-left .date-picker .el-input .el-input__inner {
      width: 150px !important;
    }
  }

  >>>.el-input__inner {
    height: 30px !important;
  }

  .bad-event-container {
    padding: 0;
    flex: 1;
    overflow: auto;
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import editpage from "./badEventEditPage.vue";
import viewpage from "./badEventViewPage.vue";
import dayjs from "dayjs";
import apis from "./apis/index.js";

import EventTable from "./components/table/eventTable";
import Button from "./components/button";

import Search from "./components/toolbar/search";

import BusFactory from "vue-happy-bus";

export default {
  mixins: [common],
  components: {
    Button,
    EventTable,
    Search
  },
  props: {},
  data() {
    return {
      bus: BusFactory(this),
      params: {}
    };
  },
  watch: {
    "$route.params"() {
      this.params = this.$route.params;
    }
  },
  created() {
    this.bus.$on("gotoHomePage", this.gotoHomePage);
    localStorage["showBadEvent"] = "true";
  },
  mounted() {
    this.params = this.$route.params;
  },

  methods: {
    gotoHomePage() {
      this.$router.push({ name: "badEvents" });
    }
  }
};
</script>
