<template>
  <div class="patient-info-head">
    <el-row
      class="logo-con"
      type="flex"
      align="middle"
      v-if="HOSPITAL_ID == 'hj'"
    >
      <img src="../../../common/images/logo_hj.png" height="63" width="63" />
      <span>
        东莞市厚街医院
        <br />智慧护理信息系统
      </span>
    </el-row>
    <div class="nav-con">
      <router-link
        :to="{
          path: '/home',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">首页</div>
      </router-link>
      <el-dropdown
        v-if="HOSPITAL_ID == 'nfyksdyy'"
        menu-align="start"
        class="nav-item"
        :class="{ 'router-link-active': isNursing }"
      >
        <el-row class="nav-items" type="flex" align="middle">
          护理文书
        </el-row>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :class="{ active: $route.path == '/admissionPageAdult2' }"
          >
            <router-link
              :to="{
                path: '/admissionPageAdult2',
                query: { patientId: query.patientId, visitId: query.visitId }
              }"
              tag="span"
            >
              <el-row class="menu-item" type="flex" align="middle">
                <i class="sheetHospitalAdmission"></i>入院评估(成人)
              </el-row>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item :class="{ active: $route.path == '/record' }">
            <router-link
              :to="{
                path: '/record',
                query: { patientId: query.patientId, visitId: query.visitId }
              }"
              tag="span"
            >
              <el-row class="menu-item" type="flex" align="middle">
                <i class="nursingAssessment"></i>护理文书
              </el-row>
            </router-link>
          </el-dropdown-item>
          <!-- <el-dropdown-item :class="{ active: $route.path == '/sheet' }">
            <router-link
              :to="{
                path: '/sheet',
                query: { patientId: query.patientId, visitId: query.visitId }
              }"
              tag="span"
            >
              <el-row class="menu-item" type="flex" align="middle">
                <i class="sheetHospitalEval"></i>护理记录单
              </el-row>
            </router-link>
          </el-dropdown-item>

          <el-dropdown-item :class="{ active: $route.path == '/bloodSugar' }">
            <router-link
              :to="{
                path: '/bloodSugar',
                query: { patientId: query.patientId, visitId: query.visitId }
              }"
              tag="span"
            >
              <el-row class="menu-item" type="flex" align="middle"
                ><i class="bloodSugar"></i>血糖</el-row
              >
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item
            :class="{ active: $route.path == '/healthEducation' }"
          >
            <router-link
              :to="{
                path: '/healthEducation',
                query: { patientId: query.patientId, visitId: query.visitId }
              }"
              tag="span"
            >
              <el-row class="menu-item" type="flex" align="middle">
                <i class="healthEdu"></i>健康教育单
              </el-row>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item :class="{ active: $route.path == '/diagnosis' }">
            <router-link
              :to="{
                path: '/diagnosis',
                query: { patientId: query.patientId, visitId: query.visitId }
              }"
              tag="span"
            >
              <el-row class="menu-item" type="flex" align="middle">
                <i class="sheetHospitalAdmission"></i>护理计划单</el-row
              >
            </router-link>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
      <router-link
        v-else
        :to="{
          path: '/record',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理文书</div>
      </router-link>
      <router-link
        v-if="['hj', 'fuyou', 'liaocheng', 'sdlj', 'ytll'].includes(HOSPITAL_ID)"
        :to="{
          path: '/doctorEmr',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">病历</div>
      </router-link>
      <div
        class="nav-item"
        v-if="['nfyksdyy'].includes(HOSPITAL_ID)"
        @click="openNewPage('onnfyksdyyEmrWeb')"
      >
        病历
      </div>
      <!-- <span v-if="['hj'].includes(HOSPITAL_ID)">
        <a
          class="nav-item no-under-link"
          :href="`openIE:http://10.35.0.135:9080/htweb/ShowInpatientInfo.jsp?ipid=${query.patientId}~${query.visitId}`"
        >病历(新)</a>
      </span> -->
      <router-link
        v-if="
          HOSPITAL_ID !== 'zhzxy' &&
            HOSPITAL_ID !== 'whsl' &&
            HOSPITAL_ID !== 'gdtj'
        "
        :to="{
          path: '/sheetNursingOrder',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护嘱单</div>
      </router-link>
      <router-link
        :to="{
          path: '/sheet',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
        v-if="HOSPITAL_ID != 'nfyksdyy'"
      >
        <div class="nav-item">护理记录单</div>
      </router-link>
      <router-link
        :to="{
          path: '/temperature',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
        v-if="HOSPITAL_ID != 'nfyksdyy'"
      >
        <div class="nav-item">体温单</div>
      </router-link>

      <el-row
        v-if="HOSPITAL_ID == 'hj'"
        class="nav-item"
        type="flex"
        align="middle "
      >
        <div @click="getPushLink()">
          <i class="singleTemperatureChart"></i>临床路径
        </div>
      </el-row>

      <router-link
        v-if="
          HOSPITAL_ID !== 'zhzxy' &&
            HOSPITAL_ID !== 'gdtj' &&
            HOSPITAL_ID !== 'whsl' &&
            HOSPITAL_ID !== 'ytll' &&
            HOSPITAL_ID !== 'nfyksdyy' &&
            HOSPITAL_ID !== 'dglb'
        "
        :to="{
          path: '/hospitalEval',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">住院日常评估</div>
      </router-link>
      <router-link
        :to="{
          path: '/diagnosis',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        v-if="HOSPITAL_ID != 'nfyksdyy'"
        tag="span"
      >
        <div class="nav-item">护理计划</div>
      </router-link>
      <router-link
        :to="{
          path: '/bloodSugar',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        v-if="!(['gdtj', 'nfyksdyy'].includes(HOSPITAL_ID))"
        tag="span"
      >
        <div class="nav-item">血糖</div>
      </router-link>
      <div class="nav-item" v-if="['gdtj'].includes(HOSPITAL_ID)" @click="openNewPage('toBloodSugar')">血糖</div>

      <router-link
        :to="{
          path: '/healthEducation',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        v-if="HOSPITAL_ID != 'nfyksdyy'"
        tag="span"
      >
        <div class="nav-item">健康教育单</div>
      </router-link>
      <router-link
        :to="{
          path: '/cost',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">费用信息</div>
      </router-link>
      <router-link
        :to="{
          path: '/information',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">基本信息</div>
      </router-link>
      <router-link
        :to="{
          path: '/advice',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">医嘱</div>
      </router-link>
      <router-link
        v-if="['dglb'].includes(HOSPITAL_ID)"
        :to="{
          path: '/dev',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">手术</div>
      </router-link>
      <router-link
        :to="{
          path: '/inspect',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">检查</div>
      </router-link>
      <router-link
        :to="{
          path: '/test',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">检验</div>
      </router-link>
      <!-- <router-link
        v-if="['dglb'].includes(HOSPITAL_ID)"
        :to="{
          path: '/dev',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">手术</div>
      </router-link> -->
      <router-link
        v-if="['fsxt', 'dglb'].includes(HOSPITAL_ID)"
        :to="{
          path: '/doctorEmr',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">病历</div>
      </router-link>
      <router-link
        :to="{ path: '/consultation', query: $route.query }"
        tag="span"
        v-if="['zhzxy', 'beihairenyi'].includes(HOSPITAL_ID)"
      >
        <div class="nav-item">会诊</div>
      </router-link>
      <router-link
        v-if="HOSPITAL_ID === 'whsl'"
        :to="{
          path: '/sheetNursingOrder',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护嘱单</div>
      </router-link>
      <span
        class="nav-item"
        v-if="['gdtj'].includes(HOSPITAL_ID)"
        @click="openNewPage('toYst')"
        >医膳通</span
      >
      <div
        class="nav-item"
        v-if="['gdtj'].includes(HOSPITAL_ID)"
        @click="openNewPage('onEmrWeb')"
      >
        病历
      </div>
      <div
        class="nav-item"
        v-if="['whsl'].includes(HOSPITAL_ID)"
        @click="openNewPage('gotoView')"
      >
        360视图
      </div>
      <router-link
        v-if=" ['whsl', 'fsxt','ytll'].includes(HOSPITAL_ID)"
        :to="{
          path: '/patientNursingRound',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理巡视</div>
      </router-link>
      <router-link
        v-if=" ['whsl', 'nfyksdyy', 'fsxt', 'ytll', 'hj'].includes(HOSPITAL_ID)"
        :to="{
          path: '/implementationPerson',
          query: {
            patientId: query.patientId,
            visitId: query.visitId,
            bedLabel: query.bedLabel
          }
        }"
        tag="span"
      >
        <div class="nav-item">执行记录</div>
      </router-link>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.logo-con {
  width: 200px;
  min-width: 200px;
  height: 50px;
  background: #4bb08d;
  position: fixed;
  left: 0;
  top: 0;
  padding-left: 10px;

  img {
    width: 36px;
    height: 36px;
  }

  span {
    margin-left: 6px;
    font-size: 14px;
    color: #EFF2F9;
    letter-spacing: 0;
    line-height: 16px;
  }
}

