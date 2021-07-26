<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="预设输液警戒值">
      <div class="setting-content">
        <div class="input-group">
          剩余液量警戒值为：
          <input type="text" placeholder="请输入～" v-model="warningValue" /> ml
        </div>
        <p>备注：剩余液量低于警戒值将会报警，值为空或0不会报警</p>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">保存</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.setting-content {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;

  .input-group {
    padding-bottom: 20px;

    input {
      height: 30px;
      padding-left: 10px;
    }
  }

  p {
    color: #999;
  }
}
</style>

<script>
import { saveOrupdateWarning } from "@/api/infuse";
import bus from "vue-happy-bus";
import dayjs from "dayjs";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      warningValue: ""
    };
  },
  computed: {
    wardCode() {
      return this.$store.state.lesion.deptCode;
    }
  },
  methods: {
    open(val) {
      this.warningValue = val;
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      saveOrupdateWarning(this.wardCode, this.warningValue).then(res => {
        if (res.data.code == 200) {
          this.$notify.success({
            title: "提示",
            message: "设置成功"
          });
          localStorage.removeItem(
            "infuseNotifyBarcode" +
              dayjs(new Date()).format("YYYY-MM-DD") +
              this.wardCode +
              this.empNo
          );
          this.close();
          this.bus.$emit("refreInfuseList");
        }
      });
    }
  },
  components: {}
};
</script>
