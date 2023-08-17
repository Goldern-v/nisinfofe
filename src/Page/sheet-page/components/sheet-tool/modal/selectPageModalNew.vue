<template>
  <sweet-modal ref="modalName"  title="科室模板" class="modal-con">
    <el-form  :rules="rules" :model="form" label-width="100px" ref="formName" class="demo-form-inline">
      <el-form-item label="页数" prop="pageIndex">
        <el-select v-model="form.pageIndex" placeholder="请选择页数">
          <el-option :label="item" :value="item" v-for="item in maxPage" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="templateName">
        <el-input v-model="form.templateName" placeholder="请输入模板名称" ></el-input>
      </el-form-item>
    </el-form>
    <div class="edit-modal" @click="openAduitPageModal">管理科室模板</div>
    <div slot="button">
      <el-button class="modal-btn" @click="close"
        >取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">保存</el-button>
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

  >>>.el-input, .el-input__inner  .el-select{
    width: 80%;
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
.edit-modal{
  display: flex;
  justify-content: flex-end;
  color: blue;
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
      form:{
        pageIndex: 1, //页数
        templateName:'' //模板名称
      },
      rules: {
        pageIndex: [
          { required: true, message: '请选择页数', trigger: 'change' , type: 'number'},
        ],
        templateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    open(maxPage,startPage) {
      /**结束页码 + 开始页码（最小1开始） - 1
       * 比如  只有一页1  第10页开始  那最大页码就是 1+10-1 也就是10
       * */
      this.maxPage= maxPage + startPage - 1
      this.startPage = startPage
      this.$refs.modalName.open();
    },
    close() {
      this.$refs.formName.resetFields();
      this.$refs.modalName.close()
      this.$parent.$refs.aduitPageModel.close()
    },
    post() {
      this.$emit('setAsTemplate', {...this.form})
    },
    openAduitPageModal(){
      this.$emit('openAduitPageModal')
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
};
</script>