.nav-con {
  height: 50px;
  min-width: 1030px;
  background-image: linear-gradient(-180deg, #F7F7F9 0%, #EAEBEF 100%);
  padding-top: 12px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #CBD5DD;
  position: fixed;
  width: 100%;
  z-index: 10;
}

.nav-item {
  height: 37px;
  line-height: 37px;
  padding: 0 10px;
  font-size: 13px;
  color: #000;
  font-weight: 700;
  letter-spacing: 0.26px;
  float: left;
  cursor: pointer;
}

.router-link-active {
  .nav-items,.nav-item {
    background: #F2F2F2;
    border: 1px solid #CBD5DD;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
  }
}
.nav-item-shouma {
  height: 37px;
  line-height: 37px;
  padding: 0 10px;
  font-size: 13px;
  color: #687179;
  letter-spacing: 0.26px;
  float: left;
  cursor: pointer;
}

.no-under-link{
  text-decoration: none;
}
.menu-item {
  height: 38px;
  padding: 0 0px;
  text-align: center;
  font-size: 13px;
  color: #333;
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
      background-image: url('../../../common/images/index/入院评估.png');
    }

    &.sheetHospitalEval {
      background-image: url('../../../common/images/index/住院评估.png');
    }

    &.nursingAssessment {
      background-image: url('../../../common/images/index/护理评估.png');
    }

    &.bloodSugar {
      background-image: url('../../../common/images/index/血糖.png');
    }

    &.healthEdu {
      background-image: url('../../../common/images/index/健康教育单.png');
    }
  }
}
.active{
   background-color: #F8F8FA;

  .menu-item {
    color: #333;
    font-weight: bold;
  }
}
</style>
<script>
import common from "@/common/mixin/common.mixin";
import md5 from "md5";
import qs from "qs";
import { mapState } from "vuex";
import { getLink } from "@/api/lesion";

