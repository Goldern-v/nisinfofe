<template>
  <div
    class="contain"
    v-loading="pageLoading"
    :style="{ ' height': containHeight }"
  >
    <div ref="Contain" @mousewheel="(e) => onScroll(e)">
      <div v-show="!isChart" class="blood-sugar-con" id="blood-sugar-con" :style="$route.path == '/formPage'  ? 'overflow: auto; height: calc(100vh - 105px);' : '' ">
        <div
          class="sugr-page"
          v-for="(item, index) in listMap"
          :key="index"
          :class="index !== listMap.length - 1 ? 'break-pages' : ''"
        >


           <div class="title">
            <img class="nfsd-img" src="./image/nfyksdyy.png"  alt="logo" />
          </div>



          <div class="sup-title" style="border-bottom: 1px solid #000;">
            科内血糖记录单
          </div>

          <div class="info" style="margin-top: 0px">
            <span>姓名：{{ patientInfo.name ||tableHeaderInfo.name}}</span>
            <span style="margin-left: 20px;">性别：{{ patientInfo.sex || tableHeaderInfo.gender }}</span>
            <span style="margin-left: 20px;">年龄：{{ resAge ? resAge : patientInfo.age||tableHeaderInfo.gender}}</span>
            <span style="margin-left: 20px;">床号：<input type="text" :value="resBedNol.split(',')[index]" style="width:128px; border:none;resize: none; outline:none;" @blur="onResBedNo($event,index+1)" :data-value="resBedNol.split(',')[index]"></span>
            <span style="margin-left: 20px;">住院号：{{patientInfo.inpNo}}</span>
          </div>
          <div class="info" style="border-bottom: 1px solid #000;">
            <span>科室：{{ resDeptName }}</span>
            <span style="margin-left: 80px;">病区:{{ resWardName || patientInfo.wardName}}</span>

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
        <div class="addBtn" v-show="listMap.length == 0 && !isPreview">
          <whiteButton text="添加血糖记录" @click="onAddTable" :disabled="isPreview"/>
        </div>
      </div>
    </div>
    <div class="chart-con" v-if="isChart">
      <sugarChart
        ref="sugarChartModal"
        :lineData="hisPatSugarList"
        :sugarItem.sync="typeList"
      ></sugarChart>
    </div>
    <div class="tool-con" v-show="listMap.length">
      <div class="tool-fix" flex="dir:top">
        <whiteButton text="添加" @click="hisDisabled()&&onAdd()"
        v-if="isLock" :disabled="isPreview"></whiteButton>
        <whiteButton
          text="修改"
          @click="hisDisabled()&&onEdit()"
          :disabled="!selected || !selected.recordDate||isPreview"
          v-if="isLock"
        ></whiteButton>
        <whiteButton
          text="删除"
          @click="hisDisabled()&&onRemove()"
          :disabled="!selected || !selected.recordDate||isPreview"
          v-if="isLock"
        ></whiteButton>
        <whiteButton
          :text="`设置起始页(${startPage})`"
          @click="hisDisabled()&&openSetPageModal(listMap.length)"
          :disabled="isPreview"
          v-if="isLock"
        ></whiteButton>
        <whiteButton text="打印预览" @click="hisDisabled()&&toPrint()" :disabled="isPreview"></whiteButton>
        <whiteButton
          :text="!isChart ? '查看曲线' : '查看表格'"
          @click="openChart"
          v-if="isLock"
        ></whiteButton>
      </div>
    </div>
    <editModal ref="editModal" :sugarItem.sync="typeList" @confirm="onSave" />
    <editAge ref="editAge" @confirm="onSaveAge" />
    <setPageModal ref="setPageModal" />
  </div>
