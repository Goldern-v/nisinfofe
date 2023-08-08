<template>
  <div>
    <!-- 解决password自动填充bug -->
    <input type="password" style="display:none" />
    <div id="hl-nav-con">
      <div class="header-con">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-row class="left-part" type="flex">
            <el-row
              class="logo-con"
              type="flex"
              justify="center"
              align="middle"
            >
              <img src="../../common/images/logo_whsl.png" />
            </el-row>
            <!-- <router-link to="/index"
                         tag="span">
              <el-row class="nav-item"
                      type="flex"
                      align="middle">
                <i class="iconfont icon-shouye"></i> 首页
              </el-row>
            </router-link>-->
            <router-link to="/bed" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="iconfont icon-chuangweiyilanqia"></i> 床位一览卡
              </el-row>
            </router-link>
            <router-link to="/implementationList" tag="span">
                    <el-row class="nav-item" type="flex" align="middle">
                      <i class="iconfont icon-hulijiludan"></i>执行单
                    </el-row>
                  </router-link>
            <!-- <el-dropdown
              menu-align="start"
              :hide-on-click="false"
              :class="{ 'router-link-active': isImplementation }"
            >
              <el-row class="nav-item" type="flex" align="middle">
                <div class="before"></div>
                <i class="iconfont icon-hulijiludan"></i>执行单
              </el-row>
              <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item
                    :class="{ active: ['/bottleLabelByProgram'].includes($route.path) }"
                >
                  <router-link to="/bottleLabelByProgram" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="wardReport"></i>执行瓶签打印
                    </el-row>
                  </router-link>
                </el-dropdown-item> 
                  <el-dropdown-item
                  :class="{ active: $route.path == '/implementationList' }">
                  <router-link to="/implementationList" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="catheterPage"></i>执行记录
                    </el-row>
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>  -->
            <el-dropdown
              menu-align="start"
              :class="{ 'router-link-active': isActiveTemperaturePage }"
            >
              <el-row class="nav-item" type="flex" align="middle">
                <div class="before"></div>
                <i class="iconfont icon-hulijiludan"></i>体温单
              </el-row>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{
                    active: $route.path.includes('newSingleTemperatureChart')
                  }"
                >
                  <router-link to="/newSingleTemperatureChart" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="singleTemperatureChart"></i>体温单单人录入
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item
                  :class="{
                    active: $route.path.includes('singleTemperatureChart')
                  }"
                >
                  <router-link to="/singleTemperatureChart" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="singleTemperatureChart"></i>单人录入体温单
                    </el-row>
                  </router-link>
                </el-dropdown-item> -->
                <el-dropdown-item
                  :class="{
                    active: $route.path.includes('allTemperatureChart')
                  }"
                >
                  <router-link to="/allTemperatureChart" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="allTemperatureChart"></i>批量录入体温单
                    </el-row>
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <router-link to="/sugarPage" tag="span">
              <el-row class="nav-item" type="flex" align="middle">血糖</el-row>
            </router-link>
            <router-link to="/planList" tag="span">
              <el-row class="nav-item" type="flex" align="middle"
                >护理计划单</el-row
              >
            </router-link>
            <router-link to="/sheetPage" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="healthEducation"></i>护理记录单
              </el-row>
            </router-link>
            <router-link to="/formPage" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="nursingAssessment"></i> 护理评估单
              </el-row>
            </router-link>
            <router-link to="/shiftWork" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="iconfont icon-jiaobanzhi"></i> 交班报告
              </el-row>
            </router-link>
     
            <router-link to="/allCatheter" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="iconfont icon-allCatheter"></i> 导管
              </el-row>
            </router-link>
            <router-link to="/index" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="iconfont icon-shouye"></i> 护理任务
              </el-row>
            </router-link>
            <router-link to="/nursingRounds" tag="span">
              <el-row class="nav-item" type="flex" align="middle"
                >护理巡视
              </el-row>
            </router-link>
           
             <router-link to="/archive" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="iconfont icon-guidang"></i> 归档
              </el-row>
            </router-link>
            <router-link to="/statisticalQuery" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="iconfont icon-allCatheter"></i> 统计查询
              </el-row>
            </router-link>
            <router-link to="/nursingDocumentation" tag="span">
              <el-row class="nav-item" type="flex" align="middle">
                <i class="nursingDocumentation"></i> 患者查询
              </el-row>
            </router-link>
            <el-dropdown
              menu-align="start"
              :hide-on-click="false"
              :class="{ 'router-link-active': isActivePage }"
            >
              <el-row class="nav-item" type="flex" align="middle">
                <div class="before"></div>
                <i class="iconfont icon-hulijiludan"></i>其他
              </el-row>
              <el-dropdown-menu slot="dropdown">

                <el-dropdown-item>
                <router-link to="/healthEdu" tag="span">
              <el-row class="menu-item" type="flex" align="middle">
              <i class="iconfont icon-jiankan"></i>健康教育单
              </el-row>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
          <router-link to="/MEWS" tag="span">
              <el-row class="menu-item" type="flex" align="middle">
                <i class="sheetHospitalEval"></i> MEWS
              </el-row>
            </router-link>
          </el-dropdown-item>
            <el-dropdown-item>
            <router-link to="/infuse" tag="span">
              <el-row class="menu-item" type="flex" align="middle">
                <i class="iconfont icon-zhihuishuye"></i> 智慧输液
              </el-row>
            </router-link>
          </el-dropdown-item>
