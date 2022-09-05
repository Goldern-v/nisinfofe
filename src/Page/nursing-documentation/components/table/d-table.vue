<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="wih - 125"
      v-loading="pageLoadng"
      @row-dblclick="openDetail"
    >
      <el-table-column
        label=" "
        min-width="50px"
        type="index"
      ></el-table-column>

      <el-table-column
        prop="wardName"
        label="护理单元"
        min-width="150px"
      ></el-table-column>

      <el-table-column
        prop="bedLabel"
        label="床号"
        :min-width="HOSPITAL_ID=='fuyou'?'60px':'80px'"
      ></el-table-column>

      <el-table-column
        label="姓名"
        prop="name"
        min-width="80px"
      ></el-table-column>

      <el-table-column
        :label="['fuyou'].includes(HOSPITAL_ID)?'责任医生':'管床医生'"
        prop="doctorInCharge"
        min-width="90px"
        v-if="!['liaocheng', 'guizhou'].includes(HOSPITAL_ID)"
      ></el-table-column>

      <el-table-column
        prop="sex"
        label="性别"
        :min-width="HOSPITAL_ID=='fuyou'?'35px':'70px'"
      ></el-table-column>

      <el-table-column
        prop="patientId"
        :label="['foshanrenyi'].includes(HOSPITAL_ID)?'住院号':'病人ID'"
        min-width="120px"
        v-if="!['fuyou'].includes(HOSPITAL_ID)"
      ></el-table-column>

      <el-table-column
        :label="['foshanrenyi'].includes(HOSPITAL_ID)?'记账号':'住院号'"
        prop="inpNo"
        min-width="95px"
      ></el-table-column>

      <el-table-column
        prop="visitId"
        label="住院标识"
        min-width="95px"
        v-if="HOSPITAL_ID == 'gy'"
      ></el-table-column>

      <el-table-column
        prop="visitId"
        label="次数"
        :min-width="HOSPITAL_ID=='fuyou'?'35px':'70px'"
        v-else
      ></el-table-column>

      <el-table-column
        prop="admissionDate"
        label="入院日期"
        min-width="120px"
      ></el-table-column>

      <el-table-column
        prop="dischargeDate"
        label="出院日期"
        min-width="120px"
      ></el-table-column>

      <el-table-column
        prop="status"
        label="状态"
        :min-width="HOSPITAL_ID=='fuyou'?'70px':'80px'"
      ></el-table-column>

      <el-table-column
        label="主管医师"
        prop="doctorInCharge"
        min-width="90px"
        v-if="HOSPITAL_ID == 'liaocheng'"
      ></el-table-column>

      <el-table-column label="操作" min-width="80px">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.d-table {
  border: 1px solid #cbd5dd;

  >>>.el-table {
    border: 0 !important;

    td {
      height: 30px;
    }

    th >.cell, th >div {
      padding: 0px;
      text-align: center;
    }
  }

  >>>.el-table::after, .el-table::before {
    background: #cbd5dd;
    display: none;
  }

  >>>.el-table__row td:first-child .cell, >>>.el-table__row td:last-child .cell {
    padding: 0 5px;
    text-align: center;

    >>>.cell {
      padding: 0px;
      text-align: center;
    }
  }

  >>>.el-table__body-wrapper {
    // overflow-x hidden
  }
}
</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean,
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue",
    };
  },
  methods: {
    async openDetail(row) {
      // if (row.notViewPatient) {
      //   this.$message.warning("患者已归档，用户无权查看");
      //   return;
      // }
      let res;
      if(this.HOSPITAL_ID=="huadu"){
       res = await info(row.inpNo, row.visitId);
       if(res.data.code!='200'){
         this.$message.error(res.data.desc)
         return
       }
      }else{
       res = await info(row.patientId, row.visitId);
      }
      for (let index in res.data.data) {
        if (!res.data.data[index]) {
          res.data.data[index] = "";
        }
      }
      window.open(
        `/crNursing/home?${qs.stringify({
          patientId: res.data.data.patientId,
          visitId: res.data.data.visitId,
        })}`
      );
    },
  },
  components: {},
};
</script>
