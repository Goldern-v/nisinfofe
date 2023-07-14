<template>
  <el-dialog size='tiny' :before-close="close" :title="title + '设备类别'" :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item v-if="title === '修改' " label="类别编码" :label-width="formLabelWidth">
        <el-input readonly v-model="form.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类别名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="requiredSign" label="使用是否关联患者" prop="isRelated" :label-width="formLabelWidth">
        <el-switch
          v-model="form.isRelated"
          on-text="是"
          off-text="否"
          on-color="#4bb08d"
          off-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="类别说明" :label-width="formLabelWidth">
        <el-input 
          v-model="form.description"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm('ruleForm')">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "vue-happy-bus";
import { update, add } from '../../api/equipmentType'

export default {
  props: {
  },
  data() {
    return {
      bus: bus(this),
      title: '添加',
      visible: false,
      form: {
        name: '',
        isRelated: true,
        description: ''
      },
      formLabelWidth: '136px',
      rules: {
        name: [
          { required: true, message: '请输入类别名称', trigger: 'change' }
        ],
        // isRelated: [
        //   { required: true, message: '请选择使用是否关联患者', trigger: 'change' }
        // ]
      }
    };
  },
  methods: {
    cancel() {
      this.form = {
        name: '',
        isRelated: true,
        description: ''
      },
      this.visible = false
    },
    close(done) {
      this.cancel()
      done()
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try{
            let url = this.title === '添加' ? add : update
            this.form.isRelated = this.form.isRelated ? '是' : '否'
            url(this.form).then(res => {
              if (res.data.code === "200") {
                this.$message.success(`${this.title}设备类别信息成功！`);
                this.bus.$emit('editSuccess')
              } else {
                this.$message.warning(res.data.desc || `${this.title}设备类别信息失败！`);
              }
              this.cancel()
            });
          } catch (e) {
            this.cancel()
          }
        } else {
          return false;
        }
      });

    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item.requiredSign .el-form-item__label:before {
  content: '*';
  color: #ff4949;
  margin-right: 4px
}

</style>