<template>
  <div>
    <!-- <div class="no-do-bg" v-show="show" @click="close"></div> -->
    <transition name="el-zoom-in-left">
      <div v-show="show" class="slide-con">
        <h1 class="title">{{data.name}}</h1>
        <aside class="aside">{{definition}}</aside>
        <div class="close-btn" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <div class="save-btn" @click="save" v-if="status === '0'">
          <div v-touch-ripple>保存</div>
        </div>
        <div class="save-btn" @click="save" v-if="status === '1'">
          <div v-touch-ripple>更新</div>
        </div>
        <div class="save-btn disabled" v-if="status === '2'">
          <div>已停止</div>
        </div>
        <div class="contain">
          <div class="date-con">
            <span>开始时间：</span>
            <el-date-picker
              format="yyyy-MM-dd HH:mm"
              size="small"
              v-model="beginTime"
              type="datetime"
              placeholder="选择开始时间"
              style="width: auto"
            ></el-date-picker>
          </div>
          <div class="do-box">
            <div class="label">
              <span>【护理措施】</span>
              <span class="checkAll-con">
                <el-checkbox
                  :indeterminate="isMeasuresIndeterminate"
                  v-model="checkMeasuresAll"
                  @change="handleMeasuresCheckAllChange"
                  :disabled="status === '2'"
                >全选</el-checkbox>
              </span>
            </div>

            <el-checkbox-group
              v-model="resultMeasuresList"
              size="small"
              @change="handleMeasuresCheckedChange"
              :disabled="status === '2'"
            >
              <div class="m-10" v-for="item in measures" :key="item.id">
                <el-checkbox
                  :label="item.serialNo"
                  :disabled="status === '2'"
                >{{item.measureDetail}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
          <div class="do-box">
            <div class="label">
              <span>【预期目标】</span>
              <span class="checkAll-con">
                <el-checkbox
                  :indeterminate="isTargetIndeterminate"
                  v-model="checkTargetAll"
                  @change="handleTargetCheckAllChange"
                  :disabled="status === '2'"
                >全选</el-checkbox>
              </span>
            </div>

            <el-checkbox-group v-model="resultTargetList" @change="handleTargetCheckedChange">
              <div class="m-10" v-for="item in targetList" :key="item.id">
                <el-checkbox :label="item.serialNo" :disabled="status === '2'">{{item.parameter}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box
  .el-checkbox__label
    font-size: 12px;
    color: #687179;
    white-space normal
  textarea
    font-size: 12px;
    color: #687179;
  .label
    margin-bottom 15px
  .checkAll-con
    float right
    margin-right 10px
    .el-checkbox__label
      position relative
      top 2px
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.slide-con
  width 500px
  height 100%
  padding 50px 20px 100px;
  box-sizing border-box
  position fixed
  top 0
  bottom 0
  right 0
  background #fff
  box-shadow 0 0 20px rgba(0,0,0,0.4)
  z-index 1000000
  background: #F7FAFA;
  z-index 2002
  .close-btn
    position absolute
    top 15px;
    right 15px;
    font-size 14px;
    cursor pointer
    padding 8px;
    border-radius 50%;
    &:hover
        background #EDF2F3
.no-do-bg
  position fixed;
  top:0;
  bottom:0;
  left: 0;
  right: 0;
  z-index 2001
.title
    font-size: 16px;
    color: #333333;
    font-weight bold
    position absolute
    top 20px;
    left 20px;
.aside
  font-size 12px
  color #777
.contain
  overflow-y auto
  height 100%
  .do-box
    background #ffffff
    box-sizing border-box
    padding 15px 10px
    border: 1px solid #CBD5DD;
    box-shadow: inset 0 1px 2px 0 rgba(129,129,129,0.50);
    border-radius: 2px;
    margin-top 20px
    .label
      font-size: 13px;
      color: #687179;
    .m-10
      margin 10px
      font-size: 12px;
      color: #687179;
      letter-spacing: 0;
      line-height: 21px;
      line-height: 21px;
.save-btn
  background: #4BB08D;
  border-radius: 2px;
  font-size: 13px;
  color: #FFFFFF;
  text-align center
  height 35px;
  line-height 35px
  position absolute;
  bottom: 35px;
  left: 20px;
  right: 20px;
  cursor pointer
  &.disabled
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
.date-con
  font-size 14px
  color #333;
  margin 10px 0 -10px
</style>

<script>
import {
  measure,
  nursingDiagsSave,
  diagsDetails,
  nursingDiagsView,
  nursingDiagsUpdate
} from "../../../../patientInfo/supPage/diagnosis/api/index.js";
import common from "@/common/mixin/common.mixin";
import moment from "moment";

let bindData = {
  data: {},
  show: false,
  measures: [],
  targetList: [],
  target: "",
  resultMeasuresList: [],
  resultTargetList: [],
  beginTime: "",
  status: "0", // 0-未保存 1-正在进行 2-已停止 3-已删除
  isMeasuresIndeterminate: false,
  checkMeasuresAll: false,
  isTargetIndeterminate: false,
  checkTargetAll: false,
  definition: ""
};
let bindDataClone = { ...bindData };
export default {
  mixins: [common],
  data() {
    return bindData;
  },
  methods: {
    open(item) {
      Object.assign(bindData, bindDataClone);
      this.beginTime = moment().format("YYYY-MM-DD HH:mm");
      this.show = true;
      this.data = item;
      measure(item.code).then(res => {
        this.measures = res.data.data.measures;
        this.targetList = res.data.data.targetList;
        this.definition = res.data.data.definition;
      });
      // if (item.id) {
      //   nursingDiagsView(item.id).then(res => {
      //     this.beginTime = res.data.data.object.beginTime;
      //     this.status = res.data.data.object.status;
      //     this.resultMeasuresList = res.data.data.object.diagMeasures
      //       .split("_")
      //       .map(item => Number(item));
      //     this.resultTargetList = res.data.data.object.diagTarget
      //       .split("_")
      //       .map(item => Number(item));
      //   });
      // }
    },
    close() {
      this.show = false;
    },
    save() {
      let measureStr = ""
      this.resultMeasuresList.forEach(item=>
        measureStr = measureStr + this.measures.find(measure=>measure.serialNo==item).measureDetail +'\n'
      )
      // window.openSignModal((password, empNo) => {
      let obj = {
        // creator: password,
        // empNo,
        patientId: this.$store.state.sheet.patientInfo.patientId,
        visitId: this.$store.state.sheet.patientInfo.visitId,
        patientName: this.$route.query.name,
        bedLabel: this.$route.query.bedLabel,
        code: this.data.code,
        name: this.data.name,
        measures: this.resultMeasuresList,
        targets: this.resultTargetList,
        measureStr,
        wardCode: this.deptCode,
        beginTime: moment(this.beginTime).format("YYYY-MM-DD HH:mm")
      };
      // return console.log(measureStr,this.resultMeasuresList,'post-resultMeasuresList')
      this.data.checked = true;
      this.data._checked = true;
      this.data.obj = obj;
      // if (this.status === "1") {
      //   obj.id = this.data.id;
      // }
      // let promise =
      //   this.status === "0"
      //     ? nursingDiagsSave(obj)
      //     : this.status === "1"
      //     ? nursingDiagsUpdate(obj)
      //     : null;
      // promise &&
      //   promise.then(res => {
      //     this.$message.success("保存成功");
      //     this.close();
      //   });
      // });

      // this.close();
    },
    /** 全选措施 */
    handleMeasuresCheckAllChange(event) {
      this.resultMeasuresList = event.target.checked
        ? this.measures.map(item => item.serialNo)
        : [];
      this.isMeasuresIndeterminate = false;
    },
    handleMeasuresCheckedChange(value) {
      let checkedCount = value.length;
      this.checkMeasuresAll =
        checkedCount === this.measures.map(item => item.serialNo).length;
      this.isMeasuresIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.measures.map(item => item.serialNo).length;
    },
    /** 全选目标 */
    handleTargetCheckAllChange(event) {
      this.resultTargetList = event.target.checked
        ? this.measures.map(item => item.serialNo)
        : [];
      this.isTargetIndeterminate = false;
    },
    handleTargetCheckedChange(value) {
      let checkedCount = value.length;
      this.checkTargetAll =
        checkedCount === this.targetList.map(item => item.serialNo).length;
      this.isTargetIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.targetList.map(item => item.serialNo).length;
    }
  },
  components: {}
};
</script>
