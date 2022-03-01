<template>
  <div id="slideConRightGuizhou">
    <div class="no-do-bg" v-show="show" @click="close"></div>
    <transition name="el-zoom-in-left">
      <div v-show="show" class="slide-con">
        <h1 class="title">{{data.name}}</h1>
        <aside class="aside">{{definition}}</aside>
        <div class="close-btn" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <div class="save-btn" @click="save" v-if="!isEdit && status === '0'">
          <div v-touch-ripple>添加</div>
        </div>
        <div class="save-btn" @click="save" v-if="!isEdit && status === '1'">
          <div v-touch-ripple>更新</div>
        </div>
        <div class="save-btn disabled" v-if="!isEdit && status === '2'">
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
            ></el-date-picker>
            <el-button type="primary" v-if="!isEdit" @click="isEdit = true" style="position:absolute;right:0">编辑</el-button>
            <span v-else class="edit-btns">
              <el-button @click="cancelEdit">取消编辑</el-button>
              <el-button type="primary" @click="saveTemplete" :disabled="!measureId.length&&!targetsId.length">保存</el-button>
            </span>
          </div>
          <div class="do-box">
            <div class="label">
              <span>【护理措施】</span>
              <span class="checkAll-con">
                <el-checkbox
                  v-if="!isEdit"
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
              <div class="m-10" v-for="(item,index) in measures" :key="item.id">
                <el-checkbox
                  v-if="!isEdit"
                  :label="item.serialNo"
                  :disabled="status === '2'"
                >{{item.measureDetail}}</el-checkbox>
                <div style="display:flex" v-else @click="delTempleteRow(item,index,'measureId')">
                  <div class="delete-box" style="width:15px;">
                    <div class="red-circle">
                      <div class="white-line"></div>
                    </div>
                  </div>
                  <div style="flex:1">
                    {{item.measureDetail}}
                  </div>
                </div>
              </div>
            </el-checkbox-group>
          </div>
          <div class="do-box">
            <div class="label">
              <span>【预期目标】</span>
              <span class="checkAll-con">
                <el-checkbox
                  v-if="!isEdit"
                  :indeterminate="isTargetIndeterminate"
                  v-model="checkTargetAll"
                  @change="handleTargetCheckAllChange"
                  :disabled="status === '2'"
                >全选</el-checkbox>
              </span>
            </div>

            <el-checkbox-group v-model="resultTargetList" @change="handleTargetCheckedChange">
              <div class="m-10" v-for="(item,index) in targetList" :key="item.id">
                <el-checkbox v-if="!isEdit" :label="item.serialNo" :disabled="status === '2'">{{item.parameter}}</el-checkbox>
                <div style="display:flex" v-else @click="delTempleteRow(item,index,'targetsId')">
                  <div class="delete-box" style="width:15px;">
                    <div class="red-circle">
                      <div class="white-line"></div>
                    </div>
                  </div>
                  <div style="flex:1">
                    {{item.parameter}}
                  </div>
                </div>
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
  display: flex
  font-size 14px
  color #333;
  margin 10px 0 -10px
  position relative;
.delete-box{
  position: relative;
  padding: 0 5px 0 0;
}
.red-circle{
  cursor: pointer;
  width:15px;
  height:15px;
  border-radius:100%;
  background:#d81e06;
  position: absolute;
  top:50%;
  transform: translateY(-50%)
  .white-line{
    height: 3px
    width: 11px;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%)
    background #fff
  }
}
.edit-btns{
  margin-left: 20px;
  flex: 1;
  width: 150px;
  display: flex
  justify-content: space-between
}
</style>

<script>
import {
  measure,
  nursingDiagsView,
  deleteMeasureTargetsApi
} from "../../api/index.js";
import moment from "moment";
import { model } from "../../diagnosisViewModel";
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
  definition: "",
  isEdit:false,
  measureId:[],
  targetsId:[]
};
let bindDataClone = { ...bindData };
export default {
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
      if (item.id) {
        nursingDiagsView(item.id).then(res => {
          this.beginTime = res.data.data.object.beginTime;
          this.status = res.data.data.object.status;
          this.resultMeasuresList = res.data.data.object.diagMeasures
            .split("_")
            .map(item => Number(item));
          this.resultTargetList = res.data.data.object.diagTarget
            .split("_")
            .map(item => Number(item));
        });
      }
    },
    close() {
      this.show = false;
    },
    save() {
      let measure = this.measures.filter(item=>{
          return this.resultMeasuresList.includes(item.serialNo)
      }).map(e=>e.measureDetail).join("")
      let target = this.targetList.filter(item=>{
        return this.resultTargetList.includes(item.serialNo)
      }).map(e=>e.parameter).join("")

      this.$store.commit("upMeasureGuizhou",{measure,target})
      this.$message.success('添加成功')
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
    },
    delTempleteRow(item,index,type){
      this[type].push(item.id)
      if(type == 'measureId'){
        this.measures.splice(index,1)
      }else{
        this.targetList.splice(index,1)
      }
    },
    cancelEdit(){
      this.measureId = []
      this.targetsId = []
      this.isEdit = false;
      this.open(this.data)
    },
    saveTemplete(){
      this.$confirm('确定要对此诊断计划知识进行修改吗', '确认后，删除的内容将不可恢复', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(res=>{
          deleteMeasureTargetsApi({
            diagId:this.data.code,
            measureId:this.measureId,
            targetsId:this.targetsId
          }).then(delRes=>{
            if(delRes.data.code!=200) return this.$message.error(delRes.data.desc)
            this.$message.success('保存成功')
            this.isEdit = true
            this.open(this.data)
          })
        }).catch(err=>{
          this.$message.warning('您已取消保存！')
        })
    }
  },
  components: {}
};
</script>
