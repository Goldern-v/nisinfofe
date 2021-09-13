<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <h3>瓶签打印</h3>
        <div>
          <span class="label">执行日期:</span>
          <el-date-picker
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择入院起始时间"
            size="small"
            v-model="query.executeDate"
            style="width:150px"
          ></el-date-picker>
          <span class="label">医嘱类型:</span>
          <el-select v-model="query.repeatIndicator" placeholder="请选择" size="small" style="width:150px">
            <el-option label="全部" :value="9"></el-option>
            <el-option label="长期" :value="1"></el-option>
            <el-option label="临时" :value="0"></el-option>
          </el-select>
          <span class="label">医嘱分类:</span>
          <el-select v-model="query.itemType" placeholder="请选择" size="small" style="width:150px">
            <!-- <el-option label="全部" value="全部"></el-option> -->
            <el-option label="输液" value="输液"></el-option>
            <el-option label="注射" value="注射"></el-option>
            <el-option label="口服" value="口服"></el-option>
            <el-option label="雾化" value="雾化"></el-option>
            <el-option label="皮试" value="皮试"></el-option>
            <el-option label="治疗" value="治疗"></el-option>
            <el-option label="理疗" value="理疗"></el-option>
            <el-option label="护理" value="护理"></el-option>
            <el-option label="外用" value="外用"></el-option>
            <el-option label="化验" value="化验"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
          <span class="label">床号:</span>
          <el-input size="small" style="width: 80px;" v-model="bedLabel"></el-input>
          <span class="label">重打标志:</span>
          <el-select v-model="query.reprintFlag" placeholder="请选择" size="small" style="width:150px;margin-right: 10px;">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
          <el-button size="small" type="primary" @click="search">查询</el-button>
          <el-button size="small" @click="allSelection" :disabled="status=='已执行'">全选</el-button>
          <el-button size="small" @click="onPrint" :disabled="status=='已执行'">打印</el-button>
          <!-- <a href="VMS://abcdefg" @click="onPrint" >1</a> -->
          <el-button size="small" @click="search" :disabled="status=='已执行'">同步医嘱</el-button>
        </div>
      </div>
      <dTable :pageLoadng="pageLoadng" ref="plTable"></dTable>
      <modal v-if="isShowModal" :src="src" @changeModal="changeModal"/>
      <!-- <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div> -->
      <!-- <div class="print-modal" v-show="showPintModal" @click="closePrint">
        <div class="init" v-show="!showProgress">
          <img src="./images/print.png" alt="">
          <p>正在初始化打印,请稍等…</p>
        </div>
        <div class="print" v-show="showProgress" @click.stop>
          <el-progress :percentage="(printNum/selectedData.length)*100 || 0"></el-progress>
          <p>
            <span>{{printStatusMsg}}</span>
            <el-button v-show="showCancelPrint"  @click="closePrint" style="margin-left:15px;">取消</el-button>
          </p>
        </div>
      </div> -->

    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain {
  margin: 10px 10px 0px 10px;
}

.head-con {
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  h3 {
    font-size: 18px;
    line-height: 42px;
  }

  .label {
    font-size: 13px;
    margin-left: 15px;
    margin-right: 5px;
  }
}

.select-btn-list {
  height: 30px;
  padding-top: 2px;
  background: #fff;
  padding: 0 16px;

  >>>.el-radio__input {
    position: relative;
    top: 1px;
  }

  >>>.el-radio__label {
    color: #333;
    font-size: 12px;
    position: relative;
    top: 2px;
  }
}

