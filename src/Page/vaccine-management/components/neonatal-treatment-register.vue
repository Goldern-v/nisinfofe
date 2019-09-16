<template>
  <div class="neonatal-treatment-register">
    <div class="search-topbar">
      <div class="float-left">
        <span class="filterItem date">
          <span class="type-label">执行日期：</span>
          <ElDatePicker
            class="date-picker"
            type="datetime"
            size="small"
            format="yyyy-MM-dd HH:mm"
            placeholder="开始日期"
            v-model="query.startTime"
            clearable
          />
          <span>-</span>
          <ElDatePicker
            class="date-picker"
            type="datetime"
            size="small"
            format="yyyy-MM-dd HH:mm"
            placeholder="结束日期"
            v-model="query.endTime"
            clearable
          />
        </span>
        <el-button @click="handleSearch">查询</el-button>
        <el-button>打印</el-button>
      </div>
    </div>
    <div class="content">
      <h3>产科新生儿治疗登记本</h3>
      <div class="table-container" v-loading="page1Loading">
        <div class="table">
          <table cellspacing="0">
            <colgroup>
              <col width="75" />
              <col width="45" />
              <col width="50" />
              <col width="60" />
              <col width="60" />
              <col width="60" />
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2">日期</th>
                <th rowspan="2">时间</th>
                <th colspan="4">乙肝疫苗</th>
                <th class="scrollBlock" v-if="table1"></th>
              </tr>
              <tr>
                <th>床号</th>
                <th>产妇姓名</th>
                <th>疫苗批号</th>
                <th>执行签名</th>
                <th class="scrollBlock" v-if="table1"></th>
              </tr>
            </thead>
          </table>
          <div>
            <table cellspacing="0" ref="table1">
              <colgroup>
                <col width="75" />
                <col width="45" />
                <col width="50" />
                <col width="60" />
                <col width="60" />
                <col width="60" />
              </colgroup>
              <tbody>
                <tr v-for="(item,index1) in tableData1" :key="index1">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <!-- <tr>
                  <td>2019-01-01</td>
                  <td>10:00</td>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>2019-01-01</td>
                  <td>10:00</td>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>2019-01-01</td>
                  <td>10:00</td>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>2019-01-01</td>
                  <td>10:00</td>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>2019-01-01</td>
                  <td>10:00</td>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>-->
              </tbody>
            </table>
            <nullText v-show="tableData1.length == 0"></nullText>
          </div>
        </div>

        <div class="table">
          <table cellspacing="0">
            <colgroup>
              <col width="50" />
              <col width="60" />
              <col width="60" />
              <col width="60" />
            </colgroup>
            <thead>
              <tr>
                <th colspan="4">卡介苗</th>
                <th class="scrollBlock" v-if="table2"></th>
              </tr>
              <tr>
                <th>床号</th>
                <th>产妇姓名</th>
                <th>疫苗批号</th>
                <th>执行签名</th>
                <th class="scrollBlock" v-if="table2"></th>
              </tr>
            </thead>
          </table>
          <div>
            <table cellspacing="0" ref="table2">
              <colgroup>
                <col width="50" />
                <col width="60" />
                <col width="60" />
                <col width="60" />
              </colgroup>
              <tbody>
                <tr v-for="(item,index2) in tableData2" :key="index2">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <!-- <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>293929</td>
                  <td>李小花</td>
                </tr>-->
              </tbody>
            </table>
            <nullText v-show="tableData2.length == 0"></nullText>
          </div>
        </div>

        <div class="table">
          <table cellspacing="0">
            <colgroup>
              <col width="50" />
              <col width="60" />
              <col width="70" />
              <col width="60" />
            </colgroup>
            <thead>
              <tr>
                <th colspan="4">疾病筛查</th>
                <th class="scrollBlock" v-if="table3"></th>
              </tr>
              <tr>
                <th>床号</th>
                <th>产妇姓名</th>
                <th>套餐</th>
                <th>执行签名</th>
                <th class="scrollBlock" v-if="table3"></th>
              </tr>
            </thead>
          </table>
          <div>
            <table cellspacing="0" ref="table3">
              <colgroup>
                <col width="50" />
                <col width="60" />
                <col width="70" />
                <col width="60" />
              </colgroup>
              <tbody>
                <tr v-for="(item,index3) in tableData3" :key="index3">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <!-- <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>-->
              </tbody>
            </table>
            <nullText v-show="tableData3.length == 0"></nullText>
          </div>
        </div>

        <div class="table">
          <table cellspacing="0">
            <colgroup>
              <col width="50" />
              <col width="60" />
              <col width="80" />
              <col width="60" />
            </colgroup>
            <thead>
              <tr>
                <th colspan="4">听力筛查</th>
                <th class="scrollBlock" v-if="table4"></th>
              </tr>
              <tr>
                <th>床号</th>
                <th>产妇姓名</th>
                <th>套餐</th>
                <th>执行签名</th>
                <th class="scrollBlock" v-if="table4"></th>
              </tr>
            </thead>
          </table>
          <div>
            <table cellspacing="0" ref="table4">
              <colgroup>
                <col width="50" />
                <col width="60" />
                <col width="80" />
                <col width="60" />
              </colgroup>
              <tbody>
                <tr v-for="(item,index4) in tableData4" :key="index4">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <!-- <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>王萌萌</td>
                  <td>自费：A餐</td>
                  <td>李小花</td>
                </tr>-->
              </tbody>
            </table>
            <nullText v-show="tableData4.length == 0"></nullText>
          </div>
        </div>
      </div>
    </div>
    <pagination
      :pageIndex="query.pageIndex"
      :size="query.pageSize"
      :total="total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    ></pagination>
  </div>
