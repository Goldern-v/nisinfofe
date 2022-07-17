<template>
  <div class="containter" v-loading="tableLoading" ref="printable">
    <div class="header-con">
      <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
      <div class="title">{{["liaocheng","guizhou",'huadu','foshanrenyi'].includes(HOSPITAL_ID) ?"护理计划":"护理诊断计划"}}</div>
      <div class="info-con" flex="main:justify">
        <span>
          姓名：
          <div class="bottom-line" style="min-width: 60px">{{ patientInfo.name }}</div>
        </span>
        <span>
          性别：
          <div class="bottom-line" style="min-width: 40px">{{ patientInfo.sex }}</div>
        </span>
        <span>
          年龄：
          <div class="bottom-line" style="min-width: 40px">{{ patientInfo.age }}</div>
        </span>
        <span>
          病区：
          <div class="bottom-line" style="min-width: 120px">{{ patientInfo[['guizhou'].includes(HOSPITAL_ID) ? 'wardName' : 'deptName'] }}</div>
        </span>
        <span>
          床号：
          <div class="bottom-line" style="min-width: 50px">{{ patientInfo.bedLabel }}</div>
        </span>
        <span>
          {{['huadu'].includes(HOSPITAL_ID)?'住院号：':'住院号/ID号：'}}
          <div class="bottom-line" style="min-width: 60px">{{ ['huadu'].includes(HOSPITAL_ID)?patientInfo.patientId:patientInfo.inpNo }}</div>
        </span>
        <span>
          入院日期：
          {{ patientInfo.admissionDate }}
        </span>
      </div>
      <div v-if="HOSPITAL_ID == 'guizhou'" class="info-con" flex="main:justify">
        <span>
          诊断：{{ patientInfo.diagnosis}}
        </span>
      </div>
    </div>
    <component :is="tableComplate" :tableData="tableData"></component>
    <!-- <DTable :tableData="tableData"></DTable> -->
  </div>
</template>

<script>
import DTable from "./d-table";
import DTableHD from "./d-table-HD";
import DTableGZ from "./d-table-GZ";
import DTableFSSY from "./d-table-FSSY";
import { nursingDiagsPatient } from "../../api/index";
import { model } from "../../diagnosisViewModel";
import bus from "vue-happy-bus";
import hospitalEval from '@/store/module/hospitalEval';
export default {
  data() {
    return {
      model,
      tableData: [],
      tableLoading: false,
      bus: bus(this)
    };
  },
  computed: {
    patientInfo() {
      return this.$route.query;
    },
    tableComplate(){
      let ID_Component = {
        "huadu":DTableHD,
        "guizhou":DTableGZ,
        "foshanrenyi":DTableFSSY,
        default:DTable
      }
      return ID_Component[this.HOSPITAL_ID]||ID_Component.default
    }
  },
  methods: {
    getData() {
      let obj = {
        patientId: this.$route.query.patientId,
        visitId: this.$route.query.visitId,
        planFormId: this.model.selectedBlockId
      };
      this.tableLoading = true;
      nursingDiagsPatient(obj).then(res => {
        this.tableData = res.data.data.page.list;
        this.tableData.map((item, index) => {
          item.index = `P${index + 1}`;
        });
        this.tableLoading = false;
      });
    },
    pagePrint() {
      let printable = this.$refs.printable;
      let header = printable.querySelector(".header-con");

      let elHeader = printable.querySelector(
        ".print-table .el-table__header-wrapper"
      );

      let wrap = printable.querySelector(
        ".print-table .el-table__body-wrapper"
      );
      let colgroup = wrap.querySelector("table colgroup");
      let tbody = wrap.querySelector("tbody");

      // 获取所有行数
      // let originalRowsArr = printable.querySelectorAll(".edit-table tbody tr");
      // 获取打印行数(把每行高度添加进去)
      let printRowsArr = tbody.querySelectorAll(" tr");
      printRowsArr = Array.from(printRowsArr);
      // originalRowsArr = Array.from(originalRowsArr);
      // originalRowsArr.forEach(function(originalRow, index) {
      //   if (printRowsArr[index]) {
      //     printRowsArr[index].height = originalRow.offsetHeight;
      //   }
      // });

      let newTbody = tbody.cloneNode();
      let box = document.createElement("div");
      box.className = "box";
      let pageH = 0,
        otherH = 115 + 40;

      const addPage = () => {
        let newWrap = wrap.cloneNode(true);
        let newTable = newWrap.children[0];
        newTable.innerHTML = "";
        newTable.appendChild(colgroup);
        newTable.appendChild(newTbody);

        let elTable = document.createElement("div");
        elTable.className = "el-table";
        elTable.appendChild(elHeader.cloneNode(true));
        elTable.appendChild(newWrap.cloneNode(true));

        let page = document.createElement("div");
        page.className = "containter";
        page.appendChild(header.cloneNode(true));
        page.appendChild(elTable);

        box.appendChild(page);
      };
      let allRowH = [];
      printRowsArr.forEach((row, index) => {
        allRowH.push(row.offsetHeight);
      });
      printRowsArr.forEach((row, index) => {
        pageH += allRowH[index];
        newTbody.appendChild(row);
        if (pageH + otherH >= 1000) {
          if (pageH + otherH > 1000) {
            newTbody.removeChild(row);
          }
          addPage();
          newTbody = document.createElement("tbody");
          if (pageH + otherH > 1000) {
            newTbody.appendChild(row);
            pageH = allRowH[index];
          } else {
            pageH = 0;
          }
        }

        if (index == printRowsArr.length - 1) {
          addPage();
        }
      });
      // 添加页码
      const children = Array.from(box.children);
      children.forEach((child, i, children) => {
        const pageNum = document.createElement("div");
        pageNum.style =
          "position: absolute; bottom: 20px; left: 0; width: 100%; text-align: center; font-size: 12px; font-family: SimSun";
        pageNum.innerHTML = `第 ${i + 1} / ${children.length} 页`;
        child.appendChild(pageNum);
      });

      window.localStorage.diagnosisModel = box.innerHTML;
      if (box.innerHTML) {
        this.$router.push(`/print/diagnosis`);
      }
    },
    async onPrint() {
      this.$nextTick(() => {
        this.pagePrint();
      });
    }
  },
  created() {
    this.getData();
    model.refreshTable = this.getData;
    this.bus.$on("printDiagnosis", this.onPrint);
  },
  components: {
    DTable,
    DTableHD,
    DTableGZ,
    DTableFSSY,
  }
};
</script>

<style lang="scss" scoped>
.containter {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 20px 20px 10px;
  margin: 10px 20px 10px;
  .header-con {
    text-align: center;
    margin-bottom: 10px;
    .his-name {
      font-size: 18px;
      padding: 0 0px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, "Times New Roman", Georgia, Serif !important;
    }

    .title {
      font-size: 21px;
      padding: 5px 0 5px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, "Times New Roman", Georgia, Serif !important;
    }

    span {
      margin-right: 4px;
      font-size: 13px;
      color: #000;
    }

    .info-con {
      margin: 8px 0;
      text-align: left;
    }
    .bottom-line {
      display: inline-block;
      border-bottom: 1px solid #000;
      padding: 2px 0 2px 2px;
    }
  }
}
</style>
