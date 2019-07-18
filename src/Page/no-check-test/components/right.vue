<template>
  <div>
    <boxBase title="未做化验" :icon="require('../images/检查预约.png')">
      <div class="body-con" v-loading="pageLoading" slot="body-con">
        <div class="list-box head" flex="cross:stretch">
          <span class="col-1">
            <el-checkbox v-model="allPrint" @change="checkAll"></el-checkbox>
          </span>
          <span class="col-2">床号</span>
          <span class="col-3">姓名</span>
          <span class="col-4">申请时间</span>
          <span class="col-5" flex-box="1">化验项目</span>
        </div>
        <div class="list-content" :style="{height: listContentH +'px'}">
          <div class="list-box" flex="cross:stretch" v-for="(item,index) in list" :key="index">
            <span class="col-1">
              <el-checkbox v-model="item.isPrint"></el-checkbox>
            </span>
            <span class="col-2">{{item.bedLabel}}床</span>
            <span class="col-3">{{item.name}}</span>
            <span class="col-4">{{item.scheduleDate}}</span>
            <span class="col-5" flex-box="1">{{item.examItem}}</span>
          </div>
        </div>
        <nullText v-if="list.length == 0" style="margin: 70px 0"></nullText>
      </div>
      <span slot="head-tool" @click="openPrintModal" style="margin-right: 10px;">打印</span>
    </boxBase>
    <rightPrintModal ref="rightPrintModal" :list="list"></rightPrintModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body-con {
  margin: 0;
  min-height: 220px;
}

.list-content {
  overflow: auto;
}

.list-box {
  border-bottom: 1px solid #E3E7EA;
  font-size: 13px;
  color: #333333;

  &:last-of-type {
    border-bottom: none;
  }

  .col-1, .col-2, .col-3, .col-4, .col-5 {
    width: 0;
    min-height: 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px 18px;
    line-height: 16px;
  }

  .col-2, .col-3, .col-4, .col-5 {
    border-left: 1px solid #E3E7EA;
  }

  .col-1 {
    width: 60px;
    position: relative;

    label {
      position: absolute;
      left: 50%;
      top: 6px;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }

  .col-2, .col-3 {
    width: 80px;
  }

  .col-4 {
    width: 150px;
  }

  .col-1, .col-2 {
    text-align: center;
  }

  &.head {
    background: #F7FAFA;
    font-size: 13px;
    color: #687179;
    font-weight: bold;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

<script>
import boxBase from "../base/box-base.vue";
import lineBox from "../components/line-box/line-box.vue";
import lineBoxNull from "../components/line-box/line-box-null.vue";
import { getHistGetTestWithWardcode } from "../api";
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import nullText from "@/components/null/null-text.vue";
import moment from "moment";
import rightPrintModal from "../modal/right-print-modal";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageLoading: false,
      list: [],
      allPrint: false
    };
  },
  props: {
    listContentH: Number
  },
  mounted() {
    this.getData();
  },
  computed: {
    deptCode() {
      return this.$store.state.lesion.deptCode || localStorage.selectDeptValue;
    }
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
      getHistGetTestWithWardcode(this.deptCode)
        .then(res => {
          this.list = this.goundBy(res.data.data || []);
          this.pageLoading = false;
        })
        .catch(err => {
          this.pageLoading = false;
        });
    },
    goundBy(arr) {
      let dest = [];
      dest = arr.map(item => {
        return {
          scheduleDate: moment(item.reqDateTime).format("YYYY-MM-DD HH:mm"),
          examItem: item.testItem,
          ...item
        };
      });
      return dest;
      // var map = {},
      //   dest = [];
      // for (var i = 0; i < arr.length; i++) {
      //   var ai = arr[i];
      //   if (!map[ai.bedLabel]) {
      //     dest.push({
      //       isPrint: true,
      //       bedLabel: ai.bedLabel,
      //       name: ai.name,
      //       scheduleDate: ai.scheduleDate,
      //       data: [ai]
      //     });
      //     map[ai.bedLabel] = ai;
      //   } else {
      //     for (var j = 0; j < dest.length; j++) {
      //       var dj = dest[j];
      //       if (dj.bedLabel == ai.bedLabel) {
      //         dj.data.push(ai);
      //         break;
      //       }
      //     }
      //   }
      // }
      // return dest;
    },
    showRow(key) {
      if (key == "allName" || key == "configure" || key == "科室名字") {
        return false;
      } else {
        return true;
      }
    },
    // openConfigModal() {
    //   this.$refs.config2Modal.open();
    // },
    openPrintModal() {
      this.$refs.rightPrintModal.getPrintData(this.list);
    },
    checkAll(check) {
      this.list.forEach(item => {
        item.isPrint = this.allPrint;
      });
    }
  },
  components: {
    boxBase,
    lineBox,
    lineBoxNull,
    nullText,
    rightPrintModal
  }
};
</script>
