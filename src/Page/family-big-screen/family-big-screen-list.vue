<template>
  <div class="contains">
    <div class="main-content" flex="main:justify">
      <div class="content-left" flex-box="1">
        <table cellspacing="0" border="1" class="tables">
          <colgroup>
            <col width="80">
            <col width="100">
            <col width="100"> 
            <col width="140"> 
          </colgroup>
          <thead>
            <tr>
              <th colspan="4">
                <img src="./img/体征任务.png">
                <span>当前产妇列表</span><span class="sum">共10个床位</span>
              </th>
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
              <col width="80">
              <col width="100">
              <col width="100">
              <col width="140">
            </colgroup>
            <tbody>
              <tr
                v-for="(item,index) in parturientList"
                :key="index"
                @click="showTip1(item)"
                class="data-row"
              >
                <td>111</td>
                <td>222</td>
                <td>333</td>
                <td>444</td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="parturientList.length == 0"></nullText>
        </div>
      </div>
      <div class="content-center" flex-box="1">
        <table cellspacing="0" border="1" class="tables">
          <colgroup>
            <col width="80">
            <col>
            <col width="100">
          </colgroup>
          <thead>
            <tr>
              <th colspan="4">
                <img src="./img/护理评估任务.png">
                <span>视频播放列表</span><span class="sum">共10个视频</span>
                <router-link to="/familyBigScreen/videoListSetting" class="videoSetting">
                  配置
                </router-link>
              </th>
            </tr>
            <tr>
              <th>序号</th>
              <th>视频名称</th>
              <th>操作</th>
              <th class="scrollBlock" v-if="table2"></th>
            </tr>
          </thead>
        </table>
        <div class="table-con" v-loading="page2Loading">
          <table cellspacing="0" border="1" class="table1" ref="table2">
            <colgroup>
              <col width="80">
              <col>
              <col width="100">
            </colgroup>
            <tbody>
              <tr
                v-for="(item,index) in videoList"
                :key="index"
                @click="showTip2(item)"
                class="data-row"
              >
                <td>111</td>
                <td>222</td>
                <td>333</td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="videoList.length == 0"></nullText>
        </div>
      </div>
      <div class="content-right" flex-box="1">
        <right2 :data="deptInfo" ref="right2"></right2>
      </div>
    </div>
    <info1modal ref="info1modal"></info1modal>
    <info3modal ref="info3modal"></info3modal>
  </div>
</template>

