<template>
  <sweet-modal ref="modalName" title="请选择第几页设置为模板" class="modal-con">
    <el-radio-group v-model="selectPage">
      <el-radio v-for="(page, index) in pageList" :key="index + 'page'" :label="page">
        第{{ page }}页
      </el-radio>
    </el-radio-group>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()"
        >取消</el-button
      >
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang="stylus" scoped>
.modal-con {
  >>>.sweet-modal {
    width: 30%;
  }
  >>>.sweet-content {
    max-height: 100vh;
  }

  >>>.content {
    overflow: hidden;
    margin: 0 0 10px;
  }

  >>>.sweet-content {
    background: #F0f0f0;
  }

  >>>.body {
    padding: 20px 20px 40px !important;
  }
}
.el-radio-group {
  width: 100%;
}
.el-radio {
  width: 33.33%;
  margin: 5px 0px;
}
</style>
<script>
export default {
  props: {},
  data() {
    return {
      maxPage: 1,
      startPage:1,
      selectPage: 0,
    };
  },
  methods: {
    open(maxPage,startPage) {
      /**结束页码 + 开始页码（最小1开始） - 1
       * 比如  只有一页1  第10页开始  那最大页码就是 1+10-1 也就是10
       * */
      this.maxPage = maxPage + startPage - 1
      this.startPage = startPage
      this.$refs.modalName.open();
    },
    close() {
      this.$refs.modalName.close()
    },
    post() {
      this.$emit('setAsTemplate', this.selectPage)
    }
  },
  computed:{
    pageList(){
      const tds = [];
      for (let i = this.startPage; i <= this.maxPage; i++) {
        tds.push(i);
      }
      return tds;
    }
  },
  components: {
  }
};
</script>
