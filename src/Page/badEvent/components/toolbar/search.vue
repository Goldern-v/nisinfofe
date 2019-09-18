
<template>
  <!-- 不良事件 -->
  <div>
    <div class="toolbar">
      <div class="filterItem date">
        <span>发生日期:</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="dateBegin"
          clearable
        />
        <span>-</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="结束日期"
          v-model="dateEnd"
          clearable
        />
      </div>
      <!-- <div class="filterItem">
        <span>患者:</span>
        <ElInput placeholder="患者姓名" v-model="patientName"></ElInput>
      </div>-->
      <div class="filterItem">
        <span>科室:</span>
        <ElSelect
          size="small"
          v-model="selectedDeptValue"
          @change="changeDept(selectedDeptValue)"
          style="width:180px"
          clearable
        >
          <ElOption
            v-for="item in allDepartmentsList"
            :key="item.deptCode"
            :label="item.deptName"
            :value="item.deptCode"
          />
        </ElSelect>
      </div>
      <div class="filterItem">
        <span>事件类型:</span>
        <ElSelect size="small" v-model="eventType" style="width:120px" clearable>
          <ElOption
            v-for="type of eventTypeOptions"
            :key="type.key"
            :label="type.label"
            :value="type.value"
          />
        </ElSelect>
      </div>
      <div class="filterItem">
        <span>状态:</span>
        <ElSelect size="small" v-model="eventStatus" style="width:140px" clearable>
          <ElOption
            v-for="type of eventStatusOptions"
            :key="type.key"
            :label="type.label"
            :value="type.value"
          />
        </ElSelect>
      </div>
      <div class="filterItem">
        <Button @click.stop="search">查询</Button>
        <Button @click.stop="newFormOpen">新建</Button>
      </div>
    </div>
    <!-- <div class="container">
          <router-view></router-view>
    </div>-->
    <div class="bad-event-list">
      <!-- <NullBg v-if="!tableData||tableData.length==0" text="暂时没有不良事件数据～"/> -->
      <div class="block">
        <EventTable :tableData="tableData" :pageLoadng="pageLoadng" :updateTable="updateTable"></EventTable>
        <pagination
          :page.sync="page.pageIndex"
          :size.sync="page.pageSize"
          :total.sync="total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>
    </div>
    <div class="bad-event-create-event">
      <NewForm ref="newBadEventForm"></NewForm>
    </div>
  </div>
</template>

<style lang="stylus"  rel="stylesheet/stylus" type="text/stylus" scoped>
.toolbar {
  display: flex;
  align-items: center;
  height: 41px;
  padding: 0 18px;
  background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
  border: 1px solid #CBD5DD;
  overflow: hidden;
  font-size: 14px;
  flex-wrap: wrap;

  .filterItem {
    margin-right: 20px;
  }

  .filterItem:last-child {
    flex: 1;
    text-align: right;
    margin-right: 0;
  }

  .el-input, .el-input__inner {
    width: 120px !important;
    height: 30px !important;
    display: inline-block !important;
  }

  .date-picker .el-input .el-input__inner {
    width: 150px !important;
  }
}

.container {
  padding: 15px 0;
  flex: 1;
  overflow: auto;
}

.actions {
  position: fixed;
  top: 70px;
  right: 10px;
  z-index: 1;
}

// .print-btn
// padding 10px 12px
// color #687179
// background #fff
// border 1px solid #adb4ba
// text-align center
// font-size 13px
// cursor pointer
// border-radius 2px

// &:hover
// background #fafafa
.el-row {
  text-align: center;
  border: 1px solid #cbd5dd;
  margin: auto;
  width: 99%;
  border-top: none;
  padding: 10px 0;
}

.block {
  span {
    margin-right: 12px;
    font-size: 14px;
    color: #687179;
    cursor: pointer;
    user-select: none;
  }
}

.useLess {
  color: #999 !important;
  cursor: not-allowed;
  // input
  // width 25px;
  // height 16px;
  // background: #FFFFFF;
  // border: 1px solid #CBD5DD;
  // border-radius: 2px;
  // outline none
  // text-align center
}

