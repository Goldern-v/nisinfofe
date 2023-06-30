<template>
  <div class="header">
    <div class="header-item">
      <div>
        <div class="item">日期：</div>
        <el-date-picker
          v-model="time"
          size="small"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div>
        <div class="item">科室：</div>
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
        <div class="item">设备性质：</div>
        <el-select size="small" style="width: 100px;" v-model="type" placeholder="请选择">
          <el-option
            v-for="item in qualitys"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <div class="item">使用状态：</div>
        <el-select size="small" style="width: 100px;" v-model="type" placeholder="请选择">
          <el-option 
            v-for="item in typeOPtions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <div class="item">设备类别：</div>
        <el-select size="small" style="width: 100px;" v-model="type" placeholder="请选择">
          <el-option
            v-for="item in equipmentClass"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="search-item">
      <div class="search">
        <el-input
          size="small"
          placeholder="请输入设备名称 | 设备编码"
          icon="search"
          v-model="search"
          :on-icon-click="searchIconClick"
        >
        </el-input>
      </div>
      <el-button size="small" type="primary" @click="searchClick">查询</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
    </div>
  </div>
</template>

<script>
import { getCriticalValue } from "@/api/common";
import moment from 'moment';
import qs from "qs";
import { nursingUnit } from "@/api/lesion"
const end = new Date();
const start = new Date();
start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
export default {
  components: {},
  props: {
    query: {
      default: {}, 
      type: Object
    },
    multipleSelection: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
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
              // const end = new Date();
              // const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
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
      qualitys: [
        {
          value: "患者关联",
          label: "患者关联"
        },
        {
          value: "非患者关联",
          label: "非患者关联"
        }
      ],
      typeOPtions: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "使用中",
          label: "使用中"
        },
        {
          value: "已结束",
          label: "已结束"
        }
      ],
      equipmentClass: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "监护仪",
          label: "监护仪"
        },
        {
          value: "呼吸仪",
          label: "呼吸仪"
        },
        {
          value: "呼吸机",
          label: "呼吸机"
        }
      ],
      wardCode: '',
      deptList: []
    };
  },
  mounted() {
    this.getDepList()
    // this.getTableData();
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
          let tableData = (res.data && res.data.data && res.data.data.list) || []
          let total = (res.data && res.data.data && res.data.data.pageCount) || 0
          this.$emit('getTableData', { tableData, total })
        }
      });
    },
    async handleExport() {
      if (this.loading) return

      try {
        this.loading = true
        exportExc({
          // themeName: this.$route.meta.title,
          // ...this.formData,
          // beginTime: this.formData.beginTime.split(' ')[0],
          // endTime: this.formData.endTime.split(' ')[0],
        }).then(res => {

          let fileName = res.headers["content-disposition"]
          ? decodeURIComponent(
            res.headers["content-disposition"].replace("attachment;filename=", "")
          ) : this.$route.meta.title + '.xls';
          let blob = new Blob([res.data], {
            type: res.data.type
          });
          let a = document.createElement('a')
          let href = window.URL.createObjectURL(blob) // 创建链接对象
          a.href = href
          a.download = fileName // 自定义文件名
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(href)
          document.body.removeChild(a) // 移除a元素
          this.loading = false
        })
      } catch (e) {
        this.loading = false
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 12px;
  padding: 10px 20px;
  .header-item{
    display: flex;
    align-items: center;
    overflow-x: auto;
    > div {
      display: flex;
      margin-right: 10px;
    }
    .item{
      min-width: 60px;
      line-height:30px;
      text-align: center;
    }
  }
  .header-item::-webkit-scrollbar {
    display:none
  }
  .search-item{
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
  }
  
  .search {
    width: 225px;
    margin-right: 10px;
  }
}
</style>
