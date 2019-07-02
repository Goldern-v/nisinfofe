<template>
  <div>
    <boxBase title="检查预约" :icon="require('../images/检查预约.png')">
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <div class="list-box head" flex="cross:stretch">
          <span class="col-1">床号/姓名</span>
          <span class="col-2" flex-box="1">检查预约项目</span>
          <span class="col-3">检查日期</span>
        </div>
        <div class="list-box" flex="cross:stretch" v-for="(item,index) in list" :key="index">
          <span class="col-1">{{item.bedLabel}}床 {{item.name}}</span>
          <span class="col-2" flex-box="1">
            <div v-for="(option, i) in item.data" :key="i">{{option.examItem}}</div>
          </span>
          <span class="col-3">
            <div v-for="(option, i) in item.data" :key="i">{{option.scheduleDate | beday}}</div>
          </span>
        </div>
        <nullText v-if="list.length == 0" style="margin: 70px 0"></nullText>
      </div>
      <span slot="head-tool" @click="openPrintModal" style="margin-right: 10px;">打印</span>
      <span slot="head-tool" @click="openConfigModal">显示配置项</span>
    </boxBase>
    <config2Modal ref="config2Modal"></config2Modal>
    <left2PrintModal ref="left2PrintModal" :list="list"></left2PrintModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con
  margin 0
  min-height 220px
  overflow auto
.list-box
  border-bottom 1px solid #E3E7EA;
  font-size: 13px;
  color: #333333;
  .col-1,.col-2,.col-3
    width 0
    min-height 37px
    box-sizing border-box
    padding 8px 18px
    line-height 22px
  .col-2
    border-left 1px solid #E3E7EA;
    border-right 1px solid #E3E7EA;
  .col-1
    width 160px
  .col-3
    width 160px
  &.head
    background: #F7FAFA;
    font-size: 13px;
    color: #687179;
    font-weight bold
    span
      display flex
      align-items center
</style>

<script>
import boxBase from "../base/box-base.vue";
import lineBox from "../components/line-box/line-box.vue";
import lineBoxNull from "../components/line-box/line-box-null.vue";
import config2Modal from "../modal/config-2-modal.vue";
import { GetExamAppoint } from "../api";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import nullText from "@/components/null/null-text.vue";
import moment from "moment";
import left2PrintModal from "../modal/left2-print-modal";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      list: []
    };
  },
  created() {
    this.bus.$on("indexGetAllData", this.getData);
  },
  filters: {
    beday(val) {
      if (moment(val).isSame(moment(), "day")) {
        return moment(val).format("今天 HH:mm");
      } else if (moment(val).isSame(moment().add(1, "d"), "day")) {
        return moment(val).format("明天 HH:mm");
      } else {
        return moment(val).format("YYYY-MM-DD HH:mm");
      }
    }
  },
  methods: {
    getData() {
      this.pageLoading = true;
      GetExamAppoint(this.deptCode).then(res => {
        this.list = this.goundBy(res.data.data || []);
        // this.list = this.goundBy([])
        this.pageLoading = false;
      });
    },
    goundBy(arr) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.bedLabel]) {
          dest.push({
            isPrint: true,
            bedLabel: ai.bedLabel,
            name: ai.name,
            scheduleDate: ai.scheduleDate,
            data: [ai]
          });
          map[ai.bedLabel] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.bedLabel == ai.bedLabel) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    showRow(key) {
      if (key == "allName" || key == "configure" || key == "科室名字") {
        return false;
      } else {
        return true;
      }
    },
    openConfigModal() {
      this.$refs.config2Modal.open();
    },
    openPrintModal() {
      this.$refs.left2PrintModal.open();
    }
  },
  components: {
    boxBase,
    lineBox,
    lineBoxNull,
    config2Modal,
    nullText,
    left2PrintModal
  }
};
</script>
