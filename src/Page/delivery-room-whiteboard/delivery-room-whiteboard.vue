<template>
  <div class="contains">
    <div class="main-content" flex="main:justify">
      <div class="content-center" flex-box="2">
        <table cellspacing="0" border="1" class="tables">
          <colgroup>
            <col width="200" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th colspan="2">
                <img src="./images/留言板.png" />
                <span>产房患者特殊情况记录表</span>
                <span class="save" @click="saveOrUpdateDescription">保存</span>
              </th>
            </tr>
          </thead>
        </table>
        <div class="table-con" v-loading="page2Loading">
          <table cellspacing="0" border="1" class="table1" ref="table2">
            <colgroup>
              <col width="100" />
              <col />
            </colgroup>
            <tbody>
              <tr v-for="item in descriptionList" :key="item.patientId">
                <td>
                  <span>{{item.bedLabel}}床 {{item.name}}</span>
                </td>
                <td>
                  <div class="auto-input">{{item.description}}</div>
                  <textarea v-model="item.description"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="descriptionList.length == 0"></nullText>
        </div>
      </div>
      <div class="content-right" flex-box="1">
        <right2 :data="warmTips" ref="right2"></right2>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment"); //使用时间插件
import Cookie from "js-cookie";
import {
  getListDescription,
  saveOrUpdateDescription,
  getListMessage,
  saveOrUpdateMessage
} from "./api/";
import { TSNeverKeyword } from "babel-types";
import common from "@/common/mixin/common.mixin.js";
import nullText from "@/components/null/null-text.vue";
import right2 from "./components/right2.vue";
import { clearTimeout } from "timers";
export default {
  mixins: [common],
  provide() {
    return {
      update: this.update
    };
  },
  components: {
    nullText,
    right2
  },
  data() {
    return {
      descriptionList: [], //产房患者特殊情况记录表
      centerDialogVisible1: false, //显示table1弹窗
      centerDialogVisible2: false, //显示table2弹窗
      table1: false, //是否table1内容出现滚动条
      table2: false, //是否table2内容出现滚动条
      page1Loading: false,
      page2Loading: false,
      warmTips: {} //温馨提示
    };
  },
  methods: {
    init() {
      if (!this.deptCode) return;
      let time = moment().format("L");
      let data = Cookie.get("NURSING_USER") || "";
      if (!data) {
        window.location.href = "/login";
      }
      // this.page1Loading = true;

      this.getListDescription();
      this.getListMessage();
    },
    // getListDescription
    saveOrUpdateDescription() {
      let query = {
        wardCode: "051102_01" || this.deptCode,
        nursePatsInHospitalBornDescriptions: []
      };

      let flag = false;
      query.nursePatsInHospitalBornDescriptions = this.descriptionList.map(
        item => {
          if (!flag && item.description.length > 1000) {
            flag = true;
            this.$message({
              type: "warning",
              message:
                item.bedLabel +
                "床 " +
                item.name +
                " 特殊情况记录最多只能填写1000字"
            });
          }
          let obj = {
            patientId: item.patientId,
            visitId: item.visitId,
            wardCode: "051102_01" || this.deptCode,
            bedLabel: item.bedLabel,
            description: item.description
          };
          return obj;
        }
      );
      if (flag) {
        return;
      }
      saveOrUpdateDescription(query).then(res => {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.getListDescription();
      });
    },
    // 获取产房患者特殊情况记录表
    getListDescription() {
      this.page2Loading = true;
      getListDescription().then(res => {
        this.descriptionList = res.data.data;
        this.page2Loading = false;
      });
    },
    // 获取留言板信息
    getListMessage() {
      let timeId;
      getListMessage().then(res => {
        this.warmTips = res.data.data;
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          try {
            this.$refs.right2.isSave = true;
          } catch (error) {}
        }, 300);
      });
    },

    tablesHeight() {
      try {
        let tableHeight = this.wih - 210;
        this.table1 =
          this.$refs.table1.clientHeight > tableHeight ? true : false;
        this.table2 =
          this.$refs.table2.clientHeight > tableHeight ? true : false;
      } catch (e) {}
    },
    update(message) {
      let query = {
        wardCode: "051102_01",
        message: message
      };
      // 保存温馨提示
      return saveOrUpdateMessage(query).then(res => {
        this.getListMessage();
      });
    }
  },
  mounted() {
    this.tablesHeight();
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
  padding: 10px 10px 0px;

  .main-content {
    padding: 0 0px;

    .table-con {
      background: #fff;
    }

    .content-center {
      margin: 0 12px;
    }

    .content-center {
      width: 0;
      position: relative;

      img {
        height: 21px;
        margin-right: 2px;
        vertical-align: bottom;
      }

      .auto-input {
        font-size: 13px;
        line-height: 18px;
        width: 100%;
        min-height: 20px;
      }

      textarea {
        font-size: 13px;
        color: #333;
        line-height: 18px;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        outline: none;
        padding: 10px 8px;
        border: none;
        resize: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }

      .tables {
        font-size: 13px;
        text-align: left;
        width: 100%;

        & > thead > tr {
          color: #333333;
          font-size: 14px;
          background: #F7FAFA;

          & > th {
            padding: 0px 7px;
            height: 43px;
            font-size: 13px;
            vertical-align: middle;
            border: 1px solid #e3e7ea;
            border-bottom: none;

            span {
              display: inline-block;
              vertical-align: middle;
              line-height: 21px;
            }

            .save {
              float: right;
              margin-right: 10px;
              font-size: 12px;
              color: #333;
              font-weight: normal;
              height: 21px;
              line-height: 22px;
              border: 1px solid #cbd5dd;
              border-radius: 2px;
              padding: 0 8px;
              text-decoration: none;
              background-color: #fff;
              cursor: pointer;
            }
          }
        }
      }

      & > div {
        height: calc(100vh - 120px);
        overflow: auto;

        .table1 {
          width: 100%;

          th, td {
            border: 1px solid #e3e7ea;
          }

          & > tbody > tr {
            & > td {
              font-size: 13px;
              line-height: 18px;
              padding: 10px 8px;
              color: #333333;
              position: relative;
              overflow: hidden;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}

.scrollBlock {
  width: 5px;
  padding: 0 !important;
}

.contains .content-right {
  width: 0;
  position: relative;
  max-height: calc(100vh - 80px);
}
</style>
