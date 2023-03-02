<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <span class="label" style="margin-left: 0">执行日期:</span>
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择入院起始时间"
          size="small"
          v-model="startDate"
          style="width:120px"
        ></el-date-picker>
        <span class="label">长/临:</span>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="repeatIndicator">
            <el-radio class="radio" label>全部</el-radio>
            <el-radio class="radio" label="1">长嘱</el-radio>
            <el-radio class="radio" label="0">临嘱</el-radio>
          </el-radio-group>
        </el-row>
        <span class="label">状态:</span>
        <el-select
          v-model="status"
          placeholder="请选择"
          size="small"
          style="width:150px"
          v-if="type === 0"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in transfusionStatus"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-select
          v-model="status"
          placeholder="请选择"
          size="small"
          style="width:150px"
          v-else
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in allStatus"
            :key="item.id"
          ></el-option>
        </el-select>
        <span class="label">类型:</span>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width:150px"
        >
          <el-option
            :label="typeItem.name"
            :value="typeItem.value"
            v-for="typeItem in allType"
            :key="typeItem.id"
          ></el-option>
        </el-select>
        <div style="flex: 1"></div>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入床号进行搜索"
          v-model="bedLabel"
        ></el-input>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入住院号进行搜索"
          v-model="patientId"
        ></el-input>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入病人姓名进行搜索"
          v-model="patientName"
        ></el-input>
        <el-button size="small" type="primary" @click="search">查询</el-button>
      </div>
      <dTable
        :tableData="tableData"
        :currentType="type"
        :pageLoadng="pageLoadng"
        ref="plTable"
      ></dTable>
      <!-- <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>-->
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain {
  margin: 10px 10px 0px 10px;

  /deep/ *::-webkit-scrollbar {
    width: 15px;
    height: 15px;
    background-color: #eaeaea;
  }
  .pagination-con {
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
  >>> .plTableBox {
    .tree--btn-wrapper {
      position: absolute;
      top: 50%;
      width: 1em;
      height: 1em;
      line-height: 1em;
      margin-top: -.5em;
      transition: transform .2s ease-in-out;
      z-index: 1;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: #333!important;
      font-size: 16px;
      cursor: pointer;
    }
    .pl-tree-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      padding-left: 1.5em;
    }

    .el-icon-folder-add:before {
      font-family: element-icons;
      content: "\E61C";
    }
    .el-icon-folder-remove:before {
      font-family: element-icons;
      content: "\E619";
    }
    .ivu-table-cell-tree-empty {
      cursor: default;
      color: transparent;
      background-color: transparent;
      border-color: transparent;
    }
  }
}

.head-con {
  height: 42px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  .label {
    font-size: 13px;
    margin-left: 15px;
    margin-right: 5px;
  }
}

.select-btn-list {
  height: 30px;
  padding-top: 2px;
  background: #fff;
  padding: 0 16px;

  >>>.el-radio__input {
    position: relative;
    top: 1px;
  }

  >>>.el-radio__label {
    color: #333;
    font-size: 12px;
    position: relative;
    top: 2px;
  }
}
</style>
<script>
import dTable from "./components/table/d-table-nanfangzhongxiyi";
import pagination from "./components/common/pagination";
import { patEmrList } from "@/api/document";
import { getExecuteWithWardcode } from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import bus from "vue-happy-bus";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      pageInput: "",
      tableData: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      },
      startDate: moment().format("YYYY-MM-DD"),
      repeatIndicator: "",
      type: "",
      status: "",
      bedLabel: "",
      patientName: "",
      patientId: "",
      instructions:"",//医嘱内容
      administration: "", //途径
      transfusionStatus: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 0,
          name: "未执行"
        },
        {
          id: 1,
          name: "开始输液"
        },
        {
          id: 2,
          name: "暂停输液"
        },
        {
          id: 3,
          name: "继续输液"
        },
        {
          id: 4,
          name: "已完成"
        }
      ],
      allStatus: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 0,
          name: "未执行"
        },
        {
          id: 4,
          name: "已完成"
        }
      ],
      allType: [
        {
          name: "全部",
          value: ""
        },
        {
          name: "输液",
          value: "输液"
        },
        {
          name: "注射",
          value: "注射"
        },
        {
          name: "口服",
          value: "口服"
        },
        {
          name: "雾化",
          value: "雾化"
        },
        {
          name: "皮试",
          value: "皮试"
        },
        {
          name: "治疗（理疗）",
          value: "治疗（理疗）"
        },
        {
          name: "检查",
          value: "检查"
        },
        {
          name: "标本",
          value: "标本"
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
      if (!this.deptCode) return;
      this.pageLoadng = true;
      let obj = {
        wardCode: this.deptCode, //--护理单元代码 316放射科
        executeDateTime: moment(this.startDate).format("YYYY-MM-DD"), //--预计执行时间
        executeType: this.type, //--类型:注射 ,输液, 口服 ,雾化, 皮试 ,标本, 输血,
        bedLabel: this.bedLabel, //--床号
        patientName: this.patientName, //--患者姓名
        patientId: this.patientId,//住院号
        repeatIndicator: this.repeatIndicator, //--医嘱类型:长期 ,临时
        executeStatus: this.status //状态:默认空查询全部  null未执行  1是执行中  2暂停 3 停止~~~~  4已执行
      };
      let children = [];
      getExecuteWithWardcode(obj).then(res => {
        this.tableData = res.data.data.map((item, index, array) => {
          let prevRowId =
            array[index - 1] &&
              array[index - 1].patientId +
              array[index - 1].barCode;
          let nextRowId =
            array[index + 1] &&
            array[index + 1].patientId +
              array[index + 1].barCode ;

          let currentRowId =
            array[index] &&
            array[index].patientId +
              array[index].barCode ;
          /** 判断是此记录是多条记录 */
          if (currentRowId == prevRowId || currentRowId == nextRowId) {
            let data = { ...item, rowType: '' }
            if (currentRowId != prevRowId) {
              /** 第一条 */
              data.rowType = 1;
              children.push(data);
              data.children = children;
            } else if (currentRowId != nextRowId) {
              /** 最后条 */
              data.rowType = 3;
              children.push(data);
              children = [];
            } else {
              /** 中间条 */
              data.rowType = 2;
              children.push(data);
            }
            return data
          }
          return item;
        });
        // this.page.total = Number(res.data.data.pageCount) * this.page.pageNum;
        console.log('this.tableData',this.tableData);
        this.pageLoadng = false;
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    }
  },
  created() {
    this.onLoad();
    this.bus.$on("loadImplementationList", () => {
      this.onLoad();
    });
  },
  watch: {
    deptCode() {
      this.search();
    },
    startDate() {
      this.search();
    },
    repeatIndicator() {
      this.search();
    },
    type(newVal, oldVal) {
      if (oldVal == "输液") {
        this.status = "";
      }
      this.search();
    },
    status() {
      this.search();
    }
  },
  components: {
    dTable,
    pagination
  }
};
</script>
