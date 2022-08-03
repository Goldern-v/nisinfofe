<template>
  <div
    class="patient-list-part"
    :style="{ left: openLeft ? '0' : '-201px' }"
    v-loading="patientListLoading"
  >
    <div class="search-box">
      <el-input
        placeholder="床号/姓名"
        icon="search"
        v-model="searchWord"
      ></el-input>
    </div>
    <div class="left-wapper">
     <follow-list :data="sortList" @selectPatient="selectPatient" v-if="hasFollowList">
       <template  slot-scope="{ scope }">
         <span
            class="point-box"
            v-if="$route.path == '/formPage'"
            v-show="
              scope.formLowestStatus !== '' && scope.formLowestStatus != '2'
            "
            :class="{
              red: scope.formLowestStatus == 0,
              green: scope.formLowestStatus == 1,
              isImg2: img2Show,
            }"
          ></span>
       </template>
     </follow-list>
      <el-button-group v-if="hasGroupHos">
        <el-button :type="isGroup?'primary':''" @click="isGroup = true">默认管床</el-button>
        <el-button :type="!isGroup?'primary':''" @click="isGroup = false">全部床位</el-button>
      </el-button-group>
      <div class="patient-list-contain">
        <!-- path: "/hospitalEval/:patientId?/:visitId?/:formId?" @click="selectPatient(item)"-->
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
              inpNo: item.inpNo,
            },
          }"
          :class="{active: makePatient? isActive(item) :false }"
          @click.native="toUnlock(item)"
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
          <div class="name" flex-box="1">{{ item.name }}</div>
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
              isImg2: img2Show,
            }"
          ></span>
          <div class="angle" v-if="nursingClassList.includes(HOSPITAL_ID)&&item.nursingClass">
            <img :src="require(`./images/${item.nursingClass}.png`)" alt/>
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
import { patients } from "@/api/lesion";
import {getPatientInfo} from "@/api/common"
import bus from "vue-happy-bus";
import FollowList from "../follow/index";
//解锁
import {unLock,unLockTime} from "@/Page/sheet-hospital-eval/api/index.js"
export default {
  props: {
    data: Array,
    toName: String,
    callFunction: Function,
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
      nursingClassList: ['guizhou'],
      imageBoy: require("./images/男婴.png"),
      imageGirl: require("./images/女婴.png"),
      imageMan: require("./images/男.png"),
      imageWomen: require("./images/女.png"),
      noClearnCurrentPatient:['guizhou'], // 不需要清空当前选中患者的医院
      isGroup:false ,// 是否选中管床
      makePatient:'',// 贵州护理巡视表的点击患者
      lockHospitalList:['huadu','liaocheng']//有锁定功能的医院
    };
  },
  methods: {
    async destroyUnlock(){
      console.log('护理单解锁')
      const lockForm=localStorage.getItem("lockForm")?JSON.parse(localStorage.getItem("lockForm")) :localStorage.getItem("lockForm")
      console.log(917,lockForm)
      /* 判断是否已经自动解锁 */
      if(lockForm && lockForm.initTime){
        console.log('解锁时间')
        /* 默认是10分钟后自己解锁 ,后期可根据医院修改*/
        let min=10
        const res=await unLockTime()
        if(res.data.code=="200" && res.data.data!="his_form_data_lock_timeout"){
          min = +res.data.data
        }
        /* 评估单初始化时间 乘于多少分钟  1分钟=60000 */
        const afterInitTime= +lockForm.initTime + 60000 * min
        const nowTime=Date.now()
        if(nowTime > afterInitTime ){
          /* 超时间 */
          localStorage.setItem('lockForm','')
          console.log('超时')
          return
        }
       }
       if(lockForm && lockForm.formId && this.lockHospitalList.includes(this.HOSPITAL_ID)){
        console.log('超时还执行？')
          unLock(lockForm.type,lockForm.formId).then(res=>{
             console.log('解锁',res)
             localStorage.setItem('lockForm','')
          })
       }
    },
    async toUnlock(value){
      // 双选是同一患者时置空当前患者，并跳转值父级路由。
      if(this.HOSPITAL_ID == 'guizhou' && value.bedLabel == this.makePatient && this.$route.path=='/nursingMakeItem'){
        this.$router.push('/nursingRounds')
        this.$store.commit("upMakePatient", '');
        this.makePatient = ''
      }else{
         this.makePatient = value.bedLabel
        this.$store.commit("upMakePatient", value.bedLabel);
      }
      await this.destroyUnlock()
    },
    getDate() {
      if (this.deptCode) {
        // console.log("获取病人列表", this.deptCode);
        this.patientListLoading = true;
        let config = process.env.hasFollow ? {showFollew:true} : null
        patients(this.deptCode,config).then((res) => {
          let {data:{data}} = res
          let bedData = data.filter(item=>item.patientId)
          // if(process.env.hasGroupHos){
          //   let isGroup = bedData.every(item=>item.focus == false) // 如果未进行分组，默认显示全部
          //   this.bedList = isGroup?bedData:bedData.filter(item=>item.focus);
          // }else{
          //   this.bedList = bedData;
          // }
          this.baseBedList = bedData
          this.bedList = bedData;
          this.hasGroupHos && this.groupBedList.length && (this.isGroup = true)
          this.patientListLoading = false;
          this.fetchData();
        });
      }
    },
    selectPatient(patient) {
      this.selectPatientId = patient.patientId;
      //
      console.log(
        "selectPatient",
        patient,
        patient.patientId,
        patient.visitId,
        patient.formId,
        this.$route.path,
        this.$route
      );
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
        this.callFunction(patient,true);
        //
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
      return this.sortList.find((p) => {
        return patientId == p.patientId && visitId == p.visitId;
      });
    },
    async fetchData() {
      let currentPatient = ''
      if(this.HOSPITAL_ID == 'whfk'){
        currentPatient = ''
      }else{
        currentPatient = this.$store.getters.getCurrentPatient();
      }
      let patientId =
        this.$route.params.patientId || currentPatient.patientId || "";
      let visitId = this.$route.params.visitId || currentPatient.visitId || "";
      let p = this.findCurrentPatient({
        patientId,
        visitId,
      });
      if(!p&&this.isAdmissionHisView){
        patientId = this.$route.params.patientId
        visitId = this.$route.params.visitId
        let res = await getPatientInfo(patientId,visitId)
        p = res.data.data
      }
      if (p) {
        if(currentPatient){
          p = {...currentPatient,...p}
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
  },
  computed: {
    isAdmissionHisView(){
      return this.$route.path.includes('admissionHisView')
    },
    list() {
      return this.bedList.filter((item) => {
        return (
          item.bedLabel.indexOf(this.searchWord) > -1 ||
          item.name.indexOf(this.searchWord) > -1
        );
      });
    },
    //排序对应婴儿数据
    sortList() {
      let cacheGetList = [];
      let endList = [];
      let cacheList = JSON.parse(JSON.stringify(this.list));
      for (let i = 0; i < cacheList.length; i++) {
        // 736
        // let cacheSign = cacheList[i].name.indexOf("婴");
        let cacheSign;
        if (cacheList[i].name.charAt(cacheList[i].name.length - 1) === "婴") {
          let parentIndex = cacheList.findIndex((item) => {
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
        let sortFliter = [];
        let cacheData = [];
        if (!cacheList[i].babyName) {
          sortFliter.push(cacheList[i]);
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
        cacheData = sortFliter.concat(filter1Array);
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
    hasFollowList(){
      return process.env.hasFollow
    },
    hasGroupHos(){
      return process.env.hasGroupHos
    },
    groupBedList(){
      return this.baseBedList.filter(item=>item.focus)
    },
    
  },
  watch: {
    deptCode(ndata, odata) {
      // 清空当前选中病人
      if(!this.noClearnCurrentPatient.includes(this.HOSPITAL_ID))this.$store.commit("upCurrentPatientObj", new Object());

      if (ndata == "051102") {
        this.img1Show = false;
        this.img2Show = true;
      } else {
        this.img1Show = true;
        this.img2Show = false;
      }
      this.getDate();
      //
    },
    "$route.params.patientId": "fetchData",
    isGroup(val){
      this.bedList = val?this.groupBedList:this.baseBedList
    },
    // 贵州护理巡视选中患者是如点击到护理巡视模块置空选中的患者
    "$route.path"(newValue){
      if(newValue == '/nursingRounds' && this.makePatient && this.HOSPITAL_ID == 'guizhou'){
        this.makePatient = '';
        this.$store.commit("upMakePatient", '');
      }
    }
    
  },
  created() {
    if (this.deptCode) {
      this.getDate();
    }
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
