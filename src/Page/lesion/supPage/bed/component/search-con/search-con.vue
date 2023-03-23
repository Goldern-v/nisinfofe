<template>
  <div class="search-con">
    <div class="search-content">
      <div class="input-con" flex="cross:stretch">
        <input
          class="search-input"
          style="width: 0; height: 0; padding: 0; border: none"
          autofocus
          placeholder="__"
        />
        <input
          type="text"
          class="search-input"
          flex-box="1"
          placeholder="床号/姓名"
          v-model="searchText"
        />
        <input
          class="search-input"
          style="width: 0; height: 0; padding: 0; border: none"
          autofocus
          placeholder="__"
        />
        <div class="search-btn" flex="cross:center main:center">
          <i class="iconfont icon-search"></i>
        </div>
      </div>
      <div v-for="(item, index) in list" :key="index" v-show="!item.hide">
        <div
          class="s-item"
          flex="cross:center"
          v-if="item.type == 'bed'"
          :class="{ active: selectName == item.name }"
          @click="selectType(item.name)"
        >
          <i class="icon-chuangwei iconfont"></i>
          <span>{{ item.name }}（{{ item.num }}）</span>
        </div>

        <div style="height: 20px" v-if="item.type == 'block'"></div>

        <div
          class="s-item"
          flex="cross:center"
          v-if="item.type == 'level'"
          :class="{ active: selectName == item.name }"
          @click="selectType(item.name)"
        >
          <aside class="sq" :style="{ background: item.color }"></aside>
          <span>{{ item.name }}（{{ item.num }}）</span>
        </div>

        <div class="line" v-if="item.type == 'line'"></div>

        <div
          class="s-item"
          flex="cross:center"
          v-if="item.type == 'state'"
          :class="{ active: selectName == item.name }"
          @click="selectType(item.name)"
        >
          <i class="icon-bingwei iconfont"></i>
          <span  :class="{gm:HOSPITAL_ID=='huadu'&& item.name=='过敏'}">{{ item.name }}（{{ item.num }}）</span>
        </div>

        <div
          class="s-item"
          flex="cross:center"
          v-if="item.type == 'heart'"
          :class="{ active: selectName == item.name }"
          @click="selectType(item.name)"
        >
          <i class="icon-shoucang iconfont"></i>
          <span>{{ item.name }}（{{ item.num }}）</span>
        </div>
      </div>

      <button
        class="login-btn"
        @click="syncGetNurseBedRecData"
        v-if="showSyncBedBtn"
      >
        同步床位数据
      </button>
      <span v-if="showSyncBedBtn && node_env=='development'&&showMessage">(测试环境别点，<br/>会清空患者！！！)</span>
      <button
        class="login-btn"
        @click="throttleSyncGetNursePatientRecData"
        v-if="showSyncPatientBtn"
      >
        同步患者数据
      </button>
      <button
        class="login-btn"
        :class="{ noactive: showProgress }"
        @click="syncGetMedicalAdvice"
        v-if="HOSPITAL_ID == 'weixian'"
      >
        同步医嘱
      </button>

      <div class="progress" v-if="showProgress">
        <el-progress
          :percentage="progressNum"
          color="#4bb08d"
          :format="format"
        ></el-progress>
      </div>
      <footerBar
        :selectName="selectName"
        :isTodayDischarg="isTodayDischarge"
        :isTodayOperation="isTodayOperation"
        :isTommorowDischarge="isTommorowDischarge"
        :isTommorowOperation="isTommorowOperation"
        :dangerInMorse="dangerInMorse"
        :dangerInVteLy="dangerInVteLy"
        :dangerInYachuang="dangerInYachuang"
        :isToadyHosipital="isToadyHosipital"
        :hasYachuang="hasYachuang"
        :MEWS="MEWS"
        :isFever="isFever"
        :hasVteDanger="hasVteDanger"
        :isMultiDrugResistant="isMultiDrugResistant"
        :isDangerInThrombus="isDangerInThrombus"
        :isPain="isPain"
        :isAdl="isAdl"
        :tubingShedding="tubingShedding"
        :selfCare="selfCare"
      ></footerBar>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-con {
  padding: 16px 10px;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;

  .input-con {
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 2px 0 0 2px;
    height: 30px;
    margin-bottom: 20px;

    .search-input {
      width: 0;
      outline: none;
      border: 0;
      font-size: 12px;
      color: #687179;
      padding-left: 15px;
    }

    .search-btn {
      width: 40px;
      border-left: 1px solid #C2CBD2;

      i {
        font-size: 18px;
        color: #788188;
      }
    }
  }

  .s-item {
    height: 34px;
    padding-left: 12px;
    font-size: 13px;
    color: #687179;
    cursor: pointer;

    &:hover {
      background: #F7F7FA;
      border-radius: 3px;
    }

    &.active {
      background: #F1F1F5;
      border-radius: 3px;
      font-weight: bold;
      color: #333333;
    }

    i {
      color: #687179;
      font-size: 14px;
      line-height: 16px;
    }

    span {
      margin-left: 8px;
    }

    aside {
      display: inline-block;
      border-radius: 2px;
      width: 11px;
      height: 11px;

      &.type-1 {
        background: rgb(255, 0, 0);
      }

      &.type-2 {
        background: rgb(255, 255, 0);
      }

      &.type-3 {
        background: rgb(0, 255, 0);
      }

      &.type-4 {
        background: rgb(255, 192, 203);
      }
    }
  }
  .gm{
    color :red;
  }
  .line {
    background: #ECEEEF;
    height: 1px;
    margin: 10px 0;
  }

  .progress {
    position: fixed;
    left: 50%;
    top: 100px;
    margin-left: -100px;
    width: 200px;
    height: 120px;
    border-radius: 12px;
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.6);

    >>>.el-progress {
      flex: 1;
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;

      .el-progress-bar {
        width: 80%;
        margin: 0 auto;
        padding-right: 0;

        .el-progress-bar__outer {
          height: 8px !important;
        }
      }

      .el-progress__text {
        font-size: 25px;
        color: #fff;
        padding-bottom: 10px;
      }
    }
  }
}

