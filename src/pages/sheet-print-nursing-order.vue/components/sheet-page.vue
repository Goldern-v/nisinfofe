<template>
  <div class="sheet-contain" id="sheetNursingOrderPrint">
    <div class="body-con">
      <div class="sheetTable-contain">
        <div ref="sheetTableContain" class="iframe">
          <!-- {{sheetModel}} -->
          <sheetTable
            v-for="(item, index) in sheetModel"
            :key="index"
            :data="item"
            :index="index"
            :length="sheetModel.length"
          ></sheetTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.sheetTable-contain
  background #DFDFDF
</style>

<script>
import sheetTable from "@/Page/sheet-nursing-order/components/sheetTable/sheetTable";
import sheetModel, {
  initNursingOrderSheetPage,
  cleanData
} from "@/Page/sheet-nursing-order/sheet.js";
import decode from "@/Page/sheet-nursing-order/components/render/decode.js";
import {
  saveBody,
  showBody,
  showTitle,
  delPage,
  markList
} from "@/api/nursingOrderSheet.js";
import sheetInfo from "@/Page/sheet-nursing-order/components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import $ from "jquery";
import { $params } from "../tool/tool";
import { printDir } from "@/Part/print/control/common-print.js";
import { addCSS } from "@/utils/css";
import { formatSub } from "@/utils/sup";
export default {
  data() {
    return {
      data: {
        bedList: []
      },
      bus: bus(this),
      sheetModel,
      sheetInfo
    };
  },
  computed: {
    filterSheetModel() {
      // 根据页码处理后的页面
      let mapSheetModel = this.sheetModel.map((item, index, arr) => {
        let obj = {
          index,
          data: item,
          length: arr.length
        };
        return obj;
      });

      let resultModel = mapSheetModel.filter(item => {
        let pageIndex = this.sheetInfo.sheetStartPage + item.index;

        return true;
      });
      return resultModel;
    }
  },
  methods: {
    getSheetData() {
      Promise.all([showBody($params.id)]).then(res => {
        console.log("获取护嘱表数据", res);
        let titleData = []; //res[0].data.data
        let bodyData = res[0].data.data;
        let markData = []; //res[2].data.data.list || []
        // this.sheetModel = []
        this.$nextTick(() => {
          // this.sheetModel = sheetModel
          initNursingOrderSheetPage(titleData, bodyData, markData);
        });
      });
    }
  },
  created() {
    // 初始化
    cleanData();
    // this.sheetInfo.selectBlock = {
    //   admissionDate: "2018-12-07 11:36:59",
    //   age: "75岁",
    //   bedLabel: "05",
    //   completeName: null,
    //   completeNo: null,
    //   completeTime: null,
    //   createTime: "2018-12-08 11:10",
    //   creatorName: "邓敏怡",
    //   creatorNo: "6895",
    //   deptCode: "030502",
    //   deptName: "神经内科护理单元",
    //   diagnosis: "高血压性心脏病",
    //   id: 10421,
    //   inpNo: "422764",
    //   patientId: "71547442",
    //   patientName: "王惠仔",
    //   recordCode: "neurology",
    //   recordName: "护理记录单（神经内科）",
    //   recordTitleCoyeType: "no",
    //   recordTitleType: "useItselfIndex",
    //   sex: "男",
    //   status: "0",
    //   visitId: "1",
    //   token: ''
    // };
    this.sheetInfo.model = "print";
    this.getSheetData();
  },
  watch: {},
  destroyed() {},
  components: {
    sheetTable
  }
};
</script>
