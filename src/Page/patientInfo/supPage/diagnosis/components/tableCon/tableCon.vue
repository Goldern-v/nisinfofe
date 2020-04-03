<template>
  <div class="containter" v-loading="tableLoading">
    <div class="header-con">
      <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
      <div class="title">护理诊断计划</div>
      <div class="info-con" flex="main:justify">
        <span>
          姓名：
          <div class="bottom-line" style="min-width: 60px">
            {{ patientInfo.name }}
          </div>
        </span>
        <span>
          性别：
          <div class="bottom-line" style="min-width: 40px">
            {{ patientInfo.sex }}
          </div>
        </span>
        <span>
          年龄：
          <div class="bottom-line" style="min-width: 40px">
            {{ patientInfo.age }}
          </div>
        </span>
        <span>
          病区：
          <div class="bottom-line" style="min-width: 120px">
            {{ patientInfo.deptName }}
          </div>
        </span>
        <span>
          床号：
          <div class="bottom-line" style="min-width: 50px">
            {{ patientInfo.bedLabel }}
          </div>
        </span>
        <span>
          住院号/ID号：
          <div class="bottom-line" style="min-width: 60px">
            {{ patientInfo.inpNo }}
          </div>
        </span>
        <span>
          入院日期：
          {{ patientInfo.admissionDate }}
        </span>
      </div>
    </div>
    <DTable :tableData="tableData"></DTable>
  </div>
</template>

<script>
import DTable from "./d-table";
import { nursingDiagsPatient } from "../../api/index";
import { model } from "../../diagnosisViewModel";
export default {
  data() {
    return {
      model,
      tableData: [],
      tableLoading: false
    };
  },
  computed: {
    patientInfo() {
      return this.$route.query;
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
    }
  },
  created() {
    // this.getData();
    model.refreshTable = this.getData;
  },
  components: {
    DTable
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