.login-btn {
  margin-top: 20px;
  width: 100%;
  height: 37px;
  display: block;
  background: #4BB08D;
  border-radius: 2px;
  border: 0;
  color: #fff;
  font-size: 13px;
  font-weight: lighter;
  outline: none;
  cursor: pointer;

  &:hover {
    background: #5CC6A1;
  }

  &.noactive {
    cursor: not-allowed;
    background: rgba(75, 176, 141, 0.6);
  }
}
</style>
<script>

import {
  patients,
  getPatLevelAndStatus,//补充患者信息接口
  syncGetNurseBedRec,
  syncGetMedicalAdvice,
  syncGetNurseBedRecLc,
  syncGetNurseBedRecLiaocheng,
  syncGetNurseBedRecShannan,
  syncGetNurseBedRecQuzhou,
  syncGetNurseBedRecHengli,
  syncGetNurseBedRecJiangMenFY,
  syncGetNurseBedRecJiangMenFSSY,
  syncGetNurseBedRecBeiHaiExecute,
  syncGetNurseBedRecSDLJExecute,
  syncGetNurseBedRecDGXGExecute,
  syncGetNurseBedRecWHHKExecute,
  syncGetNursePatientWHFKRecData
} from "@/api/lesion";
const getThrottleTime = (()=>{
      switch (process.env.HOSPITAL_ID) {
        case 'foshanrenyi':
          return 60*1000
        default:
          return 0
      }
    })()
