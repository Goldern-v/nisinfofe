<template>
  <div
    class="patient-list-part"
    v-loading="patientListLoading"
    :style="{ paddingTop: hasPatientGroup ? '80px' : '45px', width }"
  >
    <template v-if="!collapse">
      <div class="search-box" v-if="!isRefresh">
        <div flex>
          <el-input
            placeholder="床号/姓名"
            icon="search"
            v-model="searchWord"
          ></el-input>
          <div
            @click="handleFilter($event, fliterList)"
            v-if="HOSPITAL_ID == 'nfyksdyy'"
          >
            <svg
              t="1686737054571"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6663"
              width="20"
              height="20"
            >
              <path
                d="M625.1 1024c-21.7 0-39.2-17.5-39.2-39.2V383c0-9.8 3.6-19.2 10.2-26.4L849.6 78.5H172.8L424 355.8c6.6 7.2 10.2 16.6 10.2 26.3v349.2l96.2 84c16.3 14.3 18 39 3.7 55.4-14.2 16.4-38.9 18-55.4 3.7l-109.6-95.7c-8.5-7.4-13.4-18.2-13.4-29.5v-352L55.3 65.6c-10.4-11.5-13.1-28-6.8-42.2S68.8 0 84.4 0h854C954 0 968 9.2 974.3 23.4s3.6 30.8-6.9 42.3L664.3 398.3v586.5c0 21.7-17.6 39.2-39.2 39.2z"
                fill="#040000"
                p-id="6664"
              ></path>
            </svg>
          </div>
        </div>

        <el-select
          size="small"
          v-model="patientGroup"
          placeholder="病人分组"
          clearable
          v-if="hasPatientGroup"
          style="margin-top: 8px"
        >
          <el-option
            v-for="opt in patientGroup4Expand3"
            :key="opt.value"
            :label="opt.name"
            :value="opt.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="search-box" v-else>
        <el-input
          placeholder="床号/姓名"
          icon="search"
          style="width:100px"
          v-model="searchWord"
        ></el-input>
        <el-button
          type="primary"
          style="padding: 5px 15px;margin-left: 7px;height: 28px;"
          size="mini"
          @click="getDate()"
          >刷新</el-button
        >
      </div>
    </template>
    <div class="left-wapper">
      <follow-list
        :data="sortList"
        @selectPatient="selectPatient"
        v-if="hasFollowList && !collapse"
      >
        <template slot-scope="{ scope }">
          <span
            class="point-box"
            v-if="$route.path == '/formPage'"
            v-show="
              scope.formLowestStatus !== '' && scope.formLowestStatus != '2'
            "
            :class="{
              red: scope.formLowestStatus == 0,
              green: scope.formLowestStatus == 1,
              isImg2: img2Show
            }"
          ></span>
        </template>
      </follow-list>
      <el-button-group v-if="hasGroupHos">
        <el-button :type="isGroup ? 'primary' : ''" @click="isGroup = true"
          >默认管床</el-button
        >
        <el-button :type="!isGroup ? 'primary' : ''" @click="isGroup = false"
          >全部床位</el-button
        >
      </el-button-group>
      <div
        class="patient-list-contain"
        :style="{ padding: !collapse ? '' : '0' }"
      >
        <router-link
          class="patient-box"
          flex="cross:center"
          v-for="(item, index) in sortList"
          :key="
            item.patientId + item.visitId + item.bedLabel + item.inpNo + index
          "
          :to="{
            name: toName,
            params: {
              patientId: item.patientId,
              visitId: item.visitId,
              formId: item.id,
              inpNo: item.inpNo
            }
          }"
          :class="{
            active: makePatient ? isActive(item) : false,
            lyxrmActive:
              ['lyxrm', 'stmz', '925', 'qhwy'].includes(HOSPITAL_ID) &&
              makePatient
                ? isActive(item)
                : false
          }"
          @click.native="
            () => {
              toUnlock(item);
              selectPatient(item);
            }
          "
        >
          <img
            :src="item.bedLabel.includes('_') ? imageBoy : imageMan"
            alt
            :class="{ img1: img1Show, img2: img2Show }"
            v-if="item.sex == '男'"
          />
          <img
            :src="item.bedLabel.includes('_') ? imageGirl : imageWomen"
            alt
            :class="{ img1: img1Show, img2: img2Show }"
            v-else
          />
          <div class="name" flex-box="1">
            {{ item.name }}
            <span
              class="nursingClass"
              v-if="['lyxrm', 'stmz', '925', 'qhwy'].includes(HOSPITAL_ID)"
              :style="{
                color: levelColor[item.nursingClass],
                fontSize: '12px'
              }"
              >{{
                item.nursingClass && item.nursingClass.replace("护理", "")
              }}</span
            >
          </div>

          <div class="bed">{{ item.bedLabel }} 床</div>

          <span
            class="point-box"
            v-if="$route.path == '/formPage'"
            v-show="
              item.formLowestStatus !== '' && item.formLowestStatus != '2'
            "
            :class="{
              red: item.formLowestStatus == 0,
              green: item.formLowestStatus == 1,
              isImg2: img2Show
            }"
          ></span>
          <div
            class="angle"
            v-if="nursingClassList.includes(HOSPITAL_ID) && item.nursingClass"
          >
            <img :src="require(`./images/${item.nursingClass}.png`)" alt />
          </div>
        </router-link>
      </div>

      <div
        class="flag-con"
        :style="{ top: flagTop }"
        flex="main:center cross:center"
        @click="toOpenLeft"
      >
        <i
          class="iconfont icon-yincang"
          v-show="openLeft"
          style="margin-left: -1px"
        ></i>
        <i
          class="iconfont icon-xianshi"
          v-show="!openLeft"
          style="margin-left: -2px"
        ></i>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-list-part {
  // height: auto;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
  position: relative;
  border-right: 1px solid #CBD5DD;
  position: relative;
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  background: #fff;
}