.print-modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 480px;
    height: 134px;
    background-color: #fff;
    text-align: center;
    padding: 0 37px;
    p {
      font-size: 14px;
      color: #666666;
      line-height: 22px;
    }
    img {
      width: 45px;
      height: 36px;
      margin-top: 29px;
      margin-bottom: 14px;
    }
    >>> .el-progress {
      margin-top: 47px;
      margin-bottom: 30px;
    }
  }
}
</style>
<script>
import modal from "./modal/modal.vue"
import dTable from "./components/table/bottle-sign-print-table";
// import pagination from "./components/common/pagination";
import { patEmrList } from "@/api/document";
import { getPrintExecuteWithWardcode ,handleWebGetPrintResult,webExecutePrint } from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
export default {
  mixins: [common],
  data() {
    return {
      src:"http://192.168.1.54:9523/crNursing/asset/printExecuteOrders/1111111111.pdf",
      pageInput: "",
      pageLoadng: false,
      page: {
        pageIndex: 1,
        // pageNum: 20,
        pageNum: 100,
        total: 0
      },
      startDate: moment().format("YYYY-MM-DD"),
      repeatIndicator: "",
      type: "",
      status: "",
      bedLabel: "",
      showPintModal: false,//是否显示打印弹框
      showProgress: false,
      isShowModal:false,
      query: {
        wardCode:"",
        itemType:"输液",//医嘱类别，输液、雾化
        executeDate:moment().format("YYYY-MM-DD"),//执行日期
        bedLabel:'',//床位号，如果查全部传*"
        repeatIndicator:9,//医嘱类型，长期传1，临时传0，全部传9
        reprintFlag:0,//是否重打，1=是，0=否
      },
      selectedData: [],//选中打印执行单条数
      printNum: 0,//已经打印执行单的条数
      Uuid: '',//打印流水号
      printStatusTimmer: null,
      printStatusReq: null,
      printStatusMsg: '',
      showCancelPrint: false,
    };
  },
  beforeDestroy(){
    this.cleanPrintStatusRoundTime()
  },
  methods: {
    changeModal(flag){
      this.isShowModal = flag
    },
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.onLoad();
    },

    onLoad() {
      if (!this.deptCode) return;
      this.pageLoadng = true;
      this.query.wardCode = this.deptCode;
      this.query.executeDate = this.query.executeDate ? moment(this.query.executeDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
      this.query.bedLabel = this.bedLabel ? this.bedLabel : '*';

      getPrintExecuteWithWardcode(this.query).then(res => {
        let tableData = res.data.data.map((item, index, array) => {
          let prevRowId =
            array[index - 1] &&
            array[index - 1].patientId +
            array[index - 1].visitId +
              array[index - 1].orderNo;
          let nextRowId =
            array[index + 1] &&
            array[index + 1].patientId +
            array[index + 1].visitId +
              array[index + 1].orderNo;
          let currentRowId =
            array[index] &&
            array[index].patientId +
              array[index].visitId +
              array[index].orderNo;

          /** 判断是此记录是多条记录 */
          if (currentRowId == prevRowId || currentRowId == nextRowId) {
            if (currentRowId != prevRowId) {
              /** 第一条 */
              item.rowType = 1;
            } else if (currentRowId != nextRowId) {
              /** 最后条 */
              item.rowType = 3;
            } else {
              /** 中间条 */
              item.rowType = 2;
            }
          }
          return item;
        });
        // 设置表格数据
        if(this.$refs.plTable.$children && this.$refs.plTable.$children[0] && this.$refs.plTable.$children[0].reloadData){
          this.$refs.plTable.$children[0].reloadData(tableData);
        }
        this.page.total = Number(res.data.data.pageCount) * this.page.pageNum;
        this.pageLoadng = false;
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    },
    // 打印
    onPrint(){
      this.selectedData = this.$refs.plTable.selectedData;
      if((this.selectedData||[]).length<=0)
      return this.$message('未选择勾选打印条目')
      this.changeModal(true)
      // webExecutePrint().then(res=>{
      //   console.log(res);
      // })
      this.printNum = 0;

      this.query.executeDate = this.query.executeDate ? moment(this.query.executeDate).format("YYYY-MM-DD") : '';

      let url = '';
      this.selectedData.map((item,index) => {
        url += `${item.patientId}|${item.visitId}|${item.orderNo};`;
      });
      this.Uuid = new Date().getTime() + parseInt(Math.random()*10000);
      console.log(`${this.Uuid};${this.empNo};${this.query.executeDate};${url}`);
      webExecutePrint({
        content:`${this.Uuid};${this.empNo};${this.query.executeDate};${url}`,
        uuid:this.Uuid
      }).then(res=>{
        console.log(res);
      })
      // window.location.href = `LABELPRINT://${this.Uuid};${this.empNo};${this.query.executeDate};{${url}}`;
      // this.printStatusMsg = '正在打印,请稍等…'
      // this.showCancelPrint = false;

      // this.printResult(this.selectedData.length);
    },
    cleanPrintStatusRoundTime(){
      if(this.printStatusTimmer){
        clearTimeout(this.printStatusTimmer)
      }

      if(this.printStatusReq){
        console.log(this.printStatusReq.close)
        this.printStatusReq.close&&this.printStatusReq.close()
      }
    },
    // 打印结果
    // printResult(totalNum){
    //   this.showPintModal = true;
    //   this.showProgress = true;
    //   this.cleanPrintStatusRoundTime()

    //   this.printStatusTimmer = setTimeout(()=>{
    //     this.printStatusReq = handleWebGetPrintResult(this.Uuid)
    //     .then(res => {
    //       const {data,code,desc} = res.data
    //       if(code==200){
    //         const { printNum, successNum, errorNum } = data
    //         this.printNum = printNum
    //         this.showCancelPrint = false;
    //         if(printNum<totalNum){
    //           this.printResult(totalNum)
    //           this.printStatusMsg = `正在打印,请稍等… ${printNum}/${totalNum}`
    //         }else{
    //           this.printStatusMsg = '打印成功！'
    //           setTimeout(()=>this.closePrint(),1000)
    //         }
    //       }else{
    //         this.showCancelPrint = true;
    //         this.printStatusMsg = desc;
    //         this.printResult(totalNum)
    //       }
    //     },(e)=>{

    //       if(e&&e.data&&e.data.desc){
    //         let visibleMsg = `${e.data.desc}，重试中...`
    //         this.showCancelPrint = true;
    //         if(this.printStatusMsg === visibleMsg){
    //           this.printStatusMsg = '打印程序已挂起, 3秒钟后关闭';
    //           setTimeout(()=>this.closePrint(),3000)
    //         }else{
    //           this.printStatusMsg = visibleMsg
    //           this.printResult(totalNum)
    //         }
    //       }else{
    //         this.showCancelPrint = true;
    //         this.printStatusMsg = '打印出现错误';
    //         setTimeout(()=>this.closePrint(),3000)
    //       }
    //     })
    //   }, 5*1000)
    // },
    // 关闭打印弹框
    closePrint(e){
      this.cleanPrintStatusRoundTime()
      this.showCancelPrint = false;
      this.showProgress == false
      this.showPintModal = false;
    },
    // 全选
    allSelection(){
      if(this.$refs.plTable.$children && this.$refs.plTable.$children[0] && this.$refs.plTable.$children[0].toggleAllSelection){
        this.$refs.plTable.$children[0].toggleAllSelection();
      }
    }
  },
  created() {
    this.onLoad();
  },
  watch: {
    deptCode() {
      this.search();
    },
    startDate() {
      this.search();
    },
    repeatIndicator() {
      this.search();
    },
    type() {
      this.search();
    },
    status() {
      this.search();
    }
  },
  components: {
    dTable,
    modal
    // pagination
  }
};
</script>
