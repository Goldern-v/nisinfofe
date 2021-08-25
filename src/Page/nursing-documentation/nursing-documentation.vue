<template lang="pug">
  div
    .main-contain
      changeMaJorTable(v-if="HOSPITAL_ID=='huadu' && isChangeMajor" :tableData="tableData" :pageLoadng="pageLoadng")
      dTable(v-else :tableData="tableData" :pageLoadng="pageLoadng")
      .head-con(flex="main:justify cross:center")
        pagination(:pageIndex="page.pageIndex" :size="page.pageNum" :total="page.total" @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange")

    .search-con
      searchCon(ref="searchCon")
</template>

<!--
<template>
  <div>
    <div class="main-contain">
      <div v-if="HOSPITAL_ID=='huadu' && isChangeMajor">
        <change-ma-jor-table  :tableData="tableData" :pageLoadng="pageLoadng"></change-ma-jor-table>
      </div>
     <div v-else>
       <d-table  :tableData="tableData" :pageLoadng="pageLoadng"></d-table>
     </div>
     
      <div flex="main:justify cross:center" class="head-con">
        <pagination flex="main:justify cross:center" class="head-con" :pageIndex="page.pageIndex" :size="page.pageNum" :total="page.total" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"/>
      </div>
    </div>
    <div class="search-con">
       <search-con ref="searchCon"></search-con>
    </div>
  </div>
</template>
-->

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain {
  margin: 10px 250px 0px 10px;

  .head-con {
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

.search-con {
  width: 240px;
  position: fixed;
  border-left: 1px solid #D4DADE;
  background: #f8f8f8;
  top: 60px;
  bottom: 0;
  right: 0;
  z-index: 10;
}
</style>
<script>
import searchCon from "./components/search-con/search-con";
import dTable from "./components/table/d-table";
import changeMaJorTable from  "./components/table/change-major-table"
import pagination from "./components/common/pagination";
import { patEmrList,patEmrListZSQm,listNurseAdtHd } from "@/api/document";
import { del } from '@/api/record';
export default {
  data() {
    return {
      pageInput: "",
      tableData: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      },
      isChangeMajor:false,//是否显示转科
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.getData();
    },
    getData() {
      let data = this.$refs.searchCon.data;
      let obj = {};
      if (data.deptValue) {
        obj.wardCode = data.deptValue || data.deptList.join(",");
      }
      if (data.status) {
        obj.status = data.status;
      }
      if (data.name) {
        obj.name = data.name;
      }
      if (data.patientId) {
        obj.patientId = data.patientId;
      }
      if (data.inpNo) {
        obj.inpNo = data.inpNo;
      }
      if (data.bedLabel) {
        obj.bedLabel = data.bedLabel;
      }
      if (data.admissionDate[0]) {
        obj.admissionDateBegin = new Date(data.admissionDate[0]).Format(
          "yyyy-MM-dd"
        );
      }
      if (data.admissionDate[1]) {
        obj.admissionDateEnd = new Date(data.admissionDate[1]).Format(
          "yyyy-MM-dd"
        );
      }
      if (data.dischargeDate[0]) {
        obj.dischargeDateBegin = new Date(data.dischargeDate[0]).Format(
          "yyyy-MM-dd"
        );
      }
      if (data.dischargeDate[1]) {
        obj.dischargeDateEnd = new Date(data.dischargeDate[1]).Format(
          "yyyy-MM-dd"
        );
      }
      if (data.status == 1) {
        obj.dischargeDateBegin = "";
        obj.dischargeDateEnd = "";
        this.isChangeMajor=false;
      }
      if (data.status == 2) {
        obj.admissionDateBegin = "";
        obj.admissionDateEnd = "";
        this.isChangeMajor=false;
      }
      if (data.status == 3) {
        this.isChangeMajor=true;
        // this.query.startDate = this.query.startDate ? moment(this.query.startDate).format("YYYY-MM-DD") + " 00:00:00": moment(new Date()).format("YYYY-MM-DD") + " 00:00:00";
        // this.query.endDate =  this.query.endDate ? moment(this.query.endDate).format("YYYY-MM-DD") + " 23:59:59" : moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
        obj.startDate = new Date(data.dateTime[0]).Format(
          "yyyy-MM-dd"
        )+ " 00:00:00";
        obj.endDate = new Date(data.dateTime[1]).Format(
          "yyyy-MM-dd"
        )+ " 23:59:59";
        obj.admissionDateBegin = "";
        obj.admissionDateEnd = "";
        obj.dischargeDateBegin = "";
        obj.dischargeDateEnd = "";
      }

      obj.pageIndex = this.page.pageIndex;
      obj.pageNum = this.page.pageNum;
      this.pageLoadng = true;
      let patEmrListApi =  patEmrList;
      //(data.status == 3) && (patEmrListApi=listNurseAdtHd);
      if(this.HOSPITAL_ID == 'zhongshanqi'){
        obj.diagnosis = data.diagnosis;
        patEmrListApi = patEmrListZSQ;
      }
      //花都转院查询
      if(data.status == 3 && this.HOSPITAL_ID == 'huadu'){
        let newObj=JSON.parse(JSON.stringify(obj));
        delete newObj.admissionDateBegin;
        delete newObj.admissionDateEnd;
        delete newObj.dischargeDateBegin;
        delete newObj.dischargeDateEnd;
        newObj.pageSize=newObj.pageNum;
        // console.log(obj)
        listNurseAdtHd(newObj).then(res => {
        this.tableData = res.data.data.list;
        this.page.total = res.data.data.totalCount ? parseInt(res.data.data.totalCount): 0;
        this.pageLoadng = false;
      });
      }else{
       patEmrListApi(obj).then(res => {
        this.tableData = res.data.data.list;
        this.page.total = res.data.data.page ? parseInt(res.data.data.page)*this.page.pageNum : 0;
        this.pageLoadng = false;
      });
      }
     
    }
  },
  computed:{
    searchConData(){
      let newData=this.$refs.searchCon?this.$refs.searchCon.data:null;
      return newData
    }
  },
  components: {
    searchCon,
    dTable,
    pagination,
    changeMaJorTable
  }
};
</script>
