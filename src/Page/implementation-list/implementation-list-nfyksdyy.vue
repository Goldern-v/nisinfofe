<template>
  <div>
    <div class="main-contain">
      <div ref="scrollRef" class="head-con" @wheel.prevent="onScrollX">
        <div class="head-left">
          <span class="label" style="margin-left: 0">执行日期:</span>
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择入院起始时间"
            size="small"
            v-model="startDate"
            style="width:160px"
          ></el-date-picker>
          &nbsp;--&nbsp;
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择终止时间"
            size="small"
            v-model="endDate"
            style="width:160px"
          ></el-date-picker>

          <span class="label">长/临:</span>
          <el-row class="select-btn-list" type="flex" align="middle" style="width: 180px">
            <el-radio-group v-model="repeatIndicator">
              <el-radio class="radio" label>全部</el-radio>
              <el-radio class="radio" label="1">长嘱</el-radio>
              <el-radio class="radio" label="0">临嘱</el-radio>
              <!-- <el-radio class="radio" label="2">单药处方</el-radio> -->
            </el-radio-group>
          </el-row>
          <span class="label">状态:</span>
          <el-select
            v-model="status"
            placeholder="请选择"
            size="small"
            style="width:90px"
            v-if="HOSPITAL_ID !='whsl'"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in statusList"
              :key="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="status"
            placeholder="请选择"
            size="small"
            style="width:90px"
            v-if="HOSPITAL_ID =='whsl'"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in whslstatusList"
              :key="item.id"
            ></el-option>
          </el-select>
          <span class="label">类型:</span>
  <!--        @change="handleChangeType"-->
          <el-select
            v-model="type"
            placeholder="请选择"
            size="small"
            style="width:180px">
            <el-option
              :label="typeItem.name"
              :value="typeItem.value"
              v-for="typeItem in allType"
              :key="typeItem.id"
            ></el-option>
          </el-select>
          <span class="label">病人分组:</span>
          <el-select
            v-model="patientGroup"
            placeholder="请选择"
            size="small"
            style="width: 90px"
            clearable
          >
            <el-option
              v-for="item in patientGroup4Expand3"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="label" >核对状态:</span>
          <el-select
            v-model="dispenseFlag"
            placeholder="请选择"
            size="small"
            style="width:80px"
          >
            <el-option
              :label="v.name"
              :value="v.value"
              v-for="v in dispenseFlagList"
              :key="v.value"
            ></el-option>
          </el-select>
          <div style="flex: 1"></div>
          <el-input
            size="small"
            style="width: 100px;margin-right: 15px;"
            placeholder="输入病人姓名进行搜索"
            v-model="patientName"
          ></el-input>
          <el-input
            size="small"
            style="width: 75px;margin-right: 15px;"
            placeholder="输入床号进行搜索"
            v-model="bedLabel"
          ></el-input>
          <el-input
            type="text"
            auto-complete="off"
            size="small"
            style="width: 75px;margin-right: 15px;"
            placeholder="输入途径进行搜索"
            v-model="administration"
          ></el-input>
        </div>
        <div class="head-right">
          <el-input style="width: 0px; padding: 0px; height: 0px; overflow: hidden;" />
          <el-button size="small" type="primary" @click="postReason">同步</el-button>
          <el-button size="small" type="primary" @click="search">查询</el-button>
        </div>
      </div>

      <dTable
        :tableData="tableDataWithFilter"
        :currentType="type"
        :pageLoading="pageLoading"
        ref="plTable"
      ></dTable>
      <!-- <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>-->
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain {
  margin: 10px 10px 0px 10px;

  .pagination-con {
    height: 41px;
    position: relative;

    .pagination {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #eaeaea;
      border: 1px solid #cbd5dd;
      padding: 4px 15px;
      background: rgba(0, 0, 0, 0);
      z-index: 1;
    }

    .right-part {
      span {
        margin-right: 12px;
        font-size: 12px;
        color: #687179;
        cursor: pointer;
        user-select: none;

        &.useLess {
          color: #999 !important;
          cursor: not-allowed;
        }

        input {
          width: 25px;
          height: 16px;
          background: #FFFFFF;
          border: 1px solid #CBD5DD;
          border-radius: 2px;
          outline: none;
          text-align: center;
        }

        &:hover {
          color: #333;
        }
      }
    }
  }
  >>> .plTableBox {
    .tree--btn-wrapper {
      position: absolute;
      top: 50%;
      width: 1em;
      height: 1em;
      line-height: 1em;
      margin-top: -.5em;
      transition: transform .2s ease-in-out;
      z-index: 1;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: #333!important;
      font-size: 16px;
      cursor: pointer;
    }
    .pl-tree-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      padding-left: 1.5em;
    }

    .el-icon-folder-add:before {
      font-family: element-icons;
      content: "\E61C";
    }
    .el-icon-folder-remove:before {
      font-family: element-icons;
      content: "\E619";
    }
    .ivu-table-cell-tree-empty {
      cursor: default;
      color: transparent;
      background-color: transparent;
      border-color: transparent;
    }
  }
}

