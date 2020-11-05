<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="打印护理交接班报告汇总单">
      <p for class="name-title">请选择日期区间：</p>
      <div flex="cross:center main:center" style="margin: 0 15px 20px">
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="date[0]"
          clearable
        />
        <span style="padding: 0 15px">-</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="结束日期"
          v-model="date[1]"
          clearable
        />
      </div>
      <div slot="button">
        <el-button class="modal-btn" type="primary" @click="post"
          >打印</el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.noTimeCon .el-date-picker__editor-wrap:last-child {
  pointer-events: none;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title {
  font-size: 14px;
  margin: 0px 0 15px;
  font-weight: bold;
  padding-left: 15px;
  padding-right: 15px;
}

.activeText {
  font-size: 14px;
  color: rgb(40, 79, 194);
  cursor: pointer;
  font-weight: normal;
}

.textarea-con {
  >>>textarea {
    height: 120px;
  }
}
</style>

<script>
import moment from "moment";
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      date: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")],
      description: "",
      bus: bus(this),
    };
  },
  methods: {
    open() {
      this.$refs.modal.open();
      let y = moment().subtract(1, "days").format("YYYY-MM-DD");
      let t = moment().format("YYYY-MM-DD");
      this.date = [y, t];
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      console.log(this.date);
      if (!this.date[0] || !this.date[1]) {
        return this.$message.warning("请选择时间");
      }
      this.bus.$emit("printTable", {
        startDate: moment(this.date[0]).format("YYYY-MM-DD"),
        endDate: moment(this.date[1]).format("YYYY-MM-DD"),
      });
    },
  },
  components: {},
};
</script>
