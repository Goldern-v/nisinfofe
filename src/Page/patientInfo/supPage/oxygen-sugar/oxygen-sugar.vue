<template>
  <div
    class="contain"
    v-loading="pageLoading"
    :style="{ 'min-height': containHeight }"
  >
    <div ref="Contain" @mousewheel="(e) => onScroll(e)">
      <div v-show="!isChart" class="blood-sugar-con">
        <div class="sugr-page" v-for="(item, index) in listMap" :key="index">
          <!-- <img class="his-logo"
          src="../../../../common/images/his-logo/厚街医徽.png" />-->
          <div class="title" v-if="HOSPITAL_ID != 'whfk'">
            {{ HOSPITAL_NAME_SPACE }}
          </div>
          <div class="title" v-else>
            <img class="title-img" src="./image/logo.png" alt="logo" />
          </div>
          <div class="sup-title">血氧记录单</div>
          <p flex="main:justify" class="info" v-if="isPreviewUserInfo">
            <span>科别：{{ sugarUserInfo.deptName }}</span>
            <span>床号：{{ sugarUserInfo.bedNo || sugarUserInfo.bedLabel }}</span>
            <span>姓名：{{ sugarUserInfo.name }}</span>
            <span>性别：{{ sugarUserInfo.gender || sugarUserInfo.sex }}</span>
            <span>年龄：{{ sugarUserInfo.age }}</span>
            <span>住院号：{{ sugarUserInfo.inHosId || sugarUserInfo.patientId}}</span>
            <!-- <span>入院日期：{{patientInfo.admissionDate | toymd}}</span> -->
            <!-- <span class="diagnosis-con">诊断：{{patientInfo.diagnosis}}</span> -->
            <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
          </p>
          <p flex="main:justify" class="info" v-else>
            <span
              >科别：{{ patientInfo.deptName || sugarUserInfo.deptName || patientInfo.wardName }}</span
            >
            <span>床号：{{ resBedNol || patientInfo.bedLabel || sugarUserInfo.bedLabel}}</span>
            <span>姓名：{{ patientInfo.name ||sugarUserInfo.name}}</span>
            <span>性别：{{ patientInfo.sex || sugarUserInfo.sex}}</span>
            <span>年龄：{{ resAge ? resAge : patientInfo.age ||sugarUserInfo.age}}</span>
            <span>住院号：{{ resInHosId || patientInfo.inpNo ||sugarUserInfo.patientId}}</span>
            <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
          </p>
          <div class="table-warpper" flex="cross:stretch">
            <sugarTable
              :data="item.left"
              :selected.sync="selected"
              :patientInfo.sync="patientInfo"
              :saveParams.sync="saveParams"
              :isToPrint="isToPrint"
              @renderData="handleSelectedleft"
              @refresh="load()"
              :baseIndex="0"
              :pageIndex='index+1'
            ></sugarTable>
            <div
              style="
                width: 10px;
                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
              "
            ></div>
            <sugarTable
              :data="item.right"
              :selected.sync="selected"
              :patientInfo.sync="patientInfo"
              :saveParams.sync="saveParams"
              :isToPrint="isToPrint"
              @renderData="handleSelectedright"
              @refresh="load()"
              :baseIndex="27"
              :pageIndex='index+1'
            ></sugarTable>
          </div>
          <div class="page-con">
            第 {{ index + 1 }} / {{ listMap.length }} 页
          </div>
        </div>
        <nullBg v-show="listMap.length == 0"></nullBg>
        <!-- <div class="addBtn" v-show="listMap.length == 0"> -->
        <div class="addBtn" v-show="listMap.length == 0 && !isPreview">
          <whiteButton text="添加血氧记录" @click="onAddTable" :disabled="isPreview"/>
        </div>
      </div>
    </div>
    <div
      class="tool-con"
      v-show="listMap.length"
      :class="[HOSPITAL_ID == 'guizhou' ? 'guizhou-btn' : '']"
    >
      <div class="tool-fix" flex="dir:top">
        <whiteButton text="保存" @click="saveActiveSugar()" :disabled="isPreview"></whiteButton>
        <whiteButton
          text="删除"
          @click="hisDisabled()&&onRemove()"
          :disabled="isPreview"
        ></whiteButton>
        <whiteButton text="打印预览" @click="hisDisabled()&&toPrint()"
        ></whiteButton>
        <el-select
          v-model="printRecordValue"
          value-key="id"
          size="small"
          placeholder=""
          class="select-con"
          @visible-change="getPrintRecordData()"
        >
          <div class="sheetSelect-con-sheet">
            <div class="head-con" flex="cross:stretch">
              <div class="col-1">打印人</div>
              <div class="col-2">打印时间</div>
            
            </div>
            <el-option
              v-for="item in printRecord"
              :key="item.id"
              :label="item.printName+' '+item.printTime"
              :value="item"
            >
            <div class="list-con" flex="cross:stretch" v-if="!item.nodData">
                <div class="col-1" :title="item.printName">
                  {{ item.printName }}
                </div>
                <div class="col-2" :title="item.printTime">
                  {{ item.printTime }}
                </div>
              </div>
              <div v-if="item.nodData" style="text-align: center;width: 562px;height: 100px;padding-top: 50px;background:#fff;background: rgb(255, 255, 255);color: #000">
                  暂无打印记录
                </div>
            </el-option>
          </div>
        </el-select>
      </div>
    </div>
    <!-- <editModal ref="editModal" :sugarItem.sync="typeList" @confirm="onSave" />
    <editAge ref="editAge" @confirm="onSaveAge" />
    <setPageModal ref="setPageModal" /> -->
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.blood-sugar-con {
  .sugr-page {
    margin: 10px auto;
    background: #ffffff;
    width: 700px;
    padding: 20px;
    min-height: 1000px;
    box-shadow: 0 5px 9px 0 rgba(0, 0, 0, 0.5);
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

  .sup-title {
    font-size: 21px;
    padding: 1px 0 0px;
    text-align: center;
    font-weight: bold;
  }

  .info {
    margin-top: 20px;
    margin-bottom: 5px;

    span {
      margin-right: 4px;
      font-size: 13px;
      color: #000;
    }
  }

  .identifying {
    width: 88px;
    height: 34px;
    border: 1px solid #000;
    border-radius: 50%;
    text-align: center;
    line-height: 34px;
    position: absolute;
    top: 30px;
    right: 60px;
    font-weight: 700;
  }

  .his-logo {
    position: absolute;
    left: 21px;
    top: 21px;
    height: 44px;
  }
  .table-warpper{
    margin-bottom:10px;
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
  width: 86px;
  >>> .el-input__inner {
    background: #fff;
    border: 1px solid #cbd5dd;
    border-radius: 2px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 30px;
    margin-top: 10px;
  }
} 
>>> .el-select .el-input .el-input__icon {
    top: 63%;
  }

 >>> .el-select-dropdown__item.hover {
    background: #fff;
  }

 >>> .el-select-dropdown__item:hover {
    background: #E5F1F0;
  }
  >>> .el-select-dropdown__list, .el-select-dropdown__item {
    padding: 0;
    height: auto;
  }

 >>> .el-select-dropdown__wrap {
    max-height: 500px;
    min-width: 562px;
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
.guizhou-btn {
  >>> .white-btn {
    color: #000;
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
  getForm, //获取表单数据
  save, // 保存表单数据
  getPatientForm, //获取患者存在表单id
  rowSign,//行签名,
  deleteRecord, //删除本行
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
  data() {
    return {
      pageLoading: false,
      listMap: [],
      hisPatSugarList: [],
      isChart: false,
      selected: null,
      startPage: 1,
      typeList: [],
      formAge: 0,
      resAge: 0,
      resName: "",
      resGender: "",
      resDeptName: "",
      resBedNol: "",
      resInHosId: "",
      tDeptName: "",
      registNum: 0, //血糖登记次数
      hisUserTitLeList: ["huadu"], //表头用户信息通过获取用户信息接口获取的医院
      sugarUserInfo: {}, //患者基础信息
      baseParams:{
        formCode: '',
        formType: this.HOSPITAL_ID == 'whfk' ? 'eval' : 'others',
        id: '',
        deptCode: '',
        deptName: '',
        patientId: '',
        visitId: '',
        formApiCode: '',
        wardCode: '',
        wardName: '',
        inpNo: '',
        onlyView: false,
        isPrint: false,
      },/**父界面返回的表单基础数据 */
      fkOxygenCode:'sugar_oxygen', //肺科血氧单的formCode
      saveParams:{},
      relObj:{},
      leftData:[],
      rightData:[],
      isToPrint:false,
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
    isPreview() {
      return (
        this.$route.query &&
        this.$route.path.includes("nursingPreview") &&
        this.$route.query.nursingPreviewIsShow == "1"
      );
    },
    //是否为表头用户信息通过获取用户信息接口获取的医院且为调阅接口
    isPreviewUserInfo() {
      return (
        this.hisUserTitLeList.includes(this.HOSPITAL_ID) &&
        this.$route.path.includes("nursingPreview")
      );
    },
  },
  methods: {
    uploadView() {
      this.load();
      this.getSugarItemDict();
    },
    handleSelectedleft(item,data){
      // console.log(item,data,'this.selected')
      this.leftData = data
    },
    handleSelectedright(item,data){
      // console.log(item,data,'this.selected')
      this.rightData = data
    },
    // 保存数据
    async saveActiveSugar() {
      const listRes = await getPatientForm(this.patientInfo.patientId, this.patientInfo.visitId)
      if(listRes.data.code >= '200' && listRes.data.data != null){
        this.patientInfo.id = listRes.data.data.id
      }
      let saveList =[...this.leftData,...this.rightData]
      let isSave = false ;
      saveList.map(item=>{
        if(item.dateStr && item.timeStr){
          if(!item.sugarOxygen){
              isSave = true;
             return
          }
        }
      });
      if(!isSave){
        this.patientInfo.list= saveList
        try{
        save(this.patientInfo,this.baseParams.formType,this.baseParams.formCode).then((res)=>{
          // console.log(res,"resss")
          if(res.data.code == '200'){
            this.$message.success("保存成功");
            this.load();
            this.leftData ={}
            this.rightData ={}
          }else{
            this.$message.success(res.data.desc);
          }
        })
        }catch(err){
          console.log(err,"resss")
        }
      }else{
         this.$message.warning("血氧为必填项，请填写！");
      }

    },
    // 打印预览
    hisDisabled() {
      return !this.$route.path.includes("nursingPreview");
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
     
      const listRes = await getPatientForm(this.patientInfo.patientId, this.patientInfo.visitId)
      if(listRes.data.code >= '200' && listRes.data.data != null){
        this.baseParams.id = listRes.data.data.id
      }else{
        this.baseParams.id = ''
      }
      if(this.baseParams.id){
        if(this.HOSPITAL_ID == 'whfk'){
          this.baseParams.formCode = this.fkOxygenCode
        }
        const resList = await getForm(this.baseParams.id, this.baseParams.formType, this.baseParams.formCode)
        if( this.HOSPITAL_ID === 'whfk'){
          this.getPrintRecordData();
        }
        this.baseParams.id ='',
        this.hisPatSugarList = resList.data.data.list;
        this.saveParams = resList.data.data
        this.sugarUserInfo= resList.data.data
        /** 时间排序 */
        let list = resList.data.data.list
        let listMap = [];
        for (let i = 0; i < list.length; i += 54) {
          let obj = {};
          obj.left = list.slice(i, i + 27);
          obj.right = list.slice(i + 27, i + 54);
          listMap.push(obj);
        }

        // console.log(listMap)
        this.listMap = listMap;
        if(list.length % 54 == 0){
          this.listMap.push(
            {
              left: [],
              right: []
            }
          )
        }
        if(this.listMap.length == 0){
          this.listMap.push(
            {
              left: [],
              right: []
            }
            );
        }
      }else{
        this.listMap = [];
      }
      this.pageLoading = false;
    },
    toPrint() {
      this.isToPrint=true;
      // console.log(this.isToPrint)
      window.localStorage.oxygenModel = $(this.$refs.Contain).html();
      // this.isToPrint=false;
      if (process.env.NODE_ENV === "production") {
        let newWid = window.open();
          if(this.HOSPITAL_ID === 'whfk'){
            newWid.location.href = `/crNursing/print/oxygen?patientId=${this.saveParams.patientId}&visitId=${this.saveParams.visitId}&formId=${this.saveParams.id}&formType=${this.saveParams.type}&formCode=${this.saveParams.code}&formName=${this.saveParams.codeName}`; 
          }else{
            newWid.location.href = "/crNursing/print/oxygen";
          }
      } else {
        this.$router.push(`/print/oxygen`);
      }
    },
    openChart() {
      // this.$refs.sugarChartModal.open()
      this.isChart = !this.isChart;
    },
    async onAddTable() {
      if(this.HOSPITAL_ID == 'whfk'){
        this.baseParams.formCode = this.fkOxygenCode
        }
      try{
        this.patientInfo.id =""
        const res = await save(this.patientInfo,this.baseParams.formType,this.baseParams.formCode)
        this.saveParams = res.data.data;
      } catch(err){
        console.log(err)
      }
      if (this.$route.query.patientId) {
        this.listMap.push({ left: [], right: [] });
      } else {
        this.$message.warning("请先选择一名患者");
      }
    },
    onAdd() {
      this.$refs.editModal.open("添加血糖记录");
    },
    // onEdit() {
    //   this.$refs.editModal.open("编辑血糖记录", this.selected);
    // },
    onEditAge() {
      this.$refs.editAge.open("编辑年龄", {
        age: this.formAge || this.patientInfo.age,
      });
    },
    async onRemove() {
      console.log(this.selected)
      if(this.selected){
        if(this.selected.id){
          await this.$confirm(
          "确定要删除该血氧记录吗？删除后将无法恢复！",
          "提示",
          {
            confirmButtonText: "确定删除",
            cancelButtonText: "点错了",
            type: "warning",
          }
        );
          this.saveParams.list=[this.selected]
          const res =  await deleteRecord(this.saveParams, this.baseParams.formType, this.fkOxygenCode);
          if(res.data.code == '200'){
            this.$message.success("删除成功");
            this.load();
            this.selected = null;
          }else{
            this.$message.success(res.data.desc);
          }
        }else{
          this.$message.warning("请选择保存之后行数据！");
        }
      }else{
         this.$message.warning("请选择想要的删除的行数据！");
      }
      //批量删除单条记录
        // export const deleteRecord = (params, formType, formCode) => {
        //   return axios.post(`${apiPath}${formType}/${formCode}/deleteRecord`, params);
        // }

    },
    onScroll(e) {
      if (e.deltaY < 0 && this.$refs.Contain.style.top.split("px")[0] <= 20) {
        this.$refs.Contain.style.top =
          Number(this.$refs.Contain.style.top.split("px")[0]) + 20 + "px";
      }
    },
    getPrintRecordData(){
      const fromParams = {
        patientId:this.saveParams.patientId,
        visitId:this.saveParams.visitId,
        formId:this.saveParams.id,
        formType:this.saveParams.type,
        formCode:this.saveParams.code,
        formName:this.saveParams.codeName
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
    if( this.HOSPITAL_ID === 'whfk'&& this.saveParams.patientId){
      this.getPrintRecordData();
    }
  },
  created() {
    if (this.$route.query.patientId) {
      this.load();
    }
  },
  watch: {
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
