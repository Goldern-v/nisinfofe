<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="400" title="患者信息" :enable-mobile-fullscreen="false">
      <div v-loading="iconLoading">
        <div class="list-con">
          <span class="key">患者：</span>
          <span v-if="['nfyksdyy', 'sdhpwk'].includes(HOSPITAL_ID)" class="value">{{data.bedLabel}}床{{data.nameOrigin}}</span>
          <span v-else class="value">{{data.bedLabel}}床{{data.name}}</span>
        </div>
        <div class="list-con">
          <span class="key">医生：</span>
          <span class="value">{{data.doctorInCharge}}</span>
        </div>
        <div class="list-con">
          <span class="key">备注：</span>
          <span class="value">{{data.expand}}</span>
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
import { patList } from "../api/index.js";
import common from "@/common/mixin/common.mixin.js";
import qs from "qs";
export default {
  mixins: [common],
  data() {
    return {
      data: {},
      details: {},
      iconLoading: false
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
      let obj = {};
      let item = this.details;
      for (let i in item) {
        if (item[i]) {
          obj[i] = item[i];
        }
      }
      window.open(
        `/crNursing/home?${qs.stringify({
          patientId: obj.patientId,
          visitId: obj.visitId
        })}`
      );
      this.close();
    }
  },
  components: {}
};
</script>
