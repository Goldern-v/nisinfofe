<template>
    <sweet-modal ref="modal" :modalWidth="500" title="出入量统计">
      <div class="time-type-button">
        <el-button-group>
          <el-button :class="[active=='today1'?'active-btn':'']" @click="initTime('today1')">白班小结</el-button>
          <el-button :class="[active=='today2'?'active-btn':'']" @click="initTime('today2')">P班小结</el-button>
          <el-button :class="[active=='yesterday1'?'active-btn':'']" @click="initTime('yesterday1')">24小时小结</el-button>
        </el-button-group>
      </div>
      <p for class="name-title">请选择日期区间：</p>
      <div flex="cross:center main:center" style="margin:0 15px 20px">
        <cr-date-picker
          v-model="date[0]"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择开始日期"
          @input="putGroupCount('update')"
        ></cr-date-picker>
        <span style="padding: 0 15px; width: 30px">至</span>
        <cr-date-picker
          v-model="date[1]"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择结束日期"
          @input="putGroupCount('update')"
        ></cr-date-picker>
      </div>
      <div class="group-count">
        <div>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
        </div>
        <div class="check-group">
          <div class="left">
            <span>入量</span>
            <el-checkbox-group
              v-model="resultList"
              size="small"
              @change="handleCheckedCitiesChange"
            >
              <div class="m-10" v-for="(item, key) of inShows" :key="key">
                <el-checkbox :label="key"></el-checkbox>:{{
                  item ? `${item}` : " "
                }}
              </div>
            </el-checkbox-group>
          </div>
          <div class="right">
            <span>出量</span>
            <el-checkbox-group
              v-model="resultList2"
              size="small"
              @change="handleCheckedCitiesChange"
            >
              <div class="m-10" v-for="(item, key) of outShows" :key="key">
                <el-checkbox :label="key"></el-checkbox>:{{
                  item ? `${item}` : " "
                }}
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post()">计算</el-button>
      </div>
    </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.noTimeCon .el-date-picker__editor-wrap:last-child
  pointer-events none
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.time-type-button
  text-align center;
.active-btn
  background-color #4bb08d
  color #fff
.name-title
  font-size 14px;
  margin 0px 0 15px
  font-weight bold
  padding-left 15px
  padding-right 15px
.activeText
  font-size 14px
  color rgb(40, 79, 194)
  cursor pointer
  font-weight normal
.textarea-con
  >>>textarea
    height 120px

.group-count {
  padding-left: 15px;
  padding-right: 15px;

  .check-group {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }

  .el-checkbox-group {
    padding-top: 10px;
  }
}
</style>