<!--                <el-dropdown-item-->
<!--                  :class="{ active: $route.path == '/catheterPage' }"-->
<!--                >-->
<!--                  <router-link to="/catheterPage" tag="span">-->
<!--                    <el-row class="menu-item" type="flex" align="middle">-->
<!--                      <i class="catheterPage"></i>导管-->
<!--                    </el-row>-->
<!--                  </router-link>-->
<!--                </el-dropdown-item>-->

                <el-dropdown-item
                  :class="{ active: $route.path.indexOf('/wardReport') > -1 }"
                >
                  <router-link to="/wardReport" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="wardReport"></i>病房日报
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item
                  :class="{ active: $route.path.indexOf('/checkSheets') > -1 }"
                >
                  <router-link to="/checkSheets" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="badEvent"></i>医嘱查对表
                    </el-row>
                  </router-link>
                </el-dropdown-item> -->

                <el-dropdown-item
                  :class="{
                    active: $route.path.indexOf('/inpatientReport') > -1
                  }"
                >
                  <router-link to="/inpatientReport" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="inpatientReport"></i>住院日报
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item :class="{active: $route.path == '/badEvent'}">
                  <router-link to="/badEvent" tag="span" >

                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="badEvent"></i>不良事件
                    </el-row>
                  </el-dropdown-item>
                </el-dropdown-item>-->
             <el-dropdown-item
                  :class="{ active: $route.path == '/nursingRules' }"
                >
                  <router-link to="/nursingRules" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="nursingRules"></i>护理制度
                    </el-row>
                  </router-link>
                </el-dropdown-item>