export default {
  mixins: [common],
  data() {
    return {
      msg: "hello vue"
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    ...mapState({
      patient: state => state.patient.currentPatient
    }),
    isNursing() {

      let path = this.$route.path;
      let istPath = [
        "admissionPageAdult2",
        "sheet",
        "record",
        "bloodSugar",
        "healthEducation",
        "diagnosis"
      ].some(item => path.includes(item) && path != '/sheetNursingOrder');
      return istPath;
    }
  },
  components: {},
  methods: {
    openNewPage(key) {
      if (key) {
        this[key]();
      }
    },
    getPushLink() {
      let { patientId, visitId, wardCode } = this.query;
      let empNo = JSON.parse(localStorage.user).empNo;
      getLink(patientId, visitId, empNo, wardCode).then(res => {
        this.copy(res.data.data.link);
      });
    },
    copy(text) {
      console.log("text", text);
      this.$confirm("即将跳转至外部链接", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let a = document.createElement("a");
        a.setAttribute("href", `openIE:${text}`);
        a.setAttribute("target", "_blank");
        a.setAttribute("id", "startTelMedicine");
        // 防止反复添加
        if (document.getElementById("startTelMedicine")) {
          document.body.removeChild(
            document.getElementById("startTelMedicine")
          );
        }
        document.body.appendChild(a);
        a.click();
      });
    },
    // （顺德龙江）手麻记录单（第三方链接）
    toHandNumbness() {
      window.open(
        `http://192.168.100.9:8280/trackao/basedata/userLoginForClient.action?id=1668&password=123&resultCode=getTrackaoAnaesRecordPDF&hisId=${this.query.inpNo}`
      );
    },
    // 医膳通
    toYst() {
      const {
        deptCode,
        name: patName,
        sex: patSex,
        patientId: tfHospNo,
        deptCode: patDeptCode,
        idNo: patCardid,
        patientId: tfHospitalIdentity
      } = this.patient;
      const obj = {
        userLoginId: this.empNo,
        deptCode,
        userName: this.empName,
        patName,
        patSex: this.formatValue(patSex, { 男: "M", 女: "F", default: 0 }),
        tfHospNo,
        tfType: 1,
        patCardid,
        patDeptCode,
        doctorRoleType: 2,
        tfHospitalIdentity,
        routeName: "NutritionScreening",
        isUpdateDept: 1
      };
      let url = `http://192.168.10.66:20000/#/tranView?${qs.stringify(obj)}`;
      window.open(url);
    },
    // 同江病历
    onEmrWeb() {
      console.log(this.patient);
      const { patientId } = this.patient;
      let url = `http://192.168.10.63/EmrWeb/WebForm.aspx?flag=thirdPlat&codePi=${patientId}`;
      window.open(url);
    },
    gotoView() {
      const { patientId, deptCode } = this.patient;
      const obj = {
        ViewType: 3,
        patientId: patientId,
        userName: this.empName,
        Hash: md5(patientId + this.empName + "wego2022"),
        patientType: 1,
        userData: `{"userCode":"${
          this.empNo
        }","orgCode":"${deptCode}","key":"${md5(this.empNo + "@wego2022")}"}`,
        isExternal: 1
      };
      // http://10.101.1.159/pdv-ui/medicalLeportList/?ViewType=3&patientId=2022642569&userName=周文强&Hash=6e5e7a5294c128d99adf1598012c02fb&patientType=&userData={"userCode":"199852","orgCode":"10010201","key":"b31e71cfee6e9fba03019b353203545b"}&isExternal=1
      let url = `http://10.108.1.33/pdv-ui/medicalLeportList/?ViewType=3&patientId=${patientId}&userName=${
        this.empName
      }&Hash=${md5(
        patientId + this.empName + "wego2022"
      )}&patientType=&userData={"userCode":"${
        this.empNo
      }","orgCode":"${deptCode}","key":"${md5(
        this.empNo + "@wego2022"
      )}"}&isExternal=1`;
      window.open(url);
    },
    // 南方医科大学顺德医院项目病历
    onnfyksdyyEmrWeb() {
      const { patientId, inpNo, visitId } = this.patient;
      let url = `http://192.168.8.174:8000/Content/GetSingleContentData?a=1&mdt=H&ordinal=HMedical&ids=${inpNo}`;
      window.open(url);
    },
    toBloodSugar() {
      const { patientId } = this.patient;
      let url = `http://192.168.10.29:9089/patientGlu/patient-glu-report.html?userId=${patientId}`;
      window.open(url);
    },
    formatValue(value, obj) {
      return obj[value] || obj["default"];
    }
  }
};
</script>
