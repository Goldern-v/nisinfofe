<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
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
        <el-row class="select-btn-list" type="flex" align="middle">
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
        <el-select
          v-model="type"
          multiple
          placeholder="请选择"
          size="small"
          style="width:180px"
          @change="handleChangeType"
        >
          <el-option
            :label="typeItem.name"
            :value="typeItem.value"
            v-for="typeItem in allType"
            :key="typeItem.id"
          ></el-option>
        </el-select>
        <span class="label" v-if="HOSPITAL_ID !== 'beihairenyi'">核对状态:</span>
        <el-select
          v-if="HOSPITAL_ID !== 'beihairenyi'"
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
        <el-input style="width: 0px; padding: 0px; height: 0px; overflow: hidden;" />
        <el-button size="small" type="primary" @click="search">查询</el-button>
      </div>

      <dTable
        :tableData="tableData"
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
import dTable from "./components/table/d-table-lyxrm-n";
import pagination from "./components/common/pagination";
import { getExecuteWithWardCodeLyxrm } from "./api/index";
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
      startDate: moment().format("YYYY-MM-DD")+' 00:00:00',
      endDate: moment(moment().toDate().getTime() ).format("YYYY-MM-DD")+' 23:59:59',
      repeatIndicator: "",
      type: ['全部'],
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
          id: "3",
          name: "全部"
        },
        {
          id: 2,
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
      ],
      whslstatusList: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 2,
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
    };
  },
  methods: {
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
        executeType:
          this.type.length > 0 ? this.type.join(",") : "全部", //执行单类型:输液,口服、治疗、雾化、注射
        bedLabel: this.bedLabel, //床号
        patientName: this.patientName, //患者姓名
        administration: this.administration, // //途径
        dispenseFlag: this.dispenseFlag,
      };

      getExecuteWithWardCodeLyxrm(obj).then(res => {
        // let children = [],
        //   child = [],
        //   tableData = [];
        let tableData = res.data.data.map((item, index, array) => {
          let prevRowId, nextRowId, currentRowId;

          prevRowId =
            array[index - 1] &&
            array[index - 1].barCode;
          nextRowId =
            array[index + 1] &&
            array[index + 1].barCode;
          currentRowId =
            array[index] && array[index].barCode;

          item.id = index;

          /** 判断是此记录是多条记录 */
        //   if (currentRowId == prevRowId || currentRowId == nextRowId) {
        //     child.map(e=>{
        //       if(e.orderText==item.orderText){item.orderText = "";item.dosage = "";item.dosageUnits = ""}
        //       if(e.frequency==item.frequency){item.frequency = ""}
        //       if(e.administration==item.administration){item.administration = ""}
        //       if(e.executeDateTime==item.executeDateTime){
        //         item.executeDateTime = "";
        //         item.executeFlag= 5;
        //         item.realExecuteDateTime="";
        //         item.startNurse="";
        //         item.endNurse="";
        //         item.endDateTime=""
        //       }
        //     })
        //     child.push(item);
        //     if(item.executeType=="输液"){
        //       children.push(item)
        //     }
        //     if (currentRowId != prevRowId) {
        //       /** 第一条 */
        //       item.rowType = 1;
        //       tableData.push(item);
        //     } else if (currentRowId != nextRowId) {
        //       /** 最后条 */
        //       item.rowType = 3;
        //     if(item.executeType=="输液"){
        //       tableData[tableData.length - 1].children = JSON.parse(
        //         JSON.stringify(children)
        //       );
        //       children = [];
        //     }
        //       tableData[tableData.length - 1].child = JSON.parse(
        //         JSON.stringify(child)
        //       );
        //       child = [];
        //     } else {
        //       /** 中间条 */
        //       item.rowType = 2;
        //     }
        //   } else {
        //     tableData.push(item);
        //   }
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
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    },
    handleChangeType(value) {
      if (this.type.length === 2 && this.type.includes('全部')) {
        this.type.shift()
      } else if (this.type.length > 2 && this.type[this.type.length - 1] === '全部') {
        this.type = ['全部']
      }
    },
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
