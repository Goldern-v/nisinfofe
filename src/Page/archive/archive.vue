<template>
  <div class="archive">
    <div class="toolbar">
      <div class="filterItem date">
        <span>出院时间:</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="query.dischargeDateBegin"
          clearable
        />
        <span>-</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="结束日期"
          v-model="query.dischargeDateEnd"
          clearable
        />
      </div>
      <div class="filterItem">
        <button @click.stop="getArchiveList">查询</button>
      </div>
    </div>
    <div class="contains">
      <div class="main-content" flex="main:justify">
        <div class="content-center" flex-box="1">
          <table cellspacing="0" border="1" class="tables">
            <colgroup>
              <col width="228" />
              <col />
              <col width="200" />
              <col width="150" />
            </colgroup>
            <thead>
              <tr>
                <th>患者</th>
                <th>归档内容</th>
                <th>时间</th>
                <th>操作</th>
                <th class="scrollBlock" v-if="table2"></th>
              </tr>
            </thead>
          </table>
          <div class="table-con" v-loading="page2Loading" :style="{height: wih - 210+'px'}">
            <table cellspacing="0" border="1" class="table1" ref="table2">
              <colgroup>
                <col width="228" />
                <col />
                <col width="200" />
                <col width="150" />
              </colgroup>
              <tbody>
                <tr v-for="(item,index) in patientArchiveList" :key="index" class="data-row">
                  <td>{{item.patientId}}</td>
                  <td></td>
                  <td>{{item.updateTime}}</td>
                  <td>
                    <div>
                      <!-- 打印生成pdf文件 -->
                      <span
                        @click="generateArchive(item)"
                        v-if="item.printStatus!=1 && item.resultStatus!=1"
                      >转pdf</span>
                      <span
                        class="viewFile"
                        @click="previewArchive(item)"
                        v-if="item.resultStatus==1"
                      >预览</span>
                      <!-- 上传 -->
                      <span
                        @click="uploadFileArchive(item)"
                        v-if="item.resultStatus==1 && item.uploadStatus!=1 && item.uploadStatus!=2"
                      >归档</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <nullText v-show="patientArchiveList.length == 0"></nullText>
          </div>
        </div>
      </div>
    </div>
    <info1modal ref="info1modal" :getArchiveList="getArchiveList"></info1modal>
    <pagination
      :pageIndex="query.pageIndex"
      :size="query.pageSize"
      :total="total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    ></pagination>
    <sweet-modal ref="preview-modal" class="archive-preview-modal" :title="preview.title">
      <!-- <div v-if="preview.type=='img'">
        <img :src="preview.url" alt style="width:100%" />
      </div>-->
      <div class="arrow" v-if="printDetailList && printDetailList.length">
        <span
          class="el-icon-arrow-left"
          @click="preveFile"
          :style="!currentFileIndex && {opacity:0.5}"
        ></span>
        <span
          class="el-icon-arrow-right"
          @click="nextFile"
          :style="currentFileIndex == printDetailList.length - 1 && {opacity:0.5}"
        ></span>
      </div>

      <div v-if="preview.type=='pdf'" :style="{height: pdfHeight+'px'}">
        <iframe width="100%" height="100%" :src="preview.url" />
      </div>
      <!-- <div v-else style="height: 300px;text-align:center;line-height:300px;">该文件格式不支持预览，请在app内查看</div> -->
    </sweet-modal>
  </div>
</template>

