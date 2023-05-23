<template>
  <div>
    <!-- <div class="no-do-bg" v-show="show" @click="close"></div> -->
    <transition name="el-zoom-in-left">
      <div class="slide-con" v-show="show">
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">特殊情况模版</span>
          <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <div>
          <div class="search-con">
            <div class="search-con_select">
              <div style="width: 97%">
                <div flex class="select-box">
                  <!-- <p class='lable'>类型：</p>
                  <el-select v-model="selectedClasss" filterable placeholder="请选择">
                    <el-option v-for="item in ['全部', '公共', '科室']" :key="item" :label="item" :value="item"></el-option>
                  </el-select> -->
                  <template>
                    <el-radio-group @change="radioChange"  v-model="selectedClasss">
                      <el-radio class="radio" label="全部">全部</el-radio>
                      <el-radio class="radio" label="公共">公共</el-radio>
                      <el-radio class="radio" label="科室">科室</el-radio>
                    </el-radio-group>
                  </template>
                </div>
                <div flex>
                <div flex class="select-box" v-if="selectedClasss=== '科室'">
                  <p class='lable'>科室：</p>
                  <el-select
                    v-model="deptValue"
                    filterable
                    placeholder="请选择科室"
                    autocomplete="off"
                    @change="selectChange"
                  >
                    <el-option
                      v-for="item in deptList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </div>
                <div flex class="select-box">
                  <p class='lable'>类别：</p>
                  <el-select  v-model="selectedType" @change="selectChangeType"  filterable placeholder="请选择">
                    <!-- <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option> -->
                    <el-option value="all" label="全部"></el-option>
                    <div>
                      <el-option-group
                        v-for="group in groupNameList"
                        :key="group.wardCode"
                        :class="{'optionGroup': selectedClasss === '公共' || selectedClasss === '科室'}"
                        :label="selectedClasss === '公共' || selectedClasss === '科室' ? '' : group.wardName"
                        >
                        <el-option
                          v-for="item in group.list"
                          :key="item.id"
                          :label="item.groupName"
                          :value="item.groupName">
                        </el-option>
                      </el-option-group>
                    </div>
                    <!-- <div v-show="selectedClasss === '科室' || selectedClasss === '全部'">
                      <el-option-group
                        v-for="group in (selectedClasss === '科室' ? typeList.dept.filter(item => item.deptCode === deptValue ) : typeList.dept)"
                        :key="group.deptCode"
                        :class="{'optionGroup': selectedClasss === '科室'}"
                        :label="selectedClasss === '科室' ? '' : group.deptName">
                        <el-option
                          v-for="(item) in group.groupName"
                          :key="item.index"
                          :label="item.name"
                          :value="item.index">
                        </el-option>

                      </el-option-group>
                    </div> -->
                  </el-select>
                </div>
                </div>
                <div flex class="select-box"  v-if="selectedClasss !== '公共'">
                  <p class='lable'>表单：</p>
                  <el-select
                    v-model="formCode"
                    filterable
                    placeholder="请选择科室"
                    autocomplete="off"
                    @change="formCodeChange"
                  >
                    <el-option
                      v-for="item in selectedClasss === '科室' ? formCodeList.filter(item => item.code !== '000000' ) : formCodeList "
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div flex>
              <el-input
                type="text"
                flex-box="1"
                class="search-input"
                placeholder="请输入你要查找的模版…"
                v-model="searchWord"
                @change="filterData"
              />
              <whiteButton text icon="icon-search"></whiteButton>
            </div>
          </div>
          <div class="list-con">
            <div v-for="(item, key) in filterDatas" :key="key">
              <templateItem 
              :data="item" 
              :filterData='filterDatas' 
              :key="item.id" 
              :refName="refName" 
              :isEditor="isEditor"
              :editorCallback="editorCallback"
              ></templateItem>
            </div>
          </div>
          <div class="footer-con" flex="main:center cross:center" @click="openAddModal">
            <i class="iconfont icon-tianjia"></i> 新建模板
          </div>
        </div>
      </div>
    </transition>
    <addTemplateModal :formCodeList="formCodeList" ref="addTemplateModal"></addTemplateModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box
  .el-checkbox__label
    font-size: 12px;
    color: #687179;
    white-space normal
  textarea
    font-size: 12px;
    color: #687179;
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.no-do-bg
  position fixed;
  top:0;
  bottom:0;
  left: 0;
  right: 0;
  z-index 2001
.slide-con
  width 360px
  height 100%
  box-sizing border-box
  position fixed
  top 0
  bottom 0
  right 0
  background #fff
  box-shadow 0 0 20px rgba(0,0,0,0.4)
  z-index 1000000
  background: #fff;
  z-index 2002
