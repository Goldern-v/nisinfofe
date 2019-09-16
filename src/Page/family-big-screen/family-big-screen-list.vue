<template>
  <div class="contains">
    <div class="main-content" flex="main:justify">
      <div class="content-left" flex-box="1">
        <table cellspacing="0" border="1" class="tables" ref="table-head">
          <colgroup>
            <col width="80" />
            <col width="100" />
            <col width="100" />
            <col width="140" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="4">
                <img src="./images/women.png" />
                <span>当前产妇列表</span>
                <span class="sum">共{{data.length}}个床位</span>
              </th>
              <th class="scrollBlock" v-if="table1"></th>
            </tr>
            <tr>
              <th>床号</th>
              <th>姓名</th>
              <th>分娩情况</th>
              <th>分娩时间</th>
              <th class="scrollBlock" v-if="table1"></th>
            </tr>
          </thead>
        </table>
        <div class="table-con" v-loading="page1Loading">
          <table cellspacing="0" border="1" class="table1" ref="table1">
            <colgroup>
              <col width="80" />
              <col width="100" />
              <col width="100" />
              <col width="140" />
            </colgroup>
            <tbody ref="table-tbody">
              <tr
                v-for="(item,index) in data"
                :key="index"
                class="data-row"
                :class="{blue:item.bornStatus && item.bornStatus.includes('分娩')}"
              >
                <td>{{item.bedLabel}}</td>
                <td>{{item.name}}</td>
                <td>{{item.bornStatus}}</td>
                <td>{{item.bornTime}}</td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="data.length == 0"></nullText>
        </div>
      </div>
      <div class="content-center" flex-box="1">
        <table cellspacing="0" border="1" class="tables">
          <colgroup>
            <col width="60" />
            <col />
            <col width="130" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="4">
                <img src="./images/video.png" />
                <span>视频播放列表</span>
                <span class="sum" v-if="videoList">共{{videoList.length}}个视频</span>
                <router-link to="/familyBigScreen/videoListSetting" class="videoSetting">配置</router-link>
              </th>
            </tr>
            <tr>
              <th>序号</th>
              <th>视频名称</th>
              <th style="text-align: center;">操作</th>
              <th class="scrollBlock" v-if="table2"></th>
            </tr>
          </thead>
        </table>
        <div class="table-con" v-loading="page2Loading">
          <table cellspacing="0" border="1" class="table1" ref="table2">
            <colgroup>
              <col width="60" />
              <col />
              <col width="130" />
            </colgroup>
            <tbody>
              <tr v-for="(item,index) in videoList" :key="index" class="data-row">
                <td>{{index+1}}</td>
                <td :class="{active:item.status == 1}">
                  <span v-if="item.status == 1">
                    <img src="./images/playing_logo.png" />
                  </span>
                  {{item.videoName}}
                </td>
                <td>
                  <span
                    v-if="item.status ==0 || item.status ==2"
                    @click="startAndStopVideo(item.id,1)"
                  >
                    <img src="./images/playing.png" />
                  </span>
                  <span v-if="item.status == 1" @click="startAndStopVideo(item.id,2)">
                    <img src="./images/pause_btn.png" />
                  </span>
                  <span v-if="item.status == 1" @click="startAndStopVideo(item.id,0)">
                    <img src="./images/stop_btn.png" />
                  </span>
                  <span>
                    <img src="./images/up_btn.png" @click="moveUpVideo(item.id)" />
                  </span>
                  <span>
                    <img src="./images/down_btn.png" @click="moveDownVideo(item.id)" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="videoList.length == 0"></nullText>
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
  getPlayList,
  startAndStopVideo,
  moveUpVideo,
  moveDownVideo,
  saveWarmTips,
  getWarmTips,
  getBornPatients
} from "./api/index-xin";
import { TSNeverKeyword } from "babel-types";
import common from "@/common/mixin/common.mixin.js";
import nullText from "@/components/null/null-text.vue";
import mixin from "./mixins";
import right2 from "./components/right2.vue";
import { clearTimeout } from "timers";
export default {
  mixins: [common, mixin],
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
      data: [], //产妇列表
      videoList: [], //视频列表
      centerDialogVisible1: false, //显示table1弹窗
      centerDialogVisible2: false, //显示table2弹窗
      table1: false, //是否table1内容出现滚动条
      table2: false, //是否table2内容出现滚动条
      page1Loading: false,
      page2Loading: false,
      warmTips: {
        message: ""
      }, //温馨提示
      bornPatientList: [],
      isFlag: false,
      timeId2: "",
      tbodyH: ""
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

      this.getPlayList();
      this.getWarmTips();
      this.getBornPatients();
    },
    updateTips(index, rowH, isFlag2) {
      let num = Math.floor(this.tbodyH / rowH);
      let sum = this.bornPatientList.length;
      if (num <= sum) {
        this.data = [...this.bornPatientList];
        if (this.isFlag && isFlag2) {
          this.getBornPatients();
        }
      } else if (index * num > sum - 1 && this.isFlag && isFlag2) {
        this.getBornPatients();
      } else {
        this.data = [...this.bornPatientList.slice(index * num, num)];
      }
    },
    // 获取产科家属白板
    getBornPatients() {
      this.isFlag = false;
      getBornPatients()
        .then(res => {
          this.isFlag = true;
          if (res.data && res.data.code == 200) {
            this.bornPatientList = res.data.data;
          }
          if (this.bornPatientList && this.bornPatientList.length) {
            this.noTableData = false;
          } else {
            this.noTableData = true;
          }

          if (this.$refs["table-tbody"] && this.$refs["table-head"]) {
            this.tbodyH =
              window.innerHeight - this.$refs["table-tbody"].offsetTop;
            let rowH = this.$refs["table-head"].offsetHeight;
            let index = 0;
            this.updateTips(index, rowH);
            clearInterval(this.timeId2);
            this.timeId2 = setInterval(() => {
              // 10s刷新一次列表数据
              ++index;
              this.updateTips(index, rowH, true);
            }, 10 * 1000);
          }
        })
        .catch(err => {
          this.isFlag = true;
          this.noTableData = true;
        });
    },
    // 获取播放列表
    getPlayList() {
      this.page2Loading = true;
      getPlayList().then(res => {
        this.videoList = res.data.data;
        this.page2Loading = false;
      });
    },
    // 家属大屏-播放|停止|暂停
    startAndStopVideo(id, actionType) {
      startAndStopVideo(id, actionType).then(res => {
        this.getPlayList();
      });
    },
    // 家属大屏-上移
    moveUpVideo(id) {
      moveUpVideo(id).then(res => {
        this.getPlayList();
      });
    },
    // 家属大屏-下移
    moveDownVideo(id) {
      moveDownVideo(id).then(res => {
        this.getPlayList();
      });
    },
    // 家属大屏-获取温馨提示信息
    getWarmTips() {
      let timeId;
      getWarmTips().then(res => {
        this.warmTips.message = res.data.data;
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
    update(content) {
      // 保存温馨提示
      return saveWarmTips(content).then(res => {
        this.getWarmTips();
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

    .content-left {
      margin: 0;
    }

    .content-center {
      margin: 0 12px;

      .videoSetting {
        float: right;
        margin-right: 10px;
        color: #00f;
        text-decoration: none;
      }

      td {
        &:last-child {
          text-align: right;
          padding: 0 8px 0 0 !important;
        }

        &:first-child {
          text-align: center;
          padding-left: 0 !important;
        }

        &:nth-of-type(2) {
          position: relative;

          span {
            position: absolute;
            left: -20px;
            top: 0;
          }
        }

        span {
          display: inline-block;
          width: 25px;
          height: 35px;
          padding-top: 9px;
          cursor: pointer;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }

        img {
          width: 17px;
        }
      }

      .blue {
        td {
          color: #4e46db;
        }
      }

      tr {
        &:first-of-type (2) {
          th {
            text-align: center;
            padding-left: 0 !important;
          }
        }
      }
    }

    .content-left, .content-center {
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
            vertical-align: middle;
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
                width: 19px;
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
        height: calc(100vh - 156px);
        overflow: auto;

        .table1 {
          width: 100%;

          & > tbody > tr {
            &:hover {
              background: #EEF6F5;
            }

            & > td {
              font-size: 13px;
              padding: 0 8px;
              color: #333333;
              height: 35px;
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

.data-row {
  cursor: pointer;
}

table {
  & > tbody {
    & > tr {
      & > td {
        &.active {
          color: #0000FF !important;
        }
      }

      &:nth-of-type(even) {
        background-color: #EEF6F5;
      }
    }
  }

  & > thead {
    & > tr {
      &:first-of-type {
        th {
          border-top: 1px solid #e3e7ea;
        }
      }
    }
  }

  & > thead, & > tbody {
    th, td {
      border-bottom: 1px solid #e3e7ea;

      &:first-of-type {
        border-left: 1px solid #e3e7ea;
      }

      &:last-of-type {
        border-right: 1px solid #e3e7ea;
      }
    }
  }
}

.contains .sum {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}

.contains .content-right {
  width: 0;
  position: relative;
  max-height: calc(100vh - 80px);
}
</style>
