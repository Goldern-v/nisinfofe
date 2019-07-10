<template>
  <div>
    <div class="tool-contain" flex="cross:center">
      <span class="tool-box">
        <span class="label">排班日期：</span>
        <el-select v-model="selectedWeek" placeholder="请选择" size="small">
          <el-option
            v-for="week in weeks"
            :key="week.value"
            :label="week.label"
            :value="week.value"
          ></el-option>
        </el-select>
      </span>
      <span class="tool-box">
        <span class="label">透析方式：</span>
        <el-select
          v-model="dataModel.selectedTx"
          placeholder="请选择"
          size="small"
          style="width: 90px;"
        >
          <el-option
            v-for="tx in [{sortNo: '全部', way: '全部'}, ...dataModel.txDict]"
            :key="tx.sortNo"
            :label="tx.way"
            :value="tx.way"
          ></el-option>
        </el-select>
      </span>
      <span class="tool-box">
        <span class="label">班次：</span>
        <el-select
          v-model="dataModel.selectedBc"
          placeholder="请选择"
          size="small"
          style="width: 90px;"
        >
          <el-option v-for="bc in ['全部', ...variables.APN]" :key="bc" :label="bc" :value="bc"></el-option>
        </el-select>
      </span>

      <div class="item-box" flex="cross:center main:center" @click="dataModel.getPatientArrange()">
        <div class="text-con">查询</div>
      </div>
      <!-- <div class="item-box" flex="cross:center main:center" @click="generalPatientArrange">
        <div class="text-con">一键排班</div>
      </div>-->
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="copyLastWeek"
        style="width: 110px;"
      >
        <div class="text-con">复制上上周排班</div>
      </div>

      <div flex-box="1"></div>
      <!-- <span class="label">护理记录：</span> -->

      <div class="right-btn" flex="cross:center main:center" @click="openDevModal">
        <div class="text-con">分区设置</div>
      </div>
      <div class="line"></div>
      <div class="right-btn" flex="cross:center main:center" @click.stop="openDevModal">
        <div class="text-con">机号设置</div>
      </div>
      <div style="width: 5px;"></div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" src="./tool.styl" scoped></style>

<style lang="stylus" scoped>
.tool-box {
  margin-right: 20px;
}

.label {
  font-size: 12px;
  color: #333;
}
</style>

<script>
import bus from "vue-happy-bus";
import commom from "@/common/mixin/common.mixin";
import moment from "moment";
import { dataModel } from "../schecdulingTable/viewModel/dataModel";
import { layoutModel } from "../schecdulingTable/viewModel/layoutModel";
import { variables } from "../schecdulingTable/viewModel/variables";
import { getPatientArrange, saveBatchHDArrange } from "../../api";
export default {
  mixins: [commom],
  data() {
    return {
      dataModel,
      variables,
      weeks: this.getWeeks(),
      selectedWeek: ""
    };
  },
  methods: {
    emit(todo, value) {},
    openDevModal() {
      this.$message.info("正在开发，敬请期待");
    },
    getWeeks() {
      let weeks = [];
      let currentWn = moment().week();
      for (let wn = currentWn - 2; wn <= currentWn + 2; wn++) {
        let weekString = "";
        if (wn == currentWn) {
          weekString = "本周";
        } else if (wn == currentWn - 1) {
          weekString = "上周";
        } else if (wn == currentWn + 1) {
          weekString = "下周";
        } else {
          weekString = `第${wn}周`;
        }
        weeks.push({
          value: wn,
          label: `${weekString} ${moment()
            .week(wn)
            .weekday(0)
            .format("MM/DD")}-${moment()
            .week(wn)
            .weekday(6)
            .format("MM/DD")}`,
          startDate: moment()
            .week(wn)
            .weekday(0)
            .format("YYYY-MM-DD"),
          endDate: moment()
            .week(wn)
            .weekday(6)
            .format("YYYY-MM-DD")
        });
      }
      return weeks;
    },
    generalPatientArrange() {
      this.$confirm("是否确认一键排班?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.dataModel.generalPatientArrange();
        this.$message.info("正在一键排班中");
      });
    },
    copyLastWeek() {
      this.$confirm("复制上上周的排班，确认无误后请点击保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let startDate = moment(dataModel.startDate)
          .subtract(14, "d")
          .format("YYYY-MM-DD");
        let endDate = moment(dataModel.endDate)
          .subtract(14, "d")
          .format("YYYY-MM-DD");
        getPatientArrange(startDate, endDate).then(res => {
          dataModel.tableLoading = true;
          saveBatchHDArrange(
            res.data.data.map(item => {
              return {
                ...item,
                hdDate: moment(item.hdDate)
                  .add(14, "d")
                  .format("YYYY-MM-DD"),
                timeSlice: item.hdTimeSlice
              };
            })
          ).then(res => {
            this.$message("复制上上周排班成功");
            dataModel.getPatientArrange();
          });
        });
        // this.dataModel.generalPatientArrange();
        // this.$message.info("正在一键排班中");
        // await dataModel.initData();
        // layoutModel.init();
      });
    }
  },
  computed: {},
  created() {
    this.selectedWeek = this.weeks[2].value;
  },
  watch: {
    selectedWeek() {
      let currentWeekObj = this.weeks.find(
        item => item.value == this.selectedWeek
      );
      dataModel.startDate = currentWeekObj.startDate;
      dataModel.endDate = currentWeekObj.endDate;
      layoutModel.init();
      dataModel.getPatientArrange();
    }
  },
  mounted() {}
};
</script>
