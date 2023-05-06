<template>
  <div
    class="contain"
    v-loading="pageLoading"
    :style="{ ' height': containHeight }"
  >
    <div ref="Contain" @mousewheel="(e) => onScroll(e)">
      <div v-show="!isChart" class="blood-sugar-con">
        <div class="sugr-page" v-for="(item, index) in listMap" :key="index">


           <div class="title">
            <img class="nfsd-img" src="./image/nfyksdyy.png"  alt="logo" />
          </div>



          <div class="sup-title"style="border-bottom: 1px solid #000;">
            血糖记录单
          </div>

          <div class="info" style="margin-top: 0px">
            <span>病人姓名：{{ patientInfo.name ||tableHeaderInfo.name}}</span>
            <span style="margin-left: 20px;">性别：{{ patientInfo.sex || tableHeaderInfo.gender }}</span>
            <span style="margin-left: 20px;">年龄：{{ resAge ? resAge : patientInfo.age||tableHeaderInfo.gender}}</span>
            <span style="margin-left: 20px;">床号：{{ resBedNol || patientInfo.bedLabel || tableHeaderInfo.bedLabel}}</span>
            <span style="margin-left: 20px;">住院号：{{patientInfo.inpNo}}</span>
          </div>
          <div class="info" style="border-bottom: 1px solid #000;">
            <span>科室：{{ patientInfo.deptName || patientInfo.deptName ||tableHeaderInfo.deptName}}</span>
            <span style="margin-left: 80px;">病区:{{$route.query.wardName}}</span>

          </div>


          <div class="table-warpper" flex="cross:stretch">
            <sugarTable
              :data="item.left"
              :selected.sync="selected"
              @dblclick="hisDisabled()&&onEdit()"
              :baseIndex='0'
            ></sugarTable>
            <div
              style="
                width: 10px;
                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
              "
            ></div>
             <!--【右边】 聊城二院血糖表格单独管理 -->

            <sugarTable
              :data="item.right"
              :selected.sync="selected"
              @dblclick="hisDisabled()&&onEdit()"
              :baseIndex='27'
            ></sugarTable>
          </div>
          <div class="page-con">
            第 {{ index + 1 }} / {{ listMap.length }} 页
          </div>
        </div>
        <nullBg v-show="listMap.length == 0"></nullBg>
        <!-- <div class="addBtn" v-show="listMap.length == 0"> -->
      </div>
    </div>
  </div>
</template>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.blood-sugar-con {
  .sugr-page {
    margin: 20px auto;
    background: #ffffff;
    width: 1000px;
    padding: 20px;
     height: 1000px;
    // box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.5);
    position: relative;
  }

  .title {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
  }

  .title-img {
    width: 100%;
    height: 100%;
  }
  .nfsd-img{
    width:300px;
    height:60px;
  }

  .sup-title {
    font-size: 21px;
    padding: 1px 0 0px;
    text-align: center;
    font-weight: bold;
  }

  .info {
    margin-top: 10px;
    margin-bottom: 5px;

    span {
      margin-right: 4px;
      font-size: 13px;
      color: #000;
    }
  }

  .identifying{
    width: 88px;
    height: 34px;
    border: 1px solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 34px;
    position: absolute;
    top: 30px;
    right: 60px;
    font-weight:700;
  }

  .his-logo {
    position: absolute;
    left: 21px;
    top: 21px;
    height: 44px;
  }

  .page-con {
    font-size: 13px;
    text-align: center;
    bottom: 20px;
    position: absolute;
    // width 100%
    left: 0;
    right: 0;
  }

  .addBtn {
    margin-top: 20px;
    text-align: center;

    >>> .white-btn {
      margin-right: 0;
    }
  }
}
.select-con  {
  width: 110px;
  >>> .el-input__inner {
    background: #fff;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 30px;
    margin-top: 10px; padding-top:5px
  }
}
>>> .el-select-dropdown__list, .el-select-dropdown__item {
    padding: 0;
    height: auto;
  }

>>> .el-select-dropdown__wrap {
  max-height: 500px;
   width: 562px;
}
>>> .el-select-dropdown__empty {
   width: 562px;
}
>>>.el-select .el-input .el-input__icon {
  top: 63%;
}

>>> .el-select-dropdown__item.hover {
  background: #fff;
}

