<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <!-- <h3>批量执行单</h3> -->
        <div>
          <span class="label" style="margin-left: 0">执行日期:</span>
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择入院起始时间"
            size="small"
            v-model="startDate"
            style="width: 180px"
          ></el-date-picker>
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择终止时间"
            size="small"
            v-model="endDate"
            style="width: 180px"
          ></el-date-picker>
          <!-- <el-date-picker
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择入院起始时间"
            size="small"
            v-model="query.executeDate"
            style="width: 150px"
          ></el-date-picker> -->
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
            style="width: 120px"
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
            v-model="query.itemType"
            placeholder="请选择"
            size="small"
            style="width: 120px"
          >
            <el-option v-for="(v,i) in itemTypes" :key="i" :label="v.label" :value="v.label == '全部' ? '' : v.label"></el-option>
          </el-select>
          <!-- <span class="label">床号:</span>
          <el-input
            size="small"
            style="width: 80px"
            v-model="bedLabel"
          ></el-input> -->
          <span class="label">执行标志:</span>
          <el-select
            v-model="query.executeFlag"
            placeholder="请选择"
            size="small"
            style="width: 120px"
          >
            <el-option label="全部" value="全部"></el-option>
            <el-option label="已执行" :value="2"></el-option>
            <el-option label="未执行" :value="0"></el-option>
          </el-select>
          <el-button size="small" type="primary" @click="search"
            >查询</el-button
          >
          <el-button
            size="small"
            @click="allSelection"
            :disabled="status == '已执行'"
            >全选</el-button
          >
        </div>
      </div>
      <dTable :pageLoadng="pageLoadng" :currentType="query.itemType" ref="plTable"></dTable>

      <el-dialog title="执行时间" :visible.sync="isExecutionTime">
        <el-form :model="form">
          <el-form-item label="执行时间">
            <el-date-picker
              v-model="form.date"
              type="datetime"
              placeholder="选择执行时间"
            >
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
import dTable from "@/Page/implementation-list/components/table/d-table-whfk.vue";
// import pagination from "./components/common/pagination";
import { patEmrList } from "@/api/document";
import { getExecuteWithWardcode, handleWebExecuteBatch } from "@/Page/implementation-list/api/index.js";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import bus from "vue-happy-bus";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageInput: "",
      pageLoadng: false,
      page: {
        pageIndex: 1,
        // pageNum: 20,
        pageNum: 100,
        total: 0,
      },
      startDate:  moment().format("YYYY-MM-DD") + " 00:00:00",
      endDate:
        moment(moment().toDate().getTime() + 86400000).format("YYYY-MM-DD") +
        " 00:00:00",
      type: "",
      status: "",
      bedLabel: "",
      test: "",
      query: {
        wardCode: "",
        itemType: "输液", //医嘱类别，输液、雾化
        executeDate: moment().format("YYYY-MM-DD"), //执行日期
        bedLabel: "", //床位号，如果查全部传*"
        repeatIndicator: 9, //医嘱类型，长期传1，临时传0，全部传9
        executeFlag: "全部", //0未执行，2已执行
      },
      isExecutionTime: false,
      form: {
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      itemTypes: [
        {label: '全部'},
        {label: '输液'},
        {label: '注射'},
        {label: '雾化'},
        {label: '口服'},
        {label: '治疗'},
        {label: '皮试'},
        // {label: '膀胱冲洗'},
        // {label: '气道湿化'},
        {label: '标本'},
        {label: '检查'},
        {label: '手术'},
        {label: '护理'},
        {label: '其他'},
      ]
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
      this.query.startDate = moment(this.startDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.query.endDate = moment(this.endDate).format("YYYY-MM-DD HH:mm:ss");
      this.query.executeDate = this.query.executeDate
        ? moment(this.query.executeDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
      this.query.executeDate = this.query.executeDate
        ? moment(this.query.executeDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
      this.query.bedLabel =this.$route.query.bedLabel ;
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
        this.page.total = Number(res.data.pageCount) * this.page.pageNum;
        this.pageLoadng = false;
      }).catch(e => {
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
      this.handleExecuteBatch();
      this.isExecutionTime = false;
    },
    middleware() {
      let selectedData = this.$refs.plTable.selectedData;
      if (selectedData.length <= 0) return;
      if (["wujing"].includes(this.HOSPITAL_ID)) {
        this.isExecutionTime = true;
      } else {
        this.handleExecuteBatch();
      }
    },
    // 批量处理执行单
    handleExecuteBatch() {
      let selectedData = this.$refs.plTable.selectedData,
        data = [];
      this.isExecutionTime = true;
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
        if (["wujing"].includes(this.HOSPITAL_ID)) {
          obj.startDate = moment(this.form.date).format("YYYY-MM-DD HH:mm:ss");
        }
        // 相同barcode只需要发送一条记录
        let isHas = data.every((e) => {
          return e.barcode != obj.barcode;
        });
        isHas ? data.push(obj) : "";
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
  mounted() {
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
