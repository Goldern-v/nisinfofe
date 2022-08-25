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
              <div>
                <div flex class="select-box">
                  <p class='lable'>类型：</p>
                  <el-select v-model="selectedClasss" filterable placeholder="请选择">
                    <el-option v-for="item in ['全部', '公共', '科室']" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </div>
                <div flex class="select-box">
                  <p class='lable'>科室：</p>
                  <!-- <el-select v-model="selectedClasss" filterable placeholder="请选择">
                    <el-option v-for="item in ['全部', '公共', '科室']" :key="item" :label="item" :value="item"></el-option>
                  </el-select> -->
                  <el-select
                    v-model="deptValue"
                    filterable
                    placeholder="请选择科室"
                    autocomplete="off"
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
                  <el-select v-model="selectedType" filterable placeholder="请选择">
                    <!-- <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option> -->
                    <div v-if="selectedClasss === '公共' || selectedClasss === '全部'">
                      <el-option-group
                      v-for="group in typeList.common"
                      :key="group.deptCode"
                      :label="group.deptName">
                      <el-option
                        v-for="item in group.groupName"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                      </el-option-group>
                    </div>
                    <div v-if="selectedClasss=== '科室' || selectedClasss === '全部'">
                      <el-option-group
                        v-for="group in typeList.dept.filter(item => item.deptCode === deptValue)"
                        :key="group.deptCode"
                        :label="group.deptName">
                        <el-option
                          v-for="(item, index) in group.groupName"
                          :key="item + index"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-option-group>
                    </div>
                  </el-select>
                </div>
              </div>

              <!-- <div class='deptLable' flex v-if="selectedClasss === '科室'">
                <p class='lable'>科室：</p>
                <el-select
                  v-model="deptValue"
                  filterable
                  placeholder="请选择科室"
                  autocomplete="off"
                >
                  <el-option
                    v-for="item in deptList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div> -->
            </div>
            <div flex>
              <input
                type="text"
                flex-box="1"
                class="search-input"
                placeholder="请输入你要查找的模版…"
                v-model="searchWord"
              />
              <whiteButton text icon="icon-search"></whiteButton>
            </div>
          </div>
          <div class="list-con">
            <div v-for="(item, key) in filterData" :key="key">
              <templateItem :data="item" :key="item.id" :refName="refName"></templateItem>
            </div>
          </div>
          <div class="footer-con" flex="main:center cross:center" @click="openAddModal">
            <i class="iconfont icon-tianjia"></i> 新建模板
          </div>
        </div>
      </div>
    </transition>
    <addTemplateModal :deptList="deptList" ref="addTemplateModal"></addTemplateModal>
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
    border: 1px solid #C2CBD2;
    border-radius: 0
    border-right 0px
    outline none
    padding-left 10px
    font-size: 12px;
    color: #687179;
  .search-con_select
    margin-top: 10px;
  .lable 
    width: 62px;
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
  height calc(100vh - 145px)
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
  // margin-right 10px
  margin-top: 10px;
  width 81%;
  font-size 12px;
  // margin-right: 1%;
  .el-select
    width 100%;
  >>>.el-input__inner
    height 32px
    // background #f7fafa
    font-size 12px;
    border-radius 2px 0 0 2px;
  >>>  input
      width 100% !important
</style>

<script>
import whiteButton from "@/components/button/white-button.vue";
import templateItem from "./template-item.vue";
import { typeList,typeList_foshanshiyi, list } from "../../api/template";
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
      selectedType: "",
      selectedClasss: "全部",
      selectWidth: 100,
      refName: "",
      deptENName: keyNameMap[this.deptName] || "neurology",
      deptList: [],
      deptValue: ''
    };
  },
  computed: {
    filterData() {
      let listMap = this.listMap;
      let filterData = listMap.filter(item => {
        return (
          (item.content || "").indexOf(this.searchWord) > -1 ||
          (item.title || "").indexOf(this.searchWord) > -1
        );
      });
      return filterData;
    }
  },
  methods: {
    getDeptLists() {
      nursingUnit().then(res => {
        console.log(res.data)
        if (res.data.code === '200')
          this.deptList = res.data.data.deptList;
      });
    },
    open(refName) {
      this.getData();
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
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    getData() {
      console.log(
        "template-deptName",
        this.deptName,
        this.deptCode || [""],
        keyNameMap
      );
      this.deptENName = keyNameMap[this.deptName] || "neurology";
      console.log("template-deptENName", this.deptENName);
      typeList_foshanshiyi().then(res => {
        console.log(res.data.data, 8888888)
        if (res.data.code === '200') {
          this.typeList = res.data.data;
          if (this.selectedType) {
            list_foshanshiyi(this.selectedType, this.deptCode||this.deptENName).then(res => {
              this.listMap = res.data.data.list;
            });
          } else {
            if (this.selectedClasss === '科室') {
              this.selectedType = this.typeList.dept.groupName[0];
            } else {
              this.selectedType = this.typeList.common.groupName[0];
            }
          }
        }
      });
    },
    openAddModal() {
      if (this.isRoleManage || this.isAdminOrNursingDepartment)
        this.$refs.addTemplateModal.open();
      else 
        this.$Message.warning('普通没有权限新建模板！')
      
    },
    addTemplateAtDoc(item) {
      this.bus.$emit("addTemplateAtDoc", item.content);
    }
  },
  created() {
    this.getDeptLists()
    // deptCode
    let user = localStorage.user && JSON.parse(localStorage.user)
    if (this.isRoleManage) {
      this.selectedClasss = '科室'
      this.deptValue = user.deptCode
    }
    if (this.isAdminOrNursingDepartment) this.selectedClasss = '全部'
    this.bus.$on("refreshTemplate", this.getData);
  },
  mounted() {
    //  this.show = false
  },
  watch: {
    selectedType() {
      if (this.selectedType) {
        this.deptENName = keyNameMap[this.deptName] || "neurology";
        list(this.selectedType, this.deptValue).then(res => {
          this.listMap = res.data.data.list;
        });
      }
    }
  },
  components: {
    whiteButton,
    templateItem,
    addTemplateModal
  }
};
</script>
