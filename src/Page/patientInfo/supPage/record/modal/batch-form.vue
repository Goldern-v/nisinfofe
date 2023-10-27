<template>
  <div class="modal-con">
    <sweet-modal
      ref="batchRecord"
      size="big"
      title="创建新护理文书"
      class="modal-record padding-0"
    >
      <div class="title-bar" flex="cross:center">
        <span class="type-text">护理文书类型</span>
        <el-select
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
          class="text-con"
          :placeholder="
            '搜索' + options.find((item) => item.value == formType).label
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
          class="record-box"
          :class="{ active: selectData.includes(e)}"
          v-for="(e) in item"
          :key="e.id || e.label"
        >
          <!-- 收藏的评估单标记 -->
         <span class="likePng">
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
          :disabled="!selectData.length || !!!(selectData[0].collectionUser.indexOf(activeUser)!=-1)"
          @click.stop="cancelCollectAssessment"
         >取消批量收藏
        </el-button>
        <el-button
          class="modal-btn"
          type="primary"
          :disabled="!selectData.length || !!(selectData[0].collectionUser.indexOf(activeUser)!=-1)"
          @click.stop="collectAssessment"
        >
        批量收藏
        </el-button>
        <el-button class="modal-btn">关闭</el-button>
        <el-button
          class="modal-btn"
          type="primary"
          @click="create"
          :disabled="!selectData"
          >批量创建</el-button
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
  batchSaveForCollection,
  batchUnfollowCollection,
  createFormBatch
} from "@/api/patientInfo";
import commonMixin from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";
import { templatesAll } from "../api/index.js";
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
      ],
      formType: "1",
      pageLoading: true,
      pageLoadingText: "数据载入中",
      searchWord: "",
      bus: bus(this),
      selectData: [],
      tmpitem: "",
      pageItem: "",
      formTypeReadOnly: false,
      filterObj: null,
      formGroup:'全部',
    };
  },
  methods: {
    // 选择收藏
   async collectAssessment(){
    let list = []
      this.selectData.map(item => {
        list.push({deptCode:this.deptCode, collectionUser:this.activeUser,formCode:item.formCode})
      })
      await batchSaveForCollection(list)
      this.selectData=[]
      this.open()
    },
    // 取消收藏
   async cancelCollectAssessment(){
      let list = []
      this.selectData.map(item => {
        list.push({deptCode:this.deptCode, collectionUser:this.activeUser,formCode:item.formCode})
      })
      await batchUnfollowCollection(list)
      this.selectData=[]
      this.open()
    },
    open(filterObj) {

      if (filterObj) {
        this.filterObj = filterObj;
        this.formType = filterObj.formType;
        this.formTypeReadOnly = true;
      } else {
        this.filterObj = null;
        this.formType = "1";
        this.formTypeReadOnly = false;
      }
      if (this.$route.query.patientId) {
        this.templates = [];
        this.$refs.batchRecord.open();
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
      if (this.selectData.includes(item)) {
        this.selectData = this.selectData.filter(fitem => item.id != fitem.id);
      } else {
        this.selectData.push(item);
      }
    },
    create() {
      this.bus.$emit("closeAssessment");
      let list = [];
      this.selectData.map(item => {
        list.push({formCode:item.formCode, batchCreateType: item.batchCreateType})
      })
      let pramas = {
        patientId: this.$route.query.patientId,
        visitId: this.$route.query.visitId,
        deptCode: this.$route.query.deptCode,
        wardCode: this.$route.query.wardCode,
        list
      };
      createFormBatch(pramas).then(res=>{
        this.$notify.success({
          title: "提示",
          message: "保存成功"
        });
        this.bus.$emit("refreshTree");
        this.selectData = []
        this.newRecordClose();
      })

    },
    newRecordClose() {
      this.$refs.batchRecord.close();
    },
    getData() {
      this.pageLoading = true;
      if (this.formType == "1") {
        templates(this.deptCode).then((res) => {
          if (this.filterObj && this.filterObj.formName) {
            this.templates = res.data.data.filter(
              (item) => item.name === this.filterObj.formName
            );
          } else {
            this.templates = res.data.data;
          }
          this.pageLoading = false;
        });
      }  else if (this.formType == "leaveHospital") {
        templates(this.deptCode).then((res) => {
          this.templates = res.data.data.filter(item=> item.formCode =='E1346');
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
        this.selectData = [];
        console.log('this.templates',this.templates);
        return this.templates.filter((item) => {
          if (
            this.formType == "1" ||
            this.formType == "4" ||
            this.formType == "firstRecord" ||
            this.formType == "handover"
          ) {
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
  },
  components: {},
};
</script>
