<template>
  <sweet-modal ref="modalName" title="请选择第几页设置为模板" class="modal-con">
    <el-radio-group v-model="selectPage">
      <el-radio v-for="(page, index) in maxPage" :key="index + 'page'" :label="index">
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
      selectPage: 0,
    };
  },
  methods: {
    open(maxPage) {
      this.maxPage = maxPage
      this.$refs.modalName.open();
    },
    close() {
      this.$refs.modalName.close()
    },
    post() {
      this.$emit('setAsTemplate', this.selectPage)
    }
  },
  components: {
  }
};
</script>
