<template>
  <div>
    <el-dialog title="护理记录单修改痕迹" :visible.sync="markVisible" size='large'>
      <div class="search">
        <div class="date">
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
          <el-input
            placeholder="请输入操作人名称"
            icon="search"
            v-model="empName"
            :on-icon-click="searchClick"
          >
          </el-input>
        </div>
        <el-button type="primary" @click="searchClick">查询</el-button>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        :data="markData"
        :height="500"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" width="50" align='center'></el-table-column>
        <el-table-column
          v-for="(item, index) in tableColumn"
          :key="index"
          :prop="item.fieldName"
          :label="item.fieldNameTitle"
          :align="item.align || 'center'"
          :minWidth="item.width"
        >
        </el-table-column>
      </el-table>
      <Pagination
        :pageIndex="query.pageIndex"
        :size="query.pageSize"
        :total="query.total"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      ></Pagination>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/pagination/pagination.vue";
import { getLogRecordOperate } from "@/Page/sheet-page/api/index.js";
import moment from 'moment';

export default {
  components: {
    Pagination
  },
  props: {
    blockId: {
      type: Number,
      value: 0,
    },
  },
  data() {
    return {
      markVisible: false,
      loading: false,
      tableHeight: '',
      time: [new Date(), new Date()],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
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
      markData: [
        {
          name: '班次',
          yetimg: '4',
          baitime: '4'
        }
      ],
      query: {
        pageSize: 20,
        pageIndex: 1,
        total: 0,
      },
      empName: '',
      tableColumn: [],
      defaultColumn: [
        {
          fieldNameTitle: "特殊情况",
          fieldName: "description",
          width: "200",
          align: 'left'
        },
        {
          fieldNameTitle: "操作人",
          fieldName: "operate_name",
        },
        {
          fieldNameTitle: "操作时间",
          fieldName: "operate_time",
          width: "120",
        },
        {
          fieldNameTitle: "操作类型",
          fieldName: "operate_type",
        },
      ]
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight - 180;
  },
  methods: {
    searchClick() {
      this.getLogRecordOperate()
    },
    tableRowClassName(row, index) {
      if (row.operate_status === '0') {
        return 'info-row';
      }
      return '';
    },
    sizeChange(newSize) {
      this.query.pageSize = newSize;
      this.getLogRecordOperate();
    },
    currentChange(newPage) {
      this.query.pageIndex = newPage;
      this.getLogRecordOperate();
    },
    async getLogRecordOperate() {
      this.loading = true;
      let params = {
        blockId: this.blockId || '',
        startDate: moment(this.time[0]).format('YYYY-MM-DD') + ' 00:00:00' || "",
        endDate: moment(this.time[1]).format('YYYY-MM-DD') + ' 23:59:59' || "",
        pageIndex: this.query.pageIndex,
        pageSize: this.query.pageSize,
        empName: this.empName
      }
      try {
        let { data: { data } } = await getLogRecordOperate(params)
        this.tableColumn = (data.title && data.title.length > 0 ) ? data.title.concat(this.defaultColumn) : []
        this.markData = data.log || []
        this.query.total = data.totalCount
      } catch (e) {} 
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  margin-bottom: 10px;
  display: flex;
  >div{
    margin-right: 10px;
  }
}
/deep/.el-table .info-row {
  background: #f7f7f7;
}
/deep/.el-table .cell, /deep/.el-table th > div{
  padding: 0 5px
}
/deep/.el-table th.is-left{
  text-align: center
}
</style>