>>> .el-select-dropdown__item:hover {
  background: #E5F1F0;
}
.sheetSelect-con-sheet {
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 562px !important;
  left: auto !important;
  right: 120px;
  .head-con {
    height: 37px;
    background: #F7FAFA;
    border-bottom: 1px solid #EAEEF1;
    font-size: 13px;
    color: #333333;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .col-1, .col-2, .col-3, .col-4 {
    display: flex;
    align-items: center;
  }

  .col-1 {
    width: 192px;
    padding: 0 24px;
    border-right: 1px solid #EAEEF1;
  }

  .col-2 {
    width: 126px;
    padding: 0 16px;
    border-right: none;
  }

  .col-3 {
    width: 133px;
    padding: 0 14px;
    border-right: 1px solid #EAEEF1;
  }

  .col-4 {
    width: 80px;
    padding: 0 14px;
  }

  .list-con {
    font-size: 13px;
    color: #333333;
    height: 37px;
    border-bottom: 1px solid #EAEEF1;
    display: flex;
    align-items: center;
  }
}
</style>

<style lang="scss" scoped>
.tool-con {
  position: fixed;
  top: 70px;
  right: 10px;

  .tool-fix {
    > .white-btn {
      justify-content: center;
    }

    .btn-con + .btn-con {
      margin-top: 10px;
    }
  }
}
.guizhou-btn{
  >>> .white-btn{
    color: #000;
  }
}
.info-con {
      margin: 8px 0;
      text-align: left;
    }

.ytll_logo img {
  width: 160px;
  height: 58px;
}
/* @media print {
  .sugr-page{
    position: relative;
  }
  .ytll_logo img {
    width: 160px;
    height: 58px;
    position: absolute;
    top: 8px;
    left: 8px;
  }
} */
.header {
  display: flex;
  align-items: center;
  .left, .right, .center {
    flex: 1;
  }
  .left {
    text-align: left;
  }
  .center {
    text-align: center;
  }
  .right{
    display: flex;
    justify-content: center;
    div{
      width: 88px;
      height: 34px;
      border: 1px solid #000;
      border-radius: 50%;
      text-align: center;
      line-height: 34px;
      font-weight:700;
    }
  }
}
</style>


<script>
import sugarTable from "./components/sugar-table.vue";
import {
  getSugarListWithPatientId,
  saveSugarList,
  removeSugar,
  getPvHomePage,
  getSugarItemDict,
  getEditAge,
  getFormHeadData,
  getPrintRecord
} from "./api/index.js";
import whiteButton from "@/components/button/white-button.vue";
import sugarChart from "./components/sugar-chart.vue";
import nullBg from "@/components/null/null-bg.vue";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin.js";

