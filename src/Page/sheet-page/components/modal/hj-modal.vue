<template>
    <sweet-modal ref="modal" :modalWidth="500" title="出入量统计">
      <div class="time-type-button" v-if="HOSPITAL_ID=='liaocheng'">
        <el-button-group>
          <el-button :class="[active=='today'?'active-btn':'']" @click="initTime('today')">白班小结</el-button>
          <el-button :class="[active=='yesterday'?'active-btn':'']" @click="initTime('yesterday')">24小时小结</el-button>
        </el-button-group>
      </div>
      <div class="time-type-button" v-if="sheetInfo.sheetType=='critical2_weihai'">
        <el-button-group>
          <el-button :class="[active=='critical2today'?'active-btn':'']" @click="initTime('critical2today')">白班小结</el-button>
          <el-button :class="[active=='yesterday1'?'active-btn':'']" @click="initTime('yesterday1')">24小时小结</el-button>
        </el-button-group>
      </div>
      <div class="time-type-button" v-if="HOSPITAL_ID=='liaocheng'|| HOSPITAL_ID=='nfyksdyy'">
        <el-button-group>
          <el-button :class="[active=='today1'?'active-btn':'']" @click="initTime('today1')">白班小结</el-button>
          <el-button :class="[active=='today2'?'active-btn':'']" @click="initTime('today2')">P班小结</el-button>
          <el-button :class="[active=='yesterday1'?'active-btn':'']" @click="initTime('yesterday1')">24小时小结</el-button>
        </el-button-group>
      </div>
      <div class="time-type-button" v-if="['inandout_weihai', 'critical_new_weihai'].includes(sheetInfo.sheetType)">
        <el-button-group>
          <el-button :class="[active=='today1'?'active-btn':'']" @click="whslInitTime('today1')">白班</el-button>
          <el-button :class="[active=='today2'?'active-btn':'']" @click="whslInitTime('today2')">夜班</el-button>
          <el-button :class="[active=='today3'?'active-btn':'']" @click="whslInitTime('today3')">小夜班</el-button>
          <el-button :class="[active=='today4'?'active-btn':'']" @click="whslInitTime('today4')">大夜班</el-button>
        </el-button-group>
      </div>
      <!-- 北海 -->
      <div class="time-type-button" v-else-if="HOSPITAL_ID=='beihairenyi'">
          <el-button-group>
            <el-button :class="[active=='A'?'active-btn':'']" @click="beihaiInitTime('A')">A班小结</el-button>
            <el-button :class="[active=='P'?'active-btn':'']" @click="beihaiInitTime('P')">P班小结</el-button>
            <el-button :class="[active=='N'?'active-btn':'']" @click="beihaiInitTime('N')">N班小结</el-button>
            <el-button :class="[active=='ALL'?'active-btn':'']" @click="beihaiInitTime('ALL')">24h总结</el-button>
          </el-button-group>
        </div>
      <p for class="name-title">请选择日期区间：</p>
      <div flex="cross:center main:center" style="margin:0 15px 20px" v-if="HOSPITAL_ID==='fuyou'">
      <el-date-picker
      v-model="date[0]"
      type="datetime"
      format="yyyy-MM-dd HH:mm"
      placeholder="选择开始日期">

      </el-date-picker>
      <span style="padding: 0 15px; width: 30px">至</span>
      <el-date-picker
      v-model="date[1]"
      type="datetime"
      format="yyyy-MM-dd HH:mm"
      placeholder="选择结束日期">
      </el-date-picker>
      </div>
      <div flex="cross:center main:center" style="margin:0 15px 20px" v-else>
        <cr-date-picker
          v-model="date[0]"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择开始日期"
          style="width: 135px;"
        ></cr-date-picker>
        <span style="padding: 0 15px; width: 30px">至</span>
        <cr-date-picker
          v-model="date[1]"
          format="yyyy-MM-dd HH:mm"
          placeholder="选择结束日期"
          style="width: 135px;"
        ></cr-date-picker>
      </div>
      <p for class="name-title" flex="cross:center main:justify">
        <span>特殊情况处理：</span>
        <span class="activeText" @click="putGroupCount">分类合计</span>
      </p>
      <div style="margin: 0 15px" class="textarea-con">
        <el-input type="textarea" :rows="2" placeholder="请输入特殊情况处理" v-model="description"></el-input>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" :disabled="isPost" @click="post()">计算</el-button>
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
</style>

<script>
import { outputSum } from "@/api/record";
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
        'critical2today':[moment().format("YYYY-MM-DD 07:01"),moment().format("YYYY-MM-DD 15:59")],
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
    },
    close() {
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
        // this.bus.$emit("saveSheetPage");
        // setTimeout(() => {
        let date = this.date;
        let startTime = dateArr ? dateArr[0] : this.date[0];
        let endTime = dateArr ? dateArr[1] : this.date[1];
        if(this.HOSPITAL_ID==="fuyou"){
        // el-date-picker的value-format不生效
          startTime=moment(startTime).format("YYYY-MM-DD HH:mm")
          endTime=moment(endTime).format("YYYY-MM-DD HH:mm")
          }
        let recordCode = sheetInfo.sheetType;
        //默认0统计出量和入量；1只统计出量；2只统计入量
        let type=0
        if(this.sheetInfo.sheetType=='operating_fk'||this.HOSPITAL_ID==="925"){
           type=1
        }
        outputSum(
          this.$parent.patientInfo.patientId,
          this.$parent.patientInfo.visitId,
          recordCode,
          startTime,
          endTime,
          this.description,
          type,
          localStorage.wardCode
        ).then(res => {
        //  涉及到数据增加或者修改的，就要初始化页码重新计算获取新值
          this.bus.$emit("initSheetPageSize");
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
    putGroupCount() {
      let date = this.date;
      let startTime = this.date[0];
      let endTime = this.date[1];
      if(this.HOSPITAL_ID==="fuyou"){
        // el-date-picker的value-format不生效
        startTime=moment(startTime).format("YYYY-MM-DD HH:mm")
        endTime=moment(endTime).format("YYYY-MM-DD HH:mm")
      }
      //默认0统计出量和入量；1只统计出量；2只统计入量
      let type=0
      if(this.sheetInfo.sheetType=='operating_fk'||this.HOSPITAL_ID==="925"){
          type=1
      }
      putGroupCount(
        this.$parent.patientInfo.patientId,
        this.$parent.patientInfo.visitId,
        startTime,
        endTime,
        type
      ).then(res => {
        if (res.data.data.desc) {
          if(this.HOSPITAL_ID==="wujing"){
            let str = res.data.data.desc.replace(/出量/g,"总出量").replace(/入量/m,"总入量");
            this.description = this.description + str;
          }else{
            this.description = this.description + res.data.data.desc;
          }
        } else {
          this.$message.warning("分类合计为空");
        }
      });
    }
  },
  computed: {
    isPost(){
      return ['whsl'].includes(this.HOSPITAL_ID) && localStorage.selectDeptValue != this.sheetInfo.selectBlock.deptCode
    }
  },
  components: {

  }
};
</script>
