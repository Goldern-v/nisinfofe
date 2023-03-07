<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <span class="label" style="margin-left: 0">执行日期:</span>
        <el-date-picker
      v-model="orderTimeStr"
      type="datetimerange"
      value-format='yyyy-MM-dd   HH:mm:ss'
       range-separator="至"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        <span class="label">长/临:</span>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="repeatIndicator">
            <el-radio class="radio" label>全部</el-radio>
            <el-radio class="radio" label="1">长嘱</el-radio>
            <el-radio class="radio" label="0">临嘱</el-radio>
            <!-- <el-radio class="radio" label="2" v-if="HOSPITAL_ID != 'shannan'">单药处方</el-radio> -->
          </el-radio-group>
        </el-row>
        <span class="label">状态:</span>
        <el-select
          v-model="status"
          placeholder="请选择"
          size="small"
          style="width:150px"
          v-if="type===0"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in transfusionStatus"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="status" placeholder="请选择" size="small" style="width:150px" v-else>
          <el-option :label="item.name" :value="item.id" v-for="item in allStatus" :key="item.id"></el-option>
        </el-select>
        <span class="label">类型:</span>
        <el-select v-model="type" placeholder="请选择" size="small" style="width:150px">
          <el-option
            :label="typeItem.name"
            :value="typeItem.id"
            v-for="typeItem in allType"
            :key="typeItem.id"
          ></el-option>
        </el-select>
        <div style="flex: 1"></div>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入途径进行搜索"
          v-model="administration"
        ></el-input>
        <el-button size="small" type="primary" @click="search">查询</el-button>
      </div>
      <dTable
        :tableData="tableData"
        :currentType="type"
        :pageLoadng="pageLoadng"
        :tableH="wih - 184"
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
}

.head-con {
  height: 42px;
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
  padding: 0 16px;

  >>> .el-radio__input {
    position: relative;
    top: 1px;
  }

  >>> .el-radio__label {
    color: #333;
    font-size: 12px;
    position: relative;
    top: 2px;
  }
}
</style>
<script>
import dTable from "@/Page/implementation-list/components/table/d-table-FSSY2";
import pagination from "@/Page/implementation-list/components/common/pagination";
import { getOrdersExecuteWithPatinetId } from "./api/index";
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
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0,
      },
      //初始化日期
       orderTimeStr: [moment().format("YYYY-MM-DD")+' 07:30:00',moment().format("YYYY-MM-DD")+' 17:30:00'],
      repeatIndicator: "",
      type: "",
      status: "",
      bedLabel: "",
      patientName: "",
      administration: "",//途径
      transfusionStatus: [
        {
          id: "",
          name: "全部",
        },
        {
          id: 0,
          name: "未执行",
        },
        {
          id: 1,
          name: "开始输液",
        },
        {
          id: 2,
          name: "暂停输液",
        },
        {
          id: 3,
          name: "继续输液",
        },
        {
          id: 4,
          name: "已完成",
        },
      ],
      allStatus: [
        {
          id: "",
          name: "全部",
        },
        {
          id: 0,
          name: "未执行",
        },
        {
          id: 4,
          name: "已完成",
        },
      ],
      allType: [
        {
          id: "",
          name: "全部",
        },
        {
          id: 0,
          name: "输液",
        },
        {
          id: 1,
          name: "注射",
        },
        {
          id: 2,
          name: "口服",
        },
        {
          id: 3,
          name: "雾化",
        },
        {
          id: 4,
          name: "皮试",
        },
        {
          id: 5,
          name: "治疗（理疗）",
        },
        {
          id: 6,
          name: "标本",
        },
        {
          id: 7,
          name: "输血",
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
      this.pageLoadng = true;
      let obj = {
        patientId: this.$route.query.patientId,// --患者id
        visitId: this.$route.query.visitId, // --住院次数
        startDate:moment(this.orderTimeStr[0]).format("YYYY-MM-DD HH:mm:ss"),
        endDate:moment(this.orderTimeStr[1]).format("YYYY-MM-DD HH:mm:ss"),
        // executeDateTime: moment(this.startDate).format("YYYY-MM-DD"), // --预计执行时间
        repeatIndicator: this.repeatIndicator, //医嘱类型:0临时 1长期  2单药处方
        executeStatus: this.status, //执行单状态:0-未执行、1-执行中（输液中）、2-暂停输液、3-继续执行  4-已完成（结束输液）
        executeType: typeof this.type == "number"
          ? this.allType[this.type + 1].name
          : this.type, //执行单类型:输液,口服、治疗、雾化、注射
        administration: this.administration // //途径
      }
      getOrdersExecuteWithPatinetId(obj).then((res) => {

        let children = [],
          child = [],
          tableData = [];
        res.data.data.map((item, index, array) => {
          let prevRowId, nextRowId, currentRowId;

          prevRowId =
            array[index - 1] &&
            array[index - 1].patientId + array[index - 1].orderNo;
          nextRowId =
            array[index + 1] &&
            array[index + 1].patientId + array[index + 1].orderNo;
          currentRowId =
            array[index] && array[index].patientId + array[index].orderNo;

          item.id = index;

          /** 判断是此记录是多条记录 */
          if (currentRowId == prevRowId || currentRowId == nextRowId) {
            child.push(item);
            children.push(item);
            if (currentRowId != prevRowId) {
              /** 第一条 */
              item.rowType = 1;
              tableData.push(item);
            } else if (currentRowId != nextRowId) {
              /** 最后条 */
              item.rowType = 3;

              tableData[tableData.length - 1].children = JSON.parse(
                JSON.stringify(children)
              );
              children = [];

              tableData[tableData.length - 1].child = JSON.parse(
                JSON.stringify(child)
              );
              child = [];
            } else {
              /** 中间条 */
              item.rowType = 2;
            }
          } else {
            tableData.push(item);
          }
        });

        tableData.map(item => {
          item.child = item.child ? item.child : [{ ...item }];
        });
        this.tableData = [...tableData];

        // this.page.total = Number(res.data.data.pageCount) * this.page.pageNum;
        this.pageLoadng = false;
        // 设置表格数据
        if (
          this.$refs.plTable.$children &&
          this.$refs.plTable.$children[0] &&
          this.$refs.plTable.$children[0].reloadData
        ) {
          this.$refs.plTable.$children[0].reloadData(tableData);
        }
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
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
    orderTimeStr() {
      this.search();
    },
    repeatIndicator() {
      this.search();
    },
    type(newVal, oldVal) {
      if (oldVal == "输液") {
        this.status = "";
      }
      this.search();
    },
    status() {
      this.search();
    },
  },
  components: {
    dTable,
    pagination,
  },
};
</script>