</template>
<style lang='scss' scoped>
.neonatal-treatment-register {
  position: relative;
  .search-topbar {
    height: 41px;
    border-bottom: 1px solid #cbd5dd;
    overflow: hidden;
    padding: 5px 14px 5px 20px;
    background: linear-gradient(
      180deg,
      rgba(248, 248, 250, 1) 0%,
      rgba(235, 236, 240, 1) 100%
    );
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-date-editor.el-input {
    width: 154px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    input {
      height: 30px;
      border-radius: 4px;
      border: 1px solid rgba(194, 203, 210, 1);
      vertical-align: middle;
    }
  }
  .type-label {
    font-size: 12px;
    color: #333;
    vertical-align: middle;
  }
  .el-input {
    width: 110px;
  }
  input {
    width: 110px;
    height: 31px;
    border-radius: 4px;
  }
  button {
    font-size: 12px;
    width: 60px;
    height: 30px;
    border-radius: 4px;
  }
  .content {
    padding: 16px 14px 56px 14px;
    h3 {
      font-size: 18px;
      line-height: 31px;
      text-align: center;
      padding-bottom: 10px;
    }
    .table-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border: 1px solid #cbd5dd;
      border-bottom: none;
      border-radius: 2px;
      .table {
        > div {
          height: calc(100vh - 291px);
          overflow: auto;
          border-left: 1px solid #cbd5dd;
          border-right: 1px solid #cbd5dd;
        }
        thead {
          tr {
            &:first-of-type {
              th {
                border-top: none;
              }
            }
          }
        }
        &:first-of-type {
          > div {
            border-left: none;
          }
          tr {
            th,
            td {
              border-left: none;
            }
          }
        }
        &:last-of-type {
          > div {
            border-right: none;
          }
          tr {
            th,
            td {
              border-right: none;
            }
          }
        }
        tbody {
          tr {
            &:first-of-type {
              td {
                border-top: none;
              }
            }
          }
        }
      }
      table {
        width: 100%;
        background: #fff;
        th,
        td {
          font-size: 13px;
          color: #333;
          text-align: center;
          border: 1px solid #cbd5dd;
          height: 38px;
          vertical-align: middle;
        }
        th {
          background-color: #eef6f5;
        }
        tr {
          td {
            &:last-of-type {
              border-right: none;
            }
          }
        }
      }
    }
  }
  .pagination {
    position: absolute;
    bottom: 16px;
    left: 14px;
    right: 14px;
    background: linear-gradient(
      180deg,
      rgba(242, 242, 242, 1) 0%,
      rgba(235, 235, 235, 1) 100%
    );
    border: 1px solid #cbd5dd;
    padding: 4px 15px;
    z-index: 1;
  }
  .scrollBlock {
    width: 5px;
    padding: 0 !important;
  }
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import nullText from "@/components/null/null-text.vue";
import pagination from "./pagination";
export default {
  props: {},
  mixins: [common],
  data() {
    return {
      query: {
        startTime: "", //检查日期开始日期格式为（格式为yyyy-MM-dd HH:mm:ss）
        endTime: "", //检查日期结束日期（格式为yyyy-MM-dd HH:mm:ss）
        pageIndex: 1, //页码
        pageSize: 20 //每页条数
      },
      total: 0, //总条数
      table1: false, //是否table1内容出现滚动条
      table2: false, //是否table2内容出现滚动条
      table3: false, //是否table3内容出现滚动条
      table4: false, //是否table3内容出现滚动条
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      page1Loading: false
    };
  },
  mounted() {
    this.tablesHeight();
  },
  updated() {
    this.tablesHeight();
  },
  methods: {
    tablesHeight() {
      try {
        let tableHeight = this.wih - 295;
        this.table1 =
          this.$refs.table1.clientHeight > tableHeight ? true : false;
        this.table2 =
          this.$refs.table2.clientHeight > tableHeight ? true : false;
        this.table3 =
          this.$refs.table3.clientHeight > tableHeight ? true : false;
        this.table4 =
          this.$refs.table4.clientHeight > tableHeight ? true : false;
      } catch (e) {}
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.query.pageIndex = newPage;
      // this.setTableData();
    },
    // 查询
    handleSearch() {
      this.query.pageIndex = 1;
      this.query.pageSize = 20;
      // this.setTableData();
    }
  },
  components: {
    nullText,
    pagination
  }
};
</script>