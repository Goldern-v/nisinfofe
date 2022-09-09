<template>
  <div class="modal-con">
    <sweet-modal
      ref="newRecord"
      size="big"
      title="创建新护理文书"
      class="modal-record padding-0"
    >
      <div class="title-bar" flex="cross:center">
        <span class="type-text">护理文书类型</span>
        <el-select
          v-if="
            HOSPITAL_ID != 'hj' &&
            HOSPITAL_ID != 'huadu' &&
            HOSPITAL_ID != 'liaocheng' &&
            HOSPITAL_ID != 'guizhou' &&
            HOSPITAL_ID != 'foshanrenyi' &&
            HOSPITAL_ID != 'fsxt'
          "
          v-model="formType"
          placeholder="选择类型"
          class="type-select"
          :disabled="formTypeReadOnly"
        >
          <el-option
            v-for="item in options"
            :key="item.value || item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-if="
            HOSPITAL_ID != 'hj' &&
            HOSPITAL_ID != 'huadu' &&
            HOSPITAL_ID != 'liaocheng' &&
            HOSPITAL_ID != 'guizhou' &&
            HOSPITAL_ID != 'foshanrenyi' &&
            HOSPITAL_ID != 'fsxt'
          "
          class="text-con"
          :placeholder="
            '搜索' + options.find((item) => item.value == formType).label
          "
          icon="search"
          v-model="searchWord"
        ></el-input>
        <el-select
          v-if="HOSPITAL_ID == 'foshanrenyi' || HOSPITAL_ID == 'fsxt'"
          v-model="formType"
          placeholder="选择类型"
          class="type-select"
          :disabled="formTypeReadOnly"
        >
          <el-option
            v-for="item in foshanrenyiOptions"
            :key="item.value || item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-if="HOSPITAL_ID == 'foshanrenyi' || HOSPITAL_ID == 'fsxt'"
          class="text-con"
          :placeholder="
            '搜索' + foshanrenyiOptions.find((item) => item.value == formType).label
          "
          icon="search"
          v-model="searchWord"
        ></el-input>
        <el-select
          v-if="HOSPITAL_ID == 'hj'"
          v-model="formType"
          placeholder="选择类型"
          class="type-select"
          :disabled="formTypeReadOnly"
        >
          <el-option
            v-for="item in hjOptions"
            :key="item.value || item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-if="HOSPITAL_ID == 'hj'"
          class="text-con"
          :placeholder="
            '搜索' + hjOptions.find((item) => item.value == formType).label
          "
          icon="search"
          v-model="searchWord"
        ></el-input>
        <el-select
          v-if="HOSPITAL_ID == 'huadu'"
          v-model="formType"
          placeholder="选择类型"
          class="type-select"
          :disabled="formTypeReadOnly"
        >
          <el-option
            v-for="item in huaduOptions"
            :key="item.value || item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-if="HOSPITAL_ID == 'huadu'"
          class="text-con"
          :placeholder="
            '搜索' + huaduOptions.find((item) => item.value == formType).label
          "
          icon="search"
          v-model="searchWord"
        ></el-input>
        <!-- 聊城 -->
        <el-select
          v-if="HOSPITAL_ID == 'liaocheng'"
          v-model="formType"
          placeholder="选择类型"
          class="type-select"
          :disabled="formTypeReadOnly"
        >
          <el-option
            v-for="item in liaochengOptions"
            :key="item.value || item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-if="HOSPITAL_ID == 'liaocheng'"
          class="text-con-liaocheng"
          :placeholder="
            '搜索' +
            liaochengOptions.find((item) => item.value == formType).label
          "
          icon="search"
          v-model="searchWord"
        ></el-input>
        <!-- 贵州省人民医院 -->
        <el-select
          v-if="HOSPITAL_ID == 'guizhou'"
          v-model="formType"
          style="width: 150px"
          placeholder="选择类型"
          class="type-select"
          :disabled="formTypeReadOnly"
        >
          <el-option
            v-for="item in guizhouOptions"
            :key="item.value || item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-if="HOSPITAL_ID == 'guizhou'"
          class="text-con-liaocheng"
          :placeholder="
            '搜索' + guizhouOptions.find((item) => item.value == formType).label
          "
          icon="search"
          v-model="searchWord"
        ></el-input>
        <span class="type-text" style="margin-left:20px;">护理文书分组</span>
        <el-select
          v-model="formGroup"
          style="width: 150px"
          placeholder="选择分组"
          class="type-select"
        >
          <el-option
            v-for="(item,index) in titleOption"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </div>
      <div
        class="record-con"
        v-loading="pageLoading"
        :element-loading-text="pageLoadingText"
      >
      <div
          class="group-list"
          v-for="(item,index) of titleData"
          :key="index"
          v-show="formGroup==index||formGroup=='全部'"
        >
          <div class="title-box" v-show="item">{{index}}</div>
          <div
          @click="openUrl(e)"
          @dblclick="create(e)"
          class="record-box"
          :class="{ active: selectData == e }"
          v-for="(e) in item"
          :key="e.id || e.label"
        >
          <!-- 收藏的评估单标记 -->
         <span class="likePng"  v-if="HOSPITAL_ID=='foshanrenyi'">
                <img 
                 v-if="e.collectionDept && (e.collectionUser.indexOf(activeUser)!=-1)"
                 src="@/common/images/card/like.png" 
                 style="height:13px"
                 alt
                 >
          </span>
          <el-row type="flex" align="middle">
            <img
              src="../../../../../common/images/record/文件创建.png"
              alt
              width="38"
              height="35"
            />
            <span class="name" v-if="e.name">{{ e.name }}</span>
            <span class="name" v-if="e.recordName">{{
              e.recordName
            }}</span>
          </el-row>
        </div>
      </div>
    </div>

      <div slot="button" @click="newRecordClose">
        <!--    应该selectData.collectionDep也判断的。但是后端逻辑有问题。取消收藏不清空。所以先用收藏者判断. -->
        <!--   !! 为了转Boolean-->
        <el-button 
          class="modal-btn" 
          :disabled="!selectData || !!!(selectData.collectionUser.indexOf(activeUser)!=-1)"
          @click.stop="cancelCollectAssessment"
          v-if="HOSPITAL_ID=='foshanrenyi'"
         >取消收藏
        </el-button>
        <el-button 
          class="modal-btn" 
          type="primary"
          :disabled="!selectData || !!(selectData.collectionUser.indexOf(activeUser)!=-1)"
          @click.stop="collectAssessment"
          v-if="HOSPITAL_ID=='foshanrenyi'"
        >
        收藏
        </el-button>
        <el-button class="modal-btn">关闭</el-button>
        <el-button
          class="modal-btn"
          type="primary"
          @click="create"
          :disabled="!selectData"
          >创建</el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