import footerBar from "../footer-bar/footer-bar.vue";
import {_throttle} from './throttle'
import { listItem } from "@/api/common.js";
export default {
  data() {

    return {
      selectName: "全部床位",
      searchText: "",
      bedList: [],
      levelColor: [],
      progressNum: 0, //进度
      startTimer: "",
      endTimer: "",
      showProgress: false,
      ifCanTobu:true,
      ifCanAsyncPatient:true,
      getThrottleTime,
      // hasGroupHos:['fuyou'] // 需要根据白板进行分组显示的医院
    };
  },
  computed: {
    node_env(){
      return process.env.NODE_ENV
    },
    isChangeke() {
      return this.deptCode.includes("051102");
    },
    deptCode() {
      return this.$store.state.lesion.deptCode;
    },
    // 全部床位
    allBedLength() {
      if (this.HOSPITAL_ID === 'hengli' && this.$store.state.lesion.deptCode === '103') {
        return this.bedList.filter((item) => item.name.indexOf("B") === -1);
      } else if (this.HOSPITAL_ID === 'fuyou' && (this.$store.state.lesion.deptCode === '130'||this.$store.state.lesion.deptCode === '127'||this.$store.state.lesion.deptCode === '436'||this.$store.state.lesion.deptCode === '148')) {
        return this.bedList.filter((item) => item.name.indexOf("婴") === -1);
      } else {
        return this.bedList;
      }
    },
    allBed() {
      return this.bedList;
    },
    nullBed() {
      return this.bedList.filter((item) => !item.patientId);
    },
    inBedLength() {
      if (this.HOSPITAL_ID === 'hengli' && this.$store.state.lesion.deptCode === '103') {
        return this.bedList.filter((item) => item.patientId && item.name.indexOf("B") === -1);
      }else if (this.HOSPITAL_ID === 'fuyou' && (this.$store.state.lesion.deptCode === '130'||this.$store.state.lesion.deptCode === '127'||this.$store.state.lesion.deptCode === '436'||this.$store.state.lesion.deptCode === '148')) {
        return this.bedList.filter((item) => item.patientId && item.name.indexOf("婴") === -1);
      } else {
        return this.bedList.filter((item) => item.patientId);
      }
    },
    inBed() {
      return this.bedList.filter((item) => item.patientId);
    },
    type4() {
      return this.bedList.filter((item) => item.nursingClass == "特级护理");
    },
    type1() {
      return this.bedList.filter((item) => item.nursingClass == "一级护理");
    },
    type2() {
      return this.bedList.filter((item) => item.nursingClass == "二级护理");
    },
    type3() {
      return this.bedList.filter((item) => item.nursingClass == "三级护理");
    },
    bw() {
      return this.bedList.filter((item) => item.patientCondition == "病危");
    },
    bz() {
      return this.bedList.filter((item) => item.patientCondition == "病重");
    },
    gm() {
      let lists = []
      if(this.HOSPITAL_ID == "beihairenyi"){
        lists = this.bedList.filter((item) => item.hasAllergy)
      }else{
        lists = this.bedList.filter((item) => item.drugGms||item.allergy1||item.allergy2)
      }
      return lists;
    },
    heart() {
      return this.bedList.filter((item) => item.isFollow == "1");
    },
    // 共出床位 本科室共享给其他科室（也可以是自己科室）使用
    shareOut() {
      return this.bedList.filter((item) => item.flagShare == '1')
    },
    // 共入床位
    shareIn() {
      return []
    },
    // 预出院
    isTodayDischarge() {
      return this.bedList.filter((item) => item.isTodayDischarge == "1");
    },
    // 今日手术
    isTodayOperation() {
      return this.bedList.filter((item) => item.isTodayOperation == "1");
    },
    // 明日出院
    isTommorowDischarge() {
      return this.bedList.filter((item) => item.isTommorowDischarge == "1");
    },
    // 明日手术
    isTommorowOperation() {
      return this.bedList.filter((item) => item.isTommorowOperation == "1");
    },
    // 新入
    isToadyHosipital() {
      return this.bedList.filter(
        (item) =>
          new Date(item.admissionDate).Format("yyyy-MM-dd") ==
          new Date().Format("yyyy-MM-dd")
      );
    },
    // 跌倒高分险
    dangerInMorse() {
      let list = []
      if(this.HOSPITAL_ID=="beihairenyi"){
         list = this.bedList.filter((item) => item.dangerInMorseBh);
      }else{
         list = this.bedList.filter((item) => item.dangerInMorse);
      }
      return list;
    },
    // VTE高分险
    dangerInVteLy() {
      return this.bedList.filter((item) => item.dangerInVteLy);
    },
    //自理能力
    selfCare(){
      return this.bedList.filter((item) => item.adl);
    },
    // 压疮高分险
    dangerInYachuang() {
      let list = []
      let HisMap = {
        beihairenyi:'dangerInYachuangBh',
        default:'dangerInYachuang'
      }
      const ItemKey = HisMap[this.HOSPITAL_ID] || HisMap[`default`]
      list = this.bedList.filter((item) => item[ItemKey]);
      return list;
    },
    // 已有压疮
    hasYachuang() {
      let list = []
      let HisMap = {
        beihairenyi: 'hasYachuangBh',
        whhk: 'hasYachuangWhhk',
        default: 'hasYachuang'
      }
      const ItemKey = HisMap[this.HOSPITAL_ID] || HisMap[`default`]
      list = this.bedList.filter((item) => item[ItemKey]);
      return list;
    },
    // MEWS预警
    MEWS() {
      return this.bedList.filter((item) => item.dangerInMews);
    },
    // VTE高风险
    hasVteDanger() {
      return this.bedList.filter((item) => item.hasVteDanger);
    },
    // 发热
    isFever() {
      return this.bedList.filter((item) => item.isFever == "1");
    },

    scf() {
      return this.bedList.filter((item) => item.bornFlag == 1);
      // return this.bedList.filter(item => item.bornStatus == "送产房");
    },

    crb() {
      return this.bedList.filter((item) => item.infectFlag == 1);
    },

    sek() {
      return this.bedList.filter(
        (item) =>
          item.bedLabel.includes("_") && item.patientId && item.newBornOut
      );
    },

    ye() {
      return this.bedList.filter(
        (item) =>
          item.bedLabel.includes("_") && item.patientId && !item.newBornOut
      );
    },
    // 欠费患者
    qfhz() {
      return this.bedList.filter((item) => item.totalCosts > item.prepayments);
    },
    mrgc(){
      return this.bedList.filter(item=>item.focus);
    },
    list() {
      let list = [
        {
          name: "全部床位",
          num: this.allBedLength.length,
          type: "bed",
        },
        {
          name: "空床",
          num: this.nullBed.length,
          type: "bed",
        },
        {
          name: "在床",
          num: this.inBedLength.length,
          type: "bed",
        },

        //  {
        //   name: "我的关注",
        //   num: this.heart.length,
        //   type: "heart"
        // },
        {
          name: "",
          num: "",
          type: "line",
        },

        ...this.levelColor.map((item) => {
          return {
            name: item.code,
            num: (this.getLevelList(item.code) || []).length,
            type: "level",
            color: item.name,
          };
        }),
        {
          name: "",
          num: "",
          type: "line",
        },
        {
          name: "病危",
          num: this.bw.length,
          type: "state",
        },
        {
          name: "病重",
          num: this.bz.length,
          type: "state",
        },
        {
          name: this.HOSPITAL_ID == "beihairenyi"?"有过敏史":"过敏",
          num: this.gm.length,
          type: "state",
        },
        {
          name: "",
          num: "",
          type: "line",
          hide: !this.isChangeke,
        },
        {
          name: "送产房",
          num: this.scf.length,
          type: "level",
          color: "#d1edd6",
          hide: !this.isChangeke,
        },
        {
          name: "传染病",
          num: this.crb.length,
          type: "level",
          color: "#e6d8f9",
          hide: !this.isChangeke,
        },
        {
          name: "婴儿",
          num: this.ye.length,
          type: "level",
          color: "rgb(217, 244, 254)",
          hide: !this.isChangeke,
        },
        {
          name: "送儿科",
          num: this.sek.length,
          type: "level",
          color: "rgba(255, 207, 219, 0.5)",
          hide: !this.isChangeke,
        },
        {
          name: "欠费患者",
          num: this.qfhz.length,
          type: "state",
        },
      ];
      if (
          [
            "zhongshanqi", "liaocheng",  "beihairenyi",'ytll',
            "fuyou",  "huadu",  "foshanrenyi",  "fuyou",
            "huadu",  "whyx", "fsxt", "sdlj","whfk",'lyyz','zhzxy', 'nanfangzhongxiyi','whsl','925','whhk'
          ].includes(this.HOSPITAL_ID)
      ) {
        list.splice(3, 0, {
          name: "我的关注",
          num: this.heart.length,
          type: "heart",
        });
      }
      if (
          ["nfyksdyy","qhwy"].includes(this.HOSPITAL_ID)
      ) {
        list.splice(3, 0, {
          name: "我的管床",
          num: this.heart.length,
          type: "heart",
        });
      }
      if(this.HOSPITAL_ID == "huadu"){
          list.push({
            name: "今结明出",
            num: this.jjmc.length,
            type: "state",
          })
      }
      if(['fuyou'].includes(this.HOSPITAL_ID)) {
        list.splice(3, 0,
          {
            name: "共出床位",
            num: this.shareOut.length,
            type: "bed",
          },
            {
            name: "共入床位",
            num: this.shareIn.length,
            type: "bed",
          });
      }
      process.env.hasGroupHos && list.splice(1,0,{
        name: "默认管床",
        num: this.mrgc.length,
        type: "bed",
      })
      return list;
    },
    // 新医院注意
    // 同步床位数据
    showSyncBedBtn() {
      return [
        "weixian",
        "lingcheng",
        "liaocheng",
        "hengli",
        'shannan',
        'quzhou',
        'fuyou',
        "foshanrenyi",
        "fsxt",
        "whfk",
        "beihairenyi",
        "lyxrm",
        "sdlj",
        "xiegang",
        'lyyz',
        'qhwy',
        'gdtj',
        'ytll',
        'whsl',
        'whhk',
        'zhzxy',
        'nfyksdyy',
        '925',
        'dglb',
        'stmz',
        'guizhou'
        ].includes(
        this.HOSPITAL_ID
      );
    },
    showMessage(){
      //正式环境去除患者提示
      return window.location.host.includes('1.54')||window.location.host.includes('localhost')
    },
    // 新医院注意
    // 同步患者数据
    showSyncPatientBtn() {
      return [
        "whfk","foshanrenyi","fsxt","liaocheng","beihairenyi","sdlj","nanfangzhongxiyi","lyxrm",'lyyz','qhwy','huadu','ytll', 'whsl', 'gdtj', 'whhk','zhzxy','nfyksdyy','925','dglb', 'stmz'
        ].includes(
        this.HOSPITAL_ID
      );
    },
    // 多重耐药患者
    isMultiDrugResistant(){
      return this.bedList.filter((item) => item.isMultiDrugResistant);
    },
    jjmc(){
      return this.bedList.filter((item) => item.expand2=='出院'&&item.expand3=='Y');
    },
    // 血栓高危
    isDangerInThrombus(){
      return this.bedList.filter((item)=> item.isDangerInThrombus)
    },
    //疼痛
    isPain(){
      return this.bedList.filter((item)=> item.pain)
    },
    //生理自理能力
    isAdl(){
      return this.bedList.filter((item)=> item.adl)
    },
     //管道脱落
    tubingShedding(){
      return this.bedList.filter((item)=> item.tubingShedding == "1")
    },
  },
  methods: {
    async getData() {
      if (this.deptCode) {
        this.$parent.loading = true;
        let {
          data: { data: levelColor },
        } = await listItem("nursing_level");
        this.levelColor = levelColor;
        patients(this.deptCode).then((res) => {
          this.bedList = res.data.data.map((item) => {
            item.nursingClassColor = (
              levelColor.find((o) => o.code == item.nursingClass) || {}
            ).name;
            return item;
          });
          let isGroup = this.bedList.every(item=>item.focus == false) // 如果未进行分组，默认显示全部
          if(process.env.hasGroupHos && !isGroup){ // 判断该医院是否需要按照分组进行显示
            this.selectName = "默认管床";
          }else{
            this.selectName = "全部床位";
          }
          if(['fuyou'].includes(this.HOSPITAL_ID)){
            if(this.mrgc.length>0) this.selectName="默认管床"
          }
          this.$parent.bedList = this.bedList;
          this.$parent.loading = false;
          if(['huadu'].includes(this.HOSPITAL_ID)){
            this.$nextTick(()=>{
            const dataObj = {}
            dataObj[`patientList`] = this.bedList.filter((filterList)=>filterList.patientId&&filterList.visitId)
            .map((bedListItem)=>{
              const { patientId, visitId, bedLabel, glFlag, drugGms } = bedListItem
              return {patientId, visitId, bedLabel, glFlag, drugGms}
            })
            getPatLevelAndStatus(dataObj).then((res)=>{
              const statusPatientList = res.data.data
              if (res.data.code == 200 && statusPatientList.length) {
                const data = this.bedList.map((bedListItem)=>{
                  statusPatientList.map((newPatientList)=>{
                    if((bedListItem.patientId==newPatientList.patientId)&&(bedListItem.visitId==newPatientList.visitId)){
                      // bedListItem = {...bedListItem ,...newPatientList}
                      for (let key of Object.keys(newPatientList)) {
                        if(newPatientList[key]){
                          bedListItem[key] = newPatientList[key]
                        }
                      }
                    }
                  })
                  return bedListItem
                })
                this.bedList = data
                console.log('this.bedList', data)
            }
          }).catch((err)=>{
          })
        })
          }
        });
      }
    },
    selectType(name) {
      if (this.selectName == name) {
        this.selectName = "全部床位";
      } else {
        this.selectName = name;
      }
    },
    getLevelList(level) {
      return this.bedList.filter((item) => item.nursingClass == level);
    },
    syncGetNurseBedRecData() {
      if(!this.ifCanTobu) return
      this.ifCanTobu=false
      this.$message.info("正在更新");
      let syncData = syncGetNurseBedRec;
      switch (this.HOSPITAL_ID) {
        case "lingcheng":
          syncData = syncGetNurseBedRecLc;
          break;
        case "liaocheng"|'lyyz'|'qhwy'|'ytll':
          syncData = syncGetNurseBedRecLiaocheng;
          break;
        case "shannan":
          syncData = syncGetNurseBedRecShannan;
          break;
        case "quzhou":
          syncData = syncGetNurseBedRecQuzhou;
          break;
        case "hengli":
          syncData = syncGetNurseBedRecHengli;
          break;
        case "fuyou":
          syncData = syncGetNurseBedRecJiangMenFY;
          break;
        case "foshanrenyi":
          syncData = syncGetNurseBedRecJiangMenFSSY;
          break;
        case 'lyxrm':
        case "stmz":
          syncData = syncGetNurseBedRecJiangMenFSSY;
          break;
        case "beihairenyi":
          syncData = syncGetNurseBedRecBeiHaiExecute;
          break;
        case "sdlj":
          syncData = syncGetNurseBedRecSDLJExecute;
          break;
        case "xiegang":
          syncData = syncGetNurseBedRecDGXGExecute;
          break;
        case 'whhk':
          syncData = syncGetNurseBedRecWHHKExecute;
          break;
        default:
          syncData = syncGetNurseBedRec;
          break;
      }
      syncData(this.deptCode).then((res) => {
        this.$message.success("更新成功");
        this.getData();
        this.ifCanTobu = true;
      },()=>{this.ifCanTobu = true;});
    },
    //防抖函数 60S内只能点击一次
    throttleSyncGetNursePatientRecData: _throttle('syncGetNursePatientRecData',getThrottleTime),
    syncGetNursePatientRecData(){
      this.loading = true
      let syncPatientData = syncGetNursePatientWHFKRecData;
      switch (this.HOSPITAL_ID) {
        case "whfk":
          syncPatientData = syncGetNursePatientWHFKRecData;
          break;
        default:
          syncPatientData = syncGetNursePatientWHFKRecData;
          break;
      }
      syncPatientData(this.deptCode).then((res) => {
        this.$message.success("更新患者数据中,请稍候。。。。");
        setTimeout(()=>{
        this.getData();
        },1000)
      });
    },
    syncGetMedicalAdvice() {
      if (this.showProgress || !this.deptCode) {
        return;
      }
      this.showProgress = true;
      this.$message.info("正在同步医嘱");
      this.startProgress();
      syncGetMedicalAdvice(this.deptCode).then((res) => {
        this.$message.success("同步医嘱成功");
        this.endProgress();
      });
    },
    format(percentage) {
      return `已同步${percentage}%`;
    },
    startProgress() {
      this.startTimer = setInterval(() => {
        this.progressNum++;
        if (this.progressNum > 85) {
          clearInterval(this.startTimer);
        }
      }, 10);
    },
    endProgress() {
      this.endTimer = setInterval(() => {
        this.progressNum++;
        if (this.progressNum > 99) {
          clearInterval(this.endTimer);
          this.showProgress = false;
          this.progressNum = 0;
        }
      }, 10);
    },
  },
  watch: {
    deptCode() {
      this.getData();
    },
    selectName(val) {
      switch (val) {
        case "":
        case "全部床位":
          {
            this.$parent.bedList = this.allBed;
          }
          break;
        case "空床":
          {
            this.$parent.bedList = this.nullBed;
          }
          break;
        case "在床":
          {
            this.$parent.bedList = this.inBed;
          }
          break;

        case "病危":
          {
            this.$parent.bedList = this.bw;
          }
          break;
        case "病重":
          {
            this.$parent.bedList = this.bz;
          }
          break;
        case "有过敏史":
        case "过敏":
          {
            this.$parent.bedList = this.gm;
          }
          break;
        case "我的关注":
        case "我的管床":
          {
            this.$parent.bedList = this.heart;
          }
          break;
        case "预出院":
          {
            this.$parent.bedList = this.isTodayDischarge;
          }
          break;
        case "明日出院":
          {
            this.$parent.bedList = this.isTommorowDischarge;
          }
          break;
        case "今日手术":
          {
            this.$parent.bedList = this.isTodayOperation;
          }
          break;
        case "明日手术":
          {
            this.$parent.bedList = this.isTommorowOperation;
          }
          break;
        case "新入":
          {
            this.$parent.bedList = this.isToadyHosipital;
          }
          break;
        case "跌倒高风险":
        case "跌倒风险":
          {
            this.$parent.bedList = this.dangerInMorse;
          }
          break;
        case "VTE高风险":
          {
            if (['lyxrm', 'whhk', 'stmz'].includes(this.HOSPITAL_ID)) {
              this.$parent.bedList = this.dangerInVteLy;
            } else {
              this.$parent.bedList = this.hasVteDanger;
            }
          }
          break;
        case "压疮高风险":
        case "压力性损伤高风险":
        case "跌倒压力性损伤高风险":
        case "压疮风险":
          {
            this.$parent.bedList = this.HOSPITAL_ID=='whfk' ? this.hasYachuang : this.dangerInYachuang;
          }
          break;
        case "难免压疮":
        case "已有压力性损伤":
        case "已有压力性损伤风险":
        case "已有压疮":
          {
            this.$parent.bedList = this.hasYachuang;
          }
          break;
        case "MEWS预警":
          {
            this.$parent.bedList = this.MEWS;
          }
          break;
        case "送产房":
          {
            this.$parent.bedList = this.scf;
          }
          break;
        case "传染病":
          {
            this.$parent.bedList = this.crb;
          }
          break;
        case "送儿科":
          {
            this.$parent.bedList = this.sek;
          }
          break;
        case "婴儿":
          {
            this.$parent.bedList = this.ye;
          }
          break;
        case "欠费患者":
          {
            this.$parent.bedList = this.qfhz;
          }
          break;
        case "发热":
          {
            this.$parent.bedList = this.isFever;
          }
          break;

        case "多重耐药患者":
          {
            this.$parent.bedList = this.isMultiDrugResistant;
          }
          break;
        case "今结明出":
          {
            this.$parent.bedList = this.jjmc;
          }
          break;
        case "血栓高危":
          {
            this.$parent.bedList = this.isDangerInThrombus;
          }
          break;
        case "共出床位":
          {
            this.$parent.bedList = this.shareOut;
          }
          break;
        case "共入床位":
          {
            this.$parent.bedList = this.shareIn;
          }
          break;
        case "ADL":
          {
            this.$parent.bedList = this.isAdl;
          }
          break;
        case "疼痛":
          {
            this.$parent.bedList = this.isPain;
          }
          break;
        case "管道脱落风险":
          {
            this.$parent.bedList = this.tubingShedding;
          }
          break;
        case "默认管床":
          {
            this.$parent.bedList = this.mrgc;
          }
          break;
        default: {
          this.$parent.bedList = this.getLevelList(val);
        }
      }
    },
  },
  created() {
    this.getData();
  },
  components: { footerBar },
};
</script>