<script>
var moment = require("moment"); //使用时间插件
import Cookie from "js-cookie";
import { nurseTast, bodyTast, recordJob,queryByDeptCode,updateByDeptCode } from "./api/index-xin";
import { TSNeverKeyword } from "babel-types";
import common from "@/common/mixin/common.mixin.js";
import nullText from "@/components/null/null-text.vue";
import info1modal from "./modal/info-1-modal.vue";
import info3modal from "./modal/info-3-modal.vue";
import mixin from "./mixins";
import right2 from "./components/right2.vue";
export default {
  mixins: [common, mixin],
  provide() {
    return {
      update: this.update
    };
  },
  components: {
    nullText,
    info1modal,
    info3modal,
    right2
  },
  data() {
    return {
      parturientList:[1,2,3],
      videoList: [1,2,3],
      tipsData: {},
      centerDialogVisible1: false, //显示table1弹窗
      centerDialogVisible2: false, //显示table2弹窗
      table1: false, //是否table1内容出现滚动条
      table2: false, //是否table2内容出现滚动条
      page1Loading: false,
      page2Loading: false,
      page3Loading: false,
      deptInfo: {}
    };
  },
  methods: {
    showTip1(item) {
      this.$refs.info1modal.open(item);
    },
    showTip2(item) {
      item.patientName = item.name;
      this.$refs.info1modal.open(item);
    },
    showTip3(item) {
      this.$refs.info3modal.open(item);
    },
    init() {
      if (!this.deptCode) return;
      let time = moment().format("L");
      let data = Cookie.get("NURSING_USER") || "";
      if (!data) {
        window.location.href = "/login";
      }

      this.page1Loading = true;
      this.page2Loading = true;
      this.page3Loading = true;
      bodyTast(this.deptCode, time) // 获取数据--体症任务
        .then(rep => {
          let data = rep.data.data;
          this.page1Loading = false;
        });
      nurseTast(this.deptCode, time) //获取数据---评估任务
        .then(rep => {
          let data = rep.data.data;
          this.page2Loading = false;
        });
      this.getData();
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
    beColor(type) {
      switch (type) {
        case "1":
          return "rgba(185, 89, 255, .8)";
        case "2":
          return "rgba(48, 163, 255, .8)";
        case "3":
          return "rgba(162, 131, 94, .8)";
        case "4":
          return "rgba(208, 196, 79, .8)";
        case "5":
          return "rgba(80, 208, 101, .8)";
      }
    },
    getData() {
      this.page3Loading = true;
      queryByDeptCode(this.deptCode).then(res => {
        this.deptInfo = res.data.data;
        this.page3Loading = false;
        setTimeout(() => {
          try {
            this.$refs.right2.isSave = true;
          } catch (error) {}
        }, 300);
      });
    },
    update() {
      let data = Object.assign(this.deptInfo, {
        deptCode: this.deptCode
      });
      return updateByDeptCode(data).then(res => {
        // this.$message.success('更新数据成功')
        this.getData();
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
.contains
    >>> .el-dialog__header
        padding 15px 20px 15px!important
        font-family PingFangSC-Regular!important
        font-size 13px!important
        border-radius 4px!important
        background #F7FAFA!important
        color #333333!important
        letter-spacing 0
>>> .el-dialog__headerbtn
        font-size 13px!important
        font-family PingFangSC-Regular!important
>>> .el-dialog__title
        font-size 14px!important
        font-family PingFangSC-Regular!important
        color #333!important
>>> .el-dialog__body
    padding 30px 40px 10px
    & > div > div
        margin-bottom 24px!important
        font-family PingFangSC-Regular!important
        color #687179!important
        letter-spacing 0!important
        clear both
        & > div
            color #333!important
            float right
            display inline-block
            width: 206px;
            margin-bottom 10px
            line-height 18px
            vertical-align: top;
            font-family PingFangSC-Regular!important
>>> .el-dialog__footer
        padding 10px 20px 10px
        font-family PingFangSC-Regular!important
        text-align center
        box-sizing border-box
        background #F7FAFA
        border-radius 4px!important
>>>.el-dialog--small
        width 27%!important
        top 20%!important
        font-family PingFangSC-Regular!important
        background #FFFFFF!important
        box-shadow 0 2px 6px 0 rgba(0,0,0,0.50)!important
        border-radius 4px!important
.contains
    padding 10px 10px 0px
    .main-content
        padding 0 0px
        .table-con
          background #fff
        .content-left
            margin 0
        .content-center
            margin 0 12px
            .videoSetting 
              float right
              margin-right 10px
              color #00f
              text-decoration none
        .content-left, .content-center
            width 0
            position relative
            .tables
                font-size 13px
                text-align left
                width 100%
                & > thead > tr
                    background #F7FAFA;
                    & > th
                        padding 0px 7px
                        height 35px
                        vertical-align middle
                    &:first-child
                        color #333333
                        font-size 14px
                        height 40px
                        & > th
                            & > span
                                vertical-align middle
                            & > img
                                vertical-align middle
                                position relative
                                top -2px
                    &:last-child
                        color #687179
                        font-size 13px
            & > div
                height calc(100vh - 156px)
                overflow auto
                .table1
                    width 100%
                    & > tbody > tr
                        &:hover
                            background #EEF6F5
                        & > td
                            font-size 13px
                            padding 0 8px
                            color #333333
                            height 35px
                            vertical-align middle
.scrollBlock
  width 5px
  padding 0 !important
.data-row
  cursor pointer
table {
  & > tbody {
    & > tr {
      &:nth-of-type(even){
        background-color #EEF6F5
        & > td {
          color: #0000FF !important;
        }
      }
    } 
  }
  & > thead {
    & > tr {
      &:first-of-type {
        th {
          border-top 1px solid #e3e7ea
        }
      }  
    }
  }
  & > thead,& > tbody {
    th,td {
      border-bottom 1px solid #e3e7ea
      &:first-of-type {
        border-left 1px solid #e3e7ea
      }
      &:last-of-type {
        border-right 1px solid #e3e7ea
      }
    }
  }
}
.contains .sum {
  font-size 12px
  color #999;
  margin-left 10px
}
.content-right {
  width 0
  position relative
  max-height calc(100vh - 80px)
}
            
</style>
