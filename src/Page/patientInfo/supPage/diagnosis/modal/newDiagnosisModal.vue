<template>
  <div class="diagnosis-modal">
    <sweet-modal ref="newRecord" size="big-650" title="添加护理诊断">
      <div class="record-con">
        <div class="search-con">
          <div @keyup.enter.prevent="searchBybtn">
            <!-- <el-input placeholder="请输入诊断关键词" v-model="searchWord" class="diagnosis-search">
              <el-button type="primary" slot="append" v-touch-ripple @click="search">搜索</el-button>
            </el-input>-->
            <el-autocomplete
              placeholder="请输入诊断关键词"
              v-model="searchWord"
              class="diagnosis-search"
              :fetch-suggestions="querySearch"
            >
              <el-button type="primary" slot="append" v-touch-ripple @click="searchBybtn">搜索</el-button>
            </el-autocomplete>
          </div>
          <div class="cache-con">
            <span>历史记录：</span>
            <span
              class="cache-item"
              @click="searchWord = item; search()"
              v-for="item in cacheSearchList"
              :key="item"
            >{{item}}</span>
          </div>
        </div>
        <div class="tip">
          <span v-if="totalCount > -1">为您找到{{totalCount}}条相关诊断，请选择</span>
          <span v-else>请输入搜索关键词</span>
        </div>
        <div class="list-con" v-loading="searchLoading">
          <diagnosisList v-for="item of list" :key="item.id" :data="item" :word="searchWord"></diagnosisList>
        </div>
      </div>
      <div class="page-con">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.diagnosis-modal
  .sweet-modal .sweet-content
    max-height calc(100vh - 50px)
.diagnosis-search
  width 100%
  .el-input-group__append
    background: #4BB08D;
    border: 1px solid #4BB08D;
    color #fff
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-con
  // height 50px
  padding-top 14px
  border-bottom: 1px solid #ECECEC
.tip
  font-size: 12px;
  color: #999999;
  margin 8px 0 0
.page-con
  text-align left
  margin 18px 0 5px
.list-con
  min-height 366px
.cache-con {
  padding: 5px;
  font-size: 12px;
  color: #999999;
  .cache-item {
    padding-left 5px;
    padding-right 5px;
    cursor pointer
    &:hover {
      color #333
    }
  }
}
</style>

<script>
import { nursingDiagsSearch } from "../api/index";
import diagnosisList from "./list/diagnosisList.vue";
export default {
  data() {
    return {
      searchWord: "",
      pageIndex: 0,
      pageSize: 6,
      totalCount: -1,
      list: [],
      searchLoading: false,
      cacheSearchList: localStorage.diagnosisCacheSearchList
        ? JSON.parse(localStorage.diagnosisCacheSearchList)
        : []
    };
  },
  mounted() {},
  methods: {
    init() {
      (this.searchWord = ""),
        (this.pageIndex = 1),
        (this.pageSize = 6),
        (this.totalCount = -1),
        (this.list = []);
    },
    open() {
      this.init()
      this.$refs.newRecord.open();
      this.searchBybtn()
    },
    close() {
      this.$refs.newRecord.close();
    },
    search() {
      // if (!this.searchWord) {
      //   return;
      // }
      this.searchLoading = true;
      nursingDiagsSearch(
        this.$route.query.patientId,
        this.$route.query.visitId,
        this.searchWord,
        this.pageIndex,
        this.pageSize
      ).then(res => {
        this.searchLoading = false;
        this.totalCount = res.data.data.totalCount;
        this.list = res.data.data.list;
      });
    },
    searchBybtn() {
      // if (!this.searchWord) {
      //   return this.$message({
      //     showClose: true,
      //     message: "关键词不能为空",
      //     type: "warning"
      //   });
      // }
      this.cacheSearchList = Array.from(
        new Set([...this.cacheSearchList, this.searchWord])
      ).splice(-5);
      localStorage.diagnosisCacheSearchList = JSON.stringify(
        this.cacheSearchList
      );
      this.pageIndex = 0;
      this.search();
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.search();
    },
    querySearch(queryString, cb) {
      cb([]);
      // cb(
      //   this.cacheSearchList.map(value => {
      //     return { value };
      //   })
      // );
    }
  },
  components: {
    diagnosisList
  }
};
</script>
