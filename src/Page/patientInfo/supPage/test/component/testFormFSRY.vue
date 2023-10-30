<template>
  <div style="position: relative">
    <!-- <div
      class="test-list"
      v-if="HOSPITAL_ID == 'guizhou' && testList.length"
      :style="{ height: height }"
    >
      <div class="page" v-for="item in testList" :key="item.expand1">
        <iframe
          :src="'http://192.168.8.68:8080/report/pdf' + item.expand1"
          frameborder="0"
        ></iframe>
      </div>
    </div> -->
    <div v-if="data1">
      <el-row v-loading="loading" class="form" :style="{ minHeight: height }">
        <div class="title">{{ HOSPITAL_NAME }}</div>
        <div class="name">{{ data.subject }}报告单</div>
        <el-row class="info-class" type="flex" justify="space-between">
          <span>申请单号：{{ tableHeaderInfo.testNo }}</span>
          <span>姓名：{{ $route.query.name||patientInfo.name || (info.name && info.name.split(/[\(\) | \（\）)]+/)[0])}}</span>
          <span>性别：{{ $route.query.sex||patientInfo.sex ||  (info.name && info.name.split(/[\(\) | \（\）)]+/)[1])}}</span>
          <span>年龄：{{ $route.query.age ||patientInfo.age || info.age}}</span>
          <span v-if="HOSPITAL_ID=='fuyou'">住院号：{{ $route.query.inpNo }}</span>
          <span v-else>病人ID：{{ tableHeaderInfo.patientId }}</span>
        </el-row>
        <el-row class="info-class" type="flex" justify="space-between">
          <span>标本：{{ tableHeaderInfo.specimen }}</span>
          <span>申请日期：{{ tableHeaderInfo.reqDate | dataForm }}</span>
          <span>申请医生：{{ tableHeaderInfo.reqDoctor }}</span>
          <span>报告日期：{{ tableHeaderInfo.resultDate | dataForm }}</span>
        </el-row>
        <el-checkbox-group v-model="checkList[activeIndex]">
        <el-table
          :data="data1"
          :height="height1"
          style="width: 100%; margin-top: 20px;"
          class="test-table"
        >
          <el-table-column
            label="同步"
            min-width="60px"
          >
              <template slot-scope="scope">
                <el-checkbox :label="scope.$index" :disabled='checkNum!=activeIndex'>
                   <br/>
                </el-checkbox>
              </template>
          </el-table-column>
          <el-table-column
            prop="itemNo"
            label="序号"
            min-width="60px"
          ></el-table-column>
          <el-table-column label="项目" min-width="180px">
            <template slot-scope="scope">
              <span :class="{ redText: compare(scope.row) }">{{
                scope.row.itemName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结果" min-width="100px">
            <template slot-scope="scope">
              <span :class="{ redText: compare(scope.row) }">
                {{ scope.row.result }}
                <img
                  src="./images/上升@2x.png"
                  style="margin-left: 10px; top: 2px; position: relative"
                  width="8"
                  height="14"
                  alt
                  v-show="compare(scope.row) == 'top'"
                />
                <img
                  src="./images/下降@2x.png"
                  style="margin-left: 10px; top: 2px; position: relative"
                  width="8"
                  height="14"
                  alt
                  v-show="compare(scope.row) == 'down'"
                />
              </span>
            </template>
          </el-table-column>



          <el-table-column label="提示" min-width="82px">
            <template slot-scope="scope">
              <span :class="{ redText: compare(scope.row) }">{{
                  scope.row.expand3
                }}</span>
            </template>
          </el-table-column>



          <el-table-column label="单位" min-width="82px">
            <template slot-scope="scope">
              <span :class="{ redText: compare(scope.row) }">{{
                scope.row.units
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考值" min-width="82px">
            <template slot-scope="scope">
              <span :class="{ redText: compare(scope.row) }">{{
                scope.row.printContext
              }}</span>
            </template>
          </el-table-column>
        </el-table>
         </el-checkbox-group>
      </el-row>
    </div>
    <div v-if="!data1" class="form" :style="{ minHeight: height }">
      <div class="null-con">
        <img src="../../../../../common/images/task/nondata.png" alt />
        <p>数据为空</p>
      </div>
    </div>
    <span class="in-moadl">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        :modal-append-to-body="false"
      >
        <line-chart ref="lineChart"></line-chart>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeChart">取 消</el-button>
          <el-button type="primary" @click="closeChart">确定</el-button>
        </span>
      </el-dialog>
    </span>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.form {
  padding: 26px 20px 10px;
  box-sizing: border-box;
  width: 100%;

  .title {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    text-align: center;
  }

  .name {
    font-size: 15px;
    color: #333333;
    margin-top: 10px;
    text-align: center;
    margin-bottom: 16px;
  }
}

.info-class {
  font-size: 13px;
  color: #333333;
  margin-bottom: 10px;
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

.redText {
  color: #E62C2C;
}

.test-list {
  overflow: auto;

  .page {
    width: 100%;
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
.selectProject{
  display flex;
  justify-content space-between
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.test-table {
  .el-table__row td, th {
    height: 34px;
    font-size: 13px;
    color: #333333;
    cursor: pointer;
  }
}

th {
  font-weight: bold;
}

.in-moadl {
  .el-dialog__wrapper, .v-modal {
    position: absolute;
  }

  .el-dialog--tiny {
    width: 60%;
  }

  .el-dialog__body {
    padding: 0 10px;
  }
}
</style>

<script>
import { testItems, getExamTestUrl,testItemsWhsl } from "@/api/patientInfo";
import lineChart from "./lineChart";
import moment from 'moment';
export default {
  props:{
    checkNum:{
      type:Number,
      default:0
    },
    tableHeaderInfo:{
      type:Object,
      default:{}
    },
    info: {
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      data: {},
      data1: [],
      loading: ['foshanrenyi'].includes(this.HOSPITAL_ID)?false:true,
      dialogVisible: false,
      chartData: {},
      testList: [],
      checkList:[],
      checkListLength:0,
      activeIndex:0
    };
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    height() {
      return `${this.wih - 150}px`;
    },
    height1() {
      return this.wih - 310;
    },
    patientInfo(){
      return this.$store.state.sheet.patientInfo;
    }
  },
  methods: {
    compare(row) {
      try {
        if (row.abnormalIndicator == "H" || row.abnormalIndicator == "高")
          return "top";
        if (row.abnormalIndicator == "L" || row.abnormalIndicator == "低")
          return "down";
        if (row.abnormalIndicator == "") return false;
        if (!(row.abnormalIndicator == "N" || row.abnormalIndicator == "正常"))
          return true;
        return false;
      } catch (e) {
      } finally {
      }
    },
    openChart(data,event, column) {
      if(column.label==="同步"){
        return
      }
      this.chartData = data;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.lineChart.open(data);
      });
    },
    closeChart() {
      this.dialogVisible = false;
    },
    open(data,index,clLength) {
      if(clLength>0&&clLength){
        //如果选项多于1个，那么改造checkList为二维数组
        for (let index = 0; index < clLength ; index++) {
          this.checkList.push([])
        }
      }
       this.data =['foshanrenyi'].includes(this.HOSPITAL_ID)?  data.map((itemList,index)=>{
        itemList.itemNo = index + 1
      }): data

      this.activeIndex=index
      this.loading = ['foshanrenyi'].includes(this.HOSPITAL_ID)?false:true;;
      this.data1 = [];
      this.closeChart();
      if (this.HOSPITAL_ID == "guizhou") {
        this.data1 = null;
        getExamTestUrl(
          this.$route.query.patientId,
          this.$route.query.visitId,
          this.data.testNo
        ).then((res) => {
          this.testList = res.data.data;
          this.loading = false;
        });
        return;
      }
      if(!['foshanrenyi','whsl'].includes(this.HOSPITAL_ID)){
        testItems(this.data.testNo)
          .then((res) => {
            this.data1 = res.data.data;
            this.loading = false;
          })
          .catch(() => {
            this.data1 = [];
            this.loading = false;
          });
      }else if(['whsl'].includes(this.HOSPITAL_ID)){
       testItemsWhsl(this.data.testNo)
          .then((res) => {
            this.data1 = res.data.data;
            // 先清空
            this.checkList[this.checkNum]=[]
            // 异常项赋值
            this.data1.map((item,index)=>{
                if(this.compare(item)){
                  this.checkList[this.checkNum].push(index)
                }
            })
            this.loading = false;
          })
          .catch(() => {
            this.data1 = [];
            this.loading = false;
          });
      }else{

        this.data1 = data

      }
    },
  },
  mounted() {
    window.openChart = () => {
      this.openChart();
    };
  },
  filters: {
    dataForm(value) {
      let result = value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : '';
      return !(result + "").includes("NaN") ? result : value || "没出报告";
    },
  },
  components: {
    lineChart,
  },
};
</script>
