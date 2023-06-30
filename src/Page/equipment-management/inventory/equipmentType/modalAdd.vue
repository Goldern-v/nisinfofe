<template>
  <el-dialog size='tiny' :title="title" :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="类别名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="使用是否关联患者" :label-width="formLabelWidth">
        <el-switch
          v-model="form.isRePatient"
          on-text="是"
          off-text="否"
          on-color="#4bb08d"
          off-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="类别说明" :label-width="formLabelWidth">
        <el-input 
          v-model="form.desc"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
    },
    data() {
      return {
        title: '添加设备类别',
        visible: false,
        form: {
          name: '',
          isRePatient: true,
          desc: ''
        },
        formLabelWidth: '125px'
      };
    },
    methods: {
      cancel() {
        this.visible = false
      },
      confirm() {
        // this.visible = false;
      }
    }
  };
</script>