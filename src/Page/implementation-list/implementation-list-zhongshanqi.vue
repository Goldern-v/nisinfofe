<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <span class="label" style="margin-left: 0">执行日期:</span>
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择入院起始时间"
          size="small"
          v-model="startDate"
          style="width:120px"
        ></el-date-picker>
        <span class="label">长/临:</span>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="repeatIndicator">
            <el-radio class="radio" label>全部</el-radio>
            <el-radio class="radio" label="长嘱">长嘱</el-radio>
            <el-radio class="radio" label="临嘱">临嘱</el-radio>
          </el-radio-group>
        </el-row>
        <span class="label">状态:</span>
        <el-select
          v-model="status"
          placeholder="请选择"
          size="small"
          style="width:150px"
          v-if="type === 0"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in transfusionStatus"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-select
          v-model="status"
          placeholder="请选择"
          size="small"
          style="width:150px"
          v-else
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in allStatus"
            :key="item.id"
          ></el-option>
        </el-select>
        <span class="label">类型:</span>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width:150px;margin-right: 10px;"
        >
          <el-option
            :label="typeItem.name"
            :value="typeItem.value"
            v-for="typeItem in allType"
            :key="typeItem.value"
          ></el-option>
        </el-select>
        <el-button
          size="small"
          @click="onPrintLabel"
          :disabled="!multipleSelection.length"
          >瓶签打印</el-button
        >
        <div style="flex: 1"></div>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入病人姓名进行搜索"
          v-model="patientName"
        ></el-input>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入床号进行搜索"
          v-model="bedLabel"
        ></el-input>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" @click="onPrint">打印</el-button>
      </div>
      <dTable
        :tableData="tableData"
        :currentType="type"
        :pageLoadng="pageLoadng"
      ></dTable>

      <printLabelContent
        :printLabelInfo="printLabelInfo"
        :qrCode="qrCode"
        ref="printCon"
      ></printLabelContent>

      <div class="printable" ref="printable">
        <div class="header-con">
          <h2>执行单</h2>
          <div class="filterItem date">
            <span class="type-label">日期:</span>
            <span>{{ startDate | ymdhm }}</span>
          </div>
        </div>
        <dTablePrint
          :tableData="tableData"
          :currentType="type"
          :pageLoadng="pageLoadng"
        ></dTablePrint>
      </div>

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
  position: absolute;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;

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
.printable {
  position: absolute;
  width: 1200px;
  z-index: -1000;
  .header-con {
    h2 {
      font-size: 24px;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    padding-bottom: 5px;
  }
}
</style>
<script>
import dTable from "./components/table/d-table-zhongshanqi";
import dTablePrint from "./components/table/d-table-zhongshanqi-print";
import pagination from "./components/common/pagination";
import printLabelContent from "./components/print-label-content";
import { patEmrList } from "@/api/document";
import { getExecuteWithWardcode } from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import bus from "vue-happy-bus";
import print from "printing";
import formatter from "./print-formatter";
import printLabel from "@/Page/patientInfo/supComponts/modal/tool/print.js";
var qr = require("qr-image");
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
        total: 0
      },
      startDate: moment().format("YYYY-MM-DD"),
      repeatIndicator: "",
      type: "",
      status: "",
      bedLabel: "",
      patientName: "",
      transfusionStatus: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 0,
          name: "未执行"
        },
        {
          id: 1,
          name: "开始输液"
        },
        {
          id: 2,
          name: "暂停输液"
        },
        {
          id: 3,
          name: "继续输液"
        },
        {
          id: 4,
          name: "已完成"
        }
      ],
      allStatus: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 0,
          name: "未执行"
        },
        {
          id: 4,
          name: "已完成"
        }
      ],
      allType: [
        {
          name: "全部",
          value: ""
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
          name: "治疗（理疗）",
          value: "治疗（理疗）"
        },
        {
          name: "标本",
          value: "标本"
        }
      ],
      multipleSelection: [],
      printLabelInfo: {},
      qrCode: ""
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
        wardCode: this.deptCode, //--护理单元代码 316放射科
        executeDateTime: moment(this.startDate).format("YYYY-MM-DD"), //--预计执行时间
        executeType: this.type, //--类型:注射 ,输液, 口服 ,雾化, 皮试 ,标本, 输血,
        bedLabel: this.bedLabel, //--床号
        patientName: this.patientName, //--患者姓名
        repeatIndicator: this.repeatIndicator, //--医嘱类型:长期 ,临时
        executeStatus: this.status //状态:默认空查询全部  null未执行  1是执行中  2暂停 3 停止~~~~  4已执行
      };
      let children = [];
      getExecuteWithWardcode(obj).then(res => {
        this.tableData = res.data.data.map((item, index, array) => {
          let prevRowId =
            array[index - 1] &&
            array[index - 1].patientId +
              array[index - 1].barcode +
              array[index - 1].executeDateTime;
          let nextRowId =
            array[index + 1] &&
            array[index + 1].patientId +
              array[index + 1].barcode +
              array[index + 1].executeDateTime;
          let currentRowId =
            array[index] &&
            array[index].patientId +
              array[index].barcode +
              array[index].executeDateTime;

          /** 判断是此记录是多条记录 */
          if (currentRowId == prevRowId || currentRowId == nextRowId) {
            if (currentRowId != prevRowId) {
              /** 第一条 */
              item.rowType = 1;
              children.push(item);
              item.children = children;
            } else if (currentRowId != nextRowId) {
              /** 最后条 */
              item.rowType = 3;
              children.push(item);
              children = [];
            } else {
              /** 中间条 */
              item.rowType = 2;
              children.push(item);
            }
          }
          return item;
        });
        // this.page.total = Number(res.data.data.pageCount) * this.page.pageNum;
        this.pageLoadng = false;
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    },
    async onPrint() {
      this.$nextTick(async () => {
        await print(this.$refs.printable, {
          beforePrint: formatter,
          injectGlobalCss: true,
          scanStyles: false,
          css: `
          .el-table {
            border: none !important;
          }
          .el-table__header-wrapper,.el-table__body-wrapper {
            margin: 0 !important;
          }
          .el-table__body-wrapper {
            border-bottom: 1px solid #000 !important;
          }
          table {
            width: 100%;
          }
          th {
            border: 1px solid #000 !important;
            border-bottom: none !important;
          }
          td {
            border: 1px solid #000 !important;
          }
          .cell {
            padding: 0 3px !important;
          }
          @page {
            margin: 10mm;
          }
        `
        });
      });
    },
    onPrintLabel() {
      this.printLabelInfo = this.multipleSelection[0];
      let qr_png_value = this.printLabelInfo.barcode || this.printLabelInfo.barCode;
      var qr_png = qr.imageSync(qr_png_value, { type: "png" });
      function arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return "data:image/png;base64," + window.btoa(binary);
      }
      let base64 = arrayBufferToBase64(qr_png);
      this.qrCode = base64;
      this.$nextTick(() => {
        printLabel(this.$refs.printCon.$el);
      });
    }
  },
  created() {
    this.onLoad();
    this.bus.$on("loadImplementationList", () => {
      this.onLoad();
    });
    this.bus.$on("updateMultipleSelection", multipleSelection => {
      this.multipleSelection = multipleSelection;
    });
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
    type(newVal, oldVal) {
      if (oldVal == "输液") {
        this.status = "";
      }
      this.search();
    },
    status() {
      this.search();
    }
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD") : "";
    }
  },
  components: {
    dTable,
    dTablePrint,
    pagination,
    printLabelContent
  }
};
</script>