/deep/ .sweet-content{
  overflow hidden
}
.title-bar {
  height: 45px;
  background: #fff;
  border-bottom: 1px solid #EAEEF1;
  padding: 0 15px;
}

.type-select {
  >>>.el-input {
    min-width: 126px;
  }

  >>>.el-input__inner {
    height: 30px !important;
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
  }
}

.text-con {
  >>>&.el-input {
    width: 138px;
    margin-left: 10px;
  }

  >>>.el-input__inner {
    width: 138px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
  }
}

.text-con-liaocheng {
  >>>&.el-input {
    width: 146px;
    margin-left: 10px;
  }

  >>>.el-input__inner {
    width: 146px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
  }
}

.record-con {
  // display flex;
  // flex-wrap :wrap;
  margin: 0;
  padding: 10px 10px 10px;
  height: 420px;
  overflow: auto;
  .group-list{
    display flex;
    flex-wrap :wrap;
    .title-box{
      font-weight 700;
      cursor default;
      padding-left 10px;
      display flex;
      width 100%;
      height 25px;
      line-height 25px;
      font-size 12px;
      text-indent 5px;
      &::before{
        content:'';
        display block;
        width: 10px;
        height: 10px;
        background-color #2180d6;
        position relative;
        top:50%;
        transform :translateY(-50%)
      }
    }
  }
  .record-box {
    position relative
    cursor: pointer;
    // float: left;
    box-sizing: border-box;
    padding: 10px 10px 10px;
    width: 33%;
    height: 60px;

    &.active {
      background: #F0F5F3;
      border: 1px solid #C0D4CD;
      border-radius: 4px;
    }
   .likePng{
        position absolute
        right 0
        top 10
      }
    img {
      height: 35px;
    }

    .name {
      font-size: 13px;
      color: #687179;
      margin-left: 12px;
      height: 40px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}

.type-text {
  font-size: 13px;
  color: #687179;
  margin-right: 10px;
}

/deep/ .sweet-modal {
  max-height: calc(100vh - 30px) !important;

  .sweet-content {
    // max-height 100vh!important
  }
}
</style>

<script>
import {
  templates,
  briefMission,
  getContentByMissionIds,
  listRecord,
  inform,
  healthEdu,
  collectAssessmentForm,
  unCollectAssessmentForm
} from "@/api/patientInfo";
import commonMixin from "@/common/mixin/common.mixin";
import { host } from "@/api/apiConfig";
import bus from "vue-happy-bus";
import { formUrl, devFormUrl } from "@/common/pathConfig/index.js";
import { templatesAll } from "../api/index.js";
import { getFormConfig } from "../config/form-config.js";
import qs from "qs";
import resText from './res'
import pinyingMatch from 'pinyin-match'

const getInitFormType = (HOSPITAL_ID) => {
  switch (HOSPITAL_ID) {
    case 'huadu':
      return 'firstRecord'
    default:
      return "1";
  }
};

export default {
  mixins: [commonMixin],
  data() {
    return {
      templates: [],
      options: [
        {
          value: "1",
          label: "护理评估",
        },
        {
          value: "monitor",
          label: "监测记录",
        },
        {
          value: "report",
          label: "报告类",
        },
        // {
        //   value: "4",
        //   label: "健康宣教"
        // }
      ],
      hjOptions: [
        {
          value: "1",
          label: "护理评估",
        },
        {
          value: "monitor",
          label: "监测记录",
        },
        {
          value: "report",
          label: "报告类",
        },
        {
          value: "sens",
          label: "敏感指标类",
        },
      ],
      huaduOptions: [
        {
          value: "firstRecord",
          label: "首次记录",
        },
        {
          value: "1",
          label: "护理评估",
        },

      ],
      liaochengOptions: [
        {
          value: "1",
          label: "护理评估",
        },
        {
          value: "monitor",
          label: "监测记录",
        },
        {
          value: "handover",
          label: "交接记录单",
        },
        {
          value: "authorization",
          label: "知情同意书",
        },
      ],
      foshanrenyiOptions: [
        {
          value: "1",
          label: "护理评估",
        },
        {
          value: "monitor",
          label: "监测记录",
        },
        {
          value: "report",
          label: "报告类",
        },
        {
          value: "authorization",
          label: "知情同意书",
        },
        {
          value: "leaveHospital",
          label: "出院评估",
        },
      ],
      // guizhouOptions: [

      //   // {
      //   //   value: "eval",
      //   //   label: "全部",
      //   // },
      //   {
      //     value: "1",
      //     label: "通用护理评估单",
      //   },
      //   {
      //     value: "specialistScoring",
      //     label: "专科护理评估单",
      //   },
      //   {
      //     value: "authorization",
      //     label: "知情同意书",
      //   },
      // ],
      guizhouOptions: [
        // {
        //   value: "1",
        //   label: "全部",
        // },
        {
          value: "1",
          label: "通用护理评估单",
        },
        {
          value: "common",
          label: "通用护理表单",
        },
        {
          value: "specialistEval",
          label: "专科护理评估单",
        },
        {
          value: "specialistForm",
          label: "专科护理表单",
        },
        {
          value: "authorization",
          label: "知情同意书",
        },
        // {
        //   value: "specialistScoring",
        //   label: "专科护理评估单",
        // },
        // {
        //   value: "authorization",
        //   label: "知情同意书",
        // },
      ],
      formType: getInitFormType(this.HOSPITAL_ID),
      pageLoading: true,
      pageLoadingText: "数据载入中",
      searchWord: "",
      bus: bus(this),
      selectData: "",
      tmpitem: "",
      pageItem: "",
      formTypeReadOnly: false,
      filterObj: null,
      formGroup:'全部',
    };
  },
  methods: {
   async collectAssessment(){
      await collectAssessmentForm(this.deptCode,this.activeUser,this.selectData.formCode)
      this.selectData=''
      this.open()
    },
   async cancelCollectAssessment(){
      await unCollectAssessmentForm(this.deptCode,this.activeUser,this.selectData.formCode)
      this.selectData=''
      this.open()
    },
    hasTitle(item,index){
     return this.titleData&&this.titleData[item.groupName]&&this.titleData[item.groupName]==index
    },
    open(filterObj) {
      if (filterObj) {
        this.filterObj = filterObj;
        this.formType = filterObj.formType;
        this.formTypeReadOnly = true;
      } else {
        this.filterObj = null;
        this.formType = getInitFormType(this.HOSPITAL_ID);
        this.formTypeReadOnly = false;
      }
      if (this.$route.query.patientId) {
        this.templates = [];
        this.$refs.newRecord.open();
        this.getData();
      } else {
        this.$message({
          showClose: true,
          duration: 3000,
          message: "请选中一位病人",
        });
      }
    },
    close() {
      this.$refs.modal.close();
    },
    openUrl(item) {
      if (item == this.selectData) {
        this.selectData = "";
      } else {
        this.selectData = item;
      }
    },
    create(data) {
      this.bus.$emit("closeAssessment");
      let item;
      if (data.name) {
        item = data;
      } else {
        item = this.selectData;
      }
      console.log("新建页面HTML代码", item, this, this.formType);
      window.app.currentForm = item;

      if (
        [
          "1",
          "eval",
          "monitor",
          "sens",
          "firstRecord",
          "handover",
          "specialistScoring",
          "authorization",
          "common",
          "specialistEval",
          "specialistForm",
        ].includes(this.formType)
      ) {
        let token = window.app.$getCookie("NURSING_USER").split("##")[1];
        let query = this.$route.query;

        // 开启编辑护理评估表旧版
        if (item.nooForm == "-1") {
          let url = `${host}/crNursing/api/form/input/${item.formCode}/${query.patientId}/${query.visitId}/${query.name}/${query.sex}/${query.age}/${query.deptCode}/${query.bedLabel}/${query.inpNo}/${query.wardCode}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`;
          window.openFormBox(url);
        } else if (["2", "1", "0"].indexOf(item.nooForm) > -1) {
          let url;
          //  url = `http://localhost:3000/MMSE`
          let query = this.$route.query;
          // 第1版：外置统一按钮表单。判断是否存在措施。
          if (!getFormConfig(item.name).hasMeasure) {
            this.bus.$emit(
              "openAssessmentBox",
              Object.assign(getFormConfig(item.name), {
                id: "",
                formCode: item.formCode,
                nooForm: item.nooForm,
                pageUrl: item.pageUrl,
              })
            );
          }
          // 第0版：旧表弹窗表单
          else if (item.formVersion < 2 && item.nooForm < 2) {
            let queryObj = {
              id: "",
              formCode: item.formCode,
              patientId: query.patientId,
              visitId: query.visitId,
              name: query.name,
              sex: query.sex,
              age: query.age,
              deptCode: query.deptCode,
              bedLabel: query.bedLabel,
              inpNo: query.inpNo,
              wardCode: query.wardCode,
              wardName: query.wardName,
              admissionDate: query.admissionDate,
              token: this.token,
            };
            if (this.isDev) {
              // url = `${devFormUrl}/${item.pageUrl + '.html'}?${qs.stringify(queryObj)}`
              // 后台补充 .html
              url = `${devFormUrl}/${item.pageUrl}?${qs.stringify(queryObj)}`;
            } else {
              url = `${formUrl}/${item.pageUrl}?${qs.stringify(queryObj)}`;
            }
            window.openFormBox(url);
          }
          // 新2版：表单，内置顶部按钮，框架宽占满屏，内置分页阴影效果
          if (item.formVersion == 2 || item.nooForm == 2) {
            console.log(
              "新2版：表单，内置顶部按钮，框架宽占满屏，内置分页阴影效果"
            );
            // this.bus.$emit(
            //   "openAssessmentV2",
            //   Object.assign(item, {
            //     id: "",
            //     showConToolBar: false
            //   })
            // );
            this.bus.$emit(
              "openAssessmentBox",
              Object.assign(item, {
                id: "",
                showConToolBar: false,
              })
            );
            this.newRecordClose();
            // return;
          }
        }
      } else if (this.formType === "4") {
        console.log("健康教育单");
        this.nooForm = 1;
        // getContentByMissionIds(item.missionId).then(res => {
        // console.log(res,"res")
        this.bus.$emit(
          /** openAssessment  19-7-31 尝试修改*/
          "openAssessmentBox",
          Object.assign(getFormConfig("健康教育单"), {
            id: "",
            formCode: "eduMission",
            nooForm: 1,
            pageUrl: "健康教育单.html",
            // pageUrl: "aowu.html",
            pageItem: item.name,
            missionId: item.missionId,
            publicUse: item.publicUse,
            deptCode: item.deptCode,
          })
        );
        this.pageItem = item.name;
        // this.bus.$emit(
        //   "pageItem",
        //     this.pageItem
        //   )
        //  this.newRecordClose();
      }
      this.newRecordClose();
    },
    newRecordClose() {
      this.$refs.newRecord.close();
    },
    getData() {
      this.pageLoading = true;
      if (this.formType == "1") {
        templates(this.deptCode).then((res) => {
          if (this.filterObj && this.filterObj.formName) {
            this.templates = res.data.data.filter(
              (item) => item.name === this.filterObj.formName
            );
            // this.templates = resText.data.filter(
            //   (item) => item.name === this.filterObj.formName
            // );
          } else {
            this.templates = res.data.data;
            // this.templates = resText.data;

          }
          this.pageLoading = false;
        });
      } else if (this.formType == "4") {
        briefMission(this.deptCode).then((res) => {
          // console.log("res")
          console.log(res);
          this.templates = res.data.data.missionList;
          this.tmpitem = res.data.data.eduFormTemplate;
          this.pageLoading = false;
        });
      } else if (this.formType == "leaveHospital") {
        templates(this.deptCode).then((res) => {
          // if (this.filterObj && this.filterObj.formName) {
          //   this.templates = res.data.data.filter(
          //     (item) => item.name === this.filterObj.formName
          //   );
          
          // } else {
            // formCode  E1346  //佛山人医 选中出院评估后单独把出院评估及指导筛选出来
            this.templates = res.data.data.filter(item=> item.formCode =='E1346');
          // }
          this.pageLoading = false;
        });
      } else {
        templatesAll(this.formType, this.deptCode).then((res) => {
          if (this.filterObj && this.filterObj.formName) {
            this.templates = res.data.data.list.filter(
              (item) => item.name === this.filterObj.formName
            );
          } else {
            this.templates = res.data.data.list;
          }
          this.pageLoading = false;
        });
      }
    },
  },
  computed: {
    activeUser(){
      return JSON.parse(localStorage.getItem('user')).empNo
    },
    filterData() {
      if (this.searchWord) {
        this.selectData = "";
        return this.templates.filter((item) => {
          if (
            this.formType == "1" ||
            this.formType == "4" ||
            this.formType == "firstRecord" ||
            this.formType == "handover"
          ) {
            if (['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)) {
              return pinyingMatch.match(item.name, this.searchWord)
            }
            return item.name.indexOf(this.searchWord) > -1;
          }
        });
      } else {
        return this.templates;
      }
    },
    titleData(){
      let obj = {}
      if(this.filterData.length){
        this.filterData.map((item)=>{
          obj[item.groupName] = obj[item.groupName]?obj[item.groupName]:[]
          obj[item.groupName].push(item)
        })
      }
      return obj
    },
    titleOption(){
      let titleArr = Object.keys(this.titleData)
      titleArr.unshift('全部')
      return titleArr
    }
  },
  watch: {
    formType() {
      this.getData();
      this.selectData = "";
    },
    titleData(val){
      console.log(val);
    }
  },
  components: {},
};
</script>
