<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <div>
          <span class="label" style="margin-left: 0">执行日期:</span>
          <el-date-picker
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择入院起始时间"
            size="small"
            v-model="query.executeDate"
            style="width: 150px"
          ></el-date-picker>
          <!-- <span class="label">长/临:</span>
          <el-row class="select-btn-list" type="flex" align="middle">
            <el-radio-group v-model="repeatIndicator">
              <el-radio class="radio" label>全部</el-radio>
              <el-radio class="radio" label="1">长期</el-radio>
              <el-radio class="radio" label="0">临时</el-radio>
            </el-radio-group>
          </el-row> -->
          <span class="label">医嘱类型:</span>
          <el-select
            v-model="query.repeatIndicator"
            placeholder="请选择"
            size="small"
            style="width: 150px"
          >
            <el-option label="全部" :value="9"></el-option>
            <el-option label="长期" :value="1"></el-option>
            <el-option label="临时" :value="0"></el-option>
          </el-select>
          <!-- <span class="label">状态:</span>
          <el-row class="select-btn-list" type="flex" align="middle">
            <el-radio-group v-model="status">
              <el-radio class="radio" label>全部</el-radio>
              <el-radio class="radio" label="已执行">已执行</el-radio>
              <el-radio class="radio" label="执行中">执行中</el-radio>
              <el-radio class="radio" label="未执行">未执行</el-radio>
            </el-radio-group>
          </el-row> -->
          <span class="label">医嘱分类:</span>
          <el-select
            @change='itemTypeOnChange'
            v-model="itemTypeTem"
            multiple
            placeholder="请选择"
            size="small"
            style="width: 250px"
          >
            <el-option label="全部" value="全部"></el-option>
            <el-option label="输液" value="输液"></el-option>
            <el-option label="注射" value="注射"></el-option>
            <el-option label="口服" value="口服"></el-option>
            <el-option label="雾化" value="雾化"></el-option>
            <el-option label="皮试" value="皮试"></el-option>
            <!-- <el-option label="治疗" value="治疗"></el-option>
            <el-option label="理疗" value="理疗"></el-option>
            <el-option label="护理" value="护理"></el-option>
            <el-option label="外用" value="外用"></el-option> -->
            <el-option label="标本" value="标本"></el-option>
            <el-option label="泵入" value="泵入"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
          <span class="label">床号:</span>
          <el-input
            size="small"
            style="width: 80px"
            v-model="bedLabel"
          ></el-input>
          <span class="label">执行标志:</span>
          <el-select
            v-model="query.executeFlag"
            placeholder="请选择"
            size="small"
            style="width: 150px"
          >
            <el-option label="全部" value="全部"></el-option>
            <el-option label="已执行" :value="2"></el-option>
            <el-option label="未执行" :value="0"></el-option>
          </el-select>
          <el-button size="small" type="primary" @click="search"
            >查询</el-button
          >
          <!-- <el-button
            size="small"
            @click="allSelection"
            :disabled="status == '已执行'"
            >全选</el-button
          >
          <el-button
            size="small"
            @click="middleware"
            :disabled="status == '已执行'"
            >执行</el-button
          > -->
        </div>
      </div>
      <dTable :pageLoadng="pageLoadng" ref="plTable"></dTable>
      <!-- <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div> -->
      <el-dialog title="执行时间" :visible.sync="isExecutionTime">
  <el-form :model="form">
    <el-form-item label="执行时间">
      <el-date-picker
      v-model="form.date"
      type="datetime"
      placeholder="选择执行时间">
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
  height: 62px;
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
import dTable from "./components/table/d-table-lyxrm.vue";
// import pagination from "./components/common/pagination";
import { patEmrList } from "@/api/document";
import { getExecuteWithWardcode, handleWebExecuteBatch } from "./api/index";
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
        // pageNum: 20,
        pageNum: 100,
        total: 0,
      },
      startDate: moment().format("YYYY-MM-DD"),
      type: "",
      status: "",
      bedLabel: "",
      test: "",
      itemTypeTem: ["全部"],
      query: {
        wardCode: "",
        itemType: ["全部"], //医嘱类别，输液、雾化
        executeDate: moment().format("YYYY-MM-DD"), //执行日期
        bedLabel: "", //床位号，如果查全部传*"
        repeatIndicator: 9, //医嘱类型，长期传1，临时传0，全部传9
        executeFlag: "全部", //0未执行，2已执行
      },
      isExecutionTime:false,
      form:{
        date:moment().format("YYYY-MM-DD HH:mm:ss"),
      }
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
    itemTypeOnChange(value) {
      if (this.itemTypeTem.length === 2 && this.itemTypeTem.includes('全部')) {
        this.itemTypeTem.shift()
        return
      } else if (this.itemTypeTem.length > 2 && this.itemTypeTem[this.itemTypeTem.length - 1] === '全部') {
        this.itemTypeTem = ['全部']
        return
      } 
      this.onLoad();
    },
    onLoad() {
      if (!this.deptCode) return;
      this.pageLoadng = true;
      this.query.wardCode = this.deptCode;
      this.query.executeDate = this.query.executeDate
        ? moment(this.query.executeDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
      this.query.bedLabel = this.bedLabel ? this.bedLabel : "*";
      this.query.itemType = this.itemTypeTem.length > 0 ? this.itemTypeTem.join(",") : "全部"

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
      this.isExecutionTime=false;
    },
    middleware() {
      let selectedData = this.$refs.plTable.selectedData;
      if (selectedData.length <= 0) return;
      if(['wujing'].includes(this.HOSPITAL_ID)) {
        this.isExecutionTime = true
      }else {
        this.handleExecuteBatch()
      }
    },
    // 批量处理执行单
    handleExecuteBatch() {
      let selectedData = this.$refs.plTable.selectedData,
        data = [];
      this.isExecutionTime = true
      if (selectedData.length <= 0) return;

      selectedData.map((item) => {
        let obj = {
          patientId: item.patientId,
          visitId: item.visitId,
          barcode: item.barCode,
          orderNo: item.orderNo,
          executeNurse: this.empNo, // 执行护士工号
          verifyNurse: this.empNo, // 核对护士工号
        };
        if(['wujing'].includes(this.HOSPITAL_ID)){
          obj.startDate = moment(this.form.date).format("YYYY-MM-DD HH:mm:ss")
        }
        // 相同barcode只需要发送一条记录
        let isHas = data.every(e=>{
          return e.barcode != obj.barcode
        })
        isHas?data.push(obj):''
      });
      handleWebExecuteBatch({ lists: data }).then((res) => {
        this.$message.success(res.data.desc);
        this.onLoad();
      });
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