<!--                <el-dropdown-item-->
<!--                  :class="{ active: $route.path == '/departmentSharedFile' }"-->
<!--                >-->
<!--                  <router-link to="/departmentSharedFile" tag="span">-->
<!--                    <el-row class="menu-item" type="flex" align="middle">-->
<!--                      <i class="departmentSharedFile"></i>病区文件-->
<!--                    </el-row>-->
<!--                  </router-link>-->
<!--                </el-dropdown-item>-->
                <el-dropdown-item
                  :class="{ active: $route.path == '/noCheckTest' }"
                >
                  <router-link to="/noCheckTest" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="noCheckTest"></i>未做检查/检验
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ active: $route.path == '/severe-indicators' }"
                >
                  <router-link to="/severe-indicators" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="icuSummary"></i>重症质量指标
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/patientFlowStatistics" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="birthCertificate"></i>患者流转统计
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item
                  :class="{ active: $route.path == '/flatManagement' }"
                >
                  <router-link to="/flatManagement" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="flatManagement"></i>扁平管理
                    </el-row>
                  </router-link>
                </el-dropdown-item> -->
                <el-dropdown-item
                  v-if="deptCode.match('051102')"
                  :class="{ active: $route.path == '/puerperantSituation' }"
                >
                  <router-link to="/puerperantSituation" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="puerperantSituation"></i>产科分娩登记表
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ active: $route.path == '/vaccineManagement' }"
                  v-if="deptName.includes('产科')"
                >
                  <router-link to="/vaccineManagement" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="vaccineManagement"></i>疫苗管理
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ active: $route.path == '/birthCertificate' }"
                  v-if="deptCode.match('051102')"
                >
                  <router-link to="/birthCertificate" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="birthCertificate"></i>出生医学证明
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item>
                  <router-link to="/healthEducationList" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="birthCertificate"></i>健康宣教查询
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/patientFlowList" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="birthCertificate"></i>患者流转
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/patientFlowStatistics" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="birthCertificate"></i>患者流转统计
                    </el-row>
                  </router-link>
                </el-dropdown-item> -->

                <!-- <el-dropdown-item>
                  <router-link to="/dcList" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="birthCertificate"></i>疫情记录查询
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/patientList" tag="span">
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="birthCertificate"></i>住院补登记
                    </el-row>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-dropdown
                    class="menuSecond-item"
                    :class="{ 'router-link-active': isActiveStatisticPage }"
                  >
                    <el-row class="menu-item" type="flex" align="middle">
                      <i class="birthCertificate"></i>统计查询
                    </el-row>
                    <el-dropdown-menu slot="dropdown">
                      <template>
                        <el-dropdown-item
                          :class="{
                            active: $route.path == '/cognitiveStatistic'
                          }"
                        >
                          <router-link to="/cognitiveStatistic" tag="span">
                            <el-row
                              class="menu-item"
                              type="flex"
                              align="middle"
                            >
                              <i class="cognitiveStatistic"></i
                              >住院病人认知情况统计表
                            </el-row>
                          </router-link>
                        </el-dropdown-item>
                      </template>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
          <el-row class="right-part" type="flex" align="middle">
            <span class="big-1250-con">
              <el-popover
                ref="popover1"
                placement="bottom-end"
                width="320"
                trigger="click"
              >
                <userInfo @setPassword="setPassword" @quit="quit"></userInfo>
              </el-popover>
              <span>
                <el-select
                  v-model="deptValue"
                  filterable
                  remote
                  placeholder="请选择"
                  size="small"
                  class="dept-select"
                  autocomplete="off"
                  :remote-method="remoteMethod"
                  @change="changeDept(deptValue)"
                >
                  <el-option
                    v-for="item in deptOptionList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </span>
              <span class="option-item" v-popover:popover1>{{
                user.empName
              }}</span>
            </span>
            <span class="small-1250-con">
              <el-dropdown @command="handleCommand">
                <span class="hamburger">
                  <i class="iconfont icon-shouqi"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="header-drop-con">
                  <el-dropdown-item>
                    <div class="dropdown-item">
                      <i class="iconfont icon-yonghu"></i>
                      {{ user.empName }}
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="dropdown-item" @click="$router.push('/inBox')">
                      <i class="iconfont icon-xiaoxi1"></i>
                      消息({{ Unread }})
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="quit">
                    <div class="dropdown-item">
                      <i class="iconfont icon-zhuxiao"></i>
                      注销用户
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </el-row>
        </el-row>
      </div>
      <div style="height: 60px"></div>
      <setPassword ref="setPassword"></setPassword>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.header-con {
  height: 60px;
  border-bottom: 1px solid #CBD5DD;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  background: #fff;
  position: relative;
  z-index: 100;
  position: fixed;
  width: 100%;
}

.left-part, .right-part {
  height: 60px;
  overflow: hidden;
}

.logo-con {
  width: 200px;
  min-width: 200px;
  height: 100%;
  background: #4BB08D;
  margin-right: 11px;

  img {
    width: 180px;
    height: 70%;
  }

  span {
    margin-left: 6px;
    font-size: 14px;
    color: #EFF2F9;
    letter-spacing: 0;
  }
}

.logo-con-hj {
  padding-left: 10px;

  img {
    width: 36px;
    height: 36px;
  }

  span {
    line-height: 16px;
  }
}

.nav-item {
  height: 60px;
  padding: 0 10px;
  font-size: 14px;
  color: #687179;
  letter-spacing: 0;
  cursor: pointer;

  i {
    margin-right: 5px;
    font-size: 18px;
    position: relative;
    top: -1px;
    display: none;
  }

  &:hover {
    background: #f8f8fa;
  }
}

