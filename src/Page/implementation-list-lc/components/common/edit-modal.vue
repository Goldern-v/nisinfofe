<template>
  <div class="modal-con">
    <sweet-modal ref="newRecord" :modalWidth="500" title="修改时间" class="modal-record padding-0">
      <div class="group">
        <span>实际执行时间：</span>
        <el-date-picker
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择实际执行时间"
          size="small"
          v-model="afterStartExecuteTime"
          style="width:120px"
        ></el-date-picker>
      </div>
      <div class="group">
        <span>结束输液时间：</span>
        <el-date-picker
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束输液时间"
          size="small"
          v-model="afterEndExecuteTime"
          style="width:120px"
        ></el-date-picker>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="post">保存</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal-con {
  >>>.sweet-modal {
    .sweet-content {
      padding: 30px 30px 0px !important;
    }

    .group {
      display: flex;
      align-items: center;
      padding-bottom: 30px;

      .el-date-editor {
        width: 200px !important;
      }
    }
  }
}
</style>

<script>
import commonMixin from "@/common/mixin/common.mixin";
import moment from "moment";
import { updateExecuteTime,updateExecuteTimeLiaoC } from "../../api/index";
import bus from "vue-happy-bus";
export default {
  mixins: [commonMixin],
  data() {
    return {
      eidtRowData: {},
      afterStartExecuteTime: moment().format("YYYY-MM-DD HH:mm"),
      afterEndExecuteTime: moment().format("YYYY-MM-DD HH:mm"),
      bus: bus(this),
    };
  },
  methods: {
    open(data) {
      this.$refs.newRecord.open();
      this.afterStartExecuteTime = data.realExecuteDateTime;
      this.afterEndExecuteTime = data.endDateTime;
      this.eidtRowData = data;
    },
    close() {
      this.$refs.newRecord.close();
    },
    post() {
      let data = {
        labelId: this.eidtRowData.barCode, //条码号
        empNo: this.empNo, //护士工号
        empName: this.empName, //护士名字
        beforeStartExecuteTime: this.eidtRowData.realExecuteDateTime
          ? moment(this.eidtRowData.realExecuteDateTime).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : this.eidtRowData.realExecuteDateTime, //修改前的实际执行时间
        beforeEndExecuteTime: this.eidtRowData.endDateTime
          ? moment(this.eidtRowData.endDateTime).format("YYYY-MM-DD HH:mm:ss")
          : this.eidtRowData.endDateTime, //修改前的结束时间
        afterStartExecuteTime: this.afterStartExecuteTime
          ? moment(this.afterStartExecuteTime).format("YYYY-MM-DD HH:mm:ss")
          : this.afterStartExecuteTime, //需要修改后的实际执行时间
        afterEndExecuteTime: this.afterEndExecuteTime
          ? moment(this.afterEndExecuteTime).format("YYYY-MM-DD HH:mm:ss")
          : this.afterEndExecuteTime, //需要修改后的实际结束时间
      };

      let updateExecuteTimeApi = this.HOSPITAL_ID == 'lingcheng' ? updateExecuteTime : updateExecuteTimeLiaoC;
      updateExecuteTimeApi(data).then((res) => {
        this.$message.success(res.data.data.ErrorMsg);
        this.bus.$emit("loadImplementationList");
        this.close();
      });
    },
  },
  created() {},
  mounted() {},
  watch: {},
  components: {},
};
</script>