export default {
  mixins: [common],
   props: {
    showBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageLoading: false,
      listMap: [],
      hisPatSugarList: [],
      isChart: false,
      tableHeaderInfo:{},
      selected: null,
      startPage: 1,
      typeList: [],
      formAge: 0,
      resAge: 0,
      resName:'',
      resGender:'',
      resDeptName:'',
      resBedNol:'',
      resInHosId:'',
      tDeptName: "",
      registNum:0,//血糖登记次数
      hisUserTitLeList:['huadu'],//表头用户信息通过获取用户信息接口获取的医院
      sugarUserInfo:{},//患者基础信息
      printRecord:[],
      printRecordValue:''
    };
  },
  computed: {
    patientInfo() {
      return this.$route.query;
    },
    containHeight() {
      return this.wih - 130 + "px";
    },
    //是否为预览状态不可编辑
    isPreview(){
      return (this.$route.query && this.$route.path.includes("nursingPreview") && this.$route.query.nursingPreviewIsShow=='1');
    },
    //是否为表头用户信息通过获取用户信息接口获取的医院且为调阅接口
    isPreviewUserInfo(){
      return this.hisUserTitLeList.includes(this.HOSPITAL_ID) && this.$route.path.includes("nursingPreview");
    },
    Toppx(){
      if(this.HOSPITAL_ID==='whfk'){
        return '16px'
      }
      return '30px'
    }
  },
  methods: {
  uploadView(){
      this.load();
      this.getSugarItemDict();
  },
  async  saveActiveSugar(){
    if(this.HOSPITAL_ID==='whfk'){
      if(!this.selected.sugarItem){
        this.$message({
          message: '请填写项目再保存',
          type: 'error',
          duration:"1500"
        })
        return
      }
      if(!this.selected.sugarValue){
        this.$message({
          message: '请填写血糖值再保存',
          type: 'error',
          duration:"1500"
        })
        return
      }
    }
    const user=JSON.parse(localStorage.getItem("user"))
       let item = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        name:this.patientInfo.name,
        bedLabel:this.patientInfobedLabel,
        recordDate: this.selected.recordDate,
        sugarItem: this.selected.sugarItem,
        sugarValue: this.selected.sugarValue,
        riValue:this.selected.riValue,
        oldRecordDate:"",
        nurseEmpNo:user.empNo,
        nurse:user.empNo,
        expand1:"",
        expand2:1,
        wardCode:this.patientInfo.wardCode,
        time:this.selected.time,
        date:this.selected.date||""
      };
        const DateArr=item.recordDate.split(" ")
        const timeArr=DateArr[1].split(":")
        const firstTime=`${timeArr[0]}:${timeArr[1]}`

if(this.selected.expand2!==undefined){
        item.expand2=2
        item.oldRecordDate=item.recordDate
        const fulltime=`${DateArr[0]} ${item.time}:00`
        await removeSugar(item);
        item.recordDate=fulltime
      }
        // 判断时间
        if(firstTime!==item.time){
           item.recordDate=`${DateArr[0]} ${item.time}:00`
        }
        // 判断日期
        const formatArr=DateArr[0].split("-")
        const notYearDate=`${formatArr[1]}-${formatArr[2]}`
        const YearDate=`${formatArr[0]}-${formatArr[1]}-${formatArr[2]}`
        if(item.date&&notYearDate!==item.date&&this.HOSPITAL_ID==='liaocheng'){
            //聊城显示时间是没有年份的（显示月日时分）。
            item.recordDate=`${formatArr[0]}-${item.date} ${item.time}:00`
        }
        if(item.date&&YearDate!==item.date&&this.HOSPITAL_ID==='whfk'){
            //武汉肺科显示时间（显示年月日时分）。
            item.recordDate=`${formatArr[0]}-${item.date} ${item.time}:00`
        }
        // if(item.date&&YearDate!==item.date&&this.HOSPITAL_ID==='whfk'){
        //     //显示时间是有年份的（显示年月日）。
        //     item.recordDate=`${item.date} ${item.time}:00`
        // }
      await saveSugarList([item])
      this.$message.success("保存成功");
      this.load()
      this.getSugarItemDict();

    },
    hisDisabled(){
      return  !this.$route.path.includes('nursingPreview')
    },
    async getFormHead() {
      const res = await getFormHeadData(
        this.patientInfo.patientId,
        this.patientInfo.visitId
      );
      this.formAge = res.data.data.itemMap.age;
    },
    async load() {
      this.pageLoading = true;
      const res = await getSugarListWithPatientId(
        this.patientInfo.patientId,
        this.patientInfo.visitId
      );
      if( this.HOSPITAL_ID === 'whfk'){
        this.getPrintRecordData();
      }
      this.tableHeaderInfo=res.data.data
      if(res.data.data.hisPatSugarList.length != 0){
        this.tableHeaderInfo.bedLabel=res.data.data.hisPatSugarList[0].bedLabel
      }
      this.resAge = res.data.data.age;
      ////表头用户信息通过获取用户信息接口获取的医院
      (this.hisUserTitLeList.includes(this.HOSPITAL_ID)) && (this.sugarUserInfo = res.data.data);
      if(this.HOSPITAL_ID=='guizhou'&&this.$route.path.includes('nursingPreview')){
        this.resName = res.data.data.name;
        this.resGender = res.data.data.gender;
        this.resDeptName = res.data.data.deptName;
        this.resBedNol = res.data.data.bedNo;
        this.resInHosId = res.data.data.inHosId;
      }
      if (this.HOSPITAL_ID == "fuyou") this.tDeptName = res.data.data.deptName;
      (res.data.data.registNum) && (this.registNum = res.data.data.registNum);//血糖登记次数
      this.pageLoading = false;

      this.hisPatSugarList = res.data.data.hisPatSugarList;
      console.log('this.hisPatSugarList',this.hisPatSugarList)
      /** 时间排序 */
      let list = res.data.data.hisPatSugarList.sort(
        (a, b) =>
          new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
      );
      let listMap = [];

      for (let i = 0; i < list.length; i += 54) {
        let obj = {};
        obj.left = list.slice(i, i + 27);
        obj.right = list.slice(i + 27, i + 54);
        listMap.push(obj);
      }
      this.listMap = listMap;

      getPvHomePage(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then((res) => {
        if (res.data.data) {
          this.startPage = res.data.data.indexNo;
        } else {
          this.startPage = 1;
        }
      });
    },
    toPrint() {
      if (this.HOSPITAL_ID === 'sdlj') {
        window.localStorage.sugarModel = $(this.$refs.Contain).html();
        this.$router.push(`/print/sugar`);
      } else {
        const fromParams = {
          patientId:this.patientInfo.patientId,
          visitId:this.patientInfo.visitId,
          // formId:this.patientInfo.formId,
          formType: "sugar",
          formCode: "procedure",
          formName:'血糖监测单',
        }
        window.localStorage.sugarModel = $(this.$refs.Contain).html();
        if (process.env.NODE_ENV === "production") {
          let newWid = window.open();
          if(this.HOSPITAL_ID === 'whfk'){
            newWid.location.href = `/crNursing/print/sugar?patientId=${this.patientInfo.patientId}&visitId=${this.patientInfo.visitId}&formType=${"sugar"}&formCode=${"procedure"}&formName=${'血糖监测单'}`;
          }else{
            newWid.location.href = "/crNursing/print/sugar";
          }
        } else {
          this.$router.push(`/print/sugar`);
        }
      }
    },
    onAddTable() {
      if (this.$route.query.patientId) {
        this.listMap.push({ left: [], right: [] });
      } else {
        this.$message.warning("请先选择一名患者");
      }
    },
    async onRemove() {
      await this.$confirm(
        "确定要删除该血糖记录吗？删除后将无法恢复！",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "点错了",
          type: "warning",
        }
      );

      let item = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        recordDate: this.selected.recordDate,
        sugarItem: this.selected.sugarItem,
        sugarValue: this.selected.sugarValue,
        recordId: this.selected.recordId || "",
      };

      if (this.HOSPITAL_ID == "fuyou") {
        item = {
          ...item,
          riValue: this.selected.riValue || "",
          oldRecordDate: this.selected.oldRecordDate || "",
          nurseEmpNo: this.empNo || "", //护士工号
          nurse: this.empName || "", //护士姓名
          wardCode: this.patientInfo.wardCode || "",
        };
      }

      await removeSugar(item);
      await this.load();
      this.selected = null;
      if (this.HOSPITAL_ID === "sdlj" && this.listMap.length === 0) {
        this.$emit('removeSugar')
      }
    },
    // 通过字典获取项目下拉内容
    getSugarItemDict() {
      getSugarItemDict().then((res) => {
        let data = res.data.data;
        this.typeList = data.map((item) => {
          return {
            vitalSign: item.itemName,
          };
        });
      });
    },
    onScroll(e) {
      if (e.deltaY < 0 && this.$refs.Contain.style.top.split("px")[0] <= 20) {
        this.$refs.Contain.style.top =
          Number(this.$refs.Contain.style.top.split("px")[0]) + 20 + "px";
      }
    },
    getPrintRecordData(){
      const fromParams = {
        patientId:this.patientInfo.patientId,
        visitId:this.patientInfo.visitId,
        formId:this.patientInfo.formId,
        formType: "sugar",
        formCode: "procedure",
        formName:'血糖监测单',
      }
      getPrintRecord(fromParams)
      .then(res => {
        this.printRecord = res.data.data&&res.data.data.length>0?res.data.data:[{printName:'',printTime:'',nodData:true}];
        this.printRecordValue = this.printRecord[0]? this.printRecord[0]['printName']+' '+this.printRecord[0]['printTime']:'';
      }, err => {

      });
    },
  },
  mounted(){
    if( this.HOSPITAL_ID === 'whfk' &&this.patientInfo.patientId){
      this.getPrintRecordData();
    }
  },
  async created() {
    if (this.$route.query.patientId) {
      await this.load();
    }

    // 为了处理顺德龙江选择儿童单子立马创建表单问题
    if (this.HOSPITAL_ID === "sdlj" && this.listMap.length == 0 && !this.isPreview) {
      this.onAddTable()
    }
    if (this.HOSPITAL_ID != "hj" && this.HOSPITAL_ID != "huadu") {
      this.getSugarItemDict();
    }

    if (this.HOSPITAL_ID == "lingcheng") {
      this.getFormHead();
    }
  },
  watch: {
    "patientInfo.patientId"(nVal, oVal) {
      if (this.HOSPITAL_ID == "lingcheng") {
        this.getFormHead();
      }
    },
    startPage() {
      let contont = this.$refs.Contain.children
        ? this.$refs.Contain.children[0]
        : [];
      this.$refs.Contain.style.position = "relative";
      this.$refs.Contain.style.top =
        "-" +
        contont.children[0].offsetHeight * (this.startPage - 1) -
        20 +
        "px";
    },
  },
  components: {
    sugarTable,
    whiteButton,
    sugarChart,
    nullBg,
  },
};
</script>