.head-con
  height 46px
  background: #F7FAFA
  border-bottom: 1px solid #EAEEF1;
  padding 0 10px 0 20px
  .title
    font-size: 15px;
    color: #333333;
    font-weight bold
  .close-btn
    font-size 12px
    padding 10px 10px
    cursor pointer
.search-con
  margin 10px 20px
  .search-input
    background: #FFFFFF;
    // border: 1px solid #C2CBD2;
    border-radius: 0
    border-right 0px
    outline none
    padding-left 10px
    font-size: 12px;
    color: #687179;
    margin-left: -8px;
    width: 94%;
    >>>.el-input__inner{
      height: 32px;
      border-right: none;
    }
    .white-btn{
      padding: 0 8px !important;
    }
  .search-con_select
    margin-top: 10px;
  .lable
    width: 50px;
    font-size 12px;
    line-height: 35px;
  // .deptLable
  //   width: 100%;
  //   margin-top: 10px;
  //   .lable {
  //     width: 42px;
  //   }
  //   >>>.el-input__inner{
  //     height:32px;
  //   }
  //   .el-select
  //     width: 84%;
.list-con
  height calc(100vh - 280px)
  overflow auto
.listMap-title
  font-size: 14px;
  color: #333333
  font-weight bold
  padding-right 50px
  padding-left 20px
  padding-top 10px
  padding-bottom 10px
  min-height 14px
.footer-con
  height 46px
  background #4BB08D
  position absolute
  bottom 0
  left 0
  right 0
  font-size 14px
  color #fff
  cursor pointer
  box-shadow: 0px -1px 5px rgba(0,0,0,0.1)
  &:hover
    background #5CC6A1
  i
    margin-right 5px
    font-weight bold
    font-size 12px
.select-box
  // margin-top: 10px;
  width 100%;
  font-size 12px;
  // margin-right: 1%;
  margin: 0 1% 10px 0;
  .el-select
    width 100%;
  >>>.el-input__inner
    height 32px
    // background #f7fafa
    font-size 12px;
    border-radius 2px 0 0 2px;
  >>>  input
      width 100% !important
.optionGroup
  >>> .el-select-group__title{
    display: none
  }
/deep/.el-select-dropdown__empty{
  display: none
}
</style>

<script>
import whiteButton from "@/components/button/white-button.vue";
import templateItem from "./template-item.vue";
import { typeList_foshanshiyi, list_foshanshiyi, getGroupName, getlist, getModuleCode } from "../../api/template";
import addTemplateModal from "./add-template-modal_foshanshiyi.vue";
import bus from "vue-happy-bus";
import { keyNameMap, keyCodeMap } from "./deptMapList";
import commom from "@/common/mixin/common.mixin.js";
import { nursingUnit } from "@/api/lesion";

