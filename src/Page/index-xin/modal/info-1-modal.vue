<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="400" title="患者信息" :enable-mobile-fullscreen="false">
      <div v-loading="iconLoading">
        <div class="list-con">
          <span class="key">时间：</span>
          <span class="value">{{data.taskTime | filterTime}}</span>
        </div>
        <div class="list-con">
          <span class="key">任务：</span>
          <span class="value">{{['wujing'].includes(HOSPITAL_ID)?data.task:data.taskSource}}</span>
        </div>
        <div class="list-con">
          <span class="key">患者：</span>
          <span class="value">{{data.bedLabel+'床 ' + data.patientName}}</span>
        </div>
        <div class="list-con">
          <span class="key">来源：</span>
          <span class="value">{{data.taskSource}}</span>
        </div>
        <div flex="cross:center" class="icon-con">
          <div
            class="table-name"
            v-for="item in (details.evalIcons &&  details.evalIcons.slice(0,6))"
            :key="item.formName"
            :title="item.description"
            :style="{background: item.iconTextRgb}"
          >{{item.iconText}}</div>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post" :loading="iconLoading">查看患者详情</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.list-con {
  margin: 0 40px 10px;
  font-size: 14px;

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
import { patList } from "../api/index-xin.js";
import qs from "qs";
export default {
  mixins: [common, mixin],
  data() {
    return {
      data: {},
      details: {},
      iconLoading: false,
      activatedDeptCodeList: ["030502", "041102"],
      activatedFormTaskList: ["入院评估表(内科)（未审核）"],
      activatedFormCodeList: ["E0001"] // expand: "form_internal_first"
    };
  },
  methods: {
    open(data) {
      this.data = data;
      this.details = {};
      this.iconLoading = true;
      patList(this.deptCode, data.patientId, data.visitId).then(res => {
        this.details = res.data.data;
        this.iconLoading = false;
      });
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let url = "";
      // 新入院表路由跳转  formCode: "E0001"
      if (
        this.activatedDeptCodeList.indexOf(this.deptCode) > -1 &&
        this.activatedFormTaskList.indexOf(this.data.task) > -1 &&
        this.activatedFormCodeList.indexOf(this.data.expand) > -1
      ) {
        let { href } = this.$router.resolve({
          name: "sheetHospitalAdmissionPage",
          params: {
            patientId: this.data.patientId,
            visitId: this.data.visitId,
            formId: this.data.formId
          }
        });
        url = href + "";
      } else {
        url = `/crNursing/home?${qs.stringify({
          patientId: this.data.patientId,
          visitId: this.data.visitId,
          formId: this.data.formId,
          formCode: this.data.expand
        })}`;
      }
      if (this.HOSPITAL_ID === 'lyxrm') {
        url = `/crNursing/temperature?${qs.stringify({
          patientId: this.data.patientId,
          visitId: this.data.visitId,
          formId: this.data.formId,
          formCode: this.data.expand
        })}`;
      }
      window.open(url, "_blank");
      this.close();
    }
  },
  components: {}
};
</script>

