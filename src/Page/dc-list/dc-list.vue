<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <!-- <span style="font-size: 18px;line-height: 31px;font-weight:bold;">健康宣教查询</span>
        <div style="flex: 1"></div> -->
        <span class="label"
              style="margin-left: 0">起始时间:</span>
        <el-date-picker type="datetime"
                        :clearable="false"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间"
                        size="small"
                        v-model="startDate"
                        style="width:160px;margin-right:10px;"></el-date-picker>
        <span class="label">结束时间:</span>
        <el-date-picker type="datetime"
                        :clearable="false"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间"
                        size="small"
                        v-model="endDate"
                        style="width:160px;margin-right:10px;"></el-date-picker>

        <span class="label">性别:</span>
        <el-select v-model="sex"
                   placeholder="请选择"
                   size="small"
                   style="width:100px">
          <el-option v-for="item in sexList"
                     :label="item.name"
                     :value="item.code"
                     :key="item.name"></el-option>
        </el-select>

        <span class="label">是否隔离:</span>
        <el-select v-model="isolate"
                   placeholder="请选择"
                   size="small"
                   style="width:100px">
          <el-option v-for="item in isolateList"
                     :label="item.name"
                     :value="item.code"
                     :key="item.name"></el-option>
        </el-select>
        <span class="label">检查地点:</span>
        <el-select v-model="checkLocation"
                   placeholder="请选择"
                   size="small"
                   style="width:150px">
          <el-option v-for="item in checkLocationList"
                     :label="item.name"
                     :value="item.code"
                     :key="item.name"></el-option>
        </el-select>
      </div>
      <div class="head-con">

        <span class="label"
              style="margin-left: 0"> 途经疫区:</span>
        <el-select v-model="passEpidemicAreas"
                   placeholder="请选择"
                   size="small"
                   style="width:150px">
          <el-option v-for="item in passEpidemicAreasList"
                     :label="item.name"
                     :value="item.code"
                     :key="item.name"></el-option>
        </el-select>
        <span class="label">姓名:</span>
        <el-input size="small"
                  style="width: 150px;margin-right: 15px;"
                  placeholder="输入姓名搜索"
                  v-model="name"></el-input>

        <span class="label">身份证:</span>
        <el-input size="small"
                  style="width: 150px;margin-right: 15px;"
                  placeholder="输入身份证搜索"
                  v-model="idCard"></el-input>

        <span class="label">联系电话:</span>
        <el-input size="small"
                  style="width: 150px;margin-right: 15px;"
                  placeholder="输入联系电话搜索"
                  v-model="phone"></el-input>

        <div style="flex:1"></div>

        <el-button size="small"
                   type="primary"
                   @click="search">查询</el-button>
        <el-button size="small"
                   type="primary"
                   @click="exportExcel">导出</el-button>
      </div>
      <dTable :tableData="tableData"
              :pageLoadng="pageLoadng"></dTable>
      <div class="pagination-con"
           flex="main:justify cross:center">
        <pagination :pageIndex="page.pageIndex"
                    :size="page.pageNum"
                    :total="page.total"
                    @sizeChange="handleSizeChange"
                    @currentChange="handleCurrentChange"></pagination>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain
  margin 10px 10px 0px 10px
  .pagination-con
    height 41px
    position relative
    .pagination
      position absolute
      bottom 0
      left 0
      right 0
      background #eaeaea
      border 1px solid #cbd5dd
      padding 4px 15px
      background rgba(0, 0, 0, 0)
      z-index 1
    .right-part
      span
        margin-right 12px
        font-size 12px
        color #687179
        cursor pointer
        user-select none
        &.useLess
          color #999 !important
          cursor not-allowed
        input
          width 25px
          height 16px
          background #FFFFFF
          border 1px solid #CBD5DD
          border-radius 2px
          outline none
          text-align center
        &:hover
          color #333
.head-con
  height 42px
  display flex
  align-items center
  margin-bottom 5px
  .label
    font-size 13px
    margin-left 15px
    margin-right 5px
.select-btn-list
  height 30px
  padding-top 2px
  background #fff
  padding 0 16px
  >>>.el-radio__input
    position relative
    top 1px
  >>>.el-radio__label
    color #333
    font-size 12px
    position relative
    top 2px
</style>
<script>
import dTable from "./components/table/d-table";
import pagination from "./components/common/pagination";
import { patEmrList } from "@/api/document";
import { getListByParam, exportExcel } from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import { listItem } from '@/api/common.js'
import { fileDownload } from '@/utils/fileExport.js'
export default {
  mixins: [common],
  data() {
    return {
      tableData: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      },
      startDate: moment()
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss"),

      endDate: moment()
        .endOf("month")
        .format("YYYY-MM-DD HH:mm:ss"),

      checkLocation: '',
      passEpidemicAreas: '',
      name: '',
      sex: '',
      idCard: '',
      phone: '',
      status: '',
      isolate: '',
      checkLocationList: [],
      passEpidemicAreasList: [],
      sexList: [

        {
          name: '全部',
          code: ''
        },
        {
          name: '男',
          code: '男'
        },
        {
          name: '女',
          code: '女'
        },
      ],
      statusList: [
        {
          name: '全部',
          code: ''
        },
        {
          name: '已审核',
          code: '2'
        },
        {
          name: '未审核',
          code: '0'
        },
      ],
      isolateList: [
        {
          name: '全部',
          code: ''
        },
        {
          name: '隔离',
          code: true
        },
        {
          name: '不隔离',
          code: false
        }
      ]
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.onLoad();
    },

    onLoad() {
      this.pageLoadng = true;


      let obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD HH:mm:ss"),
        endDate: moment(this.endDate).format("YYYY-MM-DD HH:mm:ss"),
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageNum,
        checkLocation: this.checkLocation,
        passEpidemicAreas: this.passEpidemicAreas,
        name: this.name,
        sex: this.sex,
        idCard: this.idCard,
        phone: this.phone,
        status: this.status,
        isolate: this.isolate
      };
      getListByParam(obj).then(res => {
        this.tableData = res.data.data.list;
        this.page.total = Number(res.data.data.totalCount);
        this.pageLoadng = false;
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    },
    exportExcel() {
      let obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD HH:mm:ss"),
        endDate: moment(this.endDate).format("YYYY-MM-DD HH:mm:ss"),
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageNum,
        checkLocation: this.checkLocation,
        passEpidemicAreas: this.passEpidemicAreas,
        name: this.name,
        sex: this.sex,
        idCard: this.idCard,
        phone: this.phone,
        status: this.status,
        isolate: this.isolate
      };
      exportExcel(obj).then(res => {
        // console.log(res, 'aaa')
        // console.log(res.data, 'res.data')
        // console.log(res.data.type, 'res.data.type')
        fileDownload(res)
      })
    }
  },
  created() {
    listItem('dict_check_place').then(res => {
      this.checkLocationList = [{
        name: '全部',
        code: ''
      }, ...res.data.data]
    })
    listItem('dict_pass_epidemic_areas').then(res => {
      this.passEpidemicAreasList = [{
        name: '全部',
        code: ''
      }, ...res.data.data]
    })
    this.onLoad();
  },
  watch: {
    sex() {
      this.search();
    },
    status() {
      this.search();
    },
    checkLocation() {
      this.search();
    },
    passEpidemicAreas() {
      this.search();
    },
    isolate() {
      this.search();
    },
    startDate() {
      this.search();
    },
    endDate() {
      this.search();
    },
  },
  components: {
    dTable,
    pagination
  }
};
</script>