.head-con {
  min-height: 42px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  overflow: auto;
  position: relative;
  padding-right: 114px;
  .head-left {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    /* overflow: auto; */
    position: relative;
  }
  .head-right {
    display: flex;
    position: fixed;
    right: 10px;
    background-color: #f2f2f2;
    padding: 2px;
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
  padding: 0 10px;

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
  >>>.el-checkbox-group, .el-radio-group {
    display: flex;
  }
  >>> .el-radio + .el-radio {
    margin-left: 10px;
  }
  >>> .el-checkbox + .el-checkbox {
    margin-left: 10px;
  }
}
</style>
<script>
import dTable from "./components/table/d-table-nfyksdyy";
import pagination from "./components/common/pagination";
import { getExecuteWithWardCodeLyxrm, syncExecuteByWardCode} from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import bus from "vue-happy-bus";

export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageInput: "",
      tableData: [],
      pageLoading: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      },
       orderTimeStr: [moment().format("YYYY-MM-DD")+' 07:30:00',moment().format("YYYY-MM-DD")+' 17:30:00'],
      startDate: moment().format("YYYY-MM-DD")+' 08:00:00',
      endDate: moment(moment().toDate().getTime()+86400000).format("YYYY-MM-DD")+' 07:59:59',
      repeatIndicator: "",
      type:'全部',
      status: "",
      bedLabel: "",
      patientName: "",
      administration: "", //途径
      allType: [
        {
          name: "全部",
          value: "全部"
        },
        {
          name: "输液",
          value: "输液"
        },
        {
          name: "注射",
          value: "注射"
        },
        {
          name: "口服",
          value: "口服"
        },
        {
          name: "雾化",
          value: "雾化"
        },
        {
          name: "皮试",
          value: "皮试"
        },
        {
          name: "标本",
          value: "标本"
        },
        {
          name: "治疗",
          value: "治疗"
        },
        {
          name: "非摆药机",
          value: "非摆药机"
        },
        {
          name: "泵入",
          value: "泵入"
        },
        {
          name: "其他",
          value: "其他"
        },
      ],
      statusList: [
        {
          id: '',
          name: "全部"
        },

        {
          id: 4,
          name: "已执行"
        },
        {
          id: 1,
          name: "执行中"
        },
        {
          id: 0,
          name: "未执行"
        },
        {
          id: 8,
          name: "不执行"
        },
      ],
      whslstatusList: [

        {
          id: 4,
          name: "已完成"
        },
        {
          id: 1,
          name: "执行中"
        },
        {
          id: 0,
          name: "未执行"
        },
      ],
      workClassList:["白班","夜班"],
      // 核对状态
      dispenseFlag: '',
      dispenseFlagList: [
        {
          value: '',
          name: '全部'
        },
        {
          value: 0,
          name: '未核对'
        },
        {
          value: 14,
          name: '已核对'
        },
      ],
      patientGroup: '', // 病人分组
    };
  },
  computed: {
    // 病人分组过滤后的table
    tableDataWithFilter() {
      if (this.patientGroup) {
        return this.tableData.filter(item => item.expand3 === this.patientGroup);
      } else  {
        return this.tableData;
      }
    },
    // 病人分组（expand3字段）
    patientGroup4Expand3() {
      const result = Array.from(
        new Set(this.tableData.map(item => item.expand3))
      )
      .sort()
      .map(item => {
        return {
          name: item ? `分组${item}` : '无',
          value: item
        }
      })
      // console.log(Array.from(new Set(this.tableData.map(item => item.expand3))).sort(),'patientGroup4Expand312121211212');
      return result
    },
  },
  methods: {
    onScrollX(e) {
      const deltaX = -e.wheelDelta || e.deltaY + 40 || e.detail;
      const scrollRef = this.$refs.scrollRef;
      if (scrollRef) {
        scrollRef.scrollLeft = scrollRef.scrollLeft + deltaX / 4
      }
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
      this.pageLoading = true;
      let obj = {
        wardCode: this.deptCode, //护理单元代码
        startDate:moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'),
        endDate:moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'),
        // executeDateTime: moment(this.startDate).format("YYYY-MM-DD "), //执行单预计执行时间
        repeatIndicator: this.repeatIndicator, //医嘱类型:0临时 1长期  2单药处方
        executeStatus: this.status, //执行单状态:0-未执行、1-执行中（输液中）、2-暂停输液、3-继续执行  4-已完成（结束输液）
        executeType:this.type||"全部",
          // this.type.length > 0 ? this.type.join(",") : "全部", //执行单类型:输液,口服、治疗、雾化、注射
        bedLabel: this.bedLabel, //床号
        patientName: this.patientName, //患者姓名
        administration: this.administration, // //途径
        dispenseFlag: this.dispenseFlag,
      };
    //  syncExecuteByWardCode({wardCode,startTime,endTime}).then(res => {
    //   this.
    //   this.$message.success("同步成功");
    //  },)

      getExecuteWithWardCodeLyxrm(obj).then(res => {
        let list =  res.data.data.sort((a,b)=>{
          if(a.barCode === b.barCode){
            return a.itemNo - b.itemNo
          }
        })
        let tableData = list.map((item, index, array) => {
          let prevRowId, nextRowId, currentRowId,prevRowTime,nextRowTime,currentRowTime;
          prevRowId = array[index - 1] && array[index - 1].barCode;
          nextRowId = array[index + 1] && array[index + 1].barCode;
          currentRowId = array[index] && array[index].barCode;
          prevRowTime=array[index - 1] && array[index - 1].executeDateTime;
          nextRowTime = array[index + 1] && array[index + 1].executeDateTime;
          currentRowTime = array[index] && array[index].executeDateTime;
          item.id = index;
          if((currentRowTime == prevRowTime&&currentRowId == prevRowId)||(currentRowTime ==nextRowTime&& currentRowId == nextRowId)){
            // if ((currentRowId == prevRowId || currentRowId == nextRowId)) {
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
            // }
          }
          return item;
        });
        // tableData.map(item => {
        //   item.child = item.child ? item.child : [{ ...item }];
        // });

        this.tableData = [...tableData];
        // this.page.total = Number(res.data.data.pageCount) * this.page.pageNum;
        this.pageLoading = false;
        // 设置表格数据
        if (
          this.$refs.plTable.$children &&
          this.$refs.plTable.$children[0] &&
          this.$refs.plTable.$children[0].reloadData
        ) {
          this.$refs.plTable.$children[0].reloadData(tableData);
        }
      }).catch((err)=> this.pageLoading = false);

    },
    // syncExecuteByWardCode() {
    //   let startTime = this.startTime
    //   let endTime = this.endTime
    //   this.$message.info("正在同步数据...");
    //   this.tableLoading = true;
    //   syncExecuteByWardCode(this.wardCode== this.deptCode, startTime,endTime).then(
    //     (res) => {
    //       this.$message.success("同步数据成功");
    //       this.getData();
    //     }
    //   );
    // },
    postReason(){
      let data = {
        startTime:moment(this.startTime).format('YYYY-MM-DD')+' 08:00:00',
        // endTime:moment(this.endTime+86400000).format('YYYY-MM-DD')+' 07:59:59',
        endTime:moment(moment().toDate().getTime()+86400000).format("YYYY-MM-DD")+' 07:59:59',
        wardCode:this.deptCode,
      };
      syncExecuteByWardCode(data).then((res) => {
        this.$message.success(res.data.desc);
        this.close();
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    },
    // handleChangeType(value) {
      // console.log("value===",value)
      // if (this.type.length === 2 && this.type.includes('全部')) {
      //   this.type.shift()
      // } else if (this.type.length > 2 && this.type[this.type.length - 1] === '全部') {
      //   this.type = ['全部']
      // }
    // },
  },
  created() {
    this.onLoad();
    this.bus.$on("loadImplementationList", () => {
      this.onLoad();
    });
  },
  watch: {
    deptCode() {
      this.search();
    },
    startDate() {
      this.search();
    },
    endDate() {
      this.search();
    },
    repeatIndicator() {
      this.search();
    },
    dispenseFlag(){
      this.search();
    },
    type(newVal, oldVal) {
      // if (oldVal == "输液") {
      //   this.status = "";
      // }
      this.search();
    },
    status() {
      this.search();
    },
    '$route.query': {
      handler(v) {
        if (v.patientName) {
          this.patientName = v.patientName
          this.onLoad()
        }
      },
      immediate: true,
    },
    // workClassList:{
    //   deep:true,
    //   handler(newVal){
    //     if(newVal.length==2){
    //       // 白班夜班,当前日期的07:30:00~第二天日期的07:30:00
    //       this.startDate=moment().format("YYYY-MM-DD")+' 07:30:00'
    //       this.endDate=moment(moment().toDate().getTime()+86400000).format("YYYY-MM-DD")+' 07:30:00'
    //     }else if(newVal.length==1){
    //       if(newVal[0]=="白班"){
    //         // 白班，当前日期的07:30:00~当前日期的17:30:00
    //         this.startDate=moment().format("YYYY-MM-DD")+' 07:30:00'
    //         this.endDate=moment().format("YYYY-MM-DD")+' 17:30:00'
    //       }else{
    //         // 夜班,当前日期的17：30：00到第二天日期的07：30：00
    //         this.startDate=moment().format("YYYY-MM-DD")+' 17:30:00'
    //         this.endDate=moment(moment().toDate().getTime()+86400000).format("YYYY-MM-DD")+' 07:30:00'
    //       }
    //     }
    //   }
    // }
  },
  components: {
    dTable,
    pagination
  }
};
</script>
