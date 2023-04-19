<template>
     <el-dialog
      title="体征同步"
      :visible.sync="dialogTableVisible"
      class="vaillist"
      :before-close="handleClose"
    >
      <el-date-picker
        v-model="searchData"
        type="datetime"
        placeholder="开始日期"
        style="width: 180px"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <span>-</span>
      <el-date-picker
        v-model="endData"
        type="datetime"
        placeholder="结束日期"
        style="width: 180px"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <el-button @click="searchsign">查询</el-button>
      <el-table
        :data="gridData"
        border
        stripe
        height="250"
        @row-click="leftTablelist"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column property="dateStr" label="日期"></el-table-column>
        <el-table-column property="timeStr" label="时间"></el-table-column>
        <el-table-column
          property="axillaryTemperature"
          label="体温（T）"
        ></el-table-column>
        <el-table-column
          property="pulse"
          label="脉搏（P）"
        ></el-table-column>
        <el-table-column property="breathe" label="呼吸（R）"></el-table-column>
        <el-table-column
          property="bloodPressure"
          label="血压（BP）"
        ></el-table-column>
        <template v-if="['nfyksdyy'].includes(HOSPITAL_ID)">
          <el-table-column
          property="heartRate"
          label="心率（HR）"
        ></el-table-column>
        <el-table-column
          property="height"
          label="身高"
        ></el-table-column>
        <el-table-column
          property="weight"
          label="体重"
        ></el-table-column>
        </template>
      </el-table>
    </el-dialog>
</template>
<script>
import moment from 'moment'
import {
  vitalsign,
} from "@/Page/sheet-hospital-eval/api/index.js";
export default {
props: {
    dialogTableVisible:{
        default:false,
        type:Boolean,
    },

},
data() {
    return {
        gridData:[],
        searchData: moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm"),
        endData:moment().format("YYYY-MM-DD HH:mm"),
    };
},
mounted(){
    this.formSignsOfsync();
},
methods: {
    searchsign() {
      this.searchData= moment(this.searchData).format("YYYY-MM-DD HH:mm");
      this.endData = moment(this.endData).format("YYYY-MM-DD HH:mm")
      this.formSignsOfsync();
    },
     // 体征同步
    formSignsOfsync() {
      console.log(this);
      let postData = {
        patientId: this.$parent.patientInfo.patientId,
        visitId: this.$parent.patientInfo.visitId,
        startDate: this.searchData,
        endDate: this.endData,
      };
      vitalsign(postData)
        .then((res) => {
          this.gridData = res.data.data.list;
        })
        .catch((err) => {
          console.log("错误事件", err);
        });
    },
    leftTablelist(val){
        this.$emit('leftTablelist',val)
    },
    handleClose(){
        this.$emit('update:dialogTableVisible',false)
    }
},
components: {}
};
</script>
