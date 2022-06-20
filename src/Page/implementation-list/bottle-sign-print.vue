<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <h3>瓶签打印</h3>
        <div>
          <span class="label">执行开始时间</span>
          <!-- <span class="label">执行日期:</span> -->
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择入院起始时间"
            size="small"
            v-model="startDate"
            style="width:180px"
          ></el-date-picker>
          <!-- -- -->
          <span class="label">执行结束时间</span>
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择终止时间"
            size="small"
            v-model="endDate"
            style="width:180px"
          ></el-date-picker>
          <!-- <el-date-picker
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择入院起始时间"
            size="small"
            v-model="query.executeDate"
            style="width:150px"
          ></el-date-picker> -->
          <span class="label">医嘱类型:</span>
          <el-select v-model="query.repeatIndicator" placeholder="请选择" size="small" style="width:80px">
            <el-option label="全部" :value="9"></el-option>
            <el-option label="长期" :value="1"></el-option>
            <el-option label="临时" :value="0"></el-option>
          </el-select>
          <span class="label">医嘱分类:</span>
          <el-select v-model="query.itemType" placeholder="请选择" size="small" style="width:80px">
            <el-option
              v-for="(optionItem,optionIndex) in typeOptions[HOSPITAL_ID] || typeOptions.default"
              :key="optionIndex"
              :label="optionItem.label"
              :value=" optionItem.value || optionItem.label"
            ></el-option>
          </el-select>
          <span class="label">床号:</span>
          <el-input size="small" style="width: 80px;" v-model="bedLabel"></el-input>
          <span class="label" v-if="hasNewPrintHos.includes(HOSPITAL_ID)">瓶签大小:</span>
          <el-select v-if="hasNewPrintHos.includes(HOSPITAL_ID)" v-model="newModalSize" placeholder="请选择" size="small" style="width:80px;margin-right: 10px;">
            <el-option v-if="['lyxrm'].includes(HOSPITAL_ID)" label="70*80" :value="'70*80'"></el-option>
            <el-option v-else label="6*8" :value="'6*8'"></el-option>
            <el-option v-if="['lyxrm'].includes(HOSPITAL_ID)" label="3*7" :value="'3*7'"></el-option>
            <el-option v-else label="3*5" :value="'3*5'"></el-option>
          </el-select>
          <span class="label">重打标志:</span>
          <el-select v-model="query.reprintFlag" placeholder="请选择" size="small" style="width:60px;margin-right: 10px;">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
          <el-button size="small" type="primary" @click="search">查询</el-button>
          <el-button size="small" @click="allSelection" :disabled="status=='已执行'">全选</el-button>
          <el-button size="small" @click="onPrint" :disabled="status=='已执行'">打印{{ ['sdlj', 'gdtj', 'fsxt','whfk'].includes(HOSPITAL_ID) ? '此页' : '' }}</el-button>
          <el-button size="small" v-if="['sdlj', 'gdtj', 'fsxt','whfk'].includes(HOSPITAL_ID)" @click="onPrintAll" :disabled="status=='已执行'">打印全部</el-button>
          <el-button size="small" @click="creatImplement">生成执行</el-button>
          <!-- <a href="VMS://abcdefg" @click="onPrint" >1</a> -->
          <el-button size="small" v-if="HOSPITAL_ID == 'whfk'" @click="syncData">同步医嘱</el-button>
          <el-button size="small" v-else-if="HOSPITAL_ID == 'sdlj'" @click="syncData">同步医嘱</el-button>
          <el-button size="small" v-else @click="search" :disabled="status=='已执行'">同步医嘱</el-button>
        </div>
      </div>
      <dTable :pageLoadng="pageLoadng" ref="plTable"></dTable>
      <modal v-if="isShowModal" :src="src" @changeModal="changeModal"/>
      <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          :disableSize='true'
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>
      <div class="print-modal" v-show="showPintModal" @click="closePrint">
        <div class="init" v-show="!showProgress">
          <img src="./images/print.png" alt="">
          <p>正在初始化打印,请稍等…</p>
        </div>
      </div>
      <div class="new-print-box" id="new-print-box" ref="new_print_modal">
        <!-- {relatop:(printObj.length>=2&&newModalSize=='3*7')&&((bottleCardIndex+1)%2==1&&((bottleCardIndex+1)<printObj.length)||((bottleCardIndex+1)%2==0))},  -->
        <div :class="[{'break-page': ['lyxrm'].includes(HOSPITAL_ID) && bottleCardIndex % 3 == 0 && bottleCardIndex > 0}]"
          v-for="(itemBottleCard,bottleCardIndex) in printObj" :key="bottleCardIndex">
          <component :is="newPrintCom" :newModalSize="newModalSize" :itemObj='itemBottleCard' />
        </div>
      </div>
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
.new-print-box{
  // .relatop{
  //   position relative;
  //   // top:1cm;
  //   margin-top: 1cm !important;
  // }
  // display: none;
    //   position: absolute;
    // left: 0;
    // top: 50%;
    // background: #fff;
    // transform: translateY(-50%);
}
</style>
<script>
import modal from "./modal/modal.vue"
import dTable from "./components/table/bottle-sign-print-table.vue";
import pagination from "./components/common/pagination";
import NewPrintModal from "./components/common/newPrintModal"
import NewPrintModalSdlj from "./components/common/newPrintModalSdlj"
import NewPrintModalLyxrm from "./components/common/newPrintModalLyxrm"
import printing from 'printing'
import { patEmrList } from "@/api/document";
import { getPrintExecuteWithWardcode ,handleWebGetPrintResult,webExecutePrint,getPrintListContent,webSplitOrder, getPrintListContent2, getPatientOrder,getSDLJPatientOrder } from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
const initStartDate = () => {
  if (['whfk', 'fsxt'].includes(process.env.HOSPITAL_ID)) return moment().format("YYYY-MM-DD")+' 00:00:00'
  return moment().format("YYYY-MM-DD")+' 07:00:00'
}
const initEndDate = () => {
  if (['whfk'].includes(process.env.HOSPITAL_ID)) return moment(moment().toDate().getTime()+86400000).format("YYYY-MM-DD")+' 00:00:00'
  if (['fsxt'].includes(process.env.HOSPITAL_ID)) return moment(moment().toDate().getTime()+86400000).format("YYYY-MM-DD")+' 23:59:00'
  return moment(moment().toDate().getTime()+86400000).format("YYYY-MM-DD")+' 07:00:00'
}
export default {
  mixins: [common],
  data() {
    return {
      src:"",
      pageInput: "",
      pageLoadng: false,
      ifCanTongbu:true,
      page: {
        pageIndex: 1,
        // pageNum: 20,
        pageNum: 40,
        total: 0
      },
      // startDate: moment().format("YYYY-MM-DD"),
      startDate: initStartDate(),
      endDate: initEndDate(),

      repeatIndicator: "",
      type: "",
      status: "",
      bedLabel: "",
      showPintModal: false,//是否显示打印弹框
      showProgress: false,
      isShowModal:false,
      query: {
        wardCode:"",
        itemType: ['whfk'].includes(this.HOSPITAL_ID) ? "全部" : "输液",//医嘱类别，输液、雾化
        executeDate:moment().format("YYYY-MM-DD"),//执行日期
        bedLabel:'',//床位号，如果查全部传*"
        repeatIndicator: ['whfk'].includes(this.HOSPITAL_ID) ? 0 : 9,
        //医嘱类型，长期传1，临时传0，全部传9
        reprintFlag:0,//是否重打，1=是，0=否
      },
      selectedData: [],//选中打印执行单条数
      printNum: 0,//已经打印执行单的条数
      Uuid: '',//打印流水号
      printStatusTimmer: null,
      printStatusReq: null,
      printStatusMsg: '',
      showCancelPrint: false,
      pagedTable:[],
      printObj:[],
      newModalSize:'6*8',
      hasNewPrintHos:['sdlj', 'gdtj', 'fsxt','whfk','lyxrm','wujing'],
      typeOptions:{
        'whfk':[
          {label: '全部'},{label:"输液"},{label:"注射"},{label:"口服"},{label:"雾化"},{label:"皮试"},{label:"治疗"},{label:"标本"},],
        default:[
          {label:"输液"},{label:"注射"},{label:"口服"},{label:"雾化"},{label:"皮试"},{label:"治疗"},{label:"理疗"},{label:"护理"},{label:"外用"},{label:"化验"},{label:"其他"},]
      }
    };
  },
  mounted() {
    if (['lyxrm'].includes(this.HOSPITAL_ID))
      this.newModalSize = '70*80'
  },
  beforeDestroy(){
    this.cleanPrintStatusRoundTime()
  },
  methods: {
    creatImplement(){
      if (!this.deptCode) return;
      webSplitOrder({wardCode:this.deptCode}).then(res=>{
        if(res.data && res.data.code) return this.$message.success(res.data.desc)
        this.$message.error(res.data.desc)
      })
    },
    changeModal(flag){
      this.isShowModal = flag
    },
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      if(!this.hasNewPrintHos.includes(this.HOSPITAL_ID))return this.onLoad();
      if(this.$refs.plTable.$children && this.$refs.plTable.$children[0] && this.$refs.plTable.$children[0].reloadData){
        this.$refs.plTable.$children[0].reloadData(this.pagedTable[newPage - 1]||[]);
      }
    },
    syncData() {
      if (!this.deptCode || !this.ifCanTongbu) return;
      this.ifCanTongbu = false
      this.pageLoadng = true;
      let getOrder;
      if(['sdlj'].includes(this.HOSPITAL_ID)){
        getOrder=getSDLJPatientOrder
      }else getOrder=getPatientOrder
      this.query.wardCode = this.deptCode;
      this.query.startDate = moment(this.startDate).format('YYYY-MM-DD HH:mm:ss')
      this.query.endDate = moment(this.endDate).format('YYYY-MM-DD HH:mm:ss')
      this.query.executeDate = this.query.executeDate ? moment(this.query.executeDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
      this.query.bedLabel = this.bedLabel ? this.bedLabel : '*';
      getOrder(this.query).then(res => {
        this.ifCanTongbu=true
        this.search()
        // let tableData = res.data.data.map((item, index, array) => {
        //   let prevRowId =
        //     array[index - 1] &&
        //     array[index - 1].patientId +
        //     array[index - 1].visitId +
        //     array[index - 1].orderNo +
        //     array[index - 1].executeDateTime;
        //   let nextRowId =
        //     array[index + 1] &&
        //     array[index + 1].patientId +
        //     array[index + 1].visitId +
        //     array[index + 1].orderNo +
        //     array[index + 1].executeDateTime;
        //   let currentRowId =
        //     array[index] &&
        //     array[index].patientId +
        //     array[index].visitId +
        //     array[index].orderNo +
        //     array[index].executeDateTime;

        //   /** 判断是此记录是多条记录 */
        //   if (currentRowId == prevRowId || currentRowId == nextRowId) {
        //     if (currentRowId != prevRowId) {
        //       /** 第一条 */
        //       item.rowType = 1;
        //     } else if (currentRowId != nextRowId) {
        //       /** 最后条 */
        //       item.rowType = 3;
        //     } else {
        //       /** 中间条 */
        //       item.rowType = 2;
        //     }
        //   }
        //   return item;
        // });
        // if(this.hasNewPrintHos.includes(this.HOSPITAL_ID)){
        //   let pageIndex = 0
        //   let pageNum = 0
        //   let pagedTable = []
        //   let pagetotal = 0
        //   // 前端分页处理,卑微前端找不到后端配合出接口,后续如果有出可以优化下
        //   pagetotal = tableData.reduce((total,currentItem,currentIndex)=>{
        //     if(pageIndex<40){ // 不超过40条时纳入本页
        //       pageIndex++ // 自增防止死循环
        //       pagedTable[pageNum] =  pagedTable[pageNum] || [] // 对当前页的数据进行数组初始化
        //       pagedTable[pageNum].push(currentItem) // 将当前项放入本页
        //       // 这是对同组药品进行归纳(判断条码号),防止被截断,也是导致条目数可能错乱的主要原因
        //     }else if(currentItem.barcode === pagedTable[pageNum][pagedTable[pageNum].length-1].barcode){
        //       pagedTable[pageNum] =  pagedTable[pageNum] || []
        //       pagedTable[pageNum].push(currentItem)
        //     }else{
        //       pageIndex=0
        //       pageNum++
        //       pagedTable[pageNum] =  pagedTable[pageNum] || []
        //       pagedTable[pageNum].push(currentItem)
        //     }
        //     // 计算总条目数(判断barcode是否是第一次出现)
        //     return tableData.findIndex(item=>`${item.barcode}_${item.executeDateTime}` === `${currentItem.barcode}_${currentItem.executeDateTime}`) === currentIndex ? ++total : total
        //   },0)
        //   pagetotal = this.page.pageNum * pagedTable.length
        //   this.pagedTable = pagedTable
        //   // 设置表格数据
        //   if(this.$refs.plTable.$children && this.$refs.plTable.$children[0] && this.$refs.plTable.$children[0].reloadData){
        //     this.$refs.plTable.$children[0].reloadData(this.pagedTable[0]||[]); // 默认取第一页的数据
        //   }
        //   // this.page.total = Number(res.data.data.pageCount) * this.page.pageNum; // 原计算总条数的方式
        //   this.$set(this.page,'total',pagetotal)
        // }else{
        //   this.$set(this.page,'pageNum',tableData.length)
        //   this.$set(this.page,'total',tableData.length)
        //   if(this.$refs.plTable.$children && this.$refs.plTable.$children[0] && this.$refs.plTable.$children[0].reloadData){
        //     this.$refs.plTable.$children[0].reloadData(tableData); // 默认取第一页的数据
        //   }
        // }
        // this.pageLoadng = false;
      },err=>{
        this.ifCanTongbu=true
      });
    },
    onLoad() {
      if (!this.deptCode) return;
      this.pageLoadng = true;
      this.query.wardCode = this.deptCode;
      this.query.startDate = moment(this.startDate).format('YYYY-MM-DD HH:mm:ss')
      this.query.endDate = moment(this.endDate).format('YYYY-MM-DD HH:mm:ss')
      this.query.executeDate = this.query.executeDate ? moment(this.query.executeDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
      this.query.bedLabel = this.bedLabel ? this.bedLabel : '*';
      getPrintExecuteWithWardcode(this.query).then(res => {
        let tableData = res.data.data.map((item, index, array) => {
          let prevRowId =
            array[index - 1] &&
            array[index - 1].patientId +
            array[index - 1].visitId +
            array[index - 1].orderNo +
            array[index - 1].executeDateTime;
          let nextRowId =
            array[index + 1] &&
            array[index + 1].patientId +
            array[index + 1].visitId +
            array[index + 1].orderNo +
            array[index + 1].executeDateTime;
          let currentRowId =
            array[index] &&
            array[index].patientId +
            array[index].visitId +
            array[index].orderNo +
            array[index].executeDateTime;

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
        if(this.hasNewPrintHos.includes(this.HOSPITAL_ID)){
          let pageIndex = 0
          let pageNum = 0
          let pagedTable = []
          let pagetotal = 0
          // 前端分页处理,卑微前端找不到后端配合出接口,后续如果有出可以优化下
          pagetotal = tableData.reduce((total,currentItem,currentIndex)=>{
            if(pageIndex<40){ // 不超过40条时纳入本页
              pageIndex++ // 自增防止死循环
              pagedTable[pageNum] =  pagedTable[pageNum] || [] // 对当前页的数据进行数组初始化
              pagedTable[pageNum].push(currentItem) // 将当前项放入本页
              // 这是对同组药品进行归纳(判断条码号),防止被截断,也是导致条目数可能错乱的主要原因
            }else if(currentItem.barcode === pagedTable[pageNum][pagedTable[pageNum].length-1].barcode){
              pagedTable[pageNum] =  pagedTable[pageNum] || []
              pagedTable[pageNum].push(currentItem)
            }else{
              pageIndex=0
              pageNum++
              pagedTable[pageNum] =  pagedTable[pageNum] || []
              pagedTable[pageNum].push(currentItem)
            }
            // 计算总条目数(判断barcode是否是第一次出现)
            return tableData.findIndex(item=>`${item.barcode}_${item.executeDateTime}` === `${currentItem.barcode}_${currentItem.executeDateTime}`) === currentIndex ? ++total : total
          },0)
          pagetotal = this.page.pageNum * pagedTable.length
          this.pagedTable = pagedTable
          // 设置表格数据
          if(this.$refs.plTable.$children && this.$refs.plTable.$children[0] && this.$refs.plTable.$children[0].reloadData){
            this.$refs.plTable.$children[0].reloadData(this.pagedTable[0]||[]); // 默认取第一页的数据
          }
          // this.page.total = Number(res.data.data.pageCount) * this.page.pageNum; // 原计算总条数的方式
          this.$set(this.page,'total',pagetotal)
        }else{
          this.$set(this.page,'pageNum',tableData.length)
          this.$set(this.page,'total',tableData.length)
          if(this.$refs.plTable.$children && this.$refs.plTable.$children[0] && this.$refs.plTable.$children[0].reloadData){
            this.$refs.plTable.$children[0].reloadData(tableData); // 默认取第一页的数据
          }
        }
        this.pageLoadng = false;
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    },
    // 打印
    async onPrint(){
      this.selectedData = this.$refs.plTable.selectedData;
      if((this.selectedData||[]).length<=0)
      return this.$message('未选择勾选打印条目')
      if(this.hasNewPrintHos.includes(this.HOSPITAL_ID))return await this.newOnPrint()
      this.isShowModal = false
      this.src = ``;
      this.printNum = 0;

      this.query.executeDate = this.query.executeDate ? moment(this.query.executeDate).format("YYYY-MM-DD") : '';

      let url = '';
      this.selectedData.map((item,index) => {
        let targettIndex = this.selectedData.findIndex(e=>e.orderNo==item.orderNo)
        if(targettIndex==index){
          console.log(`${item.patientId}|${item.visitId}|${item.orderNo};`);
          url += `${item.patientId}|${item.visitId}|${item.orderNo};`;
        }
      });
      this.Uuid = new Date().getTime() + parseInt(Math.random()*10000);
      this.showPintModal = true
      webExecutePrint({
        content:`${this.Uuid};${this.empNo};${this.query.executeDate};${url}`,
        uuid:this.Uuid
      }).then(res=>{
        this.src = `/crNursing/asset/${res.data.data.printExecuteUrl}`;
        setTimeout(()=>{
          this.showPintModal = false
          this.isShowModal = true;
        },4000) // 武警上传有延迟，后续优化了的话可以把定时器删掉
})
      // window.location.href = `LABELPRINT://${this.Uuid};${this.empNo};${this.query.executeDate};{${url}}`;
      // this.printStatusMsg = '正在打印,请稍等…'
      // this.showCancelPrint = false;

      // this.printResult(this.selectedData.length);
    },
    async newOnPrint(){
      let barCodeList = this.$_.uniqBy(this.selectedData.map(item=>item.barcode))
      // let barcode = this.selectedData.map(item=>item.barcode).join('|')
      let printObj = {}
      let res = ''
      console.log('test-barCodeList', barCodeList)
      if (['sdlj', 'gdtj', 'fsxt','lyxrm','whfk'].includes(this.HOSPITAL_ID)) {
        res = await getPrintListContent2({barcodeList: barCodeList})
      } else {
        res = await getPrintListContent({barCode: barCodeList.join('|')})
      }
      res.data.data.map(item=>{
        printObj[item.barCode] = printObj[item.barCode] || []
        printObj[item.barCode].push(item)
      })
      let sortArr = []
      barCodeList.map(item=>{
        sortArr.push(printObj[item])
      })
      this.printObj = sortArr
      console.log(sortArr,"sortArr")
      document.getElementById('new-print-box').style.display = 'block'
      this.$nextTick(()=>{
        printing(this.$refs.new_print_modal,{
          injectGlobalCss: true,
          scanStyles: false,
          css: `
            @page{
              margin: 0 0;
            }
            body{
              ${this.newModalSize=='6*8' || this.newModalSize == '70*80'?'':'transform: scale(0.5);transform-origin: 0 0 0;'}
            }
            .break-page {
              page-before-break: always;
            }
          `
        }).then(()=>{
          document.getElementById('new-print-box').style.display = 'none'
          this.onLoad()
        })
      })
    },
    // 打印全部
    async onPrintAll() {
      this.selectedData = this.$_.flattenDeep(this.pagedTable)
      await this.newOnPrint()
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
  computed: {
    newPrintCom() {
      switch(this.HOSPITAL_ID) {
        case 'sdlj':
        case 'gdtj':
          return 'NewPrintModalSdlj'
        case 'fsxt':
          return 'NewPrintModalSdlj'
        case 'lyxrm':
          return 'NewPrintModalLyxrm'
        default:
          return 'NewPrintModal'
      }
    }
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
    modal,
    pagination,
    NewPrintModal,
    NewPrintModalSdlj,
    NewPrintModalLyxrm,
  }
};
</script>
