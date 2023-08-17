<template>
  <div>
    <transition name="el-zoom-in-left">
      <div class="slide-con" v-show="show" >
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">科室模板管理</span>
          <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <div>
          <div class="search-con" flex>
            <div class="dept-item">
            <span>科室：</span>
             <el-select
              filterable
              v-model="this_deptCode"
              placeholder="选择科室"
              class="type-select"
              @change="changeDept"
            >
              <el-option
                v-for="item in allDeptList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            </div>
            <input
              type="text"
              flex-box="1"
              class="search-input"
              placeholder="请输入你要查找的模版…"
              v-model="templateNames"
            />
            <whiteButton text icon="icon-search"></whiteButton>
          </div>
          <div class="list-con" v-loadding="fromLoading">
            <div class="template-item" v-for="item in listMap" :key="item.id">
              <div class="detail-left">
                <div class="title-item">{{ item.templateName }}</div>
                <div class="centent-item">
                  <span>{{ item.deptName }}</span>
                  <span>{{ item.empName }}</span>
                  <span>{{ item.createTime }}</span>
                </div>
              </div>
              <div class="del-right">
                <el-tooltip content="删除" placement="bottom" effect="dark">
                  <i
                    class="iconfont icon-shanchuzhenghang"
                    @click="toDel(item)"
                  ></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
  flex-wrap: wrap;
  margin 10px 20px
  .dept-item
    display: flex;
    align-items: center;
    margin-bottom 10px;
  .search-input
    background: #FFFFFF;
    border: 1px solid #C2CBD2;
    border-radius: 0
    border-right 0px
    outline none
    padding-left 10px
    font-size: 12px;
    color: #687179
.list-con
  height calc(100vh - 145px)
  overflow auto
  .template-item
    height: 40px;
    border: 1px solid #e0e0e0;
    margin: 6px;
    display: flex;
    padding: 8px;
    .detail-left
      flex: 1;
      display: flex;
      flex-direction: column;
      .title-item
        font-size: 16px;
        padding-bottom: 10px;
      .centent-item
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    .del-right
      width: 50px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
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
  width 100px
  >>>.el-input__inner
    height 32px
    background #f7fafa
    border-radius 2px 0 0 2px
</style>

<script>
import whiteButton from "@/components/button/white-button.vue";
import bus from "vue-happy-bus";
import { nursingUnit } from "@/api/lesion";
import { getFieldTemplateListApi, deleteFieldTemplateApi } from "@/Page/sheet-page/api/index.js";
import sheetInfo from "../../config/sheetInfo/index.js";
// import { titleTemplateList } from "./api/index";
export default {
  data() {
    return {
      bus: bus(this),
      data: {},
      show: false,
      templateNames: "",
      selectedTab: "1",
      options: [],
      listMap: [],
      listMapSdyy: {},
      typeList: [],
      selectWidth: 100,
      tableTh:{},
      fromLoading: false,
      callback: null,
      this_deptCode:"",
      sheetInfo,
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    deptCode() {
      return this.$store.state.lesion.deptCode || this.$route.query.wardCode;
    },
    allDeptList() {
      try {
        if (
          this.patientInfo.lendDeptCode &&
          !this.options.find(
            (item) => item.code == this.patientInfo.lendDeptCode
          )
        ) {
          return [
            ...this.options,
            {
              code: this.patientInfo.lendDeptCode,
              name: this.patientInfo.deptLend,
            },
          ];
        }
        return this.options;
      } catch (error) {}
      return this.options;
    },
    isTemperature() {
      return (
        this.$route.path.includes("newSingleTemperatureChart") ||
        this.$route.path.includes("temperature")
      );
    }
  },
  methods: {
    open() {
      this.getData();
      this.show = true;
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
    async getData() {
      this.fromLoading = true
      let data = {
        deptCode : this.this_deptCode,
        templateName: this.templateNames,
        recordCode: this.sheetInfo.sheetType
      }
      let res = await getFieldTemplateListApi(data);
      if (res.data.code == "200") {
        this.listMap = res.data.data
      }
      this.fromLoading = false
    },
    changeDept() {
      this.getData();
    },
    // 删除模板
    toDel(data){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            deptCode : data.deptCode,
            templateName: data.templateName,
            recordCode: data.recordCode
          }
          deleteFieldTemplateApi(params).then((res) =>{
            this.$message.success('删除成功')
            this.getData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    }
  },
  created() {
    this.getData();
    // 获取科室列表
    nursingUnit("/all").then((res) => {
      this.options = res.data.data.deptList;
      this.this_deptCode = this.deptCode;
    });
  },
  mounted() {
    this.show = false;
    this.bus.$on("refreshTitleTemplate", this.getData);
  },

  components: {
    whiteButton,
  }
};
</script>
