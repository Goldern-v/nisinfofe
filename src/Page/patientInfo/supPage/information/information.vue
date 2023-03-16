<template>
  <div>
    <div class="content">
      <el-collapse v-model="activeName" class="openbar">
        <el-collapse-item title="基本信息" name="1">
          <infoTable :tableData="tableData1"></infoTable>
        </el-collapse-item>
        <el-collapse-item title="住院信息" name="2">
          <infoTable :tableData="tableData2"></infoTable>
        </el-collapse-item>
        <el-collapse-item title="联系人信息" name="3">
          <infoTable :tableData="tableData3"></infoTable>
        </el-collapse-item>
        <el-collapse-item title="其他信息" name="4">
          <infoTable :tableData="tableData4"></infoTable>
        </el-collapse-item>
        <el-collapse-item title="门诊信息" name="5">
          <infoTable :tableData="tableData5"></infoTable>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.openbar {
  border: 0;

  .el-collapse-item {
    border: 1px solid #CBD5DD;
    border-radius: 2px;
    margin-bottom: 10px;
  }

  .el-collapse-item__header {
    height: 37px;
    background: #F7FAFA;
    line-height: 37px;
    border-color: #EAEEF1;
    color: #333333;
    font-size: 13px;
    font-weight: bold;
  }

  .el-collapse-item__wrap {
    border: 0;
  }

  .el-collapse-item__content {
    padding: 0;
  }

  .el-table {
    border: 0;
  }

  .el-table td, .el-table th {
    height: 37px;
    font-size: 12px;
    color: #333;
  }
}
</style>

<script>
import infoTable from "./component/infoTable";
import { info } from "@/api/patientInfo";
export default {
  data() {
    return {
      activeName: ["1", "2", "3", "4", "5"],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
    };
  },
  computed: {
    infoData() {
      return this.$route.query;
    },
  },
  created() {
    class TableItem {
      constructor(key1, value1, key2, value2) {
        return {
          data1: {
            key: key1,
            value: value1,
          },
          data2: {
            key: key2,
            value: value2,
          },
        };
      }
    }
    info(this.infoData.patientId, this.infoData.visitId).then((res) => {
      let re = res.data.data;
      this.tableData1 = [
        new TableItem("姓名", re.name, "性别", re.sex),
        this.HOSPITAL_ID === "huadu"
          ? new TableItem("ID号", re.inpNo, "住院号", re.patientId)
          : new TableItem("ID号", re.patientId, "住院号", re.inpNo),
        new TableItem("出生年月", re.birthday, "年龄", re.age),
        new TableItem("婚姻状况", re.marriage, "职业", re.occupation),
        new TableItem("出生地", re.birthPlace, "国籍", re.country),
        new TableItem("身份证号", re.idNo, "民族", re.nation),
        new TableItem("现住址", re.address, "电话", re.phone),
        new TableItem(
          "单位地址",
          re.companyAddress,
          "单位电话",
          re.companyPhone
        ),
      ];
      if(this.HOSPITAL_ID === "fuyou"){
        this.tableData1 = [
          new TableItem("姓名", re.name, "性别", re.sex),
          new TableItem( "住院号", re.inpNo,"出生年月", re.birthday),
          new TableItem( "年龄", re.age,"婚姻状况", re.marriage),
          new TableItem("职业", re.occupation, "出生地", re.birthPlace),
          new TableItem( "国籍", re.country,"身份证号", re.idNo),
          new TableItem("民族", re.nation, "现住址", re.address),
          new TableItem("电话", re.phone, "单位地址",re.companyAddress),
          new TableItem("单位电话",re.companyPhone,),
        ];
      }
      this.tableData2 = [
        new TableItem("入院日期", re.admissionDate, "科室", re.deptName),
        new TableItem(
          "护理单元",
          re.wardName,
          "床号",
          re.bedLabel || "没有数据"
        ),
        new TableItem("医生", re.doctorInCharge, "诊断", re.diagnosis),
        new TableItem("护理等级", re.nursingClass, "病情", re.patientCondition),
        new TableItem("费别", re.chargeType),
      ];
      this.tableData3 = [
        new TableItem("联系人", re.contactName, "联系人电话", re.contactPhone),
        new TableItem(
          "联系人地址",
          re.contactAddress,
          "联系人身份证号",
          re.nextOfKinCardNo
        ),
      ];
      this.tableData4 = [
        new TableItem("计划生育证", re.planCard, "准生证号", re.zszh),
        new TableItem("社保号", re.ybzh, "公医证号", re.gyzh),
      ];
      this.tableData5 = [
        new TableItem("门诊医生", re.outpDoctor)
      ];
    });
  },
  components: {
    infoTable,
  },
};
</script>
