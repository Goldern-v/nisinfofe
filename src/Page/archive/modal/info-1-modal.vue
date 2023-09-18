<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="400"
      title="归档打印"
      :enable-mobile-fullscreen="false"
    >
    <el-form  :rules="rules"
    :model="form" label-width="100px"
    ref="ruleForm" class="demo-form-inline">
      <el-form-item label="责任护士：" prop="dutyNurse">
        <el-select class="select-multi" v-model="form.dutyNurse" filterable placeholder="请选择">
          <el-option
                v-for="(item,index) in memberLists"
                :key="item+index"
                :label="item"
                :value="item"
              ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="质控护士：" prop="qcNurse">
        <el-select class="select-multi" filterable v-model="form.qcNurse" placeholder="请选择">
          <el-option
                v-for="(item,index) in memberLists"
                :key="item+index"
                :label="item"
                :value="item"
              ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button class="modal-btn" @click="close">取消</el-button>
          <el-button class="modal-btn" @click="confirm('ruleForm')">确定</el-button>
      </el-form-item>
    </el-form>

    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.list-con {
  margin: 20px 10px;
  font-size: 16px;
  display: flex;
  align-items: center;

  .key {
    color: #687179;
  }

  .value {
    color: #333333;
  }
}

.icon-con {
  margin: 0 38px 10px;
  min-height: 20px;
}

.table-name {
  background: #FF263C;
  border-radius: 2px;
  width: 18px;
  height: 18px;
  margin-left: 4px;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 18px;
}

.modal-btn {
  overflow: hidden;
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import mixin from "../mixins/index.js";
import { uploadFileArchive, getAllNurseNamePinyin } from "../api/index.js";
export default {
  mixins: [common, mixin],
  data() {
    return {
      data: {},
      details: {},
      iconLoading: false,
      item: {},
      memberLists:[],
      form:{
        dutyNurse: '', //责任护士
        qcNurse:'' //质控护士
      },
      rules: {
        dutyNurse: [
          { required: true, message: '请选择责任护士',  trigger: "change"},
        ],
        qcNurse: [
          { required: true, message: '请选择质控护士',  trigger: "change"}
        ],
      },
    };
  },
  props: {
    getArchiveList: Function
  },
  created() {},
  watch:{
    deptCode(newVal){
      this.getMemberLists()
    }
  },
  methods: {
    getMemberLists() {
      getAllNurseNamePinyin([]).then((res) => {
        this.memberLists = res.data.data || [];
      });
    },
    open(data) {
      this.item = data;
      this.getMemberLists()
      this.$refs.modal.open();
    },
    close() {
      this.$refs.ruleForm.resetFields();
      this.$refs.modal.close();
      this.form.dutyNurse = '',
      this.form.qcNurse = ''
    },
    // 文件归档上传
    uploadFileArchive() {
        uploadFileArchive(
          this.item.patientId,
          this.item.visitId,
          this.form.dutyNurse,
          this.form.qcNurse
        ).then(rep => {
          this.$message({
            type: "success",
            message: "文件上传成功"
          });
          this.getArchiveList();
        });
    },
    confirm() {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.uploadFileArchive();
            this.close();
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    }
  },
  components: {}
};
</script>