.menuSecond-item {
  width: 100%;
}

.router-link-active {
  .nav-item {
    background: #F8F8FA;
    border-left: 1px solid #EAEEF1;
    border-right: 1px solid #EAEEF1;
    border-top: 4px solid #4BB08D;
    border-bottom: 4px solid transparent;
  }

  .menu-item {
    color: #333;
    font-weight: bold;
    background-color: #F8F8FA;
  }
}

.el-dropdown-menu {
  min-width: 158px;
  margin: 0;
}

.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item.active {
  background-color: #F8F8FA;

  .menu-item {
    color: #333;
    font-weight: bold;
  }
}

.menu-item {
  height: 38px;
  padding: 0 0px;
  text-align: center;
  font-size: 13px;
  color: #687179;
  letter-spacing: 0;
  cursor: pointer;

  i {
    display: inline-block;
    width: 28px;
    height: 28px;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;

    &.sheetHospitalAdmission {
      background-image: url('../../common/images/index/入院评估.png');
    }

    &.sheetHospitalEval {
      background-image: url('../../common/images/index/住院评估.png');
    }

    &.nursingAssessment {
      background-image: url('../../common/images/index/护理评估.png');
    }

    &.bloodSugar {
      background-image: url('../../common/images/index/血糖.png');
    }

    &.healthEducation {
      background-image: url('../../common/images/index/健康教育单.png');
    }

    &.nursingDocumentation {
      background-image: url('../../common/images/index/患者查询.png');
    }

    &.catheterPage {
      background-image: url('../../common/images/index/导管.png');
    }

    &.wardReport {
      background-image: url('../../common/images/index/病房日报.png');
    }

    &.inpatientReport {
      background-image: url('../../common/images/index/住院日报.png');
    }

    &.badEvent {
      background-image: url('../../common/images/index/不良事件.jpg');
    }

    &.nursingRules {
      background-image: url('../../common/images/index/制度.png');
    }

    &.noCheckTest {
      background-image: url('../../common/images/index/未做检查／检验.png');
    }

    &.icuSummary {
      background-image: url('../../common/images/index/工作量统计.png');
    }

    &.departmentSharedFile {
      background-image: url('../../common/images/index/共享文件.png');
    }

    &.flatManagement {
      background-image: url('../../common/images/index/扁平管理.png');
    }

    &.puerperantSituation {
      background-image: url('../../common/images/index/产科分娩登记表.png');
    }

    &.vaccineManagement {
      background-image: url('../../common/images/index/疫苗管理.png');
    }

    &.birthCertificate {
      background-image: url('../../common/images/index/出生医学证明.png');
    }

    &.cognitiveStatistic {
      background-image: url('../../common/images/index/出生医学证明.png');
    }

    &.singleTemperatureChart {
      background-image: url('../../common/images/index/单人录入体温单.png');
    }

    &.allTemperatureChart {
      background-image: url('../../common/images/index/批量录入体温单.png');
    }
  }
}

.option-item {
  font-size: 13px;
  color: #687179;
  padding: 0 10px;
  border-right: 1px solid #EAEEF1;
  height: 60px;
  line-height: 60px;
  display: inline-block;

  &:hover {
    background: #F8F8FA;
  }

  &:last-child {
    border: 0;
    margin-right: 11px;
  }
}

.right-part {
  span {
    cursor: pointer;

    &:hover {
      color: #333;
    }
  }
}

.hamburger {
  i {
    color: #b3b3b3;
    font-size: 22px;
    margin-right: 10px;
  }
}

.dropdown-item {
  color: #687179;
  font-size: 13px;

  i {
    font-size: 22px;
    color: #979797;
    position: relative;
    top: 4px;
  }
}

.dept-select {
  >>> .el-input__inner {
    border: 0;
    padding: 15px 0;
    text-align: center;
    width: 120px;
    box-sizing: content-box;
    color: #687179;
    font-size: 13px;

    &:hover {
      background: #F8F8FA;
    }
  }

  >>> .el-input__icon {
    display: none;
  }
}

