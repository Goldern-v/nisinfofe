<template>
  <div class="pagination">
    <div class="left-part">
      <span>每页</span>
      <span class="page-size">
        <el-input type="text" :value="size" size="small" @blur="reSize"/>
      </span>
      <span>条,共{{totalPage}}页</span>
    </div>
    <div class="right-part">
      <el-button size="small" @click="toFirstPage" class="first-page" :disabled="page<=1">首页</el-button>
      <el-button size="small" @click="toPrevPage" class="prev-page-btn" :disabled="page<=1">上一页</el-button>
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
      <el-button size="small" @click="toNextPage" class="next-page-btn" :disabled="page>=totalPage">下一页</el-button>
      <el-button size="small" @click="toLastPage" class="next-page-btn" :disabled="page>=totalPage">末页</el-button>
      <span class="now-page">
        <el-input type="text" class="now-page" :value="currentPage" size="small" @blur="jumpTo"/>
      </span>
      <el-button size="small" @click="handleCurrentChange(currentPage)">确定</el-button>
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
    page: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  created(){
    this.currentPage = this.page;
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.size);
    }
  },
  methods: {
    toPrevPage() {
      let newPage = this.currentPage - 1;
      if(newPage<=0)return;

      this.currentPage = newPage;
      // this.handleCurrentChange(newPage);

    },
    toNextPage() {
      let newPage = this.currentPage + 1;
      if(newPage>this.totalPage)return;

      this.currentPage = newPage;
      // this.handleCurrentChange(newPage);
    },
    toFirstPage() {
      this.currentPage = 1;

      // this.handleCurrentChange(1);
    },
    toLastPage() {
      let totalPage = this.totalPage;
      this.currentPage = totalPage;

      // this.handleCurrentChange(totalPage);
    },
    handleCurrentChange(currentPage){
      this.$emit('update:page',Number(currentPage));
      this.$emit('currentChange',Number(currentPage));
    },
    handleSizeChange(size){
      this.$emit('sizeChange',Number(size));
      this.$emit('update:size',Number(size));
    },
    jumpTo($event){
      let newVal = parseInt($event.target.value,10);
      if(isNaN(newVal)||newVal<=0){
        $event.target.value = this.page;
        return;
      }else if(newVal>this.totalPage){
        $event.target.value = this.page;
        return;
      }

      $event.target.value = newVal;
      if(this.currentPage == newVal)return;
      this.currentPage = newVal;
      // this.handleCurrentChange(newVal);
    },
    reSize($event){
      let newVal = parseInt($event.target.value,10);
      if(isNaN(newVal)||newVal<=0){
        $event.target.value = newVal;
        return;
      }

      $event.target.value = newVal;
      if(this.size==newVal)return;
      this.handleSizeChange(newVal);
    }
  },
  watch:{
    page(val){
      if(val!==this.currentPage)this.currentPage=val;
    }
  }
};
</script>

<style lang="scss" scoped>
  .pagination{
      padding: 10px 15px;
      box-sizing: border-box;
      background: #fff;
      overflow: hidden;
      font-size: 14px;
      .now-page{
        width: 50px;
      }
      .page-size{
        display: inline-block;
        width: 50px;
      }
      .left-part{
        float: left;
      }
      .right-part{
        display: inline-block;
        float: right;
        .el-pagination-content{
          position: relative;
          top: -1px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
</style>


