<template>
  <div class="header">
    <div class="header-item">
      <div>
        <div class="item">日期：</div>
        <el-date-picker
          @change='getTableData'
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
        <div class="item">设备性质：</div>
        <el-select size="small"  style="width: 115px;" @change="getTableData" v-model="title.isRelated" placeholder="请选择">
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
        <el-select size="small" style="width: 100px;" @change="getTableData" v-model="title.status" placeholder="请选择">
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
        <el-select size="small" style="width: 100px;" @change="getTableData" v-model="title.type" placeholder="请选择">
          <el-option
            v-for="item in deviceType"
            :key="item.id"
            :label="item.name"
            :value="item.name"
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
          v-model="title.code"
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
import { deviceUsageExport } from '../api/usageRecord'
import { getAllDeviceType } from '@/Page/equipment-management/api/equipmentType'

const end = new Date();
const start = new Date();
start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
export default {
  components: {},
  props: {
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
      title: {
        code: '',
        type: '全部',
        status: '',
        isRelated: '1',
        wardCode: localStorage.getItem('selectDeptValue')
      },
      time: [start, end],
      qualitys: [
        {
          value: "1",
          label: "患者关联"
        },
        {
          value: "0",
          label: "非患者关联"
        }
      ],
      typeOPtions: [
        {
          value: "",
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
      deviceType: [],
    };
  },
  created() {
    this.getAllDeviceType()
  },
  methods: {
    getAllDeviceType() {
      getAllDeviceType().then(res => {
        this.loading = false;
        if (res.data.code === "200") {
          this.deviceType =[ {name: '全部', id: 'all'}, ...((res.data && res.data.data) || [])]
        }
      });
    },
    searchClick() {
      this.title.wardCode = localStorage.getItem('selectDeptValue') || ''
      this.getTableData()
    },
    searchIconClick() {
      this.getTableData()
    },
    getTableData() {
      this.$emit('getTableData') 
    },
    async handleExport() {
      try {
        if (this.multipleSelection.length > 0) {
          deviceUsageExport(this.multipleSelection, this.title.isRelated).then(res => {
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
          })
        } else {
          this.$message.warning('未选择导出设备类别条目！')
        }
      } catch (e) {
        console.log(e)
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 12px;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
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
