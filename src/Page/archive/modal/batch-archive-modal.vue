<template>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"

    >
      <el-form>
        <el-form-item label="出院时间" :label-width="formLabelWidth">
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="form.dischargeDateBegin"
          clearable
        />
        <span>-</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="结束日期"
          v-model="form.dischargeDateEnd"
          clearable
        />
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-select
            v-model="form.isSelectedStatus"
            size="small"
            placeholder="全部"
            @change="selectedStatus"
          >
            <el-option value>全部</el-option>
            <template v-if="title == '确认批量归档时间段'">
              <el-option

                :key="item.id"
                v-for="item in statusList"
                :value="item.name"
                >{{ item.name }}</el-option
              >
            </template>
            <el-option
              v-else
              :key="item.id"
              v-for="item in statusList"
              :value="item.name"
              >{{ item.name }}</el-option
            >
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePost"
          >确 定</el-button
        >
      </span>
    </el-dialog>
</template>
<style lang="stylus" scoped>
>>>.el-dialog--small {
  width: 30% !important;
}
</style>
<script>
import moment from 'moment'
export default {
  props: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        dischargeDateBegin: "", //出院开始时间
        dischargeDateEnd: "", //出院结束时间
        isSelectedStatus: "", //选择状态
        showStatus:""
      },
      statusList: [
        { id: -2, name: "归档失败" },
        { id: -1, name: "生成pdf失败" },
        { id: 0, name: "待生成pdf" },
        { id: 1, name: "待归档" },
        { id: 2, name: "已归档" }
      ],
      formLabelWidth: '80px',
      title:'确认批量归档时间段'
    };
  },
  methods: {
    handlePost() {
      this.$emit('batchPost', this.form);
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    selectedStatus(val) {
      this.form.showStatus = "";
      for (let i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i].name == val) {
          this.form.showStatus = this.statusList[i].id;
          return;
        }
      }
    },
  },
  mounted(){
    if (!this.form.dischargeDateBegin) {
      this.form.dischargeDateBegin = moment().subtract(2, 'days').format("YYYY-MM-DD");
    }
    this.form.dischargeDateEnd = this.form.dischargeDateEnd
      ? this.form.dischargeDateEnd
      : moment().format("YYYY-MM-DD");
  },
  components: {}
};
</script>
