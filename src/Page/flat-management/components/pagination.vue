<template>
  <div class="pagination">
    <div class="left-part">
      <span>每页</span>
      <span class="page-size">
        <el-input type="text" :value="size" size="small" @blur="reSize" />
      </span>
      <span>条,共{{totalPage}}页</span>
    </div>
    <div class="right-part">
      <el-button size="small" @click="toFirstPage" class="first-page" :disabled="currentPage<=1">首页</el-button>
      <el-button
        size="small"
        @click="toPrevPage"
        class="prev-page-btn"
        :disabled="currentPage<=1"
      >上一页</el-button>
      <span class="el-pagination-content">
        <el-pagination
          :page-size="size"
          :current-page.sync="currentPage"
          layout="pager"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </span>
      <el-button
        size="small"
        @click="toNextPage"
        class="next-page-btn"
        :disabled="currentPage>=totalPage"
      >下一页</el-button>
      <el-button
        size="small"
        @click="toLastPage"
        class="next-page-btn"
        :disabled="currentPage>=totalPage"
      >末页</el-button>
      <span class="now-page">
        <el-input type="text" class="now-page" :value="currentPage" size="small" @blur="jumpTo" />
      </span>
      <el-button size="small" @click="isJumpToPage">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      default: 0,
      type: Number
    },
    size: {
      default: 0,
      type: Number
    },
    pageIndex: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      currentPage: 1,
      jumpToPage: 1 //跳转页码
    };
  },
  created() {
    this.currentPage = this.pageIndex;
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.size);
    }
  },
  methods: {
    toPrevPage() {
      let newPage = this.currentPage - 1;
      if (newPage <= 0) return;

      this.currentPage = newPage;
    },
    toNextPage() {
      let newPage = this.currentPage + 1;
      if (newPage > this.totalPage) return;

      this.currentPage = newPage;
    },
    toFirstPage() {
      this.currentPage = 1;
    },
    toLastPage() {
      let totalPage = this.totalPage;
      this.currentPage = totalPage;
    },
    handleCurrentChange(currentPage) {
      this.jumpToPage = currentPage;
      this.$emit("currentChange", Number(currentPage));
    },
    handleSizeChange(size) {
      this.$emit("sizeChange", Number(size));
    },
    jumpTo($event) {
      let newVal = parseInt($event.target.value, 10);
      if (isNaN(newVal) || newVal <= 0) {
        $event.target.value = this.currentPage;
        return;
      } else if (newVal > this.totalPage) {
        $event.target.value = this.currentPage;
        return;
      }

      $event.target.value = newVal;
      if (this.currentPage == newVal) return;
      this.jumpToPage = newVal;
    },
    // 确定跳转页面
    isJumpToPage() {
      this.currentPage = this.jumpToPage;
    },
    reSize($event) {
      let newVal = parseInt($event.target.value, 10);
      $event.target.value = newVal;
      if (isNaN(newVal) || newVal <= 0) {
        return;
      }
      if (this.size == newVal) return;

      this.handleSizeChange(newVal);

      if (this.currentPage == 1) {
        this.handleCurrentChange(this.currentPage);
      } else {
        this.currentPage = 1;
      }
    }
  },
   watch: {
    pageIndex(val) {
      if (val !== this.currentPage) this.currentPage = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  padding: 10px 15px;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  font-size: 14px;
  .now-page {
    width: 50px;
  }
  .page-size {
    display: inline-block;
    width: 50px;
  }
  .left-part {
    float: left;
  }
  .right-part {
    display: inline-block;
    float: right;
    .el-pagination-content {
      position: relative;
      top: -1px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>


