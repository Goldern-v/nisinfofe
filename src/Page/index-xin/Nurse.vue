<template>
  <div class="contains">
    <div class="main-title">
      <b>{{ user.name }}</b>
      <span
        >{{ noon }}好，欢迎您回来。今天是{{ user.today }}，{{
          user.week
        }}，祝您工作顺利，天天都有好心情。</span
      >
      <span v-if="HOSPITAL_ID === 'foshanrenyi'">
        <el-button type="primary" @click.native="goUrl('http://192.168.99.81:9091/')">操作手册</el-button>
         </span>
         <span style="color:blue" v-if="HOSPITAL_ID === 'foshanrenyi'">此电脑ip：{{ip}}</span>
    </div>

    <div class="main-content" flex="main:justify">
      <div class="content-left" flex-box="1">
        <table cellspacing="0" border="1" class="tables">
          <colgroup>
            <col width="114" />
            <col width="240" />
            <col width="100" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="4">
                <img src="./img/体征任务.png" />
                <span>体征任务（{{ body.content.length }}）</span>
                <div style="float: right" v-if="HOSPITAL_ID === 'fuyou'">
                  <el-radio-group @change='radioChange' v-model="radioStatus" size='small'>
                    <el-radio-button label="未完成"></el-radio-button>
                    <el-radio-button label="已完成"></el-radio-button>
                  </el-radio-group>
                </div>
              </th>
            </tr>
            <tr>
              <th>患者</th>
              <th>任务内容</th>
              <th>时间</th>
              <th class="scrollBlock" v-if="table1"></th>
            </tr>
          </thead>
        </table>
        <div class="table-con" v-loading="page1Loading">
          <table cellspacing="0" border="1" class="table1" ref="table1">
            <colgroup>
              <col width="114" />
              <col width="240" />
              <col width="100" />
            </colgroup>
            <tbody>
              <tr
                v-for="(item, index) in body.content"
                :key="index"
                @click="showTip1(item)"
                class="data-row"
              >
                <td>{{ item.bedLabel + "床 " + item.patientName }}</td>
                <td>{{ item.task }}</td>
                <td>
                  {{ item.taskTime | filterTime }}
                  <p
                    v-if="HOSPITAL_ID == 'zhongshanqi' && item.isTime == 1"
                    style="color: red;padding-top: 5px;"
                  >
                    （已超时）
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="body.content.length == 0"></nullText>
        </div>
      </div>
      <div class="content-center" flex-box="1">
        <table cellspacing="0" border="1" class="tables">
          <colgroup>
            <col width="114" />
            <col width="264" />
            <col width="100" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="4">
                <img src="./img/护理评估任务.png" />
                <span>护理评估任务（{{ nurse.content.length }}）</span>
              </th>
            </tr>
            <tr>
              <th>患者</th>
              <th>任务内容</th>
              <th>时间</th>
              <th class="scrollBlock" v-if="table2"></th>
            </tr>
          </thead>
        </table>
        <div class="table-con" v-loading="page2Loading">
          <table cellspacing="0" border="1" class="table1" ref="table2">
            <colgroup>
              <col width="114" />
              <col width="264" />
              <col width="100" />
            </colgroup>
            <tbody>
              <tr
                v-for="(item, index) in nurse.content"
                :key="index"
                @click="showTip2(item)"
                class="data-row"
              >
                <td>{{ item.bedLabel + "床 " + item.name }}</td>
                <td>{{ item.task }}</td>
                <td>{{ item.taskTime | filterTime }}</td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="nurse.content.length == 0"></nullText>
        </div>
      </div>
      <div class="content-right" flex-box="1">
        <table cellspacing="0" border="1" class="table2">
          <colgroup>
            <col width="34" />
            <col width="110" />
            <col width="266" />
            <col width="80" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="5">
                <img src="./img/护理文书批注.png" />
                <span>护理记录单（{{ postil.content.length }}）</span>
                <el-switch
                  style="position:absolute;top:9px;right:110px;display: inline-block"
                  v-model="postil.isshow"
                  active-color="#4BB08D"
                  inactive-color="#eee"
                  on-text
                  off-text
                  @change="onlyme"
                ></el-switch>
                <b>只显示我的记录</b>
              </th>
            </tr>
            <tr>
              <th :style="{ width: table3 ? '16px' : '16px' }">
                <span></span>
              </th>
              <th>患者</th>
              <th>任务说明</th>
              <th>责任护士</th>
              <th class="scrollBlock" v-if="table3"></th>
            </tr>
          </thead>
        </table>
        <div class="table-con" v-loading="page3Loading">
          <table cellspacing="0" border="1" ref="table3">
            <colgroup>
              <col width="34" />
              <col width="110" />
              <col width="266" />
              <col width="80" />
            </colgroup>
            <tbody>
              <tr
                v-for="(item, index) in filterPostil"
                :key="index"
                @click="showTip3(item)"
                class="data-row"
              >
                <td>
                  <i
                    :style="{
                      background:
                        item.type == '2' ? '#D0C44F' : beColor(item.signType)
                    }"
                  ></i>
                </td>
                <td>{{ item.bedLabel + "床 " + item.patientName }}</td>
                <td>{{ item.content }}</td>
                <td v-if="HOSPITAL_ID !== 'nanfangzhongxiyi'">
                  <span v-if="item.type == '1'" style="color: red">未签名</span>
                  <span
                    v-else-if="item.type == '2' && item.status == '1'"
                    style="color: red"
                    >未审核</span
                  >
                  <span v-else>{{ item.signerName }}</span>
                </td>
                <td v-if="HOSPITAL_ID === 'nanfangzhongxiyi'">
                  <span v-if="item.type == '1'" style="color: red">未签名({{item.signerName}})</span>
                  <span
                    v-else-if="item.type == '2' && item.status == '1'"
                    style="color: red"
                    >{{item.signerName}}未审核</span
                  >
                  <span v-else>{{ item.signerName }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <nullText v-show="filterPostil.length == 0"></nullText>
        </div>
      </div>
    </div>
    <info1modal ref="info1modal"></info1modal>
    <info3modal ref="info3modal"></info3modal>
  </div>
</template>

<script>
var moment = require("moment"); //使用时间插件
import Cookie from "js-cookie";
import { nurseTast, bodyTast, recordJob } from "./api/index-xin";
import { ipAddress } from "@/api/login";
import { TSNeverKeyword } from "babel-types";
import common from "@/common/mixin/common.mixin.js";
import nullText from "@/components/null/null-text.vue";
import info1modal from "./modal/info-1-modal.vue";
import info3modal from "./modal/info-3-modal.vue";
import mixin from "./mixins";
export default {
  mixins: [common, mixin],
  components: {
    nullText,
    info1modal,
    info3modal
  },
  data() {
    return {
      radioStatus: '未完成',
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
        isshow: false,
        content: []
      },
      user: {
        name: "",
        today: "",
        week: ""
      },
      centerDialogVisible1: false, //显示table1弹窗
      centerDialogVisible2: false, //显示table2弹窗
      centerDialogVisible3: false, //显示table3弹窗
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
      table1: false, //是否table1内容出现滚动条
      table2: false, //是否table2内容出现滚动条
      table3: false, //是否table3内容出现滚动条
      page1Loading: false,
      page2Loading: false,
      page3Loading: false,
      ip:''
    };
  },
  methods: {
    //
    radioChange(value) {
      this.radioStatus = value;
      this.initBodyTast()
    },
    onlyme(isme) {
      //右侧是否显示我自己的备注按钮事件
      console.log(isme);
    },
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
    showAll() {
      this.centerDialogVisible = false;
      this.$router.push("/sheetPage");
    },
    goUrl(src) {
    window.open(src,"_blank")
    },
    // 体征任务
    initBodyTast() {
      let time = moment().format("L");
      this.page1Loading = true;
      bodyTast(this.deptCode, time, this.radioStatus) // 获取数据--体症任务
        .then(rep => {
          let data = rep.data.data;
          this.$set(this.body, "content", data);
          this.page1Loading = false;
        });
        
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

      // this.page1Loading = true;
      this.page2Loading = true;
      this.page3Loading = true;
      // bodyTast(this.deptCode, time, this.radioStatus) // 获取数据--体症任务
      //   .then(rep => {
      //     let data = rep.data.data;
      //     this.$set(this.body, "content", data);
      //     this.page1Loading = false;
      //   });
      this.initBodyTast() // 获取数据--体症任务
      nurseTast(this.deptCode, time) //获取数据---评估任务
        .then(rep => {
          let data = rep.data.data;
          this.$set(this.nurse, "content", data);
          this.page2Loading = false;
        });
      recordJob(this.deptCode).then(rep => {
        let data = rep.data.data.list;
        this.$set(this.postil, "content", data);
        this.page3Loading = false;
      });
    },
    tablesHeight() {
      try {
        let tableHeight = this.wih - 210;
        this.table1 =
          this.$refs.table1.clientHeight > tableHeight ? true : false;
        this.table2 =
          this.$refs.table2.clientHeight > tableHeight ? true : false;
        this.table3 =
          this.$refs.table3.clientHeight > tableHeight ? true : false;
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
    }
  },
  computed: {
    filterPostil() {
      console.log(this.postil.content)
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
    if(this.HOSPITAL_ID == "foshanrenyi"){
      ipAddress().then((res)=>{
        this.ip =res.data.data;
      })
    }
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

.contains {
  padding: 10px 10px 0px;

  .main-title {
    height: 50px;
    line-height: 50px;

    & > b {
      font-size: 26px;
      color: #333333;
      letter-spacing: 0;
      margin-left: 5px;
      margin-right: 15px;
    }

    & > span {
      font-size: 13px;
      vertical-align: bottom;
      color: #687179;
      letter-spacing: 0;
    }
  }

  .main-content {
    padding: 0 0px;

    .table-con {
      background: #fff;
    }

    .content-left, .content-right {
      margin: 0;
    }

    .content-center {
      margin: 0 12px;
    }

    .content-left, .content-center, .content-right {
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
        height: calc(100vh - 206px);
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
              border: 1px solid #E3E7EA;
              border-top: 0;
              height: 35px;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .content-right {
      .table2 {
        width: 100%;
        text-align: left;

        & > thead >tr {
          background: #F7FAFA;

          &:first-child > th {
            position: relative;
            padding: 0 7px;
            height: 40px;
            vertical-align: middle;
            border: 1px solid #E3E7EA;
            font-size: 14px;

            & > img {
              vertical-align: middle;
            }

            & > span {
              color: #333333;
              font-weight: bold;
              vertical-align: middle;
            }

            & > b {
              font-size: 13px;
              font-weight: normal;
              position: absolute;
              right: 14px;
              top: 14px;
            }
          }

          &:last-child > th {
            color: #687179;
            border: 1px solid #E3E7EA;
            font-size: 13px;
            height: 35px;
            vertical-align: middle;
            padding: 0 8px;
          }
        }
      }

      & > div {
        overflow-y: auto;
        height: calc(100vh - 206px);

        & > table {
          width: 100%;

          &> tbody > tr {
            &:hover {
              background: #EEF6F5;
            }

            & >td {
              font-size: 13px;
              border: 1px solid #E3E7EA;
              border-top: 0;
              padding: 0 0 0 6px;
              text-align: left;
              vertical-align: middle;
              height: 35px;

              &:nth-child(1) {
                text-align: center;
                padding: 0;

                i {
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background: red;
                  border-radius: 50%;
                  vertical-align: middle;
                  padding: 0;
                  margin-left: 3px;
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
  width: 5px;
  padding: 0 !important;
}

.data-row {
  cursor: pointer;
}
</style>