<script>
import { outputSumHd } from "@/api/record";
import { putGroupCount } from "../../api/index.js";
import moment from "moment";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
export default {
  data() {
    return {
      date: [
        moment().format("YYYY-MM-DD HH:mm"),
        moment().format("YYYY-MM-DD HH:mm")
      ],
      description: "",
      bus: bus(this),
      active:'', // 顶部按钮激活状态(聊城)
      sheetInfo,
      isCounting:false, //计算的时候做节流,
      resultList: [],//入量勾选的数据
      resultList2: [],//出量勾选的数据
      checkAll: false,//是否选中全部选项
      inShows: "",//入量数据
      outShows: "",///出量数据
      isIndeterminate: true,
    };
  },
  mounted() {
    this.bus.$on('postWhsl', this.post);
  },
  methods: {
    initTime(type){
      this.active = type
      let timeObject = {
        'today':[moment().format("YYYY-MM-DD 07:00"),moment().format("YYYY-MM-DD 17:00")],
        'yesterday':[moment().subtract(1,'days').format("YYYY-MM-DD 07:00"),moment().format("YYYY-MM-DD 07:00")],
        'today1':[moment().format("YYYY-MM-DD 07:01"),moment().format("YYYY-MM-DD 15:00")],
        'today2':[moment().format("YYYY-MM-DD 15:01"),moment().format("YYYY-MM-DD 23:00")],
        'yesterday1':[moment().subtract(1,'days').format("YYYY-MM-DD 07:01"),moment().format("YYYY-MM-DD 07:00")]
      }
      this.date = timeObject[type]
    },
    whslInitTime(type){
      this.active = type
      let timeObject = {
        'today1':[moment().format("YYYY-MM-DD 07:01"),moment().format("YYYY-MM-DD 16:00")],
        'today2':[moment().format("YYYY-MM-DD 16:01"),moment().add(1,'day').format("YYYY-MM-DD 07:00")],
        'today3':[moment().format("YYYY-MM-DD 16:01"),moment().add(1,'day').format("YYYY-MM-DD 00:00")],
        'today4':[moment().add(1,'day').format("YYYY-MM-DD 00:01"),moment().add(1,'day').format("YYYY-MM-DD 07:00")],
      }
      this.date = timeObject[type]
    },
    beihaiInitTime(type){
       this.active=type
       let timeObject = {
        'A':[moment().format("YYYY-MM-DD 07:00"),moment().format("YYYY-MM-DD 15:00")],
        'P':[moment().format("YYYY-MM-DD 15:00"),moment().format("YYYY-MM-DD 23:00")],
        'N':[moment().subtract(1,'days').format("YYYY-MM-DD 23:00"),moment().format("YYYY-MM-DD 06:59")],
        'ALL':[moment().subtract(1,'days').format("YYYY-MM-DD 07:00"),moment().format("YYYY-MM-DD 07:00")]
      }
      this.date = timeObject[type]
    },
    open() {
      this.active = ''
      this.resultList = [];
      this.resultList2 = [];
      this.isIndeterminate = true;
      this.checkAll = false;
      this.$refs.modal.open();
      this.description = "";
      let y = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      let t = moment().format("YYYY-MM-DD");
      // let yt = y + " 07:00";
      // let tt = t + " 07:00";
      let yt = ["wujing"].includes(this.HOSPITAL_ID) ? y + " 08:00" : y + " 07:00";
      let tt = ["wujing"].includes(this.HOSPITAL_ID) ? t + " 07:59" : t + " 07:00" ;
      if(['fsxt','nfyksdyy'].includes(this.HOSPITAL_ID)){
        yt=y + " 07:01"
        tt=t + " 07:00"
      }
      this.date = [yt, tt];
      this.putGroupCount();
    },
    close() {
      this.resultList = [];
      this.resultList2 = [];
      this.isIndeterminate = true;
      this.checkAll = false;
      this.$refs.modal.close();
    },
    post(dateArr) {
      console.log('post', dateArr);
      //添加节流
      if (this.isCounting) return
      this.isCounting=true
      setTimeout(()=>{
       this.isCounting=false
      },1000)
      if (this.date[1]) {
        let date = this.date;
        let startTime = dateArr ? dateArr[0] : this.date[0];
        let endTime = dateArr ? dateArr[1] : this.date[1];
        let recordCode = sheetInfo.sheetType;

        outputSumHd(
          this.$parent.patientInfo.patientId,
          this.$parent.patientInfo.visitId,
          recordCode,
          startTime,
          endTime,
          this.description,
          this.resultList,
          this.resultList2
        ).then(res => {
        //  涉及到数据增加或者修改的，就要初始化页码重新计算获取新值
          this.bus.$emit("saveSheetPage", true);
          this.$message({
            showClose: true,
            message: "计算成功",
            type: "success"
          });
          this.close();
        });
        // }, 500);
      } else {
        this.$message({
          showClose: true,
          message: "请输入正确的时间"
        });
      }
    },
    putGroupCount(types) {
      if(types){
        this.resultList = [];
        this.resultList2 = [];
        this.isIndeterminate = true;
        this.checkAll = false;
      }
      let startTime = this.date[0];
      let endTime = this.date[1];
      this.checkAll = false;
      putGroupCount(
        this.$parent.patientInfo.patientId,
        this.$parent.patientInfo.visitId,
        startTime,
        endTime,
      ).then(res => {
          this.inShows = res.data.data.inShows;
          this.outShows = res.data.data.outShows;
      });
    },
    handleCheckAllChange(val) {
      if (this.checkAll) {
        for (let key in this.inShows) {
          this.resultList.push(key);
        }
        for (let key in this.outShows) {
          this.resultList2.push(key);
        }
      } else {
        this.resultList = [];
        this.resultList2 = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      let num1 = 0,
        num2 = 0;
      for (let key in this.inShows) {
        num1++;
      }
      for (let key in this.outShows) {
        num2++;
      }
      this.checkAll =
        this.resultList.length + this.resultList2.length == num1 + num2;
      this.isIndeterminate =
        this.resultList.length + this.resultList2.length < num1 + num2;
    },
  },
  components: {}
};
</script>
