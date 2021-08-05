<template>
  <div class="search-con">
    <el-button @click="setting">警戒值设置</el-button>
    <el-button @click="log">报警日志</el-button>
    <!-- <el-button @click="infuseStat">输液量统计</el-button> -->
    <div class="input-con" flex="cross:stretch">
      <input type="text" class="search-input" flex-box="1" placeholder="床号/姓名" v-model="searchText" />
      <div class="search-btn" flex="cross:center main:center">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <el-button @click="toSearch">查询</el-button>
    <p v-if="warningValue">剩余液量低于（{{warningValue}}）ml会报警</p>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-con {
  display: flex;
  align-items: center;
  position: fixed;
  top: 61px;
  left: 0;
  width: 100%;
  height: 44px;
  background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
  padding-left: 28px;
  border-bottom: 1px solid #cbd5dd;
  box-sizing: border-box;
  z-index: 1000;

  .el-button {
    font-size: 12px;
    color: #333;
    border-color: #cbd5dd;
    border-radius: 2px;
    height: 26px;
    padding: 0 10px;
  }

  .input-con {
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 2px 0 0 2px;
    height: 26px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 6px;

    .search-input {
      width: 150px;
      outline: none;
      border: 0;
      font-size: 12px;
      color: #687179;
      padding-left: 15px;
    }
  }

  p {
    flex: 1;
    font-size: 13px;
    text-align: right;
    padding-right: 268px;
  }
}
</style>

<script>
import { getNotice } from "@/api/whiteBoard";
export default {
  data() {
    return {
      searchText: ""
    };
  },
  props: {
    warningValue: String
  },
  methods: {
    toSearch() {
      this.$emit("search", this.searchText);
    },
    setting() {
      console.log(22);
      this.$emit("openSettingModal");
      // this.$refs.settingModal.open(this.warningValue);
    },
    log() {
      this.$router.push("/infuse/alarmLog");
    },
    infuseStat() {
      this.$router.push("/infuse/infuseStat");
    }
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode;
    }
  },
  created() {},
  watch: {
    deptCode() {},
    searchText() {}
  },
  components: {}
};
</script>