</template>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.blood-sugar-con {
  .sugr-page {
    margin: 20px auto;
    background: #ffffff;
    width: 700px;
    padding: 20px;
     height: 1000px;
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
  getBedExchangeInfo,
  updateBedExchangeInfo
} from "./api/index.js";
import whiteButton from "@/components/button/white-button.vue";
import sugarChart from "./components/sugar-chart.vue";
import nullBg from "@/components/null/null-bg.vue";
import editModal from "./components/edit-modal.vue";
import editAge from "./components/edit-age.vue";
import setPageModal from "./components/setPage-modal.vue";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin.js";

export default {
  mixins: [common],
   props: {
    showBorder: {
      type: Boolean,
      default: false
    },
    provide(){
      return {
        isLock:this.isLock
      }
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
      resDeptName:'',
      resWardName:'',
      resBedNol:'',
      registNum:0,//血糖登记次数
      sugarUserInfo:{},//患者基础信息
      printRecord:[],
      printRecordValue:'',
      lockHospitalList:['nfyksdyy'],//配置了健康教育单锁定功能的配置
      isLock:{           //健康教育单是否被锁定
      type:Boolean,
      default:true
      },
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
    Toppx(){
      return '30px'
    }
  },
  methods: {
  uploadView(){
      this.load();
      this.getSugarItemDict();
  },
    hisDisabled(){
      return  !this.$route.path.includes('nursingPreview')
    },
    async load() {
      this.pageLoading = true;
      const res = await getSugarListWithPatientId(
        this.patientInfo.patientId,
        this.patientInfo.visitId
      );
      console.log("res",res);
        /* 判断健康教育单是否被锁定 */
          if(res.data.errorCode=='3001' && res.data.desc.indexOf('锁定')!=-1 && this.lockHospitalList.includes(this.HOSPITAL_ID)){
            console.log("弹窗");
            localStorage.setItem('lockForm','')
            this.isLock=false
            window.app && window.app.$message({
              showClose: true,
              message: res.data.desc,
              type: 'error',
              duration:5000
            })
          }else{
            console.log("else");
            const formConfig={
              formId:this.patientInfo.patientId,
              type:'suger',
              initTime:Date.now()
            }
            this.isLock=true
            localStorage.setItem('lockForm',JSON.stringify(formConfig))
          }
      this.tableHeaderInfo=res.data.data
      if(res.data.data.hisPatSugarList.length != 0){
        this.tableHeaderInfo.bedLabel=res.data.data.hisPatSugarList[0].bedLabel
      }
      this.resAge = res.data.data.age;

      (res.data.data.registNum) && (this.registNum = res.data.data.registNum);//血糖登记次数
      this.pageLoading = false;

      this.resDeptName = res.data.data.deptName;
      this.resWardName = res.data.data.wardName;

      this.hisPatSugarList = res.data.data.hisPatSugarList;
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
      this.getBedExchange()

    },
    async getBedExchange(){
       let resBedNolList = []
      // 获取动态床号数据
      if(this.listMap.length){
        for(let i = 1 ; i <=  this.listMap.length; i++){
          let bedData = {
              bedLabelNew: this.resBedNol.split(',')[i-1] || this.patientInfo.bedLabel,
              moduleCode: 'sugar',
              pageNo: i,
              patientId: this.patientInfo.patientId,
              visitId: this.patientInfo.visitId
          }
          const resBedNolRes = await getBedExchangeInfo(bedData)
          resBedNolList.push(resBedNolRes.data.data.bedExchangeLog)
        }
      }
      this.resBedNol = resBedNolList.length ? resBedNolList.join(',') : this.patientInfo.bedLabel
    },
    toPrint() {
        const printDom=document.getElementById('blood-sugar-con')
        // 上面的判断:style="$route.path == '/formPage'  ? 'overflow: auto; height: calc(100vh - 105px);' : '' "
        // 在formPage跳转的时候，直接移除即可。返回的时候不会直接进入血糖单。所以再次进入不会有问题。
        printDom.style.removeProperty('overflow'); // 移除 overflow 属性
        printDom.style.removeProperty('height'); // 移除 height 属性
        window.localStorage.sugarModel = $(this.$refs.Contain).html();
        if (process.env.NODE_ENV === "production") {
          let newWid = window.open();
          newWid.location.href = "/crNursing/print/sugar";
        } else {
          this.$router.push(`/print/sugar`);
        }

    },

    openChart() {
      // this.$refs.sugarChartModal.open()
      this.isChart = !this.isChart;
    },
    onAddTable() {
      if (this.$route.query.patientId) {
        this.listMap.push({ left: [], right: [] });
      } else {
        this.$message.warning("请先选择一名患者");
      }
    },
    onAdd() {
      this.$refs.editModal.open("添加血糖记录");
    },
    onEdit() {
      this.$refs.editModal.open("编辑血糖记录", this.selected);
    },
    onEditAge() {
      this.$refs.editAge.open("编辑年龄", {
        age: this.formAge || this.patientInfo.age,
      });
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


      await removeSugar(item);
      await this.load();
      this.selected = null;
    },
    async onSave(item) {
      item.recordDate =
        moment(item.recordDate).format("YYYY-MM-DD HH:mm") + ":00";
      item.patientId = this.patientInfo.patientId;
      item.visitId = this.patientInfo.visitId;
      item.name = this.patientInfo.name;
      item.bedLabel = this.patientInfo.bedLabel;
      item.wardCode = this.patientInfo.wardCode;
      (item.nurseEmpNo = this.empNo || ""), //护士工号
      await saveSugarList([item])
      this.load();
      this.$refs.editModal.close();
      this.selected = null;
      this.$message.success("保存成功");
    },
    async onSaveAge(item) {
      item.patientId = this.patientInfo.patientId;
      item.visitId = this.patientInfo.visitId;
      let itemValue = item.age;
      let itemMap = [
        {
          itemCode: "age",
          itemValue: itemValue,
        },
      ];
      await getEditAge(item.patientId, item.visitId, itemMap).then((res) => {
        console.log("年龄接口返回res===", res);
      });
      this.load();
      this.$refs.editAge.close();
      this.$message.success("保存成功");
    },
    openSetPageModal(length) {
      this.$refs.setPageModal.open(length);
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
    async onResBedNo(e,index){
      let bedData = {
           bedLabelNew: e.target.value,
           moduleCode: 'sugar',
           pageNo: index,
           patientId: this.patientInfo.patientId,
           visitId: this.patientInfo.visitId
       }
      updateBedExchangeInfo(bedData).then((res)=>{
        this.$message({
          message: '保存转床床号成功',
          type: 'success'
        })
      })
    },
  },
  mounted(){
  },
  async created() {
    if (this.$route.query.patientId) {
      await this.load();
    }

    this.getSugarItemDict();
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
    editModal,
    setPageModal,
    editAge
  },
};
</script>
