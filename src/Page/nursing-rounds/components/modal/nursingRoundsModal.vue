<template>
  <SweetModal
    ref="sweetModal"
    class="satisfy-modal-1577412732265"
    title="修改"
    @close="onClose"
    :modalWidth="500"
  >
    <ElForm class="edit-modal-form" style="margin-bottom: 20px" label-width="100px">
      <ElFormItem label="巡视时间：" required>
        <el-date-picker
          v-model="form.operateDateNew"
          :clearable="false"
          type="datetime"
          placeholder="选择日期时间"
        />
      </ElFormItem>
      <ElFormItem label="巡视内容：" required>
        <ElInput type="textarea" :rows="2" v-model="form.visitContentNew" />
      </ElFormItem>
    </ElForm>
    <div slot="button">
      <el-button class="modal-btn" type="primary" @click="onConfirm" :loading="loading">保存</el-button>
      <el-button class="modal-btn" @click="onClose">取消</el-button>
    </div>
  </SweetModal>
</template>
<style lang='scss' scoped>
.edit-modal-form {
  padding: 10px 20px 0 20px;

  >>> .el-date-editor.el-input,
  >>> .el-input-number {
    width: 100%;
  }

  .unit {
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: 5px;
    word-break: keep-all;
  }

  .btn {
    cursor: pointer;
    color: blue;
    margin-left: 5px;
  }
}
</style>
<style lang="stylus">
.el-time-panel {
  z-index: 10002 !important;
}
</style>

<script>
import moment from "moment";
import { updateOperateDateLingChen } from "../../api/index";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  props: {
    getData: Function
  },
  data() {
    return {
      form: {
        PatientId: "",
        visitId: "",
        operateDate: new Date(),
        visitContent: "",
        operateDateNew: new Date(),
        visitContentNew: ""
      },
      loading: false,
      onOkCallBack: null
    };
  },
  computed: {},
  methods: {
    // 打开弹窗
    open(data) {
      // 获取回显数据
      this.form = {
        empNo:this.empNo, // --工号
        empName:this.empName, //--护士姓名
        serialNo: data.serialNo,
        operateDate:moment(data.operateDate).format("YYYY-MM-DD HH:mm:ss") || new Date(),//  --巡视日期
        operateDateNew: moment(data.operateDate).format("YYYY-MM-DD HH:mm:ss") || new Date(),//  --巡视新日期
        visitContent:data.visitContent, //--巡视内容
        visitContentNew: data.visitContent,// --巡视新内容
      };
      this.$refs.sweetModal.open();
    },
    // 保存
    async onConfirm() {
      if (this.form.operateDateNew && this.form.visitContentNew) {
        this.form.operateDateNew = moment(this.form.operateDateNew).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.loading = true;
        await updateOperateDateLingChen(this.form)
          .then(res => {
            this.loading = false;
            this.$message({
              type: "success",
              message: "修改成功"
            });
          })
          .catch(() => {
            this.loading = false;
            this.$message({
              type: "info",
              message: "修改失败"
            });
          });
        this.$refs.sweetModal.close();
        this.getData();
      } else {
        this.$message.warning("保存前请先填写巡视时间与内容");
      }
    },
    // 关闭弹窗
    onClose() {
      this.$refs.sweetModal.close();
    }
  },
  components: {}
};
</script>
