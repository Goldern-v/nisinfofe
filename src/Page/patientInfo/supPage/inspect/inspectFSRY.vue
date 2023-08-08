<template>
  <div>
    <div class="content">
      <el-row v-loading="pending"  style="height: 100%" >
       <div class="left-part">
        <el-row class="header inspect-header" type="flex" align="middle">
          <div>
             <span class="title">检查列表</span>
             <el-select v-model="value" placeholder="请选择" class="select">
             <el-option
              v-for="item in optionsFSRY"
              :key="item.value"
              :value="item.label"
              ></el-option>
             </el-select>
             <span
              class="title"
              style="margin-left: 20px"
              v-if="HOSPITAL_ID == 'gy'"
              >住院标识</span>
             <span class="title" style="margin-left: 20px" v-else>住院次数</span>
             <el-select v-model="visitId" placeholder="请选择" class="select">
             <el-option
               v-for="item in visitList"
               :key="item.value"
               :value="item.label"
              ></el-option>
             </el-select>
          </div>
          <el-button
             type="primary"
             size="mini"
             @click="writeDescription"
          >
            写入
          </el-button>
        </el-row>
        <div class="body" :style="{ height: height ,'padding-left': paddingLeft}">
          <el-checkbox-group v-model="checkList" >
          <div
            class="item"
            v-for="(item,index) in listByFilter"
            :key="item.examNo"
            @click="toRight(item)"
            :class="{ active: item.examNo == rightData.examNo }"
          >
            <el-checkbox :label="(index)" class="fscheckBox" ><br/></el-checkbox>
            <div class="title">{{ item.examItem }}</div>
            <div class="aside" v-if="['foshanrenyi'].includes(HOSPITAL_ID)">{{ item.examResult&&item.examResult.reportDateTime||'未出报告'  }}</div>
            <div class="aside" v-else>{{ item.reqDate }}</div>
            <div class="result">
              <span
                v-if="item.resultStatus.indexOf('申请') == -1"
                style="color: green"
              >
                {{ item.resultStatus }}
                <!-- <img src="../../../../common/images/info/完成@2x.png" alt> -->
              </span>
              <span v-if="item.resultStatus.indexOf('申请') > -1">{{
                item.resultStatus
              }}</span>
            </div>
          </div>
          </el-checkbox-group>
          <div class="null-con">
            <div v-if="!isDone"
            :style="{ height: height }"
            v-loading="!isDone"
            element-loading-text="正在加载中"
            ></div>
            <div v-else-if="listByFilter.length == 0">
              <img src="../../../../common/images/task/nondata.png" alt />
            <p>没有相关检查数据～</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right-part">
        <!-- <inspectFormFuyou v-show="rightData.examNo" ref="inspectForm" v-if="HOSPITAL_ID=='fuyou'"></inspectFormFuyou> -->
        <!--佛一检查报告-->
        <inspectFormFSRY v-if="['foshanrenyi'].includes(HOSPITAL_ID)" v-show="rightData.examNo" ref="inspectForm" ></inspectFormFSRY>
        <inspectFormNFZXY v-else-if="['nanfangzhongxiyi'].includes(HOSPITAL_ID)" v-show="rightData.examNo" ref="inspectForm" ></inspectFormNFZXY>
        <inspectForm
          v-else
          v-show="rightData.examNo"
          ref="inspectForm"
          @changeExamResult="changeExamResultdata"
          :originData="originData"
        ></inspectForm>

      </div>
      </el-row>
      </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.inspect-header .select .el-input__inner {
  width: 80px !important;
  min-width: 80px !important;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px;
}

.left-part {
  float: left;
  width: 36%;
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  .header {
    padding: 0 16px;
    background: #F7FAFA;
    height: 65px;
    border-bottom: 1px solid #EAEEF1;
    display flex;
    justify-content space-between;
    .title {
      font-size: 13px;
      color: #333333;
      font-weight: bold;
    }
  }

  .body {
    padding: 20px;
    background: #fff;
    overflow: auto;

    .item {
      padding: 11px 14px 11px 14px;
      margin-bottom: 10px;
      border: 1px solid #E4E8EB;
      border-radius: 2px;
      position: relative;
      cursor: pointer;

      &.active {
        background: #F2F2F2;
      }

      .title {
        font-size: 13px;
        color: #687179;
      }

      .aside {
        font-size: 12px;
        color: #999999;
        margin-top: 10px;
      }

      .result {
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 13px;
        color: #E72C2C;

        img {
          height: 22px;
        }
      }
    }
  }
}