<script>
var moment = require("moment"); //使用时间插件
import Cookie from "js-cookie";
import { getArchiveList, generateArchive, previewArchive } from "./api/index";
import { TSNeverKeyword } from "babel-types";
import common from "@/common/mixin/common.mixin.js";
import nullText from "@/components/null/null-text.vue";
import info1modal from "./modal/info-1-modal.vue";
import mixin from "./mixins";
import pagination from "@/components/pagination/pagination.vue";
export default {
  mixins: [common, mixin],
  components: {
    nullText,
    info1modal,
    pagination
  },
  data() {
    return {
      page2Loading: false,
      preview: {
        type: "",
        name: "",
        url: ""
      },
      table2: false,
      pdfHeight: window.innerHeight * 0.8,
      query: {
        pageSize: 20,
        pageIndex: 1,
        dischargeDateBegin: "",
        dischargeDateEnd: "",
        wardCode: ""
      },
      total: 1,
      patientArchiveList: [], //科室患者归档列表
      currentFileIndex: 0, //当前预览pdf索引
      printDetailList: "" //归档详情
    };
  },
  methods: {
    uploadFileArchive(item) {
      this.$refs.info1modal.open(item);
    },
    init() {
      if (!this.deptCode) return;
      let time = moment().format("L");
      let data = Cookie.get("NURSING_USER") || "";
      if (!data) {
        window.location.href = "/login";
      }
      try {
        let user = window.localStorage.getItem("user");
        this.user.name = JSON.parse(user).empName;
      } catch (error) {}

      this.page2Loading = true;
      this.getArchiveList();
    },
    tablesHeight() {
      try {
        let tableHeight = this.wih - 210;
        this.table2 =
          this.$refs.table2.clientHeight > tableHeight ? true : false;
      } catch (e) {}
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.query.pageIndex = newPage;
      this.getArchiveList();
    },
    //科室患者归档列表
    getArchiveList() {
      // printStatus 打印状态:0=未执行；1=执行中；2=打印结束
      // resultStatus 打印结果：-1=失败；0=未有结果；1=成功
      // uploadStatus 上传状态：-1=上传失败；0=未上传；1=上传中；2=上传成功
      // 转pdf按钮(打印生成pdf文件)： printStatus!=1 && resultStatus!=1
      // 预览按钮: resultStatus ==1
      // 归档按钮（上传）: item.resultStatus==1 && item.uploadStatus!=1 && item.uploadStatus!=2
      this.query.wardCode = this.deptCode;
      getArchiveList(this.query).then(res => {
        this.patientArchiveList = res.data.data;
        this.total = this.patientArchiveList.length || 0;
        this.page2Loading = false;
      });
    },
    // 生成归档文件
    generateArchive(item) {
      generateArchive(item.patientId, item.visitId).then(rep => {
        // this.$message({
        //   type: "success",
        //   message: "文件上传成功"
        // });
        this.getArchiveList();
      });
    },
    // 预览归档文件
    previewArchive(item) {
      this.currentFileIndex = 0;
      this.printDetailList = "";
      previewArchive(item.patientId, item.visitId).then(res => {
        // this.$message({
        //   type: "success",
        //   message: "文件上传成功"
        // });
        this.printDetailList = res.data.data.printDetailList;

        this.previewFile();
      });
    },

    previewFile() {
      // this.preview.type='pdf';
      // this.preview.title= printDetailList.formName +'/'+seqment;
      // this.preview.url= printDetailList[0].filePath;

      // this.preview = {
      //   title: printDetailList.formName +'/'+seqment,
      //   url: `/crNursing/asset/deptShareFile${scope.path}`,
      //   type: this.previewType(type)
      // };
      if (this.printDetailList) {
        this.preview = {
          title:
            this.printDetailList[this.currentFileIndex].formName +
            "/" +
            this.printDetailList[this.currentFileIndex].seqment,
          url: this.printDetailList[this.currentFileIndex].filePath,
          // url:
          //   "/crNursing/asset/deptShareFile/20190719/201907191941146riPfqBB.pdf",
          type: "pdf"
        };

        this.$refs["preview-modal"].open();
        this.pdfHeight = window.innerHeight * 0.8;
      }
    },
    // 上一个文件
    preveFile() {
      if (this.currentFileIndex > 0) {
        this.currentFileIndex--;
        this.previewFile();
      }
    },
    // 下一个文件
    nextFile() {
      if (this.currentFileIndex < this.printDetailList.length - 1) {
        this.currentFileIndex++;
        this.previewFile();
      }
    }
  },
  mounted() {
    this.tablesHeight();
    if (!this.query.dischargeDateBegin) {
      let month = parseInt(new Date().getMonth()) + 1;
      month = month < 10 ? "-0" + month : "-" + month;
      let day = parseInt(new Date().getDate()) - 2;
      day = day < 10 ? "-0" + day : "-" + day;
      this.query.dischargeDateBegin =
        parseInt(new Date().getFullYear()) - 3 + month + day;
    }
    this.query.dischargeDateEnd = this.query.dischargeDateEnd
      ? this.query.dischargeDateEnd
      : moment().format("YYYY-MM-DD");
  },
  updated() {
    this.tablesHeight();
  },
  created() {
    this.init();
  },
  watch: {
    deptCode() {
      this.init();
    }
  }
};
</script>