.patient-list-contain {
  padding: 0px 3px 11px 13px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  cursor: pointer;
  position: relative;

  .patient-box {
    padding: 6px 6px;
    font-size: 13px;
    border-radius: 3px;
    margin: 1px 0;
    position: relative;
    text-decoration: none !important;

    .angle {
      position: absolute;
      top: 0px;
      right: 0px;
      img{
        height: 15px;
        width: 15px;
      }
    }

    .img1 {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 11px;
    }

    .img2 {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 11px;
      // margin-left: -11px;
    }

    .name {
      color: #687179;
    }

    .bed {
      margin-right: 5px;
      color: #333333;
    }

    &:hover {
      background: #F7F7FA;
    }

    &.active {
      background: #F1F1F5;
      font-weight: bold;

      .name {
        color: #333333;
      }
    }
    &.lyxrmActive{
      background: #adadaf;
    }
  }
}

.search-box {
  position: absolute;
  top: 10px;
  left: 15px;
  width: 168px;

  >>>&.el-input {
    margin-bottom: 5px;
  }

  >>>.el-input__inner {
    height: 28px;
    outline: none;
    padding-left: 10px;
    background: #fff;
    border-radius: 4px;
    font-size: 12px !important;
    color: #333;
  }
}

.flag-con {
  width: 10px;
  height: 73px;
  position: absolute;
  right: -11px;
  top: 100px;
  z-index: 10;
  background-image: url('../../common/images/patient/隐藏框.png');
  cursor: pointer;

  &:hover {
    color: #5CC6A1;
  }

  i {
    font-size: 12px;
  }
}