.right-part {
  float: right;
  width: 63%;
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
}

.null-con {
  img {
    display: block;
    margin: 20% auto 20px;
    width: 120px;
  }

  p {
    text-align: center;
    font-size: 13px;
  }

  color: #666;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.left-part .header .select .el-input__inner {
  height: 30px;
  width: 126px;
  margin-left: 16px;
  font-size: 12px;
  color: #333333;
}
.fscheckBox{
  position: absolute;
  z-index :200
  top: 25px;
  left: -30px;
 }
</style>

<script>
import inspectForm from "./component/inspectForm";
import inspectFormFSRY from "./component/inspectFormFSRY";
import inspectFormNFZXY from "./component/inspectForm_nfzxy";
// import inspectFormFuyou from "./component/inspectForm_fuyou";
import { examList, getExamList } from "@/api/patientInfo";
import bus from "vue-happy-bus";
export default {
  props: {
    originData: Object
  },
  data() {
    return {
      list: [],
      rightData: {},
      isDone:false,
      optionsFSRY:[
      {
          label: "全部",
        },
      ],
      value: "全部",
      visitList: [],
      visitId: "",
      checkList:[],
      pending:false,
      bus: bus(this),
    };
  },
  computed: {
    infoData() {
      return this.$route.query;
    },
    listByFilter() {
      return this.list.filter((item) => {
        if (this.value == "全部") return true;
        return item.examClass == this.value;
      });
    },
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 255}px`;
    },
    paddingLeft(){
      if(['foshanrenyi','zhzxy','nanfangzhongxiyi'].includes(this.HOSPITAL_ID)){
        return '40px'
      }else{
        return '20px'
      }
    }
  },
  created() {
    if (this.infoData.visitId > 20) {
      this.visitList = [
        {
          label: this.infoData.visitId,
        },
      ];
    } else {
      for (let i = 0; i <= parseInt(this.infoData.visitId); i++) {
        this.visitList.push({
          label: i === 0 ? "门诊" : i,
        });
      }
    }

    this.visitId = this.infoData.visitId;
  },
  methods: {
    async writeDescription(){
      this.pending=true
      let str=''
      for(var i=0;i<this.checkList.length;i++){
        let Date = '日期'
        let projectStr='检查项目:'
        let seeStr='检查所见:'
        let impressionStr='印象:'
        let nowItem = this.listByFilter[this.checkList[i]]
        const projectDate = `${Date}:${(nowItem.examResult&&nowItem.examResult.reportDateTime)||'未出报告'}`
        const clearseeStr = nowItem.examResult.description.replace(/[\n]/g, '')
        seeStr = `${seeStr}${clearseeStr}`
        const clearprojectStr = nowItem.examItem.replace(/[\n]/g, '')
        projectStr = `${projectStr}${clearprojectStr}`
        const clearimpressionStr = nowItem.examResult.impression.replace(/[\n]/g, '')
        impressionStr = `${impressionStr}${clearimpressionStr}`
        str += str ? '\n' : ''
        str +=projectDate + '\n' + projectStr + '\n' + seeStr + '\n' + impressionStr
      }
      this.pending=false
      this.$emit('closeSweet')
      this.bus.$emit("openclosePatientInfo",'',true)
      this.bus.$emit('syncReportFSSY',str)
    },
    changeExamResultdata(data,examNo){
       this.listByFilter.map((item)=>{
         if(item.examNo ==examNo){
           item.examResult =data;
         }
       })
    },
    toRight(data) {
      if (!data) return;
      this.rightData = data;
      this.$nextTick(() => {
        this.$refs.inspectForm.open(data);
      })
    },
    getData() {
      examList(
        this.infoData.patientId,
        this.visitId == "门诊" ? 0 : this.visitId
      ).then((res) => {
        if(res.data){
        this.list = res.data.data;
        const fsryOption =  res.data.data.length&&Array.from(new Set(res.data.data.map((listItem)=>{
          return listItem.examClass
        })))
        fsryOption.map((fsryOptionList)=>{
          this.optionsFSRY.push({label:fsryOptionList})
        })
        this.toRight(this.list[0]);
        }
        this.pending=false
        this.isDone = true
      }).catch((error)=>{
        this.pending=false
        this.isDone = true
      });
    },
  },
  watch: {
    visitId() {
      this.getData();
    },
  },
  components: {
    inspectForm,
    inspectFormFSRY,
    inspectFormNFZXY
  },
};
</script>
