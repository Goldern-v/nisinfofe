<template>
  <div class="critical-value">
    <div class="header">
      <div class="header-item">
        <div>
          <span class="demonstration">日期：</span>
          <el-date-picker
            v-model="time"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div>
          科室：
          <ElSelect
            style="width: 180px;"
            size="small"
            v-model="wardCode"
            filterable
          >
            <ElOption v-for="val in deptList" :key="val.code" :label="val.name" :value="val.code" />
          </ElSelect>
        </div>
        <div>
          <span>类型：</span>
          <el-select style="width: 100px;" v-model="type" placeholder="请选择">
            <el-option
              v-for="item in typeOPtions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="header-item">
        <div class="search">
          <el-input
            placeholder="请输入患者姓名 | ID |危急值ID | 危急值名称"
            icon="search"
            v-model="search"
            :on-icon-click="searchIconClick"
          >
          </el-input>
        </div>
        <el-button type="primary" @click="searchClick">查询</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%"
        @row-dblclick="openDetail"
      >
        <el-table-column fixed type="index" minWidth="50"></el-table-column>
        <el-table-column
          v-for="(item, index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :minWidth="item.minWidth"
          :align="item.align"
          :fixed="item.fixed"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="openDetail(scope.$index, scope.row)">报告详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :pageIndex="query.pageIndex"
        :size="query.pageSize"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { getCriticalValue } from "@/api/common";
import Pagination from "@/components/pagination/pagination.vue";
import moment from 'moment';
import qs from "qs";
import { nursingUnit } from "@/api/lesion"
const end = new Date();
const start = new Date();
start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
export default {
  components: {
    Pagination
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              // const end = new Date();
              // const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      time: [start, end],
      type: "检验",
      search: "",
      typeOPtions: [
        {
          value: "检查",
          label: "检查"
        },
        {
          value: "检验",
          label: "检验"
        }
      ],
      tableColumn: [
        {
          prop: "id",
          label: "危急值ID",
          minWidth: "80",
          align: "center",
          fixed: true
        },
        {
          prop: "name",
          label: "危急值项目",
          minWidth: "100",
          align: "center"
        },
        {
          prop: "result",
          label: "结果",
          minWidth: "180",
          align: "center"
        },
        {
          prop: "reference",
          label: "参考值",
          minWidth: "100",
          align: "center"
        },
        {
          prop: "patientName",
          label: "患者姓名",
          minWidth: "80",
          align: "center"
        },
        {
          prop: "patientId",
          label: "患者ID",
          minWidth: "80",
          align: "center"
        },
        {
          prop: "itemName",
          label: "项目名称",
          minWidth: "180",
          align: "center"
        },
        {
          prop: "reportTime",
          label: "报告时间",
          minWidth: "120",
          align: "center"
        },
        {
          prop: "reportDoctor",
          label: "报告医生",
          minWidth: "80",
          align: "center"
        }
      ],
      tableData: [],
      loading: false,
      tableHeight: "",
      query: {
        pageSize: 20,
        pageIndex: 1
      },
      total: 0,
      wardCode: '',
      deptList: []
    };
  },
  mounted() {
    this.tableHeight = window.innerHeight - 180;
    this.getDepList()
    this.getTableData();
  },
  methods: {
    async getDepList() {
      try {
        if (this.deptList.length > 0) return
        const res = await nursingUnit()
        this.deptList = res.data.data.deptList || []
        if (this.deptList.length > 0) {
          this.deptList = [
            { code: '', name: '全院' },
            ...this.deptList
          ]
          this.wardCode = res.data.data.defaultDept || ''
        }
      } catch (e) {
      }
    },
    openDetail(index, row) {
      console.log(index, row);
      if (row.type === "检查") {
        window.open(
          `/crNursing/inspect?${qs.stringify({
            patientId: row.patientId, 
            visitId: row.visitId,
            id: row.id,
          })}`
        );
      } else if (row.type === "检验") {
        window.open(
          `/crNursing/test?${qs.stringify({
            patientId: row.patientId, 
            visitId: row.visitId,
            id: row.id,
          })}`
        );
      }
        
      
    },
    sizeChange(newSize) {
      this.query.pageSize = newSize;
    },
    currentChange(newPage) {
      this.query.pageIndex = newPage;
      this.getTableData();
    },
    searchClick() {
      this.getTableData()
    },
    searchIconClick() {
      this.getTableData()
    },
    getTableData() {
      this.loading = true;
      let params = {
        patientName: this.search,
        type: this.type,
        beginTime: moment(this.time[0]).format('YYYY-MM-DD') + ' 00:00:00' || "",
        endTime: moment(this.time[1]).format('YYYY-MM-DD') + ' 23:59:59' || "",
        pageIndex: this.query.pageIndex,
        pageSize: this.query.pageSize,
        wardCode: this.wardCode || localStorage.getItem('selectDeptValue')
      };
      getCriticalValue(params).then(res => {
        this.loading = false;
        if (res.data.code === "200") {
          this.tableData = res.data.data.list || [];
          this.total = res.data.data.pageCount || 0
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.critical-value {
  height: calc(100vh - 61px);
  background-color: #fff;
  .header {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-item{
      display: flex;
      align-items: center;
      > div {
        margin-right: 20px;
      }
    }
    
    .search {
      width: 350px;
    }
  }
  .content {
    margin: 0px 20px;
  }
}
</style>
