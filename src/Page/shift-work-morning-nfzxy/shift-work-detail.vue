<template>
  <div class="shift-work-detail" v-loading="loading">
    <div class="toolbar">
      <!-- test -->
      <span>科室：</span>
      <ElSelect size="small" :value="$route.params.code" @input="onCodeChange">
        <ElOption v-for="d of depts" :key="d.deptCode" :label="d.deptName" :value="d.deptCode" />
      </ElSelect>
      <!-- <Button :disabled="isEmpty || allSigned" @click="onPatientsModalShow()">添加患者</Button> -->
      <!-- <Button
        :disabled="isEmpty || allSigned || !$refs.table || !$refs.table.selectedRow"
        @click="onRowRemove"
      >删除行</Button> -->
      <Button  @click="onSave(true)">保存</Button>
      <Button :disabled="isEmpty" @click="onPrint">打印预览</Button>
      <Button  @click="copyNextPage()">复制上一张</Button>
      <div class="empty"></div>
      <Button :disabled="isEmpty || !!record.autographNameA" @click="onRemove">删除交班志</Button>
      <Button :disabled="isEmpty" @click="onToggleFullPage">{{getFullPage() ? '关闭全屏' : '全屏'}}</Button>
    </div>
    <div class="container" ref="container">
      <Placeholder
        v-if="isEmpty"
        icon="el-icon-plus"
        @click="onCreateModalOpen($route.params.code)"
      >创建交班志</Placeholder>

      <div class="paper" v-else>
        <div ref="printable" data-print-style="height: auto;">
          <div class="head shift-paper">
            <!-- <img :src="hospitalLogo" alt="logo" class="logo"> -->
            <h1 class="title">晨会交班记录</h1>
            <!-- <h1 class="title">{{deptName}}</h1> -->
            <!-- <h2 class="sub-title">ISBAR交班记录卡</h2> -->
            <div class="details">
              <span>科室：{{deptName}}</span>
              <span>{{record.changeShiftDate | formatYMD}}</span>
              <span>
                护士签名：
                <button
                  v-if="record.autographName"
                  @click="onDelSignModalOpen"
                >{{record.autographName}}</button>
                <button v-else class="print-hidden" :disabled="isEmpty" @click="onSignModalOpen">点击签名</button>
              </span>
            </div>
          </div>
          <div class="table">
            <div class="table-top">

            </div>
            <div class="table-content">
              <div class="content-goup"  v-for="(type,typeIndex) in typeConfig" :key="typeIndex">
                <div class="content-title">{{type}}</div>
                <div class="content-content">
                  <div class="content-line" @contextmenu.prevent="(e)=>openContextMenu(e,line,type)" v-for="(line,lineIndex) in shiftWorkData" :key="lineIndex" v-if="line.patientType===type">
                    <el-input
                      autosize
                      :class="['textarea']"
                      v-model="line.content"
                      type="textarea"
                      @input="changeShiftValue"
                    />
                  </div>
                </div>
              </div>
              <div class="content-goup">
                <div class="content-line">
                  <span style="padding:4px;">护士交班完毕请值班医生交班！</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="foot" v-if="record" data-print-style="padding-bottom: 25px">
            <div data-print-style="width: auto">
              <span>A班签名：</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.autographNameA"
                  @click="onDelSignModalOpen('A', record.autographEmpNoA)"
                >{{record.autographNameA}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('A')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.autographNameA"
                :src="`/crNursing/api/file/signImage/${record.autographEmpNoA}?${token}`"
                :alt="record.autographNameA"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
            </div>
            <div data-print-style="width: auto" v-if="HOSPITAL_ID != 'weixian'">
              <span>P班签名：</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.autographNameP"
                  @click="onDelSignModalOpen('P',record.autographEmpNoP)"
                >{{record.autographNameP}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('P')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.autographNameP"
                :src="`/crNursing/api/file/signImage/${record.autographEmpNoP}?${token}`"
                :alt="record.autographNameP"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
            </div>
            <div data-print-style="width: auto">
              <span>N班签名：</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.autographNameN"
                  @click="onDelSignModalOpen('N', record.autographEmpNoN)"
                >{{record.autographNameN}}</button>
                <button
                  v-else
                  :disabled="isEmpty"
                  @click="onSignModalOpen('N', record.autographEmpNoN)"
                >点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.autographNameN"
                :src="`/crNursing/api/file/signImage/${record.autographEmpNoN}?${token}`"
                :alt="record.autographNameN"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div id="monring-print" class="paper" style="display:none;">

    </div>
    <syncExamTestModal ref="syncExamTestModal"></syncExamTestModal>
    <SignModal ref="signModal" />
    <patientsModals ref="monringPatients" @selectCallBack="selectCallBack"/>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import FallibleImage from "@/components/FallibleImage/FallibleImage.vue";
import { pick } from "lodash";
import print from "printing";

import * as apis from "./apis";
import formatter from "./print-formatter";
import Button from "./components/button";
import Placeholder from "./components/placeholder";
import SignModal from "./components/sign-modal";
import $ from "jquery";
import patientsModals from './components/patients-modal.vue'
import syncExamTestModal from "@/Page/sheet-page/components/modal/sync-exam-test-modal.vue";
const defaultPatient = {
  name: "",
  bedLabel: "",
  age: "",
  patientStatus: "",
  diagnosis: "",
  mainComplaint: "",
  background: "",
  assessmentSituation: "",
  proposal: ""
};

const arrowKeyValues = {
  // 13: 1, // ENTER
  37: -1, // ←
  38: -6, // ↑
  39: 1, // →
  40: 6 // ↓
};

export default {
  mixins: [common],
  inject: [
    "getFullPage",
    "reloadSideList",
    "onCreateModalOpen",
    "onToggleFullPage",
    'onRecordsData'
  ],
  async beforeRouteLeave(to, from, next) {
    if (this.modified) {
      await this.$confirm("交班志还未保存，离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning"
      });
    }
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    if (this.modified && from.params.id && from.params.id !== to.params.id) {
      await this.$confirm("交班志还未保存，离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning"
      });

      // this.$refs.table.selectRow(-1);
    }

    next();
  },
  data() {
    return {
      loading: false,
      modified: false,
      selectedRow:-1,
      selectedType:'',
      depts: [],
      record: {},
      patients: [],
      // fixedTh: false,
      typeConfig:['入院','预手术','手术','手术并病重','病重','原有病人病情交班','外出未归患者'],
      shiftWorkData:[
          {id:1,content:'17号床，张王李，84岁',type:'ruyuan'},
          {id:2,content:'21号床，赵钱孙，45岁',type:'yushoushu'},
          {id:3,content:'22号床，赵周吴，43岁',type:'yushoushu'},
          {id:4,content:'24号床，赵周吴，46岁',type:'shoushubingbingzhong'},
        ]
    };
  },
  computed: {
    deptName() {
      const code = this.$route.params.code;
      const dept = this.depts.find(d => d.deptCode === code);

      return (dept && dept.deptName) || "";
    },
    isEmpty() {
      return !this.$route.params.id || !this.record;
    },
  },
  watch: {
    deptCode(value, oldValue) {
      if (oldValue !== value) {
        this.loadDepts();
      }
    },
    "$route.params.id"() {
      this.load();
    },
    modified(value, oldValue) {
      if (value !== oldValue) {
        window.onbeforeunload = value ? () => true : null;
      }
    },
    'shiftWorkData.length'(val,oldVal){
      if(val!=oldVal){
        this.shiftWorkData.forEach((item,i)=>{item.sortValue=i})
      }
    }
  },
  mounted() {
    if (this.deptCode) {
      this.loadDepts();
    }
    // let dom = this.$refs.container;
    // $(dom).scroll(e => {
    //   if ($(dom).scrollTop() >= 117) {
    //     this.fixedTh = true;
    //   } else {
    //     this.fixedTh = false;
    //   }
    // });
  },
  methods: {
    removeRow(id){
      this.loading = true
      apis.removeShiftRecordRow(id).then(res=>{
        this.load()
      })
    },
    selectCallBack(patients){
      let arr = patients.map((item,index)=>{
        let {bedLabel,patientId,visitId,name,age,diagnosis} = item
        let content = `${bedLabel}床，${name}，${age}，${diagnosis}`
        // this.shiftWorkData[this.selectedRow].patientId = patientId
        // this.shiftWorkData[this.selectedRow].visitId = visitId
        // this.shiftWorkData[this.selectedRow].content = content
        return {patientId,visitId,content,patientType:this.selectedType}
      })
      this.shiftWorkData[this.selectedRow]&&this.shiftWorkData[this.selectedRow].id&&(arr[0].id=this.shiftWorkData[this.selectedRow].id)
      this.shiftWorkData.splice(this.selectedRow,1,...arr)
      this.loading = true
      this.onSave(true)
    },
    initShiftWorkData(val){
      let obj = {}
      this.typeConfig.map(item=>{
        obj[item] = 0
      })
      val.map(item=>{
        obj[item.patientType]++
      })
      Object.keys(obj).map(key=>{
        if(obj[key]==0){
          val.push({id:'',content:'',patientType:key})
        }
      })
      return val
    },
    changeShiftValue(){
      this.modified = true
    },
    async loadDepts() {
      const parentCode = this.deptCode;
      const res1 = await apis.listDepartment(parentCode);
      const {
        data: { data: depts }
      } = res1;

      this.depts = depts;

      const code = depts[0] && depts[0].deptCode;
      const params = this.$route.params;
      if (!params.code) {
        this.$router.push({ path: `/morningShiftWork/${code}` });
      }
      this.reloadSideList();
    },
    onCodeChange(code) {
      this.$router.push({ path: `/morningShiftWork/${code}` });
    },
    async load() {
      const id = this.$route.params.id;
      if (!id) return;

      this.loading = true;
      try {
        const {
          data: { data }
        } = await apis.getShiftRecord(id);
        const { changeShiftMorning: record, changeShiftContents: patients } = data;
        // record.specialCase = record.specialCase || "";
        this.record = record;
        // this.patients = patients;
        this.shiftWorkData = this.initShiftWorkData(patients)
        this.modified = false;

        // if (patients.length < 11) {
        //   this.patients = this.patients.concat(
        //     Array.from({ length: 11 - patients.length }).map(() => ({
        //       ...defaultPatient
        //     }))
        //   );
        // }
      } catch (error) {
        // console.log(error);
        this.$router.replace({ name: "morningShiftWork" });
      }
      this.loading = false;
    },
    toHTML(source) {
      return (source || "").replace(/\n/g, "<br>");
    },
    // async onRowRemove() {
    //   await this.$confirm("你确定删除该行？", "提示", {
    //     confirmButtonText: "删除",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   });
    //   // this.modified = true
    //   const selectedRow = this.$refs.table.selectedRow;
    //   if (selectedRow && selectedRow.id) {
    //     await apis.removeShiftRecordRow(selectedRow.id);
    //   }
    //   this.$refs.table.removeRow();
    // },
    onPatientsModalShow(d) {
      const id = this.$route.params.id;
      const deptCode = this.$route.params.code;
      const date = d || this.record.changeShiftDate;

      const selectedKeys = this.patients
        .filter(p => p.patientId && p.visitId)
        .map(p => p.patientId + "//" + p.visitId);

      // this.$refs.patientsModal.open({ deptCode, date, id, selectedKeys });
    },
    async onSave(tip) {
      if(this.shiftWorkData.some(item=>item.content&&!item.patientId)){
        this.$message.error("存在记录未选择相应患者！")
        return
      }
      const deptCode = this.deptCode;
      const changeShiftMorning = this.record;
      const changeShiftContents = this.shiftWorkData.filter(item=>item.patientId).map((p, i) => ({ ...p, sortValue: i + 1 }));

      await apis.updateShiftRecord({
        changeShiftMorning,
        changeShiftContents,
        deptCode
      });

      this.load();
      if (tip) {
        this.$message.success("保存成功");
      }
    },
    onSignModalOpen() {
      if (this.modified) {
        return this.$message.warning("请先保存后再签名");
      }

      window.openSignModal(async (password, username) => {
        await apis.signShiftRecord(this.record.id, username, password);

        this.load();
        this.$refs.signModal.close();
        this.$message.success("签名成功");
      });
    },
    onDelSignModalOpen() {
      window.openSignModal(async (password, username) => {
        await apis.delSignShiftRecord(
          this.record.id,
          username,
          password,
          this.record.autographEmpNo
        );

        this.load();
        this.$refs.signModal.close();
        this.$message.success("已取消签名");
        this.reloadSideList();
      });
    },
    async onRemove() {
      window.openSignModal(async (password, username) => {
        await apis.removeShiftRecord(this.record.id, username, password);

        const code = this.$route.params.code;

        this.$message.success("删除成功");
        this.$refs.signModal.close();
        this.modified = false;
        this.record = null;
        this.shiftWorkData = [];
        this.$router.push({ path: `/morningShiftWork/${code}` });
        this.reloadSideList();
      });
    },
    // 复制上一张
    async copyNextPage(){
      let totalPage = this.onRecordsData()
      let nextPage = totalPage.find(item =>new Date(item.changeShiftDate).getTime() < new Date(this.record.changeShiftDate).getTime())
      let isCopy = this.shiftWorkData.some(item => item.id)
      if(isCopy) {
       this.$confirm('当前页已有数据, 如果确定复制将替代已有数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
            try {
            const {
              data: { data }
            } = await apis.getShiftRecord(nextPage.id);
            const { changeShiftContents: patients } = data;
            this.shiftWorkData = this.initShiftWorkData(patients)
          } catch(err){
            console.log(err)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }else{
         try {
            const {
              data: { data }
            } = await apis.getShiftRecord(nextPage.id);
            const { changeShiftContents: patients } = data;
            this.shiftWorkData = this.initShiftWorkData(patients)
          } catch(err){
            console.log(err)
          }
      }


    },
    GetLength(str) {
      var realLength = 0,
        len = str.length,
        charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
      }
      return realLength;
    },
    async onPrint() {
      this.loading = true;
      // this.fixedTh = false;
      this.$nextTick(async () => {
        await print(this.$refs.printable, {
          // beforePrint: formatter,
          // direction: "horizontal",
          injectGlobalCss: true,
          scanStyles: false,
          css: `
        .fixedTh {
          display: none !important;
          height: auto;
        }
        pre {
          white-space: pre-wrap;
          break-inside:auto;
        }
        *{
          background:none!important;
        }
        `
        });
        // let page = this.$refs.printable
        // let header = page.getElementsByClassName('head')[0].cloneNode(true)
        // let textAreas = [...page.getElementsByTagName('textarea')]
        // textAreas.map(ele=>{
        //   let text = ""
        //   let strArr = ele.value.split("")
        //   strArr.map(e=>{
        //   let strNum = this.GetLength(text + e)
        //   if(strNum > 84){

        //   }
        //   })
        //   // let strNum = this.GetLength(ele.value)
        //   // if(strNum > 84){
        //   //   let rowNum = Math.ceil(strNum / 84)
        //   //   for(let i = 0;i<rowNum;i++){
        //   //     let pre = document.createElement('pre')
        //   //   }
        //   // }
        // })
        // let printArea = document.getElementById("monring-print")
        // printArea.append(header)
        // printArea.style.display = "block"
        // await print(printArea, {
        //   // beforePrint: formatter,
        //   // direction: "horizontal",
        //   injectGlobalCss: true,
        //   scanStyles: false,
        //   css: `
        // .fixedTh {
        //   display: none !important;
        //   height: auto;
        // }
        // pre {
        //   white-space: pre-wrap;
        //   break-inside:auto;
        // }
        // *{
        //   background:none!important;
        // }
        // `
        // });
        // printArea.style.display = "none"
        // printArea.innerHTML = ''
      });
      this.loading = false;
    },
    openContextMenu(e,rowObj,type){
      this.selectedType = type
      this.selectedRow = rowObj.sortValue
      let data = [
        // {
        //   name: "复制格",
        //   icon: "fuzhizhenghang",
        //   disable: false,
        //   click: () => {
        //   }
        // },
        {
          name: "向上插入新行",
          icon: "charuxinhang",
          click: () => {
            this.modified = true;
            // this.$refs.table.addRowBefore({ ...defaultPatient });
            this.shiftWorkData.splice(this.selectedRow,0,{content:'',patientType:this.selectedType})
          }
        },
        {
          name: "删除当前行",
          icon: "shanchuzhenghang",
          disable: !rowObj.id,
          click: () => {
            // this.modified = true;
            // this.$refs.table.addRowBefore({ ...defaultPatient });
            // this.shiftWorkData.splice(this.selectedRow,1)
            this.removeRow(rowObj.id)
          }
        },
        {
          name: "向下插入新行",
          icon: "xiangxiacharuyihang",
          click: () => {
            this.modified = true;
            this.shiftWorkData.splice(this.selectedRow,1,this.shiftWorkData[this.selectedRow],{content:'',patientType:this.selectedType})
          }
        },
        {
          name: "选择患者",
          icon: "yonghuming",
          click: () => {
            this.modified = true;
            // console.log(this.$route.params);
            this.$refs.monringPatients.open(this.$route.params.code,this.record.changeShiftDate,this.$route.params.id,[])
            // this.$refs.table.addRowAfter({ ...defaultPatient });
          }
        },
        ]
      if(!data.length)return
      const style = {
        top: `${Math.min(
          e.clientY - 15,
          window.innerHeight - data.length * 36 - 12
        )}px`,
        left: `${Math.min(e.clientX + 15, window.innerWidth - 180)}px`
      };

      window.openContextMenu({ data, style });
    }
  },
  filters:{
    formatYMD(val){
      if(!val){return ''}
      let [Y,M,D] = val.split("-")
      return `${Y}年${M}月${D}日`
    }
  },
  components: {
    FallibleImage,
    patientsModals,
    Button,
    Placeholder,
    SignModal,
    syncExamTestModal
  }
};
</script>

<style lang="stylus" scoped>
.shift-work-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.toolbar {
  display: flex;
  align-items: center;
  height: 41px;
  padding: 0 18px;
  background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
  border: 1px solid #CBD5DD;
  overflow: hidden;
  font-size: 14px;

  .el-select {
    margin-left: 8px;
    margin-right: 10px;
  }

  .empty {
    flex: 1;
  }
}

.container {
  padding: 15px 0;
  flex: 1;
  min-height: 0;
  background: #dfdfdf;
  overflow: auto;
}

.paper {
  margin: 0 auto 20px;
  padding: 20px 50px;
  width: 790px;
  min-height: 700px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.head {
  position: relative;
  // padding 15px 0 10px
}

.logo {
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
}

.title {
  font-size: 22px;
  text-align: center;
}

.sub-title {
  margin-top: 10px;
  text-align: center;
}

.details {
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  text-align center;

  >span {
    flex: 1;
    white-space: nowrap;
  }
}

.table {
  margin-top: 5px;
  border: 1px solid #000;
  .content-title{
    padding 4px;
  }
  >>>pre {
    white-space: pre-wrap;
  }
  .noSet >>> textarea{
    cursor:default;
  }
  >>>textarea, >>>pre{
    display block
    // padding 8px 4px
    padding 4px;
    margin 0
    width 100%
    min-height 15px
    box-sizing border-box
    border none !important
    outline none !important
    resize none
    background none !important
    color black !important
    overflow-y hidden
    text-align inherit
    font-size: 16px;
    &:hover{
      background #ccc !important;
    }
  }
  .content-line{
    margin: 0 0 10px;
    &:first-child{
      margin-top:10px;
    }
  }
}

.normal-row {
  background: white !important;
}

.row-title {
  height: 32px;
  font-size: 13px;
  font-weight: bold;
}

.row-action {
  float: right;
  color: rgb(40, 79, 194);
  cursor: pointer;
}

.special-case-title {
  padding: 10px;
}

.special-case {
  width: 100%;
  padding: 8px 8px;
  display: block;
  border: none;
  outline: none;
  box-sizing: border-box;
  line-height: 1.4em;
  font-size: 13px;
  min-height: 100px !important;
}

.foot {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  line-height: 25px;

  div {
    font-size: 0;
    white-space: nowrap;
  }

  img, span {
    vertical-align: middle;
    font-size: 13px;
  }

  .img {
    display: none;
    width: 52px;
    max-height: 25px;
  }
}
  button {
    padding: 0;
    border: none;
    outline: none;
    background: none;
    color: rgb(40, 79, 194);
    cursor: pointer;
  }
</style>
<style lang="stylus">
@media print {
  // .shift-paper {
  //   padding-top: 40px !important;
  // }
  @page {
    margin:40px 20mm;
  }
  .print-hidden{
    display:none;
  }
}

</style>

