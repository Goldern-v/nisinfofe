<template>
  <div
    class="contain"
    v-loading="pageLoading"
    :style="{ 'min-height': containHeight }"
  >
    <div
      class="tool-con"
      v-show="listMap.length"
      :class="[HOSPITAL_ID == 'guizhou' ? 'guizhou-btn' : '']"
    >
      <!-- <div class="tool-fix" flex="dir:top">
        <whiteButton text="保存" @click="saveActiveSugar()" :disabled="isPreview"></whiteButton>
        <whiteButton
          text="删除"
          @click="hisDisabled()&&onRemove()"
          :disabled="isPreview"
        ></whiteButton>
        <whiteButton text="打印预览" @click="hisDisabled()&&toPrint()"
        ></whiteButton>
      </div> -->
      <div class="tool-btn" v-if="!routePath.includes('nursingPreview')">
        <div
          class="item-box"
          flex="cross:center main:center"
          @click="saveActiveSugar()"
          :disabled="isPreview"
        >
          <div class="text-con" flex="cross:center">保存</div>
        </div>
        <div
          class="item-box"
          flex="cross:center main:center"
          @click="hisDisabled()&&onRemove()"
          :disabled="isPreview"
        >
          <div class="text-con" flex="cross:center">删除</div>
        </div>
        <div
          class="item-box"
          flex="cross:center main:center"
          @click="hisDisabled()&&toPrint()"
        >
          <div class="text-con" flex="cross:center">打印预览</div>
        </div>
      </div>

    </div>
    <div style='height: 40px; width:100%'></div>
    <div ref="Contain" @mousewheel="(e) => onScroll(e)">
      <div v-show="!isChart" class="blood-sugar-con1">
        <div class="sugr-page" v-for="(item, index) in listMap" :key="index">
          <!-- <img class="his-logo"
          src="../../../../common/images/his-logo/厚街医徽.png" />-->
          <div class="title" v-if="HOSPITAL_ID != 'whfk'">
            {{ HOSPITAL_NAME_SPACE }}
          </div>
          <div class="title" v-else>
            <img class="title-img" src="./image/logo.png" alt="logo" />
          </div>
          <div class="sup-title">血 糖 监 测 记 录 表</div>
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
              >科别：{{ patientInfo.wardName || patientInfo.deptName || sugarUserInfo.bedLabel}}</span
            >
            <span>床号：{{ resBedNol || patientInfo.bedLabel || sugarUserInfo.bedLabel}}</span>
            <span>姓名：{{ patientInfo.name ||sugarUserInfo.name}}</span>
            <span>性别：{{ patientInfo.sex || sugarUserInfo.sex}}</span>
            <span>年龄：{{ resAge ? resAge : patientInfo.age ||sugarUserInfo.age}}</span>
            <span>住院号：{{ resInHosId || patientInfo.inpNo ||sugarUserInfo.patientId}}</span>
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
            ></sugarTable>
            <!-- <div
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
            ></sugarTable> -->
          </div>
          <div class="page-con">
            第 {{ index + 1 }} / {{ listMap.length }} 页
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.blood-sugar-con1 {
  .sugr-page {
    margin: 10px auto;
    background: #ffffff;
    width: 1000px;
    padding: 20px;
    min-height: 700px;
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
    margin-top: 30px;
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
</style>

<style lang="scss" scoped>
.tool-con {
  position: fixed;
  top: 60.5px;
  left: 200px;
  width: 100%;
  z-index: 100;
  /* right: 10px; */

  /* .tool-fix {
    display: flex;
    > .white-btn {
      justify-content: center;
    }
    span{
      display: block;
    }

    .btn-con + .btn-con {
      margin-top: 10px;
    }
  } */
  .tool-btn{
    display: flex;
    align-items: center;
    background-image: linear-gradient(-180deg,#f8f8fa,#ebecf0);
    border-bottom: 1px solid #cbd5dd;
    height: 40px;
    z-index: 2;
    position: relative;
    .item-box{
      font-size: 12px;
      color: #333;
      border-right: 1px solid #d4d4d4;
      cursor: pointer;
      background: #fff;
      border: 1px solid #cbd5dd;
      border-radius: 2px;
      min-width: 60px;
      height: 26px;
      margin-left: 5px;
      padding: 0 5px;
    }
    .item-box:hover{
      font-weight: 700;
    }
  }
}
.guizhou-btn {
  /deep/ .white-btn {
    color: #000;
  }
}
</style>


<script>
import sugarTable from "./components/sugar-table.vue";
import {
  getFormHeadData,
  getForm, //获取表单数据
  save, // 保存表单数据
  getPatientForm, //获取患者存在表单id
  rowSign,//行签名,
  deleteRecord, //删除本行
} from "./api/index.js";
import whiteButton from "@/components/button/white-button.vue";
import sugarChart from "./components/sugar-chart.vue";
import nullBg from "@/components/null/null-bg.vue";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin.js";
import { del } from '@/Page/catheter-page/api/recordDesc';
import tr from '@/Page/sheet-page/components/config/tbhld_lc/tr';

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
        formType: 'others',
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
      fkOxygenCode: 'blood_sugar', // 顺德龙江血糖fromCode
      saveParams:{},
      relObj:{},
      // leftData:[],
      // rightData:[],
      tableData: [],
      isToPrint:false,
    };
  },
  computed: {
    routePath(){
      return window.location.href
    },
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
  created() {
  },
  methods: {
    uploadView() {
      this.load();
      this.getSugarItemDict();
    },
    handleSelectedleft(item,data){
      this.tableData = data
    },
    // 保存数据
    async saveActiveSugar() {
      const listRes = await getPatientForm(this.patientInfo.patientId, this.patientInfo.visitId)
      if(listRes.data.code >= '200' && listRes.data.data != null){
        this.patientInfo.id = listRes.data.data.id
      }
      let saveList =[...this.tableData]
      let isSave = false ;
      saveList.map(item=>{
        if(item.dateStr && item.time){
          isSave = true;
        }
      });
      if (this.selected) isSave = true;
      else isSave = false;
      if(isSave){
        this.patientInfo.list= saveList
        try{
        save(this.patientInfo,this.baseParams.formType,'blood_sugar').then((res)=>{
          // console.log(res,"resss")
          if(res.data.code == '200'){
            this.$message.success("保存成功");
            this.load();
          }else{
            this.$message.success(res.data.desc);
          }
        })
        }catch(err){
          console.log(err,"resss")
        }
      }else{
        this.$message.warning("请填写血糖监测记录！");
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
        // todo 要对接口  不然会报404

        // if(this.HOSPITAL_ID == 'whfk'){
          this.baseParams.formCode = this.fkOxygenCode
        // }

        const resList = await getForm(this.baseParams.id, this.baseParams.formType, this.baseParams.formCode)
        this.baseParams.id ='',
        this.selected = null
        this.hisPatSugarList = resList.data.data.list;
        this.saveParams = resList.data.data
        this.sugarUserInfo= resList.data.data

        console.log(this.sugarUserInfo,'=======>sugar ')
        /** 时间排序 */
        let list = resList.data.data.list
        let listMap = [];
        for (let i = 0; i < list.length; i += 14) {
          let obj = {};
          obj.left = list.slice(i, i + 14);
          // obj.right = list.slice(i + 27, i + 54);
          listMap.push(obj);
        }

        this.listMap = listMap;
        if(list.length % 14 == 0){
          this.listMap.push(
            {
              left: [],
            }
          )
        }
        if(this.listMap.length == 0){
          this.listMap.push(
            {
              left: [],
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
      // if (process.env.NODE_ENV === "production") {
      //   let newWid = window.open();
      //   newWid.location.href = "/crNursing/print/bloodSugar";
      // } else {
        this.$router.push(`/print/bloodSugar`);
      // }
    },
    openChart() {
      // this.$refs.sugarChartModal.open()
      this.isChart = !this.isChart;
    },
    async onAddTable() {
      // this.baseParams.formCode = this.fkOxygenCode
      // try{
      //   this.patientInfo.id =""
      //   console.log(this.patientInfo, 888)
      //   delete this.patientInfo.list
      //   const res = await save(this.patientInfo,this.baseParams.formType,this.baseParams.formCode)
      //   this.saveParams = res.data.data;
      // } catch(err){
      //   console.log(err)
      // }
      if (this.$route.query.patientId) {
        this.listMap.push({ left: [] });
      } else {
        this.$message.warning("请先选择一名患者");
      }
    },
    // onAdd() {
    //   this.$refs.editModal.open("添加血糖记录");
    // },
    // onEdit() {
    //   this.$refs.editModal.open("编辑血糖记录", this.selected);
    // },
    onEditAge() {
      this.$refs.editAge.open("编辑年龄", {
        age: this.formAge || this.patientInfo.age,
      });
    },
    async onRemove() {
      if(this.selected){
        if(this.selected.id){
          await this.$confirm(
          "确定要删除该血糖记录吗？删除后将无法恢复！",
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
            await this.load();
            this.selected = null;
            if (this.HOSPITAL_ID === "sdlj" && this.listMap.length === 0) {
              this.$emit('removeSugar')
            }
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
  },
  async created() {
    if (this.$route.query.patientId) {
      await this.load();
    }
    if (this.listMap.length == 0 && !this.isPreview) {
      this.onAddTable()
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
