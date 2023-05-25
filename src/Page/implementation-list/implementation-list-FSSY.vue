<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <h3>批量执行单</h3>
        <div>
          <span class="label" style="margin-left: 0">执行日期:</span>
          <el-date-picker v-model="orderTimeStr" type="datetimerange" value-format='yyyy-MM-dd HH:mm:ss'
            range-separator="至" align="right" start-placeholder="开始日期" end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
          <span class="label">医嘱类型:</span>
          <el-select v-model="query.repeatIndicator" placeholder="请选择" size="small" style="width: 150px">
            <el-option label="全部" :value="9"></el-option>
            <el-option label="长期" :value="1"></el-option>
            <el-option label="临时" :value="0"></el-option>
          </el-select>
          <span class="label">医嘱分类:</span>
          <el-select v-model="query.itemType" placeholder="请选择" size="small" style="width: 150px">
            <el-option v-for="item in medicalType" :key="item.id" :label="item.executeSmallType"
              :value="item.executeSmallType">
            </el-option>
          </el-select>
          <span class="label">床号:</span>
          <el-input size="small" style="width: 80px" v-model="bedLabel"></el-input>
          <span class="label">执行标志:</span>
          <el-select v-model="query.executeFlag" placeholder="请选择" size="small" style="width: 150px">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="已执行" :value="2"></el-option>
            <el-option label="执行中" :value="1"></el-option>
            <el-option label="未执行" :value="0"></el-option>
          </el-select>
          <el-button size="small" type="primary" @click="search">查询</el-button>
          <el-button size="small" @click="allSelection" :disabled="status == '已执行'">全选</el-button>
          <el-button size="small" @click="middleware" :disabled="status == '已执行'">执行</el-button>
        </div>
      </div>
      <dTable :pageLoadng="pageLoadng" ref="plTable" :tableData="tableData"></dTable>

      <el-dialog title="执行时间" :visible.sync="isExecutionTime">
        <el-form :model="form">
          <el-form-item label="执行时间">
            <el-date-picker v-model="form.date" type="datetime" placeholder="选择执行时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isExecutionTime = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
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
</style>
<script>
import dTable from "./components/table/d-table-FSSY";
import { getExecuteWithWardcode, handleWebExecuteBatch, getPdaExecuteTypeApi } from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
export default {
  mixins: [common],
  data() {
    return {
      pageInput: "",
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 100,
        total: 0,
      },
      orderTimeStr: [moment().format("YYYY-MM-DD") + ' 07:30:00', moment().format("YYYY-MM-DD") + ' 17:30:00'],
      type: "",
      status: "",
      bedLabel: "",
      test: "",
      query: {
        wardCode: "",
        itemType: "输液", //医嘱类别，输液、雾化
        startDate: moment().format("YYYY-MM-DD HH:mm:ss"), //执行起始日期
        endDate: moment().format("YYYY-MM-DD HH:mm:ss"), //执行结束日期
        bedLabel: "", //床位号，如果查全部传*"
        repeatIndicator: 9, //医嘱类型，长期传1，临时传0，全部传9
        executeFlag: "全部", //0未执行，2已执行
      },
      isExecutionTime: false,
      form: {
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      tableData: [],
      medicalType: [],
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
      this.query.wardCode = this.deptCode;
      this.query.endDate = this.orderTimeStr ? moment(this.orderTimeStr[1]).format("YYYY-MM-DD HH:mm:ss")
        : moment().format("YYYY-MM-DD HH:mm:ss");
      this.query.startDate = this.orderTimeStr ? moment(this.orderTimeStr[0]).format("YYYY-MM-DD HH:mm:ss")
        : moment().format("YYYY-MM-DD HH:mm:ss");
      this.query.bedLabel = this.bedLabel ? this.bedLabel : "*";

      getExecuteWithWardcode(this.query).then((res) => {
        let tableData = res.data.data.map((item, index, array) => {
          let prevRowId =
            array[index - 1] &&
            array[index - 1].patientId +
            array[index - 1].barCode +
            array[index - 1].executeDateTime;
          let nextRowId =
            array[index + 1] &&
            array[index + 1].patientId +
            array[index + 1].barCode +
            array[index + 1].executeDateTime;
          let currentRowId =
            array[index] &&
            array[index].patientId +
            array[index].barCode +
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
        // 设置表格数据
        if (
          this.$refs.plTable.$children &&
          this.$refs.plTable.$children[0] &&
          this.$refs.plTable.$children[0].reloadData
        ) {
          this.$refs.plTable.$children[0].reloadData(tableData);
          this.tableData = tableData
        }
        this.page.total = Number(res.data.data.pageCount) * this.page.pageNum;
        this.pageLoadng = false;
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    },
    // 全选
    allSelection() {
      if (
        this.$refs.plTable.$children &&
        this.$refs.plTable.$children[0] &&
        this.$refs.plTable.$children[0].toggleAllSelection
      ) {
        this.$refs.plTable.$children[0].toggleAllSelection();
      }
    },
    confirm() {
      this.handleExecuteBatch()
      this.isExecutionTime = false;
    },
    middleware() {
      let selectedData = this.$refs.plTable.selectedData;
      if (selectedData.length <= 0) return this.$message.warning('请选择执行内容！');
      this.isExecutionTime = true
    },
    // 批量处理执行单
    handleExecuteBatch() {
      let selectedData = this.$refs.plTable.selectedData,
      data = [];

      selectedData.map((item) => {
        let obj = {
          patientId: item.patientId,
          visitId: item.visitId,
          barcode: item.barCode,
          orderNo: item.orderNo,
          executeNurse: this.empNo, // 执行护士工号
          verifyNurse: this.empNo, // 核对护士工号
        };
        obj.startDate = moment(this.form.date).format("YYYY-MM-DD HH:mm:ss");
        // 相同barcode只需要发送一条记录
        let isHas = data.every(e => {
          return e.barcode != obj.barcode
        })
        isHas ? data.push(obj) : ''
      });
      handleWebExecuteBatch({ lists: data }).then((res) => {
        this.$message.success(res.data.desc);
        this.onLoad();
      });
    },
    // 获取医嘱类型选择数据
    async getPdaExecuteType() {
      const { data } = await getPdaExecuteTypeApi();
      this.medicalType = data.data;
    }
  },
  created() {
    this.onLoad();
    this.getPdaExecuteType()
  },
  watch: {
    deptCode() {
      this.search();
    },
    type() {
      this.search();
    },
    status() {
      this.search();
    },
  },
  components: {
    dTable,
    // pagination
  },
};
</script>