.red-tip {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: rgba(230, 44, 44, 1);
  border-radius: 50%;
  position: relative;
  top: -8px;
  right: 0px;
}
</style>
<style scoped>
@media screen and (max-width: 1400px) {
}

@media screen and (max-width: 930px) {
  .small-1250-con {
    display: block;
  }

  .big-1250-con {
    display: none;
  }
}

@media screen and (min-width: 930px) {
  .small-1250-con {
    display: none;
  }

  .big-1250-con {
    display: block;
  }
}
</style>

<script>
import Cookies from "js-cookie";
import { logout } from "@/api/login";
import setPassword from "../modal/setPassword.vue";
import userInfo from "./user-info.vue";
import { nursingUnit } from "@/api/lesion";
import common from "@/common/mixin/common.mixin";
import WebSocketService from "@/plugin/webSocket/index";

export default {
  mixins: [common],
  data() {
    return {
      show: "hello vue",
      user: JSON.parse(localStorage.user),
      deptValue: "",
      deptList: [],
      deptOptionList: [],
      isTip: false, //是否mews高亮
      mewsMd5: "",
      mewsId: ""
      // showBadEvent:
      //   (localStorage["showBadEvent"] &&
      //     localStorage["showBadEvent"] === "true") ||
      //   this.isDev ||
      //   false
    };
  },
  computed: {
    deptCode() {
      if (
        this.$route.path.includes("/deliveryRoomWhiteboard") ||
        this.$route.path.includes("/familyBigScreen")
      ) {
        if (this.$store.state.lesion.deptCode != "051102_01") {
          this.$router.push("/index");
        }
      }
      return this.$store.state.lesion.deptCode;
    },
    deptName() {
      if (this.$route.path.includes("/vaccineManagement")) {
        if (
          this.$store.state.lesion.deptName &&
          !this.$store.state.lesion.deptName.includes("产科")
        ) {
          this.$router.push("/index");
        }
      }
      return this.$store.state.lesion.deptName;
    },
    nursingStaff() {
      let nursingStaff = false;
      try {
        nursingStaff = JSON.parse(localStorage.user).nursingStaff;
      } catch (e) {
        console.log(e);
      }
      return nursingStaff;
    },
    superAdmin() {
      try {
        return JSON.parse(localStorage.user).superuser;
      } catch (e) {}
    },
    Unread() {
      return this.$store.state.common.mailUnread;
    },
    isActivePage() {
      if (this.$route.path.indexOf("/wardReport") > -1) return true;
      // if (this.$route.path == "/nursingDocumentation") return true;
      // if (this.$route.path == "/badEvent") return true;
      if (this.$route.path.indexOf("/inpatientReport") > -1) return true;
      // if (this.$route.path == "/catheterPage") return true;
      if (this.$route.path == "/nursingRules") return true;
      if (this.$route.path == "/noCheckTest") return true;
      if (this.$route.path == "/departmentSharedFile") return true;
      if (this.$route.path == "/flatManagement") return true;
      if (this.$route.path == "/vaccineManagement") return true;
      if (this.$route.path == "/birthCertificate") return true;
      if (this.$route.path == "/healthEducationList") return true;
      if (this.$route.path == "/dcList") return true;
      if (this.$route.path == "/cognitiveStatistic") return true;
      if (this.$route.path == "/patientFlowList") return true;
    },
    isActiveStatisticPage() {
      if (this.$route.path == "/cognitiveStatistic") return true;
    },
    isActiveRounds() {
      let path = this.$route.path;
      return path.includes("singleRounds") || path.includes("allRounds");
    },
    isActiveFormPage() {
      // if (this.$route.path == "/sheetPage") return true;
      if (this.$route.path == "/sheetHospitalAdmission") return true;
      if (this.$route.path == "/sheetHospitalEval") return true;
      // if (this.$route.path == "/formPage") return true;
      if (this.$route.path == "/sugarPage") return true;
      if (this.$route.path == "/oxygenPage") return true;
      if (this.$route.path == "/healthEdu") return true;
      if (this.$route.path == "/handlingPage") return true;
      return false;
      // if (this.$route.path == "/sugarPage") return true;
      // return false;
    },
    isActiveTemperaturePage() {
      let path = this.$route.path;
      return (
        path.includes("newSingleTemperatureChart") ||
        path.includes("singleTemperatureChart") ||
        path.includes("allTemperatureChart")
      );
    },
    isActiveRecordPage() {
      let path = this.$route.path;
      return (
        path.includes("sheetPage") ||
        path.includes("healthEdu") ||
        path.includes("formPage")
      );
    },
    isActiveAssessPage() {
      let path = this.$route.path;
      return (
        path.includes("sheetHospitalAdmission") ||
        path.includes("sheetHospitalEval") ||
        path.includes("MEWS")
      );
    },
    isImplementation(){
      let path = this.$route.path;
      return (
        // path.includes("bottleLabelByProgram") ||
        path.includes("implementationList")
      );
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "quit":
        case "quit":
          {
            this.quit();
          }
          break;
        case "setPassword":
          {
            this.setPassword();
          }
          break;
      }
    },
    toAdmin() {
      window.location.href = "/crNursing/admin";
    },
    quit() {
      logout(Cookies.get("NURSING_USER"));
      Cookies.remove("password");
      Cookies.remove("deptId");
      Cookies.remove("access");
      Cookies.remove("hasGreet");
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("sso");
      Cookies.remove("NURSING_USER", { path: "/" });
      this.$router.push("/login");
      this.$store.commit("upDeptCode", "");
    },
    setPassword() {
      this.$refs.setPassword.open();
    },
    remoteMethod(query) {
      if (query !== "") {
        let upperCaseQuery = query.toUpperCase();
        this.deptOptionList = this.deptList.filter(item => {
          return (
            item.name.includes(query) ||
            item.code == query ||
            item.pinyin.indexOf(upperCaseQuery) != -1 ||
            (item.pinyin + "").includes(upperCaseQuery)
          );
        });
      }
      if (!query || this.deptOptionList.length == 0 || this.deptName == query) {
        this.deptOptionList = JSON.parse(JSON.stringify(this.deptList));
      }
    },
    changeDept(value) {
      // let deptName = this.deptList.filter((item) => {
      //   return item.code == value;
      // })[0].name;
      let deptName="";
      let deptItem = this.deptList.filter((item) => {
        return item.code == value;
      });
      if(deptItem && deptItem.length>0){
        deptName=deptItem[0].name
      }else {
        return false;
      }
      this.$store.commit("upDeptCode", value);
      localStorage.selectDeptValue = value;
      this.$store.commit("upDeptName", deptName);
      try {
        this.mewsId && WebSocketService.unsubscribe(this.mewsId);
      } catch (error) {}
      this.subscribe();
    },
    subscribe() {
      // mews 订阅科室
      this.mewsId = WebSocketService.subscribe(
        `/topic/mews/dept/${this.deptValue}`,
        frame => {
          let frameData = JSON.parse(frame.body).data;
          try {
            this.mewsMd5 = frameData.md5;
            if (
              !WebSocketService.isInMd5List(frameData.md5) &&
              frameData.dangerMewsPatientList &&
              frameData.dangerMewsPatientList.length &&
              this.$route.path != "/MEWS"
            ) {
              this.isTip = true;
            } else {
              this.isTip = false;
            }
          } catch (error) {}
        }
      );
    }
  },
  created() {
    // this.$store.dispatch("getMailUnread");
    nursingUnit().then(res => {
      this.deptList = res.data.data.deptList;
      this.deptList = this.deptList.map(dept => {
        dept["pinyin"] = dept.name.getPinyin() || "";
        return dept;
      });
      this.deptOptionList = JSON.parse(JSON.stringify(this.deptList));
      this.deptValue =
        localStorage.selectDeptValue ||
        this.$store.state.lesion.deptCode ||
        res.data.data.defaultDept ||
        res.data.data.deptList[0].code;
      this.$store.commit("upDeptList", this.deptList);
      this.$store.commit("upDeptCode", this.deptValue);
      localStorage.selectDeptValue = this.deptValue;
      this.subscribe();
    });
  },

  watch: {
    $route() {
      if (this.$route.path == "/MEWS") {
        this.isTip = false;
        this.mewsMd5 && WebSocketService.addMd5List(this.mewsMd5);
      }
    }
  },
  components: {
    setPassword,
    userInfo
  }
};
</script>
