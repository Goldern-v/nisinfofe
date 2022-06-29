
<template>
  <div class="containter">
    <div class="body-con" id="sheet_body_con" :style="{height: containHeight}">
      <div class="left-part">
        <!-- <patientList :data="data.bedList" :isSelectPatient="isSelectPatient" v-loading="patientListLoading"></patientList> -->
        <patientList toName="sugarPage" :callFunction="isSelectPatient" />
      </div>
      <div class="right-part" :style="{marginLeft: openLeft?'200px':'0'}" ref="rightPart">
        <!-- <bloodSugar ref="bloodSugar"></bloodSugar> -->
        <div v-if="HOSPITAL_ID === 'sdlj'">
          <component v-if="!isAdult" :is="el" ref="bloodSugar" @removeSugar='removeSugar' :setScrollTop="setScrollTop"/>
          <sugarBtn v-else ref="sugarBtn" @onAddTableModal='onAddTableModal'></sugarBtn>
        </div>
        <div v-else>
          <component :is="switchCompt()" ref="bloodSugar" :setScrollTop="setScrollTop"/>
        </div>
      </div>
    </div>
    <bloodSugarModal ref="bloodSugarModal" @onCreate='onCreate'></bloodSugarModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.containter
  margin 0
  border 1px solid #CBD5DD
  border-radius 2px
  &.fullpage
    position fixed !important
    z-index 10000
    left 0
    top 0
    bottom 0
    right 0
    margin 0
  .head-con
    height 41px
  .body-con
    position relative
    .left-part
      width 199px
      position absolute
      left 0
      top 0
      bottom 0
    .right-part
      margin-left 199px
      height 100%
      overflow auto
      transition: all .4s cubic-bezier(.55, 0, .1, 1)
</style>

<script>
// import patientList from "@/components/patient-list/patient-list.vue";
import patientList from "@/components/patient-list/patient-list-router-link.vue";
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar"; // 厚街医院
import bloodSugarWeiXian from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_weixian"; // 威县医院
import bloodSugarBhry from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_bhry"; // 北海人医
import bloodSugarSdlj from "@/Page/patientInfo/supPage/blood-sugar-sdlj/blood-sugar-sdlj";
import bloodSugarFsxt from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_fsxt"; // 佛山杏坛
import sugarBtn from "@/Page/patientInfo/supPage/blood-sugar-sdlj/components/sugar-btn.vue";
import bloodSugarModal from "@/Page/patientInfo/supComponts/modal/blood-sugar-modal.vue"
import tr from '../sheet-page/components/config/tbhld_lc/tr';
import { getPatientForm } from "@/Page/patientInfo/supPage/blood-sugar-sdlj/api/index.js"; //获取患者存在表单id

export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: []
      },
      patientListLoading: false,
      bus: bus(this),
      isAdult: true,
      el: 'bloodSugar'
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    containHeight() {
      return this.wih - 62 + "px";
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
  },
  methods: {
    removeSugar() {
      this.isAdult = true
    },
    onAddTableModal() {
      this.$refs.bloodSugarModal.open()
    },
    onCreate(data) {
      this.isAdult = false
      // if (data.type == "成人")
      //   this.el = 'bloodSugarSdlj'
      // else
        this.el = 'bloodSugar'
    },
    //设置滚动
    setScrollTop(){
      console.log("滚动")
      if(["beihairenyi"].includes(this.HOSPITAL_ID)){
        this.$nextTick(()=>{
          const rightPart = this.$refs.rightPart;
            console.log(rightPart.querySelectorAll(".sugr-page").length)
            rightPart.scrollTop = rightPart.scrollHeight - 1050;
        })
      }
    },
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then(res => {
          this.data.bedList = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    },
    // 依据医院名字，标题组件切换
    switchCompt(HisName = process.env.HOSPITAL_NAME) {
      let hisList = {
        威县人民医院: "bloodSugarWeiXian",
        东莞市厚街医院: "bloodSugar",
        北海市人民医院:'bloodSugarBhry',
        南方医科大学顺德医院附属杏坛医院:'bloodSugarFsxt',
        // 佛山市顺德区龙江医院: 'bloodSugarSdlj'
      };
      return hisList[HisName] || "bloodSugar";
    },
    async isSelectPatient(item,isScrollTop=false) {
      if (this.HOSPITAL_ID === 'sdlj') {
        const { data } = await getPatientForm(item.patientId, item.visitId)
        // data数据为空的情况下是 这个患者没有创建血糖单子
        if (!data.data) {
          this.isAdult = true
        } else {
          // 判断是否是成人 还是创建儿童
          this.isAdult = false
          if (data.data.hisPatSugarList) { // 接口儿童单子特有的字段 hisPatSugarList
            // '儿童'
            this.el = 'bloodSugar'
          }
          // else {
          //   // '成人'
          //   this.el = 'bloodSugarSdlj'
          // }
          this.$router.replace({
            path: "/sugarPage",
            query: item
          }, () => {
            this.$refs.bloodSugar && this.$refs.bloodSugar.load(isScrollTop);
          });
        }
      } else {
        this.$router.replace({
          path: "/sugarPage",
          query: item
        }, () => {
          this.$refs.bloodSugar.load(isScrollTop);
        });
      }
    }
  },
  created() {
    this.$store.commit("upPatientInfo", {});
    // 初始化
    if (this.deptCode) {
      this.getDate();
      // console.log('oppppp', this.patientInfo);
    }

    this.bus.$on("refreshFormPagePatientList", this.getDate);
  },
  watch: {
    deptCode(val, oldValue) {
      if (oldValue && val) {
        this.$router.replace({
          path: "/sugarPage",
          query: {}
        });
        this.bus.$emit("refreshTree", true);
        this.bus.$emit("closeAssessment");
      }
      this.getDate();
    },
  },
  components: {
    patientList,
    bloodSugar,
    bloodSugarWeiXian,
    bloodSugarBhry,
    bloodSugarSdlj,
    bloodSugarFsxt,
    sugarBtn,
    bloodSugarModal
  }
};
</script>
