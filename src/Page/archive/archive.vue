<template>
  <div class="archive contains">
    <div class="main-content" flex="main:justify">
      <div class="content-center" flex-box="1">
        <table cellspacing="0" border="1" class="tables">
          <colgroup>
            <col width="228">
            <col>
            <col width="200">
            <col width="150">
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
        <div class="table-con" v-loading="page2Loading">
          <table cellspacing="0" border="1" class="table1" ref="table2">
            <colgroup>
              <col width="228">
              <col>
              <col width="200">
              <col width="150">
            </colgroup>
            <tbody>
              <tr
                v-for="(item,index) in nurse.content"
                :key="index"
                class="data-row"
              >
                <td>{{item.bedLabel + '床 '+item.name}}</td>
                <td>{{item.task}}</td>
                <td>{{item.taskTime | filterTime}}</td>
                <td>
                  <div>
                    <span @click="showTip2(item)">归档</span><span class="viewFile" @click="previewFile(scope.row)">查看</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="nurse.content.length == 0"></nullText>
        </div>
      </div>
    </div>
    <info1modal ref="info1modal"></info1modal>
    <sweet-modal ref="preview-modal" class="nursing-rules-preview-modal" :title="preview.title">
      <!-- <div v-if="preview.type=='img'">
        <img :src="preview.url" alt style="width:100%" />
      </div> -->
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
import { nurseTast } from "./api/index-xin";
import { TSNeverKeyword } from "babel-types";
import common from "@/common/mixin/common.mixin.js";
import nullText from "@/components/null/null-text.vue";
import info1modal from "./modal/info-1-modal.vue";
import mixin from "./mixins";
export default {
  mixins: [common, mixin],
  components: {
    nullText,
    info1modal
  },
  data() {
    return {
      body: {
        //左侧 体症任务信息
        number: 0,
        content: []
      },
      nurse: {
        //中部护理评估任务
        number: 0,
        content: []
      },
      postil: {
        //右侧批注
        number: 0,
        isshow: true,
        content: []
      },
      user: {
        name: "",
        today: "",
        week: ""
      },
      centerDialogVisible2: false, //显示table2弹窗
      bodynurse: {
        bedNumber: "",
        name: "",
        content: "",
        time: "",
        from: ""
      },
      postilObj: {
        bedNumber: "",
        name: "",
        content: "",
        postilName: "",
        creater: ""
      },
      table2: false, //是否table2内容出现滚动条
      page2Loading: false,
      preview: {
        type: "",
        name: "",
        url: ""
      },
      pdfHeight: window.innerHeight * 0.8,
    };
  },
  methods: {
    showTip2(item) {
      item.patientName = item.name;
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
      nurseTast(this.deptCode, time) //获取数据---评估任务
        .then(rep => {
          let data = rep.data.data;
          this.$set(this.nurse, "content", data);
          this.page2Loading = false;
        });
    },
    tablesHeight() {
      try {
        let tableHeight = this.wih - 210;
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
    // 预览科室共享文件
    previewFile(scope) {
      let name = scope.fileName || "";
      let type = scope.originalFileName.replace(/.+\./, "").toLowerCase() || "";

      this.preview = {
        title: name,
        url: `/crNursing/asset/deptShareFile${scope.path}`,
        type: this.previewType(type)
      };

      this.$refs["preview-modal"].open();
      this.pdfHeight = window.innerHeight * 0.8;
    },
  },
  computed: {
    filterPostil() {
      if (this.postil.isshow) {
        return this.postil.content.filter(item => {
          return item.signerNo == this.userInfo.empNo;
        });
      } else {
        return this.postil.content;
      }
    },
    noon() {
      let hour = new Date().getHours();
      if (hour >= 6 && hour <= 12) {
        return "早上";
      } else if (hour >= 12 && hour <= 16) {
        return "中午";
      } else if (hour >= 16 && hour <= 19) {
        return "下午";
      } else if (hour >= 19 && hour <= 6) {
        return "晚上";
      }
    }
  },
  mounted() {
    this.tablesHeight();
  },
  updated() {
    this.tablesHeight();
  },
  created() {
    moment.locale("Zh-cn"); //使用中文
    this.user.today = moment().format("LL"); //2018-07-11
    this.user.week = moment().format("dddd"); //星期一
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
        .content-center
            margin 0 12px
        .content-center
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
                        border 1px solid #E3E7EA
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
                height calc(100vh - 116px)
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
                            border 1px solid #E3E7EA
                            border-top 0
                            height 35px
                            vertical-align middle
                            &:last-of-type {
                              > div {
                                display flex
                                justify-content space-around
                                align-items center
                                span {
                                  flex 1
                                  color #4bb08d
                                  padding: 10px 0;
                                  -webkit-box-sizing: border-box;
                                  box-sizing: border-box;
                                }
                              }
                            }
                            
.scrollBlock
  width 6px
  padding 0 !important
.data-row
  cursor pointer
.archive {
  .sweet-modal {
    width: 900px;
  }
  .sweet-content {
    max-height: none;
  }
}
</style>