<style lang="stylus" scoped>
.contains {
  >>> .el-dialog__header {
    padding: 15px 20px 15px !important;
    font-family: PingFangSC-Regular !important;
    font-size: 13px !important;
    border-radius: 4px !important;
    background: #F7FAFA !important;
    color: #333333 !important;
    letter-spacing: 0;
  }
}

>>> .el-dialog__headerbtn {
  font-size: 13px !important;
  font-family: PingFangSC-Regular !important;
}

>>> .el-dialog__title {
  font-size: 14px !important;
  font-family: PingFangSC-Regular !important;
  color: #333 !important;
}

>>> .el-dialog__body {
  padding: 30px 40px 10px;

  & > div > div {
    margin-bottom: 24px !important;
    font-family: PingFangSC-Regular !important;
    color: #687179 !important;
    letter-spacing: 0 !important;
    clear: both;

    & > div {
      color: #333 !important;
      float: right;
      display: inline-block;
      width: 206px;
      margin-bottom: 10px;
      line-height: 18px;
      vertical-align: top;
      font-family: PingFangSC-Regular !important;
    }
  }
}

>>> .el-dialog__footer {
  padding: 10px 20px 10px;
  font-family: PingFangSC-Regular !important;
  text-align: center;
  box-sizing: border-box;
  background: #F7FAFA;
  border-radius: 4px !important;
}

>>>.el-dialog--small {
  width: 27% !important;
  top: 20% !important;
  font-family: PingFangSC-Regular !important;
  background: #FFFFFF !important;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5) !important;
  border-radius: 4px !important;
}

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

    button {
      display: inline-block;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 30px;
      font-size: 12px;
      color: #333;
      background: #fff;
      border: 1px solid #cbd5dd;
      border-radius: 2px;
      box-sizing: border-box;
      outline: none;
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }
    }
  }

  .filterItem:last-child {
    flex: 1;
    margin-right: 0;
  }
}

.contains {
  padding: 10px 10px 0px;

  .main-content {
    padding: 0 0px;

    .table-con {
      background: #fff;
      border-bottom: 1px solid #E3E7EA;
    }

    .content-center {
      width: 0;
      position: relative;

      .tables {
        font-size: 13px;
        text-align: left;
        width: 100%;

        & > thead > tr {
          background: #F7FAFA;

          & > th {
            padding: 0px 7px;
            height: 35px;
            border: 1px solid #E3E7EA;
            vertical-align: middle;
            text-align: center;
          }

          &:first-child {
            color: #333333;
            font-size: 14px;
            height: 40px;

            & > th {
              & > span {
                vertical-align: middle;
              }

              & > img {
                vertical-align: middle;
                position: relative;
                top: -2px;
              }
            }
          }

          &:last-child {
            color: #687179;
            font-size: 13px;
          }
        }
      }

      & > div {
        // height: calc(100vh - 159px);
        overflow: auto;

        .table1 {
          width: 100%;

          & > tbody > tr {
            &:hover {
              background: #EEF6F5;
            }

            &:last-of-type {
              td {
                border-bottom: 0;
              }
            }

            & > td {
              font-size: 13px;
              padding: 0 8px;
              color: #333333;
              border: 1px solid #E3E7EA;
              border-top: 0;
              height: 35px;
              vertical-align: middle;

              &:last-of-type {
                > div {
                  display: flex;
                  justify-content: space-around;
                  align-items: center;

                  span {
                    flex: 1;
                    color: #4bb08d;
                    padding: 10px 0;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.scrollBlock {
  width: 6px;
  padding: 0 !important;
}

.arrow {
  // position: fixed;
  // width: 100%;
  // height: 100%;
  // top: 0;
  // left: 0;
  // z-index: 10002;
  .el-icon-arrow-left, .el-icon-arrow-right {
    font-size: 40px;
    position: fixed;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.4);
    padding: 10px;
    color: #c4bebe;
    border-radius: 4px;
    cursor: pointer;
    z-index: 10002;
  }

  .el-icon-arrow-left {
    left: -150px;
  }

  .el-icon-arrow-right {
    right: -150px;
  }
}
</style>
<style lang="stylus">
.archive-preview-modal {
  .sweet-modal {
    width: 900px;
    overflow: visible;
  }

  .sweet-content {
    max-height: none;
  }
}
</style>
