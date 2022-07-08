<template>
  <SweetModal ref="modal" title="修改/删除权限管理" @close="onClose" :modalWidth="700" :height="500">
    <el-table :data="tableList" v-loading="tableLoading" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
      <el-table-column prop="empName" label="姓名" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.empName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="科室" min-width="330px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="拥有权限" min-width="120px" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.role"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <div slot="button">
      <el-button class="modal-btn" type="primary" @click="onConfirm" :loading="loading">保存</el-button>
      <el-button class="modal-btn" @click="onClose">取消</el-button>
    </div>
  </SweetModal>
</template>
<style lang='scss' scoped>
.edit-modal-form {
  padding: 10px 20px 0 20px;
}
</style>
<script>
import { findRoleList, saveRoleList } from "../../api/index";
export default {
  props: {},
  data() {
    return {
      tableList: [],
      tableLoading: false,
      deptCode: "",
      loading: false,
      onOkCallBack: null
    };
  },
  computed: {},
  methods: {
    // 打开弹窗
    open(deptCode) {
      this.deptCode = deptCode;
      // 获取表格弹窗数据
      this.tableLoading = true;
      findRoleList(this.deptCode).then(res => {
        this.tableLoading = false;
        this.tableList = res.data.data || [];
      });
      this.$refs.modal.open();
    },
    // 保存
    onConfirm() {
      let savePeople = this.tableList.filter(item => item.role);
      savePeople.map(item => (item.roleCode = "LC_XS_001"));
      let obj = {
        deptCode: this.deptCode || "",
        flowRoleUserLcs: savePeople
      };
      this.loading = true;
      saveRoleList(obj)
        .then(res => {
          this.loading = false;
          this.$message({
            type: "success",
            message: "保存成功"
          });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "保存失败"
          });
        });
      this.$refs.modal.close();
    },
    // 关闭弹窗
    onClose() {
      this.$refs.modal.close();
    }
  },
  components: {}
};
</script>