export default {
  mixins: [commom],
  data() {
    return {
      bus: bus(this),
      data: {},
      show: false,
      searchWord: "",
      selectedTab: "1",
      listMap: [],
      typeList: {},
      selectedType: ['foshanrenyi'].includes(this.HOSPITAL_ID) ? "":"all", // 类别
      selectedClasss: ['foshanrenyi'].includes(this.HOSPITAL_ID) ?"科室": "全部" ,
      selectWidth: 100,
      refName: "",
      deptENName: keyNameMap[this.deptName] || "neurology",
      deptValue: ['foshanrenyi'].includes(this.HOSPITAL_ID) ?
                  localStorage.selectDeptValue :
                  localStorage.user && JSON.parse(localStorage.user).deptCode,
      user: localStorage.user && JSON.parse(localStorage.user),
      filterDatas: [],
      allSelectedTypeList: [],
      groupNameList: [], //组名/类别
      deptList: [], // 科室
      formCodeList: [], // 表单数组
      formCode: 'all', // 表单code
      isEditor:false , //是否编辑器进入
      editorCallback:()=>{}//编辑器进入得回调
    };
  },
  methods: {
    getDeptLists() {
      nursingUnit().then(res => {
        if (res.data.code === '200')
          this.deptList = res.data.data.deptList;
      });
    },
    geFromCode() {
      getModuleCode().then(res => {
        if (res.data.code === '200')
          this.formCodeList = res.data.data;
          this.formCodeList = [{name: '全部', code: 'all'}, {name: '通用', code: "000000"}, ...this.formCodeList]
          this.formCode = this.formCodeList[0].code
      });
    },

    filterData() {
      let listMap = this.listMap;
      let filterData = listMap.filter(item => {
        return (
          (item.content || "").indexOf(this.searchWord) > -1 ||
          (item.title || "").indexOf(this.searchWord) > -1
        );
      });
      this.filterDatas = filterData
    },
    radioChange(value) {
      if (value === '科室') {
        // let initDept = this.deptList.filter(item => item.deptCode === this.user.deptCode)
        // this.deptValue = initDept.length > 0 ?  this.user.deptCode :
        this.deptValue = this.deptValue ? this.deptValue : this.user.deptCode
        this.getData(this.deptValue)
      } else if(value === '全部') {
        // this.deptValue = ''
        // this.selectedType = 'all'
        this.getData()
      } else {
        this.getData('000000')
      }
    },
    selectChange(value) {
      this.getData(value)
    },
    formCodeChange(code) {
      this.switch()
    },
    selectChangeType(value) {
      this.switch()
      // if(this.show)
      //   this.listType()
    },
    switch() {
      if (this.selectedClasss === '科室') {
        this.listType(this.deptValue, this.selectedType, this.formCode)
      } else if(this.selectedClasss === '全部') {
        this.listType('all', this.selectedType, this.formCode)
      } else {
        this.listType('000000', this.selectedType, '000000')
      }
    },
    open(refName, only = true, isEditor = false ,cb=()=>{}) {
      if(isEditor){
        this.isEditor=true
        this.editorCallback=cb
      }
      if (!only) {
        this.refName = refName
        return
      }
      if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
        this.selectedClasss = "科室"
        this.selectedType = ""
        this.deptValue = localStorage.selectDeptValue
      }
      this.geFromCode()
      this.getDeptLists()
      if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
        this.getData(this.deptValue)
        this.listType(this.deptValue,this.selectedType)
      }else{
        this.listType()
        this.getData();
      }

      if (this.show) {
        if (this.refName == refName) {
          this.show = false;
        } else {
          this.show = false;
          setTimeout(() => {
            this.show = true;
          }, 400);
        }
      } else {
        this.show = true;
      }
      this.refName = refName;
      this.selectWidth = 100;
      setTimeout(() => {
        this.selectWidth = 101;
      }, 300);
    },
    close() {
      this.show = false;
      // this.deptValue = ''
      this.selectedType = "all"
      if(!['foshanrenyi'].includes(this.HOSPITAL_ID)) this.selectedClasss = "全部"
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    // 查询标题内容
    listType(wardCode = 'all', groupName = 'all', moduleCode = 'all') {
      getlist(wardCode, groupName, moduleCode).then(res => {
        if (res.data.code === '200') {
          console.log("kjinlaile ")
          // this.listMap = res.data.data
          // this.filterDatas = res.data.data
          this.$set(this,"listMap",res.data.data)
          this.$set(this,"filterDatas",res.data.data)
        }
      });
    },
    getData(wardCode = 'all') {
      getGroupName(wardCode).then(res => {
        if (res.data.code === '200') {
          this.groupNameList = res.data.data;
          if (this.groupNameList.length > 0) {
            if (wardCode === 'all') {
              this.selectedType = 'all'
              // this.listType()
            }
            else {
              this.selectedType =  this.groupNameList[0].list[0].groupName
              // this.listType(this.groupNameList[0].list[0].wardCode, this.groupNameList[0].list[0].groupName, this.groupNameList[0].list[0].moduleCode)
            }
          } else this.selectedType = ''
        }
      });
    },
    openAddModal() {
      if (this.isRoleManage || this.isNewAdminOrNursingDepartment){
        this.$refs.addTemplateModal.open();
        // this.$refs.addTemplateModal.getDeptLists();
      }
      else
        this.$message.warning('普通没有权限新建模板！')

    },
    addTemplateAtDoc(item) {
      this.bus.$emit("addTemplateAtDoc", item.content);
    }
  },
  created() {
    this.bus.$on("refreshTemplate", (data) => {
      this.filterDatas = data

    });
    this.bus.$on("refreshTemplateAdd", async(obj) => {
      // if (!obj.id){
        let { data: { data} } = await getGroupName(obj.selectedType === '公共' ? '000000' : obj.deptCode)
        this.groupNameList = data;
      // }
      this.formCode = obj.formCode
      this.deptValue = obj.deptCode
      this.selectedType = obj.groupName
      this.selectedClasss = obj.selectedType
      this.switch()
    })
  },
  mounted() {
    // this.show = true
    // this.geFromCode()
    // this.getData()
    // this.getDeptLists()
    // this.listType()
  },
  watch: {
  },
  components: {
    whiteButton,
    templateItem,
    addTemplateModal
  }
};
</script>
