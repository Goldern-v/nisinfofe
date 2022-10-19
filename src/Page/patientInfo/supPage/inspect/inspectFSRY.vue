<template>
  <div>
    <div class="content">
      <el-row v-loading="isSaving"  style="height: 100%" >
       <div class="left-part">
        <el-row class="header inspect-header" type="flex" align="middle">
          <div>
             <span class="title">检查列表</span>
             <el-select v-model="value" placeholder="请选择" class="select">
             <el-option
              v-for="item in options"
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
            <div class="aside">{{ item.reqDate }}</div>
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
          <div class="null-con" v-show="listByFilter.length == 0">
            <img src="../../../../common/images/task/nondata.png" alt />
            <p>没有相关检查数据～</p>
          </div>
        </div>
      </div>
      <div class="right-part">
        <!-- <inspectFormFuyou v-show="rightData.examNo" ref="inspectForm" v-if="HOSPITAL_ID=='fuyou'"></inspectFormFuyou> -->
        <inspectForm v-show="rightData.examNo" ref="inspectForm" ></inspectForm>
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
// import inspectFormFuyou from "./component/inspectForm_fuyou";
import { examList, getExamList } from "@/api/patientInfo";
import { examResult } from "@/api/patientInfo";
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      list: [],
      rightData: {},
      options: [
        {
          label: "全部",
        },
        {
          label: "CT",
        },
        {
          label: "MR",
        },
        {
          label: "磁共振",
        },
        {
          label: "心电图",
        },
      ],
      value: "全部",
      visitList: [],
      visitId: "",
      checkList:[],
      isSaving:false,
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
      if(['foshanrenyi','zhzxy'].includes(this.HOSPITAL_ID)){
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
      this.isSaving=true
      let str=''
      for(var i=0;i<this.checkList.length;i++){
        let projectStr='检查项目:'
        let seeStr='检查所见:'
        let impressionStr='印象:'
        let nowItem=this.listByFilter[this.checkList[i]]
        if (nowItem.examNo !== "") {
            const res=await  examResult(nowItem.examNo)
            // 如果res.data.data==null跳出
            if(res.data.data==null){
              continue
            }
            // 接口返回数据回头\n所以都清理
            const clearseeStr=res.data.data.description.replace(/[\n]/g, '')
            seeStr=`${seeStr}${clearseeStr}`
        }
        const clearprojectStr=this.listByFilter[this.checkList[i]].examItem.replace(/[\n]/g, '')
        projectStr=`${projectStr}${clearprojectStr}`
        const clearimpressionStr=this.listByFilter[this.checkList[i]].impression.replace(/[\n]/g, '')
        impressionStr=`${impressionStr}${clearimpressionStr}`
        str += str ? '\n' : '' 
        str += projectStr + '\n' + seeStr + '\n' + impressionStr
      }
      this.isSaving=false
      this.$emit('closeSweet')
      this.bus.$emit("openclosePatientInfo",'',true)
      // const str=projectStr+'\n'+seeStr+'\n'+impressionStr
      this.bus.$emit('syncReportFSSY',str)
    },
    toRight(data) {
      // console.log(data);
      if (!data) return;
      this.rightData = data;
      this.$nextTick(() => {
        this.$refs.inspectForm.open(data);
      })
      // if (data.resultStatus != "已出报告") {
      //   return this.$refs.inspectForm.open(null);
      // } else {
      //   return this.$refs.inspectForm.open(data);
      // }
    },
    getData() {
      // if (['guizhou'].includes(process.env.HOSPITAL_ID)) {
      //   getExamList(
      //     this.infoData.patientId,
      //     this.visitId == "门诊" ? 0 : this.visitId
      //   ).then(res => {
      //     this.list = res.data.data;
      //     // this.toRight(this.list[0]);
      //   })
      //   return
      // }
      examList(
        this.infoData.patientId,
        this.visitId == "门诊" ? 0 : this.visitId
      ).then((res) => {
        this.list = res.data.data;
        this.toRight(this.list[0]);
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
    // inspectFormFuyou
  },
};
</script>
