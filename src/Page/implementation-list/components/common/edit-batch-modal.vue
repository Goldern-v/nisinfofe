<template>
  <div class="modal-con">
    <sweet-modal
      ref="newBatchRecord"
      :modalWidth="500"
      title="提示"
      class="modal-record padding-0"
    >
      <div class="group">
        <span>执行时间：</span>
        <el-date-picker
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择开始执行时间"
          size="small"
          v-model="executeDateTime"
          style="width:120px"
        ></el-date-picker>
      </div>
      <div class="group">
        <span>补执行的原因：</span>
        <el-input
          size="small"
          style="width:200px"
          placeholder="请输入补执行的原因"
          v-model="reason"
        ></el-input>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="postReason"
          >保存</el-button
        >
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
import {
  batchUpdateOrderExecutePcApi
} from "../../api/index";
import bus from "vue-happy-bus";
export default {
  mixins: [commonMixin],
  data() {
    return {
      eidtRowData: [],
      executeDateTime: moment().format("YYYY-MM-DD HH:mm"),
      bus: bus(this),
      type: "",
      reason: "",
      callback: null
    };
  },
  methods: {
    open(data, type, callback) {
      this.type = type;
      this.$nextTick(() => {
        this.$refs.newBatchRecord.open();
      });
      this.eidtRowData = data;
      this.callback = callback;
    },
    close() {
      this.$refs.newBatchRecord.close();
      this.reason = "";
    },
    postReason() {
      let data = [];
      data = this.eidtRowData.map(item=>{
        return {
          barcode: item.barCode, //条码号
          empNO: this.empNo, //执行人
          type: 1, //是否补执行(pda默认传0正常执行  1补执行pc端)
          typeReason: this.reason, //补执行的原因填写
          executeDateTime: this.executeDateTime
          ? moment(this.executeDateTime).format("YYYY-MM-DD HH:mm:ss")
          : this.executeDateTime
        };
      })
      batchUpdateOrderExecutePcApi(data).then(res => {
        this.$message.success("补录成功");
        this.bus.$emit("loadImplementationList");
        this.$emit('resetScrollTop')
        this.close();
      }).catch((err) => {
        this.$message.success(err.data.desc);
      });
    },
  },
};
</script>