.left-wapper {
  position: relative;
  // height: calc(100vh - 114px);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.point-box {
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 1px solid #EAEEF1;
  margin-left: 5px;
  border-radius: 50%;
  position: absolute;
  left: 25px;
  top: 3px;

  &:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  &.red:after {
    background: #E62C2C;
  }

  &.green:after {
    background: #27A45E;
  }

  &.isImg2 {
    left: 14px;
  }
}
.el-button-group{
  display: flex;
  justify-content: space-between;
}
</style>
<script>
import common from "@/common/mixin/common.mixin.js";
import { listItem } from "@/api/common.js";
import { patients } from "@/api/lesion";
import { getPatientInfo } from "@/api/common";
import bus from "vue-happy-bus";
import FollowList from "../follow/index";
//解锁
// import {unLock,unLockTime} from "@/Page/sheet-hospital-eval/api/index.js"
import { mapState } from "vuex";
export default {
  props: {
    data: Array,
    toName: String,
    callFunction: Function,
    width: String,
    collapse: Boolean
  },
  mixins: [common],
  data() {
    return {
      searchWord: "",
      bus: bus(this),
      img1Show: true,
      img2Show: false,
      selectPatientId: "",
      patientListLoading: false,
      bedList: [],
      baseBedList: [],
      //需要患者列表中增加护理等级显示的医院
      nursingClassList: ["guizhou", "foshanrenyi"],
      imageBoy: require("./images/男婴.png"),
      imageGirl: require("./images/女婴.png"),
      imageMan: require("./images/男.png"),
      imageWomen: require("./images/女.png"),
      noClearCurrentPatient: ["guizhou"], // 不需要清空当前选中患者的医院
      isGroup: false, // 是否选中管床
      makePatient: "", // 贵州护理巡视表的点击患者
      lockHospitalList: ["huadu"], //有锁定功能的医院
      levelColor: {},
      isRefresh:
        ["whsl"].includes(this.HOSPITAL_ID) &&
        location.href.includes("newSingleTemperatureChart"),
      patientGroup: "", // 病人分组
      fliterList: []
    };
  },
  methods: {
    // 处理筛选
    handleFilter(e, list) {
      let autoCompleteData = [
        { code: "三天内体温超37.3", name: "三天内体温超37.3" },
        { code: "当天入院", name: "当天入院" },
        { code: "入院3天内", name: "入院3天内" },
        { code: "术后3天内", name: "术后3天内" },
        { code: "病危患者", name: "病危患者" },
        { code: "病重患者", name: "病重患者" },
        { code: "转科患者", name: "转科患者" },
        { code: "特级护理患者", name: "特级护理患者" },
        { code: "一级护理患者", name: "一级护理患者" },
        { code: "二级护理患者", name: "二级护理患者" },
        { code: "三级护理患者", name: "三级护理患者" },
        { code: "3天未解大便", name: "3天未解大便" }
      ];
      window.openAutoComplete({
        style: {
          top: `${e.y - window.scrollY + 10}px`,
          left: `${e.y - window.scrollX + 120}px`,
          addWidth: `${e.offsetWidth}px`,
          width: "150px"
        },
        data: autoCompleteData,
        multiple: true,
        callback: function(data) {
          if (!list.includes(data)) {
            list.push(data);
          } else {
            let index = list.indexOf(data);
            list.splice(index, 1);
          }
        },
        selectedList: list,
        id: `${e.x}${e.y}`
      });
    },
    async toUnlock(value) {
      // 双选是同一患者时置空当前患者，并跳转值父级路由。
      if (
        this.HOSPITAL_ID == "guizhou" &&
        value.bedLabel == this.makePatient &&
        this.$route.path == "/nursingMakeItem"
      ) {
        this.$router.push("/nursingRounds");
        this.$store.commit("upMakePatient", "");
        this.makePatient = "";
      } else {
        this.makePatient = value.bedLabel;
        this.$store.commit("upMakePatient", value.bedLabel);
      }
      // 函数在minxin里。src\common\mixin\common.mixin.js
      if (this.lockHospitalList.includes(this.HOSPITAL_ID)) {
        await this.destroyUnlock();
      }
    },
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        let config = process.env.hasFollow ? { showFollew: true } : null;
        patients(this.deptCode, config).then(res => {
          let {
            data: { data }
          } = res;
          let bedData = data.filter(item => item.patientId);
          this.baseBedList = bedData;
          this.bedList = bedData;
          this.hasGroupHos && this.groupBedList.length && (this.isGroup = true);
          this.patientListLoading = false;
          this.fetchData();
        });
      }
    },
    selectPatient(patient) {
      if (
        !this.$store.state.admittingSave.isLeaveTip &&
        this.HOSPITAL_ID == "nfyksdyy"
      ) {
        return this.$confirm("入院评估单还未保存，是否需要离开页面?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store.commit("upIsLeaveTip", true);
            this.selectPatientId = patient.patientId;
            if (this.callFunction) {
              this.$route.query.patientId = patient.patientId;
              this.$route.query.visitId = patient.visitId;
              this.$route.query.inpNo = patient.inpNo;
              patient.formId = this.$route.params.formId || "";
              //
              this.$store.commit("upCurrentPatientObj", patient);
              this.$store.commit("upWardCode", patient.wardCode || "");
              this.$store.commit("upWardName", patient.wardName || "");
              //patient 参数 true是否要滚动到最后一页
              this.callFunction(patient, true);
              //
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else if(
        !this.$store.state.admittingSave.isLeaveTip &&
        this.HOSPITAL_ID == "foshanrenyi")
      {
         window.app
        .$confirm("是否保存一体化评估内容", "提示", {
          confirmButtonText: "保存",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then((res) => {
          this.bus.$emit("tosave")
          this.$store.commit("upIsLeaveTip", true);
          this.selectPatientId = patient.patientId;
          if (this.callFunction) {
            this.$route.query.patientId = patient.patientId;
            this.$route.query.visitId = patient.visitId;
            this.$route.query.inpNo = patient.inpNo;
            patient.formId = this.$route.params.formId || "";
            //
            this.$store.commit("upCurrentPatientObj", patient);
            this.$store.commit("upWardCode", patient.wardCode || "");
            this.$store.commit("upWardName", patient.wardName || "");
            //patient 参数 true是否要滚动到最后一页
            this.callFunction(patient, true);
            //
          }
          next();
        });
      }else {
        this.selectPatientId = patient.patientId;
        if (this.callFunction) {
          this.$route.query.patientId = patient.patientId;
          this.$route.query.visitId = patient.visitId;
          this.$route.query.inpNo = patient.inpNo;
          patient.formId = this.$route.params.formId || "";
          //
          this.$store.commit("upCurrentPatientObj", patient);
          this.$store.commit("upWardCode", patient.wardCode || "");
          this.$store.commit("upWardName", patient.wardName || "");
          //patient 参数 true是否要滚动到最后一页
          this.callFunction(patient, true);
          //
        }
      }
    },
    isActive(item) {
      return (
        item.patientId == (this.selectPatientId || this.$route.query.patientId)
      );
    },
    toOpenLeft() {
      this.$store.commit("upOpenSheetLeft", !this.openLeft);
    },
    findCurrentPatient({ patientId, visitId }) {
      return this.sortList.find(p => {
        return patientId == p.patientId && visitId == p.visitId;
      });
    },
    async fetchData() {
      // 返回模块时还是原来的患者
      let currentPatient = this.$store.getters.getCurrentPatient();
      let patientId =
        currentPatient.patientId || this.$route.params.patientId || "";
      let visitId = this.$route.params.visitId || currentPatient.visitId || "";
      let p = this.findCurrentPatient({
        patientId,
        visitId
      });
      if (!p && this.isAdmissionHisView) {
        patientId = this.$route.params.patientId;
        visitId = this.$route.params.visitId;
        let res = await getPatientInfo(patientId, visitId);
        p = res.data.data;
      }
      if (p) {
        if (currentPatient) {
          p = { ...currentPatient, ...p };
        }

        this.selectPatient(p);
      }
      console.log(
        "路由拦截:$route.params",
        [currentPatient],
        [p, this.sortList],
        [this.$route.params]
      );
    },
    /**初始自动选择第一个患者 by临邑 */
    selectFirstPatient() {
      let item = this.sortList[0];
      if (this.curSheetPatient.patientId) {
        item = this.curSheetPatient;
        this.makePatient = this.curSheetPatient.bedLabel;
        this.selectPatient(item);
      }
      this.$router.replace({
        name: this.toName,
        params: {
          patientId: item.patientId,
          visitId: item.visitId,
          formId: item.id,
          inpNo: item.inpNo
        }
      });
    }
  },
  computed: {
    ...mapState({
      curSheetPatient: state => state.patient.currentPatient
    }),
    isAdmissionHisView() {
      return this.$route.path.includes("admissionHisView");
    },
    list() {
      return this.bedList.filter(item => {
        return (
          item.bedLabel.indexOf(this.searchWord) > -1 ||
          item.name.indexOf(this.searchWord) > -1
        );
      });
    },
    //排序对应婴儿数据
    sortList() {
      let cacheList = JSON.parse(JSON.stringify(this.list));
      for (let i = 0; i < cacheList.length; i++) {
        // 736
        // let cacheSign = cacheList[i].name.indexOf("婴");
        let cacheSign;
        if (cacheList[i].name.charAt(cacheList[i].name.length - 1) === "婴") {
          let parentIndex = cacheList.findIndex(item => {
            item.name == cacheList[i].name.substring(0, cacheSign);
          });
          if (parentIndex != -1) {
            cacheSign = cacheList[i].name.indexOf("婴");
          }
        }
        if (cacheSign > -1) {
          cacheList[i].babyName = cacheList[i].name.substring(cacheSign);
          cacheList[i].name = cacheList[i].name.substring(0, cacheSign);
          if (cacheList[i].bedLabel.split("_").length > 1) {
            cacheList[i].bedLabel = cacheList[i].bedLabel.split("_")[0];
          }
        }
        cacheList[i].cacheNum = i;
      }
      let sortData = [];
      for (let i = 0; i < cacheList.length; i++) {
        let filter1Array = [];
        let sortFilter = [];
        let cacheData = [];
        if (!cacheList[i].babyName) {
          sortFilter.push(cacheList[i]);
        }
        for (let j = 0; j < cacheList.length; j++) {
          if (
            !cacheList[i].babyName &&
            cacheList[i].patientId !== cacheList[j].patientId &&
            cacheList[i].bedLabel == cacheList[j].bedLabel &&
            cacheList[i].name === cacheList[j].name &&
            cacheList[j].babyName == "婴"
          ) {
            filter1Array.push(cacheList[j]);
          }
        }
        cacheData = sortFilter.concat(filter1Array);
        sortData = sortData.concat(cacheData);
      }
      let putSortList = [];
      sortData.forEach((item, index) => {
        putSortList[index] = this.list[item.cacheNum];
      });
      //
      try {
        this.$store.commit(
          "upPatientListObj",
          JSON.parse(JSON.stringify(putSortList))
        );
      } catch (error) {}
      if (this.hasPatientGroup && this.patientGroup) {
        if (this.HOSPITAL_ID == "nfyksdyy") {
          putSortList = putSortList.filter(
            item => item.expand3 === this.patientGroup
          );
        } else {
          return putSortList.filter(item => item.expand3 === this.patientGroup);
        }
      }
      // 高级筛选处理
      if (this.fliterList.length && this.HOSPITAL_ID == "nfyksdyy") {
        return putSortList.filter(item => {
          let admObj = {
            "三天内体温超37.3": item.temperatureFlag == 1,
            当天入院: item.inpDay == 1,
            入院3天内: item.newInFlag == 1,
            术后3天内: item.operationFlag == 1,
            转科患者: item.transferFlag == 1,
            "3天未解大便": item.notDefecateFlag == 1,
            病危患者: item.patientCondition == "病危",
            病重患者: item.patientCondition == "病重",
            特级护理患者: item.nursingClass == "特级护理",
            一级护理患者: item.nursingClass == "一级护理",
            二级护理患者: item.nursingClass == "二级护理",
            三级护理患者: item.nursingClass == "三级护理"
          };
          let judgeList = this.fliterList.map(items => {
            return admObj[items];
          });
          return judgeList.includes(true);
        });
      }

      return putSortList;
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    flagTop() {
      return `${this.wih * 0.4}px`;
    },
    hasFollowList() {
      return process.env.hasFollow;
    },
    hasGroupHos() {
      return process.env.hasGroupHos;
    },
    groupBedList() {
      return this.baseBedList.filter(item => item.focus);
    },
    hasPatientGroup() {
      return ["nfyksdyy"].includes(this.HOSPITAL_ID);
    },
    // 病人分组（expand3字段）
    patientGroup4Expand3() {
      const result = Array.from(
        new Set(this.bedList.map(item => item.expand3))
      ).map(item => {
        return {
          name: item ? `分组${item}` : "无",
          value: item
        };
      });
      return result;
    }
  },
  watch: {
    deptCode(nowData) {
      // 清空当前选中病人
      if (!this.noClearCurrentPatient.includes(this.HOSPITAL_ID))
        this.$store.commit("upCurrentPatientObj", new Object());

      if (nowData == "051102") {
        this.img1Show = false;
        this.img2Show = true;
      } else {
        this.img1Show = true;
        this.img2Show = false;
      }
      this.getDate();
      if (this.$route.path.indexOf("/sheetPage") > -1) {
        this.$store.commit("upCurSheetPatient", {});
        this.$router.push("/sheetPage");
      }
    },
    "$route.params.patientId"(nVal, oVal) {
      nVal && nVal === this.curSheetPatient.patientId && this.fetchData();
    },
    isGroup(val) {
      this.bedList = val ? this.groupBedList : this.baseBedList;
    },
    // 贵州护理巡视选中患者是如点击到护理巡视模块置空选中的患者
    "$route.path"(newValue) {
      if (
        newValue == "/nursingRounds" &&
        this.makePatient &&
        this.HOSPITAL_ID == "guizhou"
      ) {
        this.makePatient = "";
        this.$store.commit("upMakePatient", "");
      }
    },
    "sortList.length": {
      handler(n, o) {
        if (n && n != o) {
          this.selectFirstPatient();
        }
      }
    }
  },
  created() {
    if (this.deptCode) {
      this.getDate();
    }
    listItem("nursing_level").then(res => {
      const levelColor = res.data ? res.data.data : [];
      this.levelColor = {};
      levelColor.map(item => {
        this.levelColor[item.code] = item.name;
      });
    });
  },
  mounted() {
    if (this.deptCode == "051102") {
      this.img1Show = false;
      this.img2Show = true;
    }
  },
  components: {
    FollowList
  }
};
</script>