&:hover {
  color: #333;
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
import common from "@/common/mixin/common.mixin.js";
import dayjs from "dayjs";
import apis from "../../apis/index.js";

// import NullBg from "@/components/null/null-bg.vue";
import NewForm from "../modal/new-form.vue";
import EventTable from "../table/eventTable";
import Button from "../button";
import pagination from "../pagination.vue";

import { patients, nursingUnit, typeList } from "@/api/lesion.js";

import BusFactory from "vue-happy-bus";

export default {
  mixins: [common],
  components: {
    Button,
    // NullBg,
    EventTable,
    NewForm,
    pagination
  },
  props: {},
  data() {
    return {
      bus: BusFactory(this),
      pageLoadng: true,
      dateBegin: "",
      dateEnd: "",
      patientName: "",
      eventType: "",
      eventStatus: "",
      eventStatusOptions: [
        { value: "", label: "全部" },
        { value: 0, label: "保存" },
        { value: 1, label: "上报" },
        { value: 2, label: "质控科审核通过" },
        { value: -2, label: "质控科审核不通过" },
        { value: 3, label: "责任科室已处理" },
        { value: 4, label: "质控科已总结" },
        { value: 5, label: "质量委员会已处理" }
      ],
      eventTypeOptions: [
        { value: "", label: "全部" },
        { value: "药物事件", label: "药物事件" },
        { value: "跌倒事件", label: "跌倒事件" },
        { value: "手术事件", label: "手术事件" },
        { value: "输血事件", label: "输血事件" },
        { value: "医疗处置事件", label: "医疗处置事件" },
        { value: "公共意外事件", label: "公共意外事件" },
        { value: "治安事件", label: "治安事件" },
        { value: "伤害事件", label: "伤害事件" },
        { value: "管路事件", label: "管路事件" },
        {
          value: "院内不预期心跳呼吸停止事件",
          label: "院内不预期心跳呼吸停止事件"
        },
        { value: "麻醉事件", label: "麻醉事件" },
        { value: "检查/检验/病理标本事件", label: "检查/检验/病理标本事件" },
        { value: "其他事件", label: "其他事件" }
      ],
      tableData: [],
      arr: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageSize: 20,
        totalPage: 1
      },
      total: 0, //列表总条数
      patientList: localStorage["patientList" + this.deptCode] || [],
      allDepartmentsList: [], //所有护理单元科室列表（不良事件）
      selectedDeptValue: "" //选中的科室
    };
  },
  mounted() {
    // 获取所有护理单元科室列表
    if (
      this.allDepartmentsList &&
      !this.allDepartmentsList.length &&
      sessionStorage.getItem("allDepartmentsList")
    ) {
      this.allDepartmentsList = JSON.parse(
        sessionStorage.getItem("allDepartmentsList")
      );
    }
    //上次选中的科室
    if (
      !this.selectedDeptValue &&
      sessionStorage.getItem("selectedDeptValue")
    ) {
      this.selectedDeptValue = sessionStorage.getItem("selectedDeptValue");
    }

    // 日期默认值
    if (!this.dateBegin) {
      let month = parseInt(new Date().getMonth()) + 1;
      if (month < 10) {
        this.dateBegin = new Date().getFullYear() + "-0" + month + "-01";
      } else {
        this.dateBegin = new Date().getFullYear() + "-" + month + "-01";
      }
    }
    this.dateEnd = this.dateEnd
      ? this.dateEnd
      : dayjs(new Date()).format("YYYY-MM-DD");
  },
  created() {
    this.bus.$on("loadPatientsData", this.loadPatientsData);
    if (this.deptCode) {
      this.loadPatientsData(this.deptCode);
    }
    // 获取所有护理单元
    if (this.allDepartmentsList && !this.allDepartmentsList.length) {
      this.getDepartmentsList();
    } else {
      this.loadEventData();
    }
  },
  watch: {
    deptCode() {
      this.loadPatientsData(this.deptCode);
    }
  },
  methods: {
    updateTable() {
      this.loadEventData();
    },
    // 选择科室
    changeDept(selectedDeptValue) {
      sessionStorage.setItem("selectedDeptValue", selectedDeptValue);
    },
    async loadEventData() {
      // 根据护理单元获取不良事件列表
      this.pageLoadng = true;
      let query = {
        wardCode: this.selectedDeptValue,
        dateBegin: this.dateBegin
          ? dayjs(new Date(this.dateBegin)).format("YYYY-MM-DD")
          : "",
        dateEnd: this.dateEnd
          ? dayjs(new Date(this.dateEnd)).format("YYYY-MM-DD")
          : "",
        patientName: this.patientName,
        eventType: this.eventType,
        eventStatus: this.eventStatus,
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize
      };

      apis
        .getEventList(query)
        .then(res => {
          if (res.data && res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.page.totalPage =
              res.data.data.totalPage || this.page.totalPage;
            this.total = res.data.data.totalCount;
          }
          this.bus.$emit("setTableData", {
            tableData: this.tableData
          });
          this.pageLoadng = false;
        })
        .catch(err => {
          this.pageLoadng = false;
          console.log(err);
        });
    },
    async loadPatientsData(deptCode) {
      if (!deptCode) {
        deptCode = this.deptCode;
      }
      // 更新病人列表缓存
      if (!localStorage["patientList" + deptCode]) {
        const patRes = await patients(deptCode);
        // this.patientList = patRes.data.data
        localStorage["patientList" + deptCode] = JSON.stringify(
          patRes.data.data
        );
        console.log("病人列表p", patRes, localStorage);
      }
      this.patientList =
        JSON.parse(localStorage["patientList" + deptCode]) || [];
      console.log("病人列表", this.patientList);
      this.bus.$emit("updatePatientsList");
    },

    newFormOpen() {
      this.$refs.newBadEventForm.open();
    },
    search(e) {
      // const loading = this.$loading({
      //   lock: true,
      //   text: "Loading",
      //   spinner: "el-icon-close",
      //   background: "rgba(0, 0, 0, 0.7)",
      //   target: e.target
      // });
      // setTimeout(() => {
      //   loading.close();
      // }, 2000);
      console.log("tableData", this.tableData);
      this.loadEventData();
    },
    // 获取所有护理单元
    getDepartmentsList() {
      apis.getAllNursingUnit("type=2").then(res => {
        if (res.data && res.data.code == 200) {
          this.allDepartmentsList = res.data.data;
          // 根据护理单元获取不良事件列表
          this.loadEventData();
          // 把获取到的科室存起来
          if (this.allDepartmentsList) {
            sessionStorage.setItem(
              "allDepartmentsList",
              JSON.stringify(this.allDepartmentsList)
            );
          }
        }
      });
    },
    handleSizeChange(newSize) {
      this.page.pageIndex = 1;
      this.page.pageSize = newSize;
      this.loadEventData();
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.loadEventData();
    }
  }
};
</script>
