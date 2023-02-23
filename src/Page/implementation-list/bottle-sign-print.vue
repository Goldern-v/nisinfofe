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
            :style="HOSPITAL_ID == 'ytll' ? 'width:170px' : 'width:160px'"
          ></el-date-picker>
          <span class="label">执行结束时间</span>
          <el-date-picker
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择终止时间"
            size="small"
            v-model="endDate"
            :style="HOSPITAL_ID == 'ytll' ? 'width:170px' : 'width:160px'"
          ></el-date-picker>
          <span class="label">医嘱类型:</span>
          <el-select
            v-model="query.repeatIndicator"
            placeholder="请选择"
            size="small"
            style="width: 80px"
          >
            <el-option label="全部" :value="9"></el-option>
            <el-option label="长期" :value="1"></el-option>
            <el-option label="临时" :value="0"></el-option>
          </el-select>
          <span class="label">医嘱分类:</span>
          <el-select
            v-if="showMultiItemType"
            v-model="multiItemType"
            placeholder="请选择"
            size="small"
            style="width: 212px"
            multiple
           @change="handleChangeType"
          >
            <el-option
              v-for="(optionItem, optionIndex) in typeOptions"
              :key="optionIndex"
              :label="optionItem.label"
              :value="optionItem.value || optionItem.label"
            ></el-option>
          </el-select>
          <el-select
            v-model="query.itemType"
            placeholder="请选择"
            size="small"
            style="width: 80px"
            v-else
          >
            <el-option
              v-for="(optionItem, optionIndex) in typeOptions"
              :key="optionIndex"
              :label="optionItem.label"
              :value="optionItem.value || optionItem.label"
            ></el-option>
          </el-select>
          <span class="label" v-if="showAdministration">途径:</span>
          <el-autocomplete
            v-if="showAdministration"
            size="small"
            style="width: 80px"
            v-model="query.administration"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="true"
            @select="() => {}"
          />
          <span class="label">床号:</span>
          <el-select
            v-if="multiBed"
            v-model="bedLabels"
            placeholder="请选择"
            size="small"
            :style="HOSPITAL_ID == 'ytll' ? 'width:220px' : 'width:130px'"
            multiple
            @change="search"
          >
            <el-option
              v-for="(v, i) in bedList"
              :key="i"
              :label="v"
              :value="v"
            />
          </el-select>
          <el-input
            v-else
            size="small"
            style="width: 80px"
            v-model="bedLabel"
          ></el-input>
          <span class="label" v-if="hasNewPrintHos || hasSilentPrintHos"
            >瓶签大小:</span
          >
          <el-select
            v-if="hasNewPrintHos || hasSilentPrintHos"
            v-model="newModalSize"
            placeholder="请选择"
            size="small"
            style="width: 80px; margin-right: 10px"
          >
            <el-option
              v-for="v in sizeList"
              :key="v"
              :label="v"
              :value="v"
            ></el-option>
          </el-select>
          <span class="label">重打标志:</span>
          <el-select
            v-model="query.reprintFlag"
            placeholder="请选择"
            size="small"
            style="width: 80px"
          >
            <el-option
              v-for="(optionItem, optionIndex) in thumpOptions"
              :key="optionIndex"
              :label="optionItem.label"
              :value="optionItem.value"
            ></el-option>
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
          <template v-if="['whfk', 'whsl','zhzxy'].includes(HOSPITAL_ID)">
            <el-button size="small" @click="syncData">同步医嘱</el-button>
            <el-button size="small" @click="createImplement"
              >生成执行</el-button
            >
            <el-button
              size="small"
              @click="onPrint"
              :disabled="status == '已执行'"
              >打印</el-button
            >
            <el-button
              size="small"
              @click="onPrintAll"
              :disabled="status == '已执行'"
              >打印全部</el-button
            >
          </template>
          <template v-else>
            <el-button
              size="small"
              @click="onPrint"
              :disabled="status == '已执行'"
              >打印{{ showPrintAll && HOSPITAL_ID !== 'zhzxy' ? "此页" : "" }}</el-button
            >
            <el-button
              size="small"
              v-if="showPrintAll"
              @click="onPrintAll"
              :disabled="status == '已执行'"
              >打印全部</el-button
            >
            <el-button size="small" @click="createImplement"
              >生成执行</el-button
            >
            <el-button v-if="['sdlj', 'lyxrm', 'ytll', '925', 'stmz','qhwy'].includes(HOSPITAL_ID)"
                       size="small"
                       @click="syncData">同步医嘱
            </el-button>
            <el-button v-else
                       size="small"
                       @click="search">同步医嘱
            </el-button>
          </template>
        </div>
      </div>
      <dTable :pageLoadng="pageLoading" ref="plTable"></dTable>
      <modal v-if="isShowModal" :src="src" @changeModal="changeModal" />
      <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          :disableSize="disableSize"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>

      <div class="new-print-box" id="new-print-box" ref="new_print_modal">
        <div
          :class="[
            {
              'break-page':bottleCardIndex % 2 == 1 &&
                newModalSize == '3*7',
              'size-75': newModalSize === '7*5'
            },
          ]"
          :style="newModalSize == '3*7'&&'margin-bottom:1cm'"
          v-for="(itemBottleCard, bottleCardIndex) in printObj"
          :key="bottleCardIndex"
        >
          <component
            :is="newPrintCom"
            :newModalSize="newModalSize"
            :itemObj="itemBottleCard"
          />
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
  min-height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  h3 {
    font-size: 18px;
    line-height: 20px;
  }

  .label {
    font-size: 13px;
    margin-left: 8px;
    // margin-right: 5px;
  }

  >>> .el-tag {
    height: 20px;
    line-height: 20px;
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
  background-color: rgba(0, 0, 0, 0.5);
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

.new-print-box {
  // overflow: hidden;
  .break-page {
    page-break-after: always;
  }
  .size-75 {
    width: 69mm;
    height: 50mm;
    position: relative;
  }
}

// @media print {
//   .new-print-box--small {
//     transform: scale(0.5);
//     transform-origin: 0 0 0;
//     overflow: hidden;
//   }
// }
</style>
<script>
import modal from "./modal/modal";
import dTable from "./components/table/bottle-sign-print-table";
import pagination from "./components/common/pagination";
import NewPrintModal from "./components/common/newPrintModal";
import NewPrintModalSdlj from "./components/common/newPrintModalSdlj";
import NewPrintModalFsxt from "./components/common/newPrintModalFsxt";
import NewPrintModalLyxrm from "./components/common/newPrintModalLyxrm";
import NewPrintModalWhfk from "./components/common/newPrintModalWhfk";
import NewPrintModalWujing from "./components/common/newPrintModalWujing";
import NewPrintModalYtll from "./components/common/newPrintModalYtll";
import NewPrintModalZhzxy from "./components/common/newPrintModalZhzxy";

import printing from "printing";
import {
  getPrintExecuteWithWardcode,
  handleWebGetPrintResult,
  webExecutePrint,
  getPrintListContent,
  webSplitOrder,
  getPrintListContent2,
  getPatientOrder,
  getSDLJPatientOrder,
  syncNurseOrdersByWardCode,
  getBedLabelByWardCode,
  webGetOrdersExecutePrintOld,
} from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import { hisMatch } from "@/utils/tool";
import getLodop from "@/assets/js/LodopFuncs";
const initStartDate = () => {
  if (
    ["whfk", "fsxt", "lyxrm", "whhk", "ytll", "zhzxy", "925","whsl", 'stmz','qhwy'].includes(
      process.env.HOSPITAL_ID
    )
  )
    return moment().format("YYYY-MM-DD") + " 00:00:00";
  return moment().format("YYYY-MM-DD") + " 07:00:00";
};
const initEndDate = () => {
  if (["whfk", "ytll"].includes(process.env.HOSPITAL_ID))
    return (
      moment(moment().toDate().getTime() + 86400000).format("YYYY-MM-DD") +
      " 00:00:00"
    );
  if (["fsxt"].includes(process.env.HOSPITAL_ID))
    return (
      moment(moment().toDate().getTime()).format("YYYY-MM-DD") + " 23:59:00"
    );
  if (["lyxrm", "whhk", "zhzxy", "925","whsl", 'stmz','qhwy'].includes(process.env.HOSPITAL_ID))
    return (
      moment(moment().toDate().getTime()).format("YYYY-MM-DD") + " 23:59:59"
    );
  return (
    moment(moment().toDate().getTime() + 86400000).format("YYYY-MM-DD") +
    " 07:00:00"
  );
};
export default {
  mixins: [common],
  data() {
    return {
      src: "",
      pageInput: "",
      pageLoading: false,
      // 是否能同步
      ifCanSync: true,
      page: {
        pageIndex: 1,
        // pageNum: 20,
        pageNum: this.HOSPITAL_ID == "lyxrm" ? 100 : 40,
        total: 0,
      },
      // startDate: moment().format("YYYY-MM-DD"),
      startDate: initStartDate(),
      endDate: initEndDate(),

      repeatIndicator: "",
      type: "",
      status: "",
      bedLabel: "",
      /**途径 */
      administration: "",
      pathList: [
        {
          value: "静脉点滴",
        },
        {
          value: "皮下注射",
        },
        {
          value: "静脉注射",
        },
        {
          value: "肌肉注射",
        },
      ],
      showPintModal: false, //是否显示打印弹框
      showProgress: false,
      isShowModal: false,
      query: {
        wardCode: "",
        itemType: ["whfk", "lyxrm", "whhk", "zhzxy", "925", 'stmz','qhwy'].includes(
          this.HOSPITAL_ID
        )
          ? "全部"
          : "输液", //医嘱类别，输液、雾化
        executeDate: moment().format("YYYY-MM-DD"), //执行日期
        bedLabel: "", //床位号，如果查全部传*"
        repeatIndicator: ["whfk"].includes(this.HOSPITAL_ID) ? 0 : 9,
        //医嘱类型，长期传1，临时传0，全部传9
        reprintFlag: ["lyxrm", "whhk", "zhzxy", "925", 'stmz','qhwy'].includes(
          this.HOSPITAL_ID
        )
          ? 9
          : 0, //是否重打，1=是，0=否
        administration: "",
      },
      multiItemType: ["输液"],
      // 是否医嘱分类使用多选
      showMultiItemType: ["lyxrm", "whhk", "zhzxy", "925","whsl","ytll", 'stmz','qhwy'].includes(
        this.HOSPITAL_ID
      ),
      selectedData: [], //选中打印执行单条数
      printNum: 0, //已经打印执行单的条数
      Uuid: "", //打印流水号
      printStatusTimer: null,
      printStatusReq: null,
      printStatusMsg: "",
      showCancelPrint: false,
      pagedTable: [],
      printObj: [],
      newModalSize: "6*8",
      hasNewPrintHos: [
        "sdlj",
        "gdtj",
        "qhwy",
        "fsxt",
        "whfk",
        "whhk",
        "lyxrm",
        "wujing",
        "ytll",
        "zhzxy",
        "925",
        "lyyz",
        "whsl",
        'stmz',
      ].includes(this.HOSPITAL_ID),
      // 静默打印
      hasSilentPrintHos: false,
      // hasSilentPrintHos: ["whsl"].includes(this.HOSPITAL_ID),
      typeOptions: hisMatch({
        map: {
          whfk: [
            { label: "全部" },
            { label: "输液" },
            { label: "注射" },
            { label: "皮试" },
            { label: "雾化" },
            { label: "标本" },
            { label: "口服" },
            { label: "治疗" },
          ],
          "lyxrm,whhk,zhzxy,925,stmz,qhwy": [
            { label: "全部" },
            { label: "输液" },
            { label: "注射" },
            { label: "口服" },
            { label: "雾化" },
            { label: "皮试" },
            { label: "治疗" },
            { label: "泵入" },
            { label: "标本" },
            { label: "非摆药机" },
            { label: "其他" },
          ],
          ytll: [
            { label: "全部" },
            { label: "输液" },
            { label: "注射" },
            { label: "雾化" },
            { label: "皮试" },
            { label: "膀胱冲洗" },
            { label: "气道湿化" },
             { label: "口服" },
            { label: "治疗" },
            { label: "标本" },
            { label: "其他" },
          ],
          whsl: [
            { label: "全部" },
            { label: "输液" },
            { label: "注射" },
            { label: "口服" },
            { label: "雾化" },
            { label: "皮试" },
            { label: "治疗" },
            { label: "理疗" },
            { label: "护理" },
            { label: "外用" },
            { label: "化验" },
            { label: "其他" },
          ],
          default: [
            { label: "输液" },
            { label: "注射" },
            { label: "口服" },
            { label: "雾化" },
            { label: "皮试" },
            { label: "治疗" },
            { label: "理疗" },
            { label: "护理" },
            { label: "外用" },
            { label: "化验" },
            { label: "其他" },
          ],
        },
      }),
      thumpOptions: hisMatch({
        map: {
          "lyxrm,whhk,zhzxy,925,stmz,qhwy": [
            { label: "全部", value: 9 },
            { label: "已打印", value: 1 },
            { label: "未打印", value: 0 },
          ],
          'fsxt,whsl': [
            { label: "全部", value: 9 },
            { label: "是", value: 1 },
            { label: "否", value: 0 },
          ],
          default: [
            { label: "是", value: 1 },
            { label: "否", value: 0 },
          ],
        },
      }),
      tableData: "",
      bedList: [],
      bedLabels: [],
      // 是否显示途径
      showAdministration: ["sdlj", "lyxrm", "ytll", "zhzxy", "925", 'stmz','qhwy'].includes(
        this.HOSPITAL_ID
      ),
      // 能否打印全部
      showPrintAll: ["sdlj", "gdtj", "fsxt", "ytll"].includes(this.HOSPITAL_ID),
    };
  },
  mounted() {
    this.newModalSize = this.sizeList[0];
    if (this.multiBed) {
      this.getBedList();
    }
  },
  beforeDestroy() {
    this.cleanPrintStatusRoundTime();
  },
  methods: {
    handleChangeType(value) {
      if (this.multiItemType.length === 2 && this.multiItemType.includes('全部')) {
        this.multiItemType.shift()
      } else if (this.multiItemType.length > 2 && this.multiItemType[this.multiItemType.length - 1] === '全部') {
        this.multiItemType = ['全部']
      }
    },
    createImplement() {
      if (!this.deptCode) return;
      webSplitOrder({ wardCode: this.deptCode }).then((res) => {
        if (res.data && res.data.code)
          return this.$message.success(res.data.desc);
        this.$message.error(res.data.desc);
      });
    },
    changeModal(flag) {
      this.isShowModal = flag;
    },
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
      this.pageDate(true);
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      if (!this.hasNewPrintHos && !this.hasSilentPrintHos) return this.onLoad();
      if (
        this.$refs.plTable.$children &&
        this.$refs.plTable.$children[0] &&
        this.$refs.plTable.$children[0].reloadData
      ) {
        this.$refs.plTable.$children[0].reloadData(
          this.pagedTable[newPage - 1] || []
        );
      }
    },
    syncData() {
      if (!this.deptCode || !this.ifCanSync) return;
      this.ifCanSync = false;
      this.pageLoading = true;
      let getOrder;
      if (["sdlj"].includes(this.HOSPITAL_ID)) {
        getOrder = getSDLJPatientOrder;
      } else if (
        ["lyxrm", "whfk", "ytll", "whhk", "zhzxy", "925", "whsl","qhwy"].includes(
          this.HOSPITAL_ID
        )
      ) {
        getOrder = syncNurseOrdersByWardCode;
      } else getOrder = getPatientOrder;
      this.query.wardCode = this.deptCode;
      this.query.startDate = moment(this.startDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.query.endDate = moment(this.endDate).format("YYYY-MM-DD HH:mm:ss");
      this.query.executeDate = this.query.executeDate
        ? moment(this.query.executeDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
      this.query.bedLabel = this.bedLabel ? this.bedLabel : "*";
      getOrder(this.query).then(
        (res) => {
          this.ifCanSync = true;
          this.search();
        },
        (err) => {
          this.ifCanSync = true;
          this.pageLoading = false;
        }
      );
    },
    onLoad() {
      if (!this.deptCode) return;
      this.pageLoading = true;
      this.query.wardCode = this.deptCode;
      this.query.startDate = moment(this.startDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.query.endDate = moment(this.endDate).format("YYYY-MM-DD HH:mm:ss");
      this.query.executeDate = this.query.executeDate
        ? moment(this.query.executeDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");
      if (this.multiBed) {
        this.query.bedLabel = this.bedLabels.join(",") || "*";
      } else {
        this.query.bedLabel = this.bedLabel ? this.bedLabel : "*";
      }
      if (this.showMultiItemType) {
        this.query.itemType = this.multiItemType.join(",");
        // this.query.administration = this.administration
      } else {
        this.query.itemType = this.query.itemType;
      }
      let api =
        this.HOSPITAL_ID === "whsl"
          ? webGetOrdersExecutePrintOld
          : getPrintExecuteWithWardcode;
      api(this.query).then((res) => {
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
        this.tableData = tableData;
        this.pageDate();
        this.pageLoading = false;
      });
    },
    search() {
      this.page.pageIndex = 1;
      // 查看打印效果可以注释掉此行
      // this.printObj = []
      this.onLoad();
    },
    // 打印
    async onPrint() {
      this.selectedData = this.$refs.plTable.selectedData;
      if ((this.selectedData || []).length <= 0)
        return this.$message("未选择勾选打印条目");
      if (this.hasNewPrintHos) return await this.newOnPrint();
      if (this.hasSilentPrintHos) return this.onSilentPrint();
      this.isShowModal = false;
      this.src = ``;
      this.printNum = 0;

      this.query.executeDate = this.query.executeDate
        ? moment(this.query.executeDate).format("YYYY-MM-DD")
        : "";

      let url = "";
      this.selectedData.map((item, index) => {
        let targetIndex = this.selectedData.findIndex(
          (e) => e.orderNo == item.orderNo
        );
        if (targetIndex == index) {
          console.log(`${item.patientId}|${item.visitId}|${item.orderNo};`);
          url += `${item.patientId}|${item.visitId}|${item.orderNo};`;
        }
      });
      this.Uuid = new Date().getTime() + parseInt(Math.random() * 10000);
      this.showPintModal = true;
      webExecutePrint({
        content: `${this.Uuid};${this.empNo};${this.query.executeDate};${url}`,
        uuid: this.Uuid,
      }).then((res) => {
        this.src = `/crNursing/asset/${res.data.data.printExecuteUrl}`;
        setTimeout(() => {
          this.showPintModal = false;
          this.isShowModal = true;
        }, 4000); // 武警上传有延迟，后续优化了的话可以把定时器删掉
      });
    },
    async newOnPrint() {
      await this.getPrintData();
      document.getElementById("new-print-box").style.display = "block";
      this.$nextTick(() => {
        printing(this.$refs.new_print_modal, {
          injectGlobalCss: true,
          scanStyles: false,
          // margin: 0 0;
          css: `
            @page{
              ${this.printM}
            }
            body{
              position: relative;
            }
            .new-print-box {
              ${this.printScaleText}
            }
            .break-page {
              page-break-after: always;
            }
          `,
        })
          .then(() => {
            document.getElementById("new-print-box").style.display = "none";
            this.search();
          })
          .catch((e) => {});
      });
    },
    // 打印全部
    async onPrintAll() {
      this.selectedData = this.$_.flattenDeep(this.pagedTable);
      await this.newOnPrint();
    },
    // 打印当前页
    async currentPagePrint() {
      console.log(this.pagedTable[this.page.pageIndex-1])
      this.selectedData = this.$_.flattenDeep(this.pagedTable[this.page.pageIndex-1]);
      await this.newOnPrint();
    },
    cleanPrintStatusRoundTime() {
      if (this.printStatusTimer) {
        clearTimeout(this.printStatusTimer);
      }

      if (this.printStatusReq) {
        console.log(this.printStatusReq.close);
        this.printStatusReq.close && this.printStatusReq.close();
      }
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
    querySearch(queryString, cb) {
      let list = [{ value: "膀胱冲洗" }, { value: "气滴" }];
      let pathList = ["ytll"].includes(this.HOSPITAL_ID) ? list : this.pathList;
      var results = queryString
        ? pathList.filter((v) => v.value.indexOf(queryString) > -1)
        : pathList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    pageDate(isPageNum = false) {
      if (this.hasNewPrintHos || this.hasSilentPrintHos) {
        let pageIndex = 0;
        let pageNum = 0;
        let pagedTable = [];
        let pageTotal = 0;
        // 前端分页处理,卑微前端找不到后端配合出接口,后续如果有出可以优化下
        pageTotal = this.tableData.reduce(
          (total, currentItem, currentIndex) => {
            var flag =
              !this.disableSize && !isPageNum
                ? pageIndex < this.tableData.length
                : pageIndex < this.page.pageNum;
            if (flag) {
              // 不超过40条时纳入本页
              pageIndex++; // 自增防止死循环
              pagedTable[pageNum] = pagedTable[pageNum] || []; // 对当前页的数据进行数组初始化
              pagedTable[pageNum].push(currentItem); // 将当前项放入本页
              // 这是对同组药品进行归纳(判断条码号),防止被截断,也是导致条目数可能错乱的主要原因
            } else if (
              currentItem.barcode ===
              pagedTable[pageNum][pagedTable[pageNum].length - 1].barcode
            ) {
              pagedTable[pageNum] = pagedTable[pageNum] || [];
              pagedTable[pageNum].push(currentItem);
            } else {
              pageIndex = 0;
              pageNum++;
              pagedTable[pageNum] = pagedTable[pageNum] || [];
              pagedTable[pageNum].push(currentItem);
            }
            // 计算总条目数(判断barcode是否是第一次出现)
            return this.tableData.findIndex(
              (item) =>
                `${item.barcode}_${item.executeDateTime}` ===
                `${currentItem.barcode}_${currentItem.executeDateTime}`
            ) === currentIndex
              ? ++total
              : total;
          },
          0
        );
        pageTotal = this.page.pageNum * pagedTable.length;
        this.pagedTable = pagedTable;
        // 设置表格数据
        if (
          this.$refs.plTable.$children &&
          this.$refs.plTable.$children[0] &&
          this.$refs.plTable.$children[0].reloadData
        ) {
          this.$refs.plTable.$children[0].reloadData(this.pagedTable[0] || []); // 默认取第一页的数据
        }
        // this.page.total = Number(res.data.data.pageCount) * this.page.pageNum; // 原计算总条数的方式
        this.$set(this.page, "total", pageTotal);
        if (!this.disableSize && !isPageNum) {
          this.$set(this.page, "pageNum", this.tableData.length);
        }
      } else {
        this.$set(this.page, "pageNum", this.tableData.length);
        this.$set(this.page, "total", this.tableData.length);
        if (
          this.$refs.plTable.$children &&
          this.$refs.plTable.$children[0] &&
          this.$refs.plTable.$children[0].reloadData
        ) {
          this.$refs.plTable.$children[0].reloadData(this.tableData); // 默认取第一页的数据
        }
      }
    },
    /**获取当前住院患者 */
    async getBedList() {
      try {
        const res = await getBedLabelByWardCode(this.deptCode);
        const { data } = res.data;
        this.bedLabels = [];
        this.bedList = data || [];
      } catch (error) {}
    },
    // 获取打印数据
    async getPrintData() {
      let barCodeList = this.$_.uniqBy(
        this.selectedData.map((item) => item.barcode)
      );
      if (
        ["lyxrm", "whhk", "zhzxy", "925", "lyyz","qhwy"].includes(this.HOSPITAL_ID)
      ) {
        // 该条执行单是一组多条的 或者该执行单是已完成的隐藏
        barCodeList = this.selectedData.reduce((per, item, index) => {
          return item.rowType <= 1 || !item.rowType
            ? per.concat(item.barcode)
            : per;
        }, []);
      }
      // let barcode = this.selectedData.map(item=>item.barcode).join('|')
      let printObj = {};
      let res = "";
      if (
        [
          "sdlj",
          "gdtj",
          "qhwy",
          "fsxt",
          "lyxrm",
          "whfk",
          "ytll",
          "whhk",
          "zhzxy",
          "925",
          "whsl",
          'stmz',
          'wujing'
        ].includes(this.HOSPITAL_ID)
      ) {
        res = await getPrintListContent2({ barcodeList: barCodeList });
      } else {
        res = await getPrintListContent({ barCode: barCodeList.join("|") });
      }
      // 当超过5条药品，另起新瓶签
      if (!!this.printPagingNo) {
        let curBarCode = "";
        let curIndex = 0;

        res.data.data.map((item) => {
          if (curBarCode != item.barCode) {
            curIndex = 0;
          }
          let key =
            curIndex == 0 ? item.barCode : `${item.barCode}_${curIndex}`;
          curBarCode = item.barCode;
          printObj[key] = printObj[key] || [];
          if (printObj[key].length < this.printPagingNo) {
            printObj[key].push(item);
            return;
          }
          curIndex += 1;
          printObj[`${item.barCode}_${curIndex}`] = [item];
        });
      } else {
        res.data.data.map((item) => {
          printObj[item.barCode] = printObj[item.barCode] || [];
          printObj[item.barCode].push(item);
        });
      }
      let sortArr = !!this.printPagingNo ? Object.values(printObj) : [];
      if (!this.printPagingNo) {
        barCodeList.map((item) => {
          sortArr.push(printObj[item]);
        });
      }
      this.printObj = sortArr;
    },
    // 静默打印
    async onSilentPrint() {
      await this.getPrintData();
      document.getElementById("new-print-box").style.display = "block";
      this.$nextTick(() => {
        const LODOP = getLodop();
        const cssblock = this.getCssBlock();
        if (LODOP) {
          var strBodyStyle = `<style>
          @page{
            ${this.printM}
          }
          body{
            ${this.printScaleText}
          }
          .break-page {
            page-break-after: always;
          }
          ${cssblock}
          </style>`; //设置打印样式
          var strFormHtml =
            strBodyStyle +
            "<body>" +
            document.getElementById("new-print-box").innerHTML +
            "</body>"; //获取打印内容
          LODOP.PRINT_INIT(""); //初始化
          // 指定打印机
          this.specifyPrinter(LODOP);
          const [h, w] = this.newModalSize.split("*");
          LODOP.SET_PRINT_PAGESIZE(1, w * 100, h * 100, "");
          // LODOP.SET_PRINT_PAGESIZE(0, 0, 0, "A4"); //设置横向
          // LODOP.SET_PRINT_PAGESIZE(3, 0, 0, "CreateCustomPage"); //设置横向
          LODOP.ADD_PRINT_HTM("0%", "0%", "100%", "100%", strFormHtml); //设置打印内容
          LODOP.SET_PREVIEW_WINDOW(2, 0, 0, 800, 600, ""); //设置预览窗口模式和大小
          LODOP.PREVIEW();
          // 直接打印
          // LODOP.PRINT();
        }
        document.getElementById("new-print-box").style.display = "none";
        this.onLoad();
      });
      // let codeList = this.$_.uniqBy(
      //   this.selectedData.map((item) => `${item.patientId}|${item.visitId}|${item.orderNo}`)
      // );
      // this.src = ``;

      // const date = this.startDate
      //   ? moment(this.startDate).format("YYYY-MM-DD")
      //   : "";

      // let params = `${new Date().getTime() + parseInt(Math.random() * 10000)};${this.empNo};${date};${this.newModalSize.split('*').reverse().join('x')};${codeList.join(';')}`;
      // console.log('test-params', params)
      // let a = document.createElement('a')
      // a.href = `openPrintExe://${params}`
      // a.click()
    },
    // 获取打印区域的样式
    getCssBlock() {
      const cssBlock = document.styleSheets;
      const styleData = [...cssBlock].reverse().find(({ cssRules }) => {
        return [...cssRules].find((rule) => {
          // 选择器需要是打印组件的根选择器
          return rule.selectorText.includes(".new-print-modal");
        });
      });
      return styleData.ownerNode.innerText;
    },
    /**
     * 指定打印机
     */
    specifyPrinter(LODOP) {
      // LODOP.SET_PRINTER_INDEX("Microsoft XPS Document Writer")
      const list = {
        'whsl-6*8': 'BTP-2200E(U) 1'
      }
      let item = list[`${this.HOSPITAL_ID}-${this.newModalSize}`]
      if (this.isExistPrinter(LODOP, item)) {
        // 按序号或名称指定打印机，选定后允许手工重选；
        LODOP.SET_PRINTER_INDEXA(item)
      }
    },
    /**是否存在打印机 */
    isExistPrinter(LODOP, name) {
      if (!name) return false
      let counter = LODOP.GET_PRINTER_COUNT(); // 获取打印机个数
      for (let i = 0; i < counter; i++) {
        if (LODOP.GET_PRINTER_NAME(i) === name) return true
      }
      return false
    },
  },
  created() {
    this.onLoad();
  },
  computed: {
    newPrintCom() {
      switch (this.HOSPITAL_ID) {
        case "sdlj":
          return "NewPrintModalSdlj";
        case "fsxt":
        case "gdtj":
          return "NewPrintModalFsxt";
        case "lyxrm":
        case "stmz":
          case "qhwy":
        // case "zhzxy":
        case "925":
          return "NewPrintModalLyxrm";
        case "whhk":
        case "whfk":
        case "whsl":
          return "NewPrintModalWhfk";
        case "wujing":
          return "NewPrintModalWujing";
        case "ytll":
          return "NewPrintModalYtll";
        case "zhzxy":
          return "NewPrintModalZhzxy";
        default:
          return "NewPrintModal";
      }
    },
    // 瓶签大小列表
    sizeList() {
      switch (this.HOSPITAL_ID) {
        case "lyxrm":
        case "whhk":
          case "qhwy":
        case "925":
        case "stmz":
          return ["70*80", "3*7"];
        case "zhzxy":
          return ["7*7", "2*5", '7*5'];
        // case 'whsl':
        //   return ["7*8", "3*5"];
        case "wujing":
          return ["5*8", "3*5"];
        case "ytll":
          return ["7*7"];
        case "whfk":
          return ["6*8", "3.5*5"];
        case "whsl":
          return ["3*5", "6*8"];
        default:
          return ["6*8","3*5"];
      }
    },
    // 打印缩放的尺寸
    printScaleText() {
      // if ((this.HOSPITAL_ID === "925"||this.HOSPITAL_ID === "lyxrm") && this.newModalSize === "70*80"){
      //   return "transform: scale(0.8);transform-origin: 0 0 0;";
      // } else if ((this.HOSPITAL_ID === "gdtj") && this.newModalSize === "6*8"){
      //   // return "transform: scale(0.8);transform-origin: 0 0 0;";
      // }
      if (
        ["70*80", "6*8", "5*8", "7*7", '7*5'].includes(this.newModalSize) ||
        ["whfk"].includes(this.HOSPITAL_ID)
      ){
        return "";
      }
      return 'zoom: .5;position: absolute;'
      return "transform: scale(0.5);transform-origin: 0 0 0;";
    },
    printM() {
      if (this.newModalSize == "3*7") {
        return "margin: 0 1mm 0 0;";
      }
      if (this.newModalSize == "5*8" && ["wujing"].includes(this.HOSPITAL_ID)) {
        return "margin: 0 0 0 15mm;";
      }
     if (this.newModalSize === '3*5' && '925' === this.HOSPITAL_ID)
      return 'margin: 10mm 0 0 5mm;'
      if (this.newModalSize == "7*7" && ["ytll"].includes(this.HOSPITAL_ID)) {
        return "margin: 0 0 0 3mm;";
      }
      return "margin: 0 0;";
    },
    disableSize() {
      return !["wujing"].includes(this.HOSPITAL_ID);
    },
    /**床号多选 */
    multiBed() {
      return ["lyxrm", "zhzxy", "925", "ytll", 'stmz','whsl','qhwy'].includes(this.HOSPITAL_ID);
    },
    // 瓶签是否分页 超过多少条开始分
    printPagingNo() {
      return hisMatch({
        map: {
          'wujing': 5,
          'zhzxy': 4,
          other: 0
        }
      })
    }
  },
  watch: {
    deptCode() {
      if (this.multiBed) {
        this.getBedList().then((res) => {
          this.search();
        });
        return;
      }
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
    },
  },
  components: {
    dTable,
    modal,
    pagination,
    NewPrintModal,
    NewPrintModalSdlj,
    NewPrintModalFsxt,
    NewPrintModalLyxrm,
    NewPrintModalWhfk,
    NewPrintModalWujing,
    NewPrintModalYtll,
    NewPrintModalZhzxy,
  },
};
</script>
